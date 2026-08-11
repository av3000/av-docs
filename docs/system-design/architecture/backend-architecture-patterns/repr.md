# REPR: Request–Endpoint–Response

REPR models each web API operation as three explicit parts:

- **Request**: input accepted by the operation;
- **Endpoint**: transport-facing handler for one operation;
- **Response**: output returned by the operation.

It is a presentation pattern. It does not prescribe the domain model, persistence strategy, or application architecture behind the endpoint.

## Why REPR exists

MVC was designed around models, views, and controllers. APIs have no view, frequently need distinct input and output contracts, and often use controllers only for routing. Multi-action controllers can accumulate unrelated dependencies and grow into broad change hotspots.

REPR replaces the controller as the organizing unit with one endpoint class per operation:

```text
CreateBooking/
  CreateBookingRequest
  CreateBookingEndpoint
  CreateBookingResponse
```

The names reveal direction and intent more clearly than a generic `BookingDto` reused for input, persistence, and output.

## Responsibilities

### Request

The request represents transport input: route values, query parameters, headers, and body fields. It should not be the persistence entity. Its validation covers whether the operation has the information and shape it requires.

### Endpoint

The endpoint owns protocol concerns:

- routing and HTTP method;
- authentication metadata;
- request binding;
- sending a command or invoking an application use case;
- mapping application outcomes to HTTP responses.

Keep business rules outside the endpoint for non-trivial systems.

### Response

The response is the public contract for this operation. It can be optimized for the caller and can change independently from the domain or database model, subject to API compatibility commitments.

## REPR is not REST

REPR structures endpoints; REST structures an interface around resources and HTTP semantics. A REPR endpoint can expose:

- a REST-style operation such as `GET /customers/{id}`;
- an RPC-style operation such as `POST /bookings/{id}/confirm`.

Whether the API is RESTful depends on resource modeling, methods, status codes, representations, and links—not on the endpoint class layout.

## Relationship to vertical slices

REPR aligns naturally with [Vertical Slice Architecture](./vertical-slice-architecture.md) because one request/endpoint/response group maps to one API use case. A slice may also contain its command or query, handler, validation, and tests.

REPR is narrower than a vertical slice: it describes the presentation edge only. A vertical slice follows the use case through the application and data-access path.

## Benefits

- one class has one endpoint responsibility;
- dependencies are local to the operation;
- request and response contracts are explicit;
- large controllers no longer act as unrelated method containers;
- feature folders are easy to navigate and test.

## Costs and cautions

- more files and types for very small APIs;
- shared endpoint behavior still needs middleware, filters, or a pipeline;
- putting all logic in `Handle` creates a transaction script even when the domain is complex;
- one type per concept can become ceremony if input and output are genuinely trivial.

Use REPR to make API operations cohesive, not to move a bloated controller method unchanged into a new class.

## Source

- [REPR Design Pattern](https://deviq.com/design-patterns/repr-design-pattern/)

