import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NamedBreakpointObserver {
  private observer = inject(BreakpointObserver);

  observe<BreakpointName extends string>(
    config: BreakpointConfig<BreakpointName>,
  ): Observable<BreakpointMap<BreakpointName>> {
    return this.observer
      .observe(Object.values(config))
      .pipe(map((state) => this.parseState(config, state)));
  }

  private parseState<BreakpointName extends string>(
    config: BreakpointConfig<BreakpointName>,
    state: BreakpointState,
  ): BreakpointMap<BreakpointName> {
    const map: Partial<BreakpointMap<BreakpointName>> = {};
    for (const k in config) {
      const className = k as BreakpointName;
      const query = config[className];
      map[className] = state.breakpoints[query];
    }
    return map as BreakpointMap<BreakpointName>;
  }
}

export type BreakpointConfig<BreakpointName extends string> = Record<
  BreakpointName,
  string
>;
export type BreakpointMap<BreakpointName extends string> = Record<
  BreakpointName,
  boolean
>;
