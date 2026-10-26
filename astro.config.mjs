// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://consultoracnv.cl',
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
    sitemap(),
  ],
});
