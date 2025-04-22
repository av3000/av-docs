# Turborepo

Turborepo is a high-performance build system for JavaScript and TypeScript monorepos, designed to make codebases faster and more efficient through intelligent caching and task orchestration. Created by Vercel, it provides a simpler, more streamlined approach to monorepo management with minimal configuration.

## Core Functionality

Turborepo's approach includes:

- High-performance task execution with intelligent caching
- Simple, minimal configuration for task orchestration
- Parallel execution of tasks across packages
- Handling of dependencies between packages and tasks
- Remote caching with Vercel or custom remote caches
- Local computation caching for faster builds
- Pipeline definition for task execution order

## Key Features

- **Incremental Builds**: Only rebuilds what changed
- **Content Hashing**: Caches based on actual file contents, not timestamps
- **Parallel Execution**: Runs tasks in parallel where possible
- **Task Pipelines**: Defines relationships between tasks
- **Minimal Configuration**: Simple, declarative configuration
- **Zero Runtime Overhead**: No runtime impact on applications
- **Language Agnostic**: Works with any JavaScript/TypeScript project
- **Remote Caching**: Optional cloud caching for teams
- **Framework Agnostic**: Works with any JS framework
- **Pruned Subsets**: Ability to build only needed packages

## Historical Context

- **Introduced**: 2021 by Jared Palmer, acquired by Vercel
- **Acquisition**: Acquired by Vercel in December 2021
- **Integration**: Deeply integrated with Next.js and Vercel platform
- **Adoption**: Rapidly adopted due to its simplicity and performance
- **Key Versions**:
  - Turborepo 1.0 (2021): Initial public release
  - Turborepo 1.2+ (2022): Remote caching and pruning features
  - Turborepo 1.5+ (2023): Improved workspace detection and configuration
  - Turborepo 2.0 (2024): Enhanced performance and native artifact organization
  - Turborepo 2.5+ (2025): Advanced dependency graph features and improved task scheduling

## Problems Turborepo Solves

1. **Build Performance**: Reduces build times through intelligent caching
2. **Task Orchestration**: Manages dependencies between tasks
3. **Configuration Complexity**: Simplifies monorepo setup compared to alternatives
4. **CI/CD Efficiency**: Optimizes continuous integration workflows
5. **Team Collaboration**: Speeds up workflows when multiple developers work on the same codebase
6. **Remote Caching**: Enables sharing build caches across developers and CI
7. **Workspace Management**: Streamlines development across multiple packages

## When to Use Turborepo

- **JavaScript/TypeScript Projects**: When working with JS/TS monorepos
- **Multiple Packages**: When managing multiple related packages
- **Simple Configuration**: When you prefer minimal configuration
- **Build Performance**: When build times are becoming a bottleneck
- **Vercel Integration**: When deploying with Vercel
- **Next.js Projects**: Particularly well-suited for Next.js monorepos
- **Small to Medium Teams**: For teams seeking quick setup and adoption
- **CI Optimization**: When optimizing CI pipelines for speed

## Pros

- **Simplicity**: Minimal, straightforward configuration
- **Performance**: Excellent caching and parallel execution
- **Low Learning Curve**: Easy to adopt and understand
- **Vercel Integration**: Seamless integration with Vercel platform
- **Framework Compatibility**: Works with any JavaScript framework
- **Remote Caching**: Built-in support for remote cache sharing
- **Package Manager Agnostic**: Works with npm, yarn, or pnpm
- **Zero Runtime Dependencies**: No runtime impact on applications
- **Active Development**: Regular updates and improvements

## Cons

- **Limited Scope**: Focused on build caching, less comprehensive than some alternatives
- **Younger Ecosystem**: Less mature than some established tools
- **Limited Extensibility**: Fewer extension points than more complex systems
- **Configuration Constraints**: Less flexible for advanced customization
- **No Code Generators**: No built-in scaffolding tools like Nx
- **Less Visualization**: More basic dependency visualization
- **Non-JS Limitations**: Less suitable for polyglot repositories
- **Fewer Enterprise Features**: Missing some features needed by very large organizations

## Turborepo vs. Other Tools

### Turborepo vs. Nx

| Aspect             | Turborepo              | Nx                         |
| ------------------ | ---------------------- | -------------------------- |
| **Implementation** | Go                     | TypeScript                 |
| **Configuration**  | Simpler                | More complex               |
| **Scope**          | Task running & caching | Complete monorepo solution |
| **Generators**     | None                   | Extensive generators       |
| **Visualization**  | Basic                  | Interactive graph          |
| **Caching**        | Local & Vercel         | Local, Remote & Nx Cloud   |
| **Learning Curve** | Low                    | Moderate                   |
| **Integration**    | Vercel-focused         | Multiple frameworks        |
| **Customization**  | Less customizable      | Highly customizable        |

### Turborepo vs. Lerna

| Aspect                  | Turborepo                | Lerna               |
| ----------------------- | ------------------------ | ------------------- |
| **Performance**         | High-performance caching | Basic (now uses Nx) |
| **Focus**               | Task orchestration       | Package management  |
| **Configuration**       | Simple, declarative      | Command-focused     |
| **Integration**         | Task-focused             | Version management  |
| **Modernity**           | Modern design            | Legacy with updates |
| **Visualization**       | Basic                    | None natively       |
| **Versioning Features** | None built-in            | Version management  |
| **Task Running**        | First-class              | Secondary           |

