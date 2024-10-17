import { inject, Injectable } from '@angular/core';
import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';
import {
  DynamicColor,
  DynamicScheme,
  Hct,
  MaterialDynamicColors,
} from '@material/material-color-utilities';

import { HctFormatter } from './hct-formatter.service';

/**
 * Mode for Material color schemes.
 * @see `SchemeBuilder`
 */
export enum SchemeMode {
  Light = 'Light',
  Dark = 'Dark',
}

/**
 * Common contrast level values for Material color schemes. `Standard` should
 * fit for most use cases.
 * @see `SchemeBuilder`
 */

export enum SchemeContrastLevel {
  Reduced = -1.0,
  Standard = 0.0,
  Medium = 0.5,
  High = 1.0,
}

/**
 * Constructor of `DynamicScheme` from `material-color-utilities`.
 *
 * Available values include:
 * - `SchemeTonalSpot`: classic Material Design 3 colors
 * - `SchemeVibrant`: more vibrant colors
 * - `SchemeMonochrome`: grayscale colors
 * - `SchemeNeutral`: colors that are nearly grayscale
 * - `SchemeFidelity`: match the source color as closely as possible
 * - etc.
 *
 * @see https://github.com/material-foundation/material-color-utilities/tree/main/typescript/scheme for all available scheme types
 *
 * @example
 *  ```ts
 *  import { SchemeTonalSpot } from '@material/material-color-utilities';
 *  const type: SchemeType = SchemeTonalSpot;
 *  ```
 */
export interface SchemeType {
  new (source: Hct, isDark: boolean, contrast: number): DynamicScheme;
}

/**
 * Configuration for `SchemeBuilder`.
 */
export interface SchemeBuilderConfig {
  /**
   * The type of color scheme to generate. See `SchemeType` for details.
   */
  type: SchemeType;

  /**
   * The source/seed color to use for creating the color scheme. The generated
   * color scheme may deviate from this color at some extent, depending on the
   * chrome of the source color and the algorithm used by the `SchemeType`.
   *
   * @remarks `Hct` is the color representation from `material-color-utilities`,
   * which consists of hue, chroma, and tone.
   *
   * @example
   *  ```ts
   *  import { Hct, argbFromHex } from '@material/material-color-utilities';
   *  Hct.fromInt(0xc2e7ff)
   *  Hct.fromInt(argbFromHex("#c2e7ff"))
   *  ```
   */
  source: Hct;

  /**
   * The mode of the color scheme. Light or Dark.
   */
  mode: SchemeMode;

  /**
   * The contrast level of the color scheme. See `SchemeContrastLevel` for
   * common values, or use a number between -1 to 1 for custom values, where
   * -1 is the lowest contrast and 1 is the highest.
   */
  contrast: SchemeContrastLevel | number;
}

/**
 * Implementation of `ThemeBuilder` that generates hex color tokens for all
 * color roles under Material Design 3 color schemes.
 */
@Injectable({ providedIn: 'root' })
export class SchemeBuilder implements ThemeBuilder<SchemeBuilderConfig> {
  protected hctFormatter = inject(HctFormatter);

  build(context: ThemeBuilderContext<SchemeBuilderConfig>): ThemeTokens {
    const scheme = this.getScheme(context.config);
    const tokens: ThemeTokens = {};
    for (const [k, v] of Object.entries(MaterialDynamicColors)) {
      if (!(v instanceof DynamicColor)) continue;
      const name = k.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase();
      const color = v.getHct(scheme);
      const token = `${context.name}-${name}`;
      const value = this.hctFormatter.format(color);
      tokens[token] = value;
    }
    return tokens;
  }

  protected getScheme(config: SchemeBuilderConfig): DynamicScheme {
    return new config.type(
      config.source,
      config.mode === SchemeMode.Dark,
      config.contrast,
    );
  }
}
