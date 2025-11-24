/* eslint-disable no-console */
import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import {
  Command,
  COMMAND_EVENT_META,
  CommandBus,
  CommandEventBus,
} from '@angularity/command-flow';

@Injectable({ providedIn: 'root' })
export class CommandIdWeakMap extends WeakMap<Command, string> {}

/**
 * Injection token for a function that generates a unique identifier
 * for a command.
 *
 * By default, the identifier is a number that is incremented for each command.
 */
export const COMMAND_ID_GENERATOR = new InjectionToken<
  (target: Command) => string
>('COMMAND_ID_GENERATOR', {
  factory: () => {
    let next = 1;
    return () => next++ + '';
  },
});

/**
 * Injection token for a filter function that determines which commands
 * and events should be logged by the debugger.
 *
 * By default, all commands and events are logged.
 */
export const COMMAND_FLOW_DEBUGGER_FILTER = new InjectionToken<
  (command: Command) => boolean
>('COMMAND_FLOW_DEBUGGER_FILTER', {
  factory: () => () => true,
});

/**
 * Provides a debugger that logs commands and events to the console to an application.
 */
export function provideCommandFlowDebugger(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const commands$ = inject(CommandBus);
      const events$ = inject(CommandEventBus);
      const idMap = inject(CommandIdWeakMap);
      const idGenerator = inject(COMMAND_ID_GENERATOR);
      const commandFilter = inject(COMMAND_FLOW_DEBUGGER_FILTER);
      commands$.subscribe((c) => {
        if (!commandFilter(c)) return;
        const name = c.constructor.name;
        const id = idGenerator(c);
        idMap.set(c, id);
        console.debug(`[${id}] %c${name}\n`, 'color: #ec064f', c);
      });
      events$.subscribe((e) => {
        const source = e[COMMAND_EVENT_META].source;
        if (!commandFilter(source)) return;
        const sourceName = source.constructor.name;
        const sourceId = idMap.get(source);
        const name = `${sourceName}.${e.constructor.name}`;
        console.debug(`[${sourceId}] %c${name}\n`, 'color: #aa3cff', e);
      });
    }),
  ]);
}
