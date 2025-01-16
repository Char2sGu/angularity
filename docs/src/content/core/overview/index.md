The `@angularity/core` package exports concepts and utilities that are framework-agnostic or depends on only the the kernel part of Angular (`@angular/{core,common}`), and are depended by all the other Angularity packages.

```sh
npm i @angularity/core
```

## Signature Symbols

The following symbols are the signature symbols of the `@angularity/core` package.
Click on the symbol to see the detailed documentation.

> **note**
> All Angularity symbols are well-documented with JSDoc.

### Exported from `@angularity/core`

Dependency Injection Utilities:

- `provide`
- `provideMulti`
- `injectRef`

Error Handling:

- `Exception`

Type Gymnastics:

- `$type`
- `TypeContainer`

### Exported from `@angularity/core/http`

HTTP Utilities:

- `intercept`
- `provideHttpServerCache`

### Exported from `@angularity/core/rxjs`

RxJS Operators:

- `mapToVoid`
- `pickType`
