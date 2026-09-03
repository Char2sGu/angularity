Name symbols clearly enough that they need no explanatory comment. The more specific a symbol, the longer and more descriptive its name should be.

## Functions & Methods

Use `<verb><subject><modifier>`. Prefer "Returns" for functions that compute a value. Examples: `buildToken`, `buildTokenForScheme`, `loadConfigOrThrowIfMissing`, `resolveIconWithTimeout`.

## Variables & Properties

Use `<is/num?><subject><modifier>`, with the subject first so related names sort together:

```ts
const tokensExisting = ...
const tokensNew = ...
const routesSampled = ...
const routesTotal = ...
```

Optionally prefix for type clarity: `is` for booleans (`isExhaustive`, `isEmpty`), `num` for counts (`numTokens`, `numRetries`).

## Files & Directories

`kebab-case` for both, except a module exporting a single symbol, which may take that symbol's name (`camelCase` or `PascalCase`).

Put the subject first so related files group when sorted: `token-build.ts`, `token-builder.ts` — not `build-token.ts`, `token-builder.ts`.
