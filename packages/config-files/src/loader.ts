import { HttpClient } from '@angular/common/http';
import { forwardRef, inject, Injectable, Injector } from '@angular/core';
import { Exception } from '@angularity/core';
import { catchError, map, Observable } from 'rxjs';

import { ConfigFileDefinition } from './definition';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => HttpClientConfigFileLoader),
})
export abstract class ConfigFileLoader {
  /**
   * @returns an observable that:
   * - starts loading the configuration file according to the given definition
   * - emits the parsed configuration object
   * - completes after its first emission
   * - cancels the loading on unsubscribe before value emission
   * @throws {ConfigFileNotFoundException} if the target file is not found
   */
  abstract load<T, Schema>(def: ConfigFileDefinition<T, Schema>): Observable<T>;
}

export class ConfigFileNotFoundException extends Exception {}

/**
 * Implementation of {@link ConfigFileLoader} based on Angular's built-in {@link HttpClient}.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpClientConfigFileLoader implements ConfigFileLoader {
  protected httpClient = inject(HttpClient);
  protected injector = inject(Injector);

  load<T, Schema>(def: ConfigFileDefinition<T, Schema>): Observable<T> {
    const parser = this.injector.get(def.parser);
    const validator = this.injector.get(def.validator);

    return this.fetch(def.path).pipe(
      map((res) => {
        if (!res) throw new ConfigFileNotFoundException(def.path);
        return res;
      }),
      map((raw) => {
        const parsed = parser.parse(raw);
        validator.validate(def.schema, parsed);
        return parsed as T;
      }),
    );
  }

  protected fetch(path: string): Observable<string | null> {
    return this.httpClient
      .get(path, { responseType: 'text' })
      .pipe(catchError(() => [null]));
  }
}
