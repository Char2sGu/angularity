import { ThemeBuilder, ThemeTokens } from '@angularly/theming';
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
  palette: {
    primary: string;
    secondary?: string;
    tertiary?: string;
    variant: SchemeVariant;
    mode: SchemeMode;
  };
}

export class SchemeBuilder implements ThemeBuilder<SchemeBuilderConfig> {
  build(config: SchemeBuilderConfig): ThemeTokens {
    const scheme = this.getScheme(config);
    const tokens: ThemeTokens = {};
    for (const [k, v] of Object.entries(MaterialDynamicColors)) {
      if (!(v instanceof DynamicColor)) continue;
      const token = k.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase();
      tokens[token] = hexFromArgb(v.getArgb(scheme));
    }
    return tokens;
  }

  getScheme(config: SchemeBuilderConfig): DynamicScheme {
    const palette = this.getCorePalette(config);
    const scheme = new DynamicScheme({
      sourceColorArgb: argbFromHex(config.palette.primary),
      variant: config.palette.variant as any,
      isDark: config.palette.mode === SchemeMode.Dark,
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
      primary: read(config.palette.primary),
      secondary: readOpt(config.palette.secondary),
      tertiary: readOpt(config.palette.tertiary),
    });
  }
}
