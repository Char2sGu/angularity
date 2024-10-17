import { Injectable } from '@angular/core';
import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';

/**
 * Properties of a Material Typescale level.
 *
 * @remarks
 * A typescale is a selection of font styles that can be used across an app,
 * ensuring a flexible, yet consistent, style that accommodates a range of purposes.
 * See [the specification](https://m3.material.io/styles/typography/type-scale-tokens)
 * for more details.
 *
 * @see `TypescaleBuilder`
 * @see `StandardTypescaleBuilder`
 */
export interface TypescaleConfig {
  /**
   * CSS-compatible font families for this typescale level.
   * @example 'Roboto, sans-serif'
   */
  font: string;
  /**
   * Name of this typescale level.
   * @example 'display-large'
   */
  name: string;
  /**
   * CSS-compatible font weight for this typescale level.
   * @example '400'
   */
  weight: string;
  /**
   * CSS-compatible font size for this typescale level.
   * @example '57px'
   */
  size: string;
  /**
   * CSS-compatible Line height for this typescale level.
   * @example '64px'
   */
  lineHeight: string;

  /**
   * CSS-compatible letter spacing for this typescale level.
   * @example '-0.2px'
   */
  tracking: string;
}

/**
 * Configuration for `TypescaleBuilder`. An array of `TypescaleConfig` objects.
 */
export interface TypescaleBuilderConfig extends Array<TypescaleConfig> {}

/**
 * Implementation of `ThemeBuilder` for generating theme tokens relevant to
 * Material typescale levels.
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
 * @see `StandardTypescaleBuilder` for a less-verbose usage if the desired typescale levels
 * are identical to the Material specifications
 *
 * @example
 *  ```ts
 *  const font = 'Roboto, sans-serif';
 *  export const APP_TYPESCALES: TypescaleConfig[] = [
 *    {
 *      font,
 *      name: 'display-large',
 *      weight: '400',
 *      size: '57px',
 *      lineHeight: '64px',
 *      tracking: '-0.2px',
 *    },
 *    {
 *      font,
 *      name: 'display-medium',
 *      weight: '400',
 *      size: '45px',
 *      lineHeight: '52px',
 *      tracking: '0.0px',
 *    },
 *    ...
 *  ];
 *  ```
 *  ```ts
 *  provideTheme(
 *    withThemeBuilder("typescale", TypescaleBuilder, APP_TYPESCALES),
 *  ),
 *  ```
 *
 */
@Injectable({ providedIn: 'root' })
export class TypescaleBuilder implements ThemeBuilder<TypescaleBuilderConfig> {
  build(context: ThemeBuilderContext<TypescaleBuilderConfig>): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const typescale of context.config) {
      const result = this.buildTypescale(typescale);
      for (const token in result)
        tokens[`${context.name}-${token}`] = result[token];
    }
    return tokens;
  }

  buildTypescale(config: TypescaleConfig): ThemeTokens {
    const { name, font, weight, size, lineHeight, tracking } = config;
    return {
      [`${name}-font`]: font,
      [`${name}-weight`]: weight,
      [`${name}-size`]: size,
      [`${name}-line-height`]: lineHeight,
      [`${name}-tracking`]: tracking,
    };
  }
}
