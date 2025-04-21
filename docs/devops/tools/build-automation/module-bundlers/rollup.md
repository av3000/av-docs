# [Rollup](https://www.npmjs.com/package/rollup)

Rollup is a module bundler for JavaScript that specializes in producing efficient bundles with a focus on ES modules (ESM). Particularly renowned for library development, Rollup excels at generating optimized, tree-shaken output in various formats.

## Core Functionality

Rollup's approach to bundling includes:

- Building a dependency graph from entry points
- Tree-shaking through static analysis of ES modules
- Converting modules into a single bundle or multiple chunks
- Outputting in various formats (ESM, CommonJS, UMD, etc.)
- Supporting various plugins for transformation and optimization

## Key Features

- **ES Module Focused**: First-class support for ES modules and tree-shaking
- **Multiple Output Formats**: Generate different module formats from a single source
- **Code Splitting**: Intelligent chunk generation for shared dependencies
- **Highly Optimized Output**: Generally produces smaller bundles than other tools
- **Plugin Architecture**: Extensible through a simpler plugin API than webpack
- **Minimal Configuration**: Straightforward configuration format
- **Asset Handling**: Process various asset types through plugins

## Historical Context

- **Introduced**: 2015 by Rich Harris (creator of Svelte)
- **Key Innovation**: First major bundler with native ES module support and tree-shaking
- **Influence**: Influenced webpack, Parcel, and others to implement tree-shaking
- **Integration**: Became the production bundler for Vite and other tools
- **Key Versions**:
  - Rollup 1.0 (2018): Stabilized API and improved performance
  - Rollup 2.0 (2020): Built-in TypeScript support and better code splitting
  - Rollup 3.0 (2022): ESM by default and improved performance
  - Rollup 4.0 (2024): Enhanced tree-shaking and optimized dependency handling

## Problems Rollup Solves

1. **Bundle Size**: Minimizing output size through efficient tree-shaking
2. **Library Optimization**: Producing packages consumable by various module systems
3. **Code Duplication**: Eliminating unused code and consolidating shared dependencies
4. **Module Format Fragmentation**: Bridging the gap between ESM, CommonJS, and UMD
5. **Build Complexity**: Simplifying bundling for packages and libraries

## When to Use Rollup

- **Library Development**: Creating packages/libraries for distribution
- **Framework Development**: Building frameworks or their components
- **Output Format Flexibility**: When multiple output formats are required
- **Bundle Size Priority**: When highly optimized output size is critical
- **Static Site Generation**: For frameworks like Sveltekit that use Rollup internally
- **Simple Applications**: Small to medium-sized apps with straightforward bundling needs

## Pros

- **Bundle Efficiency**: Often produces smaller bundles through better tree-shaking
- **Clear Configuration**: Simpler, more intuitive configuration than webpack
- **Multiple Formats**: Easy generation of ESM, CJS, UMD from single source
- **Plugin Simplicity**: More straightforward plugin API
- **Modern Focus**: Designed around ES modules from the beginning
- **Library Publishing**: Excellent support for publishing libraries with proper exports
- **First-class TypeScript**: Built-in TypeScript support without extra plugins

## Cons

- **Dev Server**: Less sophisticated development server compared to Vite/webpack
- **Dynamic Imports**: More limited handling of highly dynamic scenarios
- **Hot Module Replacement**: Less advanced HMR than Vite or webpack
- **Legacy Support**: More complex setup for older browsers or Node.js
- **Ecosystem Size**: Fewer plugins than webpack's vast ecosystem

## Rollup vs. Webpack vs. Vite

### How Rollup Competes

- **Output Optimization**: Often produces smaller, more optimized bundles
- **Simplicity**: More straightforward configuration for many use cases
- **Multiple Output Formats**: Superior support for generating different module formats
- **Library Focus**: Better optimized for creating distributable libraries
- **Plugin Simplicity**: More intuitive plugin system

### When to Choose Rollup

- Building libraries or packages for distribution
- Output size is a critical concern
- Multiple output formats are needed (ESM, CJS, UMD)
- The project is primarily using ES modules
- You need a simpler configuration than webpack
- No need for advanced dev server features

## Example Configuration

