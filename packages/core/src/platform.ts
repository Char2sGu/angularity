import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

/**
 * Dependency Assembler that assembles a function, which takes another function,
 * invokes it and forwards its return value if within a browser environment, or
 * return `null` otherwise.
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
