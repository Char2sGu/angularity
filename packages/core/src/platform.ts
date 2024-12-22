import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

/**
 * Accepts a `PLATFORM_ID` value and returns a boolean value indicating whether
 * the current platform is expected. `isPlatformBrowser` and `isPlatformServer`
 * are all valid `PlatformSelector` functions.
 */
export interface PlatformSelector {
  (platformId: object): boolean;
}

/**
 * Create a function that accepts another function.
 * If the current platform matches the given `PlatformSelector`, the accepted
 * function is invoked and its return value is forwarded.
 * Otherwise, `null` is returned.
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
