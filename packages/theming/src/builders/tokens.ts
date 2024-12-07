import { Injectable } from '@angular/core';

import { ThemeBuilder, ThemeBuilderContext } from '../builder';
import { ThemeTokens } from '../token';

export interface TokensBuilderConfig extends ThemeTokens {}

/**
 * An implementation of `ThemeBuilder` that simply accepts an object of
 * pre-defined theme tokens as configuration and returns them as is when
 * requested to generate tokens.
 *
 * @remarks
 * The `name` assigned to this builder will be used as the prefix for the
 * tokens. An empty string can be used to avoid prefixing the tokens.
 *
 * @example
 *  ```ts
 *  withThemeBuilder("tokens-", TokensBuilder, {
 *    "primary-color": "#ff0000",
 *  }),
 *  ```
 *
 * @example
 *  ```ts
 *  withThemeBuilder("", TokensBuilder, {
 *    "primary-color": "#ff0000",
 *  }),
 *  ```
 */
@Injectable({ providedIn: 'root' })
export class TokensBuilder implements ThemeBuilder<TokensBuilderConfig> {
  build(context: ThemeBuilderContext<TokensBuilderConfig>): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const [key, value] of Object.entries(context.config))
      tokens[`${context.name}${key}`] = value;
    return tokens;
  }
}
