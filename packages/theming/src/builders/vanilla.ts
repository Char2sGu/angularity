import { Injectable } from '@angular/core';

import { ThemeTokens } from '../token';
import { TokenBuilder, TokenBuilderContext } from '../token-builder';

export interface VanillaBuilderConfig extends ThemeTokens {}

/**
 * An implementation of `TokenBuilder` that simply accepts an object of
 * pre-defined theme tokens as configuration and returns them as is when
 * requested to generate tokens.
 *
 * @remarks
 * The `name` assigned to this builder will be used as the prefix for the
 * tokens. An empty string can be used to avoid prefixing the tokens.
 *
 * @example
 *  ```ts
 *  scheduleTokenBuild("tokens-", VanillaBuilder, {
 *    "primary-color": "#ff0000",
 *  }),
 *  ```
 *
 * @example
 *  ```ts
 *  scheduleTokenBuild("", VanillaBuilder, {
 *    "primary-color": "#ff0000",
 *  }),
 *  ```
 */
@Injectable({ providedIn: 'root' })
export class VanillaBuilder implements TokenBuilder<VanillaBuilderConfig> {
  build(context: TokenBuilderContext<VanillaBuilderConfig>): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const [key, value] of Object.entries(context.config))
      tokens[`${context.name}${key}`] = value;
    return tokens;
  }
}
