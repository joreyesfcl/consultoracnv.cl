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

// Cada necesidad lleva al pilar que la resuelve (slug de src/data/servicios.ts)
export const NECESIDADES = [
  {
    icono: 'file-check',
    texto: 'Tengo proyectos con observaciones en el Sistema Nacional de Inversiones.',
    pilar: 'gestion-evaluacion-financiamiento',
  },
  {
    icono: 'map',
    texto: 'Necesito entender qué pasa en mi territorio o área de influencia.',
    pilar: 'diagnostico',
  },
  {
    icono: 'puzzle',
    texto: 'Tengo muchas iniciativas sueltas y quiero ordenarlas en una cartera.',
    pilar: 'diseno',
  },
  {
    icono: 'chart-line',
    texto: 'Debo demostrar resultados ante un directorio, un concejo o un financiador.',
    pilar: 'gestion-evaluacion-financiamiento',
  },
  {
    icono: 'wallet',
    texto: 'Busco financiamiento y no sé qué fuentes combinar ni cómo estructurarlo.',
    pilar: 'estrategia-desarrollo-integral',
  },
  {
    icono: 'graduation-cap',
    texto: 'Quiero que mi equipo formule y evalúe con más autonomía.',
    pilar: 'capacidades',
  },
] as const;

export const DESAFIOS = [
  {
    titulo: 'Alta exigencia técnica',
    texto: 'El sistema público exige metodologías rigurosas; el sector privado, estándares de sostenibilidad y compromisos regulatorios. En ambos casos la calidad técnica no es opcional.',
    icono: 'scale',
  },
  {
    titulo: 'Territorios poco comprendidos',
    texto: 'Fuentes dispersas y dinámicas complejas dificultan diagnósticos sólidos.',
    icono: 'map',
  },
  {
    titulo: 'Iniciativas desarticuladas',
    texto: 'Programas y proyectos gestionados por separado generan duplicidades y vacíos de atención.',
    icono: 'puzzle',
  },
  {
    titulo: 'Financiamiento sin estrategia',
    texto: 'Sin visión de cartera, cada acción compite sola por recursos y el alcance se reduce.',
    icono: 'wallet',
  },
  {
    titulo: 'Resultados difíciles de demostrar',
    texto: 'Sin indicadores ni evaluación, cuesta rendir cuentas ante concejos, directorios o financiadores.',
    icono: 'chart-line',
  },
  {
    titulo: 'Público y privado sin lenguaje común',
    texto: 'Cuando ambos actúan sobre el mismo territorio sin coordinarse, el potencial de colaboración se pierde. Hace falta alguien que entienda las dos lógicas.',
    icono: 'handshake',
  },
] as const;
