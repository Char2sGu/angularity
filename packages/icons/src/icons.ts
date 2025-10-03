import { InjectionToken } from '@angular/core';

/**
 * The icon registry: map of icon name to processed SVG content.
 * @see `provideIcons` for supplying icons to the registry.
 * @see `processIconSvg` for processing icons.
 */
export const Icons = new InjectionToken<Icons>('ICONS');

/**
 * A map of icon name to SVG content.
 */
export interface Icons {
  [name: string]: string;
}
