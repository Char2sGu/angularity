# Angularity

**Opinionated Angular toolkit facilitating scalable application development**

Angularity is a collection of packages that provide high-level abstractions and utilities around Angular and the Angular ecosystem.

| Package            | Description                                                                      | Links                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core`             | Foundation artifacts and utilities shared across Angularity packages             | [docs](https://char2sgu.github.io/angularity/packages/core) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/core)                         |
| `cdk`              | Component development primitives based on `@angular/cdk`                         | [docs](https://char2sgu.github.io/angularity/packages/cdk) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/cdk)                           |
| `forms`            | Convenience abstractions for implementing custom Angular form control components | [docs](https://char2sgu.github.io/angularity/packages/forms) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/forms)                       |
| `router`           | Convenience utilities for the Angular routing system                             | [docs](https://char2sgu.github.io/angularity/packages/router) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/router)                     |
| `icons`            | Lightweight and flexible solution for managing and displaying SVG icons          | [docs](https://char2sgu.github.io/angularity/packages/icons) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/icons)                       |
| `elements`         | High-level abstractions for working with Angular Elements                        | [docs](https://char2sgu.github.io/angularity/packages/elements) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/elements)                 |
| `theming`          | Programmatic runtime theming system based on CSS variables                       | [docs](https://char2sgu.github.io/angularity/packages/theming) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/theming)                   |
| `theming-material` | Material Design theme builders based on the `theming` package                    | [docs](https://char2sgu.github.io/angularity/packages/theming-material) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/theming-material) |
| `command-flow`     | Centralized command/event system for reactively modeling application business    | [docs](https://char2sgu.github.io/angularity/packages/command-flow) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/command-flow)         |
| `endpoints`        | Declarative and type-safe access to HTTP API endpoints                           | [docs](https://char2sgu.github.io/angularity/packages/endpoints) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/endpoints)               |
| `config-files`     | Declaratively and type-safe access to remote config files                        | [docs](https://char2sgu.github.io/angularity/packages/config-files) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/config-files)         |
| `fire`             | Firebase and RxFire abstractions                                                 | [docs](https://char2sgu.github.io/angularity/packages/fire) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/fire)                         |

The following command installs all the Angularity packages. Pick and choose the packages you need for your project:

```sh
npm i \
  @angularity/core \
  @angularity/cdk \
  @angularity/forms \
  @angularity/router \
  @angularity/icons \
  @angularity/elements \
  @angularity/theming \
  @angularity/theming-material \
  @angularity/command-flow \
  @angularity/endpoints \
  @angularity/config-files \
  @angularity/fire
```

To update all Angularity packages, run:

```sh
npx update-by-scope @angularity
```
