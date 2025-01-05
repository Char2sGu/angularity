import { Type } from '@angular/core';

/**
 * Declaration of Angular Element tag names and their corresponding
 * constructors.
 * @see `provideElements`
 * @see `ProvideElementsConfig`
 */
export interface Elements {
  [name: string]: Type<any>;
}
