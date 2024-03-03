import { ThemeBuilder, ThemeBuilderContext } from '../builder';
import { ThemeTokens } from '../token';

export interface TokensBuilderConfig extends ThemeTokens {}

export class TokensBuilder implements ThemeBuilder<TokensBuilderConfig> {
  build(context: ThemeBuilderContext<TokensBuilderConfig>): ThemeTokens {
    return context.config;
  }
}
