import { ProviderToken } from '@angular/core';
import { TypeContainer } from '@angularity/core';

import { ConfigFileParser } from './parser';
import { ConfigFileValidator } from './validator';

export const defineConfigFileMetadata = <T, Schema>(
  metadata: ConfigFileMetadata<T, Schema>,
): typeof metadata => metadata;

export interface ConfigFileMetadata<T, Schema> {
  path: string;
  type: TypeContainer<T>;
  parser: ProviderToken<ConfigFileParser>;
  validator: ProviderToken<ConfigFileValidator<Schema>>;
  schema: Schema;
}
