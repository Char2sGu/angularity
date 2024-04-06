import { Process } from './core';

export type ProcessResultOf<P extends Process<any>> =
  P extends Process<infer T> ? T : never;
