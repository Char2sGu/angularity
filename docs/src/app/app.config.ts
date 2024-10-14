import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
} from '@angular/router';
import { provide } from '@angularity/core';
import {
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  NgDocDefaultSearchEngine,
  provideMainPageProcessor,
  provideNgDocApp,
  providePageSkeleton,
  provideSearchEngine,
} from '@ng-doc/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { provideNgDocContext } from '@ng-doc/generated/docs';

import { APP_ROUTES } from './app.routes';
import { AppTitleStrategy } from './app.title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideNgDocContext(),
    provideNgDocApp(),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    provide({ token: TitleStrategy, useClass: AppTitleStrategy }),
  ],
};
