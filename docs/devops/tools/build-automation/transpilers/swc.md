# SWC (Speedy Web Compiler)

SWC (Speedy Web Compiler) is a super-fast JavaScript/TypeScript compiler written in Rust that serves as a drop-in replacement for Babel and TypeScript compiler. Created by DongYoon Kang, SWC offers the configurability of Babel with the performance benefits of a compiled language.

## Core Functionality

SWC's approach includes:

- Parsing JavaScript/TypeScript into an AST
- Transforming modern JavaScript/TypeScript to specified target environments
- Processing JSX/TSX syntax with React optimizations
- Minifying JavaScript code with advanced optimizations
- Supporting custom plugins for specialized transformations
- Integrating with bundlers and frameworks

## Key Features

- **Rust-based Performance**: 20-70x faster than Babel
- **Babel Compatibility**: Drop-in replacement for most Babel configurations
- **TypeScript Support**: First-class TS transpilation without type checking
- **JSX Transformations**: Multiple JSX transform options including React Fast Refresh
- **Minification**: Fast JavaScript minification alternative to Terser
- **Plugin System**: Extensible with custom plugins written in Rust or JavaScript
- **Modern Output**: Optimized code generation for modern browsers
- **Framework Integration**: Built-in support for Next.js, Jest, and other frameworks

## Historical Context

- **Introduced**: 2019 by DongYoon Kang
- **Performance Breakthrough**: Demonstrated 20-70x faster speeds compared to Babel
- **Framework Adoption**: Became the default compiler in Next.js 12+ (2021)
- **Funding Milestone**: Secured Vercel backing and funding for full-time development
- **Key Versions**:
  - SWC 1.0 (2019): Initial release
  - SWC 1.2 (2020): Improved stability and feature compatibility with Babel
  - SWC 1.3+ (2021-2022): Next.js integration and ecosystem growth
  - SWC 2.0 (2023-2024): Enhanced features and broader framework integration

### Frameworks and Tools Using SWC

Parcel - Integrated SWC as an optional transformer for faster builds
Remix - Added support for SWC compilation
Jest - Offers SWC transformer via @swc/jest for much faster testing
Create React App - Available as a plugin for CRA
Webpack - Can be used via swc-loader
Rollup - Available through rollup-plugin-swc
Vite - Can be configured to use SWC via plugins
Nx - Added SWC support for faster builds in monorepos
SvelteKit - Offers SWC as an option for transpilation
Storybook - Can use SWC for faster compilation
Shopify's Hydrogen - Leverages SWC for performance
NestJS - Compatible with SWC for server-side TypeScript

### Companies Using SWC

Vercel - Main corporate sponsor and heavy user across their stack
Shopify - Uses SWC in their React frameworks
AWS Amplify - Added SWC support for faster builds
Wix - Adopted SWC for better performance
Netlify - Supports SWC in their build processes
Railway - Uses SWC for faster deployments
Microsoft - Some teams use SWC for TypeScript projects
Cloudflare - Used in some of their tools and projects

SWC's adoption has been particularly strong in companies where build performance is a critical concern, especially those with large codebases or those offering developer platforms. The TypeScript ecosystem has particularly benefited from SWC's performance improvements for transpilation

## Problems SWC Solves

1. **Transpilation Performance**: Dramatically reduces build and compilation times
2. **Babel Slowness**: Provides a fast alternative while maintaining configurability
3. **Developer Experience**: Improves development feedback loops with near-instant builds
4. **Framework Integration**: Offers seamless integration with modern frameworks
5. **Deployment Efficiency**: Reduces CI/CD pipeline times
6. **TypeScript Bottlenecks**: Separates transpilation from type checking for better performance

## When to Use SWC

- **React Development**: When working with React/JSX, especially with Next.js
- **TypeScript Projects**: For fast TS transpilation (separate from type checking)
- **Babel Migration**: When migrating from Babel for performance improvements
- **CI/CD Optimization**: To speed up continuous integration pipelines
- **Large Codebases**: When transpilation time affects development productivity
- **Framework Development**: When building tools that need fast transpilation
- **Jest Transformation**: For faster test runs with JavaScript/TypeScript

## Pros

