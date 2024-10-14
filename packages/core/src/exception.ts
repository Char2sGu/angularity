/**
 * An Exception is a runtime exception that is meant to caught and handled.
 * On the other hand, an Error is unrecoverable and are not meant to be
 * caught.
 *
 * @example
 * ```ts
 * export class IndexOutOfRangeException extends Exception {
 *   constructor(index: number) {
 *     super(`Index ${index} is out of range`);
 *   }
 * }
 * ```
 *
 * @remarks Extending this class will automatically override the `name`
 * property to the class name, resulting in a more descriptive error message.
 */
export class Exception extends Error {
  override name = this.constructor.name;
}
