import { Process } from './core';

/**
 * Type function that returns the defined result type of a `Process` type.
 */
export type ProcessResultOf<P extends Process<any>> =
  P extends Process<infer T> ? T : never;
