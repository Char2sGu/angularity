import { Provider, ProviderToken } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { provide, provideMulti } from '@angularity/core';

import { ComponentValueAccessor } from './accessor';
import { ComponentValueAccessorHost } from './accessor-host';

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
