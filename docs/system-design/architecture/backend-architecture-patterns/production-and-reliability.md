# Production and reliability concepts

The architecture sources connect structural patterns with several production concerns. Choosing Clean Architecture or a modular monolith does not solve these concerns automatically; each needs an explicit design.

## Domain events and integration events

A domain event describes a meaningful fact inside a domain boundary. An integration event is a public contract sent across module or service boundaries.

Keeping the distinction prevents an internal domain type from accidentally becoming a long-lived external API. An integration event should contain stable, recipient-relevant data and should be versioned with compatibility in mind.

## Atomicity and the dual-write problem

Consider a request that updates a database and publishes a message:

```text
1. Commit booking
2. Publish BookingConfirmed
```

If the process fails between steps, the booking exists but the message is lost. Reversing the order can publish a message for a transaction that later rolls back. This is the dual-write problem.

## Outbox pattern

The Outbox pattern stores the business change and an outgoing message in the same local database transaction:

```text
Transaction: update booking + insert outbox row
Background publisher: read outbox -> publish -> mark processed
```

This makes message intent atomic with the state change. It does not guarantee exactly-once delivery: a publisher can crash after publishing but before marking the row. Consumers must tolerate duplicates.

## Inbox pattern and idempotency

The Inbox pattern records received message identifiers. A consumer checks whether a message was already processed before applying its effect.

An operation is **idempotent** when repeating it produces the same effective result as processing it once. Techniques include:

- unique message or request identifiers;
- unique database constraints;
- an Inbox table with transactional processing;
- state-transition guards such as “already confirmed”;
- idempotency keys on public APIs.

Idempotency is usually a designed property, not a broker setting.

## Temporal decoupling

Asynchronous communication lets producers and consumers run at different times. The producer can finish even when a consumer is temporarily unavailable.

That resilience shifts work elsewhere: messages need durable storage, retry policy, dead-letter handling, monitoring, and a way to repair poison or permanently failing messages.

## Eventual consistency

When read models, caches, modules, or services update asynchronously, different views of the system may temporarily disagree. Design the user experience and APIs around that fact:

- communicate pending states;
- make commands safe to retry;
- avoid assuming immediate projection updates;
- define acceptable lag;
- provide reconciliation and replay mechanisms;
- monitor age and backlog, not only error count.

Eventual consistency is not “data may be wrong forever.” It is a consistency model plus an operational commitment to convergence.

## Event-driven architecture

In an event-driven system, components react to published facts rather than being invoked through a fixed call chain. This can reduce coupling and enable independent reactions.

Risks include hidden workflows, unclear event ownership, cyclic reactions, schema evolution, duplicate processing, and difficult debugging. Prefer events that describe completed facts in domain language. Avoid using a message broker as a remote method-call bus with vague commands and tightly coupled reply expectations.

## Cross-cutting concerns

Common cross-cutting concerns include:

- structured logging and distributed tracing;
- validation and authorization;
- transactions;
- caching;
- health checks;
- retries and timeouts;
- metrics and audit trails.

Middleware, decorators, or mediator pipelines can apply a concern consistently around use cases. Keep the mechanism centralized but the business policy explicit. For example, an authorization pipeline can invoke a policy, but the required permission still belongs to the use case.

## Authentication and authorization

**Authentication** establishes who or what is calling. Token-based authentication and external identity providers are implementation options.

**Authorization** decides whether the authenticated principal may perform an operation. Common models include roles and fine-grained permissions. Role-Based Access Control groups permissions into roles, but sensitive operations often benefit from policy checks that consider the resource and current state.

Do not place all authorization at the HTTP edge if the same use case can be invoked by messages, jobs, or other adapters. Protect the application operation at a boundary shared by its entry points.

## Testing strategy

Different tests protect different risks:

- **domain unit tests** verify invariants and state transitions;
- **application tests** verify use-case orchestration;
- **integration tests** verify databases, brokers, caches, and external adapters;
- **functional/API tests** verify the application through its public entry point;
- **architecture tests** verify dependency and module rules.

Architecture tests can reject forbidden project references, namespace dependencies, or access to another module's internals. They make the intended diagram executable, but they complement rather than replace code review and good module contracts.

## Caching and concurrency

Distributed caches such as Redis can speed read-heavy paths but create invalidation and consistency questions. Define who owns each cache entry, its freshness contract, eviction policy, and behavior during cache failure.

Concurrent writes require an explicit strategy. Optimistic concurrency uses a version or timestamp to reject stale updates; pessimistic locking serializes access. The correct choice depends on contention, invariant scope, and the cost of retrying.

## Source scope

The source pages identify these concepts as parts of production-ready Clean Architecture and modular monolith implementations. Most appear as curriculum summaries rather than full explanations, so this page records their relationships and limits without treating the landing pages as detailed evidence.

- [Pragmatic Clean Architecture](https://milanjovanovic.tech/pragmatic-clean-architecture)
- [Modular Monolith Architecture](https://milanjovanovic.tech/modular-monolith-architecture)
- [Refactoring From an Anemic Domain Model To a Rich Domain Model](https://milanjovanovic.tech/blog/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model)
- [CQRS Pattern With MediatR](https://milanjovanovic.tech/blog/cqrs-pattern-with-mediatr)

