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
 * @see `TokenBuilder`
 */
export interface ThemeTokens {
  [name: string]: string;
}

/**
 * Registry for active theme tokens in the current application.
 *
 * On server, the tokens will be written to `TransferState`, and
 * can be later reused on browser via the `transfer` method.
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

  /**
   * Transfer theme tokens from `TransferState` to this registry,
   * if `TransferState` is available and contains theme tokens.
   * This will clear all existing tokens in this registry.
   * @returns `true` if tokens are transferred, `false` otherwise
   */
  abstract transfer(): boolean;
}

/**
 * Exception thrown when a theme token is not found in the registry.
 */
export class ThemeTokenNotFoundException extends Exception {
  constructor(name: string) {
    super(`Theme token ${name} is not defined`);
  }
}

const SERVER_TOKENS = makeStateKey<ThemeTokens>('THEME_TOKENS');

/**
 * Implementation of `ThemeTokenRegistry` that
 * stores theme tokens in memory.
 */
@Injectable()
export class InMemoryThemeTokenRegistry implements ThemeTokenRegistry {
  #transferState = inject(TransferState, { optional: true });

  #tokens: ThemeTokens = {};

  constructor() {
    this.#transferState?.onSerialize(SERVER_TOKENS, () => this.getAll());
  }

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
  transfer(): boolean {
    if (!this.#transferState) return false;
    const serverTokens = this.#transferState.get(SERVER_TOKENS, null);
    if (!serverTokens) return false;
    this.setAll(serverTokens);
    return true;
  }
}

/**
 * Decorator of `ThemeTokenRegistry` that
 * writes theme tokens to the root element as CSS variables.
 *
 * - On server, the tokens will be written to
 * the root element's style properties as CSS variables.
 * - On modern browser, the tokens will be written to
 * a constructed `CSSStyleSheet` object adopted by the document.
 * - On legacy browser, the tokens will be written to
 * a `<style>` element appended to the document head.
 */
export class WriteTokensToRootCssVariables implements ThemeTokenRegistry {
  #document = inject(DOCUMENT);
  #platform = inject(PLATFORM_ID);

  #delegate: ThemeTokenRegistry;
  #stylesheet?: CSSStyleSheet | HTMLStyleElement;

  constructor(delegate: ThemeTokenRegistry) {
    this.#delegate = delegate;
    if (isPlatformBrowser(this.#platform))
      try {
        this.#stylesheet = new window.CSSStyleSheet();
        this.#document.adoptedStyleSheets = [
          ...(this.#document.adoptedStyleSheets ?? []),
          this.#stylesheet,
        ];
      } catch (error) {
        if (!(error instanceof TypeError)) throw error;
        // constructable CSSStyleSheet not supported
        // fallback to legacy style element
        this.#stylesheet = this.#document.createElement('style');
        this.#document.head.append(this.#stylesheet);
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
        this.#writeToInlineStyles(name, value);
  }

  transfer(): boolean {
    const transferred = this.#delegate.transfer();
    if (!transferred) return false;
    const tokens = this.getAll();
    // On server, the tokens are written to the root element's style properties,
    // which should be removed after transfer.
    for (const tokenName in tokens) this.#writeToInlineStyles(tokenName, null);
    this.setAll(tokens); // write to stylesheet
    return true;
  }

  #writeAllToStylesheet() {
    if (this.#stylesheet instanceof HTMLElement)
      this.#stylesheet.innerText = this.#buildCssText();
    else this.#stylesheet?.replaceSync(this.#buildCssText());
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
