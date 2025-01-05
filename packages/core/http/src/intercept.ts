import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Type helper for creating Http Interceptors.
 *
 * @example
 * ```ts
 *  export const appInterceptors: HttpInterceptorFn[] = [
 *    intercept((req, next) => {
 *      // do something
 *      return next(req);
 *    }),
 *    intercept((req, next) => {
 *      // do something
 *      return next(req);
 *    }),
 *  ]
 * ```
 */
export const intercept = (i: HttpInterceptorFn): HttpInterceptorFn => i;
