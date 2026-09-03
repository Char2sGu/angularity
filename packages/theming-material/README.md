# @angularity/theming-material

A collection of `TokenBuilder` implementations that generate a Material Design theme system, built on the `@angularity/theming` infrastructure and the `material-design-color-utilities` package.

```sh
npm i @angularity/{core,theming,theming-material}
```

> **warning**
> Prefer async theming whenever possible: the dependent `material-design-color-utilities` package adds roughly 60KB of minified JavaScript to the bundle.

## API

### `@angularity/theming-material`

Builders:

- `SchemeBuilder`
- `SchemeStaticColorBuilder`
- `TypescaleBuilder`
- `StandardTypescaleBuilder`

Utilities:

- `HctFormatter`
- `ImageSeedColorExtractor`
