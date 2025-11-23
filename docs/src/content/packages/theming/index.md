The `@angularity/theming` package offers a programmatic runtime theming system that allows dynamic theming at the runtime or based on remote configurations.

```sh
npm i @angularity/{core,theming}
```

### Exported from `@angularity/theming`

Top-level:

- `provideTheme`
  {{ JSDoc.description("packages/theming/src/public-api.ts#provideTheme") }}
- `createTheme`
  {{ JSDoc.description("packages/theming/src/public-api.ts#createTheme") }}
- `scheduleTokenBuild`
  {{ JSDoc.description("packages/theming/src/public-api.ts#scheduleTokenBuild") }}

Fundamentals:

- `TokenBuilder`
  {{ JSDoc.description("packages/theming/src/public-api.ts#TokenBuilder") }}
- `ThemeTokenRegistry`
  {{ JSDoc.description("packages/theming/src/public-api.ts#ThemeTokenRegistry") }}

Implementations:

- `VanillaBuilder`
  {{ JSDoc.description("packages/theming/src/public-api.ts#VanillaBuilder") }}
- `InMemoryThemeTokenRegistry`
  {{ JSDoc.description("packages/theming/src/public-api.ts#InMemoryThemeTokenRegistry") }}
- `WriteTokensToRootCssVariables`
  {{ JSDoc.description("packages/theming/src/public-api.ts#WriteTokensToRootCssVariables") }}
