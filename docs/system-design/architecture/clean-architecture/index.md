# Clean Architecture

Clean Architecture protects business rules from delivery mechanisms and infrastructure. Its defining rule is dependency direction: source-code dependencies point inward toward policy, not outward toward frameworks and tools.

```text
Presentation ───────┐
                    v
Infrastructure -> Application -> Domain
```

The exact diagram varies between implementations. The stable idea is that inner code must not know which web framework, database, queue, or email provider the application uses.

## The four common layers

### Domain

The domain expresses business concepts and rules without depending on the rest of the application.

Typical contents:

- entities and aggregates;
- value objects;
- domain services;
- domain events;
- domain errors and domain-specific exceptions;
- repository abstractions only when the domain itself needs them.

The domain should be testable without starting a web server or connecting to a database. A rules-heavy application benefits from a [rich domain model](../backend-architecture-patterns/rich-domain-model.md); a simple CRUD application may not need one.

### Application

The application layer defines use cases and orchestrates the domain. It decides the order of work: load state, invoke domain behavior, persist changes, and return a result.

Typical contents:

- application services or command/query handlers;
- ports needed by a use case, such as clock, persistence, messaging, and email abstractions;
- request validation and authorization policies;
- cross-cutting request behaviors;
- contracts returned by use cases.

This layer contains workflow logic, not infrastructure implementation details. [CQRS](../backend-architecture-patterns/cqrs.md) is one way to model its use cases.

### Infrastructure

Infrastructure implements interactions with external systems:

- relational or document databases;
- repository and unit-of-work implementations;
- message brokers and background jobs;
- identity providers;
- email and file-storage providers;
- distributed caches;
- observability integrations.

Infrastructure depends on inner abstractions. For example, the application may define `BookingRepository`; infrastructure implements it with PostgreSQL or another store.

### Presentation

Presentation translates an external protocol into an application use case and translates the result back. It can be an HTTP API, gRPC service, CLI, message consumer, or UI server.

Typical contents:

- endpoints or controllers;
- transport request and response models;
- middleware and filters;
- dependency-injection composition;
- protocol-specific authentication and error mapping.

Presentation should remain thin. It should not become the main home of business rules.

## Dependency inversion, not dependency injection

These terms are related but different:

- **Dependency inversion** is the design principle: high-level policy should not depend directly on low-level details; both meet through abstractions at a useful boundary.
- **Dependency injection** is a construction technique: dependencies are supplied to an object rather than created inside it.

A dependency-injection container can wire a poorly layered system. Conversely, dependency inversion can be applied with manual construction and no container.

## A practical folder structure

One project per layer makes boundaries visible:

```text
Domain/
  Entities/
  ValueObjects/
  DomainEvents/

Application/
  Abstractions/
  Behaviors/
  Bookings/
    Commands/
    Queries/

Infrastructure/
  Persistence/
  Messaging/
  Email/

Presentation/
  Endpoints/
  Middleware/
  Contracts/
```

Folders are only one enforcement mechanism. A smaller application can use one project with disciplined namespaces. A larger application may split persistence into a separate project. Choose the least granular structure that still makes invalid dependencies difficult.

## Layer-first and feature-first can coexist

Clean Architecture defines dependency policy; it does not require every folder to be organized by technical type. A pragmatic hybrid often keeps Domain and Infrastructure as strong boundaries while grouping Application and Presentation code by use case:

```text
Application/
  Bookings/
    ConfirmBooking/
    SearchBookings/
```

That hybrid combines inward dependencies with the locality of [vertical slices](../backend-architecture-patterns/vertical-slice-architecture.md).

## Benefits and costs

Potential benefits:

- business rules survive framework and infrastructure changes;
- focused unit tests need fewer external dependencies;
- explicit boundaries reduce accidental coupling;
- infrastructure choices can be deferred or replaced behind a real seam.

Potential costs:

- extra projects, mappings, and abstractions;
- indirection while tracing a simple operation;
- interfaces created without a genuine boundary or variation;
- ceremony that outweighs value in simple CRUD systems.

Use Clean Architecture when protecting business policy is worth the boundary cost. Do not reproduce every layer mechanically in every application.

## Related concepts

- [Backend architecture patterns](../backend-architecture-patterns/)
- [Rich domain model](../backend-architecture-patterns/rich-domain-model.md)
- [CQS and CQRS](../backend-architecture-patterns/cqrs.md)
- [Vertical Slice Architecture](../backend-architecture-patterns/vertical-slice-architecture.md)

## Sources

- [How To Approach Clean Architecture Folder Structure](https://milanjovanovic.tech/blog/clean-architecture-folder-structure)
- [Pragmatic Clean Architecture](https://milanjovanovic.tech/pragmatic-clean-architecture) — a course overview used as a topic inventory, not as a detailed explanation of every topic it lists.
