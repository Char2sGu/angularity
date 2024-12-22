import { forwardRef, inject, Injectable, PendingTasks } from '@angular/core';

/**
 * Service that schedules a function to be executed after the current
 * execution context is completed.
 *
 * Uses `MicrotaskCommandFlowScheduler` by default.
 *
 * This is usually used to schedule the dispatch of command events.
 */
@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => MicrotaskCommandFlowScheduler),
})
export abstract class CommandFlowScheduler {
  abstract next(fn: () => void): void;
}

/**
 * Implementation of {@link CommandFlowScheduler} that uses
 * `setImmediate` to schedule the next execution.
 * The scheduled function is added to {@link PendingTask} for SSR support.
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
 * Implementation of {@link CommandFlowScheduler} that uses
 * `queueMicrotask` to schedule the next execution.
 * The scheduled function is added to {@link PendingTask} for SSR support.
 */
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
 * Implementation of {@link CommandFlowScheduler} that uses
 * `requestAnimationFrame` to schedule the next execution.
 * Available only in the browser platform.
 * @deprecated prefer {@link SetTimeoutCommandFlowScheduler} for better compatibility.
 */
@Injectable({ providedIn: 'root' })
export class AnimationFrameCommandFlowScheduler
  implements CommandFlowScheduler
{
  next(fn: () => void): void {
    window.requestAnimationFrame(fn);
  }
}
