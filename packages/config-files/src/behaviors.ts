import { Observable, shareReplay } from 'rxjs';

import { ConfigFileDefinition } from './definition';
import { ConfigFileLoader } from './loader';

/**
 * Decorator for {@link ConfigFileLoader}
 * that caches the loaded configuration objects of each definition.
 */
export class CacheConfigFileContent implements ConfigFileLoader {
  #cache = new Map<
    ConfigFileDefinition<unknown, unknown>,
    Observable<unknown>
  >();

  constructor(private kernel: ConfigFileLoader) {}

  load<T, Schema>(def: ConfigFileDefinition<T, Schema>): Observable<T> {
    const cached = this.#cache.get(def);
    if (cached) return cached as Observable<T>;
    const result$ = this.kernel.load(def).pipe(shareReplay(1));
    this.#cache.set(def, result$);
    return result$;
  }
}
