// Limpia el logo (quita una línea residual en el borde izquierdo del PNG original)
// y genera los favicons sobre fondo navy.
// Uso: node tools/generar-iconos.mjs
import sharp from 'sharp';

const NAVY = '#071C38';
const ORIGEN = 'src/assets/logo-original.png';

// Logo completo, recortado a su contenido real
const logo = await sharp(ORIGEN).extract({ left: 21, top: 23, width: 136, height: 76 }).png().toBuffer();
await sharp(logo).toFile('src/assets/logo-cnv.png');
await sharp(logo).toFile('public/logo.png');

// Solo la marca "CNV" (sin la leyenda), para íconos pequeños
const marca = await sharp(ORIGEN).extract({ left: 21, top: 23, width: 136, height: 56 }).png().toBuffer();

async function icon(size, out, pad, radius) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(marca).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  const r = Math.round(size * radius);
  const bg = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${NAVY}"/></svg>`);
  await sharp(bg).composite([{ input: m, gravity: 'center' }]).png().toFile(out);
}

await icon(32, 'public/favicon-32.png', 0.1, 0.2);
await icon(180, 'public/apple-touch-icon.png', 0.18, 0);
await icon(192, 'public/icon-192.png', 0.18, 0.22);
await icon(512, 'public/icon-512.png', 0.18, 0.22);
console.log('Logo limpio e íconos generados.');
