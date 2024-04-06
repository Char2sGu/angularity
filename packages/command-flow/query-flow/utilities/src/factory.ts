import { COMMAND_META } from '@angularity/command-flow';
import { Query } from '@angularity/command-flow/query-flow';
import {
  createDualUseFactory,
  DualUseFactory,
  Extend,
} from '@angularity/command-flow/utilities';
import { TypeContainer } from '@angularity/core';

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
