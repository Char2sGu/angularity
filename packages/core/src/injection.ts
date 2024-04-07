import { inject, Injector, ProviderToken } from '@angular/core';

/**
 * Defer the injection of the provider until a property is accessed to allow
 * for circular dependencies.
 */
export function injectRef<T>(
  token: ProviderToken<T>,
  injector = inject(Injector),
): T {
  let instance: T;
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (!instance) instance = injector.get(token);
        return instance[prop as keyof T];
      },
    },
  ) as T;
}
