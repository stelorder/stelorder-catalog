# STEL Order Catalog

STEL Order Catalog es una librería de componentes React escrita en TypeScript y construida con Vite. Proporciona componentes reutilizables, escalables y fuertemente tipados para consumir en otras aplicaciones.

## Requisitos

- Node.js LTS
- npm

## Instalación

```bash
npm install
```

## Construir la librería

```bash
npm run build
```

Este comando ejecuta `tsc` y `vite build`, generando la salida distribuible en `dist/` con bundles CommonJS y ES modules, además de declaraciones TypeScript.

### Build local versionado

```bash
npm run build:local
```

Esto genera una carpeta de build versionada en la raíz del proyecto para pruebas y empaquetado locales.

## Estructura del proyecto

- `src/components/`: componentes de UI reutilizables
- `src/index.ts`: punto de entrada público del paquete
- `dist/`: salida generada que se publica desde esta carpeta

## Verificaciones de calidad

```bash
npm run lint
npm run prettier:check
npm run build
```

## Licencia

Este proyecto se distribuye bajo la licencia GPL-2.0-or-later.
