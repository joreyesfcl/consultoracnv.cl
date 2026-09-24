# consultoracnv.cl

Sitio web de Consultora CNV — https://consultoracnv.cl

Construido con [Astro](https://astro.build) (sitio estático). Se publica automáticamente en GitHub Pages al actualizar la rama `main`.

## Trabajar en local

Requiere Node.js 22 o superior.

```bash
npm install        # una sola vez
npm run dev        # vista en vivo en http://localhost:4321
npm run build      # genera el sitio final en dist/
```

## Dónde editar

| Qué | Archivo |
|---|---|
| Email, ciudad, LinkedIn, formulario, agenda, analítica | `src/data/site.ts` |
| Menú de navegación | `src/data/site.ts` (`NAV`) |
| Colores, tipografías y estilos generales | `src/styles/global.css` |
| Páginas | `src/pages/` (cada archivo `.astro` es una URL) |
| Imágenes | `src/assets/` (se optimizan solas) · `public/` (se copian tal cual) |

Los íconos del navegador se regeneran desde `logo.png` con `node tools/generar-iconos.mjs`.

## Publicación

1. Una sola vez: GitHub → *Settings* → *Pages* → *Source*: **GitHub Actions**.
2. Cada cambio que llega a `main` se publica solo (`.github/workflows/deploy.yml`).
