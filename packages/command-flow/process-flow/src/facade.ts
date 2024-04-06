import { inject, Signal, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  COMMAND_EVENT_META,
  CommandBus,
  CommandEventBus,
  CommandFlowScheduler,
  pickType,
} from '@angularity/command-flow';
import {
  filter,
  firstValueFrom,
  map,
  merge,
  switchMap,
  throwError,
} from 'rxjs';

import { Process } from './core';
import { ProcessCompleted, ProcessFailed } from './events';
import { ProcessResultOf as ResultOf } from './shared';

export const useProcess =
  <T extends Type<Process<any>>>(
    type: T,
    [commands$, events$, scheduler] = [
      inject(CommandBus),
      inject(CommandEventBus),
      inject(CommandFlowScheduler),
    ],
  ) =>
  (...args: ConstructorParameters<T>): Promise<ResultOf<InstanceType<T>>> => {
    const process = new type(...args);
    scheduler.next(() => commands$.dispatch(process));
    const result$ = events$.pipe(
      filter((e) => e[COMMAND_EVENT_META].source === process),
      switchMap((e) => {
        if (e instanceof ProcessCompleted)
          return [e.result as ResultOf<InstanceType<T>>];
        if (e instanceof ProcessFailed) return throwError(() => e.error);
        return [];
      }),
    );
    return firstValueFrom(result$);
  };

export const useProcessPending = <T extends Type<Process<any>>>(
  type: T,
  selector: (instance: InstanceType<T>) => boolean = () => true,
  [commands$, events$] = [inject(CommandBus), inject(CommandEventBus)],
): Signal<boolean> => {
  const start$ = commands$.pipe(
    pickType(type),
    filter((c) => selector(c)),
  );
  const settle$ = events$.pipe(
    pickType(ProcessCompleted, ProcessFailed),
    filter(
      ({ [COMMAND_EVENT_META]: { source } }) =>
        source instanceof type && selector(source as InstanceType<T>),
    ),
  );
  const pending$ = merge(
    start$.pipe(map(() => true)),
    settle$.pipe(map(() => false)),
  );
  return toSignal(pending$, { initialValue: false });
};

export const useProcessError = <T extends Type<Process<any>>>(
  type: T,
  selector: (instance: InstanceType<T>) => boolean = () => true,
  [events$] = [inject(CommandEventBus)],
): Signal<unknown> => {
  const error$ = events$.pipe(
    pickType(ProcessFailed),
    filter(
      ({ [COMMAND_EVENT_META]: { source } }) =>
        source instanceof type && selector(source as InstanceType<T>),
    ),
    map((e) => e.error),
  );
  return toSignal(error$);
};
