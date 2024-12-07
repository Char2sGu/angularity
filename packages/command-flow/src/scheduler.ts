import { forwardRef, inject, Injectable, PendingTasks } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SetTimeoutCommandFlowScheduler),
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
