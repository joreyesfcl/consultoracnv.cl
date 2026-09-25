// Catálogo de servicios CNV: 5 pilares y 27 servicios (fuente: brochure CNV).
// Para editar un servicio, cambie su nombre o descripción; el código (01.1, 01.2…) ordena la lista.

export type Servicio = { codigo: string; nombre: string; descripcion: string };
export type Pilar = {
  numero: string;
  slug: string;
  nombre: string;
  pregunta: string;
  bajada: string;
  transversal?: string;
  servicios: Servicio[];
};

export const PILARES: Pilar[] = [
  {
    numero: '01',
    slug: 'diagnostico',
    nombre: 'Diagnóstico e identificación de brechas',
    pregunta: 'Qué pasa en el territorio, el área de influencia y dónde resulta pertinente y conveniente intervenir.',
    bajada: 'Dónde intervenir, con quiénes y por qué. El análisis baja a la unidad territorial que corresponde, no al promedio comunal.',
    servicios: [
      { codigo: '01.1', nombre: 'Diagnóstico socioterritorial de problemas, brechas y oportunidades', descripcion: 'Jerarquiza los problemas del área de influencia con evidencia y deja instalada la línea base.' },
      { codigo: '01.2', nombre: 'Desarrollo de carteras de intervención desde el diagnóstico', descripcion: 'Convierte cada brecha priorizada en acciones formulables, con criterios y secuencia.' },
      { codigo: '01.3', nombre: 'Análisis de la oferta y de las intervenciones existentes en el territorio', descripcion: 'Qué se hace, por quién y con qué cobertura, para no duplicar ni dejar vacíos.' },
      { codigo: '01.4', nombre: 'Modelamientos y análisis aplicados a problemas sociales, productivos y territoriales', descripcion: 'Estimaciones, proyecciones y análisis georreferenciado sobre registros y fuentes secundarias.' },
    ],
  },
  {
    numero: '02',
    slug: 'diseno',
    nombre: 'Diseño óptimo de soluciones',
    pregunta: 'Cómo se convierte el diagnóstico en una cartera de acciones interrelacionadas y cuáles son sus resultados esperados.',
    bajada: 'Las decisiones de diseño condicionan todo lo que viene después. Se toman una vez, de manera deliberada, y quedan documentadas.',
    servicios: [
      { codigo: '02.1', nombre: 'Diseño o rediseño de programas de inversión social', descripcion: 'Teoría de cambio explícita, población definida e indicadores con medio de verificación.' },
      { codigo: '02.2', nombre: 'Diseño de mecanismos de focalización y acceso', descripcion: 'Quién entra al programa, con qué instrumento y bajo qué regla.' },
      { codigo: '02.3', nombre: 'Formulación y evaluación de iniciativas de inversión', descripcion: 'Expediente y evaluación social cuando el proyecto tiene componente público o va a un financiador exigente.' },
      { codigo: '02.4', nombre: 'Formulación de carteras integrales de programas e inversión', descripcion: 'El conjunto ordenado en una secuencia, en vez de resolver las acciones de manera individual.' },
    ],
  },
  {
    numero: '03',
    slug: 'gestion-evaluacion-financiamiento',
    nombre: 'Gestión, evaluación y financiamiento',
    pregunta: 'Cómo se gestiona, bajo qué mecanismos es posible financiar y cómo se demuestra el valor de las intervenciones y sus efectos directos, indirectos y externalidades.',
    bajada: 'Entre la decisión de intervenir y el resultado hay ejecución, postulaciones, reportes y rendiciones.',
    servicios: [
      { codigo: '03.1', nombre: 'Evaluación de programas e intervenciones', descripcion: 'Diseños de evaluación proporcionales a lo que la intervención permite medir y a lo que la institución necesita para avanzar.' },
      { codigo: '03.2', nombre: 'Mapeo de fondos y fuentes de financiamiento', descripcion: 'Catastro de fondos públicos, privados y multilaterales, con requisitos, montos y plazos.' },
      { codigo: '03.3', nombre: 'Diseño de estrategias de financiamiento', descripcion: 'Combinación de fuentes pertinentes (pública, privada, mixta) según cada componente.' },
      { codigo: '03.4', nombre: 'Sistemas de seguimiento y monitoreo con indicadores multidimensionales', descripcion: 'Tableros hechos para decidir, no para llenar un reporte.' },
      { codigo: '03.5', nombre: 'Análisis de contribución al desarrollo territorial', descripcion: 'Efectos respecto de un escenario de comparación declarado.' },
      { codigo: '03.6', nombre: 'Bases de licitación y contraparte técnica de estudios', descripcion: 'Revisión de términos de referencia, control metodológico y validación de resultados.' },
      { codigo: '03.7', nombre: 'Vinculación y gestión institucional ante el sector público', descripcion: 'Acompaña la interlocución con los organismos que deben pronunciarse.' },
    ],
  },
  {
    numero: '04',
    slug: 'estrategia-desarrollo-integral',
    nombre: 'Estrategia de desarrollo integral',
    pregunta: 'Con qué estructura y con qué fuentes de recursos se sostiene la ejecución ordenada de la cartera de intervenciones.',
    bajada: 'No es un servicio aislado: es una capa que se activa desde el diagnóstico y cambia lo que cada pilar entrega.',
    transversal: 'Atraviesa los pilares 01, 02 y 03',
    servicios: [
      { codigo: '04.1', nombre: 'Lectura territorial de oportunidades y espacio admisible', descripcion: 'Sobre el pilar 01: el diagnóstico pasa de listar brechas a identificar oportunidades que alguien puede financiar.' },
      { codigo: '04.2', nombre: 'Formulación y prueba de la oportunidad: objeto, actores y demanda', descripcion: 'Sobre el pilar 01.' },
      { codigo: '04.3', nombre: 'Encuadre de la vía y capacidad de la organización para sostenerla', descripcion: 'Sobre el pilar 02: el diseño define desde el inicio quién aporta, quién opera y quién carga con cada riesgo.' },
      { codigo: '04.4', nombre: 'Expediente de presentación y estructura del acuerdo', descripcion: 'Sobre el pilar 02.' },
      { codigo: '04.5', nombre: 'Caso económico, modelación financiera y cartera', descripcion: 'Sobre el pilar 03: el financiamiento deja de ser una postulación y pasa a ser una estructura.' },
      { codigo: '04.6', nombre: 'Dirección estratégica de la etapa de proposición', descripcion: 'Sobre el pilar 03.' },
      { codigo: '04.7', nombre: 'Instrumentos de articulación público-privada', descripcion: 'Sobre el pilar 03.' },
    ],
  },
  {
    numero: '05',
    slug: 'capacidades',
    nombre: 'Fortalecimiento de capacidades',
    pregunta: 'Cómo queda instalado el conocimiento en el equipo cuando nuestro acompañamiento termina.',
    bajada: 'Las instancias no tienen currículo cerrado: se estructuran sobre los casos que su equipo tiene en preparación.',
    transversal: 'Atraviesa los cuatro pilares',
    servicios: [
      { codigo: '05.1', nombre: 'Formación en diseño de intervenciones evaluables y teoría de cambio', descripcion: 'Llevar lo que el equipo sabe de su iniciativa al formato que un financiador o un directorio exige.' },
      { codigo: '05.2', nombre: 'Formación en diagnóstico territorial: fuentes, métodos y evidencia', descripcion: 'Qué fuentes existen, qué permite afirmar cada una y cómo se presenta y defiende un dato.' },
      { codigo: '05.3', nombre: 'Formación en indicadores, línea base y sistemas de monitoreo', descripcion: 'Qué medir, cómo levantarlo y cómo usarlo para decidir en las distintas etapas de la ejecución.' },
      { codigo: '05.4', nombre: 'Formación en carteras, priorización y estrategia de financiamiento', descripcion: 'De la lista de iniciativas al portafolio con criterios, secuencia y fuentes.' },
      { codigo: '05.5', nombre: 'Transferencia de capacidades integrada a la ejecución', descripcion: 'El equipo aprende mientras se ejecuta el mandato, con acompañamiento en cada etapa.' },
    ],
  },
];

export const TODOS_LOS_SERVICIOS = PILARES.flatMap((p) => p.servicios);
