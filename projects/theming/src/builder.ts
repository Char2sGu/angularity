import { InjectionToken } from '@angular/core';

export interface ThemeBuilder<Config> {
  build(config: Config): ThemeTokens;
}

export interface ThemeTokens {
  [name: string]: string;
}

export const THEME_BUILDERS = new InjectionToken<ThemeBuilder<unknown>[]>(
  'THEME_BUILDERS',
);
