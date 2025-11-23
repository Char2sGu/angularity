import { inject, Injectable } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { ComponentValueAccessorHost } from './accessor-host';

/**
 * An adapter that adapts a `ComponentValueAccessorHost` into a `ControlValueAccessor`.
 * It uses the `ComponentValueAccessorHost` provided at the `self` level to implement
 * the `ControlValueAccessor` interface.
 */
@Injectable()
export class ComponentValueAccessor implements ControlValueAccessor {
  protected readonly host = inject(ComponentValueAccessorHost, { self: true });
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
    this.host.disabled$.next(disabled);
  }
}
