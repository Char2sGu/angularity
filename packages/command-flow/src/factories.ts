import { TypeContainer } from '@angularity/core';

import {
  Command,
  COMMAND_EVENT_META,
  COMMAND_META,
  CommandEvent,
} from './core';

/**
 * Type function that extends an object with properties from another object or `void`.
 */
export type Extend<T extends object, E extends object | void> = E extends void
  ? T
  : T & E;

/**
 * Type function that transforms a factory function into a dual use factory.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @see `createDualUseFactory` for a function that creates dual use factories.
 */
export interface DualUseFactory<F extends (...args: any[]) => object> {
  (...args: Parameters<F>): ReturnType<F>;
  new (...args: Parameters<F>): ReturnType<F>;
  prototype: ReturnType<F>;
}

/**
 * Create a dual use factory from a factory function.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @param name The name of the factory (useful for debugging).
 * @param fn The factory function.
 *
 * @example
 * ```ts
 * const MyFactory = createDualUseFactory('MyFactory', (arg: string) => ({ arg }));
 * const instance1 = MyFactory('arg1');
 * const instance2 = new MyFactory('arg2');
 * ```
 */
export function createDualUseFactory<F extends (...args: any[]) => object>(
  name: string,
  fn: F,
): DualUseFactory<F> {
  const factory = function (this: object, ...args: Parameters<F>) {
    const calledWithNew = this instanceof factory;
    if (!calledWithNew) return new factory(...args);
    return Object.assign(this, fn(...args));
  } as DualUseFactory<F>;
  Object.defineProperty(factory, 'name', { value: name });
  return factory;
}

/**
 * A dual use factory of `Command` that accepts a payload object and returns
 * a `Command` instance with all properties from the payload.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @see `createCommandType` for a function that creates dual use command factories.
 */
export interface DualUseCommandType<Payload extends object | void>
  extends DualUseFactory<(payload: Payload) => Extend<Command, Payload>> {}

/**
 * Create a dual use factory of `Command`.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @param name The name of the factory (useful for debugging).
 * @param $payload The type container of the payload.
 * @returns The dual use factory.
 *
 * @example
 * ```ts
 * const DoSomething = createCommandType('DoSomething', $type<{ foo: string }>());
 * const command1 = DoSomething({ foo: 'bar' });
 * const command2 = new DoSomething({ foo: 'bar' });
 * ```
 */
export function createCommandType<Payload extends object | void>(
  name: string,
  $payload: TypeContainer<Payload>,
): DualUseCommandType<Payload> {
  return createDualUseFactory(
    name,
    (payload: Payload): Command => ({
      ...payload,
      [COMMAND_META]: {},
    }),
  ) as any;
}

/**
 * A dual use factory of `CommandEvent` that accepts a source command and a payload object
 * and returns a `CommandEvent` instance with all properties from the payload
 * and with the `source` metadata set to the given source command.
 *
 * A dual use factory supports both function and constructor calls to create objects.
 * It can be regarded as a class constructor that also supports regular function calls for convenience.
 *
 * @see `createCommandEventType` for a function that creates dual use command event factories.
 */
export interface DualUseCommandEventType<
  Source extends Command,
  Payload extends object | void,
> extends DualUseFactory<
    (source: Source, payload: Payload) => Extend<CommandEvent<Source>, Payload>
  > {}

/**
 * Create a dual use factory of `CommandEvent`.
 *
 * @param name The name of the factory (useful for debugging).
 * @param $source The type container of the source command.
 * @param $payload The type container of the payload.
 * @returns The dual use factory.
 *
 * @example
 * ```ts
 * declare const command: DoSomething;
 * const DoSomethingCompleted = createCommandEventType('DoSomethingCompleted', $type<DoSomething>(), $type<{ foo: string }>());
 * const event1 = DoSomethingCompleted(command, { foo: 'bar' });
 * const event2 = new DoSomethingCompleted(command, { foo: 'bar' });
 * ```
 */
export function createCommandEventType<
  Source extends Command,
  Payload extends object | void,
>(
  name: string,
  $source: TypeContainer<Source>,
  $payload: TypeContainer<Payload>,
): DualUseCommandEventType<Source, Payload> {
  return createDualUseFactory(
    name,
    (source: Source, payload: Payload): CommandEvent<Source> => ({
      ...payload,
      [COMMAND_EVENT_META]: { source },
    }),
  ) as any;
}
