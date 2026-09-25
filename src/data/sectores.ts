// Sectores que atiende CNV. Cada uno tiene su página en /sectores/<slug>/.

export const SECTORES = [
  {
    slug: 'publico',
    servicios: ['01.1', '02.3', '03.1', '03.6', '03.7', '05.1'],
    escenarios: ['Institución pública', 'Gobierno regional', 'Gobierno regional + empresa'],
    nombre: 'Sector público',
    icono: 'landmark',
    bajada: 'Gobiernos regionales, municipios y servicios que deben formular, evaluar y justificar su inversión ante el sistema público.',
    perfiles: [
      { titulo: 'Gobiernos regionales', texto: 'Carteras de inversión, programas regionales y articulación de múltiples fuentes de financiamiento.' },
      { titulo: 'Municipios y corporaciones', texto: 'Necesidades sociales crecientes con recursos limitados: diagnóstico, formulación y gestión.' },
      { titulo: 'Servicios públicos y asociaciones de municipios', texto: 'Programas y proyectos sectoriales o supracomunales que requieren formulación, evaluación o articulación territorial.' },
      { titulo: 'Asociación de Gobiernos Regionales', texto: 'Iniciativas suprarregionales y fortalecimiento técnico para el conjunto de los gobiernos regionales.' },
    ],
  },
  {
    slug: 'empresas',
    servicios: ['01.1', '01.3', '03.4', '03.5', '04.5', '04.7'],
    escenarios: ['Empresa con operación territorial', 'Gobierno regional + empresa'],
    nombre: 'Empresas',
    icono: 'building',
    bajada: 'Empresas con operación territorial que invierten en su entorno y deben demostrar lo que logran ante directorios, reguladores y comunidades.',
    perfiles: [
      { titulo: 'Empresas con compromisos ambientales y sociales', texto: 'Minería, energía, inmobiliario, agroindustria y otros sectores con efectos territoriales que necesitan identificarse y gestionarse con rigor.' },
      { titulo: 'Áreas de gobierno, sostenibilidad y RSE', texto: 'Diagnósticos, evaluaciones y sistemas de monitoreo para programas de inversión social y ambiental.' },
      { titulo: 'Articulación público-privada', texto: 'Asociaciones público-privadas, financiamiento compartido y cooperación con organismos multilaterales.' },
    ],
  },
  {
    slug: 'tercer-sector',
    servicios: ['02.1', '03.1', '03.2', '03.3', '03.4', '05.1'],
    escenarios: ['Fundación u ONG'],
    nombre: 'Tercer sector',
    icono: 'hand-heart',
    bajada: 'Fundaciones, corporaciones y ONG que ejecutan programas con distintas fuentes y deben rendir cuentas ante quienes los financian.',
    perfiles: [
      { titulo: 'Fundaciones corporativas', texto: 'Brazos de inversión social que rinden cuentas ante el directorio, la comunidad y sus propios aportantes.' },
      { titulo: 'Fundaciones, corporaciones y ONG', texto: 'Programas que necesitan diseño evaluable, monitoreo y respaldo técnico ante financiadores.' },
    ],
  },
] as const;
