import { ThemeTokens } from './token';

export interface ThemeBuilder<Config> {
  build(config: Config): ThemeTokens;
}
