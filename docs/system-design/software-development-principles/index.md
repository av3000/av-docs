---
sidebar_label: "Intro"
sidebar_position: 1
---

# Software development principles

[https://thetshaped.dev/p/3-software-development-principles](https://thetshaped.dev/p/3-software-development-principles)

[Object-Oriented programming](oop.md)

# List

- [YAGNI](#yagni---you-are-not-gonna-need-it)
- [KISS](#kiss---keep-it-simple-stupid)
- [DRY](#dry---do-not-repeat-yourself)
- [SOLID](#SOLID)

## YAGNI - you are not gonna need it

Don’t add features or functionality to our software that we currently don’t need.
Helps to avoid clutter and maintenance burden.

```js
// BAD: Adding future functionality that isn't required yet.
class CarplateService {
  // Current requirement: Get carplate by ID
  getCarplate(id: string): string {
    return `Carplate ${id}`;
  }

  // Added for "potential future use" but not needed now
  generateRandomCarplate(): string {
    return `Random-1234`; // This is unnecessary for now.
  }
}

// GOOD: Focus only on the current need.
class CarplateServiceSimplified {
  getCarplate(id: string): string {
    return `Carplate ${id}`;
  }
}
```

## KISS - Keep it simple, stupid

Don’t add unnecessary complexity to our software.

The KISS rule means keeping our code easy to read and understand. Instead of making things complicated and “smart”, try to write code that’s straight to the point. This makes it easier for you and others to keep track of what’s going on and fix things when they go wrong.

Instead of being too "smart" in your code, think about your colleagues and future teammates. Maybe it's better to write 2-3 lines more, but guarantee that your future teammates will understand it

It’s important to note that sometimes adding more layers of **abstraction** in our codebase may seem to conflict with the KISS principle because we add layers of complexity. However, when done carefully, abstraction can simplify the overall design by hiding complex logic behind simpler interfaces or functions. In the end, it makes our code easier to read, understand, and maintain which is our end goal.

```js
// BAD: Over-engineering a calculation with unnecessary abstraction.
class TaxCalculator {
  calculateTax(income: number): number {
    // Over-complicated logic
    return income * this.getTaxRate() * 0.9 + 0.01;
  }

  private getTaxRate(): number {
    return Math.random(); // Arbitrary complexity
  }
}

// GOOD: Straightforward and readable implementation.
class SimpleTaxCalculator {
  calculateTax(income: number): number {
    const taxRate = 0.15; // Fixed and understandable
    return income * taxRate;
  }
}
```

## DRY - Do not repeat yourself

Don’t duplicate code or data in our software.

The DRY rule is about not writing the same code over and over again. If you find yourself doing the same thing in several places, find a way to do it just once. This makes your code cleaner and easier to change later.

```js
// BAD: Duplicating the same validation logic.
function validateCarplate(carplate: string): boolean {
  return carplate.length === 7 && /^[A-Z0-9]+$/.test(carplate);
}

function validateLicense(license: string): boolean {
  return license.length === 7 && /^[A-Z0-9]+$/.test(license);
}

// GOOD: Extracting shared validation logic.
function validateInput(input: string): boolean {
  return input.length === 7 && /^[A-Z0-9]+$/.test(input);
}

function validateCarplate(carplate: string): boolean {
  return validateInput(carplate);
}

function validateLicense(license: string): boolean {
  return validateInput(license);
}
```

## SOLID

[SOLID principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)

### Single-Responsibility Principle

A class should have one and only one reason to change, meaning that a class should have only one job.

```js
// BAD: A class handling multiple responsibilities.
class CarplateManager {
  saveCarplateToDb(carplate: string): void {
    console.log(`Saving ${carplate} to DB`);
  }

  logCarplate(carplate: string): void {
    console.log(`Logging carplate: ${carplate}`);
  }
}

// GOOD: Splitting responsibilities into separate classes.
class CarplateLogger {
  log(carplate: string): void {
    console.log(`Logging carplate: ${carplate}`);
  }
}

class CarplateRepository {
  save(carplate: string): void {
    console.log(`Saving ${carplate} to DB`);
  }
}
```

### Open-Closed Principle

Objects or entities should be open for extension but closed for modification.

```js
// BAD: Modifying the class to add new behavior.
class NotificationService {
  sendNotification(type: string, message: string): void {
    if (type === "email") {
      console.log(`Sending email: ${message}`);
    } else if (type === "sms") {
      console.log(`Sending SMS: ${message}`);
    }
  }
}

// GOOD: Extending behavior via polymorphism.
interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}
```

### Interface Segregation Principle

A client should never be forced to implement an interface that it doesn’t use, or clients shouldn’t be forced to depend on methods they do not use.

```js
// BAD: Single interface with unused methods.
interface CarService {
  washCar(): void;
  paintCar(color: string): void;
}

class CarWash implements CarService {
  washCar(): void {
    console.log("Washing car...");
  }

  paintCar(color: string): void {
    throw new Error("Not implemented"); // Violates ISP
  }
}

// GOOD: Separate smaller interfaces.
interface CarWashService {
  washCar(): void;
}

interface CarPaintService {
  paintCar(color: string): void;
}

class CarWashOnly implements CarWashService {
  washCar(): void {
    console.log("Washing car...");
  }
}
```

### Dependency Inversion Principle

Entities must depend on abstractions, not on concretions. It states that the high-level module must not depend on the low-level module, but they should depend on abstractions.

```js
// BAD: High-level module depends on low-level implementation.
class CarplateController {
  service = new CarplateService(); // Tightly coupled

  getCarplates() {
    return this.service.fetchAll();
  }
}

// GOOD: High-level module depends on abstraction.
interface CarplateServiceInterface {
  fetchAll(): string[];
}

class CarplateService implements CarplateServiceInterface {
  fetchAll(): string[] {
    return ['ABC123', 'CBA321'];
  }
}

class CarplateController {
  constructor(private service: CarplateServiceInterface) {}

  getCarplates() {
    return this.service.fetchAll();
  }
}
```
