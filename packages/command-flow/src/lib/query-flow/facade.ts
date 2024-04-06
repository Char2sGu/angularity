import { DestroyRef, inject, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, finalize, Observable, shareReplay } from 'rxjs';

import {
  COMMAND_EVENT_META as META,
  CommandBus,
  CommandEventBus,
} from '../core';
import { CommandFlowScheduler } from '../core/scheduler';
import { DisposeQuery } from './commands';
import { Query } from './core';
import { QueryErrored, QueryResolved } from './events';
import { QueryResultOf as ResultOf } from './shared';

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
