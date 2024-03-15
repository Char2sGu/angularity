import { Injectable } from '@angular/core';
import { SubjectLike, Subscribable } from 'rxjs';

@Injectable()
export abstract class ComponentValueAccessorHost<T = any> {
  abstract valueInput$: SubjectLike<T>;
  abstract valueChange$: Subscribable<T>;
  abstract touched$: Subscribable<void>;
  disabled$?: SubjectLike<boolean>;
}
