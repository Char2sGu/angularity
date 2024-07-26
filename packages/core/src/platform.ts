import { inject, PLATFORM_ID } from '@angular/core';

export const useBrowserOnly =
  (platform = inject(PLATFORM_ID)) =>
  <T>(fn: () => T): T | null => {
    if (platform !== 'browser') return null;
    return fn();
  };
