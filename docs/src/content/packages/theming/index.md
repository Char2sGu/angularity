The `@angularity/theming` package offers a programmatic runtime theming system that allows dynamic theming at the runtime or based on remote configurations.

```sh
npm i @angularity/{core,theming}
```

## Signature Symbols

The following symbols are the signature symbols of the `@angularity/theming` package.
Click on the symbol to see the detailed documentation.

> **note**
> All Angularity symbols are well-documented with JSDoc.

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
