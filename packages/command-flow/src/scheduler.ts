import { forwardRef, Injectable } from '@angular/core';

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
 */
@Injectable({ providedIn: 'root' })
export class SetTimeoutCommandFlowScheduler implements CommandFlowScheduler {
  next(fn: () => void): void {
    setTimeout(fn);
  }
}

/**
 * Implementation of {@link CommandFlowScheduler} that uses
 * `requestAnimationFrame` to schedule the next execution.
 * Available only in the browser platform.
 */
@Injectable({ providedIn: 'root' })
export class AnimationFrameCommandFlowScheduler
  implements CommandFlowScheduler
{
  next(fn: () => void): void {
    window.requestAnimationFrame(fn);
  }
}
