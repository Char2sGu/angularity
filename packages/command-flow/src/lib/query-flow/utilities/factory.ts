import { TypeContainer } from '@angularity/core';

import { COMMAND_META } from '../../core';
import { createDualUseFactory, DualUseFactory, Extend } from '../../utilities';
import { Query } from '../core';

export interface DualUseQueryType<Payload extends object | void, Result>
  extends DualUseFactory<
    (payload: Payload) => Extend<Query<Result>, Payload>
  > {}

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
