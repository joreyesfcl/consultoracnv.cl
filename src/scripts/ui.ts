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
  const slot = card.parentElement!;
  const expand = (a: SVGAElement | null) =>
    segs.forEach((x) => {
      const on = x === a;
      x.classList.toggle('on', on);
      const p = x.querySelector('path')!;
      p.setAttribute('d', on ? p.dataset.don! : p.dataset.d!);
    });
  const show = (a: SVGAElement) => {
    expand(a);
    q('[data-c-code]').textContent = `${a.dataset.code} · Pilar ${a.dataset.pilar}`;
    q('[data-c-name]').textContent = a.dataset.name!;
    q('[data-c-desc]').textContent = a.dataset.desc!;
    card.hidden = false;
    slot.classList.add('active');
  };
  const hide = () => {
    expand(null);
    card.hidden = true;
    slot.classList.remove('active');
  };
  segs.forEach((a) => {
    a.addEventListener('pointerenter', () => show(a));
    a.addEventListener('focus', () => show(a));
  });
  svg.addEventListener('pointerleave', hide);
  svg.addEventListener('focusout', (e) => { if (!svg.contains(e.relatedTarget as Node)) hide(); });
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
  const spy = new IntersectionObserver(
    (entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) set(vis[0].target.id);
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );
  items.forEach((it) => spy.observe(it));
  if (location.hash && items.some((it) => `#${it.id}` === location.hash)) set(location.hash.slice(1));
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
