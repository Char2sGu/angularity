import { inject, Injectable } from '@angular/core';
import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';

import { STANDARD_TYPESCALES } from './standard-typescales';
import { TypescaleBuilder } from './typescale.builder';

/**
 * Configuration for `StandardTypescaleBuilder`.
 */
export interface StandardTypescaleBuilderConfig {
  font: string;
}

/**
 * Implementation of `ThemeBuilder` that generates theme tokens of typescale
 * levels strictly following the Material specifications.
 *
 * @remarks
 * A typescale is a selection of font styles that can be used across an app,
 * ensuring a flexible, yet consistent, style that accommodates a range of purposes.
 * See [the specification](https://m3.material.io/styles/typography/type-scale-tokens)
 * for more details.
 *
 * @remarks
 * Each `TypescaleConfig` generates 5 theme tokens. For a typescale level named "display-large",
 * the generated tokens will be "display-large-font", "display-large-weight", "display-large-size",
 * "display-large-line-height", "display-large-tracking".
 *
 * @see `TypescaleConfig` for more granular control over typescale levels.
 *
 * @example
 *  ```ts
 *  provideTheme(
 *    withThemeBuilder("typescale", StandardTypescaleBuilder, {
 *      font: 'Roboto, sans-serif',
 *    }),
 *  ),
 *  ```
 */
@Injectable({ providedIn: 'root' })
export class StandardTypescaleBuilder
  implements ThemeBuilder<StandardTypescaleBuilderConfig>
{
  protected core = inject(TypescaleBuilder);
  build(
    context: ThemeBuilderContext<StandardTypescaleBuilderConfig>,
  ): ThemeTokens {
    const { name, config } = context;
    const typescales = STANDARD_TYPESCALES.map((typescale) => ({
      ...typescale,
      font: config.font,
    }));
    return this.core.build({ name, config: typescales });
  }
}
