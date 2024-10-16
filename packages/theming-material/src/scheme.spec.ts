/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { provideTheme, ThemeTokenRegistry } from '@angularity/theming';
import { SchemeVibrant } from '@material/material-color-utilities';
import { withThemeBuilder } from 'packages/theming/src/builder-composition';

import { provide } from '../../core/src/provide';
import { TestingThemeTokenRegistry } from '../../theming/src/token';
import { SchemeBuilder, SchemeContrastLevel, SchemeMode } from './scheme';

describe('SchemeBuilder', () => {
  it('should work', () => {
    TestBed.configureTestingModule({
      providers: [
        provideTheme(
          withThemeBuilder('scheme', SchemeBuilder, {
            type: SchemeVibrant,
            source: '#33bdff',
            mode: SchemeMode.Light,
            contrast: SchemeContrastLevel.Standard,
          }),
        ),
        TestingThemeTokenRegistry,
        provide({
          token: ThemeTokenRegistry,
          useExisting: TestingThemeTokenRegistry,
        }),
      ],
    });
    const tokens = TestBed.inject(TestingThemeTokenRegistry).tokens;
    expect(tokens['scheme-primary']).toBeDefined();
    expect(tokens['scheme-on-primary']).toBe('#ffffff');
  });
});
