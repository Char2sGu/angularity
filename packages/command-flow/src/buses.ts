import { forwardRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Command, CommandEvent } from './core';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SubjectBasedCommandBus),
})
export abstract class CommandBus extends Observable<Command> {
  abstract dispatch(command: Command): void;
}

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SubjectBasedCommandEventBus),
})
export abstract class CommandEventBus extends Observable<CommandEvent> {
  abstract publish(event: CommandEvent): void;
}

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
