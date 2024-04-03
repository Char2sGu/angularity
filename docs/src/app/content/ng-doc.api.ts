import { NgDocApi } from '@ng-doc/core';

export default {
  title: 'API References',
  route: 'references',
  scopes: [
    'core',
    'cdk',
    'forms',
    'router',
    'theming',
    'theming-material',
    'endpoints',
    'config-files',
    'fire',
  ].map((name) => ({
    name,
    route: name,
    include: `packages/${name}/**/*.ts`,
  })),
} satisfies NgDocApi;
