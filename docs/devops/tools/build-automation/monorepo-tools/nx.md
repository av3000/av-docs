# Nx

Nx is an extensible build framework and set of tools designed for monorepo development. It provides a structured approach to organizing, building, testing, and managing multiple applications and libraries within a single repository, with a focus on scalability and developer experience.

## Core Functionality

Nx's approach includes:

- Managing dependencies between projects in a monorepo
- Providing intelligent build caching and incremental builds
- Enabling affected commands that only run on impacted projects
- Offering powerful code generators and schematics
- Supporting multiple frontend and backend frameworks
- Visualizing the project dependency graph
- Facilitating distributed task execution

## Key Features

- **Intelligent Computation Caching**: Caches task results to avoid redundant work
- **Affected Commands**: Runs tasks only on projects affected by changes
- **Code Generation**: Scaffolding for new applications, libraries, and components
- **Dependency Graph**: Visual representation of project relationships
- **Framework Support**: Works with Angular, React, Next.js, Node.js, and more
- **Plugin System**: Extensible through plugins for various technologies
- **Distributed Task Execution**: Distributes tasks across multiple machines
- **Workspace Analysis**: Provides insights and recommendations for optimization
- **Integration Options**: Works with various CI systems and build tools

## Historical Context

- **Introduced**: 2018 by Nrwl (a company founded by ex-Google engineers)
- **Original Focus**: Initially focused on Angular workspaces
- **Evolution**: Expanded to support React, Node.js, and many other frameworks
- **Community Growth**: Gained significant adoption for large-scale applications
- **Key Versions**:
  - Nx 10 (2020): Introduction of computation caching
  - Nx 12 (2021): Modular plugins and improved React support
  - Nx 13-14 (2022): Distributed task execution and cloud integration
  - Nx 15-16 (2023): Project graph enhancements and improved DX
  - Nx 17-18 (2024): Enhanced caching systems and micro-frontend support

## Problems Nx Solves

1. **Monorepo Scalability**: Makes large codebases with many projects manageable
2. **Build Performance**: Reduces build times through caching and affected commands
3. **Dependency Management**: Provides clear visibility into dependencies between projects
4. **Consistency**: Enforces consistent patterns and best practices across projects
5. **Code Sharing**: Facilitates sharing code between applications and libraries
6. **Coordination**: Enables teams to work effectively on shared codebases
7. **CI Efficiency**: Optimizes CI pipelines by only testing affected code

## When to Use Nx

- **Multiple Applications**: When developing multiple related applications
- **Shared Libraries**: When code needs to be shared across applications
- **Large Teams**: When multiple teams work on related projects
- **Microservices/Micro-frontends**: For managing multiple services/UIs
- **Platform Development**: Creating a platform with multiple components
- **Performance Issues**: When build times are becoming problematic
- **Growing Organizations**: As your engineering team and codebase scale
- **Full-stack Development**: When combining frontend and backend in one repo

## Pros

- **Performance**: Significant build time improvements through caching
- **Scalability**: Successfully used in very large enterprise monorepos
- **Developer Experience**: Code generators and integrated tooling
- **Flexibility**: Works with multiple frameworks and technologies
- **Structured Approach**: Provides clear patterns for organizing code
- **Visualization**: Dependency graph visualization aids understanding
- **Incremental Adoption**: Can be adopted gradually in existing projects
- **Active Development**: Regular updates and improvements
- **Enterprise Support**: Commercial support available through Nrwl

## Cons

- **Learning Curve**: Initial complexity and concepts to understand
- **Configuration Overhead**: More complex setup than simple projects
- **Build System Lock-in**: Switching away can be difficult after adoption
- **Resource Requirements**: Higher system requirements for large workspaces
- **Plugin Ecosystem**: Some technologies may have limited plugin support
- **Initial Setup Time**: Takes time to properly configure for specific needs
- **Team Adaptation**: Requires team buy-in and adaptation to new workflows
- **Unopinionated Aspects**: Some architectural decisions still left to teams

## Nx vs. Other Tools

### Nx vs. Turborepo

| Aspect                  | Nx                           | Turborepo              |
| ----------------------- | ---------------------------- | ---------------------- |
| **Implementation**      | TypeScript                   | Go                     |
| **Caching**             | Local, Remote & Nx Cloud     | Local & Remote         |
| **Task Orchestration**  | Advanced (task dependencies) | Basic (task pipelines) |
| **Code Generation**     | Extensive generators         | Minimal                |
| **Graph Visualization** | Interactive & detailed       | Basic                  |
| **Framework Support**   | Multiple frameworks          | Framework-agnostic     |
| **Plugin Ecosystem**    | Rich, official plugins       | Community plugins      |
| **Configuration**       | More complex                 | Simpler                |
| **Maturity**            | More mature                  | Newer                  |

