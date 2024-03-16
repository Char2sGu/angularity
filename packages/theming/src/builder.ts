import { ThemeTokens } from './token';

export interface ThemeBuilder<Config> {
  build(context: ThemeBuilderContext<Config>): ThemeTokens;
}

export interface ThemeBuilderContext<Config> {
  name: string;
  config: Config;
}
