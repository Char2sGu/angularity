import {
  Command,
  COMMAND_META,
  CommandMetadata,
} from '@angularity/command-flow';

/**
 * Metadata of a `Process`.
 */
export interface ProcessMetadata<Result> extends CommandMetadata {
  process: { $generics?: [Result] };
}

/**
 * Interface and provider token for
 * a special kind of `Command` that is associated with an async process and
 * leads to emission of the events below:
 * - `ProcessStarted`
 * - `ProcessCompleted`
 * - `ProcessFailed`
 *
 * @remarks
 * This class:
 * - cannot be extended
 * - can be used as an interface
 * - can be used as a provider token
 * - supports the `instanceof` operator and returns `true` for any object
 *   that has a `COMMAND_META` property that matches `ProcessMetadata`
 *
 * @see `createProcessType` for a factory function that creates `Process` types.
 */
export abstract class Process<Result> implements Command {
  abstract [COMMAND_META]: ProcessMetadata<Result>;
  private constructor() {}
  static [Symbol.hasInstance](input: object): boolean {
    return input instanceof Command && 'process' in input[COMMAND_META];
  }
}
