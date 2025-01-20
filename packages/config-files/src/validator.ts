import { Exception } from '@angularity/core';

/**
 * Service for validating the parsed content of a configuration file,
 * making sure it conforms to the schema.
 *
 * @remarks
 * The type of the schema varies depending on the validator implementation.
 * The `Schema` type parameter must be explicitly specified.
 */
export interface ConfigFileValidator<Schema> {
  /**
   * Validate the parsed content of a configuration file,
   * making sure it conforms to the schema.
   * @param schema
   * @param parsed
   */
  validate(schema: Schema, parsed: object): void | Promise<void>;
}

export class ConfigFileValidationException extends Exception {}
