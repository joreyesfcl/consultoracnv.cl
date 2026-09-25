// Situaciones tipo: construidas a partir de patrones frecuentes en Chile; no corresponden a un cliente en particular.

export const ESCENARIOS = [
  {
    tipo: 'Institución pública',
    titulo: 'Cartera de proyectos con observaciones pendientes en el sistema de evaluación',
    situacion: 'Proyectos estancados con observaciones de distinta naturaleza y un equipo técnico desbordado por responsabilidades simultáneas.',
    ruta: ['Subsanación de observaciones', 'Pre-evaluación de nuevas postulaciones', 'Cartera priorizada'],
    resultado: 'Los proyectos retoman su avance hacia la recomendación favorable y las nuevas formulaciones ingresan con mayor solidez.',
  },
  {
    tipo: 'Gobierno regional',
    titulo: 'Oferta de programas desarticulada que necesita ordenarse',
    situacion: 'Programas creados de forma reactiva, con superposiciones con la oferta central y sin respaldo técnico para justificar su continuidad ante el Consejo Regional.',
    ruta: ['Análisis de la oferta', 'Diagnóstico de brechas', 'Rediseño de programas prioritarios', 'Cartera con indicadores'],
    resultado: 'Un mapa de la oferta regional, programas con diseño evaluable y una cartera que permite priorizar, justificar y demostrar resultados.',
  },
  {
    tipo: 'Empresa con operación territorial',
    titulo: 'Inversión social y compromisos normativos gestionados por separado',
    situacion: 'Cumple la normativa de sostenibilidad e invierte en iniciativas propias, pero ambas cosas se gestionan por separado y con diagnósticos fragmentados.',
    ruta: ['Diagnóstico socioterritorial', 'Evaluación de lo vigente', 'Cartera articulada', 'Monitoreo multidimensional'],
    resultado: 'Una visión integral del territorio, una cartera que articula compromisos e inversión voluntaria, e indicadores para gestionar y demostrar.',
  },
  {
    tipo: 'Fundación u ONG',
    titulo: 'Programas con varias fuentes y exigencia creciente de mostrar efectos',
    situacion: 'Ejecuta programas con distintas fuentes de financiamiento y enfrenta una exigencia creciente de demostrar efectos ante quienes los financian.',
    ruta: ['Rediseño evaluable y teoría de cambio', 'Línea base e indicadores', 'Mapeo de fondos y estrategia', 'Evaluación de resultados'],
    resultado: 'Programas con diseño defendible, fuentes de financiamiento identificadas y evidencia suficiente para solicitar nuevos recursos.',
  },
  {
    tipo: 'Gobierno regional + empresa',
    titulo: 'Articulación público-privada para el desarrollo de un territorio',
    situacion: 'Comparten objetivos de desarrollo territorial, pero cada uno planifica por separado y sin un marco técnico común.',
    ruta: ['Diagnóstico compartido', 'Sinergias', 'Cartera conjunta', 'Financiamiento mixto', 'Monitoreo articulado'],
    resultado: 'Un diagnóstico común, una cartera que combina recursos públicos y privados y un sistema de seguimiento del avance conjunto.',
  },
] as const;
