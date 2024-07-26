import { ProviderToken } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { ThemeBuilder, ThemeBuilderConfigOf } from './builder';

export interface ThemeBuilderComposition {
  name: string;
  builder: ProviderToken<ThemeBuilder<any>>;
  config: unknown;
}

export const withThemeBuilder = <Builder extends ThemeBuilder<any>>(
  name: string,
  builder: ProviderToken<Builder>,
  config:
    | ThemeBuilderConfigOf<Builder>
    | Observable<ThemeBuilderConfigOf<Builder>>,
): Observable<ThemeBuilderComposition> => {
  const config$ = config instanceof Observable ? config : of(config);
  return config$.pipe(map((config) => ({ name, builder, config })));
};
