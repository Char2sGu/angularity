import {
  ENVIRONMENT_INITIALIZER,
  inject,
  Injector,
  Provider,
  runInInjectionContext,
} from '@angular/core';
import { Route } from '@angular/router';

/**
 * Workaround to emulate an injection context in the route's loadChildren resolver.
 *
 * @param route the route config where a injection context is needed for `loadChildren`
 * @returns a new route config that can be used in replace of the given route config.
 *
 * @remarks
 * This enables asynchronous providers for routes, allowing dynamically provide
 * injectables based on external factors.
 *
 * @remarks
 * The `Injector` used for the injection context is usually the nearest
 * `EnvironmentInjector`.
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
export function setupInjectionContextForLoadChildren(route: Route): Route {
  let injector: Injector | undefined = undefined;
  const injectorInitializerProvider: Provider = {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory:
      (instance = inject(Injector)) =>
      () => {
        injector = instance;
      },
  };

  const transformRoute = (child: Route) => {
    if (!child.loadChildren) return child;
    const loadChildren = child.loadChildren;
    child.loadChildren = (...args) => {
      if (!injector) throw new Error('Missing injector');
      return runInInjectionContext(injector, () => loadChildren(...args));
    };
    return child;
  };

  return {
    path: '',
    providers: [injectorInitializerProvider],
    children: [transformRoute(route)],
  };
}
