export const PACKAGES = [
  'core',
  'core/http',
  'core/rxjs',
  'cdk',
  'cdk/layout',
  'cdk/dialog',
  'cdk/portal',
  '!forms',
  'router',
  'elements',
  'theming',
  'theming-material',
  '!command-flow',
  '!command-flow/process-flow',
  '!command-flow/query-flow',
  '!command-flow/effects',
  '!command-flow/debugger',
  'endpoints',
  '!config-files',
  '!fire',
] as const;

export type Package = (typeof PACKAGES)[number];
