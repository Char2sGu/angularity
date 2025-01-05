import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken, REQUEST_CONTEXT } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

export class HttpServerCache extends Map<string, Observable<any>> {}

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

export const HTTP_SERVER_CACHE_KEY = new HttpContextToken<string | null>(
  () => null,
);

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
