import { ThemeBuilder } from '../builder';
import { ThemeTokens } from '../token';

export interface TokensThemeBuilderConfig {
  tokens: ThemeTokens;
}

export class TokensThemeBuilder
  implements ThemeBuilder<TokensThemeBuilderConfig>
{
  build(config: TokensThemeBuilderConfig): ThemeTokens {
    return config.tokens;
  }
}
