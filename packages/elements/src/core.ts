import { InjectionToken, Type } from '@angular/core';

export interface Elements {
  [name: string]: Type<any>;
}

export const ELEMENT_REGISTRY = new InjectionToken<CustomElementRegistry>(
  'ELEMENT_REGISTRY',
  { factory: () => window.customElements },
);

export const ELEMENTS_READY = new InjectionToken<Promise<void>>(
  'ELEMENTS_READY',
);
