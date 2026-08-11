# Backend architecture patterns

Backend architecture is easier to reason about when each pattern is placed on the problem axis it actually addresses. Clean Architecture, CQRS, Vertical Slice Architecture, REPR, rich domain models, and modular monoliths are not direct competitors.

They answer different questions:

| Question | Pattern or concept |
| --- | --- |
| Which code may depend on which other code? | Clean Architecture |
| Where should business rules live? | Rich domain model and Domain-Driven Design |
| Should reads and writes use the same model? | CQS and CQRS |
| Should code be grouped by technical type or use case? | Vertical Slice Architecture |
| How should one API operation be represented? | REPR |
| How should a single deployment be split into business modules? | Modular monolith |
| How can state changes and side effects be coordinated reliably? | Domain events, Outbox, Inbox, idempotency, and eventual consistency |

## The relationship map

```text
Deployment boundary
└── Modular monolith
    ├── Module: Bookings
    │   ├── Clean Architecture controls dependency direction
    │   ├── Vertical slices group each use case
    │   ├── CQRS distinguishes commands from queries
    │   ├── REPR shapes each HTTP endpoint
    │   └── Rich domain objects protect booking rules
    └── Module: Payments
        └── The same patterns can be applied differently
```

The map is intentionally nested, but the nesting is not mandatory. A small CRUD module may use simple transaction scripts while a rules-heavy module uses rich aggregates. A read-only slice may query the database directly while a write slice loads a domain entity. Consistency within a use case matters more than forcing every use case through the same abstractions.

## Follow one request through the patterns

Imagine `POST /bookings/{id}/confirm`:

1. **REPR** gives the operation a dedicated request, endpoint, and response.
2. **Vertical Slice Architecture** keeps those types beside the command, handler, and validation for `ConfirmBooking`.
3. **CQRS** classifies it as a command because it changes state.
4. The command handler belongs to the **application layer** and orchestrates the use case.
5. A **rich domain entity** performs `booking.confirm(now)` and enforces rules such as “a cancelled booking cannot be confirmed.”
6. A **domain event** records that a booking was confirmed without sending email from the entity.
7. The **infrastructure layer** persists the change and may store an Outbox message in the same transaction.
8. In a **modular monolith**, another module receives an integration event through an explicit module contract rather than reaching into Booking internals.

This composition preserves a clear route from HTTP to business behavior without making the domain depend on ASP.NET, a database, or a message broker.

## Two legitimate ways to organize code

### Layer-first

```text
Domain/
Application/
Infrastructure/
Presentation/
```

Layer-first organization makes dependency rules visible and works well when the layers themselves are the main mental model. Its failure mode is scattering one feature across many distant folders.

### Feature-first

```text
Features/
  ConfirmBooking/
    Request
    Endpoint
    Command
    Handler
    Response
```

Feature-first organization maximizes cohesion around a use case. Its failure mode is letting each slice become a self-contained transaction script with duplicated or inconsistent business rules.

A pragmatic hybrid is common: keep strong domain and infrastructure boundaries, but organize application and presentation code by feature. Folder names do not create architecture on their own; dependency rules and ownership do.

## Decision guide

Start with the least ceremony that protects the system's real complexity:

- Use straightforward CRUD when the system mainly moves data and business rules are simple.
- Introduce vertical slices when changes are usually feature-shaped and layer-first navigation is slowing work.
- Introduce logical CQRS when reads and writes have meaningfully different models or optimization needs.
- Use a rich domain model when invariants, lifecycle transitions, and domain language are central.
- Use Clean Architecture boundaries when business rules must stay independent from delivery and infrastructure details.
- Use a modular monolith when one deployment is desirable but business capabilities need explicit ownership and isolation.
- Split physical read/write stores or deploy modules as microservices only when independent scaling, ownership, or release requirements justify distributed-system costs.

## Common misconceptions

- **CQRS does not require two databases.** The first useful step can be separate command and query code paths over one database.
- **Vertical slices do not forbid layers.** A slice can cross presentation and application concerns while still calling a dependency-free domain model.
- **REPR is not REST.** It structures an endpoint; it can expose REST-style resources or RPC-style operations.
- **A modular monolith is not a folder-only monolith.** Modules need enforceable boundaries, explicit contracts, and controlled communication.
- **A rich domain model is not always better.** Simple workflows may be clearer as transaction scripts.
- **More abstractions do not automatically mean cleaner architecture.** An abstraction should protect a boundary or support a real variation.

## Pages in this handbook

- [Clean Architecture](../clean-architecture/)
- [Rich domain model](./rich-domain-model.md)
- [CQS and CQRS](./cqrs.md)
- [Vertical Slice Architecture](./vertical-slice-architecture.md)
- [REPR](./repr.md)
- [Modular monolith](./modular-monolith.md)
- [Production and reliability concepts](./production-and-reliability.md)

## Sources and source depth

The explanatory articles below provide the detailed arguments and examples used in this handbook:

- [CQRS Pattern With MediatR](https://milanjovanovic.tech/blog/cqrs-pattern-with-mediatr)
- [How To Approach Clean Architecture Folder Structure](https://milanjovanovic.tech/blog/clean-architecture-folder-structure)
- [Refactoring From an Anemic Domain Model To a Rich Domain Model](https://milanjovanovic.tech/blog/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model)
- [REPR Design Pattern](https://deviq.com/design-patterns/repr-design-pattern/)
- [Vertical Slice Architecture](https://milanjovanovic.tech/blog/vertical-slice-architecture)

These two pages are course overviews. They are useful as inventories of connected production topics, but they do not explain every listed topic in depth:

- [Pragmatic Clean Architecture](https://milanjovanovic.tech/pragmatic-clean-architecture)
- [Modular Monolith Architecture](https://milanjovanovic.tech/modular-monolith-architecture)

