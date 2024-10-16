import { ProviderToken } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { ThemeBuilder, ThemeBuilderConfigOf } from './builder';

/**
 * Represents a token generation specification, which specifies the target `ThemeBuilder`
 * and relevant configurations to be passed to the builder.
 * @see `withThemeBuilder`
 */
export interface ThemeBuilderComposition {
  /**
   * The name that will be passed to the theme builder.
   */
  name: string;

  /**
   * The token that can be used to retrieve the theme builder instance from
   * the injector.
   */
  builder: ProviderToken<ThemeBuilder<any>>;

  /**
   * The configuration object that will be passed to the theme builder.
   */
  config: unknown;
}

/**
 * Creates a token generation specification, which specifies the target `ThemeBuilder`
 * and relevant configurations to be passed to the builder.
 * @param name The name that will be passed to the theme builder.
 * @param builder The token that can be used to retrieve the theme builder
 * @param config The configuration object that will be passed to the theme builder.
 * @returns
 *
 * @see `provideTheme`
 *
 * @usageNotes
 *
 * A builder class can be passed to the `builder` parameter because constructor
 * classes are valid tokens for dependency injection. It is worthy noting that
 * you need to make sure that there is a provider for the token. This function
 * does not register providers for the token.
 *
 *  ```ts
 *  provide({ token: ColorBuilder, useClass: MyColorBuilder }),
 *  ```
 *  ```ts
 *  withThemeBuilder('color', ColorBuilder, { primaryColor: PRIMARY_COLOR }),
 *  ```
 *
 * An observable can be passed as the `config` parameter, in which case the
 * theme is expected to be updated on every value emission.
 *
 *  ```ts
 *  withThemeBuilder(
 *    'color',
 *    ColorBuilder,
 *    observePreferredColorScheme().pipe(
 *      map((isDark) => ({ primaryColor: PRIMARY_COLOR, dark: isDark })),
 *    ),
 *  );
 *  ```
 *
 * In order to gain access to the injection context, use the `defer` RxJS
 * operator, which defers the invocation of the observable factory until
 * the observable is subscribed during the environment initialization, where
 * an injection context is available.
 *
 * ```ts
 * withThemeBuilder(
 *   'color',
 *   ColorBuilder,
 *   defer((schemeObserver = inject(PreferredColorSchemeObserver)) =>
 *     schemeObserver
 *       .observe()
 *       .pipe(map((isDark) => ({ primaryColor: PRIMARY_COLOR, dark: isDark }))),
 *   ),
 * );
 * ```
 */
export function withThemeBuilder<Builder extends ThemeBuilder<any>>(
  name: string,
  builder: ProviderToken<Builder>,
  config:
    | ThemeBuilderConfigOf<Builder>
    | Observable<ThemeBuilderConfigOf<Builder>>,
): Observable<ThemeBuilderComposition> {
  const config$ = config instanceof Observable ? config : of(config);
  return config$.pipe(map((config) => ({ name, builder, config })));
}
