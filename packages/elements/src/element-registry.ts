import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';

/**
 * Injection Token for the ECMA `CustomElementRegistry` instance.
 * @remarks Injecting this token on non-browser platforms will result in an error.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
 */
export const ELEMENT_REGISTRY = new InjectionToken<CustomElementRegistry>(
  'ELEMENT_REGISTRY',
  {
    factory: () => {
      const platform = inject(PLATFORM_ID);
      if (!isPlatformBrowser(platform))
        throw new Error(`illegal access of ELEMENT_REGISTRY`);
      return window.customElements;
    },
  },
);
