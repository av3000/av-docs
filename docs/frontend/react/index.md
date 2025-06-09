---
sidebar_label: "Intro"
sidebar_position: 1
---

# React

## What is React?

JavaScript library for building user interfaces through composable components. Manages UI state and efficiently updates the DOM when data changes.

[Roadmap](https://roadmap.sh/react)

## Why React?

### Component-Based Architecture

**What**: Build encapsulated components that manage their own state, then compose them to make complex UIs
**Why**: Reusable code, easier testing, better organization. Change one component without breaking others.

```jsx
// Reusable Button component
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Use anywhere
<Button onClick={handleSave}>Save</Button>
<Button onClick={handleCancel}>Cancel</Button>
```

### Declarative UI

**What**: Describe what the UI should look like for any given state, React figures out how to update it
**Why**: No manual DOM manipulation. Less bugs, more predictable code, easier to reason about.

```jsx
// Declarative - describe the end result
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "done" : ""}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### Virtual DOM & Performance

**What**: React creates a virtual representation of the DOM, calculates minimal changes needed
**Why**: Faster updates, smoother UIs. React optimizes rendering automatically - you focus on logic.

### Rich Ecosystem

**What**: Massive ecosystem of libraries, tools, and community resources
**Why**: Solution exists for almost every problem. Learn once, use patterns everywhere.

### Developer Experience

**What**: Excellent debugging tools, hot reloading, helpful error messages
**Why**: Faster development cycles, easier debugging, better productivity.

## Core Principles

### Components

- **Function-based** components are the standard
- **Props** pass data down from parent to child
- **Composition** over inheritance
- **Single responsibility** - each component does one thing well

### State Management

- **Local state** for component-specific data
- **Lifting state up** when multiple components need access
- **External libraries** for complex global state
- **Immutable updates** prevent bugs and enable optimizations

### Unidirectional Data Flow

- **Data flows down** via props
- **Events flow up** via callback functions
- **Predictable** state changes
- **Easier debugging** and testing

## Fundamental Concepts

### JSX

**Purpose**: Write HTML-like syntax in JavaScript
**Benefit**: Familiar syntax, powerful JavaScript expressions, excellent tooling

```jsx
function Welcome({ name, isLoggedIn }) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      {isLoggedIn && <p>Welcome back!</p>}
    </div>
  );
}
```

_JSX compiles to JavaScript function calls. className instead of class, onClick instead of onclick._

### Components

**Purpose**: Reusable pieces of UI with their own logic and state
**Benefit**: Modular code, easier testing, better organization

```jsx
// Function component (preferred)
function UserCard({ user, onEdit }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
}
```

_Components are just functions that return JSX. Props come in as function arguments._

### Props

**Purpose**: Pass data and functions from parent to child components
**Benefit**: Component communication, data flow control, reusability

```jsx
// Parent passes data down
function App() {
  const user = { id: 1, name: "John", avatar: "/john.jpg" };

  return <UserCard user={user} onEdit={handleEdit} />;
}

// Child receives via props
function UserCard({ user, onEdit }) {
  return <button onClick={() => onEdit(user.id)}>{user.name}</button>;
}
```

_Props are read-only. Children cannot modify props directly._

### State

**Purpose**: Manage data that changes over time within a component
**Benefit**: Reactive UI updates, encapsulated component data

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

_useState returns current value and setter function. Calling setter triggers re-render._

## Essential Hooks

### useState

**Purpose**: Add state to function components
**When**: Component needs to remember data between renders

```jsx
const [value, setValue] = useState(initialValue);
const [user, setUser] = useState({ name: "", email: "" });
const [items, setItems] = useState([]);
```

_Always use functional updates for state based on previous state: `setCount(prev => prev + 1)`_

### useEffect

[Fetchin data](https://react.dev/reference/react/useEffect#fetching-data-with-effects)

**Purpose**: Perform side effects (API calls, subscriptions, timers)
**When**: Need to interact with outside world or React lifecycle

```jsx
useEffect(() => {
  // Effect runs after render
  fetchUserData().then(setUser);

  // Cleanup function (optional)
  return () => {
    cancelRequest();
  };
}, [userId]); // Dependencies - re-run when userId changes
```

_Empty dependency array `[]` means run once. No array means run every render._

### useContext

**Purpose**: Access context values without prop drilling
**When**: Data needed by many components at different nesting levels

```jsx
const theme = useContext(ThemeContext);
const user = useContext(UserContext);
```

_Alternative to passing props through many component layers._

### useRef

**Purpose**: Access DOM elements directly or persist values between renders
**When**: Focus management, animations, integrating with non-React libraries

```jsx
const inputRef = useRef(null);
const countRef = useRef(0); // Doesn't trigger re-renders

