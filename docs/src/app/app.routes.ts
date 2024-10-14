import { Routes } from '@angular/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NG_DOC_ROUTING } from '@ng-doc/generated/docs';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'api',
  },
  {
    path: '',
    children: NG_DOC_ROUTING,
  },
  {
    path: '**',
    redirectTo: 'api',
  },
];
