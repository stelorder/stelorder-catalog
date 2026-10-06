/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { visualizer } from "rollup-plugin-visualizer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr"; // {added}

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "react-stel-catalog",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        sourcemap: false,
        paths: (id) => {
          if (id.includes("node_modules")) {
            return id;
          }
          return path.relative(process.cwd(), id);
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
    },
  },
  plugins: [
    ...(command === "build" ? [dts()] : []),
    // Only enable visualizer when explicitly requested (e.g. ANALYZE=true).
    ...(process.env.ANALYZE === "true"
        ? [
          visualizer({
            open: true,
            filename: "stats.html",
            template: "treemap", //
            gzipSize: true,
            brotliSize: true,
          }),
        ]
        : []),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
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
}));
