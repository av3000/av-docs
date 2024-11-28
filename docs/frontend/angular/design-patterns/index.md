---
sidebar_label: "Intro"
sidebar_position: 1
---

# Angular Design Patterns

[https://github.com/amosISA/angular-design-patterns](https://github.com/amosISA/angular-design-patterns) <br/>
[https://angular.love/overview-of-oop-patterns-implementation-in-javascript](https://angular.love/overview-of-oop-patterns-implementation-in-javascript) <br/>

## List of Patterns

### Creational Patterns

Creational patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

[Creational Patterns](./creational-patterns/index.md)

- [Singleton](./creational-patterns/singleton.md)
- [Factory Method](./creational-patterns/factory-method.md)
- [Abstract Factory](./creational-patterns/abstract-factory.md)
- [Builder](./creational-patterns/builder.md)
- [Prototype](./creational-patterns/prototype.md)

---

### Structural Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

- [Adapter](./structural-patterns/adapter.md)
- [Bridge](./structural-patterns/bridge.md)
- [Composite](./structural-patterns/composite.md)
- [Decorator](./structural-patterns/decorator.md)
- [Facade](./structural-patterns/facade.md)
- [Flyweight](./structural-patterns/flyweight.md)
- [Proxy](./structural-patterns/proxy.md)

---

### Behavioural Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.

- [Chain of Responsibility](./behavioural-patterns/chain-of-responsibility.md)
- [Command](./behavioural-patterns/command.md)
- [Iterator](./behavioural-patterns/iterator.md)
- [Mediator](./behavioural-patterns/mediator.md)
- [Memento](./behavioural-patterns/memento.md)
- [Observer](./behavioural-patterns/observer.md)
- [State](./behavioural-patterns/state.md)
- [Strategy](./behavioural-patterns/strategy.md)
- [Template Method](./behavioural-patterns/template-method.md)
- [Visitor](./behavioural-patterns/visitor.md)

### Inversion of Control Pattern (With DI)

This pattern focuses on reversing the responsibility of creating and managing objects from one class to another. Instead of a class having the responsibility of creating and managing its dependencies, the main class provides the dependencies through a **dependency injection container**.

This means that the main class does not worry about how the dependencies are created or managed, but simply relies on the dependency injection container to provide them. This allows for greater flexibility in the code, as dependencies can be easily replaced and modified without affecting the main class. Improves the clarity and readability of the code by separating the responsibility of creating and managing objects from the main logic of the application. This pattern is essential for large and complex applications, where dependency management can be a challenge. In Angular is implemented using the **Dependency Injection**. Instead of making API fetch request from the main component, we can have service component handling this responsibility.

**Dependency Injection** allows your components or services to borrow other components or services they need to function.

- Improves the organization and readability of the code by separating the responsibilities of each component or service.
- Facilitates testing and maintenance of the code, as it is easier to change or replace a specific component or service without affecting others.
- Allows different components or services to share information and work together efficiently.

Example of [Dependency Injection in Angular](../dependency-injection.md#di-mechanism)

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
