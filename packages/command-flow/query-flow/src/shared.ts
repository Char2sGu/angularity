import { Query } from './core';

export type QueryResultOf<Q extends Query<any>> =
  Q extends Query<infer T> ? T : never;
