import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';
import {
  argbFromHex,
  CorePalette,
  DynamicColor,
  DynamicScheme,
  hexFromArgb,
  MaterialDynamicColors,
} from '@material/material-color-utilities';

/**
 * Copy of the internal enum `Variant` from `@material/material-color-utilities`.
 */
export enum SchemeVariant {
  /* eslint-disable @typescript-eslint/naming-convention */
  MONOCHROME = 0,
  NEUTRAL = 1,
  TONAL_SPOT = 2,
  VIBRANT = 3,
  EXPRESSIVE = 4,
  FIDELITY = 5,
  CONTENT = 6,
  RAINBOW = 7,
  FRUIT_SALAD = 8,
  /* eslint-enable @typescript-eslint/naming-convention */
}

export enum SchemeMode {
  Light = 'Light',
  Dark = 'Dark',
}

export interface SchemeBuilderConfig {
  primary: string;
  secondary?: string;
  tertiary?: string;
  variant: SchemeVariant;
  mode: SchemeMode;
}

export class SchemeBuilder implements ThemeBuilder<SchemeBuilderConfig> {
  build(context: ThemeBuilderContext<SchemeBuilderConfig>): ThemeTokens {
    const scheme = this.getScheme(context.config);
    const tokens: ThemeTokens = {};
    for (const [k, v] of Object.entries(MaterialDynamicColors)) {
      if (!(v instanceof DynamicColor)) continue;
      const name = k.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase();
      const token = `${context.name}-${name}`;
      tokens[token] = hexFromArgb(v.getArgb(scheme));
    }
    return tokens;
  }

  getScheme(config: SchemeBuilderConfig): DynamicScheme {
    const palette = this.getCorePalette(config);
    const scheme = new DynamicScheme({
      sourceColorArgb: argbFromHex(config.primary),
      variant: config.variant as any,
      isDark: config.mode === SchemeMode.Dark,
      contrastLevel: 0.0,
      primaryPalette: palette.a1,
      secondaryPalette: palette.a2,
      tertiaryPalette: palette.a3,
      neutralPalette: palette.n1,
      neutralVariantPalette: palette.n2,
    });
    return scheme;
  }

  getCorePalette(config: SchemeBuilderConfig): CorePalette {
    const read = (v: string) => argbFromHex(v);
    const readOpt = (v: string | undefined) => (v ? read(v) : undefined);
    return CorePalette.fromColors({
      primary: read(config.primary),
      secondary: readOpt(config.secondary),
      tertiary: readOpt(config.tertiary),
    });
  }
}
