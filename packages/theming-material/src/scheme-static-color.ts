import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';
import {
  argbFromHex,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';

import { SchemeMode } from './scheme';

export interface SchemeStaticColorBuilderConfig {
  name: string;
  source: string;
  mode: SchemeMode;
}

export class SchemeStaticColorBuilder
  implements ThemeBuilder<SchemeStaticColorBuilderConfig>
{
  build(
    context: ThemeBuilderContext<SchemeStaticColorBuilderConfig>,
  ): ThemeTokens {
    const { name, config } = context;
    const palette = TonalPalette.fromInt(argbFromHex(config.source));
    const tones = this.getStaticColorTones(config.mode);
    return {
      [`${name}-${config.name}`]: hexFromArgb(palette.tone(tones.color)),
      [`${name}-on-${config.name}`]: hexFromArgb(palette.tone(tones.onColor)),
      [`${name}-${config.name}-container`]: hexFromArgb(
        palette.tone(tones.colorContainer),
      ),
      [`${name}-on-${config.name}-container`]: hexFromArgb(
        palette.tone(tones.onColorContainer),
      ),
    };
  }

  protected getStaticColorTones(
    mode: SchemeMode,
  ): Record<
    'color' | 'onColor' | 'colorContainer' | 'onColorContainer',
    number
  > {
    switch (mode) {
      case SchemeMode.Light:
        return {
          color: 40,
          onColor: 100,
          colorContainer: 90,
          onColorContainer: 10,
        };
      case SchemeMode.Dark:
        return {
          color: 80,
          onColor: 20,
          colorContainer: 30,
          onColorContainer: 90,
        };
      default:
        throw new Error('Non-exhaustive match for mode');
    }
  }
}
