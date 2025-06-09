# TanStack Query (React Query)

**Official Resources:**

- [**TanStack Query**](https://tanstack.com/query) - Official website and documentation
- [**GitHub Repository**](https://github.com/TanStack/query) - Source code and issues
- [**Examples**](https://tanstack.com/query/latest/docs/framework/react/examples/simple) - Official example projects
- [**Migration Guide**](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5) - Upgrading from React Query v3/v4
- [**Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router**](https://tanstack.com/query/latest/docs/framework/react/comparison)

## What is TanStack Query?

Powerful data synchronization library for web applications. Manages server state, caching, background updates, and synchronization between multiple components seamlessly.

## Why TanStack Query?

### Server State Management Made Simple

**What**: Automatically handles loading states, error states, caching, and background updates for all your API calls
**Why**: No more useState/useEffect boilerplate. Write one hook, get loading states, error handling, and caching for free.

```jsx
// Before: Manual state management
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchUser()
    .then(setUser)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);

// After: TanStack Query
const {
  data: user,
  isLoading,
  error,
} = useQuery({
  queryKey: ["user"],
  queryFn: fetchUser,
});
```

### Smart Caching & Background Updates

**What**: Automatically caches data and refetches in the background when data becomes stale
**Why**: Your app feels instant while staying fresh. Users see cached data immediately, updates happen behind the scenes.

### Optimistic Updates & Rollbacks

**What**: Update UI immediately, rollback automatically if the server request fails
**Why**: Apps feel responsive and snappy. No more waiting for server responses to update the UI.

### Built-in Performance Optimizations

**What**: Request deduplication, automatic garbage collection, window focus refetching
**Why**: Fewer network requests, better performance, always up-to-date data without manual optimization.

### Declarative Data Dependencies

**What**: Components automatically re-render when their data changes, pause when data isn't needed
**Why**: Perfect synchronization across your app. Change user data in one place, see updates everywhere.

## Core Principles

### Server State vs Client State

- **Server state**: Data from APIs, databases, external sources
- **Client state**: UI state, form inputs, toggles, local preferences
- **TanStack Query**: Manages server state, letting you focus on client state
- **Synchronization**: Keeps server state in sync across components

### Queries & Mutations

- **Queries**: Read operations (GET requests, data fetching)
- **Mutations**: Write operations (POST, PUT, DELETE requests)
- **Automatic invalidation**: Mutations can trigger query refetches
- **Optimistic updates**: Update UI before server confirms

### Caching Strategy

- **Cache by key**: Each query has a unique key for caching
- **Stale-while-revalidate**: Show cached data, fetch fresh data in background
- **Garbage collection**: Automatically cleanup unused cache entries
- **Persistence**: Optional cache persistence across browser sessions

## Core Concepts

### Queries

**Purpose**: Fetch and cache data from any asynchronous source
**Benefit**: Automatic loading states, error handling, caching, and background updates

```jsx
import { useQuery } from "@tanstack/react-query";

function UserProfile({ userId }) {
  const {
    data: user,
    isLoading,
    error,
    isStale,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <UserCard user={user} />;
}
```

_Query keys identify cached data. Include all variables that affect the query result._

### Query Keys

**Purpose**: Unique identifiers for cached data
**Benefit**: Automatic cache invalidation, data sharing between components

```jsx
// Simple key
useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

// Key with variables
useQuery({ queryKey: ["post", postId], queryFn: () => fetchPost(postId) });

// Complex key with filters
useQuery({
  queryKey: ["posts", { status: "published", author: userId }],
  queryFn: () => fetchPosts({ status: "published", author: userId }),
});
```

_Keys are JSON-serialized arrays. Include all variables that affect the query._

### Mutations

**Purpose**: Perform side effects (create, update, delete operations)
**Benefit**: Loading states, error handling, optimistic updates, cache invalidation

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePost() {
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: (newPost) => api.createPost(newPost),
    onSuccess: (data) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Or add to existing cache
      queryClient.setQueryData(["post", data.id], data);
    },
  });

  const handleSubmit = (postData) => {
    createPost.mutate(postData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={createPost.isPending}>
        {createPost.isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

_Mutations don't cache results but can update the cache manually._

### Query Client

**Purpose**: Central manager for all queries and cache
**Benefit**: Programmatic cache control, prefetching, manual updates

```jsx
import { useQueryClient } from "@tanstack/react-query";

function UserActions({ userId }) {
  const queryClient = useQueryClient();

  const refetchUser = () => {
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
  };

  const updateUserCache = (updates) => {
    queryClient.setQueryData(["user", userId], (old) => ({
      ...old,
      ...updates,
    }));
  };

  const prefetchUserPosts = () => {
    queryClient.prefetchQuery({
      queryKey: ["posts", { author: userId }],
      queryFn: () => fetchUserPosts(userId),
    });
  };

  return (
    <ActionButtons onRefresh={refetchUser} onPrefetch={prefetchUserPosts} />
  );
}
```

_Query client provides imperative API for cache management._

## Setup

### Installation & Provider

**Purpose**: Install TanStack Query and wrap your app with QueryClient
**Benefit**: Global cache and configuration for all queries

```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools # Optional dev tools
```

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

_QueryClientProvider makes the client available to all child components._

### Basic Configuration

**Purpose**: Set global defaults for queries and mutations
**Benefit**: Consistent behavior across your app without repeating options

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error.status === 404) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

_Set sensible defaults based on your app's needs. Override per query when needed._

## Query Patterns

### Dependent Queries

**Purpose**: Run queries that depend on results from other queries
**Benefit**: Automatic dependency management, efficient data loading

```jsx
function UserPosts({ userId }) {
  // First query - get user
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  // Second query - depends on user data
  const { data: posts } = useQuery({
    queryKey: ["posts", { author: user?.id }],
    queryFn: () => fetchUserPosts(user.id),
    enabled: !!user?.id, // Only run when user is loaded
  });

  return <PostList posts={posts} />;
}
```

_Use `enabled` option to control when queries run based on other data._

### Parallel Queries

**Purpose**: Run multiple independent queries simultaneously
**Benefit**: Faster loading by fetching data in parallel

```jsx
function Dashboard() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchRecentPosts,
  });

  const statsQuery = useQuery({
    queryKey: ["stats"],
    queryFn: fetchDashboardStats,
  });

  // All queries run in parallel
  if (userQuery.isLoading || postsQuery.isLoading || statsQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UserInfo user={userQuery.data} />
      <PostsList posts={postsQuery.data} />
      <Stats data={statsQuery.data} />
    </div>
  );
}
```

_Multiple useQuery calls in the same component run in parallel automatically._

### Infinite Queries

**Purpose**: Load paginated data with "load more" functionality
**Benefit**: Automatic page management, infinite scrolling, optimized UX

```jsx
import { useInfiniteQuery } from "@tanstack/react-query";

function PostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 0 }) => fetchPosts({ page: pageParam }),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length : undefined;
      },
    });

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
```

_Infinite queries handle pagination automatically. Pages are cached separately._

## Mutation Patterns

### Optimistic Updates

**Purpose**: Update UI immediately, rollback if server request fails
**Benefit**: Instant feedback, better perceived performance

```jsx
function ToggleLike({ postId, initialLiked }) {
  const queryClient = useQueryClient();

  const toggleLike = useMutation({
    mutationFn: (liked) => api.updatePost(postId, { liked }),

    // Optimistically update before request
    onMutate: async (newLiked) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      // Snapshot current value
      const previousPost = queryClient.getQueryData(["post", postId]);

      // Optimistically update
      queryClient.setQueryData(["post", postId], (old) => ({
        ...old,
        liked: newLiked,
        likeCount: old.likeCount + (newLiked ? 1 : -1),
      }));

      return { previousPost };
    },

    // Rollback on error
    onError: (err, newLiked, context) => {
      queryClient.setQueryData(["post", postId], context.previousPost);
    },

    // Refetch on success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  return (
    <button onClick={() => toggleLike.mutate(!initialLiked)}>
      {initialLiked ? "❤️" : "🤍"}
    </button>
  );
}
```

_Optimistic updates make apps feel instant while maintaining data consistency._

### Global Mutation States

**Purpose**: Share mutation loading states across components
**Benefit**: Global loading indicators, disable forms during mutations

```jsx
import { useIsMutating } from "@tanstack/react-query";

function GlobalLoadingIndicator() {
  const isMutating = useIsMutating();

  if (isMutating) {
    return <div className="global-spinner">Saving...</div>;
  }

  return null;
}

// Or check specific mutation types
function SaveIndicator() {
  const isSaving = useIsMutating({ mutationKey: ["updatePost"] });
  return isSaving ? <Spinner /> : null;
}
```

_Track mutations globally for better UX coordination._

## Advanced Features

### Query Invalidation

**Purpose**: Mark cached data as stale and trigger refetches
**Benefit**: Keep data fresh after mutations, selective cache updates

```jsx
const queryClient = useQueryClient();

// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ["post", postId] });

// Invalidate all posts
queryClient.invalidateQueries({ queryKey: ["posts"] });

// Invalidate with partial matching
queryClient.invalidateQueries({
  queryKey: ["posts"],
  exact: false, // Invalidates ['posts', ...anything]
});

// Invalidate with predicate
queryClient.invalidateQueries({
  predicate: (query) =>
    query.queryKey[0] === "posts" && query.queryKey[1]?.author === userId,
});
```

_Invalidation strategies help maintain data consistency across your app._

### Prefetching

**Purpose**: Load data before it's needed
**Benefit**: Instant navigation, better user experience

```jsx
function PostCard({ post }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch full post on hover
    queryClient.prefetchQuery({
      queryKey: ["post", post.id],
      queryFn: () => fetchFullPost(post.id),
      staleTime: 10 * 1000, // Only prefetch if not already fresh
    });
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
    </div>
  );
}
```

_Prefetch data on user interactions for perceived instant loading._

### Background Refetching

**Purpose**: Keep data fresh without showing loading states
**Benefit**: Always current data without disrupting user experience

```jsx
// Automatic background refetching
const { data: posts } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 30 * 1000, // Fresh for 30 seconds
  refetchInterval: 60 * 1000, // Background refetch every minute
  refetchOnWindowFocus: true, // Refetch when user returns to tab
  refetchOnReconnect: true, // Refetch when internet reconnects
});
```

_Configure automatic refetching based on your data's update frequency._

### Error Boundaries & Retry Logic

**Purpose**: Handle errors gracefully with automatic retries
**Benefit**: Resilient apps that recover from network issues

```jsx
const { data, error, isError } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  retry: (failureCount, error) => {
    // Don't retry on 4xx errors
    if (error.status >= 400 && error.status < 500) return false;
    // Retry up to 3 times for other errors
    return failureCount < 3;
  },
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});

// Global error boundary for React Query errors
function QueryErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        if (error.name === "ChunkLoadError") {
          window.location.reload();
        }
      }}
      fallback={<ErrorFallback />}
    >
      {children}
    </ErrorBoundary>
  );
}
```

_Smart retry logic and error boundaries make your app more resilient._

## Server-Side Rendering (SSR)

### Next.js Integration

**Purpose**: Hydrate client with server-fetched data
**Benefit**: SEO-friendly, faster initial page loads

```jsx
// pages/posts/[id].js
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", params.id],
    queryFn: () => fetchPost(params.id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function PostPage({ postId }) {
  // This will use the prefetched data
  const { data: post } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });

  return <PostDetail post={post} />;
}
```

_Server-side prefetching eliminates loading states on initial page load._

### Hydration Boundaries

**Purpose**: Handle SSR/client hydration mismatches
**Benefit**: Prevent hydration errors while maintaining SSR benefits

```jsx
import { Hydrate } from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
```

_Hydrate component ensures smooth transition from server to client state._

## Testing

### Testing Queries

**Purpose**: Test components that use TanStack Query
**Benefit**: Reliable tests that cover real data fetching scenarios

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

function renderWithClient(ui) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
}

test("displays user data", async () => {
  // Mock the API
  vi.mocked(fetchUser).mockResolvedValue({ id: "1", name: "John" });

  renderWithClient(<UserProfile userId="1" />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
```

_Create test-specific QueryClient with retry disabled for predictable tests._

### Mocking Mutations

**Purpose**: Test mutation behavior without making real API calls
**Benefit**: Fast, reliable tests for user interactions

```jsx
test("creates post on form submission", async () => {
  const mockMutate = vi.fn();
  vi.mocked(useMutation).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    isError: false,
  });

  renderWithClient(<CreatePostForm />);

  await user.type(screen.getByLabelText("Title"), "New Post");
  await user.click(screen.getByRole("button", { name: "Create" }));

  expect(mockMutate).toHaveBeenCalledWith({
    title: "New Post",
  });
});
```

_Mock mutations to test UI behavior without side effects._

## Performance Optimization

### Query Key Factories

**Purpose**: Consistent query keys across your app
**Benefit**: Easier invalidation, less typos, better organization

```jsx
// utils/queryKeys.js
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

// Usage
useQuery({
  queryKey: postKeys.detail(postId),
  queryFn: () => fetchPost(postId),
});

// Invalidation
queryClient.invalidateQueries({ queryKey: postKeys.lists() });
```

_Centralized key management prevents inconsistencies and simplifies cache operations._

### Selective Cache Updates

**Purpose**: Update specific cached data without full refetches
**Benefit**: Better performance, maintain scroll positions, preserve form state

```jsx
const updatePost = useMutation({
  mutationFn: updatePostApi,
  onSuccess: (updatedPost) => {
    // Update individual post cache
    queryClient.setQueryData(["post", updatedPost.id], updatedPost);

    // Update post in lists
    queryClient.setQueryData(["posts"], (old) =>
      old?.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  },
});
```

_Surgical cache updates avoid unnecessary network requests and UI flicker._

### Request Deduplication

**Purpose**: Prevent duplicate requests for the same data
**Benefit**: Reduced server load, faster response times

```jsx
// Multiple components can use the same query key
function UserProfile({ userId }) {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
  // Only one request will be made, even if multiple components mount
}

function UserPosts({ userId }) {
  const { data: user } = useQuery({
    queryKey: ["user", userId], // Same key = same cached data
    queryFn: () => fetchUser(userId),
  });
  // This will use the cached result from UserProfile
}
```

_TanStack Query automatically deduplicates requests with identical query keys._

## Best Practices & Patterns

### Error Handling Strategy

**Purpose**: Consistent error handling across your application
**Pattern**: Global error handler with component-specific overrides

```jsx
// Global error handler
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        if (error.status === 401) {
          redirectToLogin();
        } else if (error.status >= 500) {
          showGlobalErrorToast("Server error. Please try again.");
        }
      },
    },
  },
});

