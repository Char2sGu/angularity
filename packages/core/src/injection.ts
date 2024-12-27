import {
  inject,
  Injector,
  ProviderToken,
  runInInjectionContext,
} from '@angular/core';

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

/**
 * Inject a dependency lazily loaded as a promise.
 *
 * @param token promise of the token to inject
 * @param injector injector to use to instantiate the dependency
 * @returns promise of the dependency instance
 *
 * @example
 * ```ts
 *  private myService = injectLazy(import('./my-service').then(m => m.MyService));
 * ```
 * ```ts
 *  async someMethod() {
 *    const service = await this.myService;
 *    service.doSomething();
 *  }
 * ```
 */
export async function injectLazy<T>(
  token: Promise<ProviderToken<T>>,
  injector = inject(Injector),
): Promise<T> {
  return token.then((t) => injector.get(t));
}

/**
 * Return a function that accepts another function.
 * The accepted function will be executed synchronously in the
 * current injection context, and its return value will be forwarded.
 *
 * @example
 * ```ts
 *  private inContext = useInjectionContext();
 * ```
 * ```ts
 * const result = inContext(() => inject(MyService).doSomething());
 * ```
 */
export const useInjectionContext =
  (injector = inject(Injector)) =>
  <T>(fn: () => T): T =>
    runInInjectionContext(injector, fn);
