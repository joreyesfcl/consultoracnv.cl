// Animaciones del sitio. Todo es mejora progresiva: sin este script (o con
// "reducir movimiento" activado en el sistema) el contenido se ve completo y estático.
//
// Lo que depende del contenido de la página se inicializa en initPage(), que corre al
// cargar y otra vez si el contenido se reemplaza (evento "cnv:page").

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

if (!reduce) root.classList.add('motion');

// ---------- Contadores ----------
const counted = new WeakSet<Element>();
function countUp(el: HTMLElement) {
  if (counted.has(el)) return;
  counted.add(el);
  const to = Number(el.dataset.count);
  const prefix = el.dataset.prefix ?? '';
  if (reduce) { el.textContent = prefix + to; return; }
  const t0 = performance.now();
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / 1600);
    el.textContent = prefix + Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ---------- Revelado al entrar en pantalla ----------
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('in');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
);

// ---------- Interacciones con cursor (solo mouse) ----------
function bindPointer(scope: ParentNode) {
  if (!fine || reduce) return;

  scope.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  scope.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('tilting');
      el.style.setProperty('--ry', `${x * 6}deg`);
      el.style.setProperty('--rx', `${-y * 6}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('tilting');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    });
  });

  scope.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.classList.add('pulling');
      el.style.setProperty('--tx', `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
      el.style.setProperty('--tyy', `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('pulling');
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--tyy', '0px');
    });
  });

  scope.querySelectorAll<HTMLElement>('[data-hero]').forEach((hero) => {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--gx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--gy', `${e.clientY - r.top}px`);
    });
  });
}

function initPage() {
  const main = document.getElementById('contenido') ?? document.body;
  main.querySelectorAll<HTMLElement>('.stagger').forEach((g) =>
    Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)))
  );
  main.querySelectorAll('.reveal, .stagger, [data-count]').forEach((el) => io.observe(el));
  bindPointer(main);
}

// ---------- Barra de progreso y parallax (una sola vez) ----------
const bar = document.createElement('div');
bar.className = 'progress';
bar.setAttribute('aria-hidden', 'true');
document.body.appendChild(bar);

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', String(max > 0 ? scrollY / max : 0));
    const heroBg = document.querySelector<HTMLElement>('[data-parallax]');
    if (heroBg && !reduce && scrollY < innerHeight * 1.2) {
      heroBg.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0) scale(1.06)`;
    }
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });

// Elementos fuera de <main> (encabezado, pie) se enlazan una sola vez
bindPointer(document.querySelector('.site-header') ?? document.createElement('div'));
bindPointer(document.querySelector('.site-footer') ?? document.createElement('div'));

initPage();
onScroll();
document.addEventListener('cnv:page', () => { initPage(); onScroll(); });
