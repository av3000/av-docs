# Command

Use case: Encapsulating a request as an object.

Example: Implementing undo/redo functionality or action creators in NgRx.

How to find: Look for classes or objects that encapsulate all information needed to perform an action or trigger an event.

Explanation:

The Command pattern encapsulates a request as an object, thereby allowing for parameterization of clients with different requests, queuing, logging, and supporting undoable operations. In Angular applications using NgRx, actions are command objects that are dispatched to change the application state.

```js
// counter.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

// counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, () => 0)
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}

// counter.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">Increment</button>
    <div>Current Count: {{ count$ | async }}</div>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  count$ = this.store.select('count');

  constructor(private store: Store<{ count: number }>) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
```

- Actions like increment, decrement, and reset are command objects.
- Dispatching an action tells the store to perform a specific operation.
- This encapsulates the request (action) as an object, aligning with the Command pattern.
