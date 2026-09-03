# @angularity/theming

A programmatic runtime theming system enabling dynamic theming at runtime or from remote configuration.

```sh
npm i @angularity/{core,theming}
```

## API

### `@angularity/theming`

Top-level:

- `provideTheme`
- `createTheme`
- `scheduleTokenBuild`

Fundamentals:

- `TokenBuilder`
- `ThemeTokenRegistry`

Implementations:

- `VanillaBuilder`
- `InMemoryThemeTokenRegistry`
- `WriteTokensToRootCssVariables`
