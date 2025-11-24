import { inject, Type } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { CommandBus, CommandEventBus } from './buses';
import { Command, COMMAND_EVENT_META as META, CommandEvent } from './core';
import { CommandFlowScheduler } from './scheduler';

/**
 * Creates a function in the current injection context for a specific `Command` type.
 *
 * On each call, the function creates a new instance of the `Command` based on
 * the provided arguments and dispatches it on the `CommandBus`, and returns
 * an observable of `CommandEvent`s from the `CommandEventBus` whose `source`
 * is the `Command` instance that was dispatched.
 *
 * The function accepts whatever argument the command constructor accepts and
 * delegates it to the constructor to create the command instance.
 *
 * @example
 * ```ts
 * class DoSomething implements Command {
 *   [COMMAND_META]: CommandMetadata = {};
 *
 *   constructor(
 *     readonly foo: string,
 *     readonly bar: boolean,
 *   ) {}
 * }
 *
 * class MyComponent {
 *   #doSomething = useCommand(DoSomething);
 *   dispatchAndObserve() {
 *     this.#doSomething('foo', true).subscribe((event) => {
 *       console.log(event);
 *     });
 *   }
 * }
 * ```
 */
export const useCommand =
  <T extends Type<Command>>(
    type: T,
    [scheduler, commands$, events$] = [
      inject(CommandFlowScheduler),
      inject(CommandBus),
      inject(CommandEventBus),
    ],
  ) =>
  (
    ...args: ConstructorParameters<T>
  ): Observable<CommandEvent<InstanceType<T>>> => {
    const command = new type(...args);
    scheduler.next(() => commands$.dispatch(command));
    return events$.pipe(
      filter(
        (e): e is CommandEvent<InstanceType<T>> => e[META].source === command,
      ),
    );
  };
