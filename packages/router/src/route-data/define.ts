import { Data } from '@angular/router';

import { RouteDataToken } from './token';

/**
 * Token-value pair that associates a value to a token.
 * @see `defineRouteData` type helper for creating such objects
 */
export interface RouteDataDefinition<T, U extends T = T> {
  token: RouteDataToken<T>;
  value: U;
}

/**
 * Type helper that helps creating valid `RouteDataDefinition` objects
 * utilizing type-inference.
 *
 * @remarks The type of the `value` is guaranteed to be compatible with
 * the declared type in the token.
 *
 * @example
 *  ```ts
 *  export const NAV_STATUS = new RouteDataToken<NavStatus>("NAV_STATUS");
 *  ```
 *  ```ts
 *  defineRouteData({
 *    token: NAV_STATUS,
 *    value: NavStatus.Expanded,
 *  });
 *  ```
 *
 * @see `compileRouteData`
 */
export function defineRouteData<T, U extends T>(
  def: RouteDataDefinition<T, U>,
): typeof def {
  return def;
}

/**
 * Take a list of `RouteDataDefinition` and compile them into an object
 * that can be accepted as the data field of an Angular route, so that these
 * data records can be retrieved later.
 * @param definitions data records, preferably created via `defineRouteData`
 * @returns an object that can be used as the data of an Angular route
 *
 * @see `defineRouteData`
 * @see `useRouteData`
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
 */
export function compileRouteData(
  definitions: RouteDataDefinition<any>[],
): Data {
  const data: Data = {};
  for (const def of definitions) data[def.token.key] = def.value;
  return data;
}
