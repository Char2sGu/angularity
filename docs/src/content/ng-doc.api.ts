import { NgDocApi } from '@ng-doc/core';

export default {
  title: 'API References',
  route: 'references',
  scopes: [
    'core',
    'core/rxjs',
    'cdk',
    'cdk/layout',
    'cdk/dialog',
    'forms',
    'router',
    'elements',
    'theming',
    'theming-material',
    'command-flow',
    'command-flow/process-flow',
    'command-flow/query-flow',
    'command-flow/effects',
    'command-flow/debugger',
    'endpoints',
    'config-files',
    'fire',
  ].map((path) => ({
    name: path.replace('/', ' / '),
    route: path.replace('/', '-'),
    include: `packages/${path}/src/**/*.ts`,
  })),
} satisfies NgDocApi;
