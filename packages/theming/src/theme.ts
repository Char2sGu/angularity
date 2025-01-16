import { Injector } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { ThemeTokens } from './token';
import { TokenBuild } from './token-build';

/**
 * Specifications about how a visual theme can be generated.
 */
export interface Theme {
  readonly spec: Observable<TokenBuild[]>;
}

/**
 * Create a `Theme` object from a list of `TokenBuild` specifications.
 */
export function createTheme(...builds: Observable<TokenBuild>[]): Theme {
  return { spec: combineLatest(builds) };
}

/**
 * Consume a `Theme` object to generate a set of theme tokens.
 */
export function buildTheme(
  injector: Injector,
  theme: Theme,
): Observable<ThemeTokens> {
  return theme.spec.pipe(
    map((specs) => {
      const tokens: ThemeTokens = {};
      specs.forEach((specs) => {
        const { name, builder: builderToken, config } = specs;
        const builder = injector.get(builderToken);
        const result = builder.build({ name, config });
        Object.assign(tokens, result);
      });
      return tokens;
    }),
  );
}
