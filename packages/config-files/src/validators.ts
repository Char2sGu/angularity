import { Injectable } from '@angular/core';

import { ConfigFileValidator } from './validator';

@Injectable({ providedIn: 'root' })
export class NoopValidator implements ConfigFileValidator<object> {
  validate(): void {}
}
