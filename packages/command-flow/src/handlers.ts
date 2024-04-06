import { inject, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';

import { CommandBus, CommandEventBus } from './buses';
import { Command, CommandEvent } from './core';
import { pickType } from './operators';
import { CommandFlowScheduler } from './scheduler';

export interface CommandHandler<C extends Command> {
  (stream: Observable<C>): Observable<void | CommandEvent<C>>;
}

export interface CommandEventHandler<E extends CommandEvent> {
  (stream: Observable<E>): Observable<void | Command>;
}

export function registerCommandHandler<Types extends Type<Command>[]>(
  types: Types,
  handler: CommandHandler<InstanceType<Types[number]>>,
): void {
  const commands$ = inject(CommandBus);
  const events$ = inject(CommandEventBus);
  const scheduler = inject(CommandFlowScheduler);
  commands$
    .pipe(
      takeUntilDestroyed(),
      pickType(...types),
      handler,
      pickType(CommandEvent),
      tap((event) => scheduler.next(() => events$.publish(event))),
    )
    .subscribe();
}

export function registerCommandEventHandler<Types extends Type<CommandEvent>[]>(
  types: Types,
  handler: CommandEventHandler<InstanceType<Types[number]>>,
): void {
  const events$ = inject(CommandEventBus);
  const commands$ = inject(CommandBus);
  const scheduler = inject(CommandFlowScheduler);
  events$
    .pipe(
      takeUntilDestroyed(),
      pickType(...types),
      handler,
      pickType(Command),
      tap((command) => scheduler.next(() => commands$.dispatch(command))),
    )
    .subscribe();
}
