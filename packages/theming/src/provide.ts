import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideMulti } from '@angularity/core';
import { from, ObservableInput, of } from 'rxjs';

import { ThemeBuildConfig, ThemeManager } from './manager';

/**
 * Invoked within an injection context.
 */
export interface ThemeBuildConfigFactory {
  (): ObservableInput<ThemeBuildConfig>;
}

export function provideTheme(
  configInput: ThemeBuildConfig | ThemeBuildConfigFactory,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: ENVIRONMENT_INITIALIZER,
      useFactory: (themeManager = inject(ThemeManager)) => {
        const configSource =
          typeof configInput === 'function' ? configInput() : of(configInput);
        return () =>
          from(configSource)
            .pipe(takeUntilDestroyed())
            .subscribe((config) => {
              themeManager.buildAndApply(config);
            });
      },
    }),
  ]);
}
