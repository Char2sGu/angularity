export const COMMAND_META = Symbol('COMMAND_META');

export interface CommandMetadata {}

export abstract class Command {
  abstract [COMMAND_META]: CommandMetadata;
  private constructor() {}
  static [Symbol.hasInstance](input: object): boolean {
    return input && COMMAND_META in input;
  }
}

export const COMMAND_EVENT_META = Symbol('COMMAND_EVENT_META');

export interface CommandEventMetadata<C extends Command = Command> {
  source: C;
}

export abstract class CommandEvent<C extends Command = Command> {
  abstract [COMMAND_EVENT_META]: CommandEventMetadata<C>;
  private constructor() {}
  static [Symbol.hasInstance](input: object): boolean {
    return input && COMMAND_EVENT_META in input;
  }
}
