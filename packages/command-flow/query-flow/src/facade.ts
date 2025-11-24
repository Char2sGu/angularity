import { DestroyRef, inject, Signal, Type } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  COMMAND_EVENT_META as META,
  CommandBus,
  CommandEventBus,
  CommandFlowScheduler,
} from '@angularity/command-flow';
import { pickType } from '@angularity/core/rxjs';
import { filter, finalize, map, merge, Observable, shareReplay } from 'rxjs';

import { DisposeQuery } from './commands';
import { Query } from './core';
import { QueryErrored, QueryResolved } from './events';
import { QueryResultOf as ResultOf } from './shared';

/**
 * Creates a function in the current injection context for a specific `Query` type.
 *
 * On each call, the function dispatches a `Query` with the given payload and returns
 * an observable that emits the query values and emits the query error if any.
 * The observable is shared and will replay the last value.
 *
 * A query initiated by the function will be disposed when the current
 * injection context is destroyed, by dispatching a `DisposeQuery` command
 * targetting the query instance.
 *
 * @example
 * ```ts
 * const QueryUser = createQueryType(
 *   'QueryUser',
 *   $type<{ id: string }>(),
 *   $type<{ user: User }>(),
 * );
 * ```
 * ```ts
 * class MyComponent {
 *   #queryUser = useQuery(QueryUser);
 *
 *   #user$ = this.#queryUser({ id: '1' });
 *   readonly user = toSignal(this.#user$);
 *
 *   ngOnInit() {
 *     this.#user$.subscribe({
 *       next: ({ user }) => console.log(user),
 *       error: (error) => console.error(error),
 *       complete: () => console.log('done'),
 *     });
 *   }
 * }
 * ```
 */
export const useQuery =
  <T extends Type<Query<any>>>(
    type: T,
    [commands$, events$, scheduler, destroyRef] = [
      inject(CommandBus),
      inject(CommandEventBus),
      inject(CommandFlowScheduler),
      inject(DestroyRef),
    ],
  ) =>
  (
    ...args: ConstructorParameters<T>
  ): Observable<ResultOf<InstanceType<T>>> => {
    const query = new type(...args);
    scheduler.next(() => commands$.dispatch(query));
    return new Observable<ResultOf<InstanceType<T>>>((observer) =>
      events$
        .pipe(filter((e) => e[META].source === query))
        .subscribe((event) => {
          if (event instanceof QueryResolved)
            observer.next(event.result as ResultOf<InstanceType<T>>);
          if (event instanceof QueryErrored) observer.error(event.error);
        }),
    ).pipe(
      finalize(() => commands$.dispatch(new DisposeQuery(query))),
      takeUntilDestroyed(destroyRef),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  };

/**
 * Creates a signal in the current injection context whose value is `true`
 * only if some queries of the given type are pending, which means they have
 * been started but have not yet resolved or errored. The signal is initialized
 * to `true`.
 *
 * Only the queries started after the signal is created are monitored.
 *
 * A selector function can be optionally provided to further narrow down which
 * specific queries of the given type are monitored.
 *
 * @param type The type of the query to monitor.
 * @param selector A predicate function that takes a query instance of the
 * given type and returns `true` only if the given query should be monitored.
 *
 * @example
 * ```ts
 * const QueryUser = createQueryType(
 *   'QueryUser',
 *   $type<{ id: string }>(),
 *   $type<{ user: User }>(),
 * );
 * ```
 * ```ts
 * class MyComponent {
 *   #queryUser = useQuery(QueryUser);
 *   #queryUserLoading = useQueryLoading(QueryUser);
 *
 *   #user$ = this.#queryUser({ id: '1' });
 *   readonly user = toSignal(this.#user$);
 *
 *   readonly loading = this.#queryUserLoading();
 * }
 * ```
 * ```html
 * \@if (loading()) {
 *   <div>Loading...</div>
 * } \@else {
 *   <user-profile [user]="user()" />
 * }
 * ```
 */
export const useQueryLoading = <T extends Type<Query<any>>>(
  type: T,
  selector: (instance: InstanceType<T>) => boolean = () => true,
  [commands$, events$] = [inject(CommandBus), inject(CommandEventBus)],
): Signal<boolean> => {
  const start$ = commands$.pipe(
    pickType(type),
    filter((c) => selector(c)),
  );
  const resolve$ = events$.pipe(
    pickType(QueryResolved, QueryErrored),
    filter(
      ({ [META]: { source } }) =>
        source instanceof type && selector(source as InstanceType<T>),
    ),
  );
  const loading$ = merge(
    start$.pipe(map(() => true)),
    resolve$.pipe(map(() => false)),
  );
  return toSignal(loading$, { initialValue: true });
};
