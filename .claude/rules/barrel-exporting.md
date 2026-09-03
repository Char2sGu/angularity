---
paths:
  - '**/index.ts'
  - '**/index*.ts'
---

For re-exports in barrel files:

- Use `export *` instead of named exports.
- Everything internal should live in a separate module and not appear in the barrel file.
- Ordering is enforced automatically by `simple-import-sort` — do not hand-order.

A package's entry-point barrel (`src/index.ts`) is its public surface: it is what the docs generator reads and what consumers import, so a symbol appears here only when it is meant to be public.
