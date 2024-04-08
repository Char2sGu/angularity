import {
  EnvironmentProviders,
  inject,
  Injector,
  makeEnvironmentProviders,
} from '@angular/core';
import { provide } from '@angularity/core';

import { ELEMENT_REGISTRY, Elements, ELEMENTS_READY } from './core';

export function provideElements(
  config: ProvideElementsConfig,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provide({
      token: ELEMENTS_READY,
      useFactory: (
        registry = inject(ELEMENT_REGISTRY),
        injector = inject(Injector),
      ) =>
        Promise.all([import('@angular/elements'), config.loadElements()]).then(
          ([{ createCustomElement }, elementsConfig]) => {
            for (const [name, type] of Object.entries(elementsConfig)) {
              const element = createCustomElement(type, { injector });
              registry.define(name, element);
            }
          },
        ),
    }),
  ]);
}

export interface ProvideElementsConfig {
  loadElements: () => Promise<Elements>;
}
