import { ThemeTokens } from './token';

export interface ThemeBuilder<Config> {
  build(context: ThemeBuilderContext<Config>): ThemeTokens;
}

export interface ThemeBuilderContext<Config> {
  name: string;
  config: Config;
}

export type ThemeBuilderConfigOf<Builder extends ThemeBuilder<any>> =
  Builder extends ThemeBuilder<infer Config> ? Config : never;
