import { inject, Provider } from '@angular/core';
import { provide } from '@angularity/core';

import { Icons } from './icons';

/**
 * Provides a map of icons to the icon registry `Icons` in the current injector.
 *
 * @remarks
 * Icons provided in parent injectors are preserved and merged with the new icons.
 *
 * @see `processIconSvg` for creating reusable icons like `iArrow` in the example.
 *
 * @param icons a map of icon name to SVG content
 *
 * @example
 * ```ts
 * const iArrow = `<svg width="24" height="24" fill="none" stroke="black"><path d="M12 5v14m7-7H5"/></svg>`;
 * \@Component({
 *   selector: 'some-component',
 *   providers: [provideIcons({ iArrow })],
 *   template: `
 * <agl-icon icon="iArrow" />
 * <agl-icon icon="<svg>...</svg>" />`,
 * })
 * ```
 */
export function provideIcons(icons: Icons): Provider[] {
  return [
    provide({
      token: Icons,
      useFactory: () => ({
        ...inject(Icons, { skipSelf: true, optional: true }),
        ...icons,
      }),
    }),
  ];
}
