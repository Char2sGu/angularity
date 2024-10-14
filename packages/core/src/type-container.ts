/* eslint-disable import/namespace */
import * as upstream from 'type-container';

/**
 * Forwarded symbol from upstream `type-container` for convenience.
 * @see https://github.com/Char2sGu/type-container
 */
export const $type = upstream.$type;

/**
 * Forwarded symbol from upstream `type-container` for convenience.
 * @see https://github.com/Char2sGu/type-container
 */
export type TypeContainer<Type> = upstream.TypeContainer<Type>;

/**
 * Forwarded symbol from upstream `type-container` for convenience.
 * @see https://github.com/Char2sGu/type-container
 */
export type ContainedTypeOf<Container extends TypeContainer<unknown>> =
  upstream.ContainedTypeOf<Container>;
