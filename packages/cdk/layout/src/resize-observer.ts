import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service that provides a stream of ResizeObserverEntry arrays for the given element.
 * Uses the native ResizeObserver API.
 */
@Injectable({ providedIn: 'root' })
export class ResizeObserver {
  /**
   * Observes the given element and returns a stream of ResizeObserverEntry arrays.
   */
  observe(element: HTMLElement): Observable<ResizeObserverEntry[]> {
    return new Observable((observer) => {
      const instance = new window.ResizeObserver((e) => observer.next(e));
      instance.observe(element);
      return () => instance.disconnect();
    });
  }
}
