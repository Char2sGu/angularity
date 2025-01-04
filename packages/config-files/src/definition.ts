import { ProviderToken } from '@angular/core';
import { TypeContainer } from '@angularity/core';

import { ConfigFileParser } from './parser';
import { ConfigFileValidator } from './validator';

export interface ConfigFileDefinition<T, Schema> {
  id?: string;
  path: string;
  type: TypeContainer<T>;
  parser: ProviderToken<ConfigFileParser>;
  validator: ProviderToken<ConfigFileValidator<NoInfer<Schema>>>;
  schema: Schema;
}

export const defineConfigFile = <T, Schema>(
  def: ConfigFileDefinition<T, Schema>,
): typeof def => def;
