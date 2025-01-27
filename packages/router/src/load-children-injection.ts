import {
  inject,
  Injector,
  provideEnvironmentInitializer,
  runInInjectionContext,
} from '@angular/core';
import { Route } from '@angular/router';

/**
 * Workaround to emulate an injection context in the route's loadChildren resolver,
 * by retrieving the injector from the nearest `EnvironmentInjector` via a
 * route-level environment initializer.
 *
 * @param route the route config where a injection context is needed for `loadChildren`
 * @param injectorDefault the default injector to use if the environment initializer failed
 * to run, which is possible if no router navigation happens, such as during SSR route discovery.
 * @returns a new route config that can be used in replace of the given route config.
 *
 * @remarks
 * This enables asynchronous providers for routes, allowing dynamically provide
 * injectables based on external factors.
 *
 * @remarks
 * This function does not transform child routes. Invoke on each route that
 * needs an injection context.
 *
 * @example
 *  ```ts
 * export const APP_ROUTES: Routes = [
 *   setupInjectionContextForLoadChildren({
 *     path: '',
 *     loadChildren: async (providerLoader = inject(MyProviderLoader)) => [
 *       {
 *         path: '',
 *         providers: await providerLoader.load(),
 *         children: [
 *           ...
 *         ],
 *       },
 *     ],
 *   }),
 * ];
 *  ```
 *
 * @see https://github.com/angular/angular/issues/51532#issuecomment-1956138610
 * for the original inspiration for this workaround
 */
export function setupInjectionContextForLoadChildren(
  route: Route,
  injectorDefault?: () => Injector,
): Route {
  let injectorRoute: Injector | undefined;
  const injectorInitializer = () => {
    injectorRoute = inject(Injector);
  };

  const transformRoute = (child: Route) => {
    if (!child.loadChildren) return child;
    const loadChildren = child.loadChildren;
    child.loadChildren = (...args) => {
      const injector = injectorRoute ?? injectorDefault?.();
      if (!injector) throw new Error('missing injector for loadChildren');
      return runInInjectionContext(injector, () => loadChildren(...args));
    };
    return child;
  };

  return {
    path: '',
    providers: [provideEnvironmentInitializer(injectorInitializer)],
    children: [transformRoute(route)],
  };
}
