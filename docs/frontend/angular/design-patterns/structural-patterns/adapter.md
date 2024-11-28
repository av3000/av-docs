# Adapter

Use case: Allowing incompatible interfaces to work together.

Example: Integrating a third-party library or legacy code with an Angular application.

How to find: Look for services or components that wrap external APIs or libraries to conform to the application's expected interfaces.

Explanation:

The Adapter pattern allows objects with incompatible interfaces to collaborate. In Angular, you might need to use a third-party library that doesn't fit neatly into your application's architecture. By creating an adapter (wrapper), you can translate the interface of the library into one that your application understands.

Example Code:

Suppose you're integrating a third-party logging library that doesn't fit Angular's logging service interface.

```js
// third-party-logger.ts (Third-party library)
export class ThirdPartyLogger {
  logMessage(msg: string) {
    console.log(`ThirdPartyLogger: ${msg}`);
  }

  logError(err: string) {
    console.error(`ThirdPartyLogger Error: ${err}`);
  }
}

// Adapter logger.service.ts
import { Injectable } from '@angular/core';
import { ThirdPartyLogger } from './third-party-logger';

export interface ILoggerService {
  log(message: string): void;
  error(message: string): void;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILoggerService {
  private thirdPartyLogger = new ThirdPartyLogger();

  log(message: string): void {
    this.thirdPartyLogger.logMessage(message);
  }

  error(message: string): void {
    this.thirdPartyLogger.logError(message);
  }
}

// example.component.ts
import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-example',
  template: `<button (click)="doSomething()">Do Something</button>`,
})
export class ExampleComponent {
  constructor(private logger: LoggerService) {}

  doSomething() {
    this.logger.log('Action performed.');
  }
}
```

- The LoggerService acts as an adapter between the Angular application and the ThirdPartyLogger.
- It implements an ILoggerService interface that the application components expect.
- The components use LoggerService without needing to know about the ThirdPartyLogger.
