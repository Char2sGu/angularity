import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ColorScheme } from './color-scheme';

/**
 * Service for observing the preferred color scheme
 * specified by the user's operating system.
 */
@Injectable({ providedIn: 'root' })
export class SystemColorSchemeObserver {
  #mediaQueryObserver = inject(BreakpointObserver);

  observe(): Observable<ColorScheme> {
    return this.#mediaQueryObserver
      .observe('(prefers-color-scheme: dark)')
      .pipe(map((e) => (e.matches ? ColorScheme.Dark : ColorScheme.Light)));
  }

  snapshot(): ColorScheme {
    return this.#mediaQueryObserver.isMatched('(prefers-color-scheme: dark)')
      ? ColorScheme.Dark
      : ColorScheme.Light;
  }
}
