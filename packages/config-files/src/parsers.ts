import { Injectable } from '@angular/core';

import { ConfigFileParser, ConfigFileParsingException } from './parser';

@Injectable({ providedIn: 'root' })
export class TextParser implements ConfigFileParser {
  parse(value: string): object {
    return { value };
  }
}

@Injectable({ providedIn: 'root' })
export class JsonParser implements ConfigFileParser {
  parse(raw: string): object {
    try {
      return JSON.parse(raw);
    } catch (error) {
      throw new ConfigFileParsingException(String(error));
    }
  }
}
