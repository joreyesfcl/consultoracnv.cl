// Lógica del autodiagnóstico de madurez (/autodiagnostico/). El contenido llega desde
// src/data/autodiagnostico.ts serializado en <script data-autodiag-data>.
// Nada se envía: el resumen solo pasa al formulario de contacto si la persona lo pide.

type Afirmacion = { codigo: string; texto: string; publico?: string; privado?: string };
type Dimension = {
  id: string;
  pilar: string;
  nombre: string;
  afirmaciones: Afirmacion[];
  resultados: Record<string, { mensaje: string; servicios: string[] }>;
};
type Datos = {
  DIMENSIONES: Dimension[];
  NIVELES: { nivel: string; hasta: number }[];
  SECTORES: { id: string; nombre: string }[];
  servicios: Record<string, { nombre: string; href: string }>;
};
type Puntaje = { avg: number; unos: number; nivel: string } | { insuf: true } | null;

const COLOR: Record<string, string> = { Inicial: '#8FA8C8', 'En desarrollo': '#2C74F5', Consolidado: '#3FD7FF' };
const CORTO: Record<string, string> = { D1: 'el diagnóstico', D2: 'el diseño', D3: 'la gestión', D4: 'la estrategia integral', D5: 'las capacidades' };
const TIPO: Record<string, string> = { empresa: 'Empresa', tercer: 'Fundación, corporación u ONG' };
const fmt = (n: number) => n.toFixed(1).replace('.', ',');
const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function init(root: HTMLElement) {
  const datos: Datos = JSON.parse(root.querySelector('[data-autodiag-data]')!.textContent!);
  const { DIMENSIONES: dims, NIVELES, SECTORES, servicios } = datos;
  const screens = Array.from(root.querySelectorAll<HTMLElement>('[data-screen]'));
  const last = screens.length - 1;
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const val = (name: string) => root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const puntaje = (d: Dimension): Puntaje => {
    const vals = d.afirmaciones.map((a) => val(a.codigo)).filter((v) => v !== undefined).map(Number);
    if (vals.filter((v) => v === 0).length >= 2) return { insuf: true };
    const nums = vals.filter((v) => v > 0);
    if (!nums.length) return null;
    const avg = nums.reduce((s, v) => s + v, 0) / nums.length;
    const nivel = NIVELES.find((n) => avg < n.hasta)!.nivel;
    return { avg, unos: nums.filter((v) => v === 1).length, nivel };
  };

  let step = 0;
  const pintarPerfil = () => {
    dims.forEach((d, i) => {
      const li = q(`[data-stratum="${i}"]`);
      const p = puntaje(d);
      li.classList.toggle('current', step === i + 2);
      const fill = li.querySelector<HTMLElement>('[data-fill]')!;
      const score = li.querySelector<HTMLElement>('[data-score]')!;
      if (p && 'avg' in p) {
        fill.style.width = `${(p.avg / 4) * 100}%`;
        fill.style.backgroundColor = COLOR[p.nivel];
        score.textContent = `${fmt(p.avg)} · ${p.nivel}`;
      } else {
        fill.style.width = '0%';
        score.textContent = p ? 'Sin información' : '—';
      }
    });
  };
  const actualizarBotones = () => {
    root.querySelectorAll<HTMLButtonElement>('[data-need]').forEach((b) => {
      const need = b.dataset.need!;
      if (need === 'sector') { b.disabled = !val('sector'); return; }
      const d = dims.find((x) => x.id === need)!;
      const n = d.afirmaciones.filter((a) => val(a.codigo) !== undefined).length;
      b.disabled = n < d.afirmaciones.length;
      const c = root.querySelector<HTMLElement>(`[data-count="${need}"]`);
      if (c) c.textContent = `${n} de ${d.afirmaciones.length} respondidas`;
    });
  };

  const resultado = () => {
    const ps = dims.map(puntaje);
    const validos = ps.map((p, i) => ({ p, i })).filter((x): x is { p: { avg: number; unos: number; nivel: string }; i: number } => !!x.p && 'avg' in x.p);
    validos.sort((a, b) => a.p.avg - b.p.avg || b.p.unos - a.p.unos || a.i - b.i);
    const prios = validos.slice(0, 2);
    const sector = SECTORES.find((s) => s.id === val('sector'));
    q('[data-res-eyebrow]').textContent = `Resultado · ${sector?.nombre ?? 'Su organización'}`;
    q('[data-res-title]').innerHTML = prios.length
      ? `Conviene empezar por <em>${prios.map(({ i }) => CORTO[dims[i].id] ?? dims[i].nombre.toLowerCase()).join(' y ')}.</em>`
      : 'Faltan respuestas para <em>calcular su perfil.</em>';
    q('[data-prios]').innerHTML = prios
      .map(({ p, i }) => {
        const d = dims[i];
        const r = d.resultados[p.nivel];
        const links = r.servicios
          .map((c) => (servicios[c] ? `<a href="${servicios[c].href}"><span class="mono">${c}</span>${esc(servicios[c].nombre)}</a>` : ''))
          .join('');
        return `<article class="prio"><div class="p-top"><span>${d.id} · Pilar ${d.pilar}</span><span class="p-lvl">${p.nivel} · ${fmt(p.avg)}</span></div><h3>${esc(d.nombre)}</h3><p>${esc(r.mensaje)}</p>${links}</article>`;
      })
      .join('');
    const insuf = dims.filter((_, i) => ps[i] && 'insuf' in ps[i]!).map((d) => d.id);
    const ins = q('[data-insuf]');
    ins.hidden = !insuf.length;
    ins.textContent = insuf.length ? `Sin información suficiente en ${insuf.join(' y ')}. Conviene revisar esas afirmaciones con su equipo.` : '';
    const global = validos.length ? validos.reduce((s, x) => s + x.p.avg, 0) / validos.length : 0;
    const lineas = [
      'Autodiagnóstico de madurez CNV',
      `Organización: ${sector?.nombre ?? 'sin indicar'} · Equipo: ${val('tam') ?? 'sin indicar'} · Urgencia: ${val('urg') ?? 'sin indicar'}`,
      ...dims.map((d, i) => {
        const p = ps[i];
        return `${d.id} ${d.nombre}: ${!p ? 'sin responder' : 'insuf' in p ? 'sin información suficiente' : `${fmt(p.avg)} (${p.nivel})`}`;
      }),
      `Prioridades: ${prios.map(({ i }) => dims[i].id).join(' y ') || 'sin calcular'} · Índice global: ${fmt(global)}`,
    ];
    q('[data-summary-text]').textContent = lineas.join('\n');
    try {
      sessionStorage.setItem('cnv-autodiagnostico', JSON.stringify({ resumen: lineas.join('\n'), tipo: TIPO[sector?.id ?? ''] ?? '' }));
    } catch {}
  };

  const ir = (n: number) => {
    step = Math.max(0, Math.min(last, n));
    screens.forEach((s, i) => (s.hidden = i !== step));
    q('[data-step-label]').textContent = step === 0 ? 'Inicio' : step === last ? 'Resultado' : `Paso ${step} de ${last - 1}`;
    q('[data-progress]').style.width = `${(step / last) * 100}%`;
    if (step === last) resultado();
    pintarPerfil();
    actualizarBotones();
    const heading = screens[step].querySelector<HTMLElement>('h1, h2');
    if (heading && n !== 0) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  root.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === 'sector') root.dataset.sector = t.value;
    pintarPerfil();
    actualizarBotones();
  });
  root.querySelectorAll<HTMLElement>('[data-go]').forEach((b) => b.addEventListener('click', () => ir(Number(b.dataset.go))));
  q('[data-show-summary]').addEventListener('click', () => {
    const box = q('[data-summary]');
    box.hidden = false;
    box.querySelector<HTMLElement>('[data-send]')!.focus();
  });
  q('[data-print]').addEventListener('click', () => window.print());
  q('[data-restart]').addEventListener('click', () => {
    root.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((i) => (i.checked = false));
    root.dataset.sector = '';
    q('[data-summary]').hidden = true;
    try { sessionStorage.removeItem('cnv-autodiagnostico'); } catch {}
    ir(0);
  });
  ir(0);
}

const start = () =>
  document.querySelectorAll<HTMLElement>('[data-autodiag]:not([data-ready])').forEach((root) => {
    root.dataset.ready = '';
    init(root);
  });
start();
// La vista previa de una sola página reemplaza el contenido y emite "cnv:page"
document.addEventListener('cnv:page', start);
