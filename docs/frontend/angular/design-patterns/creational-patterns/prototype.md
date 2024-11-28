# Prototype

Use case: Creating new objects by copying an existing object (the prototype), which is useful when object creation is expensive.

Example: Cloning configuration objects or state in Angular services or components to prevent unintended mutations.

How to find: Look for code that creates copies of objects using methods like `Object.assign`, spread operators `{ ...obj }`, or utility libraries like `lodash` with `_.cloneDeep()`.

In Angular applications, especially when dealing with immutable data patterns (common in NgRx store management), the prototype pattern is used to create copies of objects to ensure that the original object remains unmodified. This is essential for maintaining predictable state changes and optimizing change detection.

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-prototype-example",
  template: '<button (click)="modifyUser()">Modify User</button>',
})
export class PrototypeExampleComponent {
  user = {
    name: "Alice",
    age: 30,
    address: {
      city: "Wonderland",
      zip: "12345",
    },
  };

  modifyUser() {
    // Using spread operator to create a shallow copy
    const updatedUser = { ...this.user, age: 31 };

    // For deep copy, you might use JSON methods or a utility library
    // const updatedUser = JSON.parse(JSON.stringify(this.user));
    // updatedUser.address.city = 'New Wonderland';

    console.log("Original User:", this.user);
    console.log("Updated User:", updatedUser);
  }
}
```
