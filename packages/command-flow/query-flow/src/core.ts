import {
  Command,
  COMMAND_META,
  CommandMetadata,
} from '@angularity/command-flow';

export interface QueryMetadata<Result> extends CommandMetadata {
  query: { $generics?: [Result] };
}

export abstract class Query<Result> implements Command {
  abstract [COMMAND_META]: QueryMetadata<Result>;
  static [Symbol.hasInstance](input: object): boolean {
    return input instanceof Command && 'query' in input[COMMAND_META];
  }
}
