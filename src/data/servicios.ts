// Catálogo de soluciones CNV: 5 áreas de solución y 28 servicios.
// Las áreas son la presentación comercial de los cinco pilares de la metodología interna.
// Para editar un servicio, cambie su nombre, nombre corto o descripción. El código (01.1, 01.2…)
// ordena la lista; `antes` guarda el código que tenía en la versión por pilares (para redirigir
// los enlaces antiguos).

export type Servicio = { codigo: string; nombre: string; corto: string; descripcion: string; antes: string };
export type Entregable = { titulo: string; texto: string };
export type Area = {
  numero: string;
  slug: string;
  nombre: string;
  /** Descripción breve del área (tarjetas y cabecera) */
  bajada: string;
  pregunta: string;
  /** Resumen en lenguaje sencillo (2 o 3 líneas) al inicio de la página del área */
  resumen: string;
  /** Productos ilustrativos de la oferta; no son resultados de contratos anteriores */
  entregables: Entregable[];
  /** Áreas con que suele combinarse (slugs) */
  relacionadas: string[];
  servicios: Servicio[];
};

export const AREAS: Area[] = [
  {
    numero: '01',
    slug: 'diagnostico',
    nombre: 'Diagnóstico y evidencia',
    bajada: 'Análisis territorial, identificación de brechas, datos y caracterización de necesidades.',
    pregunta: 'Qué pasa en el territorio o el área de influencia, y dónde conviene actuar primero.',
    resumen: 'Antes de actuar, conviene saber qué pasa y dónde. Estudiamos el territorio, ordenamos sus problemas por importancia y le mostramos dónde conviene actuar primero.',
    entregables: [
      { titulo: 'Mapa de brechas priorizadas', texto: 'Los problemas del territorio ordenados por importancia, con su ubicación y magnitud.' },
      { titulo: 'Línea base', texto: 'Una medición inicial que permite comparar después y saber cuánto cambió.' },
      { titulo: 'Caracterización de la oferta', texto: 'Qué programas existen, quién los ejecuta y a quién llegan.' },
    ],
    relacionadas: ['carteras-y-financiamiento', 'diseno'],
    servicios: [
      { codigo: '01.1', antes: '01.1', nombre: 'Diagnóstico socioterritorial de problemas, brechas y oportunidades', corto: 'Diagnóstico socioterritorial', descripcion: 'Jerarquiza los problemas del área de influencia con evidencia y deja instalada la línea base.' },
      { codigo: '01.2', antes: '01.3', nombre: 'Análisis de la oferta y de los programas existentes en el territorio', corto: 'Oferta y programas existentes en el territorio', descripcion: 'Qué se hace, por quién y con qué cobertura, para no duplicar ni dejar vacíos.' },
      { codigo: '01.3', antes: '01.4', nombre: 'Modelamientos y análisis aplicados a problemas sociales, productivos y territoriales', corto: 'Modelamientos y análisis aplicados', descripcion: 'Estimaciones, proyecciones y análisis georreferenciado sobre registros y fuentes secundarias.' },
      { codigo: '01.4', antes: '04.1', nombre: 'Lectura territorial de oportunidades y espacio admisible', corto: 'Lectura territorial de oportunidades', descripcion: 'El diagnóstico pasa de listar brechas a identificar oportunidades que alguien puede financiar.' },
    ],
  },
  {
    numero: '02',
    slug: 'diseno',
    nombre: 'Diseño de programas y proyectos',
    bajada: 'Formulación, rediseño, evaluación ex ante y alternativas de solución.',
    pregunta: 'Cómo se convierte el diagnóstico en programas y proyectos con resultados esperados claros.',
    resumen: 'Convertimos el diagnóstico en un plan concreto. Definimos qué programas o proyectos hacer, a quién se dirigen y qué resultado se espera de cada uno.',
    entregables: [
      { titulo: 'Teoría de cambio', texto: 'Cómo las actividades deberían producir los resultados buscados, y con qué supuestos.' },
      { titulo: 'Reglas de focalización', texto: 'Quién puede acceder al programa y con qué instrumento.' },
      { titulo: 'Expediente de postulación', texto: 'La iniciativa formulada y evaluada para presentarla a quien la aprueba o financia.' },
    ],
    relacionadas: ['diagnostico', 'evaluacion'],
    servicios: [
      { codigo: '02.1', antes: '02.1', nombre: 'Diseño o rediseño de programas públicos y de inversión social', corto: 'Diseño o rediseño de programas', descripcion: 'Teoría de cambio explícita, población definida e indicadores con medio de verificación.' },
      { codigo: '02.2', antes: '02.2', nombre: 'Diseño de mecanismos de focalización y acceso', corto: 'Focalización y acceso', descripcion: 'Quién entra al programa, con qué instrumento y bajo qué regla.' },
      { codigo: '02.3', antes: '02.3', nombre: 'Formulación y evaluación ex ante de iniciativas de inversión', corto: 'Formulación y evaluación ex ante', descripcion: 'Expediente y evaluación social cuando el proyecto tiene componente público o va a un financiador exigente.' },
    ],
  },
  {
    numero: '03',
    slug: 'evaluacion',
    nombre: 'Evaluación y seguimiento',
    bajada: 'Evaluación de resultados, indicadores, sistemas de monitoreo y apoyo frente a observaciones técnicas.',
    pregunta: 'Cómo saber si lo que se hace funciona, y cómo responder cuando el sistema de evaluación lo cuestiona.',
    resumen: 'Medimos si un programa o proyecto logra lo que busca, armamos tableros para seguirlo y le ayudamos a responder las observaciones técnicas.',
    entregables: [
      { titulo: 'Modelo de evaluación', texto: 'Qué se va a medir, cómo y contra qué escenario de comparación.' },
      { titulo: 'Tablero de seguimiento', texto: 'Indicadores actualizados para decidir durante la ejecución.' },
      { titulo: 'Respuesta a observaciones', texto: 'Cada observación clasificada por su causa y respondida con trazabilidad.' },
    ],
    relacionadas: ['diseno', 'estrategia-y-capacidades'],
    servicios: [
      { codigo: '03.1', antes: '03.1', nombre: 'Evaluación de programas y proyectos', corto: 'Evaluación de programas y proyectos', descripcion: 'Diseños de evaluación proporcionales a lo que el programa permite medir y a lo que la institución necesita para avanzar.' },
      { codigo: '03.2', antes: '03.4', nombre: 'Sistemas de seguimiento y monitoreo con indicadores multidimensionales', corto: 'Sistemas de seguimiento y monitoreo', descripcion: 'Tableros hechos para decidir, no para llenar un reporte.' },
      { codigo: '03.3', antes: '03.5', nombre: 'Análisis de contribución al desarrollo territorial', corto: 'Contribución al desarrollo territorial', descripcion: 'Efectos respecto de un escenario de comparación declarado.' },
      { codigo: '03.4', antes: '03.6', nombre: 'Bases de licitación y contraparte técnica de estudios', corto: 'Bases de licitación y contraparte técnica', descripcion: 'Revisión de términos de referencia, control metodológico y validación de resultados.' },
      { codigo: '03.5', antes: '03.8', nombre: 'Resolución de observaciones en los sistemas de evaluación', corto: 'Resolución de observaciones', descripcion: 'Clasifica las observaciones por su causa, corrige el expediente una sola vez y responde con trazabilidad, observación por observación.' },
    ],
  },
  {
    numero: '04',
    slug: 'carteras-y-financiamiento',
    nombre: 'Carteras, inversión y financiamiento',
    bajada: 'Priorización de iniciativas, estructuración de carteras y búsqueda y combinación de fuentes de financiamiento.',
    pregunta: 'Qué hacer primero, con qué recursos y con qué estructura de financiamiento.',
    resumen: 'Le ayudamos a pasar de una lista de iniciativas a una cartera ordenada, con prioridades claras y fuentes de financiamiento posibles para cada parte.',
    entregables: [
      { titulo: 'Cartera priorizada', texto: 'Iniciativas ordenadas por criterios explícitos, con secuencia y responsables.' },
      { titulo: 'Estrategia de financiamiento', texto: 'Qué fuente financia cada componente, con requisitos y plazos.' },
      { titulo: 'Caso económico', texto: 'Costos, beneficios y escenarios para presentar a quien decide o financia.' },
    ],
    relacionadas: ['diagnostico', 'estrategia-y-capacidades'],
    servicios: [
      { codigo: '04.1', antes: '01.2', nombre: 'Desarrollo de carteras desde el diagnóstico', corto: 'Carteras desde el diagnóstico', descripcion: 'Convierte cada brecha priorizada en acciones formulables, con criterios y secuencia.' },
      { codigo: '04.2', antes: '02.4', nombre: 'Formulación de carteras integrales de programas e inversión', corto: 'Carteras integrales de programas e inversión', descripcion: 'El conjunto ordenado en una secuencia, en vez de resolver las acciones de manera individual.' },
      { codigo: '04.3', antes: '03.2', nombre: 'Mapeo de fondos y fuentes de financiamiento', corto: 'Mapeo de fondos', descripcion: 'Catastro de fondos públicos, privados y multilaterales, con requisitos, montos y plazos.' },
      { codigo: '04.4', antes: '03.3', nombre: 'Diseño de estrategias de financiamiento', corto: 'Estrategias de financiamiento', descripcion: 'Combinación de fuentes pertinentes (pública, privada, mixta) según cada componente.' },
      { codigo: '04.5', antes: '04.2', nombre: 'Formulación y prueba de la oportunidad: objeto, actores y demanda', corto: 'Formulación y prueba de la oportunidad', descripcion: 'Define qué se hará, con qué actores y para qué demanda, y lo pone a prueba antes de invertir.' },
      { codigo: '04.6', antes: '04.4', nombre: 'Expediente de presentación y estructura del acuerdo', corto: 'Expediente y estructura del acuerdo', descripcion: 'Presenta la oportunidad y ordena los compromisos de cada parte.' },
      { codigo: '04.7', antes: '04.5', nombre: 'Caso económico, modelación financiera y cartera', corto: 'Caso económico y modelación financiera', descripcion: 'El financiamiento deja de ser una postulación y pasa a ser una estructura.' },
      { codigo: '04.8', antes: '04.7', nombre: 'Instrumentos de articulación público-privada', corto: 'Articulación público-privada', descripcion: 'Instrumentos para compartir financiamiento, ejecución o riesgos entre el sector público y el privado.' },
    ],
  },
  {
    numero: '05',
    slug: 'estrategia-y-capacidades',
    nombre: 'Estrategia y capacidades',
    bajada: 'Articulación institucional, modelos de gestión y fortalecimiento de equipos.',
    pregunta: 'Cómo se sostiene lo que se decide: acuerdos con las instituciones y equipos capaces de seguir por su cuenta.',
    resumen: 'Le acompañamos ante las instituciones que deben pronunciarse y formamos a su equipo para que pueda seguir por su cuenta.',
    entregables: [
      { titulo: 'Hoja de ruta institucional', texto: 'Pasos, responsables y plazos para los acuerdos con las instituciones que deben pronunciarse.' },
      { titulo: 'Plan de formación', texto: 'Contenidos y sesiones construidos sobre los casos reales del equipo.' },
      { titulo: 'Herramientas transferidas', texto: 'Planillas, modelos y guías que el equipo puede seguir usando.' },
    ],
    relacionadas: ['diseno', 'evaluacion'],
    servicios: [
      { codigo: '05.1', antes: '03.7', nombre: 'Vinculación y gestión institucional ante el sector público', corto: 'Vinculación y gestión institucional', descripcion: 'Acompaña la interlocución con los organismos que deben pronunciarse.' },
      { codigo: '05.2', antes: '04.3', nombre: 'Encuadre de la vía y capacidad de la organización para sostenerla', corto: 'Encuadre de la vía y capacidad de la organización', descripcion: 'Define quién aporta, quién opera y quién asume cada riesgo, y si la organización puede sostenerlo.' },
      { codigo: '05.3', antes: '04.6', nombre: 'Dirección estratégica de la etapa de proposición', corto: 'Dirección estratégica de la proposición', descripcion: 'Conduce la presentación ante financiadores y socios hasta lograr un acuerdo.' },
      { codigo: '05.4', antes: '05.1', nombre: 'Formación en diseño de programas evaluables y teoría de cambio', corto: 'Formación en programas evaluables', descripcion: 'Llevar lo que el equipo sabe de su iniciativa al formato que un financiador o un directorio exige.' },
      { codigo: '05.5', antes: '05.2', nombre: 'Formación en diagnóstico territorial: fuentes, métodos y evidencia', corto: 'Formación en diagnóstico territorial', descripcion: 'Qué fuentes existen, qué permite afirmar cada una y cómo se presenta y defiende un dato.' },
      { codigo: '05.6', antes: '05.3', nombre: 'Formación en indicadores, línea base y sistemas de monitoreo', corto: 'Formación en indicadores y monitoreo', descripcion: 'Qué medir, cómo levantarlo y cómo usarlo para decidir en las distintas etapas de la ejecución.' },
      { codigo: '05.7', antes: '05.4', nombre: 'Formación en carteras, priorización y estrategia de financiamiento', corto: 'Formación en carteras y financiamiento', descripcion: 'De la lista de iniciativas al portafolio con criterios, secuencia y fuentes.' },
      { codigo: '05.8', antes: '05.5', nombre: 'Transferencia de capacidades integrada a la ejecución', corto: 'Transferencia de capacidades durante la ejecución', descripcion: 'El equipo aprende mientras se ejecuta el encargo, con acompañamiento en cada etapa.' },
    ],
  },
];

