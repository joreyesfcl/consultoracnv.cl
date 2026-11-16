---
# Política de privacidad de la aplicación «CNV Agente Actividades».
# Se publica en /privacidad/agente-actividades/ (src/pages/privacidad/agente-actividades.astro).
# No aparece en el menú, el pie, el mapa del sitio, el sitemap.xml ni el llms.txt, y lleva noindex.
# Para editarla basta con cambiar este archivo: cada «## N. Título» es una sección numerada del índice.
titulo: Política de privacidad de la aplicación
aplicacion: «CNV Agente Actividades»
descripcion: Cómo la aplicación interna «CNV Agente Actividades» de Consultora CNV trata los datos públicos de Instagram que usa para preparar su agenda de actividades.
actualizada: 15 de noviembre de 2026
---

Consultora CNV («CNV») opera la aplicación «CNV Agente Actividades», una herramienta interna que revisa publicaciones públicas de instituciones en Instagram para preparar la agenda de actividades de la consultora (seminarios, conversatorios, lanzamientos y publicaciones de interés). La aplicación no tiene usuarios externos, no publica contenido, no lee mensajes privados ni recibe datos de personas que inicien sesión en ella.

## 1. Qué datos tratamos

Por medio de la API de Instagram de Meta, la aplicación obtiene únicamente datos públicos de cuentas profesionales (de empresa o de creador) de instituciones:

- El nombre de usuario de la cuenta institucional.
- De cada publicación: el texto (descripción), el enlace permanente, la fecha de publicación, el tipo de contenido y su identificador.
- Publicaciones públicas recientes asociadas a etiquetas (hashtags) sobre políticas públicas e inversión social.

También usa los datos de la propia cuenta profesional de CNV en Instagram y de su página de Facebook, necesarios para autorizar las consultas. No obtiene datos de cuentas personales, listas de seguidores, comentarios, mensajes, fotografías ni videos.

## 2. Para qué los usamos

Los datos se usan solo para identificar actividades públicas de las instituciones (fecha, lugar, organizadores y tema) y priorizarlas en un correo interno diario y en una planilla de trabajo del equipo de CNV. No se usan para publicidad, para elaborar perfiles de personas, para tomar decisiones sobre personas ni para ningún fin distinto del descrito.

## 3. Cómo los tratamos y con quién los compartimos

- Los datos se guardan en una base de datos y una planilla privadas en Google Drive, con acceso restringido al equipo de CNV.
- El texto de las publicaciones se procesa con un modelo de lenguaje de Anthropic para clasificar la actividad y extraer su fecha y lugar. Anthropic actúa como proveedor de servicios y no usa estos datos para entrenar sus modelos según sus condiciones comerciales.
- La ejecución automática ocurre en GitHub Actions y los resúmenes se envían por correo electrónico (Gmail) solo a integrantes de CNV.
- CNV no vende, licencia ni cede estos datos a terceros.

## 4. Cuánto tiempo los conservamos

El texto de las publicaciones de Instagram se elimina a los 180 días de su publicación. Se conserva solo el título breve, el enlace, la fecha y la evaluación interna de CNV. Si la aplicación deja de usarse, los datos obtenidos de Meta se eliminan.

## 5. Seguridad

Las credenciales de acceso se guardan en el gestor de secretos cifrado del repositorio y en archivos de configuración locales de equipos de CNV, nunca en el código. El acceso a la base de datos y a la planilla está limitado a cuentas autorizadas de CNV.

## 6. Cómo solicitar la eliminación de datos

Cualquier institución o persona puede pedir que se eliminen los datos de sus publicaciones escribiendo a **contacto@consultoracnv.cl** con el asunto «Eliminación de datos – Agente Actividades» e indicando la cuenta de Instagram o el enlace de la publicación. CNV eliminará los datos y responderá dentro de 10 días hábiles. Las solicitudes de Meta se atienden en el plazo que esta indique.

## 7. Cambios a esta política

CNV puede actualizar esta política. La versión vigente se publica en esta misma dirección, con su fecha de actualización.

## 8. Contacto

Consultora CNV · contacto@consultoracnv.cl · https://www.consultoracnv.cl
