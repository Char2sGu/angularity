import { Type } from '@angular/core';

/**
 * Declaration of Angular Element tag names and
 * their corresponding implementations.
 *
 * @see `provideElements`
 *
 * @example
 * ```ts
 *  export const appElements: Elements = {
 *    'my-button': ButtonComponent,
 *    'my-icon': IconComponent,
 *  }
 * ```
 */
export interface Elements {
  readonly [name: string]: Type<any>;
}
