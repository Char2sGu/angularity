/**
 * Symbol used to store `CommandMetadata` on a `Command`.
 */
export const COMMAND_META = Symbol('COMMAND_META');

/**
 * Metadata of a `Command`.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommandMetadata {}

/**
 * Interface and provider token for
 * event objects that can be dispatched to a `CommandBus`,
 * which usually initiates some side effects and leads to
 * emission of `CommandEvent`s.
 *
 * @remarks
 * This class:
 * - cannot be extended
 * - can be used as an interface
 * - can be used as a provider token
 * - supports the `instanceof` operator and returns `true` for any object
 *   that has a `COMMAND_META` property
 *
 * @see `createCommandType` for a factory function that creates `Command` types.
 */
export abstract class Command {
  abstract [COMMAND_META]: CommandMetadata;
  private constructor() {}
  static [Symbol.hasInstance](input: object): boolean {
    return input && COMMAND_META in input;
  }
}

/**
 * Symbol used to store `CommandEventMetadata` on a `CommandEvent`.
 */
export const COMMAND_EVENT_META = Symbol('COMMAND_EVENT_META');

/**
 * Metadata of a `CommandEvent`.
 */
export interface CommandEventMetadata<C extends Command = Command> {
  /**
   * The `Command` that led to the emission of this event.
   */
  source: C;
}

/**
 * Interface and provider token for
 * event objects that can be published to a `CommandEventBus`,
 * which could potentially lead to emission of new `Command`s.
 *
 * @remarks
 * This class:
 * - cannot be extended
 * - can be used as an interface
 * - can be used as a provider token
 * - supports the `instanceof` operator and returns `true` for any object
 *   that has a `COMMAND_EVENT_META` property
 *
 * @see `createCommandEventType` for a factory function that creates `CommandEvent` types.
 */
export abstract class CommandEvent<C extends Command = Command> {
  abstract [COMMAND_EVENT_META]: CommandEventMetadata<C>;
  private constructor() {}
  static [Symbol.hasInstance](input: object): boolean {
    return input && COMMAND_EVENT_META in input;
  }
}
