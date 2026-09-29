// Genera /llms.txt a partir de los datos del sitio, para asistentes de IA.
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { PILARES } from '../data/servicios';
import { SECTORES } from '../data/sectores';
import { EQUIPO } from '../data/equipo';
import { MODALIDADES } from '../data/nosotros';
import { FAQ } from '../data/faq';

export const GET: APIRoute = () => {
  const u = (p: string) => `${SITE.url}${p}`;
  const total = PILARES.reduce((n, p) => n + p.servicios.length, 0);
  const lines: string[] = [
    `# ${SITE.nombre}`,
    '',
    `> ${SITE.descripcion}`,
    '',
    `${SITE.nombre} (lema: "${SITE.lema}") fue fundada en ${SITE.ciudad} por economistas e ingenieros con experiencia directa en el Sistema Nacional de Inversiones (SNI) y en el Sistema de Monitoreo y Evaluación de Programas Públicos de Chile. Llama "intervención" a todo programa, proyecto o inversión con que una organización busca cambiar algo en un territorio.`,
    '',
    `- Sitio: ${SITE.url}`,
    `- Correo: ${SITE.email}`,
    `- LinkedIn: ${SITE.linkedin}`,
    `- Ciudad: ${SITE.ciudad}`,
    '- Idioma: español',
    '',
    `## Servicios: ${PILARES.length} pilares, ${total} servicios`,
    '',
    'Se contratan por separado o encadenados en una asesoría integral, para instituciones públicas, empresas y organizaciones del tercer sector.',
    '',
  ];
  for (const p of PILARES) {
    lines.push(`### Pilar ${p.numero}: ${p.nombre}`, '', `${p.bajada}${p.transversal ? ` (${p.transversal}.)` : ''} Página: ${u(`/servicios/${p.slug}/`)}`, '');
    for (const s of p.servicios) lines.push(`- ${s.codigo} ${s.nombre}${s.descripcion ? `: ${s.descripcion}` : ''}`);
    lines.push('');
  }
  lines.push('## Modalidades de trabajo', '', ...MODALIDADES.map((m) => `- ${m.titulo}: ${m.texto}`), '');
  lines.push('## Sectores', '');
  for (const s of SECTORES) lines.push(`- [${s.nombre}](${u(`/sectores/${s.slug}/`)}): ${s.bajada}`);
  lines.push('', '## Equipo', '');
  for (const p of EQUIPO) lines.push(`- [${p.nombre}](${u(`/nosotros/${p.slug}/`)}), ${p.cargo.toLowerCase()}. ${p.hito} Formación: ${p.formacionDetalle.join('; ')}.`);
  lines.push('', '## Preguntas frecuentes', '');
  for (const f of FAQ) lines.push(`- ${f.pregunta} ${f.respuesta}`);
  lines.push('', '## Páginas principales', '');
  [['Inicio', '/'], ['Servicios', '/servicios/'], ['Cómo trabajamos', '/como-trabajamos/'], ['Nosotros', '/nosotros/'], ['Contacto', '/contacto/']].forEach(([n, p]) =>
    lines.push(`- [${n}](${u(p)})`)
  );
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
