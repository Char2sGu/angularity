The `@angularity/theming-material` package offers a collection of `TokenBuilder` implementations for generating a Material Design theme system, utilizing the `material-design-color-utilities` package, based on the infrastructure package `@angularity/theming`.

```sh
npm i @angularity/{core,theming,theming-material}
```

> **warning**
> It is recommended to use async theming whenever possible, since the dependent `material-design-color-utilities` package would bring 60KB of minified JavaScript to the bundle.

## Signature Symbols

The following symbols are the signature symbols of the `@angularity/theming-material` package.
Click on the symbol to see the detailed documentation.

> **note**
> All Angularity symbols are well-documented with JSDoc.

### Exported from `@angularity/theming-material`

Builders:

- `SchemeBuilder`
  {{ JSDoc.description("packages/theming-material/src/public-api.ts#SchemeBuilder") }}
- `SchemeStaticColorBuilder`
  {{ JSDoc.description("packages/theming-material/src/public-api.ts#SchemeStaticColorBuilder") }}
- `TypescaleBuilder`
  {{ JSDoc.description("packages/theming-material/src/public-api.ts#TypescaleBuilder") }}
- `StandardTypescaleBuilder`
  {{ JSDoc.description("packages/theming-material/src/public-api.ts#StandardTypescaleBuilder") }}

Utilities:

- `HctFormatter`
  {{ JSDoc.description("packages/theming-material/src/public-api.ts#HctFormatter") }}
- `ImageSeedColorExtractor`
  {{ JSDoc.description("packages/theming-material/src/public-api.ts#ImageSeedColorExtractor") }}