useEffect(() => {
  inputRef.current.focus();
}, []);
```

_ref.current gives you direct DOM access. Changes don't trigger re-renders._

### useMemo

**Purpose**: Memoize expensive calculations
**When**: Expensive computations that don't need to run every render

```jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

_Only recalculates when dependencies change. Don't overuse - measuring is key._

### useCallback

**Purpose**: Memoize functions to prevent unnecessary re-renders
**When**: Passing callbacks to optimized child components

```jsx
const handleClick = useCallback((id) => {
  setItems((items) => items.filter((item) => item.id !== id));
}, []);
```

_Prevents child components from re-rendering when parent re-renders._

## Event Handling

### Synthetic Events

**Purpose**: Cross-browser event wrapper with consistent API
**Benefit**: Same event object properties across all browsers

```jsx
function Button({ onClick }) {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick(event.target.value);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

_SyntheticEvent wraps native events. Access native event via `event.nativeEvent`._

### Event Delegation

**Purpose**: React automatically delegates events to document root
**Benefit**: Better performance, consistent behavior

```jsx
// React handles delegation automatically
function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => onToggle(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

_Don't manually add/remove event listeners. Use React's event props._

## Conditional Rendering

### Boolean Conditions

**Purpose**: Show/hide elements based on state
**Pattern**: Use logical AND for simple conditions

```jsx
function UserProfile({ user, isLoggedIn }) {
  return (
    <div>
      {isLoggedIn && <WelcomeMessage />}
      {user.isAdmin && <AdminPanel />}
      {!user.verified && <VerificationBanner />}
    </div>
  );
}
```

_`condition && <Component />` renders Component only if condition is truthy._

### Ternary Operator

**Purpose**: Choose between two different elements
**Pattern**: Use for either/or scenarios

```jsx
function LoginButton({ isLoggedIn, onLogin, onLogout }) {
  return (
    <button onClick={isLoggedIn ? onLogout : onLogin}>
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
}
```

_`condition ? <A /> : <B />` renders A if true, B if false._

## Lists and Keys

### Rendering Lists

**Purpose**: Display dynamic collections of data
**Requirement**: Each item must have unique key prop

```jsx
function ProductList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

_Keys help React identify which items changed, added, or removed._

### Key Best Practices

**Purpose**: Optimize list updates and prevent bugs
**Rules**: Use stable, unique identifiers - not array indices

```jsx
// ✅ Good - stable unique ID
{
  users.map((user) => <User key={user.id} user={user} />);
}

// ❌ Bad - array index can cause bugs
{
  users.map((user, index) => <User key={index} user={user} />);
}

// ❌ Bad - not unique
{
  users.map((user) => <User key={user.name} user={user} />);
}
```

_Wrong keys can cause components to retain old state or render incorrectly._

## Forms and Controlled Components

### Controlled Components

**Purpose**: Form inputs controlled by React state
**Benefit**: Single source of truth, validation, programmatic control

```jsx
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form>
      <input value={form.name} onChange={handleChange("name")} />
      <input value={form.email} onChange={handleChange("email")} />
    </form>
  );
}
```

_React state drives input values. Changes update state, which updates inputs._

### Form Libraries

**Purpose**: Handle complex forms with validation
**When**: Multi-step forms, complex validation, better UX

```jsx
import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>Email required</span>}
    </form>
  );
}
```

_Libraries like React Hook Form, Formik reduce boilerplate and add features._

## Context API

### Creating Context

**Purpose**: Share data without prop drilling
**When**: Theme, auth state, language settings

```jsx
const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}
```

_Provider makes values available to all descendant components._

### Consuming Context

**Purpose**: Access context values in components
**Pattern**: Use useContext hook in function components

```jsx
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </header>
  );
}
```

_Any component in the provider tree can access context values._

## Performance Optimization

### React.memo

**Purpose**: Prevent unnecessary re-renders of components
**When**: Component renders often with same props

```jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return <ComplexVisualization data={data} onUpdate={onUpdate} />;
});
```

_Shallow compares props. Only re-renders if props actually changed._

### useMemo & useCallback

**Purpose**: Memoize values and functions
**When**: Expensive calculations or preventing child re-renders

```jsx
function DataTable({ items, sortBy }) {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }, [items, sortBy]);

  const handleSort = useCallback((column) => {
    setSortBy(column);
  }, []);

  return <Table items={sortedItems} onSort={handleSort} />;
}
```

_Measure before optimizing. Not all components need memoization._

### Code Splitting

**Purpose**: Load components only when needed
**Benefit**: Smaller initial bundle, faster app startup

```jsx
import { lazy, Suspense } from "react";

