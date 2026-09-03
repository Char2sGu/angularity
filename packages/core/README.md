# @angularity/core

Foundation artifacts and utilities shared across every Angularity package. Its exports are either framework-agnostic or depend only on the kernel of Angular (`@angular/core`, `@angular/common`), so every other Angularity package builds on top of it.

```sh
npm i @angularity/core
```

The package is split into three entry points by dependency weight:

- `@angularity/core` — the framework-agnostic and kernel-only surface.
- `@angularity/core/http` — utilities depending on `@angular/common/http`.
- `@angularity/core/rxjs` — RxJS interoperability and operators.

## API

### `@angularity/core`

Dependency Injection Utilities:

- `provide`
- `provideMulti`
- `injectRef`
- `injectLazy`

Error Handling:

- `Exception`

Type Gymnastics:

- `$type` — a phantom property key for carrying a type on a value without a runtime field.
- `TypeContainer` — re-exported from [`type-container`](https://www.npmjs.com/package/type-container); carries a type as a value.

Miscellaneous:

- `todo`
- `noop`

### `@angularity/core/http`

HTTP Utilities:

- `intercept`
- `provideHttpServerCache`

### `@angularity/core/rxjs`

RxJS Interoperability:

- `ObservableSignal`
- `toObservableSignal`

RxJS Operators:

- `mapToVoid`
- `pickType`
