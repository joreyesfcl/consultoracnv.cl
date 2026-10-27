# Accesibilidad, medición y buscadores: guía de mantenimiento

Esta guía reúne lo que debe hacerse periódicamente para que consultoracnv.cl siga siendo accesible, se pueda medir y aparezca bien en Google. Complementa la [guía de prueba con usuarios](guia-prueba-con-usuarios.md).

## 1. Lo que ya se revisa solo

Cada vez que se publica un cambio, el flujo «Publicar sitio» de GitHub ejecuta una prueba automática (`npm run test:a11y`):

- axe-core con los criterios WCAG 2.2 A y AA, en tema claro y oscuro, en computador y celular;
- el enlace «Saltar al contenido» con teclado;
- que ninguna página obligue a desplazarse hacia el lado a 320 píxeles de ancho.

Si encuentra un error, **el cambio no se publica** y el sitio queda como estaba. El detalle aparece en GitHub → Actions → la ejecución en rojo → paso `npm run test:a11y`.

Una prueba automática encuentra cerca de un tercio de los problemas posibles. El resto exige revisar con personas y con lectores de pantalla, como se indica a continuación.

## 2. Prueba con lectores de pantalla (una vez al año y tras cambios grandes)

Use las mismas cinco tareas de la guía de prueba con usuarios. Si es posible, hágala con una persona que use lector de pantalla a diario, o con una organización especializada.

| Lector | Dónde | Cómo se activa |
|---|---|---|
| NVDA (gratuito) | Windows, con Chrome o Firefox | Descargar en nvaccess.org; Ctrl + Alt + N |
| VoiceOver | Mac, con Safari | Cmd + F5 |
| VoiceOver | iPhone | Ajustes → Accesibilidad → VoiceOver |
| TalkBack | Android, con Chrome | Ajustes → Accesibilidad → TalkBack |

Qué observar en cada tarea:

- ¿Se anuncia el título de cada página al llegar?
- ¿Se puede saltar por títulos (tecla H en NVDA; rotor en VoiceOver)?
- En «¿Qué necesita resolver?», ¿se anuncian «Paso 1 de 3» y «Paso 2 de 3», cada opción y la ruta sugerida al elegir?
- ¿Los enlaces dicen adónde llevan sin necesidad de leer lo que los rodea?
- En el formulario, ¿se anuncian los campos obligatorios, los errores y el mensaje de envío?

Anote cada barrera con la página, la tarea, el lector y el navegador.

## 3. Revisión con TAW y WAVE (una vez al año)

La guía de SENADIS recomienda revisar también con estas herramientas en línea:

- **TAW** (tawdis.net): escriba la dirección de cada página principal. Revise los «problemas»; las «advertencias» requieren criterio humano.
- **WAVE** (wave.webaim.org): escriba la dirección. Los íconos rojos son errores, los amarillos son alertas.

Páginas mínimas: Inicio, Soluciones, un área, un sector, Equipo, un perfil, Contacto y Accesibilidad.

## 4. Lista de chequeo para contenidos nuevos

Antes de publicar un texto, una página o una imagen nueva:

- [ ] **Imágenes:** cada imagen informativa tiene un texto alternativo que dice lo que muestra. Las decorativas, `alt=""`.
- [ ] **Títulos:** un solo título principal por página, y los subtítulos en orden, sin saltar niveles.
- [ ] **Enlaces:** el texto dice adónde lleva («Ver el área Evaluación y seguimiento», no «haga clic aquí»). Los que abren otra pestaña lo avisan.
- [ ] **Siglas:** la primera vez se escriben completas o con su explicación (por ejemplo, SNI, RSE, ONG). Si es un término técnico, se agrega al glosario.
- [ ] **Lenguaje:** frases cortas, voz activa y trato de «usted». Las páginas nuevas llevan un resumen «En pocas palabras».
- [ ] **Color:** no se usa el color como única forma de transmitir información. Los textos nuevos usan los colores del sitio, que ya cumplen el contraste.
- [ ] **Documentos PDF:** si se publica un PDF, debe ser accesible (con títulos, texto seleccionable y orden de lectura) o tener su contenido también en la página.
- [ ] **Videos:** con subtítulos; si tienen información visual importante, con descripción.

## 5. Revisión anual

1. Repetir la prueba con lectores de pantalla (sección 2) y la revisión con TAW y WAVE (sección 3).
2. Recorrer el sitio solo con teclado (Tab, Shift + Tab, Enter, Espacio, flechas y Escape).
3. Revisar con zoom al 200 % y al 400 %.
4. Actualizar la fecha y las limitaciones conocidas en la página Accesibilidad (`src/pages/accesibilidad.astro`, variable `evaluada`).
5. Responder en un plazo máximo de 5 días hábiles los reportes recibidos con el asunto «Accesibilidad».

## 6. Medición: visitas y contactos

**Visitas (Cloudflare Web Analytics):**

1. Entre a dash.cloudflare.com con la cuenta de CNV.
2. Vaya a Analytics & Logs → Web Analytics y elija consultoracnv.cl.
3. Allí verá las visitas por página, el origen (Google, LinkedIn, directo) y el dispositivo. No usa cookies ni identifica personas.

**Contactos (Formspree):** en formspree.io, el formulario del sitio muestra los mensajes recibidos.

**Indicador mensual sugerido:**

- visitas a /contacto/;
- mensajes recibidos en Formspree;
- la tasa de conversión: mensajes recibidos divididos por las visitas totales del sitio.

Anótelos cada mes en una planilla para ver la tendencia.

## 7. Google Search Console (una sola vez, luego revisión mensual)

Search Console muestra cómo aparece el sitio en Google: con qué búsquedas lo encuentran, qué páginas están indexadas y si hay errores.

1. Entre a search.google.com/search-console con una cuenta de Google de CNV.
2. Elija **Añadir propiedad → Dominio** y escriba `consultoracnv.cl`, sin www. Así quedan cubiertas todas las variantes.
3. Google pedirá verificar el dominio con un registro DNS. Como el dominio se administra en Cloudflare, Search Console suele ofrecer **verificación automática**: inicie sesión en Cloudflare cuando lo pida y autorice. Si no la ofrece, copie el registro TXT que muestra Google y agréguelo en Cloudflare → DNS → Records → Add record (tipo TXT, nombre `@`). Luego presione «Verificar».
4. En el menú **Sitemaps**, envíe `https://www.consultoracnv.cl/sitemap-index.xml`.
5. Revise cada mes:
   - **Rendimiento:** búsquedas con las que aparecen, clics y posición media;
   - **Páginas:** las que no están indexadas y por qué. Las antiguas `/servicios/` y `/nosotros/` aparecerán como «Página con redirección»; eso es correcto.