const AdminPanel = lazy(() => import("./AdminPanel"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isAdmin && <AdminPanel />}
    </Suspense>
  );
}
```

_Lazy loading reduces initial bundle size. Great for admin panels, complex features._

## Error Handling

### Error Boundaries

**Purpose**: Catch JavaScript errors in component tree
**Benefit**: Graceful error handling, better user experience

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>;
```

_Error boundaries only catch errors in child components, not in themselves._

### Error Handling Patterns

**Purpose**: Handle async errors and edge cases
**Pattern**: Try-catch with async/await, error states

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await api.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserCard user={user} />;
}
```

_Always handle loading, error, and success states for async operations._

## Testing

### Testing Library

**Purpose**: Test components like users interact with them
**Philosophy**: Test behavior, not implementation details

```jsx
import { render, screen, fireEvent } from "@testing-library/react";

test("counter increments when button clicked", () => {
  render(<Counter />);

  const button = screen.getByRole("button", { name: /increment/i });
  const count = screen.getByText(/count: 0/i);

  fireEvent.click(button);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

_Query by text users see, not by implementation details like CSS classes._

### Testing Hooks

**Purpose**: Test custom hooks in isolation
**Tool**: @testing-library/react-hooks

```jsx
import { renderHook, act } from "@testing-library/react";

test("useCounter hook", () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

_Test hooks behavior independently of components._

## State Management

### Local State

**When**: Data only needed by one component or its children
**Pattern**: useState, useReducer for complex state

```jsx
function ShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => [...prev, { ...product, id: Date.now() }]);
  };

  return <CartView items={items} onAddItem={addItem} />;
}
```

_Start with local state. Lift up only when multiple components need access._

### Global State Libraries

**When**: State needed across many components, complex updates
**Options**: Redux Toolkit, Zustand, Valtio, Context + useReducer

```jsx
// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Zustand (simpler alternative)
import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

_Redux for complex apps, Zustand for simpler state management._

## Routing

### React Router

**Purpose**: Client-side routing for single-page applications
**Benefit**: Multiple pages, URL synchronization, navigation

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

_Declarative routing with URL parameters, query strings, and nested routes._

### Navigation Patterns

**Purpose**: Programmatic navigation and route protection
**Pattern**: useNavigate hook, route guards

```jsx
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    saveUser(id).then(() => {
      navigate("/users");
    });
  };

  return <ProfileForm onSave={handleSave} />;
}
```

_Access route params and navigate programmatically._

## Best Practices & Patterns

### Component Composition

**Pattern**: Combine simple components to build complex UIs
**Benefit**: Reusability, flexibility, easier testing

```jsx
// Flexible card component
function Card({ children, title, actions }) {
  return (
    <div className="card">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{actions}</footer>
    </div>
  );
}

// Usage
<Card title="User Profile" actions={<Button>Edit</Button>}>
  <UserInfo user={user} />
</Card>;
```

_Composition over configuration. Accept children and specific props._

### Custom Hooks