```javascript
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

export default [
  // Main bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
      {
        name: "MyLibrary",
        file: pkg.browser,
        format: "umd",
        plugins: [terser()],
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: ["react", "react-dom"],
  },
  // TypeScript declarations
  {
    input: "dist/dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
```

## Best Practices

### 1. Optimize Output for Distribution

Package bundling with proper entry points:

```json
// package.json
{
  "name": "my-library",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "browser": "dist/index.umd.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    }
  },
  "sideEffects": false
}
```

### 2. Use Code Splitting Effectively

```javascript
export default {
  input: ["src/main.js", "src/admin.js"],
  output: {
    dir: "dist",
    format: "esm",
    chunkFileNames: "chunks/[name]-[hash].js",
    manualChunks: {
      vendor: ["lodash", "moment"],
    },
  },
};
```

### 3. Leverage Tree-Shaking Flags

```javascript
// Mark file as having no side effects
/* eslint-disable import/no-unused-modules */

// Export functions individually for better tree-shaking
export function func1() {
  /* ... */
}
export function func2() {
  /* ... */
}

// Avoid export * from './module' when possible
```

### 4. Optimize Third-Party Dependencies

```javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  // ...
  plugins: [
    resolve({
      // Prefer ES modules
      mainFields: ["module", "main"],
    }),
    commonjs({
      // Transform specific packages
      transformMixedEsModules: true,
    }),
  ],
};
```

### 5. Use Proper Environment Setup

```javascript
import replace from "@rollup/plugin-replace";

export default {
  // ...
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      __BUILD_DATE__: () => JSON.stringify(new Date().toISOString()),
    }),
  ],
};
```

## Performance Optimization Strategies

### Chunking Strategy

```javascript
export default {
  // ...
  output: {
    dir: "dist",
    format: "esm",
    chunkFileNames: "chunks/[name]-[hash].js",
    manualChunks(id) {
      // Group node_modules by package
      if (id.includes("node_modules")) {
        const module = id.toString().split("node_modules/")[1].split("/")[0];
        return `vendor/${module}`;
      }
      // Group internal modules by directory
      if (id.includes("/src/components/")) {
        return "components";
      }
      if (id.includes("/src/utils/")) {
        return "utils";
      }
    },
  },
};
```

### Performance Profiling

```bash
# Use --perf flag to see performance statistics
rollup -c --perf

# Use --watch flag for incremental builds during development
rollup -c --watch
```

### Asset Optimization

```javascript
import { imageOptimizer } from "rollup-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";

export default {
  // ...
  plugins: [
    imageOptimizer({
      quality: 80,
    }),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
    }),
  ],
};
```

## Real-World Examples

- [Svelte](https://github.com/sveltejs/svelte): Component framework using Rollup
- [Redux](https://github.com/reduxjs/redux): State management library built with Rollup
- [Rollup Starter Projects](https://github.com/rollup/rollup-starter-lib): Official starter templates
- [D3.js](https://github.com/d3/d3): Data visualization library using Rollup
- [Emotion](https://github.com/emotion-js/emotion): CSS-in-JS library bundled with Rollup

## Key Resources

- [Official Documentation](https://rollupjs.org/)
- [Rollup GitHub Repository](https://github.com/rollup/rollup)
- [Rollup Plugin Directory](https://github.com/rollup/awesome)
- [Rollup Guide](https://rollupjs.org/guide/en/)
- [Rollup Plugin Development Guide](https://rollupjs.org/plugin-development/)

## Current Status (2025)

Rollup continues to be the tool of choice for library development and has maintained its position as the best bundler for producing optimized ESM packages. While Vite has become dominant for application development, Rollup serves as Vite's production bundler and remains essential to the JavaScript ecosystem.

Key trends include:

1. **Library Development**: Still the primary choice for publishing packages
2. **Framework Building**: Used by framework authors for distributing optimized code
3. **ESM Optimization**: Leading in ESM bundling and optimization
4. **Production Bundling**: Powers production builds in Vite, SvelteKit, and other tools
5. **Plugin Ecosystem Growth**: Expanded plugin ecosystem for specialized use cases

Rollup's focus on simplicity, optimized output, and ES modules ensures its continued relevance in the JavaScript tooling landscape, especially for package authors and framework developers.
