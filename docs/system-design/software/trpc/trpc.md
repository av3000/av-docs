# tRPC

## What is tRPC?

Type-safe RPC (Remote Procedure Call) framework for TypeScript. Call server functions directly from your client with full type safety.

### Project Structure

```
src/
├── server/
│   ├── routers/          # Domain-specific routers
│   │   ├── user.ts
│   │   ├── post.ts
│   │   └── index.ts      # Main app router
│   ├── middleware/       # Auth, logging, etc.
│   └── context.ts        # Context creation
├── utils/
│   └── trpc.ts          # Client setup
└── pages/
    └── api/
        └── trpc/
            └── [trpc].ts # Next.js adapter
```

### Development Workflow

1. **Define procedures** on server with input validation
2. **Export router type** for client inference
3. **Use procedures** in components with full type safety
4. **Iterate quickly** - no build steps, immediate feedback

## Key Benefits Summary

- **🔒 Type Safety**: Server changes break client builds, not production
- **⚡ Developer Experience**: No codegen, no build steps, instant feedback
- **🚀 Performance**: Request batching, smart caching, optimistic updates
- **📦 Minimal Bundle**: Small runtime, tree-shakeable, no bloat
- **🔌 Framework Agnostic**: Works with React, Vue, Svelte, vanilla JS
- **🛠️ Production Ready**: Used by major companies, battle-tested

## Why tRPC?

### Automatic Type Safety

**What**: Made a server-side change? TypeScript will warn you of errors on your client before you even save the file!
**Why**: No more runtime errors from API changes. Refactor server code and instantly see what breaks on the frontend.

```typescript
// Server: Change user.name to user.fullName
const getUser = t.procedure.query(() => ({ id: "1", fullName: "John" }));

// Client: TypeScript immediately shows error
const { data } = trpc.getUser.useQuery();
console.log(data.name); // ❌ Property 'name' does not exist
console.log(data.fullName); // ✅ Works
```

### No REST Boilerplate

**What**: Call server functions like local functions - no endpoints, no fetch(), no manual typing
**Why**: Eliminate HTTP status codes, URL paths, request/response mapping. Focus on business logic, not API plumbing.

```typescript
// Instead of this REST approach:
const response = await fetch("/api/users/123");
const user: User = await response.json(); // Hope it's actually a User!

// You write this:
const user = await trpc.getUser.query({ id: "123" }); // Guaranteed to be correct type
```

### Snappy Developer Experience

**What**: No build or compile steps, meaning no code generation, runtime bloat or build step
**Why**: Change server code, immediately use it on client. No waiting for codegen, no generated files to commit.

### End-to-End Type Safety

**What**: From database to UI components, your data shapes are consistent and validated
**Why**: Catch bugs at compile time instead of production. Confident refactoring across your entire stack.

## Core Principles

### Type Safety Without Overhead

- **Server procedures** define input/output types
- **Client automatically infers** these types from server code
- **No manual interfaces** or duplicate type definitions
- **Runtime validation** with compile-time safety

### RPC Over HTTP

- **Direct function calls** instead of REST endpoints
- **Automatic serialization** handles complex data types
- **Built-in error handling** with structured error codes
- **Batching** multiple calls into single HTTP request

## Architecture

### Router

**Purpose**: Central definition of your API - like a service layer you can call from anywhere
**Benefit**: One source of truth for what your API can do

```typescript
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.query(() => "Hello World"),
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => ({ id: input.id, name: "John" })),
});

export type AppRouter = typeof appRouter;
```

_This router becomes your entire API contract. Export the type to enable client-side inference._

### Procedures

**Purpose**: The actual functions your client can call
**Benefit**: Think in terms of "what can users do" rather than "what endpoints exist"

```typescript
const router = t.router({
  // Query - for reading data (safe to retry, cache)
  getPost: t.procedure
    .input(z.string())
    .query(({ input }) => getPostById(input)),

  // Mutation - for changing data (has side effects)
  createPost: t.procedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ input }) => createPost(input)),
});
```

_Queries vs mutations mirror the GET vs POST distinction but with semantic meaning._

### Context

**Purpose**: Dependency injection for your procedures
**Benefit**: Access request data, database connections, user auth without prop drilling

```typescript
const createContext = ({ req, res }: { req: Request; res: Response }) => ({
  user: req.user,
  db: prisma,
});

const t = initTRPC.context<typeof createContext>().create();
```

_Created fresh for each request. Perfect place for user sessions, database connections, etc._

### Middleware

**Purpose**: Cross-cutting concerns like authentication, logging, rate limiting
**Benefit**: Write once, apply to many procedures. Composable and reusable.

```typescript
const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new Error("Unauthorized");
  return next({ ctx: { ...ctx, user: ctx.user } });
});

const protectedProcedure = t.procedure.use(authMiddleware);
```

_Middleware can transform context, validate permissions, or short-circuit with errors._

