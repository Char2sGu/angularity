import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Injector,
  makeEnvironmentProviders,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { provideMulti } from '@angularity/core';

import { ELEMENT_REGISTRY, Elements } from './core';

export function provideElements(
  config: ProvideElementsConfig,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: ENVIRONMENT_INITIALIZER,
      useFactory:
        (registry = inject(ELEMENT_REGISTRY), injector = inject(Injector)) =>
        () => {
          for (const [name, type] of Object.entries(config.elements)) {
            const element = createCustomElement(type, { injector });
            registry.define(name, element);
          }
        },
    }),
  ]);
}

export interface ProvideElementsConfig {
  elements: Elements;
}
