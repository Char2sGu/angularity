# Angularity

**Opinionated Angular toolkit facilitating scalable application development**

Angularity is a collection of packages that provide high-level abstractions and utilities around Angular and the Angular ecosystem.

| Package            | Description                                                      | Links                                                                                                                                                             |
| ------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core`             | shared utilities and concepts                                    | [docs](https://char2sgu.github.io/angularity/packages/core) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/core)                         |
| `cdk`              | Angular CDK extensions                                           | [docs](https://char2sgu.github.io/angularity/packages/cdk) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/cdk)                           |
| `forms`            | Angular Forms utilities                                          | [docs](https://char2sgu.github.io/angularity/packages/forms) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/forms)                       |
| `router`           | Angular Router utilities                                         | [docs](https://char2sgu.github.io/angularity/packages/router) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/router)                     |
| `icons`            | flexible SVG icons solution                                      | [docs](https://char2sgu.github.io/angularity/packages/icons) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/icons)                       |
| `elements`         | Angular Elements utilities                                       | [docs](https://char2sgu.github.io/angularity/packages/elements) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/elements)                 |
| `theming`          | programmatic runtime theming system leveraging CSS variables     | [docs](https://char2sgu.github.io/angularity/packages/theming) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/theming)                   |
| `theming-material` | Material Design theme builders for the `theming` package         | [docs](https://char2sgu.github.io/angularity/packages/theming-material) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/theming-material) |
| `command-flow`     | centralized command/event system for building the business model | [docs](https://char2sgu.github.io/angularity/packages/command-flow) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/command-flow)         |
| `endpoints`        | declaratively generate HTTP endpoint functions                   | [docs](https://char2sgu.github.io/angularity/packages/endpoints) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/endpoints)               |
| `config-files`     | declaratively define, validate, and load remote config files     | [docs](https://char2sgu.github.io/angularity/packages/config-files) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/config-files)         |
| `fire`             | Firebase and RxFire utilities                                    | [docs](https://char2sgu.github.io/angularity/packages/fire) , [source](https://github.com/Char2sGu/angularity/tree/develop/packages/fire)                         |

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

To update all Angularity packages, execute:

```sh
npx update-by-scope @angularity
```
