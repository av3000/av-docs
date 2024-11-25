# NX - build system

Nx is a powerful build system optimized for managing monorepos, and it's often used in organizations that manage large-scale projects. Helps to manage multiple projects like frontend and backend in a single organized repository.

Nx organizes your monorepo into a workspace with `apps/` for applications and `libs/` for shared resources. This structure keeps everything clear, promotes reusability, and simplifies navigation.

## Why NX?

1. Unified workspace. Keeps our Angular, React, Node.js and other apps in one repo without chaos. FE and BE project under the same roof.

2. Smart builds. Knows what to rebuild and what to skip, changing a small part of the code does not waste time rebuilding everything.

3. Shared libraries. Share common utilities or components across your apps avoiding duplicate code and making updates faster.

4. Code analysis. Analyzes code dependencies and shows how apps and libraries are connected.

5. Powerful CLI and Extensions. Generate apps, libraries, and even CI/CD pipelines within a few commands. Plus supports tools like Jest, Cypress and ESLint.

---

### What is a Build System?

A **build system** automates the process of transforming source code into a final executable or deployable product. This includes steps like:

- Compiling code (TypeScript to JavaScript).
- Bundling and optimizing assets.
- Running tests and linters.
- Generating documentation or other outputs.

Nx is a build system because it handles these tasks for us, but it goes a step further by optimizing builds in a monorepo context.

---

### What is a Monorepo?

A **monorepo** (short for _monolithic repository_) is a single code repository that contains multiple projects, which may include:

- Applications (frontend, backend).
- Shared libraries.
- Tools or configurations.

### Advantages of a Monorepo:

- **Code Sharing**: Easy to share code between projects (common utility libraries).
- **Consistent Tooling**: Single configuration for tools like ESLint, Prettier, or Jest.
- **Atomic Changes**: Easier to make and test changes that affect multiple projects.
- **Better Collaboration**: All code lives in one place, reducing duplication and improving visibility.

### Challenges of a Monorepo:

- **Scalability**: Large codebases can make builds slow if not managed correctly.
- **Complexity**: Dependencies and relationships between projects can get complicated.

---

### How is Nx Optimized for Monorepos?

Nx provides tools to overcome the challenges of monorepos by focusing on **efficiency, scalability, and maintainability**.

#### Key Optimizations:

1. **Project Graph**:

   - Nx analyzes the relationships between projects in the monorepo, such as dependencies between apps and libraries.
   - This graph ensures only the projects that depend on a change are built or tested, instead of rebuilding everything.

2. **Affected Command**:

   - Nx runs commands (e.g., `build`, `test`, `lint`) only for the **affected projects** when changes are made.
   - This saves time and resources in large codebases.

3. **Caching**:

   - Nx caches the results of build steps (e.g., `build`, `test`, or `lint` outputs) locally or remotely.
   - If a project hasn't changed, Nx retrieves the result from the cache instead of re-running the build process.

4. **Distributed Task Execution (DTE)**:
   - Nx can distribute tasks (e.g., building, testing) across multiple CI/CD agents or machines in parallel, reducing overall build times.

---

### Example Plugins for Popular Frameworks

Nx comes with a variety of plugins that integrate popular frameworks and tools into your workflow. These plugins provide pre-configured setups, optimized configurations, and commands tailored for specific frameworks.

#### Framework Examples:

- **Angular** (`@nrwl/angular`): For building Angular applications.
- **React** (`@nrwl/react`): For React applications, including support for Next.js.
- **Node.js** (`@nrwl/node`): For backend services using Express.js or other Node frameworks.
- **NestJS** (`@nrwl/nest`): For building backend applications with NestJS.

#### Tool Examples:

- **Jest**: For unit and integration testing.
- **ESLint**: For linting and code quality checks.
- **Cypress**: For end-to-end testing.
- **Storybook**: For UI component documentation and testing.

Nx allows you to manage these tools easily, ensuring they work seamlessly across all projects in the monorepo.

---

### Advanced CI Capabilities: Caching and Distribution

Nx provides advanced features to improve CI/CD pipelines, especially for monorepos with large codebases.

#### Caching:

- **What can be cached?**
  - Results of builds, tests, and linting.
  - Example: If a library was already built and hasn't changed, Nx will use the cached result instead of rebuilding it.
- **Local Cache**: Cached results are stored locally on the developer's machine.
- **Remote Cache**: Nx can integrate with remote storage (e.g., AWS S3, Google Cloud) to share cached results across the team or CI agents.

#### Distributed Task Execution (DTE):

- Nx can distribute tasks (builds, tests) across multiple CI agents or machines.
- **What can be distributed?**
  - Any task that can run independently (building an app, running unit tests for a specific library).
- **How does it work?**
  - Nx splits tasks into chunks and assigns them to different agents/machines to execute in parallel, significantly speeding up CI/CD pipelines.

---

Monorepos (short for "monolithic repositories") are a way to organize code where multiple projects, such as applications, libraries, and tools, are stored in a single repository. While monorepos offer numerous benefits, they also present challenges. Tools like **Nx** are designed to address these challenges and make working with monorepos efficient.

