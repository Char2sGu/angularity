import { ProviderToken } from '@angular/core';

import { ThemeBuilder, ThemeBuilderConfigOf } from './builder';

export interface ThemeBuilderComposition {
  builder: ProviderToken<ThemeBuilder<any>>;
  config: unknown;
}

export const withThemeBuilder = <Builder extends ThemeBuilder<any>>(
  builder: ProviderToken<Builder>,
  config: ThemeBuilderConfigOf<Builder>,
): ThemeBuilderComposition => ({
  builder,
  config,
});
