# Singleton Pattern

Use case: Shared service instances across the application.

Example: Angular's built-in services like HttpClient provided via dependency injection.

How to find: Look for `@Injectable({ providedIn: 'root' })` decorators.

In Angular, services are often singletons when provided in the root injector. This means there's only one instance of the service throughout the application. The Singleton pattern ensures a class has only one instance and provides a global point of access to it.

By using `@Injectable({ providedIn: 'root' })`, Angular ensures that the service is registered with the root injector, making it a singleton. This is useful for services that maintain state or provide utility functions that need to be shared across multiple components.

```js
// logging.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private logs: string[] = [];

  add(message: string) {
    this.logs.push(message);
    console.log('Log added:', message);
  }

  clear() {
    this.logs = [];
    console.log('Logs cleared');
  }

  getLogs() {
    return this.logs;
  }
}

// any-component.component.ts
import { Component } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-any-component',
  template: `<button (click)="doSomething()">Do Something</button>`,
})
export class AnyComponent {
  constructor(private loggingService: LoggingService) {}

  doSomething() {
    this.loggingService.add('AnyComponent did something.');
  }
}

// another-component.component.ts
import { Component } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-another-component',
  template: `<button (click)="doSomethingElse()">Do Something Else</button>`,
})
export class AnotherComponent {
  constructor(private loggingService: LoggingService) {}

  doSomethingElse() {
    this.loggingService.add('AnotherComponent did something else.');
  }
}

// app.component.ts
import { Component } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  template: `
    <app-any-component></app-any-component>
    <app-another-component></app-another-component>
    <button (click)="showLogs()">Show Logs</button>
  `,
})
export class AppComponent {
  constructor(private loggingService: LoggingService) {}

  showLogs() {
    console.log(this.loggingService.getLogs());
  }
}
```

- The LoggingService is provided in the root injector, making it a singleton.
- Multiple components inject LoggingService and interact with the same instance.
- The logs collected from different components are stored in the same service instance.
- This demonstrates the Singleton pattern by ensuring there's only one LoggingService instance shared across the application.

### Singleton Pattern

There are two ways to make a service a singleton in Angular:

- Set the providedIn property of the `@Injectable()` to `"root"`
- Include the service in the AppModule or in a module that is only imported by the AppModule

[https://angular.io/guide/singleton-services](https://angular.io/guide/singleton-services) <br/>

[https://www.geeksforgeeks.org/singleton-design-pattern/](https://www.geeksforgeeks.org/singleton-design-pattern/) <br/>

A component or service that is instantiated only once and is available to all other components or services that need it. This way, all components can share the same information and work together in a coordinated manner.

For example, we can create a singleton service that handles all the authentication and authorization logic in our application. To create a singleton service, we can use the providedIn property in the @Injectable decorator to set the value to ‘root’. This ensures that the service is only instantiated once and is available throughout the entire application.

Here is an example implementation of a singleton service in Angular:

```js
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // authentication and authorization logic

  constructor() {}
}
```

By setting providedIn to ‘root’, we ensure that the service is only instantiated once and is available throughout the entire application. More in [Injectable providedIn root](../../injectors.md#providedin-root)

#### When to use

##### Advantages:

- Ensures that all components have access to the same information and avoids errors or inconsistencies in the application.
- Improves the efficiency and performance of the application, as unnecessary multiple instances of a component or service are not created.
- Facilitates problem-solving and code maintenance, as all components can access the same information and achieve a common goal.

###### Weaknesses:

- Tight coupling, makes harder to refactor, considered anti-pattern.
- Singleton introduces global state into your application, which can make it difficult to manage and test. Changes to the Singleton instance affect the entire application, potentially leading to unintended consequences.
- Singletons can make unit testing difficult since they introduce a global state. This can complicate testing components that depend on a Singleton, as its state can influence the test results.
- Scalling issues, becomes overbloated.
- Singleton introduces global state into your application, which can make it difficult to manage and test.
- Changes to the Singleton instance affect the entire application, potentially leading to unintended consequences.

Examples of anti-pattern:

Global State and Hidden Dependencies:

- An application uses a Singleton for managing configuration settings. Any class can access and modify the configuration settings, leading to unexpected behaviors. The global state makes it hard to track which part of the code changes the settings, causing hidden dependencies and making debugging difficult.
  Testing Difficulties:
- A logging system is implemented as a Singleton to ensure a single point of logging. During unit tests, it's challenging to isolate the logger from other parts of the application. Mocking the Singleton is complex, and tests might inadvertently affect each other due to shared state.
  Concurrency Problems:
- A Singleton is used for managing database connections in a multi-threaded application. If the Singleton is not properly synchronized, it can lead to race conditions and inconsistent states. Multiple threads accessing the Singleton simultaneously can cause performance bottlenecks and data corruption.
  Scalability Constraints:
- An application uses a Singleton for a cache system to store frequently accessed data. As the application scales, the single cache instance becomes a bottleneck. It cannot efficiently handle a high volume of requests, leading to performance degradation.
  Inflexibility:
- A Singleton is used to manage service instances in a microservices architecture. The tight coupling introduced by the Singleton makes it difficult to change or replace the service implementation. It limits flexibility and slows down the ability to adapt to new requirements or technologies.
  Memory Leaks:
- A Singleton is used to manage a pool of reusable objects. If the Singleton holds references to objects that are no longer needed, it can prevent them from being garbage collected, leading to memory leaks and increased memory usage over time.
  Environment-Specific Issues:
- A Singleton is used for environment-specific configurations (e.g., development, testing, production). The Singleton's state can be inadvertently carried over from one environment to another, causing environment-specific bugs and making it hard to replicate issues consistently across different environments.
