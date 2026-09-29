// Interacciones de las secciones: pestañas accesibles, necesidades por pilar,
// mapa radial de servicios, índice vivo del pilar, filtro de servicios y
// formulario de contacto. initUI() corre al cargar y en "cnv:page".

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

function initUI() {
document.querySelectorAll<HTMLElement>('[data-tabs] [role="tablist"]').forEach((l) => initTabs(l));

// ---------- ¿En qué podemos contribuir? (necesidad → pilar) ----------
document.querySelectorAll<HTMLElement>('[data-needs]').forEach((root) => {
  const btns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-need]'));
  const strata = Array.from(root.querySelectorAll<HTMLElement>('[data-stratum]'));
  btns.forEach((b) =>
    b.addEventListener('click', () => {
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      strata.forEach((s) => s.classList.toggle('on', s.dataset.stratum === b.dataset.need));
    })
  );
});


// ---------- Mapa radial de servicios ----------
// La ficha aparece solo mientras el cursor (o el foco) está sobre un segmento de la rueda.
document.querySelectorAll<HTMLElement>('[data-smap]').forEach((root) => {
  const svg = root.querySelector<SVGSVGElement>('svg')!;
  const segs = Array.from(root.querySelectorAll<SVGAElement>('[data-svc]'));
  const q = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const card = q('[data-card]');
  const fig = card.parentElement!;
  const link = q('[data-c-link]') as HTMLAnchorElement;
  let active: SVGAElement | null = null;
  let timer = 0;
  let touch = false;
  let pending = 0;
  const expand = (a: SVGAElement | null) =>
    segs.forEach((x) => {
      const on = x === a;
      x.classList.toggle('on', on);
      const p = x.querySelector('path')!;
      p.setAttribute('d', on ? p.dataset.don! : p.dataset.d!);
    });
  // Ubica la ficha junto al segmento, hacia afuera de la rueda, sin taparlo ni salirse de la vista
  const place = (a: SVGAElement) => {
    // Con la rueda a todo el ancho (móvil y tableta) no hay espacio al costado: la ficha va bajo la rueda
    const dock = innerWidth <= 960;
    card.classList.toggle('dock', dock);
    if (dock) {
      card.style.left = card.style.top = '';
      const c = card.getBoundingClientRect();
      if (c.bottom > innerHeight) scrollBy({ top: c.bottom - innerHeight + 16, behavior: 'smooth' });
      return;
    }
    const b = a.getBoundingClientRect();
    const w = card.offsetWidth, h = card.offsetHeight, gap = 12, m = 12;
    const r = root.getBoundingClientRect();
    const top = Math.max(r.top, 76) + m, bottom = Math.min(r.bottom, innerHeight) - m;
    const left = r.left + m, right = r.right - m;
    const s = svg.getBoundingClientRect();
    const cx = s.left + s.width / 2, cy = s.top + s.height / 2;
    const mx = b.left + b.width / 2, my = b.top + b.height / 2;
    const ang = Math.atan2(my - cy, mx - cx), co = Math.cos(ang), si = Math.sin(ang);
    const R = s.width / 2 * (290 / 300);
    const ax = cx + R * co, ay = cy + R * si;
    const east = mx >= cx, south = my >= cy;
    const cands: [number, number][] = [
      // tangente al borde exterior de la rueda, en la dirección del segmento
      [ax - w / 2 + (w / 2 + gap) * co, ay - h / 2 + (h / 2 + gap) * si],
      // al costado exterior del segmento
      east ? [b.right + gap, my - h / 2] : [b.left - w - gap, my - h / 2],
      south ? [mx - w / 2, b.bottom + gap] : [mx - w / 2, b.top - h - gap],
      south ? [mx - w / 2, b.top - h - gap] : [mx - w / 2, b.bottom + gap],
      east ? [b.left - w - gap, my - h / 2] : [b.right + gap, my - h / 2],
    ];
    const clamp = ([x, y]: [number, number]): [number, number] => [
      Math.min(Math.max(x, left), Math.max(left, right - w)),
      Math.min(Math.max(y, top), Math.max(top, bottom - h)),
    ];
    const overlap = ([x, y]: [number, number]) =>
      Math.max(0, Math.min(x + w, b.right + 4) - Math.max(x, b.left - 4)) * Math.max(0, Math.min(y + h, b.bottom + 4) - Math.max(y, b.top - 4));
    const all = cands.map(clamp);
    const pick = all.find((c) => overlap(c) === 0) ?? all.reduce((p, c) => (overlap(c) < overlap(p) ? c : p));
    const f = fig.getBoundingClientRect();
    card.style.left = `${Math.round(pick[0] - f.left)}px`;
    card.style.top = `${Math.round(pick[1] - f.top)}px`;
  };
  const show = (a: SVGAElement) => {
    clearTimeout(timer);
    if (active === a && !card.hidden) return;
    active = a;
    expand(a);
    q('[data-c-code]').textContent = `${a.dataset.code} · Pilar ${a.dataset.pilar}`;
    q('[data-c-name]').textContent = a.dataset.name!;
    q('[data-c-desc]').textContent = a.dataset.desc!;
    q('[data-c-pilar]').textContent = a.dataset.pilar!;
    link.href = a.getAttribute('href')!;
    card.hidden = false;
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';
    place(a);
  };
  const hide = () => {
    clearTimeout(timer);
    clearTimeout(pending);
    active = null;
    expand(null);
    card.hidden = true;
  };
  const later = () => {
    clearTimeout(timer);
    timer = window.setTimeout(hide, 350);
  };
  segs.forEach((a) => {
    // Con una ficha abierta, el cambio a otro segmento espera un instante: así se puede cruzar
    // la rueda hacia la ficha sin que cambie en el camino
    a.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      clearTimeout(pending);
      if (card.hidden) show(a);
      else pending = window.setTimeout(() => show(a), 140);
    });
    a.addEventListener('pointerleave', () => clearTimeout(pending));
    a.addEventListener('focus', () => { if (!touch) show(a); });
    // En pantallas táctiles, el primer toque muestra la ficha y el segundo abre el pilar
    a.addEventListener('click', (e) => {
      if (touch && active !== a) {
        e.preventDefault();
        show(a);
      }
    });
  });
  root.addEventListener('pointerdown', (e) => { touch = e.pointerType === 'touch'; }, { capture: true });
  svg.addEventListener('pointerenter', () => clearTimeout(timer));
  svg.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') later(); });
  card.addEventListener('pointerenter', () => { clearTimeout(timer); clearTimeout(pending); });
  card.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') later(); });
  fig.addEventListener('focusout', (e) => { if (!fig.contains(e.relatedTarget as Node)) later(); });
  fig.addEventListener('focusin', () => clearTimeout(timer));
  document.addEventListener('pointerdown', (e) => { if (active && !fig.contains(e.target as Node)) hide(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !active) return;
    const back = card.contains(document.activeElement) ? active : null;
    back?.focus();
    hide();
  });
  window.addEventListener('resize', () => { if (active) place(active); });
  const input = root.querySelector<HTMLInputElement>('[data-smap-q]');
  const count = root.querySelector<HTMLElement>('[data-smap-count]');
  const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  input?.addEventListener('input', () => {
    const term = norm(input.value.trim());
    root.classList.toggle('searching', !!term);
    let n = 0;
    segs.forEach((a) => {
      const ok = !!term && norm(`${a.dataset.code} ${a.dataset.name} ${a.dataset.desc}`).includes(term);
      a.classList.toggle('match', ok);
      if (ok) n++;
    });
    if (count) count.textContent = term ? `${n} ${n === 1 ? 'servicio' : 'servicios'}` : '';
  });
});

