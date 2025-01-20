import { Exception } from '@angularity/core';

/**
 * Service for parsing the raw string content of a configuration file.
 */
export interface ConfigFileParser {
  /**
   * Parse the raw string content of a configuration file into an object.
   * Can be synchronous or asynchronous.
   * @throws {ConfigFileParsingException} if the parsing fails
   */
  parse(raw: string): object | Promise<object>;
}

export class ConfigFileParsingException extends Exception {}
