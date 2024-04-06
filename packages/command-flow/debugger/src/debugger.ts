/* eslint-disable no-console */
import * as core from '@angular/core';
import {
  Command,
  COMMAND_EVENT_META,
  CommandBus,
  CommandEventBus,
} from '@angularity/command-flow';
import { provideMulti } from '@angularity/core';

@core.Injectable({ providedIn: 'root' })
export class CommandIdWeakMap extends WeakMap<Command, string> {}

export const COMMAND_ID_GENERATOR = new core.InjectionToken<
  (target: Command) => string
>('COMMAND_ID_GENERATOR', {
  factory: () => {
    let next = 1;
    return () => next++ + '';
  },
});

export const COMMAND_FLOW_DEBUGGER_FILTER = new core.InjectionToken<
  (command: Command) => boolean
>('COMMAND_FLOW_DEBUGGER_FILTER', {
  factory: () => () => true,
});

export function provideCommandFlowDebugger(): core.EnvironmentProviders {
  return core.makeEnvironmentProviders([
    provideMulti({
      token: core.APP_INITIALIZER,
      useFactory: () => {
        const commands$ = core.inject(CommandBus);
        const events$ = core.inject(CommandEventBus);
        const idMap = core.inject(CommandIdWeakMap);
        const idGenerator = core.inject(COMMAND_ID_GENERATOR);
        const commandFilter = core.inject(COMMAND_FLOW_DEBUGGER_FILTER);
        return () => {
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
        };
      },
    }),
  ]);
}
