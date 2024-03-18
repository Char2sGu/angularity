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

function aggregateRouteTreeData(root: ActivatedRoute): Observable<Data> {
  const observables: Observable<Data>[] = [root.data];
  for (const child of root.children)
    observables.push(aggregateRouteTreeData(child));
  return combineLatest(observables).pipe(
    map((data) => Object.assign({}, ...data)),
  );
}
