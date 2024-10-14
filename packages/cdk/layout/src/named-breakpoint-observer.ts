import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

/**
 * Higher level abstraction of `BreakpointObserver` from Angular CDK, allowing
 * observing multiple named breakpoints.
 */
@Injectable({ providedIn: 'root' })
export class NamedBreakpointObserver {
  protected observer = inject(BreakpointObserver);

  /**
   * Observes the given breakpoints and returns an observable map of their
   * states.
   *
   * @param config a map of breakpoint names and their corresponding queries
   * @returns an `Observable` emitting the current state of each of the
   * configured breakpoints.
   *
   * @remarks The return type carries type information about the breakpoint
   * names, allowing for type-safe access to the breakpoint states.
   *
   * @example
   *  ```ts
   *  observer.observe({
   *    small: '(max-width: 599px)',
   *    medium: '(min-width: 600px) and (max-width: 959px)',
   *    large: '(min-width: 960px)',
   *  }).subscribe((state) => {
   *    state.small;
   *    state.medium;
   *    state.large;
   *  })
   *  ```
   */
  observe<BreakpointName extends string>(
    config: BreakpointConfig<BreakpointName>,
  ): Observable<BreakpointMap<BreakpointName>> {
    return this.observer
      .observe(Object.values(config))
      .pipe(map((state) => this.parseState(config, state)));
  }

  protected parseState<BreakpointName extends string>(
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

/**
 * A map of breakpoint names to their corresponding media queries.
 * @see `NamedBreakpointObserver`
 */
export type BreakpointConfig<BreakpointName extends string> = Record<
  BreakpointName,
  string
>;

/**
 * A map of breakpoint names to whether they are currently active.
 * @see `NamedBreakpointObserver`
 */
export type BreakpointMap<BreakpointName extends string> = Record<
  BreakpointName,
  boolean
>;
