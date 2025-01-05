import { isPlatformBrowser } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  Injector,
  provideEnvironmentInitializer,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { usePlatformOnly } from '@angularity/core';

import { ELEMENT_REGISTRY } from './element-registry';
import { Elements } from './elements';

/**
 * Offers a declarative approach to register Angular Elements in the browser platform.
 *
 * @remarks The returned providers are for `EnvironmentInjector` only, e.g. `app.config.ts`,
 * route declarations, and NgModules. The registered Angular Elements will not be unregistered
 * when the `EnvironmentInjector` is destroyed, so make sure the `EnvironmentInjector` will not
 * be destroyed anytime in the application's lifecycle.
 *
 * @remarks If the current platform is not browser, this is a noop.
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
  return provideEnvironmentInitializer(() => {
    usePlatformOnly(isPlatformBrowser, () => {
      const registry = inject(ELEMENT_REGISTRY);
      const injector = inject(Injector);
      for (const [name, type] of Object.entries(config.elements)) {
        const element = createCustomElement(type, { injector });
        registry.define(name, element);
      }
    });
  });
}

/**
 * @see `provideElements`
 */
export interface ProvideElementsConfig {
  elements: Elements;
}