export const TOTAL_SERVICIOS = AREAS.reduce((n, a) => n + a.servicios.length, 0);

/** Ancla de un servicio en la página de su área: 01.1 → s-01-1 */
export const ancla = (codigo: string) => `s-${codigo.replace('.', '-')}`;

/** Área y servicio a partir del código actual */
export function servicio(codigo: string) {
  for (const area of AREAS) {
    const s = area.servicios.find((x) => x.codigo === codigo);
    if (s) return { area, s };
  }
  throw new Error(`Servicio inexistente: ${codigo}`);
}

/** Área y servicio a partir del código que tenía en la versión por pilares */
export function porCodigoAntiguo(codigo: string) {
  for (const area of AREAS) {
    const s = area.servicios.find((x) => x.antes === codigo);
    if (s) return { area, s };
  }
  return undefined;
}

export const area = (slug: string) => AREAS.find((a) => a.slug === slug)!;

/** Página de área que reemplaza a cada pilar antiguo (/servicios/<pilar>/) */
export const PILAR_A_AREA: Record<string, string> = {
  diagnostico: 'diagnostico',
  diseno: 'diseno',
  'gestion-evaluacion-financiamiento': 'evaluacion',
  'estrategia-desarrollo-integral': 'carteras-y-financiamiento',
  capacidades: 'estrategia-y-capacidades',
};
