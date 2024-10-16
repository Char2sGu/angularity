import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import {
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';

import { RouteDataToken } from './token';

/**
 * Retrieves the value of the given `RouteDataToken` from the current or deeper
 * routes.
 * @param token the target token to retrieve value of
 * @param scope "current": retrieves from the `ActivatedRoute`; "children": retrieves
 * from the `ActivatedRoute` and all its child routes.
 * @returns signal of value of the given token, or `null` if such value is not
 * defined. Navigation may change the value.
 *
 * @example
 *  ```ts
 *  export const NAV_STATUS = new RouteDataToken<NavStatus>("NAV_STATUS");
 *  ```
 *  ```ts
 *  export const PAGE_ROUTES: Routes = [
 *    {
 *      path: "",
 *      component: PageComponent,
 *      data: compileRouteData([
 *        defineRouteData({
 *          token: NAV_STATUS,
 *          value: NavStatus.Collapsed,
 *        }),
 *      ]),
 *    },
 *  ]
 *  ```
 *  ```ts
 *  private navStatus = useRouteData(NAV_STATUS, "children");
 *  ```
 *  ```html
 *  <app-nav [status]="navStatus()" />
 *  ```
 *
 * @see `readRouteData`
 */
export function useRouteData<T>(
  token: RouteDataToken<T>,
  scope: 'current' | 'children',
): Signal<T | null> {
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  return toSignal(
    router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      switchMap(() => {
        if (scope === 'current') return route.data;
        return aggregateRouteTreeData(route);
      }),
      map((data) => (data[token.key] as T) ?? null),
    ),
    { requireSync: true },
  );
}

/**
 * Read the current value of the given token from the data object of a route.
 * @param data the data object from `ActivatedRoute` or `ActivatedRouteSnapshot`
 * @param token the target token to retrieve value of
 * @returns the value, or `undefined` if such value is not defined
 *
 * @example
 *  ```ts
 *  export const NAV_STATUS = new RouteDataToken<NavStatus>("NAV_STATUS");
 *  ```
 *  ```ts
 *  export const PAGE_ROUTES: Routes = [
 *    {
 *      path: "",
 *      component: PageComponent,
 *      data: compileRouteData([
 *        defineRouteData({
 *          token: NAV_STATUS,
 *          value: NavStatus.Collapsed,
 *        }),
 *      ]),
 *    },
 *  ]
 *  ```
 *  ```ts
 *  const route = this.activatedRoute.snapshot;
 *  const value = readRouteData(route.data, NAV_STATUS);
 *  ```
 *
 * @see `useRouteData`
 */
export function readRouteData<T>(
  data: Data,
  token: RouteDataToken<T>,
): T | undefined {
  return data[token.key];
}

function aggregateRouteTreeData(root: ActivatedRoute): Observable<Data> {
  const observables: Observable<Data>[] = [root.data];
  for (const child of root.children)
    observables.push(aggregateRouteTreeData(child));
  return combineLatest(observables).pipe(
    map((data) => Object.assign({}, ...data)),
  );
}
