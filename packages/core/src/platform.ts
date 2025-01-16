import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

import { Executor } from './executor';

/**
 * Accepts a `PLATFORM_ID` value and returns a boolean value indicating whether
 * the current platform is expected. `isPlatformBrowser` and `isPlatformServer`
 * are all valid `PlatformSelector` functions.
 */
export interface PlatformSelector {
  (platformId: object): boolean;
}

/**
 * Return a `Executor` if the current platform matches the given
 * `PlatformSelector`, or `null` otherwise.
 *
 * @example
 *  ```ts
 *  #onBrowser = usePlatformExec(isPlatformBrowser);
 *  ```
 *  ```ts
 *  if (!this.#onBrowser) return;
 *  doSomethingServerSpecific();
 *  ```
 *  ```ts
 *  // href is `undefined` if not in a browser environment
 *  const href = this.onBrowser?.(() => window.location.href);
 *  ```
 *  ```ts
 *  // alert is only invoked in a browser environment
 *  this.onBrowser?.(() => alert('Hello, World!'));
 *  ```
 */
export function usePlatformExec(selector: PlatformSelector): Executor | null {
  const platformId = inject(PLATFORM_ID);
  if (!selector(platformId)) return null;
  return <R>(fn: () => R): R => fn();
}

/**
 * Create a function that accepts another function.
 * If the current platform matches the given `PlatformSelector`, the accepted
 * function is invoked and its return value is forwarded.
 * Otherwise, `null` is returned.
 *
 * @deprecated prefer `usePlatformExec`.
 *
 * @example
 *  ```ts
 *  private onBrowser = usePlatformOnly(BROWSER);
 *  ```
 *  ```ts
 *  // href is `null` if not in a browser environment
 *  const href = this.onBrowser(() => window.location.href);
 *  ```
 *  ```ts
 *  // alert is only invoked in a browser environment
 *  this.onBrowser(() => alert('Hello, World!'));
 *  ```
 */
export const usePlatformOnly =
  (selector: PlatformSelector, platformId = inject(PLATFORM_ID)) =>
  <Return>(fn: () => Return): Return | null => {
    if (!selector(platformId)) return null;
    return fn();
  };

/**
 * Dependency Assembler that assembles a function, which takes another function,
 * invokes it and forwards its return value if within a browser environment, or
 * return `null` otherwise.
 *
 * @deprecated Prefer `usePlatformOnly`.
 *
 * @example
 *  ```ts
 *  private browserOnly = useBrowserOnly();
 *  ```
 *  ```ts
 *  // href is `null` if not in a browser environment
 *  const href = this.browserOnly(() => window.location.href);
 *  ```
 *  ```ts
 *  // alert is only invoked in a browser environment
 *  this.browserOnly(() => alert('Hello, World!'));
 *  ```
 */
export const useBrowserOnly =
  (platform = inject(PLATFORM_ID)) =>
  <T>(fn: () => T): T | null => {
    if (!isPlatformBrowser(platform)) return null;
    return fn();
  };
