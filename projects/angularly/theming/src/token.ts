import { DOCUMENT } from '@angular/common';
import { forwardRef, inject, Injectable } from '@angular/core';

export interface ThemeTokens {
  [name: string]: string;
}

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => RootElementStylePropertiesThemeTokenRegistry),
})
export abstract class ThemeTokenRegistry {
  abstract get(name: string): string | null;
  abstract set(name: string, value: string | null): void;
}

export class ThemeTokenNotFoundError extends Error {
  constructor(name: string) {
    super(`Theme token ${name} is not defined`);
  }
}

@Injectable({
  providedIn: 'root',
})
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

  getOrThrow(name: string): string {
    const value = this.get(name);
    if (value === null) throw new ThemeTokenNotFoundError(name);
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