**Pattern**: Extract component logic into reusable hooks
**Benefit**: Logic reuse, easier testing, cleaner components

```jsx
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage in components
function UserList() {
  const { data: users, loading, error } = useApi("/api/users");
  // Component logic here
}
```

_Extract stateful logic into custom hooks for reuse across components._

### Folder Structure

**Purpose**: Organize code for maintainability and scalability
**Pattern**: Group by feature or by file type

```
src/
├── components/          # Reusable UI components
│   ├── Button/
│   │   ├── index.js
│   │   ├── Button.test.js
│   │   └── Button.css
│   └── Modal/
├── pages/              # Route components
│   ├── Home/
│   ├── UserProfile/
│   └── Settings/
├── hooks/              # Custom hooks
│   ├── useApi.js
│   └── useAuth.js
├── context/            # Context providers
├── utils/              # Helper functions
└── App.js
```

_Start simple, refactor as app grows. Colocation often beats premature abstraction._

## Example Repositories & Resources

### Official Examples

- [**React Examples**](https://github.com/facebook/react/tree/main/fixtures) - Official React team examples
- [**Create React App**](https://github.com/facebook/create-react-app) - Zero-config React setup
- [**React DevTools**](https://github.com/facebook/react/tree/main/packages/react-devtools) - Essential debugging tools

### Production Examples

- [**Cal.com**](https://github.com/calcom/cal.com) - Scheduling infrastructure built with Next.js, tRPC, Prisma
- [**Bulletproof React**](https://github.com/alan2207/bulletproof-react) - Production-ready React architecture guide with sample app
- [**RealWorld React Redux**](https://github.com/gothinkster/react-redux-realworld-example-app) - Medium clone with React + Redux
- [**RealWorld TypeScript**](https://github.com/angelguzmaning/ts-redux-react-realworld-example-app) - TypeScript + Redux Toolkit version

### Learning Resources

- [**React Patterns**](https://github.com/chantastic/react-patterns) - Common React patterns and techniques
- [**30 seconds of React**](https://github.com/30-seconds/30-seconds-of-react) - Useful React snippets
- [**React TypeScript Cheatsheets**](https://github.com/typescript-cheatsheets/react) - TypeScript + React patterns
- [**Awesome React**](https://github.com/enaqx/awesome-react) - Curated list of React resources
- [**React Roadmap**](https://roadmap.sh/react) - Step-by-step learning path for React developers

### Component Libraries

- [**Material-UI (MUI)**](https://mui.com/) - Google Material Design components
- [**Ant Design**](https://ant.design/) - Enterprise UI language
- [**Chakra UI**](https://chakra-ui.com/) - Simple, modular components
- [**React Bootstrap**](https://react-bootstrap.github.io/) - Bootstrap components for React
- [**Headless UI**](https://headlessui.com/) - Unstyled, accessible components

### State Management

- [**Redux**](./state-management/redux.md) - Redux toolkit
- [**Recoil**](./state-management/recoil.md)
- [**XState**](./state-management/xstate.md)
- [**Apollo Client**](./state-management/apollo-client.md) - GraphQL Client
- [**Zustand**](https://github.com/pmndrs/zustand) - Lightweight state management
- [**React Query**](./state-management/react-query.md) - Server state management
- [**SWR**](https://swr.vercel.app/) - Data fetching with caching

### Development Tools

- [**Storybook**](https://storybook.js.org/) - Component development environment
- [**React Testing Library**](https://testing-library.com/react) - Testing utilities
- [**React Hook Form**](https://react-hook-form.com/) - Forms with minimal re-renders
- [**Framer Motion**](https://www.framer.com/motion/) - Animation library

## Key Benefits

- **🧩 Component-Based**: Reusable, testable, maintainable UI pieces
- **📝 Declarative**: Describe what you want, React handles how to achieve it
- **⚡ Performance**: Virtual DOM and built-in optimizations for smooth UIs
- **🛠️ Developer Experience**: Excellent tooling, debugging, and error messages
- **🌍 Ecosystem**: Massive community, libraries for every use case
- **📱 Cross-Platform**: React Native for mobile, Next.js for SSR, Electron for desktop
