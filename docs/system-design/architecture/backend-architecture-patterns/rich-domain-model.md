# Rich domain model

A domain model represents business concepts in code. The important design choice is whether domain objects merely carry data or also protect business behavior.

## Anemic and rich models

An **anemic domain model** exposes data while services perform most of the rules and state changes. Common signals are public setters, parameterless construction, exposed mutable collections, and service methods that manually coordinate every field mutation.

A **rich domain model** combines state and behavior. An entity exposes operations in domain language, protects its invariants, and controls its own lifecycle transitions.

```text
Anemic: service -> check rules -> set fields -> mutate collection
Rich:   service -> aggregate.confirm(now) -> Result
```

An anemic model is not automatically wrong. For simple CRUD, a transaction script can be clearer and cheaper. It becomes costly when important rules are scattered across handlers, duplicated between use cases, or easy to bypass.

## Invariants and encapsulation

An invariant is a rule that must remain true for a domain object to be valid. For example:

- a booking cannot be confirmed after cancellation;
- an invitation cannot be sent to the event creator;
- a meeting in the past cannot receive a new invitation.

The object that owns the relevant state should usually enforce the rule. That makes invalid transitions hard to express:

```csharp
public Result Confirm(DateTime utcNow)
{
    if (Status == BookingStatus.Cancelled)
    {
        return Result.Failure(BookingErrors.Cancelled);
    }

    if (ExpiresAtUtc < utcNow)
    {
        return Result.Failure(BookingErrors.Expired);
    }

    Status = BookingStatus.Confirmed;
    Raise(new BookingConfirmedDomainEvent(Id));

    return Result.Success();
}
```

The public API communicates the valid operation. Callers cannot skip the rules by setting `Status` directly.

## A gradual refactoring path

Moving from an anemic model to a rich one is iterative:

1. Find rules duplicated or buried in an application service.
2. Move construction behind a constructor or factory that creates valid objects.
3. Replace public setters with intention-revealing methods.
4. Hide mutable collections and expose read-only views.
5. Move invariants into the entity or aggregate that owns the state.
6. Return explicit results for expected business failures.
7. Raise domain events for effects that other components may react to.
8. Leave I/O orchestration in the application layer.

The goal is not to move every line into an entity. Database access, HTTP calls, email delivery, transactions, and retries are application or infrastructure concerns.

## Result objects and exceptions

Expected business rejection is different from an unexpected technical failure.

- A result such as `BookingErrors.AlreadyCancelled` makes an anticipated outcome explicit and easy to map to an API response.
- An exception is appropriate for a broken assumption, programming error, or infrastructure failure that the current operation cannot handle normally.

A catalog of domain errors also documents the business vocabulary and possible rejection paths.

## Aggregates and consistency boundaries

An aggregate is a cluster of domain objects that must remain consistent together. The aggregate root controls changes to objects inside that boundary. External code should not reach into child collections and mutate them directly.

Keep aggregates as small as the invariants allow. A large object graph increases contention and makes every operation expensive. References to objects outside the aggregate are often represented by identity rather than a live mutable object.

## Domain events

A domain event states that something meaningful happened: `InvitationSent`, `BookingConfirmed`, or `PaymentCaptured`.

Domain events let the model express the fact without knowing who reacts. Handlers may update a projection, schedule work, or send a notification. This reduces direct coupling, but it does not by itself make delivery reliable.

Important distinction:

- a **domain event** communicates within the domain or application boundary;
- an **integration event** is a stable message shared with another module or service.

When an event must leave the process reliably, combine it with the [Outbox pattern](./production-and-reliability.md#outbox-pattern).

## Test the behavior, not the fields

A rich model supports focused tests:

```text
Given a cancelled booking
When confirm is requested
Then confirmation fails with BookingErrors.Cancelled
And no BookingConfirmed event is raised
```

These tests need no mocks for databases or email providers because they exercise business behavior directly.

## When to use it

Prefer a rich model when:

- the domain has meaningful invariants and lifecycle transitions;
- the same rules are used by multiple entry points;
- domain terminology is valuable to developers and stakeholders;
- invalid state must be difficult to create.

Prefer a simpler model when the application mainly validates input and persists records with little behavior. Richness should follow domain complexity, not architectural fashion.

## Sources

- [Refactoring From an Anemic Domain Model To a Rich Domain Model](https://milanjovanovic.tech/blog/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model)
- [Pragmatic Clean Architecture](https://milanjovanovic.tech/pragmatic-clean-architecture) — topic overview for DDD and rich domain modeling.

