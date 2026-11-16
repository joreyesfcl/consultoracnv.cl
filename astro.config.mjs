// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.consultoracnv.cl',
  trailingSlash: 'always',
  // Direcciones antiguas que se trasladaron (generan páginas de redirección)
  redirects: {
    '/nosotros': '/equipo/',
    '/nosotros/francisca-moreno': '/equipo/francisca-moreno/',
    '/nosotros/tamara-van-hemelryck': '/equipo/tamara-van-hemelryck/',
    '/nosotros/jose-reyes': '/equipo/jose-reyes/',
    '/sectores/tercer-sector': '/sectores/organizaciones-sociales/',
  },
  integrations: [
    // No van al sitemap las redirecciones de /servicios/ ni las páginas con URL dedicada
    // que no se muestran en el sitio (política de privacidad del Agente Actividades).
    sitemap({ filter: (page) => !['/servicios/', '/privacidad/agente-actividades/'].some((p) => page.includes(p)) }),
  ],
});
