/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { provideTheme, ThemeTokenRegistry } from '@angularity/theming';

import { provide } from '../../core/src/provide';
import { TestingThemeTokenRegistry } from '../../theming/src/token';
import { SchemeBuilder, SchemeMode, SchemeVariant } from './scheme';

describe('SchemeBuilder', () => {
  it('should work', () => {
    TestBed.configureTestingModule({
      providers: [
        provideTheme(
          { schemes: SchemeBuilder },
          {
            schemes: {
              primary: '#33bdff',
              mode: SchemeMode.Light,
              variant: SchemeVariant.CONTENT,
            },
          },
        ),
        TestingThemeTokenRegistry,
        provide({
          token: ThemeTokenRegistry,
          useExisting: TestingThemeTokenRegistry,
        }),
      ],
    });
    const tokens = TestBed.inject(TestingThemeTokenRegistry).tokens;
    expect(tokens['schemes-primary']).toBeDefined();
    expect(tokens['schemes-on-primary']).toBe('#ffffff');
  });
});
