// Datos generales del sitio. Edite aquí email, ciudad, redes y navegación.

export const SITE = {
  nombre: 'Consultora CNV',
  lema: 'Inteligencia aplicada a la intervención',
  descripcion:
    'Consultora chilena que acompaña a instituciones públicas, empresas y fundaciones a decidir dónde actuar, con qué programas y con qué recursos.',
  url: 'https://www.consultoracnv.cl',
  email: 'contacto@consultoracnv.cl',
  ciudad: 'Santiago, Chile',
  linkedin: 'https://www.linkedin.com/company/consultora-cnv/',
  formspree: 'https://formspree.io/f/mkopglrb',
  agenda:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0JeRaRk3viBLA3llembjLrlaj8BzzNP06K2vxMNocqTymuCixQg4oXuCfqvDlTb7k2JjWmGPiB?gv=true',
  // Token de Cloudflare Web Analytics (dejar vacío para desactivar)
  cloudflareAnalyticsToken: 'c33fc95d89ee4c55b313200f516479b3',
};

export type NavItem = { label: string; href: string };

// Menú principal: todos los ítems son enlaces directos (sin listas desplegables).
export const NAV: NavItem[] = [
  { label: 'Soluciones', href: '/soluciones/' },
  { label: 'Cómo trabajamos', href: '/como-trabajamos/' },
  { label: 'Sectores', href: '/sectores/' },
  { label: 'Equipo', href: '/equipo/' },
];

export const CTA = { label: 'Conversemos', href: '/contacto/' };
