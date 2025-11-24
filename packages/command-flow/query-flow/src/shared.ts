import { Query } from './core';

/**
 * Type function that returns the defined value type of a `Query` type.
 */
export type QueryResultOf<Q extends Query<any>> =
  Q extends Query<infer T> ? T : never;
