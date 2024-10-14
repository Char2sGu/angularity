import { AbstractType } from '@angular/core';
import { filter, map, OperatorFunction } from 'rxjs';

/**
 * RxJS operator that filters out values that are not instances of the provided types.
 * Returns an `Observable` that emits only values that are instances of the
 * provided types.
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
 * RxJS operator that maps values to `undefined`. Useful when an
 * `Observable<void>` type is expected.
 */
export const mapToVoid = (): OperatorFunction<unknown, void> =>
  map(() => undefined);
