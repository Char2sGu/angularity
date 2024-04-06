import { TypeContainer } from '@angularity/core';

import { COMMAND_META } from '../../core';
import { createDualUseFactory, DualUseFactory, Extend } from '../../utilities';
import { Process } from '../core';

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
