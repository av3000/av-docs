# Builder

Use case: Complex object construction.

Example: Using FormBuilder to create complex reactive forms.

How to find: Look for FormBuilder injection and usage in component files.

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. Angular's FormBuilder is an excellent example of this pattern, providing a fluent API to construct complex FormGroup instances.

```js
// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm">
      <label>
        Name:
        <input formControlName="name" />
      </label>

      <div formGroupName="address">
        <label>
          Street:
          <input formControlName="street" />
        </label>
        <label>
          City:
          <input formControlName="city" />
        </label>
      </div>

      <button [disabled]="!userForm.valid">Submit</button>
    </form>
  `,
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      }),
    });
  }
}
```

The FormBuilder service is injected into the component.
It provides methods like group() to build a complex form structure in a readable and maintainable way.
This approach simplifies form creation and adheres to the Builder pattern by abstracting the construction logic.
