import { inject, Injector, ProviderToken } from '@angular/core';

/**
 * Inject a proxy of the target dependency, which defers the actual injection
 * until any of its properties is accessed.
 *
 * @remarks
 * This allows circular dependency injection (even though you ought not to),
 * as long as the two classes do not access each other's properties during
 * construction.
 *
 * @example
 *  ```ts
 *  export class MyService {
 *    private dep = injectRef(AnotherService);
 *  }
 *  ```
 *  ```ts
 *  export class AnotherService {
 *    private dep = injectRef(MyService);
 *  }
 *  ```
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
