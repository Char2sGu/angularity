<!-- Generated from the package README by scripts/generate-docs.mjs. Do not edit. -->

Foundation artifacts and utilities shared across every Angularity package. Its exports are either framework-agnostic or depend only on the kernel of Angular (`@angular/core`, `@angular/common`), so every other Angularity package builds on top of it.

```sh
npm i @angularity/core
```

The package is split into three entry points by dependency weight:

- `@angularity/core` — the framework-agnostic and kernel-only surface.
- `@angularity/core/http` — utilities depending on `@angular/common/http`.
- `@angularity/core/rxjs` — RxJS interoperability and operators.

### `@angularity/core`

Dependency Injection Utilities:

- `provide`
  {{ JSDoc.description("packages/core/src/index.ts#provide") }}
- `provideMulti`
  {{ JSDoc.description("packages/core/src/index.ts#provideMulti") }}
- `injectRef`
  {{ JSDoc.description("packages/core/src/index.ts#injectRef") }}
- `injectLazy`
  {{ JSDoc.description("packages/core/src/index.ts#injectLazy") }}

Error Handling:

- `Exception`
  {{ JSDoc.description("packages/core/src/index.ts#Exception") }}
- `invariant` — re-export of [tiny-invariant](https://github.com/alexreardon/tiny-invariant); throws when a required condition is false, to guard against invariant violations.

Type Gymnastics:

- `$type` — a phantom property key for carrying a type on a value without a runtime field.
- `TypeContainer` — re-exported from [`type-container`](https://www.npmjs.com/package/type-container); carries a type as a value.

Miscellaneous:

- `todo`
  {{ JSDoc.description("packages/core/src/index.ts#todo") }}
- `noop`
  {{ JSDoc.description("packages/core/src/index.ts#noop") }}

### `@angularity/core/http`

HTTP Utilities:

- `intercept`
  {{ JSDoc.description("packages/core/http/src/index.ts#intercept") }}
- `provideHttpServerCache`
  {{ JSDoc.description("packages/core/http/src/index.ts#provideHttpServerCache") }}

### `@angularity/core/rxjs`

RxJS Interoperability:

- `ObservableSignal`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#ObservableSignal") }}
- `toObservableSignal`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#toObservableSignal") }}

RxJS Operators:

- `mapToVoid`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#mapToVoid") }}
- `pickType`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#pickType") }}
