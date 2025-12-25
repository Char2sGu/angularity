/**
 * Indicates that the function is not yet implemented.
 *
 * Useful for designing APIs by allowing developers to plan function signatures
 * without providing implementations immediately.
 *
 * @param message comment or description
 *
 * @example
 * ```ts
 * function myAwesomeFunction(): void {
 *   todo('here we will do foo and bar');
 * }
 * ```
 */
export function todo(message?: string): never {
  const msg = message ? `: ${message}` : '';
  throw new Error(`not implemented${msg}`);
}
