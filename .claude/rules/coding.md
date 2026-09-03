---
paths:
  - '**/*.{js,jsx,mjs,cjs,ts,tsx}'
---

## Baseline

- Avoid the `any` type and type casting in ordinary code; type-level / framework code (generic gymnastics, DI plumbing) may need them.
- Handle edge cases, error conditions, and intermediate states: write robust code.

## Function Arguments

Arguments follow one of these shapes:

1. No arguments.
2. Named arguments via a single object parameter.
3. Up to 3 positional arguments.
4. Up to 2 positional arguments followed by a single object parameter.

Use positional arguments only for required parameters essential to the operation; use a named-argument object for optional or numerous parameters. When unsure, prefer the named-argument object.

**No boolean positionals** — they obscure meaning at the call site. Instead, pass a named argument when the flag is incidental, or split into two descriptively-named functions when it is a core aspect (`provideThemeEager` / `provideThemeLazy`). Class constructors are exempt and may take many positional arguments.

## Control Flow

- **Early return** — handle validations and edge cases first, keeping the main logic shallow.
- **Early throw** — on an unexpected condition, throw rather than silently returning or proceeding.
- **Single level of abstraction** — every statement in a function operates at the same conceptual level.
- **Exhaustive branching** — when switching over a finite set, handle every case and throw on the impossible branch so a new case surfaces as a failure rather than silently falling through.

## Classes

Order members: private static properties, public static properties, public static methods, private static methods, private instance properties, public instance properties, constructor, public instance methods, private instance methods.

Prefer the ES2022 `#` syntax for private members. For constructor- or field-injected properties, keep the `private readonly` keyword form so the property is declared and initialized in one step (`private readonly registry = inject(ThemeTokenRegistry)`).

## Exports

- Prefer named exports over default exports.
- Export symbols right at their declaration.

## Self-Documenting Code

Prefer additional well-named variables and functions over comments to clarify intent.

## Working with Reusable Modules

Look for an existing reusable module before building your own. If none exists, create one:

- in `@angularity/core` if the logic is platform-independent, framework-independent, and business-independent.
- local to the package otherwise.
