import { NgDocApi } from '@ng-doc/core';

import { PACKAGES } from './packages';

const declarations: NgDocApi = {
  title: 'API References',
  // Specifying route causes bug. https://github.com/ng-doc/ng-doc/issues/236
  // route: 'references',
  scopes: PACKAGES.map((path) =>
    path.startsWith('!')
      ? {
          name: path.replace('!', 'WIP ').replace('/', ' / '),
          route: path.replace('!', '').replace('/', '-'),
          include: `packages/${path.replace('!', '')}/src/**/*.ts`,
        }
      : {
          name: path.replace('/', ' / '),
          route: path.replace('/', '-'),
          include: `packages/${path}/src/**/*.ts`,
        },
  ),
};

export default declarations;