### Nx vs. Lerna

| Aspect                   | Nx                       | Lerna                   |
| ------------------------ | ------------------------ | ----------------------- |
| **Focus**                | Complete build system    | Package management      |
| **Caching**              | Sophisticated caching    | Basic (with Lerna + Nx) |
| **Performance Features** | Many (affected, caching) | Limited                 |
| **Code Generation**      | Extensive                | None                    |
| **Visualization**        | Interactive graph        | None                    |
| **Scope**                | Full monorepo solution   | Package operations      |
| **Configuration**        | More involved            | Simpler                 |
| **Integration**          | Many frameworks & tools  | Any JavaScript          |

### Nx vs. Rush

| Aspect             | Nx                       | Rush                  |
| ------------------ | ------------------------ | --------------------- |
| **Origin**         | Nrwl                     | Microsoft             |
| **Focus**          | Developer experience     | Enterprise controls   |
| **Structure**      | Projects with boundaries | Packages              |
| **Caching**        | Local & cloud caching    | Local caching         |
| **Generators**     | Rich generator system    | Basic                 |
| **Extensibility**  | Plugin-based             | Config-based          |
| **Ecosystem**      | Multi-framework          | JavaScript/TypeScript |
| **Learning Curve** | Moderate                 | Steeper               |

## What Makes Nx Different?

Nx's key differentiators:

1. **Comprehensive Approach**: Combines dependency management, task running, and code generation in one cohesive system.

2. **Smart Computation Caching**: Extremely sophisticated caching system that understands project dependencies.

3. **Affected Commands**: Unique ability to only run tasks on projects affected by changes, based on the project graph.

4. **Code Generation**: Best-in-class generators for scaffolding new projects, features, and components.

5. **Visualization**: Interactive dependency graph visualization that helps understand project relationships.

6. **Enterprise Features**: Features like distributed task execution and remote caching for larger organizations.

7. **Framework Support**: Official plugins and support for multiple frontend and backend frameworks.

## Example Configuration

