---
paths:
  - '**/*.{ts,mts,cts,js,mjs,cjs}'
  - '**/README.md'
  - '**/CLAUDE.md'
  - '**/.claude/rules/**/*.md'
---

Cross-cutting principles:

- `CLAUDE.md` must always `@`-include `README.md`.
- A document must not reference any higher-level document.
- Keep facts at the place nearest their source and expose them at a higher-level document via a link.
- Propose a fix when documentation and code disagree, or when a link is broken.
- Use Title Case for headings; prefer "&" over "and".

Root docs:

- `/README.md` exposes only visibility:
  - It is an index/router: a short description and a link for every component in the repository — packages, special directories, the docs site, etc.
  - It exposes just enough for the reader to know when to read more. Additional detail is mental burden for humans, context for agents, and a drift risk as components change.
- `/.claude/rules/*.md` specifies global rules:
  - It targets an action or a system; its name is a verb for an action, a noun for a system.
  - It targets the whole repository or a file pattern, never a specific directory.
  - It exposes no codebase knowledge — the reader already knows the repository from `/README.md`. It covers only "how" to work with specific files, tools, or packages.
  - It prefers bullet points over prose.
- `/CLAUDE.md` stays empty except for the `@`-includes.
- `/docs` is the documentation **site** (ng-doc), not a place to author prose by hand — see "Consumer docs & the site" below.

Package docs:

- `./README.md` is the single source of truth for a package's consumer-facing documentation:
  - It is what npmjs.com and GitHub render, so it stays clean Markdown — no ng-doc template syntax (`{{ … }}`).
  - It provides the high-level overview, install, key concepts, and usage of the package's public surface. It may include a mermaid diagram.
  - It lists the exported symbols under editorial group headings in an `## API` section — see "Consumer docs & the site".
- `./CLAUDE.md` explains the package for maintainers:
  - It covers internal design and mechanism when the complexity warrants it.
  - It specifies any additional rules for working with the package.

Directory docs:

- `./README.md` provides additional context for consuming this directory.
- `./CLAUDE.md` provides additional rules for working within this directory.

Consumer docs & the site:

- Per-symbol API descriptions live in **JSDoc** on the exported symbol — nearest the code — never duplicated into prose.
- The ng-doc site page `docs/src/content/packages/<pkg>/index.md` is **generated** from the package `README.md` by `scripts/generate-docs.mjs` (run `npm run docs:generate`). Never edit a generated `index.md` by hand — edit the source `README.md` and regenerate.
- In a README `## API` section, each entry point is an `### @angularity/<subpath>` heading; under it, symbols are grouped by editorial headings. A bare `` - `symbol` `` bullet has its JSDoc description injected on the site; a ``- `symbol` — inline note`` bullet is emitted verbatim (use it for symbols without usable JSDoc).
- A new package or entry point gets a page only once its name is added to `PACKAGES` in `docs/src/content/packages.ts` — `packageIndexOf` (used by every `ng-doc.page.ts`) is typed against that list, so an unregistered name fails to compile.
