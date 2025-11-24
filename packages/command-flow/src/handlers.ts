import { inject, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { pickType } from '@angularity/core/rxjs';
import { Observable, tap } from 'rxjs';

import { CommandBus, CommandEventBus } from './buses';
import { Command, CommandEvent } from './core';
import { CommandFlowScheduler } from './scheduler';

/**
 * Handler function for specific `Command` types that accepts a stream of
 * `Command`s of those types and returns a stream of void or `CommandEvent`s.
 *
 * It satisfies the signature of RxJS operators and can be regarded as a mapping operator
 * that maps a `Command` into one or many `CommandEvent`s or `void`.
 * - When a `CommandEvent` is emitted, the event will be published on the `CommandEventBus`.
 *   It means that some events occurred as a result of the command.
 * - When a `void` is emitted, nothing will happen.
 *   It means that the command was processed, but no events occurred.
 *
 * @example
 * The RxJS `map` operator is a powerful command handler.
 *  ```ts
 *  const handler: CommandHandler<DoSomething> = map((command) => {
 *    doSomething(command.foo, command.bar);
 *    const event = new DoSomethingCompleted(command);
 *    return event;
 *  });
 *  ```
 * `map` can map to `void` by not returning:
 *  ```ts
 *  const handler: CommandHandler<DoSomething> = map((command) => {
 *    doSomething(command.foo, command.bar);
 *  });
 *  ```
 *
 * @example
 * The RxJS `pipe` function allows composing multiple RxJS operators:
 *  ```ts
 *  const handler: CommandHandler<DoSomething> = pipe(
 *   filter((command) => someCondition(command)),
 *   tap((command) => doSomething(command.foo, command.bar)),
 *   map((command) => new DoSomethingCompleted(command)),
 *  );
 *  ```
 */
export interface CommandHandler<C extends Command> {
  (stream: Observable<C>): Observable<void | CommandEvent<C>>;
}

/**
 * Register a `CommandHandler` for some types of commands
 * within the current injection context.
 *
 * The handler will be disposed once the current injection context is destroyed.
 *
 * @param types array of command types to listen for
 * @param handler the handler function
 *
 * @example
 * ```ts
 *  onCommand([SomeCommand, AnotherCommand], map((command) => {
 *    console.log(command);
 *  }));
 * ```
 * @example
 * ```ts
 *  onCommand([SomeCommand, AnotherCommand], map((command) => {
 *    return new SomeEvent(command);
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
 * Alias for `onCommand`.
 * @deprecated Use `onCommand` instead.
 */
export const registerCommandHandler = onCommand;

/**
 * Handler function for specific `CommandEvent` types that accepts a stream of
 * `CommandEvent`s of those types and returns a stream of `Command`s or `void`.
 *
 * It satisfies the signature of RxJS operators and can be regarded as a mapping operator
 * that maps a `CommandEvent` into one or many `Command`s or `void`.
 * - When a `Command` is emitted, the command will be dispatched on the `CommandBus`.
 *   It means that some commands occurred as a result of the event.
 * - When a `void` is emitted, nothing will happen.
 *   It means that the event was processed, but no new commands should be dispatched.
 *
 * @example
 * The RxJS `map` operator is a powerful command event handler.
 *  ```ts
 *  const handler: CommandEventHandler<DoSomethingCompleted> = map((event) => {
 *    onSomethingCompleted(event);
 *    const command = new DoSomethingElse(event);
 *    return command;
 *  });
 *  ```
 * `map` can map to `void` by not returning:
 *  ```ts
 *  const handler: CommandEventHandler<DoSomethingCompleted> = map((event) => {
 *    onSomethingCompleted(event);
 *  });
 *  ```
 *
 * @example
 * The RxJS `pipe` function allows composing multiple RxJS operators:
 *  ```ts
 *  const handler: CommandEventHandler<DoSomethingCompleted> = pipe(
 *    filter((event) => someCondition(event)),
 *    tap((event) => onSomethingCompleted(event)),
 *    map((event) => new DoSomethingElse(event)),
 *  );
 *  ```
 */
export interface CommandEventHandler<E extends CommandEvent> {
  (stream: Observable<E>): Observable<void | Command>;
}

/**
 * Register a `CommandEventHandler` for some types of command events
 * within the current injection context.
 *
 * The handler will be disposed once the current injection context is destroyed.
 *
 * @param types array of command event types to listen for
 *
 * @example
 *  ```ts
 *  onEvent([DoSomethingCompleted, SomethingElseCompleted], map((event) => {
 *    console.log(event);
 *  }));
 *  ```
 * @example
 *  ```ts
 *  onEvent([DoSomethingCompleted], map((event) => {
 *    return new DoSomethingElse(event);
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
 * Alias for `onEvent`.
 * @deprecated Use `onEvent` instead.
 */
export const registerCommandEventHandler = onEvent;
