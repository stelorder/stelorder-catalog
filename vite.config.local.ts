/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { visualizer } from "rollup-plugin-visualizer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";
import fs from "node:fs";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const versionFolder = `stelorder-catalog-${pkg.version.replace(/\./g, "_")}`;

export default defineConfig({
  build: {
    outDir: versionFolder + "/dist",
    lib: {
      entry: "./src/index.ts",
      name: "react-stel-catalog",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        sourcemap: true,
        paths: (id) => {
          if (id.includes("node_modules")) {
            return id;
          }
          return path.relative(process.cwd(), id);
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
    },
  },
  plugins: [
    dts(),
    ...(process.env.ANALYZE === "true"
      ? [
          visualizer({
            open: true,
          }),
        ]
      : []),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    {
      name: "copy-package-json",
      writeBundle() {
        const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
        const pkgToCopy = {
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          main: pkg.main,
          module: pkg.module,
          types: pkg.types,
          files: pkg.files,
          peerDependencies: pkg.peerDependencies,
          license: pkg.license,
          repository: pkg.repository,
          keywords: pkg.keywords,
          author: pkg.author,
          type: pkg.type,
        };
        fs.writeFileSync(
          `./${versionFolder}/package.json`,
          JSON.stringify(pkgToCopy, null, 2),
        );
      },
    },
  ],
  test: {
    coverage: {
      reporter: ["lcov"],
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: [
        "src/components/**/index.{ts,tsx}",
        "src/components/**/*.d.{ts,tsx}",
      ],
      thresholds: {
        statements: 60,
        perFile: true,
      },
      watermarks: {
        statements: [60, 80],
      },
    },
  },
});
