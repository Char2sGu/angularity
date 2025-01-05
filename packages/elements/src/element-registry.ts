import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';

/**
 * Injection Token for the ECMA `CustomElementRegistry` instance, or
 * `null` if the current platform is not browser.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
 */
export const ELEMENT_REGISTRY =
  new InjectionToken<CustomElementRegistry | null>('ELEMENT_REGISTRY', {
    factory: () => {
      const platform = inject(PLATFORM_ID);
      if (!isPlatformBrowser(platform)) return null;
      return window.customElements;
    },
  });
