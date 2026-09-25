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
| Servicios (5 pilares, 27 servicios) | `src/data/servicios.ts` |
| Sectores, escenarios, equipo, preguntas frecuentes | `src/data/sectores.ts`, `escenarios.ts`, `equipo.ts`, `faq.ts` |
| Textos de las secciones de Inicio | `src/data/inicio.ts` |
| Menú de navegación | `src/data/site.ts` (`NAV`) |
| Colores, tipografías y estilos generales | `src/styles/global.css` |
| Páginas | `src/pages/` (cada archivo `.astro` es una URL) |
| Imágenes | `src/assets/` (se optimizan solas) · `public/` (se copian tal cual) |

Los íconos del navegador se regeneran desde `src/assets/logo-original.png` con `node tools/generar-iconos.mjs`.

`/llms.txt` (resumen para asistentes de IA) se genera solo a partir de `src/data/`; no se edita a mano.

## Publicación

1. Una sola vez: GitHub → *Settings* → *Pages* → *Source*: **GitHub Actions**.
2. Cada cambio que llega a `main` se publica solo (`.github/workflows/deploy.yml`).

## Guía de estilo: uso de "intervención"

1. La palabra se reserva para el lema **"Inteligencia aplicada a la intervención"**.
2. Se define una sola vez (Nosotros y preguntas frecuentes): *"Llamamos intervención a todo programa, proyecto o inversión con que una organización busca cambiar algo en un territorio."*
3. Fuera del lema, como máximo una vez por página y nunca en títulos.
4. En el resto, usar el término preciso según el público:

| Contexto | En lugar de "intervención" |
|---|---|
| Sector público | programas, proyectos, iniciativas de inversión, cartera |
| Empresas | inversión social, compromisos, programas en el territorio |
| Tercer sector | programas, proyectos |
| Genérico | iniciativas, acciones, decisiones de inversión |
| Verbo "intervenir" | actuar, invertir, priorizar |

Tono: frases cortas y concretas, como en el brochure ("Tableros hechos para decidir, no para llenar un reporte").
