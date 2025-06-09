# Redux

## Why Redux over React State?

[**Redux Toolkit**](https://redux-toolkit.js.org/) - Official Redux toolset

React's built-in state works well for component-level data, but becomes problematic for complex apps with shared state, deep prop drilling, and complex state logic. Redux provides predictable state management with time-travel debugging and powerful dev tools.

## Key Benefits

- **Predictable state updates**: Actions describe what happened, reducers specify how state changes
- **Time-travel debugging**: Redux DevTools let you replay actions and inspect state changes
- **Centralized state**: No prop drilling, any component can access any state
- **Powerful dev tools**: Best-in-class debugging and state inspection
- **Middleware ecosystem**: Logging, persistence, API integration, etc.
- **Performance optimizations**: Components only re-render when their selected state changes
- **Testable logic**: Pure reducer functions are easy to test
- **Hot reloading**: State persists during development

### The React State Problem - Prop Drilling & State Sharing

```tsx
// Problem: Deep prop drilling and scattered state
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  return (
    <div>
      <Header
        user={user}
        cart={cart}
        theme={theme}
        setTheme={setTheme}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <MainContent user={user} cart={cart} setCart={setCart} theme={theme} />
      <Sidebar user={user} setUser={setUser} notifications={notifications} />
    </div>
  );
}

// Header needs to pass props down further
function Header({
  user,
  cart,
  theme,
  setTheme,
  notifications,
  setNotifications,
}) {
  return (
    <header>
      <UserMenu user={user} />
      <CartIcon cart={cart} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <NotificationBell
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </header>
  );
}

// Components 5 levels deep still need these props!
function NotificationBell({ notifications, setNotifications }) {
  // Finally using the props after passing through 5 components
  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
}
```

### Context "Solution" - Still Has Issues

```tsx
// Context helps with prop drilling but creates other problems
const AppContext = createContext();

function AppProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    cart: [],
    theme: "light",
    notifications: [],
  });

  // Problem: All logic in one place becomes messy
  const updateCart = (item) => {
    setState((prev) => ({
      ...prev,
      cart: [...prev.cart, item], // Easy to mutate by mistake
    }));
  };

  const clearNotification = (id) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  };

  // Value changes on every render - performance issues
  const value = {
    ...state,
    updateCart,
    clearNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Problems:
// 1. All components re-render when ANY state changes
// 2. Complex state logic mixed with component logic
// 3. No time-travel debugging
// 4. Hard to test state logic in isolation
// 5. No dev tools for state inspection
```

### Redux Solution - Predictable State Management

```tsx
// Solution: Centralized, predictable state with powerful tools
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    theme: themeSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});

// Components only re-render when their specific state changes
function NotificationBell() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const clearNotification = (id) => {
    dispatch(removeNotification(id));
  };

  // Component only re-renders when notifications change
  // State logic is separate and testable
  // Full dev tools support with time-travel debugging
}
```

## Basic Setup (Redux Toolkit)

```tsx
// Install: npm install @reduxjs/toolkit react-redux

// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// App.tsx
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <YourComponents />
    </Provider>
  );
}
```

## Simple Slice (Redux Toolkit)

```tsx
// store/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  step: number;
}

const initialState: CounterState = {
  value: 0,
  step: 1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // RTK uses Immer - direct mutations are safe
      state.value += state.step;
    },
    decrement: (state) => {
      state.value -= state.step;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, setStep, reset } =
  counterSlice.actions;
export default counterSlice.reducer;

// Component usage
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setStep, reset } from "./store/counterSlice";

function Counter() {
  const { value, step } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <p>
        Count: {value} (Step: {step})
      </p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(setStep(5))}>Set Step to 5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```

## Complex State - Todos with Normalized Data

```tsx
// store/todosSlice.ts
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}

// Entity adapter for normalized state
const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

interface TodosState {
  filter: "all" | "active" | "completed";
}

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState<TodosState>({
    filter: "all",
  }),
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
      const todo: Todo = {
        ...action.payload,
        id: Date.now().toString(),
      };
      todosAdapter.addOne(state, todo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      todosAdapter.removeOne(state, action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const todo = state.entities[id];
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action: PayloadAction<TodosState["filter"]>) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo?.completed)
        .map((todo) => todo!.id);
      todosAdapter.removeMany(state, completedIds);
    },
  },
});

// Selectors
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

// Custom selectors
export const selectFilteredTodos = (state: RootState) => {
  const todos = selectAllTodos(state);
  const filter = state.todos.filter;

  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const selectTodoStats = (state: RootState) => {
  const todos = selectAllTodos(state);
  return {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    remaining: todos.filter((t) => !t.completed).length,
  };
};

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  setFilter,
  clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;

// Component usage
function TodoList() {
  const todos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodoStats);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const dispatch = useDispatch();

  const handleAddTodo = (text: string) => {
    dispatch(
      addTodo({
        text,
        completed: false,
        userId: "current-user",
        createdAt: new Date().toISOString(),
      })
    );
  };

  return (
    <div>
      <div>
        <p>
          Stats: {stats.completed}/{stats.total} completed
        </p>

        <div>
          {(["all", "active", "completed"] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => dispatch(setFilter(filterType))}
              disabled={filter === filterType}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <span>{todo.text}</span>
          <button onClick={() => dispatch(removeTodo(todo.id))}>×</button>
        </div>
      ))}

      <button onClick={() => dispatch(clearCompleted())}>
        Clear Completed
      </button>
    </div>
  );
}
```

## Async Operations with createAsyncThunk

```tsx
// store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  current: User | null;
  loading: boolean;
  error: string | null;
}

// Async thunk for API calls
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: Partial<User> & { id: string }) => {
    const response = await fetch(`/api/users/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { clearError, logout } = userSlice.actions;
export default userSlice.reducer;

// Component usage
function UserProfile() {
  const {
    current: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser("current-user-id"));
  }, [dispatch]);

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (user) {
      dispatch(updateUser({ ...updates, id: user.id }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => handleUpdateProfile({ name: "Updated Name" })}>
        Update Name
      </button>
    </div>
  );
}
```

## RTK Query for Data Fetching

```tsx
// store/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    createPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;

// Add to store
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice,
    user: userSlice,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

// Component usage
function PostsList() {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleCreatePost = async () => {
    try {
      await createPost({
        title: "New Post",
        body: "Post content",
        userId: 1,
      }).unwrap();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <button onClick={handleCreatePost}>Create Post</button>
      <button onClick={refetch}>Refresh</button>

      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Typed Hooks for Better DX

```tsx
// store/hooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Typed versions of hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage in components
function TypedComponent() {
  const count = useAppSelector((state) => state.counter.value); // Fully typed
  const dispatch = useAppDispatch(); // Typed dispatch

  return <div>{count}</div>;
}
```

## Middleware Example

```tsx
// store/middleware.ts
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { increment, decrement } from "./counterSlice";

// Listener middleware for side effects
export const listenerMiddleware = createListenerMiddleware();

// Log all counter actions
listenerMiddleware.startListening({
  matcher: isAnyOf(increment, decrement),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    console.log("Counter updated:", state.counter.value);

    // Save to localStorage
    localStorage.setItem("counter", JSON.stringify(state.counter));
  },
});

// Add to store
export const store = configureStore({
  reducer: {
    /* your reducers */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
```
