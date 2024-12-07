import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * Acquire a signal of the `ActivatedRoute` object of the
 * direct child route of the current route.
 *
 * @remarks
 * Requires an Injection Context.
 * Depends on `Router` and `ChildrenOutletContexts`.
 *
 * @param outlet the name of the route outlet to target,
 * defaults to name of the default outlet
 */
export function useChildActivatedRoute(
  outlet = 'primary',
): Signal<ActivatedRoute | null> {
  const router = inject(Router);
  const contexts = inject(ChildrenOutletContexts);
  const value = () => contexts.getOrCreateContext(outlet).route;
  const stream = router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map(() => value()),
  );
  return toSignal(stream, { initialValue: value() });
}
