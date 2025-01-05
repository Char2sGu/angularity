import { InjectionToken } from '@angular/core';

/**
 * Injection Token for the ECMA `CustomElementRegistry` instance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
 */

export const ELEMENT_REGISTRY = new InjectionToken<CustomElementRegistry>(
  'ELEMENT_REGISTRY',
  { factory: () => window.customElements },
);
