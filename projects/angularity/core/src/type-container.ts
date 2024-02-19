export const type = <Type>(): TypeContainer<Type> => ({});

export interface TypeContainer<Type> {
  type?: Type;
}

export type ContainedType<Container extends TypeContainer<unknown>> =
  Container extends TypeContainer<infer Type> ? Type : never;
