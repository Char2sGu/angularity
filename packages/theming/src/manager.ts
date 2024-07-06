import { inject, Injectable, Injector } from '@angular/core';

import { ThemeBuilderComposition } from './builder-composition';
import { ThemeTokenRegistry, ThemeTokens } from './token';

@Injectable({ providedIn: 'root' })
export class ThemeManager {
  protected injector = inject(Injector);
  protected tokens = inject(ThemeTokenRegistry);

  build(config: ThemeBuildConfig): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const [name, composition] of Object.entries(config)) {
      const { builder: token, config } = composition;
      const builder = this.injector.get(token);
      const result = builder.build({ name, config });
      Object.assign(tokens, result);
    }
    return tokens;
  }

  apply(tokens: ThemeTokens): void {
    for (const name in tokens) this.tokens.set(name, tokens[name]);
  }

  buildAndApply(config: ThemeBuildConfig): void {
    const tokens = this.build(config);
    this.apply(tokens);
  }
}

export interface ThemeBuildConfig {
  [name: string]: ThemeBuilderComposition;
}
