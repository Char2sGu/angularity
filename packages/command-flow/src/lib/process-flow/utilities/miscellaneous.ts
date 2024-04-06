import { Type } from '@angular/core';

import { COMMAND_EVENT_META as META } from '../../core';
import { createPseudoType } from '../../utilities';
import { Process } from '../core';
import { ProcessCompleted, ProcessFailed, ProcessStarted } from '../events';

export function createPseudoProcessEventTypes<P extends Process<any>>(
  type: Type<P>,
): {
  ['Started']: Type<ProcessStarted<P>>;
  ['Completed']: Type<ProcessCompleted<P>>;
  ['Failed']: Type<ProcessFailed<P>>;
} {
  return {
    ['Started']: createPseudoType<ProcessStarted<P>>(
      (input) =>
        input instanceof ProcessStarted && input[META].source instanceof type,
    ),
    ['Completed']: createPseudoType<ProcessCompleted<P>>(
      (input) =>
        input instanceof ProcessCompleted && input[META].source instanceof type,
    ),
    ['Failed']: createPseudoType<ProcessFailed<P>>(
      (input) =>
        input instanceof ProcessFailed && input[META].source instanceof type,
    ),
  };
}
