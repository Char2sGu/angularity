import { Command, COMMAND_META, CommandMetadata } from '../core';

export interface ProcessMetadata<Result> extends CommandMetadata {
  process: { $generics?: [Result] };
}

export abstract class Process<Result> implements Command {
  abstract [COMMAND_META]: ProcessMetadata<Result>;
  private constructor() {}
  static [Symbol.hasInstance](input: object): boolean {
    return input instanceof Command && 'process' in input[COMMAND_META];
  }
}
