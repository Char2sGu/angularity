import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { pendingUntilEvent } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, switchMap } from 'rxjs';

import { ConfigFileDefinition } from './definition';
import { ConfigFileLoader, ConfigFileNotFoundException } from './loader';

/**
 * Context object that will be supplied to `CONFIG_FILE_REQUEST_CONTEXT`.
 */
export interface ConfigFileRequestContext {
  readonly def: ConfigFileDefinition<unknown, unknown>;
}

/**
 * `HttpContextToken` that will be supplied a value in an endpoint request
 * sent by `HttpClientConfigFileLoader`.
 */
export const CONFIG_FILE_REQUEST_CONTEXT =
  new HttpContextToken<ConfigFileRequestContext | null>(() => null);

/**
 * Implementation of {@link ConfigFileLoader}
 * based on Angular's built-in {@link HttpClient}.
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

    const context = new HttpContext().set(CONFIG_FILE_REQUEST_CONTEXT, { def });
    return this.fetch(def.path, context).pipe(
      map((res) => {
        if (!res) throw new ConfigFileNotFoundException(def.path);
        return res;
      }),
      switchMap(async (raw) => {
        const parsed = await parser.parse(raw);
        await validator.validate(def.schema, parsed);
        return parsed as T;
      }),
      pendingUntilEvent(this.injector),
    );
  }

  protected fetch(
    path: string,
    context: HttpContext,
  ): Observable<string | null> {
    return this.httpClient
      .get(path, { responseType: 'text', context })
      .pipe(catchError(() => [null]));
  }
}
