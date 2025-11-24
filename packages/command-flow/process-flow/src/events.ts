import {
  COMMAND_EVENT_META,
  CommandEvent,
  CommandEventMetadata,
} from '@angularity/command-flow';

import { Process } from './core';
import { ProcessResultOf as ResultOf } from './shared';

/**
 * Base class for `CommandEvent`s associated with a `Process` command.
 */
export abstract class ProcessEvent<P extends Process<any> = Process<any>>
  implements CommandEvent
{
  [COMMAND_EVENT_META]: CommandEventMetadata<P>;
  /**
   * @param source The `Process` command that initiated the process.
   */
  constructor(source: P) {
    this[COMMAND_EVENT_META] = { source };
  }
}

/**
 * A `CommandEvent` signifying that
 * the process associated with a `Process` command has been started.
 */
export class ProcessStarted<
  P extends Process<any> = Process<any>,
> extends ProcessEvent<P> {}

/**
 * A `CommandEvent` signifying that
 * the process associated with a `Process` command has been completed successfully.
 */
export class ProcessCompleted<
  P extends Process<any> = Process<any>,
> extends ProcessEvent<P> {
  /**
   * The result of the process.
   */
  result: ResultOf<P>;

  /**
   * @param source The `Process` command that initiated the process.
   * @param result The result of the process.
   */
  constructor(source: P, result: ResultOf<P>) {
    super(source);
    this.result = result;
  }
}

/**
 * A `CommandEvent` signifying that
 * the process associated with a `Process` command has failed to complete.
 */
export class ProcessFailed<
  P extends Process<any> = Process<any>,
> extends ProcessEvent<P> {
  /**
   * The error that occurred.
   */
  error: unknown;

  /**
   * @param source The `Process` command that initiated the process.
   * @param error The error that occurred.
   */
  constructor(source: P, error: unknown) {
    super(source);
    this.error = error;
  }
}