### Basic nx.json

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"]
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"]
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"]
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/jest.config.[jt]s",
      "!{projectRoot}/.eslintrc.json"
    ],
    "sharedGlobals": []
  }
}
```

### Project Configuration (project.json)

```json
{
  "name": "my-app",
  "projectType": "application",
  "sourceRoot": "apps/my-app/src",
  "prefix": "my-org",
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/my-app",
        "index": "apps/my-app/src/index.html",
        "main": "apps/my-app/src/main.ts",
        "polyfills": "apps/my-app/src/polyfills.ts",
        "tsConfig": "apps/my-app/tsconfig.app.json",
        "assets": ["apps/my-app/src/favicon.ico", "apps/my-app/src/assets"],
        "styles": ["apps/my-app/src/styles.scss"],
        "scripts": []
      },
      "configurations": {
        "production": {
          "fileReplacements": [
            {
              "replace": "apps/my-app/src/environments/environment.ts",
              "with": "apps/my-app/src/environments/environment.prod.ts"
            }
          ],
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "extractCss": true,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "2mb",
              "maximumError": "5mb"
            }
          ]
        }
      }
    },
    "serve": {
      "executor": "@nx/webpack:dev-server",
      "options": {
        "buildTarget": "my-app:build"
      },
      "configurations": {
        "production": {
          "buildTarget": "my-app:build:production"
        }
      }
    },
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["apps/my-app/**/*.ts", "apps/my-app/**/*.html"]
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/apps/my-app"],
      "options": {
        "jestConfig": "apps/my-app/jest.config.js",
        "passWithNoTests": true
      }
    }
  },
  "tags": ["type:app", "scope:client"]
}
```

## Best Practices

### 1. Structure Your Workspace Thoughtfully

```
my-workspace/
├── apps/               # Deployable applications
│   ├── web/            # Web application
│   └── api/            # API application
├── libs/               # Shared libraries
│   ├── feature/        # Feature libraries
│   ├── ui/             # UI component libraries
│   ├── util/           # Utility libraries
│   └── data-access/    # Data access libraries
├── tools/              # Workspace tools and scripts
├── nx.json             # Nx configuration
└── package.json        # Workspace dependencies
```

### 2. Use Tags for Enforcing Boundaries

```json
// .eslintrc.json
{
  "overrides": [
    {
      "files": ["*.ts"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "scope:shared",
                "onlyDependOnLibsWithTags": ["scope:shared"]
              },
              {
                "sourceTag": "scope:admin",
                "onlyDependOnLibsWithTags": ["scope:shared", "scope:admin"]
              },
              {
                "sourceTag": "scope:client",
                "onlyDependOnLibsWithTags": ["scope:shared", "scope:client"]
              },
              {
                "sourceTag": "type:feature",
                "onlyDependOnLibsWithTags": [
                  "type:ui",
                  "type:util",
                  "type:data-access"
                ]
              },
              {
                "sourceTag": "type:ui",
                "onlyDependOnLibsWithTags": ["type:ui", "type:util"]
              },
              {
                "sourceTag": "type:util",
                "onlyDependOnLibsWithTags": ["type:util"]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

### 3. Configure Computation Caching

```json
// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "runtimeCacheInputs": ["node -v"],
        "parallel": 3
      }
    }
  }
}
```

### 4. Organize Libraries by Type and Scope

```bash
# Generate feature library for client
nx g @nx/react:lib feature-user-profile --directory=libs/client/feature-user-profile --tags=scope:client,type:feature

# Generate UI library for shared components
nx g @nx/react:lib ui-buttons --directory=libs/shared/ui-buttons --tags=scope:shared,type:ui

# Generate utility library
nx g @nx/js:lib util-formatting --directory=libs/shared/util-formatting --tags=scope:shared,type:util
```

### 5. Set Up Affected Commands for CI

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches:
      - main
  pull_request:

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: nrwl/nx-set-shas@v3
      - run: npm ci
      - run: npx nx affected --target=lint
      - run: npx nx affected --target=test
      - run: npx nx affected --target=build
```

## Performance Optimization Strategies

### Local Computation Caching

```bash
# Enable local computation caching (default)
nx build my-app

# Clear local cache
nx reset

# View cache statisctics
nx report
```

### Remote Caching with Nx Cloud

```bash
# Set up Nx Cloud
npx nx connect-to-nx-cloud

# In nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx-cloud",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "accessToken": "your-nx-cloud-access-token"
      }
    }
  }
}
```

### Distributed Task Execution

```bash
# In nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx-cloud",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "accessToken": "your-nx-cloud-access-token",
        "distributedCaching": true,
        "parallel": 10
      }
    }
  }
}
```

### Dynamic Output Inputs for Better Caching

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": ["{projectRoot}/dist"]
    }
  },
  "namedInputs": {
    "production": [
      "default",
      "!{projectRoot}/**/*.spec.ts",
      "!{projectRoot}/jest.config.ts"
    ]
  }
}
```

## Real-World Examples

- [Carplates-Nx](https://github.com/av3000/carplates-nx): Demo monorepo project using Nx architecture
- [Nrwl/nx-examples](https://github.com/nrwl/nx-examples): Official examples from the Nx team
- [Tanstack query](https://github.com/TanStack/query/blob/main/package.json): Uses NX
- [Angular Material](https://github.com/angular/components): Uses Nx for workspace management
- [NestJS](https://github.com/nestjs/nest): Server-side framework using Nx for its monorepo
- [Ionic](https://github.com/ionic-team/ionic-framework): Uses Nx for monorepo management
- [Realworld example app](https://github.com/av3000/angular-ngrx-nx-realworld-example-app): Uses Angular 19, NgRx 18 and NX 20
- [Angular spotify app](https://github.com/av3000/angular-spotify): Uses Angular 15, NX, tailwind and ng-zorro

## Key Resources

- [Official Documentation](https://nx.dev/getting-started/intro)
- [Nx GitHub Repository](https://github.com/nrwl/nx)
- [Nx Community Slack](https://join.slack.com/t/nrwlcommunity/shared_invite/zt-1wkxy9e6p-8joqOUK0Wrw7QKrRk31n9w)
- [Nx Cloud](https://nx.app/)
- [Nx Console VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- [Free Nx Video Course](https://nx.dev/tutorials/tutorial-ecommerce)

## Current Status (2025)

Nx has established itself as a leading solution for large-scale monorepo management, particularly for complex web applications. While Turborepo has gained market share for simpler use cases, Nx continues to dominate in enterprises and organizations with complex polyglot repositories.

Key trends include:

1. **Focus on DX**: Continued improvements to developer experience and tooling
2. **Enterprise Adoption**: Growing use in large organizations with complex codebases
3. **Cloud Integration**: Enhanced remote caching and distributed execution features
4. **Architecture Support**: Better support for micro-frontends and microservices
5. **AI Integrations**: Machine learning features for project analysis and recommendations

The ecosystem has evolved to support a wide range of frameworks and technologies, making Nx a versatile choice for organizations looking to scale their development workflows while maintaining performance and consistency.
