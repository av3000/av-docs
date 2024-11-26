---
sidebar_label: "Intro"
sidebar_position: 1
---

# Angular Design Patterns

[https://github.com/amosISA/angular-design-patterns](https://github.com/amosISA/angular-design-patterns) <br/>
[https://angular.love/overview-of-oop-patterns-implementation-in-javascript](https://angular.love/overview-of-oop-patterns-implementation-in-javascript) <br/>

## List of Patterns

### Creational Patterns

[Creational Patterns](./creational-patterns/index)

- [Singleton](./creational-patterns/singleton)
- [Factory Method](./creational-patterns/factory-method)
- [Abstract Factory](./creational-patterns/abstract-factory)
- [Builder](./creational-patterns/builder)
- [Prototype](./creational-patterns/prototype)

### Creational Pattern Examples

Creational patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

Singleton Pattern
Use case: Shared service instances across the application
Example: Angular's built-in services like HttpClient
How to find: Look for `@Injectable({ providedIn: 'root' })` decorators

Factory Method Pattern
Use case: Creating objects without specifying the exact class of object to be created
Example: Using a service to create different types of form controls
How to find: Look for methods that return instances of a common interface or base class

Builder Pattern
Use case: Complex object construction
Example: Using FormBuilder to create complex reactive forms
How to find: Look for FormBuilder injection and usage in component files

---

### Structural Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

- [Adapter](./structural-patterns/adapter)
- [Bridge](./structural-patterns/bridge)
- [Composite](./structural-patterns/composite)
- [Decorator](./structural-patterns/decorator)
- [Facade](./structural-patterns/facade)
- [Flyweight](./structural-patterns/flyweight)
- [Proxy](./structural-patterns/proxy)

### Structural Pattern Examples

Decorator Pattern
Use case: Adding behavior to components or services without modifying their code
Example: Using Angular decorators like @Component, @Injectable, or custom property decorators
How to find: Look for @ symbols followed by decorator names in class definitions

Proxy Pattern
Use case: Lazy loading of modules or components
Example: Using Angular's router for lazy loading feature modules
How to find: Check RouterModule configurations in app routing files for lazy-loaded routes

Composite Pattern
Use case: Building complex UI structures from simpler components
Example: Nested components in Angular templates
How to find: Analyze component templates for nested custom elements

---

### Behavioural Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.

- [Chain of Responsibility](./behavioural-patterns/chain-of-responsibility)
- [Command](./behavioural-patterns/command)
- [Iterator](./behavioural-patterns/iterator)
- [Mediator](./behavioural-patterns/mediator)
- [Memento](./behavioural-patterns/memento)
- [Observer](./behavioural-patterns/observer)
- [State](./behavioural-patterns/state)
- [Strategy](./behavioural-patterns/strategy)
- [Template Method](./behavioural-patterns/template-method)
- [Visitor](./behavioural-patterns/visitor)

### Behavioural Pattern Examples

Observer Pattern
Use case: Reactive programming with RxJS
Example: Using Subject or BehaviorSubject for state management
How to find: Look for RxJS import statements and usage of Observables in services and components

Strategy Pattern
Use case: Implementing different algorithms or strategies that can be switched at runtime
Example: Using different validation strategies in reactive forms
How to find: Search for classes or functions that implement a common interface but with different logic

Command Pattern
Use case: Encapsulating a request as an object
Example: Implementing undo/redo functionality or action creators in NgRx
How to find: Look for classes that encapsulate all information needed to perform an action or trigger an event

---

### Inversion of Control Pattern (With DI)

This pattern focuses on reversing the responsibility of creating and managing objects from one class to another. Instead of a class having the responsibility of creating and managing its dependencies, the main class provides the dependencies through a **dependency injection container**.

This means that the main class does not worry about how the dependencies are created or managed, but simply relies on the dependency injection container to provide them. This allows for greater flexibility in the code, as dependencies can be easily replaced and modified without affecting the main class. Improves the clarity and readability of the code by separating the responsibility of creating and managing objects from the main logic of the application. This pattern is essential for large and complex applications, where dependency management can be a challenge. In Angular is implemented using the **Dependency Injection**. Instead of making API fetch request from the main component, we can have service component handling this responsibility.

**Dependency Injection** allows your components or services to borrow other components or services they need to function.

- Improves the organization and readability of the code by separating the responsibilities of each component or service.
- Facilitates testing and maintenance of the code, as it is easier to change or replace a specific component or service without affecting others.
- Allows different components or services to share information and work together efficiently.

Example of [Dependency Injection in Angular](./dependency-injection#di-mechanism)

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://api.example.com/data');
  }
}
```