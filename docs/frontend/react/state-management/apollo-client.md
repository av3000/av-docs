# Apollo Client

[apollographql.com/docs/react](https://www.apollographql.com/docs/react)

## Why Apollo Client over Fetch/Axios?

Traditional REST API calls with fetch/axios require manual state management for loading states, error handling, and caching. Apollo Client provides declarative data fetching with automatic caching, optimistic updates, and real-time subscriptions out of the box.

## Key Benefits

- **[Declarative data fetching](#minimal-setup---3-steps)**: Describe what data you need, not how to fetch it
- **[Automatic caching](#cache-management)**: Intelligent cache that shares data across components
- **[Real-time updates](#subscriptions-real-time-updates)**: Subscriptions for live data without manual polling
- **[Optimistic UI](#optimistic-updates)**: Immediate feedback before server confirmation
- **[Error handling](#error-handling)**: Built-in error states and recovery mechanisms
- **[Developer tools](#developer-tools)**: Excellent debugging with Apollo DevTools
- **[Type safety](#type-safety-with-code-generation)**: Full TypeScript support with generated types
- **[Offline support](#cache-management)**: Cache-first strategies work without network
- **[Performance](#cache-management)**: Request deduplication and automatic batching

## Example Repositories

Here are excellent Apollo Client + React example repositories:

### Official & Tutorial Examples

- **[HowToGraphQL React Apollo Tutorial](https://github.com/howtographql/react-apollo)** - Complete step-by-step tutorial with both client and server setup. Perfect for beginners learning the full GraphQL stack.
- **[Apollo Client Main Repository](https://github.com/apollographql/apollo-client)** - Official Apollo Client repo with comprehensive examples and latest features.

### GitHub API Integration Examples

- **[React GraphQL GitHub Apollo](https://github.com/the-road-to-graphql/react-graphql-github-apollo)** - Full-featured GitHub client demonstrating real-world Apollo patterns with authentication, queries, mutations, and UI components.
- **[React Apollo Client Example](https://github.com/the-road-to-graphql/react-apollo-client-example)** - Minimal boilerplate showing Apollo for remote data + React state for local data. Great starting point for new projects.
- **[GitHub Top JS Repos](https://github.com/dipiash/react-apollo-github-top-js-repos)** - Clean example with hooks, testing, and modern patterns. Includes search, filtering, and pagination.

### TypeScript & Full-Stack Examples

- **[Dasher (Cole Bemis)](https://github.com/colebemis/dasher)** - Production-ready example with React + TypeScript + GraphQL Code Generator. Shows advanced patterns like fragments and optimized queries.

### Key Features Demonstrated

- ✅ Apollo Client setup and configuration
- ✅ useQuery, useMutation, useSubscription hooks
- ✅ TypeScript integration with code generation
- ✅ Authentication and error handling
- ✅ Cache management and optimistic updates
- ✅ Real-time subscriptions
- ✅ Pagination and infinite loading
- ✅ Testing strategies
- ✅ Project structure and best practices

### The Fetch Problem - Manual State Management

```tsx
// Problem: Manual loading states, error handling, and caching
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const newUser = await response.json();

      // Manual cache update - easy to forget or mess up
      setUsers((prev) => [...prev, newUser]);

      // Need to refetch to ensure consistency
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Problems:
  // 1. Repetitive loading/error state management
  // 2. Manual cache invalidation
  // 3. No optimistic updates
  // 4. Race conditions possible
  // 5. No real-time updates
  // 6. Data duplicated across components
}
```

### Apollo Solution - Declarative Data Management

```tsx
// Solution: Declarative queries with automatic caching
function UsersList() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER, {
    update: (cache, { data: { createUser } }) => {
      // Automatic cache update
      cache.modify({
        fields: {
          users(existingUsers = []) {
            return [...existingUsers, createUser];
          },
        },
      });
    },
  });

  // Automatic loading states, error handling, and caching
  // Optimistic updates and real-time subscriptions available
  // Data shared across all components automatically
}
```

## Minimal Setup - 3 Steps

```tsx
// Install: npm install @apollo/client graphql

// 1. Create client
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
});

// 2. Create query hook
import { useQuery, gql } from "@apollo/client";

const exchangeRatesQuery = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const useExchangeRates = () => useQuery(exchangeRatesQuery);

// 3. Use in component
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client as apolloClient } from "./apolloClient";
import { useExchangeRates } from "./hooks/useExchangeRates";

export const App = () => {
  const { data, loading } = useExchangeRates();

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      {data.rates.map((rate) => (
        <div key={rate.currency}>
          {rate.currency}: {rate.rate}
        </div>
      ))}
    </div>
  );
};

export const AppContainer = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};
```

## Advanced Setup (with Auth & Type Policies)

```tsx
// apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          posts: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
```

## Basic Queries

```tsx
// queries/users.ts
import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      avatar
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      bio
      posts {
        id
        title
        createdAt
      }
    }
  }
`;

// Component usage
import { useQuery } from "@apollo/client";

function UsersList() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {data.users.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt={user.name} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

// Query with variables
function UserProfile({ userId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, // Skip query if no userId
    errorPolicy: "all", // Return partial data on error
    fetchPolicy: "cache-first", // Use cache if available
  });

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error loading user: {error.message}</div>;
  if (!data?.user) return <div>User not found</div>;

  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.bio}</p>
      <div>
        <h2>Posts ({data.user.posts.length})</h2>
        {data.user.posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}
```

## Mutations

```tsx
// mutations/users.ts
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      avatar
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      bio
      avatar
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// Component usage
import { useMutation } from "@apollo/client";

function CreateUserForm() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    // Update cache after mutation
    update: (cache, { data: { createUser } }) => {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: createUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  name
                  email
                  avatar
                  createdAt
                }
              `,
            });
            return [...existingUsers, newUserRef];
          },
        },
      });
    },
    // Refetch queries after mutation
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: (data) => {
      console.log("User created:", data.createUser);
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });

  const handleSubmit = async (formData) => {
    try {
      const { data } = await createUser({
        variables: { input: formData },
      });
      // Handle success
    } catch (err) {
      // Error already handled by onError
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}
```

## Optimistic Updates

```tsx
// Optimistic UI - immediate feedback before server response
function LikeButton({ postId, isLiked, likeCount }) {
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: { postId },
    optimisticResponse: {
      toggleLike: {
        __typename: "Post",
        id: postId,
        isLiked: !isLiked,
        likeCount: isLiked ? likeCount - 1 : likeCount + 1,
      },
    },
    update: (cache, { data: { toggleLike } }) => {
      cache.modify({
        id: cache.identify({ __typename: "Post", id: postId }),
        fields: {
          isLiked: () => toggleLike.isLiked,
          likeCount: () => toggleLike.likeCount,
        },
      });
    },
  });

  return (
    <button onClick={() => toggleLike()}>
      {isLiked ? "❤️" : "🤍"} {likeCount}
    </button>
  );
}

// Delete with optimistic update
function DeletePostButton({ postId }) {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: postId },
    optimisticResponse: {
      deletePost: {
        __typename: "Post",
        id: postId,
      },
    },
    update: (cache) => {
      // Remove from cache immediately
      cache.evict({ id: cache.identify({ __typename: "Post", id: postId }) });
      cache.gc(); // Garbage collect orphaned references
    },
  });

  return <button onClick={() => deletePost()}>Delete Post</button>;
}
```

## Subscriptions (Real-time Updates)

```tsx
// subscriptions/messages.ts
import { gql } from "@apollo/client";

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      id
      content
      user {
        id
        name
        avatar
      }
      createdAt
    }
  }
`;

export const USER_ONLINE_STATUS = gql`
  subscription UserOnlineStatus {
    userOnlineStatus {
      userId
      isOnline
      lastSeen
    }
  }
`;

// Component usage
import { useSubscription } from "@apollo/client";

function ChatRoom({ chatId }) {
  const { data: messages, loading } = useQuery(GET_MESSAGES, {
    variables: { chatId },
  });

  // Subscribe to new messages
  const { data: newMessage } = useSubscription(MESSAGE_ADDED, {
    variables: { chatId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      // Update cache when new message arrives
      client.cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = client.cache.writeFragment({
              data: subscriptionData.data.messageAdded,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  content
                  user {
                    id
                    name
                    avatar
                  }
                  createdAt
                }
              `,
            });
            return [...existingMessages, newMessageRef];
          },
        },
      });
    },
  });

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      {messages?.messages.map((message) => (
        <div key={message.id}>
          <strong>{message.user.name}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
}

// Multiple subscriptions
function OnlineUsers() {
  const { data } = useSubscription(USER_ONLINE_STATUS, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { userId, isOnline, lastSeen } =
        subscriptionData.data.userOnlineStatus;

      // Update user's online status in cache
      client.cache.modify({
        id: client.cache.identify({ __typename: "User", id: userId }),
        fields: {
          isOnline: () => isOnline,
          lastSeen: () => lastSeen,
        },
      });
    },
  });

  return <div>Real-time online status updates</div>;
}
```

## Error Handling

```tsx
// Global error handling
import { onError } from "@apollo/client/link/error";

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      console.log(`Network error: ${networkError}`);

      // Handle authentication errors
      if (networkError.statusCode === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }
);

// Component-level error handling
function UserProfile({ userId }) {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: userId },
    errorPolicy: "all", // Return partial data even with errors
    notifyOnNetworkStatusChange: true,
  });

  // Custom error boundary
  if (error) {
    return (
      <div className="error-container">
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>

        {/* Show partial data if available */}
        {data?.user && (
          <div className="partial-data">
            <p>Showing cached data:</p>
            <h4>{data.user.name}</h4>
          </div>
        )}
      </div>
    );
  }

  return <div>{/* Normal component rendering */}</div>;
}

// Mutation error handling
function UpdateUserForm({ userId }) {
  const [updateUser, { loading, error, reset }] = useMutation(UPDATE_USER, {
    errorPolicy: "all",
    onError: (error) => {
      // Custom error handling
      if (
        error.graphQLErrors.some(
          (e) => e.extensions.code === "VALIDATION_ERROR"
        )
      ) {
        // Handle validation errors
        setValidationErrors(error.graphQLErrors);
      }
    },
  });

  return (
    <form>
      {error && (
        <div className="error-banner">
          <p>Failed to update: {error.message}</p>
          <button onClick={() => reset()}>Dismiss</button>
        </div>
      )}
      {/* form fields */}
    </form>
  );
}
```

## Pagination

```tsx
// Cursor-based pagination
export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        node {
          id
          title
          content
          author {
            name
          }
          createdAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

function PostsList() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: 10 },
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = () => {
    if (data?.posts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            posts: {
              ...fetchMoreResult.posts,
              edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
            },
          };
        },
      });
    }
  };

  if (loading && !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.posts.edges.map(({ node: post }) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.author.name}</small>
        </div>
      ))}

      {data?.posts.pageInfo.hasNextPage && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

// Offset-based pagination
export const GET_USERS_PAGINATED = gql`
  query GetUsersPaginated($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
      email
    }
    userCount
  }
`;

function PaginatedUsers() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, loading, error } = useQuery(GET_USERS_PAGINATED, {
    variables: { limit, offset },
    fetchPolicy: "cache-and-network",
  });

  const totalPages = data ? Math.ceil(data.userCount / limit) : 0;

  return (
    <div>
      {data?.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

## Local State Management

```tsx
// Local state with Apollo Client
import { makeVar } from "@apollo/client";

// Reactive variables
export const cartItemsVar = makeVar([]);
export const isLoggedInVar = makeVar(false);
export const themeVar = makeVar("light");

// Local-only fields in queries
export const GET_CART = gql`
  query GetCart {
    cartItems @client
    isLoggedIn @client
  }
`;

// Type policies for local state
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

// Component usage
function ShoppingCart() {
  const { data } = useQuery(GET_CART);

  const addToCart = (item) => {
    const currentItems = cartItemsVar();
    cartItemsVar([...currentItems, item]);
  };

  const removeFromCart = (itemId) => {
    const currentItems = cartItemsVar();
    cartItemsVar(currentItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h2>Cart ({data?.cartItems?.length || 0})</h2>
      {data?.cartItems?.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

## Cache Management

```tsx
// Direct cache manipulation
function CacheExample() {
  const client = useApolloClient();

  const updateUserInCache = (userId, updates) => {
    client.cache.modify({
      id: client.cache.identify({ __typename: "User", id: userId }),
      fields: {
        name(existing) {
          return updates.name || existing;
        },
        email(existing) {
          return updates.email || existing;
        },
      },
    });
  };

  const removeUserFromCache = (userId) => {
    client.cache.evict({
      id: client.cache.identify({ __typename: "User", id: userId }),
    });
    client.cache.gc(); // Clean up orphaned references
  };

  const refetchQueries = () => {
    client.refetchQueries({
      include: [GET_USERS, GET_USER],
    });
  };

  const resetStore = () => {
    client.resetStore(); // Clear cache and refetch active queries
  };

  return <div>Cache management examples</div>;
}

// Custom fetch policies
function CustomFetchPolicies() {
  // cache-first: Use cache, fallback to network
  const { data: cached } = useQuery(GET_USERS, {
    fetchPolicy: "cache-first",
  });

  // cache-and-network: Use cache immediately, update from network
  const { data: fresh } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });

  // network-only: Always fetch from network
  const { data: latest } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });

  // no-cache: Fetch from network, don't cache result
  const { data: uncached } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
  });

  return <div>Different fetch policies</div>;
}
```

## Developer Tools

```tsx
// Install Apollo DevTools browser extension
// Then inspect your GraphQL operations, cache, and mutations

function DebugExample() {
  const { data, loading, error } = useQuery(GET_USERS, {
    // Enable dev tools features
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });

  // DevTools shows:
  // ✅ Query execution timeline
  // ✅ Cache contents and updates
  // ✅ Network requests and responses
  // ✅ Mutation results and optimistic updates
  // ✅ Schema exploration
  // ✅ Query performance metrics

  return <div>Check Apollo DevTools in browser!</div>;
}

// Enable more detailed logging
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true, // Enable in production for debugging
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all", // Show partial data + errors in DevTools
    },
  },
});
```

## Type Safety with Code Generation

```tsx
// Install: npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo

// codegen.yml
/*
schema: "http://localhost:4000/graphql"
documents: "src/**/*.{ts,tsx}"
generates:
  src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withComponent: false
      withHOC: false
*/

// Before code generation - no types
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
`;

function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId }
  });

  // No TypeScript support:
  // - data is 'any' type
  // - No autocomplete
  // - No compile-time error checking
  // - Typos in field names go unnoticed

  return <div>{data?.user?.name}</div>; // Could be undefined!
}

// After code generation - full type safety
import { useGetUserQuery, GetUserQuery, GetUserQueryVariables } from '../generated/graphql';

function TypedUserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useGetUserQuery({
    variables: { id: userId }
  });

  // Full TypeScript support:
  // ✅ data is typed as GetUserQuery | undefined
  // ✅ Full autocomplete for all fields
  // ✅ Compile-time error checking
  // ✅ Typos caught at build time
  // ✅ Refactoring safety

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.user) return <div>User not found</div>;

  return (
    <div>
      <h1>{data.user.name}</h1> {/* TypeScript knows this exists */}
      <p>{data.user.email}</p>
      <div>
        Posts: {data.user.posts.length} {/* Array operations are typed */}
        {data.user.posts.map(post => (
          <div key={post.id}>{post.title}</div> // Full autocomplete
        ))}
      </div>
    </div>
  );
}

// Generated types example
export type GetUserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    posts: Array<{
      __typename?: 'Post';
      id: string;
      title: string;
    }>;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

// Typed mutations
import { useCreateUserMutation, CreateUserInput } from '../generated/graphql';

function CreateUserForm() {
  const [createUser, { loading, error }] = useCreateUserMutation();

  const handleSubmit = async (formData: CreateUserInput) => {
    try {
      const { data } = await createUser({
        variables: { input: formData } // TypeScript validates input shape
      });

      // data.createUser is fully typed
      console.log('Created user:', data?.createUser?.name);
    } catch (err) {
      // Error handling
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}

// Fragment types for reusability
import { UserFragmentFragment } from '../generated/graphql';

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    avatar
  }
`;

function UserCard({ user }: { user: UserFragmentFragment }) {
  // user parameter is fully typed from the fragment
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```
