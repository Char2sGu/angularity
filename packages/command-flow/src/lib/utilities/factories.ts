import { TypeContainer } from '@angularity/core';

import {
  Command,
  COMMAND_EVENT_META,
  COMMAND_META,
  CommandEvent,
} from '../core/core';

export type Extend<T extends object, E extends object | void> = E extends void
  ? T
  : T & E;

export interface DualUseFactory<F extends (...args: any[]) => object> {
  (...args: Parameters<F>): ReturnType<F>;
  new (...args: Parameters<F>): ReturnType<F>;
}

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

export interface DualUseCommandType<Payload extends object | void>
  extends DualUseFactory<(payload: Payload) => Extend<Command, Payload>> {}

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

export interface DualUseCommandEventType<
  Source extends Command,
  Payload extends object | void,
> extends DualUseFactory<
    (source: Source, payload: Payload) => Extend<CommandEvent<Source>, Payload>
  > {}

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
