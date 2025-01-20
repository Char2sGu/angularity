import { Injectable } from '@angular/core';

import { ConfigFileParser, ConfigFileParsingException } from './parser';

/**
 * Implementation of `ConfigFileParser` that simply wraps the raw string content.
 */
@Injectable({ providedIn: 'root' })
export class TextParser implements ConfigFileParser {
  /**
   * Parse the raw string content of a configuration file and produce a
   * `{ value: string }` object.
   * @param value the raw string content
   * @returns `{ value: string }`
   */
  parse(value: string): object {
    return { value };
  }
}

/**
 * Implementation of `ConfigFileParser` that parses the string content as JSON,
 * via the built-in `JSON.parse` function.
 */
@Injectable({ providedIn: 'root' })
export class JsonParser implements ConfigFileParser {
  /**
   * Parse the raw string content of a configuration file as JSON.
   */
  parse(raw: string): object {
    try {
      return JSON.parse(raw);
    } catch (error) {
      throw new ConfigFileParsingException(String(error));
    }
  }
}
