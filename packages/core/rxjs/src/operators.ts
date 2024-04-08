import { AbstractType } from '@angular/core';
import { filter, map, OperatorFunction } from 'rxjs';

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

export const mapToVoid = (): OperatorFunction<unknown, void> =>
  map(() => undefined);
