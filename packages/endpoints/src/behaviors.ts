import { Observable, shareReplay } from 'rxjs';

import { EndpointInvokeConfig, EndpointInvoker } from './invoker';

/**
 * Decorator of an {@link EndpointInvoker} instance that
 * prepends a prefix to the path of each invocation.
 *
 * @usageNotes
 *  ```ts
 *  provide({
 *    token: EndpointInvoker,
 *    useFactory: (
 *      invoker: EndpointInvoker = inject(HttpClientEndpointInvoker),
 *    ) => {
 *      // behaviors are applied in reverse order (last -> first)
 *      invoker = new PrefixEndpointPath(invoker, "https://my.api/");
 *      invoker = new CacheEndpointResponse(invoker, c => c.method === 'GET');
 *      invoker = // other behaviors here...
 *      return invoker;
 *    },
 *  }),
 *  ```
 *
 */
export class PrefixEndpointPath implements EndpointInvoker {
  constructor(
    private kernel: EndpointInvoker,
    private prefix: string,
  ) {}

  invoke<T>(config: EndpointInvokeConfig): Observable<T> {
    config.path = this.prefix + config.path;
    return this.kernel.invoke(config);
  }
}

/**
 * Decorator of an {@link EndpointInvoker} instance that
 * caches the responses of endpoint invocations when a given criteria is met.
 *
 * @usageNotes
 *  ```ts
 *  provide({
 *    token: EndpointInvoker,
 *    useFactory: (
 *      invoker: EndpointInvoker = inject(HttpClientEndpointInvoker),
 *    ) => {
 *      // behaviors are applied in reverse order (last -> first)
 *      invoker = new PrefixEndpointPath(invoker, "https://my.api/");
 *      invoker = new CacheEndpointResponse(invoker, c => c.method === 'GET');
 *      invoker = // other behaviors here...
 *      return invoker;
 *    },
 *  }),
 *  ```
 */
export class CacheEndpointResponse implements EndpointInvoker {
  private cache = new Map<string, Observable<unknown>>();

  /**
   * @param criteria a function that determines whether
   * an endpoint invocation should be cached.
   */
  constructor(
    private kernel: EndpointInvoker,
    private criteria: (config: EndpointInvokeConfig) => boolean,
  ) {}

  invoke<T>(config: EndpointInvokeConfig): Observable<T> {
    if (this.criteria(config)) {
      const cached = this.cache.get(config.path);
      if (cached) return cached as Observable<T>;
      const observable = this.kernel.invoke<T>(config).pipe(shareReplay(1));
      this.cache.set(config.path, observable);
      return observable;
    }
    return this.kernel.invoke(config);
  }
}
