import { Type } from '@angular/core';
import {
  concatMap,
  exhaustMap,
  from,
  mergeMap,
  Observable,
  switchMap,
} from 'rxjs';
import { match } from 'ts-pattern';

import { registerCommandHandler } from '../core';
import { Process } from './core';
import {
  ProcessCompleted,
  ProcessEvent,
  ProcessFailed,
  ProcessStarted,
} from './events';
import { ProcessResultOf as ResultOf } from './shared';

export interface ProcessHandler<P extends Process<any>> {
  (process: P): Observable<ResultOf<P>> | Promise<ResultOf<P>>;
}

export enum ProcessSchedulingStrategy {
  Sequential,
  Concurrent,
  Preemptive,
  Blocking,
}

export function registerProcessHandler<Types extends Type<Process<any>>[]>(
  types: Types,
  scheduling: ProcessSchedulingStrategy,
  handler: ProcessHandler<InstanceType<Types[number]>>,
): void {
  const scheduler = match(scheduling)
    .with(ProcessSchedulingStrategy.Sequential, () => concatMap)
    .with(ProcessSchedulingStrategy.Concurrent, () => mergeMap)
    .with(ProcessSchedulingStrategy.Preemptive, () => switchMap)
    .with(ProcessSchedulingStrategy.Blocking, () => exhaustMap)
    .run();

  registerCommandHandler(types, ($) =>
    $.pipe(
      scheduler(
        (process) =>
          new Observable<ProcessEvent<InstanceType<Types[number]>>>(
            (observer) => {
              observer.next(new ProcessStarted(process));
              return from(handler(process)).subscribe({
                next: (result) => {
                  observer.next(new ProcessCompleted(process, result));
                  observer.complete();
                },
                error: (error) => {
                  observer.next(new ProcessFailed(process, error));
                  observer.complete();
                },
                complete: () => {
                  observer.complete();
                },
              });
            },
          ),
      ),
    ),
  );
}
