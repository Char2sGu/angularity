/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { provideTheme, ThemeTokenRegistry } from '@angularity/theming';
import { Hct, SchemeVibrant } from '@material/material-color-utilities';
import { withThemeBuilder } from 'packages/theming/src/builder-composition';

import { provide } from '../../../core/src/provide';
import { InMemoryThemeTokenRegistry } from '../../../theming/src/token';
import {
  SchemeBuilder,
  SchemeContrastLevel,
  SchemeMode,
} from './scheme.builder';

describe('SchemeBuilder', () => {
  it('should work', () => {
    TestBed.configureTestingModule({
      providers: [
        provideTheme(
          withThemeBuilder('scheme', SchemeBuilder, {
            type: SchemeVibrant,
            source: Hct.fromInt(0x33bdff),
            mode: SchemeMode.Light,
            contrast: SchemeContrastLevel.Standard,
          }),
        ),
        InMemoryThemeTokenRegistry,
        provide({
          token: ThemeTokenRegistry,
          useExisting: InMemoryThemeTokenRegistry,
        }),
      ],
    });
    const tokens = TestBed.inject(InMemoryThemeTokenRegistry).tokens;
    expect(tokens['scheme-primary']).toBeDefined();
    expect(tokens['scheme-on-primary']).toBe('#ffffff');
  });
});
