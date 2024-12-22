import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
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
 * By default, uses `InMemoryThemeTokenRegistry`
 * decorated with `WriteTokensToRootCssVariables`.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    let instance: ThemeTokenRegistry;
    instance = new InMemoryThemeTokenRegistry();
    instance = new WriteTokensToRootCssVariables(instance);
    return instance;
  },
})
export abstract class ThemeTokenRegistry {
  /**
   * Retrieve the value of a theme token.
   * @param name the name of the theme token
   * @returns the value if registered, or `null` if not found
   */
  abstract get(name: string): string | null;

  /**
   * Retrieve all theme tokens.
   * @returns copy of all theme tokens
   */
  abstract getAll(): ThemeTokens;

  /**
   * Define a new value for a theme token. Duplicate defines overwrite the
   * previous value.
   * @param name the name of the theme token
   * @param value new value for the theme token
   */
  abstract set(name: string, value: string | null): void;

  /**
   * Define all theme tokens, replacing all existing tokens.
   * @param tokens new theme tokens
   */
  abstract setAll(tokens: ThemeTokens): void;
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
 * Implementation of `ThemeTokenRegistry` that
 * stores theme tokens in memory.
 */
@Injectable()
export class InMemoryThemeTokenRegistry implements ThemeTokenRegistry {
  /**
   * In-memory storage of theme tokens.
   */
  #tokens: ThemeTokens = {};

  get(name: string): string | null {
    return this.#tokens[name] ?? null;
  }
  getAll(): ThemeTokens {
    return { ...this.#tokens };
  }
  set(name: string, value: string | null): void {
    if (value === null) delete this.#tokens[name];
    else this.#tokens[name] = value;
  }
  setAll(tokens: ThemeTokens): void {
    this.#tokens = { ...tokens };
  }
}

const SERVER_TOKENS = makeStateKey<ThemeTokens>('THEME_TOKENS');

/**
 * Decorator of `ThemeTokenRegistry` that
 * writes theme tokens to the root element as CSS variables.
 *
 * - On server, the tokens will be written to
 * the root element's style properties as CSS variables.
 * - On browser, the tokens will be written to
 * a `CSSStyleSheet` object adopted by the document.
 */
class WriteTokensToRootCssVariables implements ThemeTokenRegistry {
  #document = inject(DOCUMENT);
  #platform = inject(PLATFORM_ID);
  #transferState = inject(TransferState, { optional: true });

  #delegate: ThemeTokenRegistry;
  #stylesheet?: CSSStyleSheet;

  constructor(delegate: ThemeTokenRegistry) {
    this.#delegate = delegate;
    this.#transferState?.onSerialize(SERVER_TOKENS, () => this.getAll());

    if (isPlatformBrowser(this.#platform)) {
      this.#stylesheet = new window.CSSStyleSheet();
      this.#document.adoptedStyleSheets = [
        ...(this.#document.adoptedStyleSheets ?? []),
        this.#stylesheet,
      ];
      this.#transferServerTokensIfAvailable();
    }
  }

  get(name: string): string | null {
    return this.#delegate.get(name);
  }
  getAll(): ThemeTokens {
    return this.#delegate.getAll();
  }
  set(name: string, value: string | null): void {
    this.#delegate.set(name, value);
    if (isPlatformBrowser(this.#platform)) this.#writeAllToStylesheet();
    else if (isPlatformServer(this.#platform))
      this.#writeToInlineStyles(name, value);
  }
  setAll(tokens: ThemeTokens): void {
    this.#delegate.setAll(tokens);
    if (isPlatformBrowser(this.#platform)) this.#writeAllToStylesheet();
    else if (isPlatformServer(this.#platform))
      for (const [name, value] of Object.entries(tokens))
        this.#document.documentElement.style.setProperty(
          this.#toVarName(name),
          value,
        );
  }

  #transferServerTokensIfAvailable() {
    if (!this.#transferState) return;
    const serverTokens = this.#transferState.get(SERVER_TOKENS, {});
    this.setAll(serverTokens);
    for (const tokenName in serverTokens)
      this.#writeToInlineStyles(tokenName, null);
  }

  #writeAllToStylesheet() {
    this.#stylesheet?.replaceSync(this.#buildCssText());
  }
  #writeToInlineStyles(name: string, value: string | null) {
    this.#document.documentElement.style.setProperty(
      this.#toVarName(name),
      value ?? '',
    );
  }

  #buildCssText() {
    const tokens = Object.entries(this.#delegate.getAll())
      .map(([name, value]) => `${this.#toVarName(name)}: ${value};`)
      .join('\n');
    return `:root {\n${tokens}\n}`;
  }

  #toVarName(name: string): string {
    return `--${name}`;
  }
}
