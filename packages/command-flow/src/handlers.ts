import { inject, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { pickType } from '@angularity/core/rxjs';
import { Observable, tap } from 'rxjs';

import { CommandBus, CommandEventBus } from './buses';
import { Command, CommandEvent } from './core';
import { CommandFlowScheduler } from './scheduler';

/**
 * Handler for `Command`s that
 * consume commands and optionally produce events.
 *
 * It can be regarded as a RxJS operator that
 * transforms a command into a `CommandEvent` or `void`.
 * - when a `CommandEvent` is emitted, the event will be published
 * - when a `void` is emitted, nothing will happen
 *
 * @example
 * The built-in RxJS operator `map` is the simplest form of a command handler.
 *  ```typescript
 *  const handler: CommandHandler<SomeCommand> = map((command) => {
 *    const event = new SomeCommandEvent(command);
 *    return event;
 *  });
 *  ```
 * `map` can also be used to return `void`:
 *  ```typescript
 *  const handler: CommandHandler<SomeCommand> = map((command) => {
 *    console.log(command);
 *  });
 *  ```
 *
 * @example
 * A more complex handler can be created using the `pipe` operator:
 *  ```typescript
 *  const handler: CommandHandler<SomeCommand> = pipe(
 *   filter((command) => someCondition(command)),
 *   map((command) => new SomeCommandEvent(command)),
 *  );
 *  ```
 */
export interface CommandHandler<C extends Command> {
  (stream: Observable<C>): Observable<void | CommandEvent<C>>;
}

/**
 * Register a `CommandHandler` for some types of commands.
 * @param types array of command types to listen for
 * @remarks Requires an injection context.
 *
 * @example
 * ```typescript
 *  onCommand([SomeCommand, AnotherCommand], map((command) => {
 *   console.log(command);
 *  }));
 * ```
 * @example
 * ```typescript
 *  onCommand([SomeCommand, AnotherCommand], map((command) => {
 *   return new SomeEvent(command);
 *  }));
 * ```
 */
export function onCommand<Types extends Type<Command>[]>(
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

/**
 * @deprecated Use `onCommand` instead.
 */
export const registerCommandHandler = onCommand;

/**
 * Handler for `CommandEvent`s that
 * consume events and optionally produce new commands.
 *
 * It can be regarded as a RxJS operator that
 * transforms a command event into a `Command` or `void`.
 * - when a `Command` is emitted, the command will be dispatched
 * - when a `void` is emitted, nothing will happen
 *
 * @example
 * The built-in RxJS operator `map` is the simplest form of a command event handler.
 *  ```typescript
 *  const handler: CommandEventHandler<SomeCommandEvent> = map((event) => {
 *    const command = new SomeCommand(event);
 *    return command;
 *  });
 *  ```
 * `map` can also be used to return `void`:
 *  ```typescript
 *  const handler: CommandEventHandler<SomeCommandEvent> = map((event) => {
 *    console.log(event);
 *  });
 *  ```
 *
 * @example
 * A more complex handler can be created using the `pipe` operator:
 *  ```typescript
 *  const handler: CommandEventHandler<SomeCommandEvent> = pipe(
 *    filter((event) => someCondition(event)),
 *    map((event) => new SomeCommand(event)),
 *  );
 *  ```
 */
export interface CommandEventHandler<E extends CommandEvent> {
  (stream: Observable<E>): Observable<void | Command>;
}

/**
 * Register a `CommandEventHandler` for some types of command events.
 * @param types array of command event types to listen for
 * @remarks Requires an injection context.
 *
 * @example
 *  ```typescript
 *  onEvent([SomeCommandEvent, AnotherCommandEvent], map((event) => {
 *    console.log(event);
 *  }));
 *  ```
 * @example
 *  ```typescript
 *  onEvent([SomeCommandEvent, AnotherCommandEvent], map((event) => {
 *    return new SomeCommand(event);
 *  }));
 *  ```
 */
export function onEvent<Types extends Type<CommandEvent>[]>(
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

/**
 * @deprecated Use `onEvent` instead.
 */
export const registerCommandEventHandler = onEvent;
