import { inject, Injectable, Injector } from '@angular/core';

import { ThemeBuilderComposition } from './builder-composition';
import { ThemeTokenRegistry, ThemeTokens } from './token';

@Injectable({ providedIn: 'root' })
export class ThemeManager {
  protected injector = inject(Injector);
  protected tokens = inject(ThemeTokenRegistry);

  build(compositions: ThemeBuilderComposition[]): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const composition of compositions) {
      const { name, builder: builderToken, config } = composition;
      const builder = this.injector.get(builderToken);
      const result = builder.build({ name, config });
      Object.assign(tokens, result);
    }
    return tokens;
  }

  apply(tokens: ThemeTokens): void {
    for (const name in tokens) this.tokens.set(name, tokens[name]);
  }
}
