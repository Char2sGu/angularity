import { inject } from '@angular/core';
import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';
import { Hct, TonalPalette } from '@material/material-color-utilities';

import { HctFormatter } from './hct-formatter.service';
import { SchemeMode } from './scheme';

export interface SchemeStaticColorBuilderConfig {
  name: string;
  source: Hct;
  mode: SchemeMode;
}

export class SchemeStaticColorBuilder
  implements ThemeBuilder<SchemeStaticColorBuilderConfig>
{
  protected hctFormatter = inject(HctFormatter);

  build(
    context: ThemeBuilderContext<SchemeStaticColorBuilderConfig>,
  ): ThemeTokens {
    const { name, config } = context;
    const palette = TonalPalette.fromHct(config.source);
    const tones = this.getStaticColorTones(config.mode);
    const format = (argb: number) =>
      this.hctFormatter.format(Hct.fromInt(argb));
    return {
      [`${name}-${config.name}`]: format(palette.tone(tones.color)),
      [`${name}-on-${config.name}`]: format(palette.tone(tones.onColor)),
      [`${name}-${config.name}-container`]: format(
        palette.tone(tones.colorContainer),
      ),
      [`${name}-on-${config.name}-container`]: format(
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
