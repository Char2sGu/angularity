import {
  EnvironmentProviders,
  inject,
  Injector,
  provideEnvironmentInitializer,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { ELEMENT_REGISTRY } from './element-registry';
import { Elements } from './elements';

/**
 * A declarative approach to register Angular Elements.
 *
 * The elements can be either provided synchronously or asynchronously
 * via a promise.
 *
 * @remarks Noop if the current platform is not browser.
 *
 * @example
 *  ```ts
 *  export const appElements: Elements = {
 *    'my-button': ButtonComponent,
 *    'my-icon': IconComponent,
 *    'my-icon-button': IconButtonComponent,
 *  };
 *  ```
 *  ```ts
 *  providers: [
 *    provideElements(appElements),
 *  ]
 *  ```
 *  ```ts
 *  providers: [
 *    provideElements(import('./app-elements').then(m => m.appElements)),
 *  ]
 *  ```
 */
export function provideElements(
  elements: Elements | Promise<Elements>,
): EnvironmentProviders {
  return provideEnvironmentInitializer(async () => {
    const registry = inject(ELEMENT_REGISTRY);
    if (!registry) return;
    const injector = inject(Injector);
    for (const [name, type] of Object.entries(await elements)) {
      const element = createCustomElement(type, { injector });
      registry.define(name, element);
    }
  });
}
