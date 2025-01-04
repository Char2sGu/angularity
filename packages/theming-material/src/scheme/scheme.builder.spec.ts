/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import {
  createTheme,
  InMemoryThemeTokenRegistry,
  provideTheme,
  scheduleTokenBuild,
  ThemeTokenRegistry,
} from '@angularity/theming';
import { Hct, SchemeVibrant } from '@material/material-color-utilities';

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
          createTheme(
            scheduleTokenBuild('scheme', SchemeBuilder, {
              type: SchemeVibrant,
              source: Hct.fromInt(0x33bdff),
              mode: SchemeMode.Light,
              contrast: SchemeContrastLevel.Standard,
            }),
          ),
        ),
        InMemoryThemeTokenRegistry,
        {
          provide: ThemeTokenRegistry,
          useExisting: InMemoryThemeTokenRegistry,
        },
      ],
    });
    const tokens = TestBed.inject(InMemoryThemeTokenRegistry).getAll();
    expect(tokens['scheme-primary']).toBeDefined();
    expect(tokens['scheme-on-primary']).toBe('#ffffff');
  });
});
