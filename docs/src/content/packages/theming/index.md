<!-- Generated from the package README by scripts/generate-docs.mjs. Do not edit. -->

A programmatic runtime theming system enabling dynamic theming at runtime or from remote configuration.

```sh
npm i @angularity/{core,theming}
```

### `@angularity/theming`

Top-level:

- `provideTheme`
  {{ JSDoc.description("packages/theming/src/index.ts#provideTheme") }}
- `createTheme`
  {{ JSDoc.description("packages/theming/src/index.ts#createTheme") }}
- `scheduleTokenBuild`
  {{ JSDoc.description("packages/theming/src/index.ts#scheduleTokenBuild") }}

Fundamentals:

- `TokenBuilder`
  {{ JSDoc.description("packages/theming/src/index.ts#TokenBuilder") }}
- `ThemeTokenRegistry`
  {{ JSDoc.description("packages/theming/src/index.ts#ThemeTokenRegistry") }}

Implementations:

- `VanillaBuilder`
  {{ JSDoc.description("packages/theming/src/index.ts#VanillaBuilder") }}
- `InMemoryThemeTokenRegistry`
  {{ JSDoc.description("packages/theming/src/index.ts#InMemoryThemeTokenRegistry") }}
- `WriteTokensToRootCssVariables`
  {{ JSDoc.description("packages/theming/src/index.ts#WriteTokensToRootCssVariables") }}
