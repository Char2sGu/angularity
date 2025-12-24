import { Type } from '@angular/core';
import {
  COMMAND_EVENT_META as META,
  createPseudoType,
} from '@angularity/command-flow';

import { Process } from './core';
import { ProcessCompleted, ProcessFailed, ProcessStarted } from './events';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- index signature type issues
export type PseudoProcessEventTypes<P extends Process<any>> = {
  ['Started']: Type<ProcessStarted<P>>;
  ['Completed']: Type<ProcessCompleted<P>>;
  ['Failed']: Type<ProcessFailed<P>>;
};

/**
 * Creates a set of pseudo event types for a specific `Process` type.
 *
 * A pseudo type is an object that supports the `instanceof` operator,
 * so that it can be used for type guarding and filtering.
 *
 * The following pseudo event types are returned:
 * - `Started`: Filters `ProcessStarted` events whose source is
 *    an instance of the given `Process` type.
 * - `Completed`: Filters `ProcessCompleted` events whose source is
 *    an instance of the given `Process` type.
 * - `Failed`: Filters `ProcessFailed` events whose source is
 *    an instance of the given `Process` type.
 *
 * @param type The `Process` type.
 * @returns An object containing the pseudo event types.
 *
 * @example
 * ```ts
 * const { Started, Completed, Failed } = createPseudoProcessEventTypes(Login);
 * events$.pipe(
 *   pickType(Completed),
 * ).subscribe(event => {
 *   console.log(event instanceof ProcessCompleted); // true
 *   console.log(event instanceof Completed); // true
 *   console.log(event[COMMAND_EVENT_META].source instanceof Login); // true
 * })
 * ```
 */
export function createPseudoProcessEventTypes<P extends Process<any>>(
  type: Type<P>,
): PseudoProcessEventTypes<P> {
  return {
    ['Started']: createPseudoType<ProcessStarted<P>>(
      (input) =>
        input instanceof ProcessStarted && input[META].source instanceof type,
    ),
    ['Completed']: createPseudoType<ProcessCompleted<P>>(
      (input) =>
        input instanceof ProcessCompleted && input[META].source instanceof type,
    ),
    ['Failed']: createPseudoType<ProcessFailed<P>>(
      (input) =>
        input instanceof ProcessFailed && input[META].source instanceof type,
    ),
  };
}
