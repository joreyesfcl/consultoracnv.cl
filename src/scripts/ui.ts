// Interacciones de las secciones: pestañas accesibles, diagrama de pilares,
// alternador "Qué cambia", carrusel de escenarios, filtro de servicios,
// autodiagnóstico y formulario de contacto. initUI() corre al cargar y en "cnv:page".

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
// ---------- Filtro de servicios ----------
document.querySelectorAll<HTMLElement>('[data-filter]').forEach((box) => {
  const section = box.closest('section')!;
  const items = Array.from(section.querySelectorAll<HTMLElement>('[data-item]'));
  const chips = Array.from(box.querySelectorAll<HTMLButtonElement>('[data-f]'));
  const q = box.querySelector<HTMLInputElement>('[data-q]')!;
  const label = section.querySelector<HTMLElement>('[data-count-label]');
  const empty = section.querySelector<HTMLElement>('[data-empty]');
  let pilar = 'todos';
  const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
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

// ---------- Autodiagnóstico ----------
document.querySelectorAll<HTMLElement>('[data-diag]').forEach((root) => {
  const pilares = JSON.parse(root.dataset.pilares ?? '{}') as Record<string, { nombre: string; slug: string }>;
  const q = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const body = q('[data-r-body]');
  const emptyMsg = q('[data-r-empty]');
  const meter = q('[data-r-meter]');
  const val = (name: string) => root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value;
  const labelOf = (name: string) =>
    root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.nextElementSibling?.textContent ?? '';
  const orgTxt: Record<string, string> = { publico: 'una institución pública', empresa: 'una empresa', tercer: 'una fundación u ONG' };
  let resumen = '';
  const update = () => {
    const org = val('org'), etapa = val('etapa'), modo = val('modo'), plazo = val('plazo');
    const answered = [org, etapa, modo, plazo].filter(Boolean).length;
    meter.style.width = `${answered * 25}%`;
    if (!etapa) { body.hidden = true; emptyMsg.hidden = false; return; }
    const num = etapa;
    const p = pilares[num];
    // Si buscan que el equipo aprenda, el pilar 05 acompaña al principal
    q('[data-r-num]').textContent = `Pilar ${num}${modo === 'Apoyo a equipos' ? ' + Pilar 05' : ''}`;
    q('[data-r-name]').textContent = p.nombre;
    let texto = `${org ? `Para ${orgTxt[org]}` : 'Para su organización'} en este punto, lo recomendable es comenzar por el pilar ${num}.`;
    if (modo === 'Apoyo a equipos') texto += ' El pilar 05 permite que su equipo aprenda durante el trabajo.';
    if (modo) texto += ` La modalidad que mejor calza es «${modo}».`;
    if (plazo && plazo !== 'sin plazo externo') texto += ` Como hay una ${plazo}, conviene conversarlo pronto.`;
    q('[data-r-text]').textContent = texto;
    (q('[data-r-link]') as HTMLAnchorElement).href = `/servicios/${p.slug}/`;
    resumen = `Autodiagnóstico: ${[org && orgTxt[org], labelOf('etapa'), modo, plazo].filter(Boolean).join(' · ')}. Pilar sugerido: ${num} · ${p.nombre}.`;
    emptyMsg.hidden = true;
    body.hidden = false;
  };
  root.addEventListener('change', update);
  q('[data-r-use]').addEventListener('click', () => {
    const msg = document.querySelector<HTMLTextAreaElement>('#mensaje');
    const tipo = document.querySelector<HTMLSelectElement>('#tipo');
    if (!msg) return;
    msg.value = resumen + (msg.value ? '\n\n' + msg.value : '\n\n');
    const org = val('org');
    if (tipo && !tipo.value && org) {
      const guess = { publico: 'Servicio público', empresa: 'Empresa', tercer: 'Fundación, corporación u ONG' }[org];
      if (guess) tipo.value = guess;
    }
    document.querySelector('#formulario')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => msg.focus({ preventScroll: true }), reduce ? 0 : 600);
  });
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
