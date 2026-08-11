# Modular monolith

A modular monolith is one deployable application divided into explicit business modules. It keeps in-process operational simplicity while using boundaries that resemble service ownership.

```text
One process / one deployment
├── Identity module
├── Catalog module
├── Booking module
└── Payments module
```

The key word is **modular**, not monolith. A folder tree alone is insufficient; modules need ownership, hidden internals, explicit contracts, and enforceable dependency rules.

## Why choose it

Compared with an unstructured monolith, modules reduce change coupling and make business capabilities easier to reason about. Compared with microservices, in-process calls avoid network latency, distributed tracing, partial failures, and a deployment fleet.

A modular monolith is a strong default when:

- one team or a small set of teams can coordinate one deployment;
- the domain has separable capabilities;
- independent scaling is not yet required;
- the product needs speed of development without a distributed system;
- future service extraction is possible but not currently justified.

## Defining module boundaries

Good modules usually follow business capabilities or bounded contexts rather than technical categories. Domain-Driven Design and Event Storming can help discover boundaries by examining language, business events, policies, commands, and ownership.

Signals that two concepts may belong in different modules:

- they use the same word with different meanings;
- they change for different business reasons;
- different teams or policies own them;
- they require different consistency or scaling characteristics;
- interaction can be expressed through a small stable contract.

Boundary discovery is iterative. Start with a plausible model and revise it as domain understanding improves.

## Module internals and public contracts

A module should expose a small public surface and hide persistence entities, internal services, and implementation details.

```text
Bookings/
  PublicApi/
    ConfirmBooking
    BookingConfirmedIntegrationEvent
  Domain/
  Application/
  Infrastructure/
```

Other modules depend on `PublicApi`, not on `Bookings.Infrastructure` or its database tables. Each module may internally use Clean Architecture, vertical slices, or a simpler structure according to its complexity.

## Module communication

Two broad communication styles are useful.

### Synchronous

Module A calls a public interface or module API and waits for a result.

Benefits:

- simple control flow;
- immediate result and consistency;
- easy debugging inside one process.

Costs:

- runtime and change-time coupling;
- call chains can cross many modules;
- circular dependencies become tempting.

### Asynchronous

Module A publishes an integration event; interested modules handle it later.

Benefits:

- temporal decoupling;
- publisher does not know subscribers;
- easier future separation across processes.

Costs:

- eventual consistency;
- retries, duplicate delivery, and observability are required;
- workflows are harder to trace.

Use synchronous calls when the caller needs an immediate answer. Use events for facts that other modules may react to independently. Do not use messaging merely to imitate microservices inside one process.

## Data ownership

The strongest boundary gives each module ownership of its schema or tables. Another module should request data through a contract rather than joining directly to internal tables.

One physical database can still support logical ownership through schemas, permissions, naming, and tests. Separate databases increase isolation but also introduce distributed consistency inside the monolith; they are not required.

## Module-scoped cross-cutting concerns

Dependency injection, configuration, logging, caching, persistence, and background work can be isolated per module. Shared platform code should provide mechanisms, while each module owns its policy.

For example, a common caching library can exist, but the Catalog module decides which catalog queries are cached and for how long.

## Enforcing the architecture

Useful enforcement mechanisms include:

- project or package references that only allow valid dependency directions;
- language visibility such as internal packages or non-exported symbols;
- architecture tests that reject forbidden references;
- database permissions or schema ownership;
- review rules for module public APIs;
- build checks that detect cycles.

If every developer can import every internal type, the boundary is advisory and will erode under delivery pressure.

## From module to microservice

A well-bounded module is easier to extract because it already has a contract and owns its data. Extraction still requires work:

- in-process calls become network calls;
- transactions become distributed workflows;
- messages need Outbox/Inbox reliability;
- timeouts, retries, versioning, and observability become mandatory;
- deployment and operational ownership must be established.

Extract only when independent deployment, scaling, technology, reliability, or team ownership is worth those costs. A modular monolith is a valid destination, not merely a temporary architecture.

## Source

- [Modular Monolith Architecture](https://milanjovanovic.tech/modular-monolith-architecture) — a course overview used to identify the connected topics on this page.

