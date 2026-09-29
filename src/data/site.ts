// Datos generales del sitio. Edite aquí email, ciudad, redes y navegación.

export const SITE = {
  nombre: 'Consultora CNV',
  lema: 'Inteligencia aplicada a la intervención',
  descripcion:
    'Consultora chilena que acompaña a instituciones públicas, empresas y fundaciones a decidir dónde actuar, con qué programas y con qué recursos: diagnóstico, diseño, evaluación, financiamiento y monitoreo.',
  url: 'https://consultoracnv.cl',
  email: 'contacto@consultoracnv.cl',
  ciudad: 'Santiago, Chile',
  linkedin: 'https://www.linkedin.com/company/consultora-cnv/',
  formspree: 'https://formspree.io/f/mkopglrb',
  agenda:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0JeRaRk3viBLA3llembjLrlaj8BzzNP06K2vxMNocqTymuCixQg4oXuCfqvDlTb7k2JjWmGPiB?gv=true',
  // Token de Cloudflare Web Analytics (dejar vacío para desactivar)
  cloudflareAnalyticsToken: '',
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string; desc?: string }[] };

export const NAV: NavItem[] = [
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Cómo trabajamos', href: '/como-trabajamos/' },
  {
    label: 'Sectores',
    href: '/sectores/publico/',
    children: [
      { label: 'Sector público', href: '/sectores/publico/', desc: 'Gobiernos regionales, municipios y servicios' },
      { label: 'Empresas', href: '/sectores/empresas/', desc: 'Operación territorial, sostenibilidad y RSE' },
      { label: 'Tercer sector', href: '/sectores/tercer-sector/', desc: 'Fundaciones, corporaciones y ONG' },
    ],
  },
  { label: 'Nosotros', href: '/nosotros/' },
];

export const CTA = { label: 'Conversemos', href: '/contacto/' };
