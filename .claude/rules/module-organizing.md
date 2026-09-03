## Principles

- Group modules by domain/concept, not by type. A small package may keep its files flat at `src/`; introduce a subfolder once a concept grows several files.

  ```
  packages/theming/src/
    ├── builders/          # vanilla.ts, ...
    └── token-builder.ts
  ```

- Never create folders that group by type — no `utilities/`, `helpers/`, `utils/`, `services/`.
- Prefer flat over deeply nested. Use `.` in a filename to denote a variant or sub-concept instead of nesting a folder, subject first so related files sort together:

  ```
  packages/config-files/src/
    ├── loader.ts                     # Loader — general
    ├── loader.http.ts                # Loader — HTTP variant
    └── loader.http.server-cache.ts   # Loader — HTTP variant — server cache
  ```

- A common kind suffix reads as the final dotted segment: `scheme-static-color.builder.ts`, `hct-formatter.service.ts`.

## Visibility

- A module is public only when it is re-exported from the package's entry-point barrel (`src/index.ts`); anything not re-exported is internal to the package.
- Shared, business-independent, framework-independent building blocks belong in `@angularity/core`, not copied per package.
