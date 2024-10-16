import { inject, Injectable, Injector } from '@angular/core';

import { ThemeBuilderComposition } from './builder-composition';
import { ThemeTokenRegistry, ThemeTokens } from './token';

/**
 * Facade-level service that is responsible for high-level theme operations.
 * @remarks This service is provided in root by default.
 */
@Injectable({ providedIn: 'root' })
export class ThemeManager {
  protected injector = inject(Injector);
  protected tokens = inject(ThemeTokenRegistry);

  /**
   * Resolves a list of token generation specifications into a single object
   * of merged theme tokens.
   * @param compositions theme token generation specifications
   * @returns generated theme tokens from all the specifications, merged into a single object.
   * @remarks Specifications are resolved in order, and tokens generated from later
   * specifications will overwrite the previous ones when the token names conflict.
   */
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

  /**
   * Apply the given theme tokens to the application to make them take effect.
   * @param tokens
   * @remarks Previously applied tokens will not be cleared when applying new
   * tokens. New tokens will overwrite the previous ones when the token names
   * conflict.
   */
  apply(tokens: ThemeTokens): void {
    for (const name in tokens) this.tokens.set(name, tokens[name]);
  }
}
