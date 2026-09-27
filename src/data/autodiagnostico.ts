// Autodiagnóstico de madurez en decisiones de inversión territorial.
// Contenido del borrador v0.1 (en revisión por las socias): para cambiar una afirmación,
// un umbral o un mensaje, edite este archivo. La lógica está en src/scripts/autodiagnostico.ts.

export const VERSION = 'v0.1';

/** Escala de respuesta; el valor 0 corresponde a «No sé / No aplica» y no suma. */
export const ESCALA = [
  { v: 1, texto: 'No existe' },
  { v: 2, texto: 'Existe de forma parcial' },
  { v: 3, texto: 'Existe, pero no se usa para decidir' },
  { v: 4, texto: 'Existe y se usa para decidir' },
];

/** Umbrales de nivel por dimensión (promedio de 1 a 4). */
export const NIVELES = [
  { nivel: 'Inicial', hasta: 2 },
  { nivel: 'En desarrollo', hasta: 3 },
  { nivel: 'Consolidado', hasta: Infinity },
] as const;

export const SECTORES = [
  { id: 'publico', nombre: 'Institución pública', detalle: 'Gobierno regional, municipio, servicio o asociación' },
  { id: 'empresa', nombre: 'Empresa', detalle: 'Operación territorial, sostenibilidad o RSE' },
  { id: 'tercer', nombre: 'Fundación u ONG', detalle: 'Fundación corporativa, corporación u ONG' },
] as const;

export const TAMANOS = ['1 a 2 personas', '3 a 5', '6 a 15', 'Más de 15'];
export const URGENCIAS = ['Postulación o revisión próxima', 'Rendición ante directorio o financiador', 'Planificación sin plazo externo', 'Otra'];

/** Dimensiones: una por pilar, con tres afirmaciones. `publico` y `privado` son variantes de redacción
 *  para sector público y para empresas y tercer sector (si faltan, se usa `texto`). */
