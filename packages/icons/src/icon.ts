import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  input,
  numberAttribute,
} from '@angular/core';
import {
  pendingUntilEvent,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { usePlatformExec } from '@angularity/core';
import { map, switchMap } from 'rxjs';

import { processIconSvg } from './icon-processing';
import { Icons } from './icons';

/**
 * Icon size in pixels.
 * Used when `AglIcon.size` is not specified.
 * @default 24
 */
export const ICON_SIZE = new InjectionToken<number>('ICON_SIZE', {
  factory: () => 24,
});

/**
 * Display a SVG icon with a configurable size and color following `currentColor`.
 *
 * @example
 * ```html
 * <agl-icon icon="iArrow" size="32" />
 * <agl-icon icon="<svg>...</svg>" />
 * ```
 */
@Component({
  selector: 'agl-icon',
  templateUrl: './icon.html',
  styleUrls: ['./icon.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--icon-size.px]': 'size()',
    '[innerHTML]': 'content()',
  },
})
export class AglIcon {
  #sizeDefault = inject(ICON_SIZE);
  #registry = inject(Icons, { optional: true }) ?? {};
  #sanitizer = inject(DomSanitizer, { optional: true })!;
  #onBrowser = usePlatformExec(isPlatformBrowser);

  /**
   * The name of the icon in the icon registry `Icons` of the current injector,
   * or unprocessed arbitrary raw SVG content.
   */
  readonly icon = input.required<string>();

  /**
   * The size of the icon in pixels.
   * When not specified, use the value from the `ICON_SIZE` token.
   */
  readonly size = input(this.#sizeDefault, { transform: numberAttribute });

  // Due to Angular build pipeline issues, the "text" loader does not
  // load the text content of the svg file on the server and instead
  // load the url of the svg file, so we have to temporarily skip the
  // processing of the svg file on the server.
  protected readonly content = toSignal(
    toObservable(this.icon).pipe(
      map((input) => {
        const isSvg =
          input.trim().startsWith('<svg') || input.trim().startsWith('/@fs/'); // TODO: remove when fixed
        if (isSvg) return input;
        const icon = this.#registry[input];
        if (!icon) throw new Error(`Icon "${input}" not found`);
        return icon;
      }),
      switchMap((svg) => this.#onBrowser?.(() => processIconSvg(svg)) ?? ['']), // TODO: remove when fixed
      map((svg) => this.#sanitizer?.bypassSecurityTrustHtml(svg) ?? svg),
      pendingUntilEvent(),
    ),
  );
}
