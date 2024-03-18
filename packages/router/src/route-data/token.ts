const TYPE = Symbol('TYPE');

export class RouteDataToken<T> {
  [TYPE]?: T;
  readonly key = Symbol(this.description);
  constructor(private description: string) {}
}
