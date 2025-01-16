/**
 * An callable that accepts another function, call that function and forward
 * its return value.
 */
export interface Executor {
  <R>(fn: () => R): R;
}
