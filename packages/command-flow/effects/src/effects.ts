import {
  EnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';

/**
 * A function that registers side-effects (of commands/events).
 */
export interface Effects {
  (): void;
}

/**
 * Registers the provided effects in an environment initializer.
 */
export function provideEffects(
  ...effectsInput: (Effects | Effects[])[]
): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const effects = effectsInput.flat();
    const visited = new Set<Effects>();
    effects.forEach((effects) => {
      if (visited.has(effects))
        throw new Error(`duplicate effect ${effects.name}`);
      visited.add(effects);
      effects();
    });
  });
}
