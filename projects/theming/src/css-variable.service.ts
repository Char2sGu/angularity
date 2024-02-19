import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CssVariableService {
  private document = inject(DOCUMENT);
  private rootElement = this.document.documentElement;

  evaluate(name: string): string {
    name = this.normalizeVariableName(name);
    const value = window
      .getComputedStyle(this.rootElement)
      .getPropertyValue(name);
    if (!value) throw new Error(`CSS variable ${name} is not defined`);
    return value.trim();
  }

  define(name: string, value: string | null): void {
    name = this.normalizeVariableName(name);
    this.rootElement.style.setProperty(name, value);
  }

  private normalizeVariableName(name: string): string {
    return name.startsWith('--') ? name : `--${name}`;
  }
}
