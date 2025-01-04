import { ThemeTokens } from './token';

/**
 * Responsible for generating a group of theme tokens based on a configuration.
 *
 * @remarks
 * The generic type parameter declares the acceptable configuration type.
 *
 * @remarks
 * This package contains a built-in implementation: `VanillaBuilder`.
 *
 * @example
 *  ```ts
 *  export interface MyThemeConfig {
 *    primaryColor: string;
 *  }
 *  export class MyTokenBuilder implements TokenBuilder<MyThemeConfig> {
 *    build(context: TokenBuilderContext<MyThemeConfig>): ThemeTokens {
 *      return {
 *        [`${context.name}-primary-color`]: context.config.primaryColor,
 *      };
 *    }
 *  }
 *  ```
 */
export interface TokenBuilder<Config> {
  /**
   * Generate a group of theme tokens based on a configuration.
   */
  build(context: TokenBuilderContext<Config>): ThemeTokens;
}

/**
 * Contextual information required for generating theme tokens.
 * @see `TokenBuilder`
 */
export interface TokenBuilderContext<Config> {
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
 * `TokenBuilder` type.
 */
export type TokenBuilderConfigOf<Builder extends TokenBuilder<any>> =
  Builder extends TokenBuilder<infer Config> ? Config : never;
