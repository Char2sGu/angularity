import { forwardRef, inject, Injectable, PendingTasks } from '@angular/core';

/**
 * Interface and provider token for a service that
 * schedules a function to be executed after the current
 * execution context is completed.
 *
 * This can be used to schedule the emission of events.
 *
 * @see `MicrotaskCommandFlowScheduler` for the default implementation.
 */
@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => MicrotaskCommandFlowScheduler),
})
export abstract class CommandFlowScheduler {
  abstract next(fn: () => void): void;
}

/**
 * Implementation of `CommandFlowScheduler` that uses
 * `setTimeout` to schedule the next execution.
 *
 * The scheduled function is added to `PendingTask` for SSR support.
 */
@Injectable({ providedIn: 'root' })
export class SetTimeoutCommandFlowScheduler implements CommandFlowScheduler {
  #tasks = inject(PendingTasks);

  next(fn: () => void): void {
    const done = this.#tasks.add();
    setTimeout(() => {
      fn();
      done();
    });
  }
}

/**
 * Implementation of `CommandFlowScheduler` that uses
 * `queueMicrotask` to schedule the next execution.
 *
 * The scheduled function is added to `PendingTask` for SSR support.
 */
@Injectable({ providedIn: 'root' })
export class MicrotaskCommandFlowScheduler implements CommandFlowScheduler {
  #tasks = inject(PendingTasks);

  next(fn: () => void): void {
    const done = this.#tasks.add();
    queueMicrotask(() => {
      fn();
      done();
    });
  }
}

/**
 * Implementation of `CommandFlowScheduler` that uses
 * `requestAnimationFrame` to schedule the next execution.
 *
 * Available only in the browser platform.
 *
 * @deprecated prefer other implementations for compatibility on all platforms.
 */
@Injectable({ providedIn: 'root' })
export class AnimationFrameCommandFlowScheduler
  implements CommandFlowScheduler
{
  next(fn: () => void): void {
    window.requestAnimationFrame(fn);
  }
}
