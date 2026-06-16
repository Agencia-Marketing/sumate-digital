/**
 * Envuelve la subcadena `highlight` dentro de `heading` en un <span class="gradient-text">.
 * Devuelve HTML para usar con set:html. Si highlight está vacío o no aparece,
 * devuelve el heading sin cambios.
 */
export function highlightHeading(heading: string, highlight?: string): string {
  if (!highlight) return heading;
  const idx = heading.indexOf(highlight);
  if (idx === -1) return heading;
  return (
    heading.slice(0, idx) +
    `<span class="gradient-text">${highlight}</span>` +
    heading.slice(idx + highlight.length)
  );
}
