// Siglas del sitio con su forma completa (WCAG 3.1.4, nivel AAA).
// conSiglas() marca cada sigla con <abbr title="…"> para que la forma completa quede disponible.
// Si agrega una sigla nueva en los textos, súmela aquí.

export const SIGLAS: Record<string, string> = {
  CEPAL: 'Comisión Económica para América Latina y el Caribe',
  GIZ: 'Sociedad Alemana de Cooperación Internacional',
  GORE: 'gobierno regional',
  MDSF: 'Ministerio de Desarrollo Social y Familia',
  ONG: 'organización no gubernamental',
  PUC: 'Pontificia Universidad Católica de Chile',
  RedSNIP: 'Red de Sistemas Nacionales de Inversión Pública de América Latina y el Caribe',
  RSE: 'responsabilidad social empresarial',
  SNI: 'Sistema Nacional de Inversiones',
};

const escapar = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const patron = new RegExp(`\\b(${Object.keys(SIGLAS).join('|')})\\b`, 'g');

/** Devuelve el texto como HTML seguro, con cada sigla dentro de <abbr title>. */
export function conSiglas(texto: string): string {
  return escapar(texto).replace(patron, (s) => `<abbr title="${SIGLAS[s]}">${s}</abbr>`);
}
