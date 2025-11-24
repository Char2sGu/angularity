import {
  COMMAND_EVENT_META,
  COMMAND_META,
  createDualUseFactory,
  DualUseFactory,
  Extend,
} from '@angularity/command-flow';
import { TypeContainer } from '@angularity/core';

import { Process } from './core';
import { ProcessEvent } from './events';

/**
 * A dual use factory for a specific `Process` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 */
export interface DualUseProcessType<Payload extends object | void, Result>
  extends DualUseFactory<
    (payload: Payload) => Extend<Process<Result>, Payload>
  > {}

/**
 * Creates a dual use factory for a specific `Process` type.
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
 * const Login = createProcessType(
 *   'Login',
 *   $type<{ username: string; password: string }>(),
 *   $type<{ accessToken: string; refreshToken: string }>(),
 * );
 * const login = Login({ username: 'user', password: 'pass' });
 * const login2 = new Login({ username: 'user', password: 'pass' });
 * ```
 */
export function createProcessType<Payload extends object | void, Result>(
  name: string,
  $payload: TypeContainer<Payload>,
  $result: TypeContainer<Result>,
): DualUseProcessType<Payload, Result> {
  return createDualUseFactory(
    name,
    (payload: Payload): Process<never> => ({
      ...payload,
      [COMMAND_META]: { process: {} },
    }),
  ) as any;
}

/**
 * A dual use factory for a specific `ProcessEvent` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 */
export interface DualUseProcessEventType<
  Source extends Process<any>,
  Payload extends object | void,
> extends DualUseFactory<
    (source: Source, payload: Payload) => Extend<ProcessEvent<Source>, Payload>
  > {}

/**
 * Creates a dual use factory for a specific `ProcessEvent` type.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @param name The name of the factory (useful for debugging).
 * @param $source The type container of the source `Process`.
 * @param $payload The type container of the payload.
 */
export function createProcessEventType<
  Source extends Process<any>,
  Payload extends object | void,
>(
  name: string,
  $source: TypeContainer<Source>,
  $payload: TypeContainer<Payload>,
): DualUseProcessEventType<Source, Payload> {
  return createDualUseFactory(
    name,
    (source: Source, payload: Payload): ProcessEvent<Source> => ({
      ...payload,
      [COMMAND_EVENT_META]: { source },
    }),
  ) as any;
}
