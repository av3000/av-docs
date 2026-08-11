# CQS and CQRS

Command Query Separation and Command Query Responsibility Segregation both distinguish state-changing work from read-only work, but they operate at different scales.

## CQS: a method-level principle

Bertrand Meyer's Command Query Separation classifies operations by intent:

- a **command** changes state and normally does not return domain data;
- a **query** returns data and has no observable side effects.

The principle improves predictability: reading state should not quietly change it. Pragmatism still matters. An operation such as popping a stack both changes state and returns a value; intent is more important than a rigid rule.

## CQRS: an application-level pattern

CQRS applies the separation to application models and use cases:

```text
Command -> command handler -> domain model -> write store
Query   -> query handler   -> projection   -> read store
```

The command side is optimized for invariants, validation, and state transitions. The query side is optimized for the shape and performance of the data a caller needs.

## Start with logical CQRS

CQRS has several levels of commitment:

| Level | Write side | Read side | Consistency |
| --- | --- | --- | --- |
| Separate code paths | Same application and database | Same application and database | Immediate |
| Separate models | Domain write model | SQL projection or database view | Usually immediate |
| Separate stores | Write database | Read database or cache | Usually eventual |
| Separate services | Command service | Query service | Eventual and distributed |

Logical separation is often enough. Two databases are not a requirement. Physical separation adds synchronization, failure recovery, monitoring, and eventual consistency; adopt it only for a measured need.

## Command-side flow

A typical command handler:

1. validates request-level preconditions;
2. loads the relevant aggregate;
3. calls a domain operation;
4. persists the transaction;
5. returns success or an explicit error.

The handler orchestrates. The domain model protects business invariants.

## Query-side flow

Queries do not need to reconstruct a rich write model when the caller only needs a projection. They can use:

- projected ORM queries;
- raw SQL;
- database views;
- document-oriented read models;
- a distributed cache.

Avoid adding repositories and domain entities to a read path merely to preserve symmetry with commands. The read contract is already a purpose-built model.

## Mediator is an implementation choice

Libraries such as MediatR route a command or query to its handler and can wrap execution in a pipeline. Pipeline behaviors are useful for cross-cutting concerns such as validation, authorization, logging, tracing, and transactions.

```text
Sender -> logging -> validation -> authorization -> handler
```

CQRS does not require a mediator library. Directly invoking a handler or application service can implement the same conceptual separation with less indirection.

## Benefits

- read and write models can evolve independently;
- query paths can be optimized for callers;
- command names make business intent explicit;
- handlers are small units with a single use-case responsibility;
- separate paths can be scaled or secured differently when required.

## Costs and failure modes

- more types and indirection for simple CRUD;
- duplicated-looking models and mappings;
- developers may confuse “separate code” with “separate databases”;
- physical separation introduces lag and failure recovery;
- generic mediator abstractions can hide the real call path;
- handlers can become anemic scripts if domain rules never move into the domain.

## Relationship to vertical slices

CQRS classifies a use case. [Vertical Slice Architecture](./vertical-slice-architecture.md) decides where its code lives. A feature folder can contain a command and its handler or a query and its projection. They fit naturally together but neither requires the other.

## Sources

- [CQRS Pattern With MediatR](https://milanjovanovic.tech/blog/cqrs-pattern-with-mediatr)
- [Pragmatic Clean Architecture](https://milanjovanovic.tech/pragmatic-clean-architecture) — topic overview for application-layer CQRS and cross-cutting concerns.

