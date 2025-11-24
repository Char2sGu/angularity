import {
  EnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';

/**
 * A function that registers side-effects (of commands/events).
 * @deprecated Use `createFlow` instead.
 */
export interface Effects {
  (): void;
}

/**
 * Registers the provided effects in an environment initializer.
 * @deprecated Use `provideFlows` instead.
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
