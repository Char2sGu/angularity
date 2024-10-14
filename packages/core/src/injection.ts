import { inject, Injector, ProviderToken } from '@angular/core';

/**
 * Inject a proxy of the target dependency, which defers the actual injection
 * until any of its properties is accessed.
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
