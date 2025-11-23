import {
  Directive,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, Subject, SubjectLike, Subscribable } from 'rxjs';

/**
 * A host component of a custom Angular form control.
 *
 * It exposes several RxJS streams for value, change, disabled, and touched events.
 *
 * @see `SimpleComponentValueAccessorHost` for a generic implementation of this
 * interface that simplifies the process for most use cases.
 *
 * @see `ComponentValueAccessor` for adapting this host into a standard
 * Angular `ControlValueAccessor`.
 */
@Injectable()
export abstract class ComponentValueAccessorHost<T = any> {
  /**
   * A stream of value changes from input binding.
   */
  abstract readonly valueInput$: SubjectLike<T>;
  /**
   * A stream of value changes from DOM events.
   */
  abstract readonly valueChange$: Subscribable<T>;
  /**
   * A stream of disabled state changes from input binding.
   */
  abstract readonly disabled$: SubjectLike<boolean>;
  /**
   * A stream of touched events from DOM events.
   */
  abstract readonly touched$: Subscribable<void>;
}

/**
 * A simple implementation of `ComponentValueAccessorHost` that suits most
 * use cases of creating custom Angular form control components.
 *
 * It defines the following input/output bindings:
 * - `value/valueChange`: A two-way binding for `valueInput$/valueChange$`.
 * - `disabled`: An input binding for `disabled$`.
 * - `touched`: An output binding for `touched$`.
 *
 * It also defines the following signals for convenience:
 * - `value`: A signal that emits the current value of the form control.
 * - `disabled`: A signal that emits the current disabled state of the form control.
 */
@Directive()
export class SimpleComponentValueAccessorHost<T>
  implements ComponentValueAccessorHost<T>
{
  // prettier-ignore
  @Input('value') set valueInput(v: T) { this.valueInput$.next(v) }
  readonly valueInput$ = new Subject<T>();

  @Output('valueChange')
  readonly valueChange$ = new EventEmitter<T>();

  // prettier-ignore
  @Input('disabled') set disabledInput(v: boolean) { this.disabled$.next(v) }
  readonly disabled$ = new Subject<boolean>();

  @Output('touched')
  readonly touched$ = new EventEmitter<void>();

  /**
   * A signal that emits the current value of the form control.
   */
  readonly value = toSignal(merge(this.valueInput$, this.valueChange$));

  /**
   * A signal that emits the current disabled state of the form control.
   */
  readonly disabled = toSignal(this.disabled$);
}