### Turborepo vs. Rush

| Aspect                  | Turborepo            | Rush                     |
| ----------------------- | -------------------- | ------------------------ |
| **Origin**              | Vercel               | Microsoft                |
| **Philosophy**          | Developer simplicity | Enterprise controls      |
| **Installation**        | Simple npm install   | Custom package installer |
| **Publish Pipeline**    | Basic                | Comprehensive            |
| **Configuration**       | Minimal              | Extensive                |
| **Policy Enforcement**  | Limited              | Extensive                |
| **Learning Curve**      | Low                  | High                     |
| **Enterprise Features** | Fewer                | Many                     |

## What Makes Turborepo Different?

Turborepo's key differentiators:

1. **Simplicity First**: Focuses on minimal configuration and rapid adoption, with sensible defaults.

2. **Speed Focus**: Designed from the ground up for performance, with Go implementation and efficient algorithms.

3. **Content-based Caching**: Uses file content hashing rather than timestamps for more reliable caching.

4. **Task-centric Approach**: Organizes around tasks (build, test, lint) rather than package relationships.

5. **Vercel Integration**: Seamlessly integrates with Vercel's platform and deployment workflow.

6. **Balanced Feature Set**: Provides the most important features for most teams without overwhelming complexity.

7. **Remote Caching**: First-class support for remote caching to share results across developers and CI.

## Example Configuration

### Basic turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
    },
    "deploy": {
      "dependsOn": ["build", "test", "lint"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### package.json Configuration

```json
{
  "name": "my-turborepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "prettier": "^2.8.4",
    "turbo": "^1.8.3"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "packageManager": "pnpm@7.15.0"
}
```

## Best Practices

### 1. Define Clear Task Dependencies

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    }
  }
}
```

### 2. Optimize Output Caching

```json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    }
  }
}
```

### 3. Specify Explicit Inputs for Better Caching

```json
{
  "pipeline": {
    "build": {
      "inputs": [
        "src/**/*.ts",
        "src/**/*.tsx",
        "package.json",
        "tsconfig.json"
      ],
      "outputs": ["dist/**"]
    }
  }
}
```

### 4. Use Workspace Wildcards for Common Configurations

```json
{
  "pipeline": {
    // Apply to all packages
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    // Only for packages matching filter
    "build#apps/web": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"],
      "env": ["NEXT_PUBLIC_API_URL"]
    }
  }
}
```

### 5. Configure for CI Environments

````json
// package.json
{
  "scripts": {
    "build": "turbo run build",
    "build:ci": "turbo run build --force"
  }
}

// GitHub Actions workflow
// .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 7
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - name: Build
        run: pnpm build
        env:
          TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
````

## Performance Optimization Strategies

### Enable Remote Caching

```bash
# Login to Vercel remote cache
npx turbo login

# Link to your Vercel team
npx turbo link

# Use in CI with environment variables
TURBO_TOKEN=xxx TURBO_TEAM=my-team turbo build
```

### Custom Remote Cache Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "remoteCache": {
    "signature": true
  }
}
```

### Pruned Workspaces for CI

```bash
# Create a subset of the monorepo with only required dependencies
npx turbo prune --scope=my-app

# Deploy with the pruned subset
cd out && npm install && npm run build
```

### Fine-Tuning Task Execution

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  },
  "experimentalSpaces": true,
  "experimentalTaskDefinitions": true
}
```

## Real-World Examples

- [Vercel AI SDK](https://github.com/vercel/ai): Uses Turborepo for monorepo management
- [Next.js Starter Kit](https://github.com/vercel/turbo/tree/main/examples/basic): Official Turborepo example
- [Remotion](https://github.com/remotion-dev/remotion): Video rendering framework using Turborepo
- [Payload CMS](https://github.com/payloadcms/payload): Headless CMS using Turborepo

## Key Resources

- [Official Documentation](https://turbo.build/repo/docs)
- [Turborepo GitHub Repository](https://github.com/vercel/turbo)
- [Examples Repository](https://github.com/vercel/turbo/tree/main/examples)
- [Vercel Platform Integration](https://vercel.com/docs/monorepos/turborepo)
- [Turborepo Blog](https://turbo.build/blog)

## Current Status (2025)

Turborepo has established itself as a popular solution for JavaScript/TypeScript monorepos, particularly those using Next.js and deploying to Vercel. Its focus on simplicity and performance has made it the tool of choice for teams seeking a straightforward approach to monorepo management.

Key trends include:

1. **Growing Ecosystem**: Expanding plugin and integration ecosystem
2. **Increased Enterprise Adoption**: More adoption in larger organizations
3. **Remote Caching Enhancements**: Advanced remote caching capabilities
4. **Enhanced Integration**: Deeper integration with Next.js and other frameworks
5. **Performance Focus**: Continued emphasis on build performance improvements

While Nx maintains an advantage for complex, multi-framework monorepos, Turborepo has carved out a strong position as the streamlined, performance-focused alternative, particularly for web-focused JavaScript and TypeScript projects. Its integration with Vercel's platform continues to be a significant advantage for teams in that ecosystem.
