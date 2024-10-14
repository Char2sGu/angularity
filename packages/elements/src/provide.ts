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

/**
 * Offers a declarative approach to register Angular Elements.
 *
 * @remarks The returned providers are for `EnvironmentInjector` only, e.g. `app.config.ts`,
 * route declarations, and NgModules. The registered Angular Elements will not be unregistered
 * when the `EnvironmentInjector` is destroyed, so make sure the `EnvironmentInjector` will not
 * be destroyed anytime in the application's lifecycle.
 *
 * @example
 *  ```ts
 *  export const APP_ELEMENTS: Elements = {
 *    'my-button': ButtonComponent,
 *    'my-icon': IconComponent,
 *    'my-icon-button': IconButtonComponent,
 *  };
 *  ```
 *  ```ts
 *  providers: [
 *    provideElements({ elements: APP_ELEMENTS }),
 *  ]
 *  ```
 */
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

/**
 * @see `provideElements`
 */
export interface ProvideElementsConfig {
  elements: Elements;
}
