import { inject, Injectable } from '@angular/core';
import { Exception } from '@angularity/core';
import { Observable } from 'rxjs';

import { CacheConfigFiles } from './behaviors';
import { ConfigFileDefinition } from './definition';
import { HttpClientConfigFileLoader } from './loader.http';

/**
 * Service for loading configuration files.
 *
 * @remarks
 * By default, uses `HttpClientConfigFileLoader`
 * decorated with `CacheConfigFiles`.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => new CacheConfigFiles(inject(HttpClientConfigFileLoader)),
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
