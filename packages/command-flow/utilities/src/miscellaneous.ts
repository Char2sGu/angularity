import { Type } from '@angular/core';
import { $type, TypeContainer } from '@angularity/core';

/**
 * Creates a pseudo type that behaves like a class and supports the `instanceof` operator.
 *
 * @param predicate The predicate function to use for `instanceof` checks.
 * @returns The pseudo type.
 *
 * @example
 * ```ts
 * const Cat = createPseudoType((input: unknown) => typeof input === 'object' && input !== null && 'meow' in input);
 * const cat = { meow: true };
 * console.log(cat instanceof Cat); // true
 * ```
 */
export function createPseudoType<T>(
  predicate: (input: unknown) => boolean,
): Type<T> {
  return { [Symbol.hasInstance]: predicate } as any;
}

/**
 * The context object provided to the extension function of `extendType`.
 */
export interface ExtendTypeContext<T extends Type<any>> {
  /**
   * The class to extend.
   */
  type: T;
  /**
   * A type container containing the type of the instance of the class.
   */
  $instance: TypeContainer<InstanceType<T>>;
}

/**
 * Extends a class with additional properties.
 *
 * The extension function must be provided to extend the type.
 * It will be called with the class itself and a type container containing
 * the type of the instance of the class.
 *
 * @param type The type to extend.
 * @param extension The extension function.
 * @returns The extended type.
 */
export function extendType<
  T extends Type<any>,
  Extension extends Record<string, unknown>,
>(
  type: T,
  extension: (context: ExtendTypeContext<T>) => Extension,
): T & Extension {
  return Object.assign(type, extension({ type, $instance: $type() }));
}
