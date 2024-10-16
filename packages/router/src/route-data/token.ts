const TYPE = Symbol('TYPE');

/**
 * Token that declares a type of route data.
 *
 * @remarks The generic type parameter is the key to guaranteed type-safety,
 * and should always be defined.
 *
 * @example
 *  ```ts
 *  export const NAV_STATUS = new RouteDataToken<NavStatus>("NAV_STATUS");
 *  ```
 *
 * @see `defineRouteData`
 */
export class RouteDataToken<T> {
  [TYPE]?: T;

  /**
   * Property key that can be used to store and access the corresponding value of
   * this token from an route's data object.
   */
  readonly key = Symbol(this.description);

  /**
   * @param description Descriptive text for debugging purposes.
   */
  constructor(private description: string) {}
}
