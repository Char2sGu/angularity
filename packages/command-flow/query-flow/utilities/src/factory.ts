import { COMMAND_EVENT_META, COMMAND_META } from '@angularity/command-flow';
import { Query, QueryEvent } from '@angularity/command-flow/query-flow';
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

export interface DualUseQueryEventType<
  Source extends Query<any>,
  Payload extends object | void,
> extends DualUseFactory<
    (source: Source, payload: Payload) => Extend<QueryEvent<Source>, Payload>
  > {}

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