---

### Benefits of Monorepos

1. **Code Sharing and Reusability**

   - Code can be shared easily between projects without publishing to a package registry (e.g., NPM).
   - Encourages the creation of reusable libraries that can be consumed by multiple apps within the repo.

2. **Consistency and Standardization**

   - Centralizes configuration and tooling (e.g., ESLint, Prettier, CI pipelines), ensuring consistency across all projects.
   - Developers use the same build, lint, and test scripts, reducing context switching.

3. **Single Source of Truth**

   - All projects and dependencies are in one place, simplifying dependency management.
   - Developers can make changes across projects atomically, reducing integration issues.

4. **Improved Collaboration**

   - Developers work in the same repository, which improves visibility and coordination.
   - Easier to refactor or propagate changes across multiple projects.

5. **Easier Dependency Management**

   - Dependencies between projects can be tracked and updated internally, without relying on external package management.

6. **Atomic Commits**
   - Changes that span multiple projects can be committed together, ensuring everything stays in sync.

---

### Challenges of Monorepos

1. **Scalability**

   - As the codebase grows, managing builds, tests, and dependencies becomes increasingly complex.
   - Running tasks (e.g., builds, tests) across all projects can be time-consuming.

2. **Dependency Tracking**

   - Managing dependencies and ensuring compatibility between interdependent projects can be tricky.

3. **Tooling**

   - Traditional tools may not scale well with large monorepos or handle dependency graphs efficiently.

4. **Developer Experience**

   - Navigating a large repository and working on specific projects can feel overwhelming without proper tooling.

5. **Performance**
   - Running builds or tests for all projects (even those unrelated to recent changes) can waste time and resources.

---

### How Nx Addresses These Challenges

Nx is a powerful build system and development tool tailored for managing monorepos. Here’s how Nx solves the challenges of monorepos:

#### Dependency Graphs and Affected Commands

- Nx automatically analyzes the dependency graph of the monorepo.
- It can determine which projects are affected by a code change, allowing you to run builds, tests, and linting only on impacted projects instead of the entire repo.

#### Task Scheduling and Caching

- Nx implements **computation caching**:
  - It caches the results of builds, tests, and linting. If nothing has changed, Nx reuses the cached results, drastically improving performance.
- Nx also supports **distributed task execution**, enabling parallel execution of tasks across multiple machines in a CI environment.

#### Modularization and Code Sharing

- Nx encourages creating small, reusable libraries instead of large, monolithic apps.
- With Nx, dependencies between libraries and applications are explicitly defined, making it easy to share and reuse code.

#### Consistent Tooling

- Nx integrates with popular frameworks like Angular, React, Node.js, and more, providing standardized tooling out of the box.
- It centralizes configuration for testing, linting, formatting, and building, ensuring consistency across all projects.

#### Extensibility and Plugins

- Nx has a rich ecosystem of plugins for different technologies (e.g., Angular, React, Next.js, NestJS, etc.).
- It also allows custom plugins to extend its functionality for unique use cases.

#### Scalability

- Nx is designed to scale to large codebases with many projects and contributors.
- It uses tools like project boundaries and dependency constraints to enforce structure and maintainability in large monorepos.

#### Developer Experience

- Nx provides interactive CLI tools, such as `nx graph` for visualizing dependencies.
- Its `nx console` extension for VS Code offers an intuitive UI for running tasks and commands.
- Focused commands like `nx build <project>` or `nx test <project>` help developers target specific areas without overwhelming them with unrelated code.

Nx makes monorepos an attractive choice by addressing their challenges. It optimizes performance with caching and affected commands, enforces modularity and maintainability, and simplifies developer workflows with powerful tooling and plugins. By using Nx, teams can unlock the full potential of monorepos while avoiding the pitfalls that often come with managing large repositories.

---

### Example Interview Q&A

#### Q: What makes Nx a build system, and how does it handle builds in a monorepo?

- **A:** Nx is a build system because it automates tasks like building, testing, and linting. It handles builds in a monorepo by using a project graph to identify dependencies and run tasks only for affected projects. This makes builds more efficient.

#### Q: How does Nx handle caching?

- **A:** Nx caches the outputs of tasks (build, test, lint) locally or remotely. If a task's input hasn't changed, Nx retrieves the cached result instead of re-running the task. This saves time, especially in large monorepos.

#### Q: What are the benefits of Distributed Task Execution in Nx?

- **A:** Distributed Task Execution allows Nx to run tasks (like builds or tests) across multiple machines or CI agents in parallel. This reduces overall execution time, which is crucial for large monorepos with many interdependent projects.

#### Q: Can you give an example of an Nx plugin and what it does?

- **A:** The `@nrwl/angular` plugin provides tooling for Angular applications, such as generating components, configuring tests, and optimizing builds. It integrates Angular's CLI with Nx's monorepo capabilities.

#### Q: Why are monorepos beneficial, and how does Nx address their challenges?

- **A:** Monorepos simplify code sharing, collaboration, and tooling consistency. However, they can be slow to build and test. Nx addresses these challenges with features like a project graph, affected commands, caching, and distributed execution.
