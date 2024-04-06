import { forwardRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => AnimationFrameBasedCommandFlowScheduler),
})
export abstract class CommandFlowScheduler {
  abstract next(fn: () => void): void;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationFrameBasedCommandFlowScheduler
  implements CommandFlowScheduler
{
  next(fn: () => void): void {
    requestAnimationFrame(fn);
  }
}
