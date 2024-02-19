import { inject, Injectable } from '@angular/core';

import { THEME_BUILDERS, ThemeTokens } from './builder';
import { CssVariableService } from './css-variable.service';

@Injectable({ providedIn: 'root' })
export class ThemeManager<Config> {
  private cssVars = inject(CssVariableService);
  private builders = inject(THEME_BUILDERS);

  apply(config: Config): void {
    const tokens = this.build(config);
    for (const name in tokens) this.cssVars.define(name, tokens[name]);
  }

  build(config: Config): ThemeTokens {
    return this.builders.reduce(
      (tokens, builder) => ({ ...tokens, ...builder.build(config) }),
      {},
    );
  }
}
