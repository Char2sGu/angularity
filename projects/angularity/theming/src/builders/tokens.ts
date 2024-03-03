import { ThemeBuilder, ThemeBuilderContext } from '../builder';
import { ThemeTokens } from '../token';

export interface TokensThemeBuilderConfig extends ThemeTokens {}

export class TokensThemeBuilder
  implements ThemeBuilder<TokensThemeBuilderConfig>
{
  build(context: ThemeBuilderContext<TokensThemeBuilderConfig>): ThemeTokens {
    return context.config;
  }
}
