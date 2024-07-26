import { Injectable } from '@angular/core';
import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';
import { DynamicColor, hexFromArgb } from '@material/material-color-utilities';

import { SchemeBuilder, SchemeBuilderConfig } from './scheme';

export interface ExtendedSchemeBuilderConfig extends SchemeBuilderConfig {
  extension?: (context: ExtendedSchemeBuilderExtensionContext) => ThemeTokens;
}

export interface ExtendedSchemeBuilderExtensionContext {
  hex: (role: DynamicColor) => string;
  argb: (role: DynamicColor) => number;
}

@Injectable({ providedIn: 'root' })
export class ExtendedSchemeBuilder
  extends SchemeBuilder
  implements ThemeBuilder<ExtendedSchemeBuilderConfig>
{
  override build(
    context: ThemeBuilderContext<ExtendedSchemeBuilderConfig>,
  ): ThemeTokens {
    const scheme = this.getScheme(context.config);
    const tokens = super.build(context);
    if (context.config.extension) {
      const hex = (role: DynamicColor) => hexFromArgb(role.getArgb(scheme));
      const argb = (role: DynamicColor) => role.getArgb(scheme);
      const extension = context.config.extension?.({ hex, argb });
      for (const [name, value] of Object.entries(extension))
        tokens[`${context.name}-${name}`] = value;
    }
    return tokens;
  }
}
