import { inject, Signal, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  COMMAND_EVENT_META,
  CommandBus,
  CommandEventBus,
  CommandFlowScheduler,
} from '@angularity/command-flow';
import { pickType } from '@angularity/core/rxjs';
import {
  filter,
  firstValueFrom,
  map,
  merge,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { Process } from './core';
import { ProcessCompleted, ProcessFailed } from './events';
import { ProcessResultOf as ResultOf } from './shared';

/**
 * Creates a function in the current injection context for a specific `Process` type.
 *
 * On each call, the function dispatches a `Process` with the given payload and returns
 * a promise that either resolves to the process result or rejects with the process error.
 *
 * @example
 * ```ts
 * const Login = createProcessType(
 *   'Login',
 *   $type<{ username: string; password: string }>(),
 *   $type<{ accessToken: string; refreshToken: string }>(),
 * );
 * ```
 * ```ts
 * class MyComponent {
 *   #login = useProcess(Login);
 *   async login() {
 *     try {
 *       const result = await this.#login({ username: 'foo', password: 'bar' });
 *       console.log(result.accessToken);
 *       console.log(result.refreshToken);
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   }
 * }
 * ```
 */
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

/**
 * Creates a signal in the current injection context whose value is `true`
 * only if some processes of the given type are pending, which means they
 * have been started but have not yet completed or failed.
 *
 * Only the processes started after the signal is created are monitored.
 *
 * A selector function can be optionally provided to further narrow down which
 * specific processes of the given type are monitored.
 *
 * @param type The type of the process to monitor.
 * @param selector A predicate function that takes a process instance of the
 * given type and returns `true` only if the given process should be monitored.
 *
 * @example
 * ```ts
 * const Login = createProcessType(
 *   'Login',
 *   $type<{ username: string; password: string }>(),
 *   $type<{ accessToken: string; refreshToken: string }>(),
 * );
 * ```
 * ```ts
 * class MyComponent {
 *   #login = useProcess(Login);
 *   #loginPending = useProcessPending(Login);
 *
 *   async login() {
 *     if (this.#loginPending()) {
 *       alert('Login already in progress');
 *       return;
 *     }
 *     try {
 *       const result = await this.#login({ username: 'foo', password: 'bar' });
 *       console.log(result.accessToken);
 *       console.log(result.refreshToken);
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   }
 * }
 * ```
 */
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

  let pending = 0;
  const pending$ = merge(
    start$.pipe(tap(() => pending++)),
    settle$.pipe(tap(() => pending--)),
  ).pipe(
    // pending can be negative if some matching processes have already been
    // started before `useProcessPending` was called
    tap(() => (pending = Math.max(0, pending))),
    map(() => pending > 0),
  );

  return toSignal(pending$, { initialValue: false });
};

/**
 * Creates a signal in the current injection context whose value is the error
 * of the last failed process of the given type, or `undefined` if no process
 * of the given type has failed.
 *
 * A selector function can be optionally provided to further narrow down which
 * specific processes of the given type are monitored.
 *
 * @param type The type of the process to monitor.
 * @param selector A predicate function that takes a process instance of the
 * given type and returns `true` only if the given process should be monitored.
 *
 * @example
 * ```ts
 * const Login = createProcessType(
 *   'Login',
 *   $type<{ username: string; password: string }>(),
 *   $type<{ accessToken: string; refreshToken: string }>(),
 * );
 * ```
 * ```ts
 * class MyComponent {
 *   #login = useProcess(Login);
 *   #loginError = useProcessError(Login);
 *
 *   readonly error = this.#loginError();
 *
 *   async login() {
 *     try {
 *       const result = await this.#login({ username: 'foo', password: 'bar' });
 *       console.log(result.accessToken);
 *       console.log(result.refreshToken);
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   }
 * }
 * ```
 * ```html
 * \@if (error(); as error) {
 *   <div class="error">{{ error }}</div>
 * } \@else {
 *   <login-form (submit)="login()" />
 * }
 * ```
 */
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
