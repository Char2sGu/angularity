import {
  COMMAND_EVENT_META,
  CommandEvent,
  CommandEventMetadata,
} from '@angularity/command-flow';

import { Query } from './core';
import { QueryResultOf as ResultOf } from './shared';

/**
 * Base class for `CommandEvent`s associated with a `Query` command.
 */
export class QueryEvent<Q extends Query<any> = Query<any>>
  implements CommandEvent
{
  [COMMAND_EVENT_META]: CommandEventMetadata<Q>;
  /**
   * @param source The `Query` command that initiated the observation.
   */
  constructor(source: Q) {
    this[COMMAND_EVENT_META] = { source };
  }
}

/**
 * A `CommandEvent` signifying that
 * the reactive observation of a `Query` has been activated.
 */
export class QueryActivated<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {}

/**
 * A `CommandEvent` signifying that
 * the reactive observation of a `Query` has emitted a value.
 */
export class QueryResolved<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {
  /**
   * The value emitted.
   */
  result: ResultOf<Q>;
  constructor(source: Q, result: ResultOf<Q>) {
    super(source);
    this.result = result;
  }
}

/**
 * A `CommandEvent` signifying that
 * the reactive observation of a `Query` has errored.
 */
export class QueryErrored<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {
  /**
   * The error that occurred.
   */
  error: unknown;
  constructor(source: Q, error: unknown) {
    super(source);
    this.error = error;
  }
}

/**
 * A `CommandEvent` signifying that
 * the reactive observation of a `Query` has been deactivated.
 */
export class QueryInactivated<
  Q extends Query<any> = Query<any>,
> extends QueryEvent<Q> {
  constructor(source: Q) {
    super(source);
  }
}
