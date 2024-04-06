import { Command, COMMAND_META } from '../core';
import { Query } from './core';

export class DisposeQuery<Q extends Query<any> = Query<unknown>>
  implements Command
{
  [COMMAND_META] = {};
  target: Q;
  constructor(target: Q) {
    this.target = target;
  }
}