- **Exceptional Speed**: 20-70x faster than Babel for typical workloads
- **Babel Compatibility**: Familiar configuration for Babel users
- **Low Resource Usage**: Efficient CPU and memory utilization
- **TypeScript Support**: Excellent TS/TSX transpilation
- **React Optimizations**: Special handling for React code and JSX
- **Next.js Integration**: First-class support in Next.js ecosystem
- **Active Development**: Backed by Vercel with ongoing improvements

## Cons

- **Plugin Ecosystem**: Less extensive than Babel's mature ecosystem
- **Edge Cases**: May handle certain complex transformations differently from Babel
- **Rust Requirement**: Rust knowledge needed for custom plugin development
- **Advanced Features**: Some specialized Babel features may not be available
- **Documentation**: Less comprehensive documentation than Babel
- **Configuration Complexity**: Can be complex for non-standard use cases
- **Newer Technology**: Less community knowledge and fewer examples

## SWC vs. Other Tools

### SWC vs. Babel

| Aspect                | SWC                        | Babel                     |
| --------------------- | -------------------------- | ------------------------- |
| **Performance**       | 20-70x faster              | Slower (JavaScript-based) |
| **Implementation**    | Rust                       | JavaScript                |
| **Configuration**     | Babel-compatible           | Highly configurable       |
| **Plugin Ecosystem**  | Growing but limited        | Extensive                 |
| **Custom Transforms** | Supports custom plugins    | Rich plugin ecosystem     |
| **Framework Support** | Strong Next.js integration | Broad framework support   |
| **Maturity**          | Newer (since 2019)         | Mature (since 2014)       |
| **Community Size**    | Growing                    | Very large                |

### SWC vs. esbuild

| Aspect                    | SWC                               | esbuild                              |
| ------------------------- | --------------------------------- | ------------------------------------ |
| **Primary Focus**         | Transpilation (Babel alternative) | Bundling + basic transpilation       |
| **Configuration**         | More Babel-like, detailed         | Simpler, fewer options               |
| **Performance**           | Very fast (Rust)                  | Very fast (Go)                       |
| **Framework Integration** | Deep Next.js integration          | Used by many tools as component      |
| **Plugin System**         | More powerful                     | More limited                         |
| **Use Case**              | Direct Babel replacement          | Fast bundling & simple transpilation |
| **JSX Handling**          | More optimization options         | Basic support                        |

### SWC vs. TypeScript Compiler (tsc)

| Aspect               | SWC                        | TypeScript Compiler           |
| -------------------- | -------------------------- | ----------------------------- |
| **Type Checking**    | None (transpilation only)  | Full type checking            |
| **Performance**      | Much faster                | Slower due to type checking   |
| **Output Quality**   | Optimized JS output        | Standard JS output            |
| **JSX Handling**     | Multiple transform options | Basic transformation          |
| **Configuration**    | .swcrc or js config        | tsconfig.json                 |
| **Extensibility**    | Plugin system              | Limited extensibility         |
| **Primary Use Case** | Fast transpilation         | Type checking & transpilation |

## What Makes SWC Different?

SWC's key differentiators:

1. **Babel-like Configuration with Rust Speed**: Offers familiar Babel-style configuration with the performance benefits of Rust.

2. **Framework-Specific Optimizations**: Built with deep integrations for Next.js and other frameworks, providing specialized optimizations.

3. **Balanced Approach**: Strikes a balance between esbuild's pure speed approach and Babel's flexibility.

4. **React-Focused**: Particularly well-optimized for React applications with special handling for JSX and React-specific optimizations.

5. **Vercel Backing**: Commercial backing from Vercel ensures ongoing development and integration with popular frameworks.

6. **Incremental Adoption Path**: Designed as a drop-in replacement, allowing gradual adoption without wholesale migration.

## Example Configuration

### Basic Configuration (.swcrc)

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": false,
        "refresh": true
      }
    },
    "target": "es2020"
  },
  "minify": true,
  "sourceMaps": true
}
```

### JavaScript API

```javascript
const swc = require("@swc/core");

async function transform() {
  const output = await swc.transform(
    `
    class Foo {
      #private = 123;
      async bar() {
        await foo();
      }
    }
  `,
    {
      jsc: {
        parser: {
          syntax: "ecmascript",
          dynamicImport: true,
        },
        target: "es2018",
      },
      filename: "input.js",
    }
  );

  console.log(output.code);
}

