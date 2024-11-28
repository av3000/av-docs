# State

Use case: Allowing an object to alter its behavior when its internal state changes.

Example: Components that change behavior based on the state, such as authentication state.

How to find: Look for state machines or objects that change their behavior based on internal state variables.

Explanation:

The State pattern allows an object to change its behavior when its internal state changes. The object appears to change its class. In Angular, this can be implemented by having different state classes that the context switches between.

Example Code:

```js
// authentication-state.interface.ts
export interface AuthenticationState {
  authenticate(context: AuthenticationContext): void;
  logout(context: AuthenticationContext): void;
}

// unauthenticated-state.ts
import { AuthenticationState } from './authentication-state.interface';

export class UnauthenticatedState implements AuthenticationState {
  authenticate(context: AuthenticationContext): void {
    console.log('Logging in...');
    context.setState(new AuthenticatedState());
  }

  logout(context: AuthenticationContext): void {
    console.log('Already logged out.');
  }
}

// authenticated-state.ts
import { AuthenticationState } from './authentication-state.interface';

export class AuthenticatedState implements AuthenticationState {
  authenticate(context: AuthenticationContext): void {
    console.log('Already logged in.');
  }

  logout(context: AuthenticationContext): void {
    console.log('Logging out...');
    context.setState(new UnauthenticatedState());
  }
}

// authentication-context.ts
export class AuthenticationContext {
  private state: AuthenticationState;

  constructor() {
    this.state = new UnauthenticatedState();
  }

  setState(state: AuthenticationState) {
    this.state = state;
  }

  authenticate() {
    this.state.authenticate(this);
  }

  logout() {
    this.state.logout(this);
  }
}

// authentication.component.ts
import { Component } from '@angular/core';
import { AuthenticationContext } from './authentication-context';

@Component({
  selector: 'app-authentication',
  template: `
    <button (click)="authenticate()">Login</button>
    <button (click)="logout()">Logout</button>
  `,
})
export class AuthenticationComponent {
  private authContext = new AuthenticationContext();

  authenticate() {
    this.authContext.authenticate();
  }

  logout() {
    this.authContext.logout();
  }
}
```

- AuthenticationState interface defines the methods.
- AuthenticatedState and UnauthenticatedState implement different behaviors.
- AuthenticationContext holds the current state and changes behavior accordingly.
