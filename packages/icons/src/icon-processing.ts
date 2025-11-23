/**
 * Process raw icon svg by removing any hardcoded
 * dimensions and colors and apply additional styles
 * so that they can adapt to the component settings.
 * @param input the raw svg string
 * @returns the processed svg string
 */
export async function processIconSvg(
  input: string | TemplateStringsArray,
): Promise<string> {
  const raw = Array.isArray(input) ? input[0] : input;

  const { parse } = await import('node-html-parser').then((m) => m.default);

  const root = parse(raw);

  const svg = root.querySelector('svg');
  if (!svg) throw new Error('SVG element not found');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute(
    'style',
    'width: var(--icon-size); height: var(--icon-size)',
  );

  root.querySelectorAll('svg *').forEach((node) => {
    node.removeAttribute('stroke-width');
    if (node.hasAttribute('stroke') && node.getAttribute('stroke') !== 'none')
      root.setAttribute('stroke', 'currentColor');
    if (node.hasAttribute('fill') && node.getAttribute('fill') !== 'none')
      node.setAttribute('fill', 'currentColor');
    if (
      ['PATH'].includes(node.tagName) &&
      !node.hasAttribute('fill') &&
      !node.hasAttribute('stroke')
    )
      node.setAttribute('fill', 'currentColor');
  });

  return root.outerHTML;
}
