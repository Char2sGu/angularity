import {
  Directive,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, Subject, SubjectLike, Subscribable } from 'rxjs';

@Injectable()
export abstract class ComponentValueAccessorHost<T = any> {
  abstract valueInput$: SubjectLike<T>;
  abstract valueChange$: Subscribable<T>;
  abstract disabled$: SubjectLike<boolean>;
  abstract touched$: Subscribable<void>;
}

@Directive()
export class SimpleComponentValueAccessorHost<T>
  implements ComponentValueAccessorHost<T>
{
  // prettier-ignore
  @Input('value') set valueInput(v: T) { this.valueInput$.next(v) }
  valueInput$ = new Subject<T>();

  @Output('valueChange')
  valueChange$ = new EventEmitter<T>();

  // prettier-ignore
  @Input('disabled') set disabledInput(v: boolean) { this.disabled$.next(v) }
  disabled$ = new Subject<boolean>();

  @Output('touched')
  touched$ = new EventEmitter<void>();

  value = toSignal(merge(this.valueInput$, this.valueChange$));
  disabled = toSignal(this.disabled$);
}