transform();
```

### Next.js Integration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // Use SWC for minification
  compiler: {
    // Extended SWC options
    styledComponents: true,
    reactRemoveProperties: { properties: ["^data-test$"] },
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
```

## Best Practices

### 1. Optimize for Development vs. Production

```json
// .swcrc
{
  "env": {
    "development": {
      "jsc": {
        "transform": {
          "react": {
            "development": true,
            "refresh": true
          }
        }
      },
      "sourceMaps": true
    },
    "production": {
      "minify": true,
      "jsc": {
        "transform": {
          "react": {
            "development": false,
            "refresh": false
          }
        }
      }
    }
  }
}
```

### 2. Optimize React Code

```json
{
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": true
      }
    }
  }
}
```

### 3. Use with Jest for Faster Tests

```javascript
// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
```

### 4. Customize Module Resolution

```json
{
  "module": {
    "type": "es6", // or "commonjs"
    "strict": true,
    "strictMode": true,
    "noInterop": false
  }
}
```

### 5. Use SWC Plugins for Extended Functionality

```json
{
  "jsc": {
    "experimental": {
      "plugins": [["swc-plugin-react-native-web", {}]]
    }
  }
}
```

## Performance Optimization Strategies

### Caching for Repeated Builds

```javascript
// webpack.config.js with swc-loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            // Enable caching
            cacheDirectory: true,

            // SWC options
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                /* ... */
              },
            },
          },
        },
      },
    ],
  },
};
```

### Parallel Execution

```javascript
// .swcrc with Jest
{
  "jsc": {
    // SWC configuration
  },
  "env": {
    "test": {
      // Test-specific options
    }
  }
}

// jest.config.js
module.exports = {
  // Use maxWorkers to leverage parallelism
  maxWorkers: "50%", // Use 50% of available cores
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest"
  }
};
```

### Custom SWC Plugin for Specialized Needs

```rust
// Example of a custom SWC plugin in Rust
use swc_core::ecma::{
    ast::Program,
    transforms::testing::test,
    visit::{as_folder, FoldWith, VisitMut},
};
use swc_core::plugin::{plugin_transform, proxies::TransformPluginProgramMetadata};

pub struct TransformVisitor;

impl VisitMut for TransformVisitor {
    // Implementation details
}

#[plugin_transform]
pub fn process_transform(program: Program, _metadata: TransformPluginProgramMetadata) -> Program {
    program.fold_with(&mut as_folder(TransformVisitor))
}
```

## Real-World Examples

- [Next.js](https://github.com/vercel/next.js): Uses SWC as the default compiler since v12
- [Parcel](https://github.com/parcel-bundler/parcel): Offers SWC integration for transpilation
- [SvelteKit](https://github.com/sveltejs/kit): Optional SWC support for faster builds
- [Remix](https://github.com/remix-run/remix): Supports SWC for compilation
- [Jest](https://github.com/facebook/jest): SWC transformer via @swc/jest

## Key Resources

- [Official Documentation](https://swc.rs/docs/getting-started)
- [SWC GitHub Repository](https://github.com/swc-project/swc)
- [SWC Playground](https://play.swc.rs/)
- [SWC Blog](https://swc.rs/blog)
- [Vercel SWC Documentation](https://nextjs.org/docs/advanced-features/compiler)

## Current Status (2025)

SWC has established itself as a major player in the JavaScript transpilation ecosystem, particularly in the React and Next.js communities. As the default compiler in Next.js, its reach has expanded significantly, offering developers a high-performance alternative to Babel.

Key trends include:

1. **Framework Integration**: Deep integration into multiple frameworks beyond Next.js
2. **Plugin Ecosystem Growth**: Expanding plugin system with both Rust and JavaScript plugins
3. **Enterprise Adoption**: Widespread use in large organizations for build performance
4. **Build Tool Integration**: Integration with various bundlers and build systems
5. **Developer Experience**: Focus on improved error messages and debugging experience

The ecosystem has evolved toward a pragmatic approach where SWC handles transpilation for performance-critical applications, especially in the React ecosystem, while maintaining compatibility with Babel configurations. This positions SWC as the natural upgrade path for many Babel users seeking performance improvements without sacrificing configurability.
