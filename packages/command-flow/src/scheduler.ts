import { forwardRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SetImmediateCommandFlowScheduler),
})
export abstract class CommandFlowScheduler {
  abstract next(fn: () => void): void;
}

/**
 * Implementation of {@link CommandFlowScheduler} that uses
 * `setImmediate` to schedule the next execution.
 */
@Injectable({ providedIn: 'root' })
export class SetImmediateCommandFlowScheduler implements CommandFlowScheduler {
  next(fn: () => void): void {
    setImmediate(fn);
  }
}

/**
 * Implementation of {@link CommandFlowScheduler} that uses
 * `requestAnimationFrame` to schedule the next execution.
 * Available only in the browser platform.
 */
@Injectable({ providedIn: 'root' })
export class AnimationFrameBasedCommandFlowScheduler
  implements CommandFlowScheduler
{
  next(fn: () => void): void {
    window.requestAnimationFrame(fn);
  }
}
