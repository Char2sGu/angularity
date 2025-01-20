import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ConfigFileDefinition } from './definition';
import { ConfigFileLoader } from './loader';

/**
 * Load the target config file and return a promise
 * of its parsed content.
 * The promise may be rejected if the loading fails.
 */
export function useConfigFile<T>(
  def: ConfigFileDefinition<T, any>,
  loader = inject(ConfigFileLoader),
): Promise<T> {
  return firstValueFrom(loader.load(def));
}
