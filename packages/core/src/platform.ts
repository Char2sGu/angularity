import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const useBrowserOnly =
  (platform = inject(PLATFORM_ID)) =>
  /**
   * Invokes the given function only if the current platform is browser.
   * @returns The forwarded return value of the given function or `null` if
   * the current platform is not browser.
   */
  <T>(fn: () => T): T | null => {
    if (!isPlatformBrowser(platform)) return null;
    return fn();
  };
