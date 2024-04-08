import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  Injector,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';
import { provide } from '@angularity/core';

export interface Elements {
  [name: string]: Type<any>;
}

export const ELEMENTS_READY = new InjectionToken<Promise<void>>(
  'ELEMENTS_READY',
);

export function provideElements(
  config: ProvideElementsConfig,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provide({
      token: ELEMENTS_READY,
      useFactory: (injector = inject(Injector)) =>
        Promise.all([import('@angular/elements'), config.loadElements()]).then(
          ([{ createCustomElement }, elementsConfig]) => {
            for (const [name, type] of Object.entries(elementsConfig)) {
              const element = createCustomElement(type, { injector });
              window.customElements.define(name, element);
            }
          },
        ),
    }),
  ]);
}

export interface ProvideElementsConfig {
  loadElements: () => Promise<Elements>;
}
