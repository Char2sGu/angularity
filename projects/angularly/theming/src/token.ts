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
  abstract get(name: string): string;
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

  /**
   * @throws {ThemeTokenNotFoundError}
   */
  get(name: string): string {
    name = this.normalizeName(name);
    const value = window.getComputedStyle(this.element).getPropertyValue(name);
    if (!value) throw new ThemeTokenNotFoundError(name);
    return value.trim();
  }

  set(name: string, value: string | null): void {
    name = this.normalizeName(name);
    this.element.style.setProperty(name, value);
  }

  protected normalizeName(name: string): string {
    return name.startsWith('--') ? name : `--${name}`;
  }
}
