import { DOCUMENT } from '@angular/common';
import { forwardRef, inject, Injectable } from '@angular/core';
import { Exception } from '@angularity/core';

/**
 * Name-value pairs that represent the small, repeated design decisions that make
 * up a design system's visual style.
 * @see https://m3.material.io/foundations/design-tokens/overview
 * @see `ThemeBuilder`
 */
export interface ThemeTokens {
  [name: string]: string;
}

/**
 * Registry for active theme tokens in the current application.
 *
 * @remarks
 * This is an abstract service with a default implementation `RootElementStylePropertiesThemeTokenRegistry`.
 */
@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => RootElementStylePropertiesThemeTokenRegistry),
})
export abstract class ThemeTokenRegistry {
  /**
   * Retrieve the value of a theme token.
   * @param name the name of the theme token
   * @returns the value if registered, or `null` if not found
   */
  abstract get(name: string): string | null;

  /**
   * Define a new value for a theme token. Duplicate defines overwrite the
   * previous value.
   * @param name the name of the theme token
   * @param value new value for the theme token
   */
  abstract set(name: string, value: string | null): void;
}

/**
 * Exception thrown when a theme token is not found in the registry.
 */
export class ThemeTokenNotFoundException extends Exception {
  constructor(name: string) {
    super(`Theme token ${name} is not defined`);
  }
}

/**
 * Implementation of `ThemeTokenRegistry` that defines theme token and values
 * as CSS variables on the root DOM element, usually the `<html>` element.
 * @remarks Token names can be optionally prefixed with `--`, e.g. `--primary`.
 */
@Injectable()
export class RootElementStylePropertiesThemeTokenRegistry
  implements ThemeTokenRegistry
{
  protected document = inject(DOCUMENT);
  protected element = this.document.documentElement;
  protected styles?: CSSStyleDeclaration;

  get(name: string): string | null {
    name = this.normalizeName(name);
    this.styles ??= window.getComputedStyle(this.element);
    const value = this.styles.getPropertyValue(name);
    if (!value) return null;
    return value.trim();
  }

  /**
   * @throws `ThemeTokenNotFoundException` if the token is not found
   * @deprecated prefer `get`
   */
  getOrThrow(name: string): string {
    const value = this.get(name);
    if (value === null) throw new ThemeTokenNotFoundException(name);
    return value;
  }

  set(name: string, value: string | null): void {
    this.styles &&= undefined;
    name = this.normalizeName(name);
    this.element.style.setProperty(name, value);
  }

  protected normalizeName(name: string): string {
    return name.startsWith('--') ? name : `--${name}`;
  }
}

/**
 * Implementation of `ThemeTokenRegistry` that is intended for testing purposes.
 */
@Injectable()
export class TestingThemeTokenRegistry implements ThemeTokenRegistry {
  /**
   * In-memory storage of theme tokens.
   */
  tokens: Record<string, string | null> = {};

  get(name: string): string | null {
    return this.tokens[name] ?? null;
  }
  set(name: string, value: string | null): void {
    this.tokens[name] = value;
  }
}
