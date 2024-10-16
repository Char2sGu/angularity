import { Type } from '@angular/core';
import { COMMAND_EVENT_META as META } from '@angularity/command-flow';
import {
  Query,
  QueryActivated,
  QueryErrored,
  QueryInactivated,
  QueryResolved,
} from '@angularity/command-flow/query-flow';
import { createPseudoType } from '@angularity/command-flow/utilities';

export function createPseudoQueryEventTypes<Q extends Query<any>>(
  type: Type<Q>,
): {
  ['Activated']: Type<QueryActivated<Q>>;
  ['Resolved']: Type<QueryResolved<Q>>;
  ['Errored']: Type<QueryErrored<Q>>;
  ['Inactivated']: Type<QueryInactivated<Q>>;
} {
  return {
    ['Activated']: createPseudoType<QueryActivated<Q>>(
      (input) =>
        input instanceof QueryActivated && input[META].source instanceof type,
    ),
    ['Resolved']: createPseudoType<QueryResolved<Q>>(
      (input) =>
        input instanceof QueryResolved && input[META].source instanceof type,
    ),
    ['Errored']: createPseudoType<QueryErrored<Q>>(
      (input) =>
        input instanceof QueryErrored && input[META].source instanceof type,
    ),
    ['Inactivated']: createPseudoType<QueryInactivated<Q>>(
      (input) =>
        input instanceof QueryInactivated && input[META].source instanceof type,
    ),
  };
}
