# Decorator

Use case: Adding behavior to components or services without modifying their code.

Example: Using Angular decorators like @Component, @Injectable, or custom property decorators.

How to find: Look for @ symbols followed by decorator names in class definitions.

Explanation:

In Angular, decorators are a form of the Decorator pattern. They allow you to annotate and modify classes and class members. Angular uses decorators extensively to define components, services, and other functionalities.

Example Code:

Custom Property Decorator:

```js
// readonly.decorator.ts
export function ReadOnly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

// demo.component.ts
import { Component } from "@angular/core";
import { ReadOnly } from "./readonly.decorator";

@Component({
  selector: "app-demo",
  template: `<p>{{ message }}</p>`,
})
export class DemoComponent {
  @ReadOnly
  message = "This is a read-only message";

  constructor() {
    // Trying to modify the message will have no effect
    this.message = "Attempting to change the message";
  }
}
```

- The @ReadOnly decorator adds behavior to the message property without modifying the original code.
- Angular's built-in decorators like @Component and @Injectable also add metadata and behavior to classes.