## Server Setup

### Purpose

Make your router available over HTTP. Different adapters for different frameworks.

### Next.js API Route

**Benefit**: Zero-config setup in Next.js projects

```typescript
// pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/router";

export default createNextApiHandler({
  router: appRouter,
  createContext: ({ req, res }) => ({ req, res }),
});
```

_Catch-all route handles all tRPC requests. Next.js handles the HTTP details._

### Express

**Benefit**: Integrate with existing Express applications

```typescript
import { createExpressMiddleware } from "@trpc/server/adapters/express";

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => ({ req, res }),
  })
);
```

_Mount as middleware. Existing routes continue working normally._

## Client Setup

### Purpose

Transform your router type into callable functions with full IntelliSense.

### React Query Integration

**Why React Query**: Gives you caching, background updates, optimistic updates, and loading states for free
**Result**: Production-ready data fetching with minimal code

```typescript
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "~/server/router";

export const trpc = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "/api/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MyComponent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

_Setup once, use everywhere. Every component gets access to type-safe server functions._

### Vanilla Client

**When to use**: Node.js scripts, non-React apps, or when you want direct control

```typescript
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
});

// Usage - looks exactly like calling server functions
const result = await client.hello.query();
const user = await client.getUser.query({ id: "1" });
```

_Direct async/await interface. Great for scripts or server-to-server communication._

## Client Usage

### Queries

**Purpose**: Fetch data with smart caching and automatic background updates
**Benefit**: Your UI stays fresh without manual cache management

```typescript
// Automatic loading states, error handling, and caching
const { data, isLoading, error } = trpc.getUser.useQuery({ id: "1" });

// Fine-tune caching behavior
const { data } = trpc.getPosts.useQuery(undefined, {
  refetchInterval: 5000, // Keep data fresh
  staleTime: 1000 * 60, // Don't refetch if data is < 1 minute old
});

// Programmatic cache control
const utils = trpc.useContext();
utils.getUser.invalidate({ id: "1" }); // Force refetch this user
```

_React Query handles all the complexity. You get loading states, error boundaries, and smart caching._

### Mutations

**Purpose**: Change server data and keep UI in sync
**Pattern**: Mutate → invalidate related queries → UI updates automatically

```typescript
const createUser = trpc.createUser.useMutation({
  onSuccess: () => {
    // Automatically refresh user list in all components
    utils.getUsers.invalidate();
  },
});

// Trigger the mutation
createUser.mutate({ name: "John", email: "john@example.com" });
```

_One mutation can update multiple parts of your UI by invalidating related queries._

### Subscriptions

**Purpose**: Real-time updates pushed from server to client
**Use cases**: Live comments, notifications, collaborative editing, live data feeds

```typescript
// Server - create real-time data stream
const router = t.router({
  onPostAdd: t.procedure.subscription(() => {
    return observable<Post>((emit) => {
      const unsubscribe = eventEmitter.on("post-add", emit.next);
      return unsubscribe;
    });
  }),
});

// Client - receive live updates
trpc.onPostAdd.useSubscription(undefined, {
  onData: (post) => {
    // New post appears instantly in UI
    queryClient.setQueryData(["posts"], (old) => [...old, post]);
  },
});
```

_WebSocket-like functionality with the same type safety as queries and mutations._

## Input Validation

**Purpose**: Ensure data integrity and provide TypeScript types
**Benefit**: Runtime safety + compile-time types from a single schema

```typescript
import { z } from "zod";

const router = t.router({
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(1, "Name required"),
        email: z.string().email("Invalid email"),
        age: z.number().min(18, "Must be adult").optional(),
      })
    )
    .mutation(({ input }) => {
      // input is validated AND fully typed
      // TypeScript knows: input.name is string, input.age is number | undefined
      return createUser(input);
    }),
});
```

_Zod schema validates incoming data and generates TypeScript types. One definition, two benefits._

## Error Handling

**Purpose**: Structured, type-safe error handling across your application
**Benefit**: Handle specific error cases instead of generic "something went wrong"

```typescript
import { TRPCError } from "@trpc/server";

const router = t.router({
  getUser: t.procedure.input(z.string()).query(({ input }) => {
    const user = findUser(input);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
        cause: originalError, // Optional: include underlying error
      });
    }
    return user;
  }),
});

// Client gets structured error information
const { data, error } = trpc.getUser.useQuery("invalid-id");
if (error?.data?.code === "NOT_FOUND") {
  // Show "user not found" UI
} else if (error?.data?.code === "UNAUTHORIZED") {
  // Redirect to login
}
```

_Errors carry semantic meaning. Client can respond appropriately to different error types._

## Advanced Patterns

### Nested Routers

**Purpose**: Organize large APIs into logical groups
**Benefit**: Better code organization and cleaner client usage

```typescript
const userRouter = t.router({
  get: t.procedure.input(z.string()).query(({ input }) => getUser(input)),
  create: t.procedure
    .input(userSchema)
    .mutation(({ input }) => createUser(input)),
  delete: t.procedure
    .input(z.string())
    .mutation(({ input }) => deleteUser(input)),
});

