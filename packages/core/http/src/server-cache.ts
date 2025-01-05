import {
  HttpContextToken,
  HttpInterceptorFn,
  ɵHTTP_ROOT_INTERCEPTOR_FNS,
} from '@angular/common/http';
import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  REQUEST_CONTEXT,
} from '@angular/core';
// eslint-disable-next-line import/no-extraneous-dependencies -- false warning: this is a subpackage of @angular/core
import { provideMulti } from '@angularity/core';
import { Observable, shareReplay } from 'rxjs';

/**
 * A cache that lives in the server and stores the observable
 * responses to HTTP requests.
 */
export class HttpServerCache extends Map<string, Observable<any>> {}

/**
 * Token whose value is the instance of `HttpServerCache` from the
 * current `REQUEST_CONTEXT`, or `null` if not found.
 *
 * Usually, the instance exists only if the application is running
 * on the server and the `REQUEST_CONTEXT` is configured to be object
 * satisfying: `{ [HttpServerCache.name]: httpServerCache }`.
 *
 * @example
 * To provide an instance of `HttpServerCache` in server.mjs:
 * ```ts
 *  const app = express();
 *  const angularApp = new AngularNodeAppEngine();
 *  const httpServerCache = new HttpServerCache();
 * ```
 * ```ts
 *  angularApp
 *    .handle(req, { [HttpServerCache.name]: httpServerCache })
 *    .then((response) =>
 *      response ? writeResponseToNodeResponse(response, res) : next(),
 *    )
 *    .catch(next);
 * ```
 */
export const HTTP_SERVER_CACHE = new InjectionToken<HttpServerCache | null>(
  'HTTP_SERVER_CACHE',
  {
    factory: () => {
      const context = inject(REQUEST_CONTEXT);
      if (!context) return null;
      if (typeof context !== 'object') return null;
      const cache = Reflect.get(context, HttpServerCache.name);
      if (!cache) return null;
      return cache;
    },
  },
);

/**
 * `HttpContextToken` that holds the cache key for the current HTTP request,
 * or `null` if this request should not be cached on the server.
 * The response of this request will be cached in the `HttpServerCache` under
 * this key, if `httpServerCacheInterceptor` is included in the interceptors.
 */
export const HTTP_SERVER_CACHE_KEY = new HttpContextToken<string | null>(
  () => null,
);

/**
 * HTTP Interceptor that caches the response of the request, if the
 * `HTTP_SERVER_CACHE_KEY` is set in the request context, under the
 * specified key in the `HttpServerCache`.
 *
 * Noop if `HTTP_SERVER_CACHE` is not available, or if `HTTP_SERVER_CACHE_KEY`
 * does not hold a value.
 *
 * @remarks
 * Including this interceptor in the regular interceptors list via
 * `withInterceptors` will break the HTTP Transfer Cache, because
 * HTTP Transfer Cache is implemented also through an interceptor
 * that is executed after all regular interceptors, which will not
 * be executed if a cached response is already returned by this
 * interceptor.
 * In order to use both Http Server Cache with Http Transfer Cache,
 * the this interceptor should be added to the root interceptors
 * list via the `ɵHTTP_ROOT_INTERCEPTOR_FNS` token.
 * The `provideHttpServerCache` function would do this for you.
 */
export const httpServerCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(HTTP_SERVER_CACHE);
  if (!cache) return next(req);
  const key = req.context.get(HTTP_SERVER_CACHE_KEY);
  if (!key) return next(req);
  if (cache.has(key)) return cache.get(key)!;
  const result$ = next(req).pipe(shareReplay(1));
  cache.set(key, result$);
  return result$;
};

/**
 * Enable HTTP Server Cache support for SSR applications.
 *
 * Http Requests with the `HTTP_SERVER_CACHE_KEY` set in the request context
 * will be permanently cached in the `HttpServerCache` under the specified key
 * until the server is restarted.
 *
 * This requires a `HttpServerCache` instance to be provided in the
 * `REQUEST_CONTEXT`. See example below.
 *
 * @example
 * To provide an instance of `HttpServerCache` in server.mjs:
 * ```ts
 *  const app = express();
 *  const angularApp = new AngularNodeAppEngine();
 *  const httpServerCache = new HttpServerCache();
 * ```
 * ```ts
 *  angularApp
 *    .handle(req, { [HttpServerCache.name]: httpServerCache })
 *    .then((response) =>
 *      response ? writeResponseToNodeResponse(response, res) : next(),
 *    )
 *    .catch(next);
 */
export function provideHttpServerCache(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: ɵHTTP_ROOT_INTERCEPTOR_FNS,
      useValue: httpServerCacheInterceptor,
    }),
  ]);
}
