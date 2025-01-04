import {
  DestroyRef,
  EnvironmentProviders,
  inject,
  Injector,
  provideAppInitializer,
  runInInjectionContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom, map, shareReplay, startWith } from 'rxjs';

import { buildTheme, Theme } from './theme';
import { ThemeTokenRegistry } from './token';

/**
 * Make providers that consume the given theme.
 *
 * The application initialization process will be blocked until the
 * the initial theme tokens are available. The initial theme tokens
 * might be the pre-built tokens from the server (SSR environment),
 * or be built from scratch if no server tokens exist.
 *
 * For CSR applications, async theme is discouraged, since it slows
 * down application bootstrap. For SSR applications, using async theme
 * can help reduce the size of the initial bundle as well as accelerate
 * bootstrap, because the theme is pre-built on server and immediately
 * available on browser.
 *
 * @example
 * Theme File:
 *  ```ts
 *  export const appTheme = createTheme(
 *    scheduleTokenBuild("typography", TypographyBuilder, {
 *      font: "OpenSans"
 *    }),
 *    scheduleTokenBuild(
 *      'color',
 *      ColorBuilder,
 *      defer((schemeObserver = inject(PreferredColorSchemeObserver)) =>
 *        schemeObserver
 *          .observe()
 *          .pipe(map((isDark) => ({ primaryColor: PRIMARY_COLOR, dark: isDark }))),
 *      ),
 *    ),
 *  )
 *  ```
 *  ```ts
 *  provideTheme(appTheme) // sync
 *  provideTheme(import('./app.theme.ts').then(m => m.appTheme)) // async
 *  ```
 *
 * @see `TokenBuilder`
 * @see `scheduleTokenBuild`
 */
export function provideTheme(
  theme: Theme | Promise<Theme>,
): EnvironmentProviders {
  return provideAppInitializer(async () => {
    const injector = inject(Injector);
    const destroyRef = inject(DestroyRef);
    const registry = inject(ThemeTokenRegistry);
    const transferred = registry.transfer();
    const build$ = buildTheme(injector, await theme).pipe(
      takeUntilDestroyed(destroyRef),
      map((tokens) => {
        registry.setAll(tokens);
        return true;
      }),
      startWith(transferred),
      filter(Boolean),
      shareReplay(1),
    );
    runInInjectionContext(injector, () => {
      build$.subscribe();
    });
    return firstValueFrom(build$);
  });
}
