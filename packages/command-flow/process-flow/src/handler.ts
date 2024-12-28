import { inject, Injector, Type } from '@angular/core';
import { pendingUntilEvent } from '@angular/core/rxjs-interop';
import { onCommand } from '@angularity/command-flow';
import {
  concatMap,
  exhaustMap,
  from,
  mergeMap,
  Observable,
  pipe,
  switchMap,
} from 'rxjs';
import { match } from 'ts-pattern';

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
  /**
   * Processes are handled one after the other.
   */
  Sequential,
  /**
   * Processes are handled all at the same time.
   */
  Concurrent,
  /**
   * Processes are handled one at a time,
   * but can be preempted by a new dispatch,
   * i.e. the previous handling will be cancelled.
   */
  Preemptive,
  /**
   * Processes are handled one at a time,
   * ignoring any new dispatches until the current handling is completed.
   */
  Blocking,
}

/**
 * Register a `ProcessHandler` for some types of processes.
 * 
 * The value returned from the handler will be translated
 * into a series of `ProcessEvent`s:
 * - `ProcessStarted` when a matching process is dispatched
 * - `ProcessCompleted` when the returned promise resolves
 *    or the returned observable emits a value
 * - `ProcessFailed` when the returned promise rejects
 *    or the returned observable emits an error
 * 
 * @param types array of process types to listen for
 * @param scheduling strategy for handling multiple dispatches
 * @remarks Requires an injection context.
 *
 * @example
 *  ```typescript
 *  onProcess(
 *    [SomeProcess, AnotherProcess],
 *    ProcessSchedulingStrategy.Sequential,
 *    async (process) => {
 *      const result = await someLogic(process);
 *      return result;
 *    }
 *  );
 *  ```
 * 
 * @example
 *  ```typescript
 *  onProcess(
 *    [SomeProcess, AnotherProcess],
 *    ProcessSchedulingStrategy.Sequential,
 *    (process) => {
 *      const observable = someLogic(process);
 *      return observable;
 *    }
 *  );
 *  ```
F */
export function onProcess<Types extends Type<Process<any>>[]>(
  types: Types,
  scheduling: ProcessSchedulingStrategy,
  handler: ProcessHandler<InstanceType<Types[number]>>,
): void {
  const injector = inject(Injector);

  const scheduler = match(scheduling)
    .with(ProcessSchedulingStrategy.Sequential, () => concatMap)
    .with(ProcessSchedulingStrategy.Concurrent, () => mergeMap)
    .with(ProcessSchedulingStrategy.Preemptive, () => switchMap)
    .with(ProcessSchedulingStrategy.Blocking, () => exhaustMap)
    .run();

  onCommand(
    types,
    pipe(
      scheduler(
        (process) =>
          new Observable<ProcessEvent<InstanceType<Types[number]>>>(
            (observer) => {
              observer.next(new ProcessStarted(process));
              return from(handler(process))
                .pipe(pendingUntilEvent(injector))
                .subscribe({
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

/**
 * @deprecated Use `onProcess` instead.
 */
export const registerProcessHandler = onProcess;
