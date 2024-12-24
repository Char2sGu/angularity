import { Exception } from '@angularity/core';

export interface ConfigFileValidator<Schema> {
  validate(schema: Schema, parsed: object): void | Promise<void>;
}

export class ConfigFileValidationException extends Exception {}
