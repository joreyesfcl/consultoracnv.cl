// Textos de las secciones de Inicio (Qué cambia, En qué podemos contribuir, Desafíos).

export const CAMBIOS = [
  {
    ambito: 'Diagnóstico',
    antes: 'Cifras comunales y lo que sabe el equipo de terreno.',
    despues: 'Brechas priorizadas en el área de influencia, con línea base levantada.',
  },
  {
    ambito: 'Programas',
    antes: 'Objetivos declarativos y reporte de actividades.',
    despues: 'Teoría de cambio, población definida e indicadores con medio de verificación.',
  },
  {
    ambito: 'Financiamiento',
    antes: 'Compromisos e inversión voluntaria por vías separadas.',
    despues: 'Una cartera con fuente de financiamiento asignada a cada componente.',
  },
  {
    ambito: 'Resultados',
    antes: 'Número de beneficiarios.',
    despues: 'Contribución medida contra un escenario de comparación declarado.',
  },
];

// ¿Qué necesita resolver? Cada necesidad lleva a un área (slug de src/data/servicios.ts),
// con dos soluciones de ejemplo (códigos actuales) y un entregable posible.
export const NECESIDADES = [
  {
    texto: 'Necesitamos ordenar nuestros proyectos',
    area: 'carteras-y-financiamiento',
    servicios: ['04.1', '04.2'],
    entregable: 'cartera priorizada',
  },
  {
    texto: 'Queremos evaluar un programa',
    area: 'evaluacion',
    servicios: ['03.1', '03.2'],
    entregable: 'modelo de evaluación',
  },
  {
    texto: 'Debemos entender mejor un territorio',
    area: 'diagnostico',
    servicios: ['01.1', '01.4'],
    entregable: 'mapa de brechas priorizadas',
  },
  {
    texto: 'Buscamos financiamiento',
    area: 'carteras-y-financiamiento',
    servicios: ['04.3', '04.4'],
    entregable: 'estrategia de financiamiento',
  },
  {
    texto: 'Tenemos observaciones técnicas pendientes',
    area: 'evaluacion',
    servicios: ['03.5', '02.3'],
    entregable: 'respuesta técnica a cada observación',
  },
];

// Por qué conversar con nosotros: experiencia profesional de los socios (no de CNV como empresa).
export const DIFERENCIAL = [
  { titulo: 'Sistema Nacional de Inversiones', texto: 'Formulación y evaluación social de iniciativas de inversión pública.' },
  { titulo: 'Monitoreo y evaluación de programas', texto: 'Diseño, seguimiento y evaluación de programas sociales.' },
  { titulo: 'Políticas sociales y registros', texto: 'Focalización, registros administrativos y protección social.' },
  { titulo: 'Modelamiento y datos', texto: 'Análisis cuantitativo aplicado a problemas sociales, productivos y territoriales.' },
];

// Así transformamos un desafío en una decisión: cuatro pasos y un ejemplo ficticio por paso.
export const METODO = [
  { titulo: 'Problema', texto: 'Entendemos el desafío en sus términos, sin exigirle un nombre técnico.', ejemplo: 'El municipio tiene muchas iniciativas sin priorizar y una postulación con observaciones.' },
  { titulo: 'Evidencia', texto: 'Reunimos los datos que la decisión necesita, al nivel del territorio que corresponde.', ejemplo: 'Diagnóstico por unidad vecinal y línea base de las brechas principales.' },
  { titulo: 'Alternativas', texto: 'Comparamos opciones con criterios explícitos: cobertura, costo, plazos y financiamiento.', ejemplo: 'Tres carteras posibles, comparadas por cobertura, costo y fuentes de financiamiento.' },
  { titulo: 'Decisión y seguimiento', texto: 'La decisión queda documentada y con indicadores para seguirla en el tiempo.', ejemplo: 'Cartera priorizada para presentar al concejo, con un tablero de seguimiento.' },
];
