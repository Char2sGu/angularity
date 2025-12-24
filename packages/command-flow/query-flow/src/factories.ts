import {
  COMMAND_EVENT_META,
  COMMAND_META,
  createDualUseFactory,
  DualUseFactory,
  Extend,
  extendType,
} from '@angularity/command-flow';
import { TypeContainer } from '@angularity/core';

import { Query } from './core';
import { QueryEvent } from './events';
import {
  createPseudoQueryEventTypes,
  PseudoQueryEventTypes,
} from './events-pseudo';

/**
 * A dual use factory for a specific `Query` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 */
export interface DualUseQueryType<
  Payload extends object | void,
  Result,
> extends DualUseFactory<
  (payload: Payload) => Extend<Query<Result>, Payload>
> {}

/**
 * Creates a dual use factory for a specific `Query` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @param name The name of the factory (useful for debugging).
 * @param $payload The type container of the payload.
 * @param $result The type container of the result.
 *
 * @example
 * ```ts
 * const QueryUser = createQueryType(
 *   'QueryUser',
 *   $type<{ id: string }>(),
 *   $type<{ user: User }>(),
 * );
 * const userQuery = QueryUser({ id: '1' });
 * const userQuery2 = new QueryUser({ id: '1' });
 * ```
 */
export function createQueryType<Payload extends object | void, Result>(
  name: string,
  $payload: TypeContainer<Payload>,
  $result: TypeContainer<Result>,
): DualUseQueryType<Payload, Result> {
  return createDualUseFactory(
    name,
    (payload: Payload): Query<never> => ({
      ...payload,
      [COMMAND_META]: { query: {} },
    }),
  ) as any;
}

/**
 * A dual use factory for a specific `QueryEvent` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 */
export interface DualUseQueryEventType<
  Source extends Query<any>,
  Payload extends object | void,
> extends DualUseFactory<
  (source: Source, payload: Payload) => Extend<QueryEvent<Source>, Payload>
> {}

/**
 * Creates a dual use factory for a specific `QueryEvent` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @param name The name of the factory (useful for debugging).
 * @param $source The type container of the source `Query`.
 * @param $payload The type container of the payload.
 */
export function createQueryEventType<
  Source extends Query<any>,
  Payload extends object | void,
>(
  name: string,
  $source: TypeContainer<Source>,
  $payload: TypeContainer<Payload>,
): DualUseQueryEventType<Source, Payload> {
  return createDualUseFactory(
    name,
    (source: Source, payload: Payload): QueryEvent<Source> => ({
      ...payload,
      [COMMAND_EVENT_META]: { source },
    }),
  ) as any;
}

/**
 * Creates a dual use factory for a specific `Query` type with associated pseudo event types.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * The returned type also includes pseudo event types for the specific `Query` type.
 * A pseudo type is an object that supports the `instanceof` operator,
 * so that it can be used for type guarding and filtering.
 *
 * The following pseudo event types are attached to the returned factory:
 * - `Activated`: Filters `QueryActivated` events whose source is
 *    an instance of the given `Query` type.
 * - `Resolved`: Filters `QueryResolved` events whose source is
 *    an instance of the given `Query` type.
 * - `Errored`: Filters `QueryErrored` events whose source is
 *    an instance of the given `Query` type.
 * - `Inactivated`: Filters `QueryInactivated` events whose source is
 *    an instance of the given `Query` type.
 *
 * @param name The name of the factory (useful for debugging).
 * @param $payload The type container of the payload.
 * @param $result The type container of the result.
 *
 * @example
 * ```ts
 * const QueryUser = createQueryType(
 *   'QueryUser',
 *   $type<{ id: string }>(),
 *   $type<{ user: User }>(),
 * );
 * const userQuery = QueryUser({ id: '1' });
 * const userQuery2 = new QueryUser({ id: '1' });
 * events$.pipe(
 *   pickType(QueryUser.Resolved),
 * ).subscribe(event => {
 *   console.log(event instanceof QueryResolved); // true
 *   console.log(event instanceof QueryUser.Resolved); // true
 *   console.log(event[COMMAND_EVENT_META].source instanceof QueryUser); // true
 * })
 * ```
 */
export function createQueryTypeWithEvents<
  Payload extends object | void,
  Result,
>(
  name: string,
  $payload: TypeContainer<Payload>,
  $result: TypeContainer<Result>,
): DualUseQueryType<Payload, Result> & PseudoQueryEventTypes<Query<Result>> {
  const type = createQueryType<Payload, Result>(name, $payload, $result);
  const extended = extendType(type, () => createPseudoQueryEventTypes(type));
  return extended;
}
