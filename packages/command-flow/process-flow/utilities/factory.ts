import { COMMAND_META } from '@angularity/command-flow';
import { Process } from '@angularity/command-flow/process-flow';
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
