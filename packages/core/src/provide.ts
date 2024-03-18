import { Provider, ProviderToken, Type } from '@angular/core';

export function provide<T, U extends T>(config: ProvideConfig<T, U>): Provider {
  if ('useValue' in config)
    return { provide: config.token, useValue: config.useValue };
  if ('useFactory' in config)
    return { provide: config.token, useFactory: config.useFactory };
  if ('useClass' in config)
    return { provide: config.token, useClass: config.useClass };
  if ('useExisting' in config)
    return { provide: config.token, useExisting: config.useExisting };
  throw new Error('Invalid config');
}

export type ProvideConfig<T, U extends T = T> = ProvideConfigToken<T> &
  ProvideConfigUse<U>;

export function provideMulti<T>(config: ProvideMultiConfig<T>): Provider {
  return {
    ...provide(config as ProvideConfig<unknown>),
    multi: true,
  } as unknown as Provider;
}

export type ProvideMultiConfig<T> = ProvideConfigToken<T> &
  (T extends readonly (infer I)[] ? ProvideConfigUse<I> : ProvideConfigUse<T>);

export interface ProvideConfigToken<T> {
  token: ProviderToken<T>;
}

export type ProvideConfigUse<T> =
  | ProvideConfigUseValue<T>
  | ProvideConfigUseFactory<T>
  | ProvideConfigUseClass<T>
  | ProvideConfigUseExisting<T>;
export interface ProvideConfigUseValue<T> {
  useValue: T;
}
export interface ProvideConfigUseFactory<T> {
  useFactory: () => T;
}
export interface ProvideConfigUseClass<T> {
  useClass: Type<T>;
}
export interface ProvideConfigUseExisting<T> {
  useExisting: ProviderToken<T>;
}
