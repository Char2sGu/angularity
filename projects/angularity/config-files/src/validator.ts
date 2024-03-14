import { Exception } from '@angularity/core';

export interface ConfigFileValidator<Schema> {
  validate(schema: Schema, parsed: object): void;
}

export class ConfigFileValidationException extends Exception {
  override name = this.constructor.name;
}
