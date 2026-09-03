---
paths:
  - '**/*.{js,jsx,mjs,cjs,ts,tsx}'
---

Split failures into **expected** ("exceptions") and **unexpected** (invariant violations).

- Expected: input validation failure, resource not found, parse failure, network timeout. Represent these with the `Exception` class.
- Unexpected: a null where a value is required, an impossible code path, an unexpected state. These are invariant violations and are not meant to be caught.

## Exceptions

Throw an instance of `Exception` (or a subclass) from [`@angularity/core`](../../packages/core/README.md) on an expected error. Define a subclass in the package that owns the domain when a specific type helps callers branch:

```ts
import { Exception } from '@angularity/core';

export class ConfigFileNotFoundException extends Exception {
  constructor(url: string) {
    super(`config file not found at ${url}`);
  }
}
```

- Document every exception a function may throw with a `@throws` clause.
- Handle or propagate exceptions deliberately; catch by `instanceof` at the boundary that can act on them, and re-throw the rest.

## Invariant Violations

For an unexpected condition, throw to halt execution. Use `invariant` from `@angularity/core`:

```ts
import { invariant } from '@angularity/core';

invariant(user !== null, `unexpected missing user with id ${userId}`);
```

`invariant` narrows the type after the call, so prefer it over a hand-written `if (!x) throw` for guarding impossible states.
