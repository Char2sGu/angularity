import { Type } from '@angular/core';
import { $type, TypeContainer } from '@angularity/core';

export function createPseudoType<T>(
  predicate: (input: unknown) => boolean,
): Type<T> {
  return { [Symbol.hasInstance]: predicate } as any;
}

export function extendType<
  T extends Type<any>,
  Extension extends Record<string, unknown>,
>(
  type: T,
  extension: (context: {
    type: T;
    $instance: TypeContainer<InstanceType<T>>;
  }) => Extension,
): T & Extension {
  return Object.assign(type, extension({ type, $instance: $type() }));
}
