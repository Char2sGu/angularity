export interface ConfigFileParser {
  parse(raw: string): object;
}

export class ConfigFileParsingError extends Error {
  override name = this.constructor.name;
}
