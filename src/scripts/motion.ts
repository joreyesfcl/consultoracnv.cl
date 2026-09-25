// Animaciones del sitio. Todo es mejora progresiva: sin este script (o con
// "reducir movimiento" activado en el sistema) el contenido se ve completo y estático.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

if (!reduce) root.classList.add('motion');

// Índice para cascadas
document.querySelectorAll<HTMLElement>('.stagger').forEach((g) =>
  Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)))
);

// Revelado al entrar en pantalla + contadores
const counters = new WeakSet<Element>();
const countUp = (el: HTMLElement) => {
  if (counters.has(el)) return;
  counters.add(el);
  const to = Number(el.dataset.count);
  const prefix = el.dataset.prefix ?? '';
  if (reduce) { el.textContent = prefix + to; return; }
  const t0 = performance.now();
  const dur = 1600;
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = prefix + Math.round(to * eased);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

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
document.querySelectorAll('.reveal, .stagger, [data-count]').forEach((el) => io.observe(el));

// Barra de progreso de lectura
const bar = document.createElement('div');
bar.className = 'progress';
bar.setAttribute('aria-hidden', 'true');
document.body.appendChild(bar);

// Parallax del fondo del hero
const heroBg = document.querySelector<HTMLElement>('[data-parallax]');

let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', String(max > 0 ? scrollY / max : 0));
    if (heroBg && !reduce && scrollY < innerHeight * 1.2) {
      heroBg.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0) scale(1.06)`;
    }
    ticking = false;
  });
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Interacciones con cursor (solo mouse, sin reducir movimiento)
if (fine && !reduce) {
  // Brillo que sigue al cursor
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // Inclinación 3D
  document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
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

  // Botón magnético
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
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

  // Resplandor que sigue al cursor en el hero
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  hero?.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--gx', `${e.clientX - r.left}px`);
    hero.style.setProperty('--gy', `${e.clientY - r.top}px`);
  });
}
