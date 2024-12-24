import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ConfigFileDefinition } from './definition';
import { ConfigFileLoader } from './loader';

/**
 * Load the target config file and return a promise
 * of its parsed content.
 * @param def the def of the target config file
 */
export const useConfigFile = <T>(
  def: ConfigFileDefinition<T, any>,
  loader = inject(ConfigFileLoader),
): Promise<T> => firstValueFrom(loader.load(def));
