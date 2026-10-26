// Sectores que atiende CNV. Cada uno tiene su página en /sectores/<slug>/.

export const SECTORES = [
  {
    slug: 'publico',
    // Cómo podemos contribuir: áreas pertinentes para el sector (slugs de src/data/servicios.ts)
    contribuciones: [
      { area: 'diagnostico', texto: 'Diagnósticos por unidad territorial para decidir dónde invertir primero.' },
      { area: 'diseno', texto: 'Formulación y evaluación ex ante de iniciativas que deben pasar por el sistema de evaluación.' },
      { area: 'evaluacion', texto: 'Respuesta a observaciones técnicas y tableros para seguir lo que se ejecuta.' },
      { area: 'carteras-y-financiamiento', texto: 'Carteras priorizadas y estrategias para combinar fuentes de financiamiento.' },
    ],
    // Un ejemplo ilustrativo por sector (tipo de src/data/escenarios.ts)
    escenarios: ['Gobierno regional'],
    nombre: 'Sector público',
    icono: 'landmark',
    bajada: 'Gobiernos regionales, municipios y servicios que deben formular, evaluar y justificar su inversión ante el sistema público.',
    resumen: 'Ayudamos a gobiernos regionales, municipios y servicios públicos a preparar, evaluar y justificar sus proyectos y programas. Así pueden conseguir financiamiento y mostrar lo que logran con él.',
    perfiles: [
      { titulo: 'Municipalidades y corporaciones municipales', texto: 'Gestión local, inversión y formulación de proyectos y programas, con necesidades crecientes y recursos limitados.' },
      { titulo: 'Gobiernos regionales', texto: 'Planificación regional, carteras de inversión y programas de alcance regional con varias fuentes de financiamiento.' },
      { titulo: 'Servicios públicos y ministerios', texto: 'Políticas y programas sectoriales: su evaluación, la información que los sustenta y su gestión.' },
      { titulo: 'Asociaciones de gobiernos subnacionales', texto: 'Asociaciones de municipalidades y de gobiernos regionales: articulación entre territorios y capacidades comunes.' },
    ],
  },
  {
    slug: 'empresas',
    // Cómo podemos contribuir: áreas pertinentes para el sector (slugs de src/data/servicios.ts)
    contribuciones: [
      { area: 'diagnostico', texto: 'Diagnósticos del área de influencia para orientar la inversión social.' },
      { area: 'evaluacion', texto: 'Evaluación de programas y sistemas de monitoreo para mostrar lo que se logra.' },
      { area: 'carteras-y-financiamiento', texto: 'Carteras que articulan compromisos e inversión voluntaria, con fuentes de financiamiento.' },
      { area: 'estrategia-y-capacidades', texto: 'Articulación con instituciones públicas y acuerdos público-privados.' },
    ],
    // Un ejemplo ilustrativo por sector (tipo de src/data/escenarios.ts)
    escenarios: ['Empresa con operación territorial'],
    nombre: 'Empresas',
    icono: 'building',
    bajada: 'Empresas con operación territorial que invierten en su entorno y deben demostrar lo que logran ante directorios, reguladores y comunidades.',
    resumen: 'Ayudamos a empresas que operan en un territorio a decidir en qué invertir en su entorno. También les ayudamos a medir lo que logran y explicarlo a su directorio, a las autoridades y a las comunidades.',
    perfiles: [
      { titulo: 'Empresas con compromisos ambientales y sociales', texto: 'Minería, energía, inmobiliario, agroindustria y otros sectores con efectos territoriales que necesitan identificarse y gestionarse con rigor.' },
      { titulo: 'Áreas de gobierno, sostenibilidad y RSE', texto: 'Diagnósticos, evaluaciones y sistemas de monitoreo para programas de inversión social y ambiental.' },
      { titulo: 'Articulación público-privada', texto: 'Asociaciones público-privadas, financiamiento compartido y cooperación con organismos multilaterales.' },
    ],
  },
  {
    slug: 'organizaciones-sociales',
    // Cómo podemos contribuir: áreas pertinentes para el sector (slugs de src/data/servicios.ts)
    contribuciones: [
      { area: 'diseno', texto: 'Programas con diseño evaluable y teoría de cambio explícita.' },
      { area: 'evaluacion', texto: 'Línea base, indicadores y evaluación de resultados ante quienes financian.' },
      { area: 'carteras-y-financiamiento', texto: 'Mapeo de fondos y estrategias para combinar fuentes.' },
      { area: 'estrategia-y-capacidades', texto: 'Formación del equipo para formular y evaluar con autonomía.' },
    ],
    // Un ejemplo ilustrativo por sector (tipo de src/data/escenarios.ts)
    escenarios: ['Fundación u ONG'],
    nombre: 'Organizaciones sociales',
    icono: 'hand-heart',
    bajada: 'Fundaciones, corporaciones y organizaciones no gubernamentales (ONG) que ejecutan programas con distintas fuentes y deben rendir cuentas ante quienes los financian.',
    resumen: 'Ayudamos a fundaciones, corporaciones y ONG a diseñar programas que se puedan evaluar, a conseguir financiamiento y a rendir cuentas a quienes los apoyan.',
    perfiles: [
      { titulo: 'Fundaciones corporativas', texto: 'Brazos de inversión social que rinden cuentas ante el directorio, la comunidad y sus propios aportantes.' },
      { titulo: 'Fundaciones, corporaciones y ONG', texto: 'Programas que necesitan diseño evaluable, monitoreo y respaldo técnico ante financiadores.' },
    ],
  },
] as const;
