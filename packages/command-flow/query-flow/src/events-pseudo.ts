import { Type } from '@angular/core';
import {
  COMMAND_EVENT_META as META,
  createPseudoType,
} from '@angularity/command-flow';

import { Query } from './core';
import {
  QueryActivated,
  QueryErrored,
  QueryInactivated,
  QueryResolved,
} from './events';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- index signature type issues
export type PseudoQueryEventTypes<Q extends Query<any>> = {
  ['Activated']: Type<QueryActivated<Q>>;
  ['Resolved']: Type<QueryResolved<Q>>;
  ['Errored']: Type<QueryErrored<Q>>;
  ['Inactivated']: Type<QueryInactivated<Q>>;
};

/**
 * Creates a set of pseudo event types for a specific `Query` type.
 *
 * A pseudo type is an object that supports the `instanceof` operator,
 * so that it can be used for type guarding and filtering.
 *
 * The following pseudo event types are returned:
 * - `Activated`: Filters `QueryActivated` events whose source is
 *    an instance of the given `Query` type.
 * - `Resolved`: Filters `QueryResolved` events whose source is
 *    an instance of the given `Query` type.
 * - `Errored`: Filters `QueryErrored` events whose source is
 *    an instance of the given `Query` type.
 * - `Inactivated`: Filters `QueryInactivated` events whose source is
 *    an instance of the given `Query` type.
 *
 * @param type The `Query` type.
 * @returns An object containing the pseudo event types.
 *
 * @example
 * ```ts
 * const { Activated, Resolved, Errored, Inactivated } = createPseudoQueryEventTypes(QueryUser);
 * events$.pipe(
 *   pickType(Resolved),
 * ).subscribe(event => {
 *   console.log(event instanceof QueryResolved); // true
 *   console.log(event instanceof Resolved); // true
 *   console.log(event[COMMAND_EVENT_META].source instanceof QueryUser); // true
 * })
 * ```
 */
export function createPseudoQueryEventTypes<Q extends Query<any>>(
  type: Type<Q>,
): PseudoQueryEventTypes<Q> {
  return {
    ['Activated']: createPseudoType<QueryActivated<Q>>(
      (input) =>
        input instanceof QueryActivated && input[META].source instanceof type,
    ),
    ['Resolved']: createPseudoType<QueryResolved<Q>>(
      (input) =>
        input instanceof QueryResolved && input[META].source instanceof type,
    ),
    ['Errored']: createPseudoType<QueryErrored<Q>>(
      (input) =>
        input instanceof QueryErrored && input[META].source instanceof type,
    ),
    ['Inactivated']: createPseudoType<QueryInactivated<Q>>(
      (input) =>
        input instanceof QueryInactivated && input[META].source instanceof type,
    ),
  };
}
