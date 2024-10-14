import { InjectionToken, Type } from '@angular/core';

/**
 * Declaration of Angular Element tag names and their corresponding
 * constructors.
 * @see `provideElements`
 * @see `ProvideElementsConfig`
 */
export interface Elements {
  [name: string]: Type<any>;
}

/**
 * Injection Token for the ECMA `CustomElementRegistry` instance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
 */
export const ELEMENT_REGISTRY = new InjectionToken<CustomElementRegistry>(
  'ELEMENT_REGISTRY',
  { factory: () => window.customElements },
);
