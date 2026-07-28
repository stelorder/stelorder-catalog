# STEL Order Catalog

STEL Order Catalog is a React component library written in TypeScript and built with Vite. It provides reusable, scalable, and strongly typed UI components for consumption in other applications.

## Requirements

- Node.js LTS
- npm

## Installation

```bash
npm install
```

## Build the library

```bash
npm run build
```

This command runs `tsc` and `vite build`, generating the distributable output in `dist/` with CommonJS and ES module bundles plus TypeScript declarations.

### Versioned local build

```bash
npm run build:local
```

This produces a versioned build folder under the project root for local testing and packaging.

## Project structure

- `src/components/`: reusable UI components
- `src/index.ts`: public entry point for the package
- `dist/`: generated distribution output published from this folder

## Quality checks

```bash
npm run lint
npm run prettier:check
npm run build
```

## License

This project is distributed under the GPL-2.0-or-later license.
