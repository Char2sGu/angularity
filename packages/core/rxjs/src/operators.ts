import { AbstractType } from '@angular/core';
import { filter, map, OperatorFunction } from 'rxjs';

/**
 * RxJS operator that filters out values that are not instances of the provided types.
 * Returns an `Observable` that emits only values that are instances of the
 * provided types.
 *
 * @example
 *  ```ts
 *  router.events.pipe(
 *    pickType(NavigationStart, NavigationEnd)
 *  ).subscribe(console.log);
 *  ```
 */
export const pickType =
  <Types extends AbstractType<any>[]>(
    ...types: Types
  ): OperatorFunction<unknown, Types[number]['prototype']> =>
  (source) =>
    source.pipe(
      filter((c): c is Types[number]['prototype'] =>
        types.some((t) => c instanceof t),
      ),
    );

/**
 * RxJS operator that maps values to `undefined`.
 * Useful when an `Observable<void>` type is expected.
 *
 * Shorthand for `map(() => undefined)`.
 *
 * ```ts
 * const void$: Observable<void> = router.events.pipe(
 *   tap((v) => console.log(v)),
 *   mapToVoid(),
 * );
 * ```
 */
export const mapToVoid = (): OperatorFunction<unknown, void> =>
  map(() => undefined);
