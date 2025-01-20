import { computed, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Input type for the `HostTransition` directive.
 *
 * - When a non-empty string is provided as input, it will be used
 *   as the view transition name.
 * - When an empty string or `true` is provided as input, a unique string
 *   is generated based on the element's tagname and classes and used
 *   as the view transition name.
 * - When `false` is provided as input, no view transition name
 *   will be set on the element.
 *
 * @see `HostTransition`
 */
export type TransitionInput = string | boolean;

/**
 * Directive for specifying (potentially anonymous)
 * View Transition names for elements.
 *
 * - When a non-empty string is provided as input, it will be used
 *   as the view transition name.
 * - When an empty string or `true` is provided as input, a unique string
 *   is generated based on the element's tagname and classes and used
 *   as the view transition name.
 * - When `false` is provided as input, no view transition name
 *   will be set on the element.
 *
 * By default, a unique string will be generated as the view transition name.
 *
 * @example
 * Set a random view transition name:
 * ```html
 *  <app-news-page hostTransition />
 * ```
 *
 * @example
 * Set a specific view transition name:
 * ```html
 *  \@for (news of news(); track news.id) {
 *    <app-news-card [hostTransition]="'news-' + news.id" />
 *  }
 * ```
 *
 * @example
 * Forward view transition name to child components:
 * ```ts
 *  \@Component({
 *    selector: 'some-shared-component',
 *    template: `<div [hostTransition]="underlineTransition()"></div>`
 *  })
 *  export class SomeSharedComponent {
 *    // When exposing a transition input, it is always recommended to
 *    // disable view transition by default, by providing `false` as
 *    // the initial value.
 *    readonly underlineTransition = input<TransitionInput>(false)
 *  }
 * ```
 * To use a random view transition name for the underline:
 * ```html
 * <some-shared-component underlineTransition />
 * ```
 * To use a specific view transition name for the underline:
 * ```html
 * <some-shared-component underlineTransition="underline" />
 * ```
 * To forward the view transition name from another parent component:
 * ```html
 * <some-shared-component [underlineTransition]="underlineTransition()" />
 * ```
 */
@Directive({
  selector: '[hostTransition]',
  host: { '[style.view-transition-name]': 'viewTransitionName()' },
})
export class HostTransition {
  private static nextId = 0;

  #element: HTMLElement = inject(ElementRef).nativeElement;

  /**
   * - When a non-empty string is provided, it will be used
   *   as the view transition name.
   * - When an empty string or `true` is provided, a unique string
   *   is generated based on the element's tagname and classes and used
   *   as the view transition name.
   * - When `false` is provided, no view transition name
   *   will be set on the element.
   *
   * By default, a unique string will be generated as the view transition name.
   */
  readonly hostTransition = input<TransitionInput>(true);

  protected readonly viewTransitionName = computed(() => {
    const input = this.hostTransition();
    if (input === false) return null;
    if (input === true || input === '') return this.#generateUniqueName();
    return input;
  });

  #generateUniqueName() {
    const tagname = this.#element.tagName.toLowerCase();
    const classes = Array.from(this.#element.classList)
      .join('-')
      .replace(/[^a-z0-9-]/gu, '');
    return `${tagname}--${classes}--${HostTransition.nextId++}`;
  }
}
