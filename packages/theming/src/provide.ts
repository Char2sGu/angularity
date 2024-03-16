import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideMulti } from '@angularity/core';

import {
  InferThemeBuilderConfigMap,
  ThemeBuilderMap,
  ThemeManager,
} from './manager';

export function provideTheme<Builders extends ThemeBuilderMap>(
  builders: Builders,
  configs: InferThemeBuilderConfigMap<Builders>,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    Object.values(builders),
    provideMulti({
      token: APP_INITIALIZER,
      useFactory:
        (themeManager = inject(ThemeManager)) =>
        () =>
          themeManager.apply(builders, configs),
    }),
  ]);
}
