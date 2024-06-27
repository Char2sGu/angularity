import { COMMAND_EVENT_META, COMMAND_META } from '@angularity/command-flow';
import { Process, ProcessEvent } from '@angularity/command-flow/process-flow';
import {
  createDualUseFactory,
  DualUseFactory,
  Extend,
} from '@angularity/command-flow/utilities';
import { TypeContainer } from '@angularity/core';

export interface DualUseProcessType<Payload extends object | void, Result>
  extends DualUseFactory<
    (payload: Payload) => Extend<Process<Result>, Payload>
  > {}

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

export interface DualUseProcessEventType<
  Source extends Process<any>,
  Payload extends object | void,
> extends DualUseFactory<
    (source: Source, payload: Payload) => Extend<ProcessEvent<Source>, Payload>
  > {}

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
