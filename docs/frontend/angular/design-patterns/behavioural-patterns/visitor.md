# Visitor

Use case: Adding new operations to existing object structures without modifying the structures.

Example: Traversing a complex data structure like an abstract syntax tree and performing operations.

How to find: Look for objects that accept a visitor object and have a method to accept visitors.

Explanation:

The Visitor pattern allows adding new operations to existing object structures without modifying the structures. The objects accept a visitor, which performs the operation.

Example Code:

```js
// element.interface.ts
export interface Element {
  accept(visitor: Visitor): void;
}

// concrete-element-a.ts
import { Element } from "./element.interface";
import { Visitor } from "./visitor.interface";

export class ConcreteElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementA(this);
  }

  operationA(): string {
    return "ConcreteElementA";
  }
}

// concrete-element-b.ts
import { Element } from "./element.interface";
import { Visitor } from "./visitor.interface";

export class ConcreteElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementB(this);
  }

  operationB(): string {
    return "ConcreteElementB";
  }
}

// visitor.interface.ts
import { ConcreteElementA } from "./concrete-element-a";
import { ConcreteElementB } from "./concrete-element-b";

export interface Visitor {
  visitElementA(element: ConcreteElementA): void;
  visitElementB(element: ConcreteElementB): void;
}

// concrete-visitor.ts
import { Visitor } from "./visitor.interface";
import { ConcreteElementA } from "./concrete-element-a";
import { ConcreteElementB } from "./concrete-element-b";

export class ConcreteVisitor implements Visitor {
  visitElementA(element: ConcreteElementA): void {
    console.log(`Visitor is processing ${element.operationA()}`);
  }

  visitElementB(element: ConcreteElementB): void {
    console.log(`Visitor is processing ${element.operationB()}`);
  }
}

// client.component.ts
import { Component } from "@angular/core";
import { ConcreteElementA } from "./concrete-element-a";
import { ConcreteElementB } from "./concrete-element-b";
import { ConcreteVisitor } from "./concrete-visitor";

@Component({
  selector: "app-client",
  template: `<button (click)="run()">Run Visitor Pattern</button>`,
})
export class ClientComponent {
  run() {
    const elements = [new ConcreteElementA(), new ConcreteElementB()];
    const visitor = new ConcreteVisitor();

    elements.forEach((element) => element.accept(visitor));
  }
}
```

- Elements (ConcreteElementA, ConcreteElementB) implement an accept() method that takes a Visitor.
- The Visitor interface defines methods for each concrete element.
- ConcreteVisitor implements the operations to perform on each element.
- The client uses the visitor to perform operations on elements without modifying their classes.
