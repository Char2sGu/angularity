import { Exception } from '@angularity/core';

export interface ConfigFileParser {
  parse(raw: string): object;
}

export class ConfigFileParsingException extends Exception {
  override name = this.constructor.name;
}
