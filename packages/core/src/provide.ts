import { Provider, ProviderToken, Type } from '@angular/core';

/**
 * Type-safe factory function for producing NON-multi `Provider` configs.
 * @param config type-safe configuration object
 * @returns a `Provider` object
 * @see `provideMulti`
 */
export function provide<T, U extends T>(config: ProvideConfig<T, U>): Provider {
  if ('useValue' in config)
    return { provide: config.token, useValue: config.useValue };
  if ('useFactory' in config)
    return { provide: config.token, useFactory: config.useFactory };
  if ('useClass' in config)
    return { provide: config.token, useClass: config.useClass };
  if ('useExisting' in config)
    return { provide: config.token, useExisting: config.useExisting };
  throw new Error('Unhandled provide config');
}

/**
 * Union configuration for all types of NON-multi `Provider` declarations.
 * @see `provide`
 */
export type ProvideConfig<T, U extends T = T> = ProvideConfigToken<T> &
  ProvideConfigUse<U>;

/**
 * Type-safe factory function for producing multi `Provider` configs.
 * @param config type-safe configuration object
 * @returns a `Provider` object
 * @see `provide`
 */
export function provideMulti<T>(config: ProvideMultiConfig<T>): Provider {
  return {
    ...provide(config as ProvideConfig<unknown>),
    multi: true,
  } as unknown as Provider;
}

/**
 * Union configuration for all types of multi `Provider` declarations.
 * @see `provideMulti`
 */
export type ProvideMultiConfig<T> = ProvideConfigToken<T> &
  (T extends readonly (infer I)[] ? ProvideConfigUse<I> : ProvideConfigUse<T>);

/**
 * Token part of a `Provider` configuration.
 * @see `ProvideConfig`
 */
export interface ProvideConfigToken<T> {
  token: ProviderToken<T>;
}

/**
 * Union value declaration part of a `Provider` configuration.
 * @see `ProvideConfig`
 */
export type ProvideConfigUse<T> =
  | ProvideConfigUseValue<T>
  | ProvideConfigUseFactory<T>
  | ProvideConfigUseClass<T>
  | ProvideConfigUseExisting<T>;

/**
 * @see `ProvideConfigUse`
 */
export interface ProvideConfigUseValue<T> {
  useValue: T;
}

/**
 * @see `ProvideConfigUse`
 */
export interface ProvideConfigUseFactory<T> {
  useFactory: () => T;
}

/**
 * @see `ProvideConfigUse`
 */
export interface ProvideConfigUseClass<T> {
  useClass: Type<T>;
}

/**
 * @see `ProvideConfigUse`
 */
export interface ProvideConfigUseExisting<T> {
  useExisting: ProviderToken<T>;
}
