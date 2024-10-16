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
 * The `name` assigned to this builder has no effects.
 *
 * @example
 *  ```ts
 *  withThemeBuilder("name-does-not-matter", TokensBuilder, {
 *    "primary-color": "#ff0000",
 *  }),
 *  ```
 */
@Injectable({ providedIn: 'root' })
export class TokensBuilder implements ThemeBuilder<TokensBuilderConfig> {
  build(context: ThemeBuilderContext<TokensBuilderConfig>): ThemeTokens {
    return context.config;
  }
}
