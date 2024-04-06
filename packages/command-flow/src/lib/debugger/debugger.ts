/* eslint-disable no-console */
import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideMulti } from '@angularity/core';

import { CommandBus, CommandEventBus } from '../core/buses';
import { Command, COMMAND_EVENT_META } from '../core/core';

@Injectable({ providedIn: 'root' })
export class CommandIdWeakMap extends WeakMap<Command, string> {}

export const COMMAND_ID_GENERATOR = new InjectionToken<
  (target: Command) => string
>('COMMAND_ID_GENERATOR', {
  factory: () => {
    let next = 1;
    return () => next++ + '';
  },
});

export const COMMAND_FLOW_DEBUGGER_FILTER = new InjectionToken<
  (command: Command) => boolean
>('COMMAND_FLOW_DEBUGGER_FILTER', {
  factory: () => () => true,
});

export function provideCommandFlowDebugger(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: APP_INITIALIZER,
      useFactory: () => {
        const commands$ = inject(CommandBus);
        const events$ = inject(CommandEventBus);
        const idMap = inject(CommandIdWeakMap);
        const idGenerator = inject(COMMAND_ID_GENERATOR);
        const commandFilter = inject(COMMAND_FLOW_DEBUGGER_FILTER);
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
