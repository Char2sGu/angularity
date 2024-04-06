import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Injector,
  makeEnvironmentProviders,
  runInInjectionContext,
} from '@angular/core';
import { provideMulti } from '@angularity/core';

export interface Effects {
  (): void;
}

export function provideEffects(
  ...effectsInput: (Effects | Effects[])[]
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideMulti({
      token: ENVIRONMENT_INITIALIZER,
      useFactory:
        (injector = inject(Injector)) =>
        () => {
          runInInjectionContext(injector, () => {
            effectsInput.forEach((effects) => {
              if (Array.isArray(effects))
                effects.forEach((effects) => effects());
              else effects();
            });
          });
        },
    }),
  ]);
}
