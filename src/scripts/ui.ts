// Interacciones de las secciones: pestañas accesibles, diagrama de pilares,
// alternador "Qué cambia" y carrusel de escenarios.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Pestañas (patrón WAI-ARIA con flechas del teclado) ----------
function initTabs(list: HTMLElement, onChange?: (tab: HTMLElement) => void) {
  const tabs = Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]'));
  const select = (tab: HTMLElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    onChange?.(tab);
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      let j = -1;
      if (k === 'ArrowRight' || k === 'ArrowDown') j = (i + 1) % tabs.length;
      if (k === 'ArrowLeft' || k === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
      if (k === 'Home') j = 0;
      if (k === 'End') j = tabs.length - 1;
      if (j >= 0) { e.preventDefault(); select(tabs[j], true); }
    });
  });
  select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0]);
  return select;
}

document.querySelectorAll<HTMLElement>('[data-tabs] [role="tablist"]').forEach((l) => initTabs(l));

// ---------- Diagrama de pilares ----------
document.querySelectorAll<HTMLElement>('[data-pillars]').forEach((root) => {
  const list = root.querySelector<HTMLElement>('[role="tablist"]')!;
  const select = initTabs(list, (tab) => (root.dataset.active = tab.dataset.pick));
  root.querySelectorAll<SVGElement>('svg [data-pick]').forEach((el) =>
    el.addEventListener('click', () => {
      const tab = list.querySelector<HTMLElement>(`[data-pick="${el.dataset.pick}"]`);
      if (tab) select(tab);
    })
  );
});

// ---------- Qué cambia en la práctica ----------
document.querySelectorAll<HTMLElement>('[data-ba]').forEach((root) => {
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-ba-set]');
  let touched = false;
  const set = (state: string) => {
    root.dataset.state = state;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.baSet === state)));
  };
  buttons.forEach((b) => b.addEventListener('click', () => { touched = true; set(b.dataset.baSet!); }));
  if (reduce) { set('despues'); return; }
  // Al entrar en pantalla muestra primero el punto de partida y luego cómo queda
  set('antes');
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    setTimeout(() => { if (!touched) set('despues'); }, 1400);
  }, { threshold: 0.45 });
  io.observe(root.querySelector('.rows')!);
});

// ---------- Carrusel ----------
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((track) => {
  const section = track.closest('section')!;
  const prev = section.querySelector<HTMLButtonElement>('[data-prev]');
  const next = section.querySelector<HTMLButtonElement>('[data-next]');
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-dots] span'));
  const cards = Array.from(track.children) as HTMLElement[];
  const step = () => (cards[1]?.offsetLeft ?? 0) - (cards[0]?.offsetLeft ?? 0) || track.clientWidth;
  const update = () => {
    const i = Math.round(track.scrollLeft / step());
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
    if (prev) prev.disabled = track.scrollLeft <= 4;
    if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  const go = (dir: number) => track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
});
