import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideMulti } from '@angularity/core';
import { combineLatest, Observable } from 'rxjs';

import { ThemeBuilderComposition } from './builder-composition';
import { ThemeManager } from './manager';

/**
 * Make providers that consume the given list of theme token generation
 * specifications by generating and applying the latest theme tokens as
 * specified.
 * @param compositions list of theme token generation specifications
 * @returns
 *
 * @example
 *  ```ts
 *  providers: [
 *    provideTheme(
 *      withThemeBuilder("typography", TypographyBuilder, {
 *        font: "OpenSans"
 *      }),
 *      withThemeBuilder(
 *        'color',
 *        ColorBuilder,
 *        defer((schemeObserver = inject(PreferredColorSchemeObserver)) =>
 *          schemeObserver
 *            .observe()
 *            .pipe(map((isDark) => ({ primaryColor: PRIMARY_COLOR, dark: isDark }))),
 *        ),
 *      ),
 *    ),
 *  ],
 *  ```
 *
 * @see `ThemeBuilder`
 * @see `withThemeBuilder`
 */
export function provideTheme(
  ...compositions: Observable<ThemeBuilderComposition>[]
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: ENVIRONMENT_INITIALIZER,
      useFactory:
        (manager = inject(ThemeManager)) =>
        () =>
          combineLatest(compositions)
            .pipe(takeUntilDestroyed())
            .subscribe((compositions) => {
              const tokens = manager.build(compositions);
              manager.apply(tokens);
            }),
    }),
  ]);
}
