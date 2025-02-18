# The Clean Architecture

Defines how should the application be structured, with business rules at the systems core which are **Domain** and **Application** layers. **Presentation** and **Infrastructure** are considered as a external dependencies.

Beneficial to use in Monoliths, Modular Monoliths, Micro-services, but should be used for:

- Domain-Driven design (DDD).
- Complex business logic.
- Highly testable projects.
- Architecture enforcing design policies. (Already defining high-level components of the system).

## Core business logic - Domain layer.

- should not have a reference to other components or layers in the system.
- should be able to express the business logic on its own.

Consists of:

- Entities(containing business rules).
- Value objects.
- Domain events.
- Domain services.
- Interfaces (for any abstractions that are required by domain, like **repository** interfaces).
- Exceptions.
- Enums.

## Application layer.

Responsible for telling the domain entities and other domain components what should they be doing.

- Defines the use cases. (By application services, CQRS with MediatR)
- Contains application business logic. (responsible for checking any preconditions and telling domain layer what to do)
- Orchestrates the domain.

Benefits of CQRS:

- Pros.
  - Single responsibility principle,
  - Interface segragation principle,
  - Decorator patterns (Mediators pipeline behaviour)
  - Loose coupling,
- Cons.
  - Indirection.

## Presentation layer.

Entry point to the system with the role of taking in an incoming request and then delegate it to the appropriate use case.

- Contains the public API.
  - rest API,
    - endpoints,
    - Middleware,
    - DI setup,
  - Blazer application,
  - GRPC service.

## Infrastructure layer.

- Handles interactions with external services need for application to function.
  - Databases,
  - Messaging,
  - Email providers,
  - Storage services,
  - Identity providers.

## Architectural Principles

All of these three qualities are assured if design is implemented correctly:

- Maintainability.
- Testability.
- Loose coupling.

## Design Principles

- Separation of concerns. ()
- Encapsulation.
- Dependency inversion (DI).
- Explicit dependencies.
- Single responsibility.
- Persistence ignorance.

### Dependency Inversion

- Dependencies flow inwards.
- Inner layers define interfaces or abstractions.
- Outer layers implement them.
- Domain-centric approach to organizing dependencies.
- Application core can be free of external concerns.
- Allows the system to easily replace external dependencies.

_Notice: Not all abstractions are created equal and not all external dependencies are so easily replaced._
