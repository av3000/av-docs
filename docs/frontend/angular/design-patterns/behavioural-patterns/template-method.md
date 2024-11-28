# Template Method

Use case: Defining the skeleton of an algorithm in an operation, deferring some steps to subclasses.

Example: Base component class that defines common logic with abstract methods to be implemented by subclasses.

How to find: Look for abstract base classes with methods that call abstract methods to be overridden.

Explanation:

The Template Method pattern defines the skeleton of an algorithm, allowing subclasses to redefine certain steps without changing the algorithm's structure. In Angular, you might have a base class for components that provides a common workflow.

Example Code:

```js
// base-dialog.component.ts
export abstract class BaseDialogComponent {
  open() {
    this.beforeOpen();
    this.render();
    this.afterOpen();
  }

  protected abstract beforeOpen(): void;
  protected abstract render(): void;
  protected abstract afterOpen(): void;
}

// confirm-dialog.component.ts
import { Component } from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';

@Component({
  selector: 'app-confirm-dialog',
  template: `<div>Confirm Dialog Content</div>`,
})
export class ConfirmDialogComponent extends BaseDialogComponent {
  protected beforeOpen(): void {
    console.log('ConfirmDialog: beforeOpen');
  }

  protected render(): void {
    console.log('ConfirmDialog: render');
  }

  protected afterOpen(): void {
    console.log('ConfirmDialog: afterOpen');
  }
}

// alert-dialog.component.ts
import { Component } from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';

@Component({
  selector: 'app-alert-dialog',
  template: `<div>Alert Dialog Content</div>`,
})
export class AlertDialogComponent extends BaseDialogComponent {
  protected beforeOpen(): void {
    console.log('AlertDialog: beforeOpen');
  }

  protected render(): void {
    console.log('AlertDialog: render');
  }

  protected afterOpen(): void {
    console.log('AlertDialog: afterOpen');
  }
}
```

- BaseDialogComponent defines the template method `open()`.
- Subclasses (`ConfirmDialogComponent`, `AlertDialogComponent`) provide specific implementations of the abstract methods.
- The algorithm's structure (`open()`) remains unchanged.
