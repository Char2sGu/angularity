import { inject, Type } from '@angular/core';
import {
  CommandBus,
  pickType,
  registerCommandHandler,
} from '@angularity/command-flow';
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

export interface QueryHandler<Q extends Query<any>> {
  (query: Q): Observable<ResultOf<Q>>;
}

export function registerQueryHandler<Types extends Type<Query<any>>[]>(
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
