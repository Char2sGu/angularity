import { ProviderToken } from '@angular/core';
import { TypeContainer } from '@angularity/core';

import { ConfigFileParser } from './parser';
import { ConfigFileValidator } from './validator';

/**
 * A declaration of a remote config file.
 */
export interface ConfigFileDefinition<T, Schema> {
  /**
   * An optional unique identifier for the config file.
   * Some features may require a unique identifier to distinguish between
   * different config files.
   */
  id?: string;
  /**
   * The path to load the config files from.
   */
  path: string;
  /**
   * A type container for inferring the type of the parsed config file.
   */
  type: TypeContainer<T>;
  /**
   * The token for injecting the `ConfigFileParser` instance for
   * parsing the config file.
   */
  parser: ProviderToken<ConfigFileParser>;
  /**
   * The token for injecting the `ConfigFileValidator` instance for
   * validating the config file.
   */
  validator: ProviderToken<ConfigFileValidator<NoInfer<Schema>>>;
  /**
   * The schema for the validator to use for validating the config file.
   * The type is determined by the `ConfigFileValidator` implementation.
   */
  schema: Schema;
}

/**
 * Type-helper for creating `ConfigFileDefinition` objects.
 */
export const defineConfigFile = <T, Schema>(
  def: ConfigFileDefinition<T, Schema>,
): typeof def => def;
