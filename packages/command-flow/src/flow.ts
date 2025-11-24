import {
  EnvironmentProviders,
  inject,
  Injector,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  runInInjectionContext,
} from '@angular/core';

/**
 * A collection of effects that are run in an injection context.
 */
export interface Flow {
  effects: FlowEffect[];
}

/**
 * A function that is run in an injection context and registers some side effects.
 */
export interface FlowEffect {
  (): void;
}

/**
 * Creates a `Flow` with the given `FlowEffect`s.
 * @example
 * ```ts
 * export const authFlow = createFlow(
 *   () =>
 *     onCommand(
 *       [Alert],
 *       map((payload) => {
 *         window.alert(payload.message);
 *         return AlertCompleted();
 *       }),
 *     ),
 *   (confirm = inject(ConfirmService)) =>
 *     onCommand(
 *       [Confirm],
 *       map((payload) => {
 *         const result = confirm.launch(payload.message);
 *         return ConfirmCompleted(result);
 *       }),
 *     ),
 * );
 * ```
 */
export function createFlow(...effects: FlowEffect[]): Flow {
  return { effects };
}

/**
 * Provides the given flows to an environment.
 */
export function provideFlows(...flows: Flow[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const injector = inject(Injector);
      for (const flow of flows)
        for (const effect of flow.effects)
          runInInjectionContext(injector, effect);
    }),
  ]);
}
