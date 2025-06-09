---
sidebar_label: "Recoil"
---

# [Recoil](https://recoiljs.org/)

- Recoil works and thinks like React. Add some to your app and get fast and flexible shared state.
- Derived data and asynchronous queries are tamed with pure functions and efficient subscriptions.
- Implement persistence, routing, time-travel debugging, or undo by observing all state changes across your app, without impairing code-splitting.

## Why Recoil over React Context?

React Context causes all consuming components to re-render when any part of the context value changes. Recoil solves this with **atomic state** - components only re-render when the specific atoms they subscribe to change.

## Key Benefits

- **Granular updates**: Components only re-render when their specific atoms change
- **Derived state**: Selectors automatically update when dependencies change
- **Async support**: Built-in async state management with Suspense integration
- **Developer tools**: Time-travel debugging and state inspection
- **Minimal boilerplate**: No providers, reducers, or action creators needed

### The Context Problem - Single Context

```tsx
// Problem: ALL components re-render when ANY part changes
const AppContext = createContext({ user: null, todos: [], count: 0 });

function App() {
  const [state, setState] = useState({ user: null, todos: [], count: 0 });

  return (
    <AppContext.Provider value={state}>
      <UserComponent /> {/* Re-renders when count changes! */}
      <CountComponent /> {/* Re-renders when todos change! */}
      <TodosComponent /> {/* Re-renders when user changes! */}
    </AppContext.Provider>
  );
}
```

### Context Solution - Multiple Contexts (More Code)

You _can_ solve this with separate contexts, but it creates complexity:

```tsx
// Separate contexts to avoid cross re-renders
const CountContext = createContext();
const TodosContext = createContext();
const UserContext = createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}

// Provider hell in your app
function App() {
  return (
    <CountProvider>
      <TodosProvider>
        <UserProvider>
          <CountComponent /> {/* Only re-renders when count changes */}
          <TodosComponent /> {/* Only re-renders when todos changes */}
        </UserProvider>
      </TodosProvider>
    </CountProvider>
  );
}

// Need to manually create hooks for each context
const useCount = () => useContext(CountContext);
const useTodos = () => useContext(TodosContext);
```

**Problems with Multiple Contexts:**

- Provider nesting gets unwieldy
- No built-in computed state across contexts
- Manual dependency management for derived values
- Lots of boilerplate code

### Recoil Solution - Clean & Atomic

```tsx
// Simple atom definitions - no providers needed
const userState = atom({ key: "user", default: null });
const todosState = atom({ key: "todos", default: [] });
const countState = atom({ key: "count", default: 0 });

// Built-in computed state across atoms
const todoStats = selector({
  key: "todoStats",
  get: ({ get }) => {
    const todos = get(todosState);
    const count = get(countState);
    return { todosCount: todos.length, totalCount: count };
  },
});

// Single provider for everything
function App() {
  return (
    <RecoilRoot>
      <CountComponent /> {/* Only re-renders when countState changes */}
      <TodosComponent /> {/* Only re-renders when todosState changes */}
      <StatsComponent /> {/* Re-renders when todos OR count changes */}
    </RecoilRoot>
  );
}
```

## Basic Setup

```tsx
// App.tsx
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <YourComponents />
    </RecoilRoot>
  );
}
```

## Atoms - Basic State

```tsx
// atoms/counter.ts
import { atom } from "recoil";

export const countState = atom({
  key: "countState", // unique ID
  default: 0,
});

// Component usage
import { useRecoilState } from "recoil";

function Counter() {
  const [count, setCount] = useRecoilState(countState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
```

## Atoms - Complex Objects

```tsx
// atoms/user.ts
import { atom } from "recoil";

interface User {
  id: string;
  name: string;
  email: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

// Component usage
function UserProfile() {
  const [user, setUser] = useRecoilState(userState);

  const login = () => {
    setUser({ id: "1", name: "John", email: "john@example.com" });
  };

  return user ? (
    <p>Welcome {user.name}</p>
  ) : (
    <button onClick={login}>Login</button>
  );
}
```

## Selectors - Derived State

```tsx
// atoms/selectors.ts
import { selector } from "recoil";
import { countState, userState } from "./atoms";

// Simple computation
export const doubledCount = selector({
  key: "doubledCount",
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  },
});

// Multi-atom computation
export const userDisplayName = selector({
  key: "userDisplayName",
  get: ({ get }) => {
    const user = get(userState);
    return user ? `${user.name} (${user.email})` : "Guest";
  },
});

// Component usage - read-only
function Display() {
  const doubled = useRecoilValue(doubledCount);
  const displayName = useRecoilValue(userDisplayName);

  return (
    <p>
      {displayName} - Count x2: {doubled}
    </p>
  );
}
```

## Array State + Computed Values

```tsx
// atoms/todos.ts
import { atom, selector } from "recoil";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const todosState = atom<Todo[]>({
  key: "todosState",
  default: [],
});

export const todoStats = selector({
  key: "todoStats",
  get: ({ get }) => {
    const todos = get(todosState);
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      remaining: todos.filter((t) => !t.completed).length,
    };
  },
});

// Component usage
function TodoList() {
  const [todos, setTodos] = useRecoilState(todosState);
  const stats = useRecoilValue(todoStats);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <p>
        Stats: {stats.completed}/{stats.total} completed
      </p>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

## Async Selectors

```tsx
// atoms/async.ts
import { selector } from "recoil";
import { userState } from "./user";

export const userProfileData = selector({
  key: "userProfileData",
  get: async ({ get }) => {
    const user = get(userState);
    if (!user) return null;

    const response = await fetch(`/api/users/${user.id}`);
    return response.json();
  },
});

// Component usage - requires Suspense
function AsyncUserData() {
  const profileData = useRecoilValue(userProfileData);

  return profileData ? (
    <div>Profile: {JSON.stringify(profileData)}</div>
  ) : (
    <div>No user data</div>
  );
}

// Wrap with Suspense
function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncUserData />
      </Suspense>
    </RecoilRoot>
  );
}
```

## Hook Patterns

```tsx
// Different ways to interact with atoms

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function HookExamples() {
  // Read + Write
  const [count, setCount] = useRecoilState(countState);

  // Read only (better performance if you don't need setter)
  const doubled = useRecoilValue(doubledCount);

  // Write only
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <p>
        Count: {count}, Doubled: {doubled}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button
        onClick={() =>
          setUser({ id: "1", name: "Jane", email: "jane@example.com" })
        }
      >
        Set User
      </button>
    </div>
  );
}
```

## Performance Comparison Example

```tsx
// Context approach - ALL components re-render
const AppContext = createContext({
  user: null,
  count: 0,
  todos: [],
});

function ContextApp() {
  const [state, setState] = useState({ user: null, count: 0, todos: [] });

  return (
    <AppContext.Provider value={state}>
      <UserComponent /> {/* Re-renders when count changes */}
      <CountComponent /> {/* Re-renders when user changes */}
      <TodosComponent /> {/* Re-renders when count changes */}
    </AppContext.Provider>
  );
}

// Recoil approach - ONLY relevant components re-render
function RecoilApp() {
  return (
    <RecoilRoot>
      <UserComponent /> {/* Only re-renders when userState changes */}
      <CountComponent /> {/* Only re-renders when countState changes */}
      <TodosComponent /> {/* Only re-renders when todosState changes */}
    </RecoilRoot>
  );
}
```
