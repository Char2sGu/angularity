export interface ConfigFileValidator<Schema> {
  validate(schema: Schema, parsed: object): void;
}

export class ConfigFileValidationError extends Error {
  override name = this.constructor.name;
}
