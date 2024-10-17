import { forwardRef, Injectable } from '@angular/core';
import { Hct, hexFromArgb } from '@material/material-color-utilities';

/**
 * Service responsible for formatting HCT color values into strings, which will
 * be used as theme token values.
 * @remarks This is an abstract service, with a default implementation
 * `HexStringHctFormatter`.
 */
@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => HexStringHctFormatter),
})
export abstract class HctFormatter {
  abstract format(value: Hct): string;
}

/**
 * Implementation of `HctFormatter` that formats HCT color values into hex
 * strings such as `#ffffff`.
 */
@Injectable({
  providedIn: 'root',
})
export class HexStringHctFormatter implements HctFormatter {
  format(value: Hct): string {
    return hexFromArgb(value.toInt());
  }
}