// ---------- Índice vivo de la página de pilar ----------
document.querySelectorAll<HTMLElement>('[data-spy]').forEach((nav) => {
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const items = links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean) as HTMLElement[];
  const set = (id: string) => {
    links.forEach((a) => a.classList.toggle('on', a.hash === `#${id}`));
    items.forEach((it) => it.classList.toggle('on', it.id === id));
  };
  // Al llegar con un ancla (o al hacer clic en el índice) se respeta ese servicio hasta que la persona desplace la página
  let lock = false;
  const unlock = () => { lock = false; };
  ['wheel', 'touchstart', 'keydown'].forEach((t) => addEventListener(t, unlock, { passive: true }));
  links.forEach((a) => a.addEventListener('click', () => { set(a.hash.slice(1)); lock = true; }));
  const spy = new IntersectionObserver(
    (entries) => {
      if (lock) return;
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) set(vis[0].target.id);
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );
  items.forEach((it) => spy.observe(it));
  if (location.hash && items.some((it) => `#${it.id}` === location.hash)) {
    set(location.hash.slice(1));
    lock = true;
  }
});

// ---------- Filtro de servicios ----------
document.querySelectorAll<HTMLElement>('[data-filter]').forEach((box) => {
  const section = box.closest('section')!;
  const items = Array.from(section.querySelectorAll<HTMLElement>('[data-item]'));
  const chips = Array.from(box.querySelectorAll<HTMLButtonElement>('[data-f]'));
  const q = box.querySelector<HTMLInputElement>('[data-q]')!;
  const label = section.querySelector<HTMLElement>('[data-count-label]');
  const empty = section.querySelector<HTMLElement>('[data-empty]');
  let pilar = 'todos';
  const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const apply = () => {
    const term = norm(q.value.trim());
    let n = 0;
    items.forEach((it) => {
      const text = norm(it.querySelector<HTMLElement>('[data-search]')?.dataset.search ?? it.textContent ?? '');
      const ok = (pilar === 'todos' || it.dataset.pilar === pilar) && (!term || text.includes(term));
      it.hidden = !ok;
      if (ok) n++;
    });
    if (label) label.textContent = `${n} ${n === 1 ? 'servicio' : 'servicios'}`;
    if (empty) empty.hidden = n > 0;
  };
  chips.forEach((c) =>
    c.addEventListener('click', () => {
      pilar = c.dataset.f!;
      chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
      apply();
    })
  );
  q.addEventListener('input', apply);
});

// ---------- Formulario de contacto ----------
document.querySelectorAll<HTMLFormElement>('form[data-contact]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'status';
    const required = Array.from(form.querySelectorAll<HTMLInputElement>('[required]'));
    let firstBad: HTMLElement | null = null;
    required.forEach((f) => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !f.checkValidity());
      f.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) {
      status.classList.add('err');
      status.textContent = 'Revise los campos marcados: nombre, correo válido, mensaje y la aceptación de la política de privacidad.';
      (firstBad as HTMLElement).focus();
      return;
    }
    btn.disabled = true;
    status.textContent = 'Enviando…';
    try {
      if ((window as any).CNV_PREVIEW) {
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error();
      }
      form.reset();
      status.classList.add('ok');
      status.textContent = (window as any).CNV_PREVIEW
        ? 'Vista previa: el envío está desactivado, pero así se verá la confirmación. Gracias por escribirnos; le responderemos a la brevedad.'
        : 'Mensaje enviado. Gracias por escribirnos; le responderemos a la brevedad.';
    } catch {
      status.classList.add('err');
      status.textContent = 'No pudimos enviar el mensaje. Intente nuevamente o escríbanos a contacto@consultoracnv.cl.';
    } finally {
      btn.disabled = false;
    }
  });
});

}

initUI();
document.addEventListener('cnv:page', initUI);
