import { effect, inject, linkedSignal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith } from 'rxjs';

export interface LinkedQueryParamOptions<T> {
  /**
   * Initial value of the linked signal,
   * used when the query parameter is not present in the URL.
   */
  initialValue: T;
  /**
   * Transform the query parameter value as a string into
   * the desired type.
   * @param v string value of the query parameter
   * @returns transformed value
   */
  transform: (v: string) => T;
}

/**
 * Create a linked signal associated with a query parameter.
 * @param name name of the query parameter in the URL
 * @param options configuration for the linked signal
 * @example
 * ```ts
 * export class MyComponent {
 *   readonly filter = linkedQueryParam('filter', { initialValue: 'all', transform: (v) => this.transformFilter(v) });
 *   onFilterChange(newFilter: string): void {
 *     this.filter.set(newFilter);
 *   }
 * }
 * ```
 */
export function linkedQueryParam(
  name: string,
): WritableSignal<string | undefined>;
export function linkedQueryParam<T>(
  name: string,
  options: LinkedQueryParamOptions<T>,
): WritableSignal<T>;
export function linkedQueryParam<T>(
  name: string,
  options?: LinkedQueryParamOptions<T>,
): WritableSignal<T> {
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  const value$ = route.queryParams.pipe(
    map((params) => params[name] as string | undefined),
    map((v) => {
      if (v === undefined) return options?.initialValue;
      return options?.transform ? options.transform(v) : (v as string);
    }),
    startWith(options?.initialValue),
  );
  const source = toSignal(value$, { requireSync: true });
  const linked = linkedSignal(source) as WritableSignal<T>;
  effect(() => {
    const isNewValueWritten = source() !== linked();
    if (!isNewValueWritten) return;
    const value = linked();
    router.navigate(['.'], {
      relativeTo: route,
      queryParams: { [name]: value },
      queryParamsHandling: 'merge',
    });
  });
  return linked;
}
