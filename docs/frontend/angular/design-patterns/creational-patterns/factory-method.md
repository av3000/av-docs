# Factory Method Pattern

[https://dev.to/coly010/the-factory-pattern-design-patterns-meet-the-frontend-1p2l](https://dev.to/coly010/the-factory-pattern-design-patterns-meet-the-frontend-1p2l)

The Factory Pattern is a creational design pattern that adds an abstraction layer over common base behaviour between multiple objects of a generic type.
The client code, the code that will use this layer, does not need to know the specifics of the implementation of the behaviour, as long as it exists.

Angular allows the usage of Factories in their Module Providers. Developers can provide dependencies to modules using a factory, which is extremely useful when information required for the provider is not available until Runtime.

UML Diagram to illustrate it:

[uml-diagram-factory-pattern](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fhmeoq57v3cj12a329sng.png)

## When should it be used

- Any situation where at or during runtime you do not know the exact type or dependency a specific portion of your code needs to work with.
- If you are developing a library, using the Factory Pattern allows you to provide a method for consuming developers to extend its internal components without requiring access to the source itself!
- If you need to save system resources, you can use this Pattern to create an Object Pool, where new objects are stored when they do not already exist, and will be retrieved from when they do exist, instead of creating a new one.

## Pros & Cons

Advantages:

- It avoids tight coupling between the Consumer of the Factory and the Concrete Implementations.
- In a way it meets the Single Responsibility Principle by allowing the creation code to be maintained in one area.
- It also meets the Open/Closed Principle by allowing new Concrete Implementations to be added without breaking the existing code.

Disadvantages:

- It can increase the complexity and maintainability of the codebase as it requires a lot of new subclasses for each Factory and Concrete Implementation

## FormFactory example

Use case: Creating objects without specifying the exact class of object to be created.

Example: Using a service to create different types of form controls.

How to find: Look for methods that return instances of a common interface or base class.

```js
// form-control.factory.ts
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormControlFactory {
  createControl(config: any): FormControl | FormGroup {
    switch (config.type) {
      case 'text':
        return new FormControl('', Validators.required);
      case 'email':
        return new FormControl('', [Validators.required, Validators.email]);
      case 'group':
        const groupControls = {};
        config.controls.forEach((ctrlConfig: any) => {
          groupControls[ctrlConfig.name] = this.createControl(ctrlConfig);
        });
        return new FormGroup(groupControls);
      default:
        return new FormControl('');
    }
  }
}

// dynamic-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControlFactory } from './form-control.factory';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="formGroup">
      <!-- form fields here -->
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formControlFactory: FormControlFactory) {}

  ngOnInit() {
    const formConfig = {
      type: 'group',
      controls: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    };

    this.formGroup = this.formControlFactory.createControl(formConfig) as FormGroup;
  }
}
```
