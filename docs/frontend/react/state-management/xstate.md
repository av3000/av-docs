---
sidebar_label: "XState"
---

# [XState](https://xstate.js.org/)

[stately.ai/docs](https://stately.ai/docs)

XState is a state management and orchestration solution for JavaScript and TypeScript apps. It has zero dependencies, and is useful for frontend and backend application logic.

It uses event-driven programming, state machines, statecharts, and the actor model to handle complex logic in predictable, robust, and visual ways. XState provides a powerful and flexible way to manage application and workflow state by allowing developers to model logic as actors and state machines.

## Why State Machines over useState/useReducer?

Traditional state management with `useState` or `useReducer` allows **impossible states** and unpredictable transitions. State machines make states explicit and transitions predictable, preventing bugs from invalid state combinations.

## Key Benefits

- **Impossible states eliminated**: Only valid state combinations possible
- **Predictable transitions**: Clear rules for state changes
- **Visual documentation**: State charts serve as living documentation
- **Better testing**: Test state transitions, not implementation details
- **Complex async flows**: Built-in support for promises, timeouts, cancellation
- **Hierarchical organization**: Nested states for complex UIs
- **Parallel states**: Multiple independent state machines running together

### The useState Problem - Impossible States

```tsx
// Problem: Multiple booleans create impossible states
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // What if isLoading=true AND isSuccess=true?
  // What if isError=true but errorMessage is empty?
  // 16 possible combinations, most are invalid!

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false); // Easy to forget resetting
    setIsSuccess(false); // Easy to forget resetting

    try {
      await login();
      setIsLoading(false);
      setIsSuccess(true);
      // Forgot to reset error state - bug!
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(error.message);
      // What if we forgot setIsSuccess(false)?
    }
  };
}
```

### XState Solution - Explicit States

```tsx
// Solution: Only valid states are possible
const loginMachine = createMachine({
  id: "login",
  initial: "idle",
  states: {
    idle: {
      on: { SUBMIT: "loading" },
    },
    loading: {
      on: {
        SUCCESS: "success",
        ERROR: "error",
      },
    },
    success: {
      on: { RESET: "idle" },
    },
    error: {
      on: {
        RETRY: "loading",
        RESET: "idle",
      },
    },
  },
});

// Only 4 possible states - all valid!
// Transitions are explicit and predictable
```

## Basic Setup

```tsx
// Install: npm install xstate @xstate/react

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
```

## Simple State Machine

```tsx
// machines/toggle.ts
import { createMachine } from "xstate";

export const toggleMachine = createMachine({
  id: "toggle",
  initial: "off",
  states: {
    off: {
      on: {
        TOGGLE: "on",
      },
    },
    on: {
      on: {
        TOGGLE: "off",
      },
    },
  },
});

// Component usage
import { useMachine } from "@xstate/react";

function ToggleSwitch() {
  const [state, send] = useMachine(toggleMachine);

  return (
    <div>
      <p>Switch is: {state.value}</p>
      <button onClick={() => send("TOGGLE")}>
        Turn {state.value === "off" ? "On" : "Off"}
      </button>
    </div>
  );
}
```

## State Machine with Context (Data)

```tsx
// machines/counter.ts
import { createMachine, assign } from "xstate";

interface CounterContext {
  count: number;
  step: number;
}

export const counterMachine = createMachine({
  id: "counter",
  initial: "active",
  context: {
    count: 0,
    step: 1,
  } as CounterContext,
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({
            count: (context) => context.count + context.step,
          }),
        },
        DECREMENT: {
          actions: assign({
            count: (context) => context.count - context.step,
          }),
        },
        SET_STEP: {
          actions: assign({
            step: (_, event) => event.value,
          }),
        },
        RESET: {
          actions: assign({
            count: 0,
          }),
        },
      },
    },
  },
});

// Component usage
function Counter() {
  const [state, send] = useMachine(counterMachine);
  const { count, step } = state.context;

  return (
    <div>
      <p>
        Count: {count} (Step: {step})
      </p>
      <button onClick={() => send("INCREMENT")}>+</button>
      <button onClick={() => send("DECREMENT")}>-</button>
      <button onClick={() => send({ type: "SET_STEP", value: 5 })}>
        Set Step to 5
      </button>
      <button onClick={() => send("RESET")}>Reset</button>
    </div>
  );
}
```

## Guards (Conditional Transitions)

```tsx
// machines/auth.ts
import { createMachine, assign } from "xstate";

interface AuthContext {
  user: string;
  password: string;
  attempts: number;
  maxAttempts: number;
}

export const authMachine = createMachine(
  {
    id: "auth",
    initial: "idle",
    context: {
      user: "",
      password: "",
      attempts: 0,
      maxAttempts: 3,
    } as AuthContext,
    states: {
      idle: {
        on: {
          SUBMIT: {
            target: "checking",
            cond: "hasCredentials", // Guard condition
          },
          UPDATE_FIELD: {
            actions: assign({
              user: (context, event) =>
                event.field === "user" ? event.value : context.user,
              password: (context, event) =>
                event.field === "password" ? event.value : context.password,
            }),
          },
        },
      },
      checking: {
        on: {
          SUCCESS: "authenticated",
          FAILURE: [
            {
              target: "locked",
              cond: "maxAttemptsReached",
              actions: assign({ attempts: (context) => context.attempts + 1 }),
            },
            {
              target: "idle",
              actions: assign({ attempts: (context) => context.attempts + 1 }),
            },
          ],
        },
      },
      authenticated: {
        on: {
          LOGOUT: "idle",
        },
      },
      locked: {
        on: {
          RESET: {
            target: "idle",
            actions: assign({ attempts: 0 }),
          },
        },
      },
    },
  },
  {
    guards: {
      hasCredentials: (context) =>
        context.user.length > 0 && context.password.length > 0,
      maxAttemptsReached: (context) =>
        context.attempts >= context.maxAttempts - 1,
    },
  }
);
```

## Async Operations (Promises)

```tsx
// machines/dataFetcher.ts
import { createMachine, assign } from "xstate";

interface DataContext {
  data: any[];
  error: string | null;
}

export const dataFetcherMachine = createMachine(
  {
    id: "dataFetcher",
    initial: "idle",
    context: {
      data: [],
      error: null,
    } as DataContext,
    states: {
      idle: {
        on: {
          FETCH: "loading",
        },
      },
      loading: {
        invoke: {
          id: "fetchData",
          src: "fetchDataService",
          onDone: {
            target: "success",
            actions: assign({
              data: (_, event) => event.data,
              error: null,
            }),
          },
          onError: {
            target: "failure",
            actions: assign({
              error: (_, event) => event.data.message,
              data: [],
            }),
          },
        },
        on: {
          CANCEL: "idle",
        },
      },
      success: {
        on: {
          FETCH: "loading",
          REFRESH: "loading",
        },
      },
      failure: {
        on: {
          RETRY: "loading",
          RESET: "idle",
        },
      },
    },
  },
  {
    services: {
      fetchDataService: async () => {
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      },
    },
  }
);

// Component usage
function DataFetcher() {
  const [state, send] = useMachine(dataFetcherMachine);
  const { data, error } = state.context;

  return (
    <div>
      <button onClick={() => send("FETCH")} disabled={state.matches("loading")}>
        {state.matches("loading") ? "Loading..." : "Fetch Data"}
      </button>

      {state.matches("loading") && (
        <button onClick={() => send("CANCEL")}>Cancel</button>
      )}

      {state.matches("success") && (
        <div>
          <p>Data loaded: {data.length} items</p>
          <button onClick={() => send("REFRESH")}>Refresh</button>
        </div>
      )}

      {state.matches("failure") && (
        <div>
          <p>Error: {error}</p>
          <button onClick={() => send("RETRY")}>Retry</button>
          <button onClick={() => send("RESET")}>Reset</button>
        </div>
      )}
    </div>
  );
}
```

## Hierarchical States (Nested)

```tsx
// machines/player.ts - Music player with nested states
import { createMachine } from "xstate";

export const playerMachine = createMachine({
  id: "player",
  initial: "stopped",
  states: {
    stopped: {
      on: {
        PLAY: "playing",
      },
    },
    playing: {
      initial: "normal", // Default nested state
      states: {
        normal: {
          on: {
            SHUFFLE_ON: "shuffled",
          },
        },
        shuffled: {
          on: {
            SHUFFLE_OFF: "normal",
          },
        },
      },
      on: {
        PAUSE: "paused",
        STOP: "stopped",
      },
    },
    paused: {
      on: {
        PLAY: "playing",
        STOP: "stopped",
      },
    },
  },
});

// Component usage
function MusicPlayer() {
  const [state, send] = useMachine(playerMachine);

  return (
    <div>
      <p>Player: {state.value}</p>

      {/* Check nested states */}
      {state.matches("playing") && (
        <p>Mode: {state.matches("playing.shuffled") ? "Shuffle" : "Normal"}</p>
      )}

      <button onClick={() => send("PLAY")}>Play</button>
      <button onClick={() => send("PAUSE")}>Pause</button>
      <button onClick={() => send("STOP")}>Stop</button>

      {state.matches("playing") && (
        <>
          <button onClick={() => send("SHUFFLE_ON")}>Shuffle On</button>
          <button onClick={() => send("SHUFFLE_OFF")}>Shuffle Off</button>
        </>
      )}
    </div>
  );
}
```

## Parallel States

```tsx
// machines/app.ts - App with independent features
import { createMachine } from "xstate";

export const appMachine = createMachine({
  id: "app",
  type: "parallel", // Multiple states active simultaneously
  states: {
    auth: {
      initial: "loggedOut",
      states: {
        loggedOut: {
          on: { LOGIN: "loggedIn" },
        },
        loggedIn: {
          on: { LOGOUT: "loggedOut" },
        },
      },
    },
    theme: {
      initial: "light",
      states: {
        light: {
          on: { TOGGLE_THEME: "dark" },
        },
        dark: {
          on: { TOGGLE_THEME: "light" },
        },
      },
    },
    sidebar: {
      initial: "closed",
      states: {
        closed: {
          on: { OPEN_SIDEBAR: "open" },
        },
        open: {
          on: { CLOSE_SIDEBAR: "closed" },
        },
      },
    },
  },
});

// Component usage
function App() {
  const [state, send] = useMachine(appMachine);

  return (
    <div className={state.matches({ theme: "dark" }) ? "dark" : "light"}>
      <header>
        <button onClick={() => send("TOGGLE_THEME")}>
          {state.matches({ theme: "dark" }) ? "☀️" : "🌙"}
        </button>

        {state.matches({ auth: "loggedOut" }) ? (
          <button onClick={() => send("LOGIN")}>Login</button>
        ) : (
          <button onClick={() => send("LOGOUT")}>Logout</button>
        )}

        <button onClick={() => send("OPEN_SIDEBAR")}>☰</button>
      </header>

      {state.matches({ sidebar: "open" }) && (
        <aside>
          <button onClick={() => send("CLOSE_SIDEBAR")}>×</button>
          <p>Sidebar content</p>
        </aside>
      )}
    </div>
  );
}
```

## Key XState Hooks

```tsx
import { useMachine, useActor, useSelector } from "@xstate/react";

function HookExamples() {
  // Full machine access
  const [state, send] = useMachine(myMachine);

  // Subscribe to specific state value
  const isLoading = useSelector(myService, (state) => state.matches("loading"));

  // Use existing service/actor
  const [state, send] = useActor(existingService);

  return <div>{/* Your component */}</div>;
}
```
