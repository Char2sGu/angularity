import {
  forwardRef,
  inject,
  Injectable,
  Injector,
  ProviderToken,
} from '@angular/core';

import { ThemeBuilder } from './builder';
import { ThemeTokenRegistry, ThemeTokens } from './token';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SimpleThemeManager),
})
export abstract class ThemeManager {
  abstract buildAndApply<Builders extends ThemeBuilderMap>(
    builders: Builders,
    configs: ThemeBuilderConfigMapOf<Builders>,
  ): void;
  abstract build<Builders extends ThemeBuilderMap>(
    builders: Builders,
    configs: ThemeBuilderConfigMapOf<Builders>,
  ): ThemeTokens;
  abstract apply(tokens: ThemeTokens): void;
}

export interface ThemeBuilderMap {
  [name: string]: ProviderToken<ThemeBuilder<unknown>>;
}

export type ThemeBuilderConfigMapOf<Builders extends ThemeBuilderMap> = {
  [Name in keyof Builders]: Builders[Name] extends ProviderToken<
    ThemeBuilder<infer Config>
  >
    ? Config
    : never;
};

@Injectable({ providedIn: 'root' })
export class SimpleThemeManager implements ThemeManager {
  protected injector = inject(Injector);
  protected tokens = inject(ThemeTokenRegistry);

  buildAndApply<Builders extends ThemeBuilderMap>(
    builders: Builders,
    configs: ThemeBuilderConfigMapOf<Builders>,
  ): void {
    const tokens = this.build(builders, configs);
    this.apply(tokens);
  }

  build<Builders extends ThemeBuilderMap>(
    builders: Builders,
    configs: ThemeBuilderConfigMapOf<Builders>,
  ): ThemeTokens {
    return Object.entries(builders).reduce(
      (tokens, [name, builder]) => ({
        ...tokens,
        ...this.injector.get(builder).build({ name, config: configs[name] }),
      }),
      {},
    );
  }

  apply(tokens: ThemeTokens): void {
    for (const name in tokens) this.tokens.set(name, tokens[name]);
  }
}
