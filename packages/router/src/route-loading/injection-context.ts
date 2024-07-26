import {
  ENVIRONMENT_INITIALIZER,
  inject,
  Injector,
  Provider,
  runInInjectionContext,
} from '@angular/core';
import { Route, Routes } from '@angular/router';

/**
 * Workaround to emulate an injection context in route loaders.
 * @param routes
 * @returns
 * @see https://github.com/angular/angular/issues/51532#issuecomment-1956138610
 */
export function setupInjectionContextForRouteLoading(routes: Routes): Routes {
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

  const transformRouteAndChildren = (child: Route) => {
    if (child.children) child.children.forEach(transformRouteAndChildren);
    if (!child.loadChildren) return child;
    const loadChildren = child.loadChildren;
    child.loadChildren = (...args) => {
      if (!injector) throw new Error('Missing injector');
      return runInInjectionContext(injector, () => loadChildren(...args));
    };
    return child;
  };

  return [
    {
      path: '',
      providers: [injectorInitializerProvider],
      children: routes.map(transformRouteAndChildren),
    },
  ];
}
