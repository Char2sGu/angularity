import { HttpClient } from '@angular/common/http';
import { forwardRef, inject, Injectable } from '@angular/core';
import { Exception } from '@angularity/core';
import { catchError, map, Observable } from 'rxjs';

import { ConfigFileMetadata } from './metadata';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => HttpClientConfigFileLoader),
})
export abstract class ConfigFileLoader {
  abstract load<T, Schema>(meta: ConfigFileMetadata<T, Schema>): Observable<T>;
}

export class ConfigFileNotFoundException extends Exception {
  override name = this.constructor.name;
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientConfigFileLoader {
  protected httpClient = inject(HttpClient);

  load<T, Schema>(meta: ConfigFileMetadata<T, Schema>): Observable<T> {
    const parser = inject(meta.parser);
    const validator = inject(meta.validator);

    return this.fetch(meta.path).pipe(
      map((res) => {
        if (!res) throw new ConfigFileNotFoundException(meta.path);
        return res;
      }),
      map((raw) => {
        const parsed = parser.parse(raw);
        validator.validate(meta.schema, parsed);
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