export const DIMENSIONES = [
  {
    id: 'D1',
    pilar: '01',
    nombre: 'Diagnóstico y brechas',
    afirmaciones: [
      { codigo: 'D1.1',
        texto: 'Contamos con un diagnóstico del territorio donde actuamos, con datos de los últimos tres años.',
        publico: 'Contamos con un diagnóstico comunal o regional (PLADECO, Estrategia Regional de Desarrollo u otro) con datos de los últimos tres años.',
        privado: 'Contamos con un diagnóstico del área de influencia de nuestra operación o de nuestros programas, con datos de los últimos tres años.' },
      { codigo: 'D1.2',
        texto: 'Los problemas y brechas del territorio están cuantificados y ordenados según un criterio de prioridad que está escrito.' },
      { codigo: 'D1.3',
        texto: 'Sabemos qué programas y proyectos de otras instituciones operan en el mismo territorio y con qué cobertura.',
        publico: 'Sabemos qué programas y proyectos de otros servicios públicos, municipios y privados operan en el mismo territorio y con qué cobertura.',
        privado: 'Sabemos qué programas y proyectos del Estado, de otras empresas y de fundaciones operan en el mismo territorio y con qué cobertura.' },
    ],
    resultados: {
      'Inicial': { mensaje: 'Las decisiones se toman sin una base común de información sobre el territorio. Conviene partir por un diagnóstico con línea base y brechas priorizadas.', servicios: ['01.1', '01.3'] },
      'En desarrollo': { mensaje: 'Hay información, pero no está ordenada para priorizar. El paso siguiente es cuantificar las brechas y convertirlas en una cartera.', servicios: ['01.2', '01.4'] },
      'Consolidado': { mensaje: 'La base de información está instalada y puede usarse para identificar oportunidades de inversión con otros actores.', servicios: ['04.1'] },
    },
  },
  {
    id: 'D2',
    pilar: '02',
    nombre: 'Diseño de soluciones',
    afirmaciones: [
      { codigo: 'D2.1',
        texto: 'Nuestros programas y proyectos principales tienen una teoría de cambio o un marco lógico, con población objetivo definida e indicadores con medio de verificación.' },
      { codigo: 'D2.2',
        texto: 'Antes de decidir una iniciativa, comparamos al menos dos alternativas de solución según su costo y el resultado esperado.',
        publico: 'Antes de postular una iniciativa, comparamos al menos dos alternativas de solución, como exige la evaluación ex ante del Sistema Nacional de Inversiones (SNI) o de programas sociales.' },
      { codigo: 'D2.3',
        texto: 'Cada programa tiene reglas de acceso escritas (quién puede participar, con qué instrumento se selecciona y bajo qué regla) y se aplican de la misma forma a todos.' },
    ],
    resultados: {
      'Inicial': { mensaje: 'Los programas no tienen un diseño explícito, por lo que será difícil evaluarlos o conseguir financiamiento externo.', servicios: ['02.1', '05.1'] },
      'En desarrollo': { mensaje: 'Hay diseño, pero faltan la comparación de alternativas o reglas de acceso claras.', servicios: ['02.2', '02.3'] },
      'Consolidado': { mensaje: 'Los programas están bien diseñados. Puede ordenarlos en una cartera integrada.', servicios: ['02.4'] },
    },
  },
  {
    id: 'D3',
    pilar: '03',
    nombre: 'Gestión, evaluación y financiamiento',
    afirmaciones: [
      { codigo: 'D3.1',
        texto: 'Hacemos seguimiento de nuestros programas con indicadores de resultado, además de indicadores de actividad o de gasto.' },
      { codigo: 'D3.2',
        texto: 'Al menos uno de nuestros programas principales fue evaluado en los últimos cinco años y sus resultados llevaron a cambios concretos.' },
      { codigo: 'D3.3',
        texto: 'Identificamos y usamos fuentes de financiamiento distintas del presupuesto propio.',
        publico: 'Identificamos y usamos fuentes distintas del presupuesto propio, como fondos sectoriales, FNDR, convenios de programación o aportes privados.',
        privado: 'Identificamos y usamos fuentes distintas del presupuesto propio, como fondos públicos concursables, cofinanciamiento con el Estado o fondos multilaterales.' },
    ],
    resultados: {
      'Inicial': { mensaje: 'No hay información sobre resultados, lo que dificulta rendir cuentas y atraer financiamiento.', servicios: ['03.4', '03.2'] },
      'En desarrollo': { mensaje: 'Se mide la gestión, pero faltan evaluaciones de resultados o nuevas fuentes de financiamiento.', servicios: ['03.1', '03.3'] },
      'Consolidado': { mensaje: 'La gestión está instalada. Puede medir su contribución al territorio y ordenar la relación con los organismos públicos que deben pronunciarse.', servicios: ['03.5', '03.7'] },
    },
  },
  {
    id: 'D4',
    pilar: '04',
    nombre: 'Estrategia de desarrollo integral',
    afirmaciones: [
      { codigo: 'D4.1',
        texto: 'Identificamos oportunidades de inversión en el territorio que otros actores, públicos o privados, estarían dispuestos a cofinanciar.' },
      { codigo: 'D4.2',
        texto: 'En las iniciativas de mayor tamaño definimos desde el diseño quién aporta recursos, quién opera y quién asume cada riesgo.' },
      { codigo: 'D4.3',
        texto: 'Tenemos acuerdos o instancias de trabajo vigentes con actores de otro sector para ejecutar iniciativas conjuntas.',
        publico: 'Tenemos acuerdos o instancias de trabajo vigentes con empresas, fundaciones u otros niveles del Estado para ejecutar iniciativas conjuntas.',
        privado: 'Tenemos acuerdos o instancias de trabajo vigentes con el gobierno regional, municipios o servicios públicos para ejecutar iniciativas conjuntas.' },
    ],
    resultados: {
      'Inicial': { mensaje: 'Las iniciativas se financian y ejecutan sin socios. Hay espacio para identificar oportunidades compartidas.', servicios: ['04.1', '04.2'] },
      'En desarrollo': { mensaje: 'Existen oportunidades o alianzas, pero sin una estructura que defina aportes, operación y riesgos.', servicios: ['04.3', '04.4'] },
      'Consolidado': { mensaje: 'Hay alianzas estructuradas. El paso siguiente es el caso económico y los instrumentos de articulación público-privada.', servicios: ['04.5', '04.7'] },
    },
  },
  {
    id: 'D5',
    pilar: '05',
    nombre: 'Capacidades',
    afirmaciones: [
      { codigo: 'D5.1',
        texto: 'El equipo técnico tiene competencias en formulación, evaluación y seguimiento de programas o proyectos.' },
      { codigo: 'D5.2',
        texto: 'Los procedimientos de formulación y de seguimiento están escritos y el equipo los usa.' },
      { codigo: 'D5.3',
        texto: 'Si una persona clave deja la organización, el trabajo técnico continúa sin pérdida importante de información.' },
    ],
    resultados: {
      'Inicial': { mensaje: 'El conocimiento técnico depende de pocas personas. Conviene transferir capacidades mientras se ejecuta el trabajo.', servicios: ['05.5', '05.3'] },
      'En desarrollo': { mensaje: 'Hay competencias, pero sin procedimientos escritos que las sostengan.', servicios: ['05.3', '05.4'] },
      'Consolidado': { mensaje: 'Las capacidades están instaladas. La formación puede concentrarse en materias nuevas.', servicios: ['05.2', '05.4'] },
    },
  },
];
