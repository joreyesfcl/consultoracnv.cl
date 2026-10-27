// Prueba automática de accesibilidad del sitio compilado (dist/).
// Recorre todas las páginas del sitemap y revisa:
//   1. axe-core, criterios WCAG 2.2 A y AA, en tema claro y oscuro, a 1440 y 390 px;
//   2. que «Saltar al contenido» lleve el foco al contenido principal;
//   3. que no haya desplazamiento horizontal a 320 px.
// Si encuentra un error, termina con código 1 y la publicación se detiene (.github/workflows/deploy.yml).
// Uso: npm run build && npm run test:a11y
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const root = path.resolve('dist');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
};

// Servidor estático mínimo sobre dist/
const server = http.createServer((req, res) => {
  let f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.statusCode = 404; f = path.join(root, '404.html'); }
  res.setHeader('Content-Type', types[path.extname(f)] ?? 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

// Páginas: las del sitemap, más la 404
const sitemap = fs.readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
routes.push('/no-existe/');

const errors = [];
const browser = await chromium.launch();

// Deja visible el contenido que aparece al desplazarse, para que axe lo evalúe
const reveal = (p) => p.evaluate(() => document.querySelectorAll('.reveal,.stagger').forEach((e) => e.classList.add('in', 'visible', 'is-in')));

// 1. axe-core
for (const theme of ['light', 'dark']) {
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    for (const r of routes) {
      await page.goto(base + r, { waitUntil: 'networkidle' });
      if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      await reveal(page);
      await page.waitForTimeout(200);
      await page.addScriptTag({ content: axeSource });
      const violations = await page.evaluate(async (tags) => {
        const res = await window.axe.run(document, { runOnly: { type: 'tag', values: tags } });
        return res.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
      }, TAGS);
      for (const v of violations) errors.push(`axe ${theme} ${width}px ${r} → ${v}`);
    }
    await ctx.close();
  }
}

// 2. Saltar al contenido
{
  const page = await browser.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const id = await page.evaluate(() => document.activeElement?.id);
  if (id !== 'contenido') errors.push(`teclado: «Saltar al contenido» deja el foco en «${id}» y no en #contenido`);
  await page.close();
}

// 3. Reflujo a 320 px
{
  const page = await (await browser.newContext({ viewport: { width: 320, height: 640 } })).newPage();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: 'domcontentloaded' });
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    if (w > 320) errors.push(`reflujo: ${r} mide ${w} px de ancho a 320 px`);
  }
}

await browser.close();
server.close();

if (errors.length) {
  console.error(`Accesibilidad: ${errors.length} error(es)\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`Accesibilidad: sin errores en ${routes.length} páginas (axe A/AA en claro y oscuro, a 1440 y 390 px; teclado; reflujo a 320 px).`);
