import { forwardRef, inject, Injectable } from '@angular/core';

import { THEME_BUILDERS } from './provide';
import { ThemeTokenRegistry, ThemeTokens } from './token';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SimpleThemeManager),
})
export abstract class ThemeManager<Config> {
  abstract apply(config: Config): void;
  abstract build(config: Config): ThemeTokens;
}

@Injectable({ providedIn: 'root' })
export class SimpleThemeManager<Config> implements ThemeManager<Config> {
  protected tokens = inject(ThemeTokenRegistry);
  protected builders = inject(THEME_BUILDERS);

  apply(config: Config): void {
    const tokens = this.build(config);
    for (const name in tokens) this.tokens.set(name, tokens[name]);
  }

  build(config: Config): ThemeTokens {
    return this.builders.reduce(
      (tokens, builder) => ({ ...tokens, ...builder.build(config) }),
      {},
    );
  }
}
