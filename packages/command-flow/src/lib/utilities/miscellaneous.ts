import { Type } from '@angular/core';
import { $type, TypeContainer } from '@angularity/core';

export function createPseudoType<T>(
  predicate: (input: unknown) => boolean,
): Type<T> {
  return { [Symbol.hasInstance]: predicate } as any;
}

export function assignTypeDerivedProperties<
  T extends Type<any>,
  Extras extends Record<string, unknown>,
>(
  type: T,
  derivation: (context: {
    type: T;
    $instance: TypeContainer<InstanceType<T>>;
  }) => Extras,
): T & Extras {
  return Object.assign(type, derivation({ type, $instance: $type() }));
}
