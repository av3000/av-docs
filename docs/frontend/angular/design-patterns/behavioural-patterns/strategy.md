# Strategy

Use case: Implementing different algorithms or strategies that can be switched at runtime.

Example: Using different validation strategies in reactive forms.

How to find: Search for classes or functions that implement a common interface but with different logic.

Explanation:

The Strategy pattern allows selecting an algorithm's behavior at runtime. You define a family of algorithms, encapsulate each one, and make them interchangeable. In Angular, you might switch between different validation strategies or sorting algorithms based on user input or configuration.

```js
// validation-strategy.interface.ts
export interface ValidationStrategy {
  validate(value: any): boolean;
}

// required-validation.strategy.ts
import { ValidationStrategy } from './validation-strategy.interface';

export class RequiredValidationStrategy implements ValidationStrategy {
  validate(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }
}

// email-validation.strategy.ts
import { ValidationStrategy } from './validation-strategy.interface';

export class EmailValidationStrategy implements ValidationStrategy {
  validate(value: any): boolean {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
  }
}

// validator.service.ts
import { Injectable } from '@angular/core';
import { ValidationStrategy } from './validation-strategy.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  private strategy: ValidationStrategy;

  setStrategy(strategy: ValidationStrategy) {
    this.strategy = strategy;
  }

  validate(value: any): boolean {
    return this.strategy.validate(value);
  }
}

// dynamic-form.component.ts
import { Component } from '@angular/core';
import { ValidatorService } from './validator.service';
import { RequiredValidationStrategy } from './required-validation.strategy';
import { EmailValidationStrategy } from './email-validation.strategy';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <input [(ngModel)]="inputValue" />
    <button (click)="useRequiredValidation()">Use Required Validation</button>
    <button (click)="useEmailValidation()">Use Email Validation</button>
    <div>Is Valid: {{ isValid }}</div>
  `,
})
export class DynamicFormComponent {
  inputValue: string;
  isValid: boolean;

  constructor(private validatorService: ValidatorService) {}

  useRequiredValidation() {
    this.validatorService.setStrategy(new RequiredValidationStrategy());
    this.validate();
  }

  useEmailValidation() {
    this.validatorService.setStrategy(new EmailValidationStrategy());
    this.validate();
  }

  validate() {
    this.isValid = this.validatorService.validate(this.inputValue);
  }
}
```

- ValidationStrategy interface defines the validation method.
- Different strategies (RequiredValidationStrategy, EmailValidationStrategy) implement this interface.
- ValidatorService uses the selected strategy to validate input.
- DynamicFormComponent switches strategies at runtime based on user actions.
