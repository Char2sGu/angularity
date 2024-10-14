Type Containers are widely used in Angularity for advanced type gymnastics.

A Type Container is an empty object but carries specific TypeScript type information, enabling infinite possibilities of advanced type inferences and manipulations.

The `$type` function produces a type container:

```ts
const $payload = $type<{ id: string }>();
// The type of `$payload` is `TypeContainer<{ id: string }>`.
```

> Conventionally, type container variables are prefixed with a `$` symbol.

To extract the type information from a type container, use the `ContainedTypeOf` type:

```ts
const $payload = $type<{ id: string }>();
type Payload = ContainedTypeOf<typeof $payload>;
// `Payload` is `{ id: string }`.
```

A typical use case of type containers is to infer generics from a mix of tangible values and type containers:

```ts
declare function createActionFactory<N extends string, P extends object>(
  name: N,
  $payload: TypeContainer<P>,
): ActionFactory<N, P>;
```

```ts
createActionFactory('FetchBook', $type<{ id: string }>());
// generic N is inferred as "FetchBook"
// generic P is inferred as { id: string }
```

In comparison, without type containers, it is not possible to leverage the power of TypeScript generic inference, so all the generics have to be manually supplied:

```ts
declare function createActionFactory<N extends string, P extends object>(
  name: string,
): ActionFactory<N, P>;
```

```ts
createActionFactory<'FetchBook', { id: string }>('FetchBook');
```

Note that the string literal `'FetchBook'` is repeated twice because of the lack of generic inference. When the generics are complicated, it could be impossible to manually supply all the generic, and that's when Type Containers come handy.
