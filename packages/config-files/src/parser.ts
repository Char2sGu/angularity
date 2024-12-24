import { Exception } from '@angularity/core';

export interface ConfigFileParser {
  parse(raw: string): Promise<object>;
}

export class ConfigFileParsingException extends Exception {}
