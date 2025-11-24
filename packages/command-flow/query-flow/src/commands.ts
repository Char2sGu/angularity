import { Command, COMMAND_META } from '@angularity/command-flow';

import { Query } from './core';

/**
 * `Command` that disposes an in-progress `Query`.
 */
export class DisposeQuery<Q extends Query<any> = Query<unknown>>
  implements Command
{
  [COMMAND_META] = {};

  /**
   * The target in-progress `Query` to dispose.
   */
  target: Q;

  /**
   * @param target The target in-progress `Query` to dispose.
   */
  constructor(target: Q) {
    this.target = target;
  }
}