const appRouter = t.router({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
});

// Client usage follows the structure
const user = trpc.user.get.useQuery("123");
const post = trpc.post.create.useMutation();
```

_Organize by domain, not by HTTP verbs. Think "user operations" not "GET /users"._

### Server-Side Rendering

**Purpose**: Load data on the server for faster initial page loads
**Benefit**: SEO-friendly, faster perceived performance

```typescript
// Next.js getServerSideProps
export async function getServerSideProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
  });

  // Prefetch data on server
  await helpers.getUser.prefetch("1");
  await helpers.getPosts.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(), // Pass data to client
    },
  };
}
```

_Page loads with data already available. No loading spinners for critical content._

### Optimistic Updates

**Purpose**: Update UI immediately for better perceived performance
**When**: Actions that usually succeed (like saving a draft, liking a post)

```typescript
const createPost = trpc.createPost.useMutation({
  onMutate: async (newPost) => {
    // Cancel outgoing requests to avoid race conditions
    await utils.getPosts.cancel();

    // Snapshot current data for rollback
    const previousPosts = utils.getPosts.getData();

    // Optimistically update the UI
    utils.getPosts.setData(undefined, (old) => [
      ...(old ?? []),
      { ...newPost, id: "optimistic-id", status: "pending" },
    ]);

    return { previousPosts };
  },
  onError: (err, newPost, context) => {
    // Something went wrong - rollback the optimistic update
    utils.getPosts.setData(undefined, context?.previousPosts);
  },
  onSettled: () => {
    // Always refetch to ensure consistency
    utils.getPosts.invalidate();
  },
});
```

_UI feels instant. If the request fails, automatically rolls back to previous state._

## Performance Features

### Request Batching

**What**: Multiple tRPC calls get combined into a single HTTP request
**Benefit**: Reduce network overhead, especially on slow connections

```typescript
// These three calls happen simultaneously...
const user = trpc.getUser.useQuery({ id: "1" });
const posts = trpc.getPosts.useQuery();
const comments = trpc.getComments.useQuery({ postId: "123" });

// ...but only generate one HTTP request
```

_Automatic batching reduces network chattiness without changing your code._

### Links System

**Purpose**: Customize how requests are sent (logging, auth, retries, etc.)
**Benefit**: Cross-cutting concerns handled at the transport layer

```typescript
import { httpBatchLink, loggerLink, splitLink } from "@trpc/client";

const client = trpc.createClient({
  links: [
    // Log requests in development
    loggerLink({
      enabled: (opts) => process.env.NODE_ENV === "development",
    }),
    // Route different operations to different transports
    splitLink({
      condition: (op) => op.type === "subscription",
      true: wsLink({ url: "ws://localhost:3001" }), // WebSocket for real-time
      false: httpBatchLink({ url: "/api/trpc" }), // HTTP for regular calls
    }),
  ],
});
```

_Compose behaviors like middleware. Add authentication, retry logic, or custom routing._

## Migration & Integration

### From REST APIs

**Strategy**: Gradual migration - run tRPC alongside existing REST endpoints
**Benefit**: Migrate page by page, not all at once

```typescript
// Keep existing REST endpoints
app.get("/api/legacy/users", legacyHandler);

// Add tRPC for new features
app.use("/api/trpc", createExpressMiddleware({ router: appRouter }));

// Client can use both
const legacyData = await fetch("/api/legacy/users");
const newData = await trpc.getUsers.query(); // New tRPC call
```

### With Existing Validation

**Strategy**: Reuse existing Zod schemas or validation logic
**Benefit**: Don't duplicate validation rules

```typescript
// Existing validation schemas
import { userCreateSchema } from "./validation/user";

const router = t.router({
  createUser: t.procedure
    .input(userCreateSchema) // Reuse existing schema
    .mutation(({ input }) => userService.create(input)),
});
```

## Best Practices & References

### Example Repositories

**Production Examples:**

- [**create-t3-app**](https://github.com/t3-oss/create-t3-app) - Next.js + tRPC + Prisma starter
- [**cal.com**](https://github.com/calcom/cal.com) - Large-scale production app using tRPC
- [**documenso**](https://github.com/documenso/documenso) - Document signing platform
- [**dub.co**](https://github.com/dubinc/dub) - Link shortening service

**Learning Examples:**

- [**tRPC Examples**](https://github.com/trpc/examples-next-prisma-starter) - Official starter templates
- [**tRPC Kitchen Sink**](https://github.com/trpc/examples-kitchen-sink) - Comprehensive feature examples
- [**Chatty**](https://github.com/KATT/chatty) - Real-time chat with subscriptions
