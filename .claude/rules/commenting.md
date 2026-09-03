---
paths:
  - '**/*.{js,jsx,mjs,cjs,ts,tsx}'
---

## `//` Comments

Avoid `//` comments. Reach for one only when:

- A reasonable future contributor making a normal-looking edit would silently break the code without it.
- There is a load-bearing invariant the type system or schema does not enforce.
- There is external context a reader cannot derive from the repo (an incident, a compliance constraint, a vendor quirk, a design rationale).

`//` comments should:

- Focus on the "why" rather than the "what".
- Scope to the target symbol: do not discuss details about other symbols.
- Self-contain and respect documentation hierarchy: do not link to documentation files like design documents or README.md.

In particular, avoid comments that:

- simply describe a fact that is obvious from adjacent code.
- depict how the symbol is consumed by or interacts with other symbols.
- divide a single file into multiple regions.

## JSDoc

Author JSDoc for all exported functions, classes, interfaces, and types.

### Functions & Methods

- Start the description with a verb stating what it does — "Builds the theme tokens for the given scheme.", "Returns whether the config file has been cached." Add detail in later paragraphs separated by a blank line.
- `@param` uses a lowercase short phrase; no leading `-`; do not start with "the"/"a". Omit it entirely when the name and type already make the purpose clear (`schemeId: string`).
- `@returns` describes the meaning, not the type, as a lowercase short phrase. Omit it when the signature or purpose already conveys it.
- `@throws {ExceptionType} if/when <condition>, or if/when <condition>` — document only expected `Exception`s a caller should handle, not any `Error`s.

### Classes & Interfaces

Start with a noun phrase — "Builder that compiles design tokens into CSS variables.", "Registry of theme tokens." Do not open with "The", "Represents", "A". For an implementation, "Implementation of {@link Interface} that ..." is fine.

### Length

A description is usually one sentence. Add a second only for what the signature cannot convey — a side effect, an ordering guarantee, or a special-case short-circuit. When in doubt, cut it.

Do not include details that:

- can be inferred from the code (enum values, return types, a parameter clear from its name).
- describe how the value is produced or where it comes from.
- describe how, where, or by whom the symbol is used.
- restate a `@throws` clause or the signature.
- explain a design decision or rationale — that belongs in the relevant doc.

## Maintenance

- If a comment severely deviates from the current guidelines, rewrite it when the target symbol is updated.
- If a comment is found to be stale during a session, update or rewrite it right away.
