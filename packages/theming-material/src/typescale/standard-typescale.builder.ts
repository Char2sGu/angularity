import { inject, Injectable } from '@angular/core';
import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';

import { STANDARD_TYPESCALES } from './standard-typescales';
import { TypescaleBuilder } from './typescale.builder';

export interface StandardTypescaleBuilderConfig {
  font: string;
}

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
