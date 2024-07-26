import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideMulti } from '@angularity/core';
import { combineLatest, Observable } from 'rxjs';

import { ThemeBuilderComposition } from './builder-composition';
import { ThemeManager } from './manager';

export function provideTheme(
  ...compositions: Observable<ThemeBuilderComposition>[]
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: ENVIRONMENT_INITIALIZER,
      useFactory:
        (manager = inject(ThemeManager)) =>
        () =>
          combineLatest(compositions)
            .pipe(takeUntilDestroyed())
            .subscribe((compositions) => {
              const tokens = manager.build(compositions);
              manager.apply(tokens);
            }),
    }),
  ]);
}
