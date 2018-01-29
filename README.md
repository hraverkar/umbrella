# @thi.ng/umbrella

[![Travis status](https://api.travis-ci.org/thi-ng/umbrella.svg?branch=master)](https://travis-ci.org/thi-ng/umbrella)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org/)

Mono-repository for thi.ng TypeScript/ES6 projects, a collection of largely
data / transformation oriented packages.

All packages are:

- distributed as ES6 modules with bundled TypeScript typings & changelogs
- highly modular with largely only a single exported function / class per file
- provide re-exports of all their publics (`src/index.ts`)
- have either none or only @thi.ng internal runtime dependencies (see graph below)
- declare public interfaces, enums & types in an `src/api.ts` file (larger packages only)
- licensed under Apache Software License 2.0

## Projects

| Projects | Version | |
|----|----|----|
| [`@thi.ng/api`](./packages/api) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/api.svg)](https://www.npmjs.com/package/@thi.ng/api) | [changelog](./packages/api/CHANGELOG.md) |
| [`@thi.ng/atom`](./packages/atom) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom) | [changelog](./packages/atom/CHANGELOG.md) |
| [`@thi.ng/bitstream`](./packages/bitstream) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/bitstream.svg)](https://www.npmjs.com/package/@thi.ng/bitstream) | [changelog](./packages/bitstream/CHANGELOG.md) |
| [`@thi.ng/checks`](./packages/checks) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/checks.svg)](https://www.npmjs.com/package/@thi.ng/checks) | [changelog](./packages/checks/CHANGELOG.md) |
| [`@thi.ng/csp`](./packages/csp) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/csp.svg)](https://www.npmjs.com/package/@thi.ng/csp) | [changelog](./packages/csp/CHANGELOG.md) |
| [`@thi.ng/dcons`](./packages/dcons) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons) | [changelog](./packages/dcons/CHANGELOG.md) |
| [`@thi.ng/hiccup`](./packages/hiccup) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hiccup.svg)](https://www.npmjs.com/package/@thi.ng/hiccup) | [changelog](./packages/hiccup/CHANGELOG.md) |
| [`@thi.ng/iterators`](./packages/iterators) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/iterators.svg)](https://www.npmjs.com/package/@thi.ng/iterators) | [changelog](./packages/iterators/CHANGELOG.md) |
| [`@thi.ng/rle-pack`](./packages/rle-pack) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack) | [changelog](./packages/rle-pack/CHANGELOG.md) |
| [`@thi.ng/rstream`](./packages/rstream) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream) | [changelog](./packages/rstream/CHANGELOG.md) |
| [`@thi.ng/rstream-csp`](./packages/rstream-csp) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-csp.svg)](https://www.npmjs.com/package/@thi.ng/rstream-csp) | [changelog](./packages/rstream-csp/CHANGELOG.md) |
| [`@thi.ng/rstream-log`](./packages/rstream-log) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log) | [changelog](./packages/rstream-log/CHANGELOG.md) |
| [`@thi.ng/transducers`](./packages/transducers) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/transducers.svg)](https://www.npmjs.com/package/@thi.ng/transducers) | [changelog](./packages/transducers/CHANGELOG.md) |
| [`@thi.ng/unionstruct`](./packages/unionstruct) | [![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/unionstruct.svg)](https://www.npmjs.com/package/@thi.ng/unionstruct) | [changelog](./packages/unionstruct/CHANGELOG.md) |

## Dependency graph

(This graph is updated automatically after each version update)

![internal dependencies](./assets/deps.png)

## Building

```
git clone https://github.com/thi-ng/umbrella.git
cd umbrella
yarn build
```

### Testing

(TODO not all packages have tests yet)

```
yarn test
# or individually
lerna run test --scope @thi.ng/rstream
```

### Coverage

```
yarn cover
```

The resulting reports will be saved under `/packages/*/coverage/lcov-report/`.

### Documentation

```
yarn doc
```

The resulting docs will be saved under `/packages/*/doc/`.