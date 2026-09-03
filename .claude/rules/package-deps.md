---
paths:
  - '**/package.json'
---

## Root `package.json`

Manages development-only tooling: linters, formatters, build tools, the monorepo manager, and testing frameworks. Every root dependency goes under `devDependencies` and must never be referenced at runtime by any package.

## Package `package.json`

Manages exactly the dependencies a single package needs at runtime. List them under `dependencies` or `peerDependencies` as appropriate — depend on Angular and other host-provided libraries via `peerDependencies`. A package's `devDependencies` should hold only `@types` packages.
