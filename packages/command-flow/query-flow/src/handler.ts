import { inject, Type } from '@angular/core';
import { CommandBus, registerCommandHandler } from '@angularity/command-flow';
import { pickType } from '@angularity/core/rxjs';
import { filter, mergeMap, Observable, takeUntil } from 'rxjs';

import { DisposeQuery } from './commands';
import { Query } from './core';
import {
  QueryActivated,
  QueryErrored,
  QueryEvent,
  QueryInactivated,
  QueryResolved,
} from './events';
import { QueryResultOf as ResultOf } from './shared';

/**
 * Handler for `Query`s that
 * produces an observable of results for the accepted queries.
 */
export interface QueryHandler<Q extends Query<any>> {
  (query: Q): Observable<ResultOf<Q>>;
}

/**
 * Register a `QueryHandler` for some types of queries.
 *
 * The observable returned from the handler will be translated
 * into a series of `QueryEvent`s:
 * - `QueryActivated` when a matching query is dispatched
 * - `QueryResolved` when the returned observable emits a value
 * - `QueryErrored` when the returned observable emits an error
 * - `QueryInactivated` when the returned observable completes
 *
 * The observable returned from the handler will be unsubscribed
 * when a `DisposeQuery` command is dispatched for the query.
 *
 * @remarks Requires an injection context.
 *
 * @example
 *  ```typescript
 *  onQuery([SomeQuery], (query) => {
 *    return httpClient.get(...);
 *  });
 *  ```
 */
export function onQuery<Types extends Type<Query<any>>[]>(
  types: Types,
  handler: QueryHandler<InstanceType<Types[number]>>,
): void {
  const commands$ = inject(CommandBus);
  registerCommandHandler(types, ($) =>
    $.pipe(
      mergeMap((query) => {
        const disposal$ = commands$.pipe(
          pickType(DisposeQuery),
          filter((c) => c.target === query),
        );
        return new Observable<QueryEvent<InstanceType<Types[number]>>>(
          (observer) => {
            observer.next(new QueryActivated(query));
            return handler(query)
              .pipe(takeUntil(disposal$))
              .subscribe({
                next: (result) => {
                  observer.next(new QueryResolved(query, result));
                },
                error: (error) => {
                  observer.next(new QueryErrored(query, error));
                  observer.complete();
                },
                complete: () => {
                  observer.next(new QueryInactivated(query));
                },
              });
          },
        );
      }),
    ),
  );
}

/**
 * @deprecated Use `onQuery` instead.
 */
export const registerQueryHandler = onQuery;
