import { inject, Type } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { CommandBus, CommandEventBus } from './buses';
import { Command, COMMAND_EVENT_META as META, CommandEvent } from './core';
import { CommandFlowScheduler } from './scheduler';

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
