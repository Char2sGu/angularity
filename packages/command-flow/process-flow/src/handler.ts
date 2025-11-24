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

/**
 * Handler function for specific `Process` types that accepts a `Process` instance
 * of those types and returns an `Observable` or `Promise` of the result.
 *
 * @example
 * ```typescript
 * const handler: ProcessHandler<Login> = async (process) => {
 *   const result = await sdk.login(process.username, process.password);
 *   return result;
 * };
 * ```
 * ```typescript
 * const handler: ProcessHandler<Login> = (process) => {
 *   const result$ = sdk.login(process.username, process.password);
 *   return result$;
 * };
 * ```
 */
export interface ProcessHandler<P extends Process<any>> {
  (process: P): Observable<ResultOf<P>> | Promise<ResultOf<P>>;
}

/**
 * Enumerates the different strategies for handling multiple dispatches
 * of processes of the same type.
 */
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
 * Register a `ProcessHandler` for some types of processes
 * within the current injection context.
 *
 * The handler will be disposed once the current injection context is destroyed.
 *
 * The value returned from the handler will be translated
 * into a series of `ProcessEvent`s:
 * - `ProcessStarted` when a matching process is dispatched
 * - `ProcessCompleted` when the returned promise resolves
 *    or the returned observable emits a value
 * - `ProcessFailed` when the returned promise rejects
 *    or the returned observable emits an error
 *
 * @remarks
 * There must not be multiple handlers for the same process type.
 *
 * @param types array of process types to listen for
 * @param scheduling strategy for handling multiple dispatches
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
 */
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
 * Alias for `onProcess`.
 * @deprecated Use `onProcess` instead.
 */
export const registerProcessHandler = onProcess;
