import { Injectable } from '@angular/core';

import { ConfigFileValidator } from './validator';

/**
 * Implementation of `ConfigFileValidator` that does nothing,
 * i.e. the object is always considered valid.
 * @remarks The schema object is not used.
 */
@Injectable({ providedIn: 'root' })
export class NoopValidator implements ConfigFileValidator<object> {
  validate(): void {}
}
