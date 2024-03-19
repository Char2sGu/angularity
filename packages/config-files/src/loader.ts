import { HttpClient } from '@angular/common/http';
import { forwardRef, inject, Injectable, Injector } from '@angular/core';
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
  protected injector = inject(Injector);

  load<T, Schema>(meta: ConfigFileMetadata<T, Schema>): Observable<T> {
    const parser = this.injector.get(meta.parser);
    const validator = this.injector.get(meta.validator);

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
