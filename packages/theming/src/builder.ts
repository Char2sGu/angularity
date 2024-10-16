import { ThemeTokens } from './token';

/**
 * Responsible for generating a group of theme tokens based on a configuration.
 *
 * @remarks
 * The generic type parameter declares the acceptable configuration type.
 *
 * @remarks
 * This package contains a built-in implementation: `TokensBuilder`.
 *
 * @example
 *  ```ts
 *  export interface MyThemeConfig {
 *    primaryColor: string;
 *  }
 *  export class MyThemeBuilder implements ThemeBuilder<MyThemeConfig> {
 *    build(context: ThemeBuilderContext<MyThemeConfig>): ThemeTokens {
 *      return {
 *        [`${context.name}-primary-color`]: context.config.primaryColor,
 *      };
 *    }
 *  }
 *  ```
 */
export interface ThemeBuilder<Config> {
  /**
   * Generate a group of theme tokens based on a configuration.
   */
  build(context: ThemeBuilderContext<Config>): ThemeTokens;
}

/**
 * Contextual information required for generating theme tokens.
 * @see `ThemeBuilder`
 */
export interface ThemeBuilderContext<Config> {
  /**
   * Name assigned to this theme builder. May or may not be included in
   * generated token names, depending on the implementation.
   */
  name: string;
  /**
   * Options that affects the behavior of the token generation.
   */
  config: Config;
}

/**
 * Utility type that extracts the accepted configuration type from a
 * `ThemeBuilder` type.
 */
export type ThemeBuilderConfigOf<Builder extends ThemeBuilder<any>> =
  Builder extends ThemeBuilder<infer Config> ? Config : never;
