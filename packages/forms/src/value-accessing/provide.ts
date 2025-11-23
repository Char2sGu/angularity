import { Provider, ProviderToken } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { provide, provideMulti } from '@angularity/core';

import { ComponentValueAccessor } from './accessor';
import { ComponentValueAccessorHost } from './accessor-host';

/**
 * Provides the essential providers for a custom Angular form control component
 * that implements `ComponentValueAccessorHost`
 *
 * @param host The provider token to the `ComponentValueAccessorHost` component
 *
 * @example
 * ```ts
 * \@Component({
 *   providers: [provideComponentValueAccessor(MyFormControlComponent)],
 * })
 * class MyFormControlComponent implements ComponentValueAccessorHost {
 *   // ...
 * }
 * ```
 */
export function provideComponentValueAccessor(
  host: ProviderToken<ComponentValueAccessorHost>,
): Provider[] {
  return [
    provide({
      token: ComponentValueAccessorHost,
      useExisting: host,
    }),
    provideMulti({
      token: NG_VALUE_ACCESSOR,
      useClass: ComponentValueAccessor,
    }),
  ];
}
