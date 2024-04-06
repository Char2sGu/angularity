import {
  COMMAND_EVENT_META,
  CommandEvent,
  CommandEventMetadata,
} from '../core';
import { Process } from './core';
import { ProcessResultOf as ResultOf } from './shared';

export abstract class ProcessEvent<P extends Process<any> = Process<any>>
  implements CommandEvent
{
  [COMMAND_EVENT_META]: CommandEventMetadata<P>;
  constructor(source: P) {
    this[COMMAND_EVENT_META] = { source };
  }
}

export class ProcessStarted<
  P extends Process<any> = Process<any>,
> extends ProcessEvent<P> {}

export class ProcessCompleted<
  P extends Process<any> = Process<any>,
> extends ProcessEvent<P> {
  result: ResultOf<P>;
  constructor(source: P, result: ResultOf<P>) {
    super(source);
    this.result = result;
  }
}

export class ProcessFailed<
  P extends Process<any> = Process<any>,
> extends ProcessEvent<P> {
  error: unknown;
  constructor(source: P, error: unknown) {
    super(source);
    this.error = error;
  }
}
