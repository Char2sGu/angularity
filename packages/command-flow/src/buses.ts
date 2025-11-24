import { forwardRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Command, CommandEvent } from './core';

/**
 * Interface and provider token for a service that
 * can be used to dispatch `Command`s or subscribe to them.
 * @see `SubjectBasedCommandBus` for the default implementation.
 */
@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SubjectBasedCommandBus),
})
export abstract class CommandBus extends Observable<Command> {
  abstract dispatch(command: Command): void;
}

/**
 * Interface and provider token for a service that
 * can be used to publish `CommandEvent`s or subscribe to them.
 * @see `SubjectBasedCommandEventBus` for the default implementation.
 */
@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SubjectBasedCommandEventBus),
})
export abstract class CommandEventBus extends Observable<CommandEvent> {
  abstract publish(event: CommandEvent): void;
}

/**
 * Implementation of `CommandBus` that uses a RxJS `Subject` under the hood.
 */
@Injectable({
  providedIn: 'root',
})
export class SubjectBasedCommandBus
  extends Subject<Command>
  implements CommandBus
{
  dispatch(command: Command): void {
    this.next(command);
  }
}

/**
 * Implementation of `CommandEventBus` that uses a RxJS `Subject` under the hood.
 */
@Injectable({
  providedIn: 'root',
})
export class SubjectBasedCommandEventBus
  extends Subject<CommandEvent>
  implements CommandEventBus
{
  publish(event: CommandEvent): void {
    this.next(event);
  }
}
