import {
  Command,
  COMMAND_META,
  CommandMetadata,
} from '@angularity/command-flow';

/**
 * Metadata for a `Query`.
 */
export interface QueryMetadata<Result> extends CommandMetadata {
  query: { $generics?: [Result] };
}

/**
 * Interface and provider token for
 * a special kind of `Command` that initiates a reactive observation of data and
 * leads to emission of the following events:
 * - `QueryActivated`
 * - `QueryResolved`
 * - `QueryErrored`
 * - `QueryInactivated`
 *
 * @remarks
 * This class:
 * - cannot be extended
 * - cannot be instantiated
 * - can be used as an interface
 * - can be used as a provider token
 * - supports the `instanceof` operator and returns `true` for any object
 *   that has a `COMMAND_META` property that matches `QueryMetadata`
 *
 * @see `createQueryType` for a factory function that creates `Query` types.
 */
export abstract class Query<Result> implements Command {
  abstract [COMMAND_META]: QueryMetadata<Result>;
  static [Symbol.hasInstance](input: object): boolean {
    return input instanceof Command && 'query' in input[COMMAND_META];
  }
}
