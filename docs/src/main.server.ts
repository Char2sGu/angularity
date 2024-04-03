/* eslint-disable import/no-default-export */
import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfigForServer } from './app/app.config.server';

const bootstrap = (): Promise<ApplicationRef> =>
  bootstrapApplication(AppComponent, appConfigForServer);

export default bootstrap;