// Component-specific error handling
const { data, error } = useQuery({
  queryKey: ["user", userId],
  queryFn: fetchUser,
  onError: (error) => {
    // Handle user-specific errors
    if (error.status === 404) {
      navigate("/user-not-found");
    }
  },
});
```

_Combine global and local error handling for comprehensive coverage._

### Loading States

**Purpose**: Provide appropriate feedback for different loading scenarios
**Pattern**: Distinguish between initial loading and background refetching

```jsx
function PostList() {
  const {
    data: posts,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    // First time loading
    return <PostListSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      {isFetching && <RefreshIndicator />}
      <PostGrid posts={posts} />
    </div>
  );
}
```

_Different loading states provide better user experience and context._

### Cache Management

**Purpose**: Optimize memory usage and data freshness
**Pattern**: Configure cache times based on data volatility

```jsx
// Frequently changing data
const { data: notifications } = useQuery({
  queryKey: ["notifications"],
  queryFn: fetchNotifications,
  staleTime: 0, // Always considered stale
  cacheTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
});

// Rarely changing data
const { data: userSettings } = useQuery({
  queryKey: ["user-settings"],
  queryFn: fetchUserSettings,
  staleTime: 60 * 60 * 1000, // Fresh for 1 hour
  cacheTime: 24 * 60 * 60 * 1000, // Keep for 24 hours
});
```

_Match cache configuration to your data's update frequency and importance._

## Example Repositories & Resources

### Official Examples

- [**TanStack Query Examples**](https://tanstack.com/query/latest/docs/framework/react/examples/simple) - Official example projects
- [**TanStack Query GitHub**](https://github.com/TanStack/query) - Source code with comprehensive examples
- [**React Query Essentials Course**](https://ui.dev/c/react-query) - Official learning course

### Production Examples

- [**Cal.com**](https://github.com/calcom/cal.com) - Uses TanStack Query with tRPC for type-safe data fetching
- [**Bulletproof React**](https://github.com/alan2207/bulletproof-react) - Production architecture with TanStack Query
- [**Taxonomy**](https://github.com/shadcn/taxonomy) - Next.js 13 app using TanStack Query
- [**T3 Stack Examples**](https://github.com/t3-oss/create-t3-app) - TanStack Query + tRPC integration

### Learning Resources

- [**TanStack Query Docs**](https://tanstack.com/query/latest) - Comprehensive official documentation
- [**React Query in 100 Seconds**](https://www.youtube.com/watch?v=novnyCaa7To) - Quick overview video
- [**TkDodo's Blog**](https://tkdodo.eu/blog/practical-react-query) - In-depth React Query articles
- [**Query Key Factory Pattern**](https://tkdodo.eu/blog/effective-react-query-keys) - Advanced key management

### Community Resources

- [**React Query DevTools**](https://github.com/TanStack/query/tree/main/packages/react-query-devtools) - Essential debugging tools
- [**React Query Examples Collection**](https://github.com/tannerlinsley/react-query/tree/master/examples) - Community examples
- [**Awesome React Query**](https://github.com/sadeghbarati/awesome-react-query) - Curated resources and articles

### Integration Examples

- [**Next.js + React Query**](https://github.com/vercel/next.js/tree/canary/examples/with-react-query) - SSR integration
- [**React Query + Zustand**](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md) - State management combo
- [**React Query + React Hook Form**](https://react-hook-form.com/advanced-usage#ConnectwithReactQuery) - Forms integration
- [**React Query + Infinite Scroll**](https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll) - Pagination patterns

### Project Structure

```
src/
├── api/                    # API functions
│   ├── posts.js
│   ├── users.js
│   └── queryKeys.js       # Centralized query keys
├── hooks/                 # Custom query hooks
│   ├── usePosts.js
│   ├── useUsers.js
│   └── mutations/
│       ├── useCreatePost.js
│       └── useUpdateUser.js
├── components/
├── pages/
└── utils/
    ├── queryClient.js     # Query client setup
    └── api.js            # Base API configuration
```

### Development Workflow

1. **Define API functions** in separate modules
2. **Create custom hooks** that wrap useQuery/useMutation
3. **Establish query key patterns** for consistent cache management
4. **Set up global defaults** in QueryClient configuration
5. **Use React Query DevTools** for debugging and optimization

## Key Benefits

- **🔄 Automatic Synchronization**: Server state stays in sync across all components
- **⚡ Performance**: Smart caching, request deduplication, background updates
- **🎯 Developer Experience**: Eliminates useState/useEffect boilerplate for server state
- **🛡️ Resilience**: Built-in retry logic, error handling, and offline support
- **🚀 User Experience**: Optimistic updates, instant navigation with prefetching
- **📊 Observability**: Excellent dev tools for debugging and cache inspection
