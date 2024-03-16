import { inject, Injectable } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { ComponentValueAccessorHost } from './host';

@Injectable()
export class ComponentValueAccessor implements ControlValueAccessor {
  private host = inject(ComponentValueAccessorHost, { self: true });
  writeValue(value: unknown): void {
    this.host.valueInput$.next(value);
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.host.valueChange$.subscribe({ next: fn });
  }
  registerOnTouched(fn: () => void): void {
    this.host.touched$.subscribe({ next: fn });
  }
  setDisabledState(disabled: boolean): void {
    this.host.disabled$?.next(disabled);
  }
}
