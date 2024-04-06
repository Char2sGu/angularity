import {
  COMMAND_EVENT_META,
  CommandEvent,
  CommandEventMetadata,
} from '@angularity/command-flow';

import { Query } from './core';
import { QueryResultOf as ResultOf } from './shared';

export class QueryEvent<Q extends Query<any> = Query<any>>
  implements CommandEvent
{
  [COMMAND_EVENT_META]: CommandEventMetadata<Q>;
  constructor(source: Q) {
    this[COMMAND_EVENT_META] = { source };
  }
}

export class QueryActivated<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {}

export class QueryResolved<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {
  result: ResultOf<Q>;
  constructor(source: Q, result: ResultOf<Q>) {
    super(source);
    this.result = result;
  }
}

export class QueryErrored<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {
  error: unknown;
  constructor(source: Q, error: unknown) {
    super(source);
    this.error = error;
  }
}

export class QueryInactivated<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {
  constructor(source: Q) {
    super(source);
  }
}
