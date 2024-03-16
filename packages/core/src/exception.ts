/**
 * An {@link Exception} is a casual runtime error that is expected to happen,
 * while an {@link Error} is a critical runtime error that should not happen.
 */
export class Exception extends Error {
  override name = this.constructor.name;
}
