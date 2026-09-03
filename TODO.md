# TODO

Backlog of deferred work, to be picked up after the documentation renovation.

## Move Doc Generation Into a `workspace` Package

`scripts/generate-docs.mjs` is a standalone script. Create a `workspace` package
(mirroring the monorepo-tooling package pattern) and convert the doc generator
into an Nx executor there, so doc generation runs as an Nx target with caching
and dependency wiring rather than a loose script.

## Cross-Agent Compatibility

Establish cross-agent compatibility as its own topic, separate from this
documentation renovation — e.g. an `AGENTS.md` pointer (removed for now) and any
other agent-interop surfaces. Deferred so the documentation system settles first.
