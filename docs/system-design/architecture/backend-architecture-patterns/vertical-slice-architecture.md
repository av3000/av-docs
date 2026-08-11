# Vertical Slice Architecture

Vertical Slice Architecture organizes a system around use cases rather than technical categories. Its guiding idea is:

> Minimize coupling between slices and maximize cohesion inside a slice.

## The change-shape problem

In a layer-first structure, one feature may require edits in distant folders:

```text
Controllers/
Services/
Validators/
Repositories/
Models/
```

The layers separate technical responsibilities, but a developer must navigate across them to understand one behavior. Vertical slices group the request path instead:

```text
Features/
  Bookings/
    ConfirmBooking/
      ConfirmBookingRequest
      ConfirmBookingEndpoint
      ConfirmBookingCommand
      ConfirmBookingHandler
      ConfirmBookingResponse
      ConfirmBookingValidator
```

The slice is a use case, not merely a UI feature or database entity.

## What a slice owns

A slice can own the code needed to implement one operation:

- transport request and response contracts;
- endpoint or message-consumer entry point;
- validation;
- command/query and handler;
- data access tailored to the use case;
- tests for the behavior.

Shared domain rules should still live in the domain model. Shared infrastructure should still have a clear owner. “Keep feature code together” does not mean “duplicate everything.”

## Tailor each use case

Slices do not need identical internal implementations. For example:

- a write slice can load an aggregate through an ORM and execute rich domain behavior;
- a list query can project directly with the ORM;
- a report query can use optimized SQL;
- a high-traffic read can use a cache.

This local optimization is a strength when guided by requirements. It becomes a weakness when every slice invents unrelated conventions without reason.

## Additive change and isolation

A well-isolated new feature mostly adds a new slice rather than modifying shared handlers and large controllers. That reduces regression risk and merge conflicts.

This is a design goal, not a guarantee. Shared schemas, domain rules, and public contracts can still require coordinated changes. Be suspicious of global helper classes that every slice must edit.

## Relationship to Clean Architecture

The two patterns address different concerns:

- Clean Architecture controls dependency direction and separates policy from details.
- Vertical Slice Architecture controls locality and groups code by use case.

A hybrid can keep a dependency-free domain and infrastructure adapters while arranging application and presentation code by slice. Clean Architecture does not require layer-first folders, and vertical slices do not require abandoning domain boundaries.

## Relationship to CQRS and REPR

HTTP APIs naturally expose state-changing operations and reads. [CQRS](./cqrs.md) names these commands and queries. [REPR](./repr.md) gives each API operation a request, endpoint, and response. Together they offer a clear slice shape without requiring physical read/write separation.

## Risks

- a handler can accumulate validation, business logic, persistence, and side effects;
- duplicated business rules can drift between slices;
- per-slice flexibility can become inconsistency;
- feature folders can be named after database entities instead of user intentions;
- cross-cutting behavior can be repeated rather than handled through a pipeline or middleware.

When a slice grows, refactor by responsibility:

- move stable invariants into domain objects;
- move reusable technical behavior into infrastructure;
- use pipeline behaviors or middleware for truly cross-cutting policy;
- split a broad operation into smaller use cases when the user workflow allows it.

## When to use it

Vertical slices are especially useful when:

- work is planned and discussed as use cases;
- most changes cut through several technical layers;
- controllers or application services have become large coordinators;
- different queries need different data-access strategies;
- teams need a small, discoverable unit of ownership.

A tiny CRUD application may be easier with conventional folders. The pattern earns its keep when feature cohesion reduces navigation and change coupling.

## Source

- [Vertical Slice Architecture](https://milanjovanovic.tech/blog/vertical-slice-architecture)

