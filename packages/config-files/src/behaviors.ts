import { inject, Injectable, REQUEST_CONTEXT } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { ConfigFileDefinition } from './definition';
import { ConfigFileLoader } from './loader';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    ConfigFilesPersistentCache.useFromRequestContext() ??
    new ConfigFilesPersistentCache(),
})
export class ConfigFilesPersistentCache extends Map<
  string,
  Observable<unknown>
> {
  static readonly key = Symbol('ConfigFilesPersistentCache');

  static useFromRequestContext(): ConfigFilesPersistentCache | null {
    const context = inject(REQUEST_CONTEXT);
    if (!context) return null;
    if (typeof context !== 'object') return null;
    const cache = Reflect.get(context, this.key);
    if (!cache) return null;
    return cache;
  }

  constructor() {
    super();
  }
}

@Injectable({ providedIn: 'root' })
export class ConfigFilesSessionCache extends Map<
  ConfigFileDefinition<unknown, unknown>,
  Observable<unknown>
> {
  constructor() {
    super();
  }
}

/**
 * Decorator for {@link ConfigFileLoader}
 * that caches the loaded configuration objects of each definition.
 *
 * In SSR applications, a persistent cache can be provided from the server
 * so that config files are only loaded once throughout the application
 * lifecycle:
 * ```ts
 *  const app = express();
 *  const angularApp = new AngularNodeAppEngine();
 *  const configFilesCache = new ConfigFilesPersistentCache();
 * ```
 * ```ts
 *  angularApp
 *    .handle(req, { [ConfigFilesPersistentCache.key]: configFilesCache })
 *    .then((response) =>
 *      response ? writeResponseToNodeResponse(response, res) : next(),
 *    )
 *    .catch(next);
 * ```
 */
export class CacheConfigFiles implements ConfigFileLoader {
  #sessionCache = inject(ConfigFilesSessionCache);
  #persistentCache = inject(ConfigFilesPersistentCache);

  constructor(private kernel: ConfigFileLoader) {}

  load<T, Schema>(def: ConfigFileDefinition<T, Schema>): Observable<T> {
    const cached =
      (def.id && this.#persistentCache.get(def.id)) ??
      this.#sessionCache.get(def);
    if (cached) return cached as Observable<T>;
    const result$ = this.kernel.load(def).pipe(shareReplay(1));
    if (def.id) this.#persistentCache.set(def.id, result$);
    this.#sessionCache.set(def, result$);
    return result$;
  }
}
