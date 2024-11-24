# System Design Concepts

[Message Queue](./message-queue.md)

## Request: Stateful vs Stateless

### **Stateless**

In stateless communication, each request from a client to a server is independent. The server does not retain any session information or status about the client between requests.

Characteristics are:

- Scalability: Easier to scale horizontally because any server can handle any request.
- Simplicity: Simplifies server design as there is no need to manage session state.
- **Idempotency**: Requests can be repeated without side effects (in certain cases), making error recovery simpler.
- Easier to implement **caching** mechanisms since responses depend solely on the request.

### **Stateful**

In stateful communication, the server maintains state information (session data) about the client across multiple requests.

Characteristics are:

- Session Management: Requires mechanisms to store and retrieve session data.
- Complexity: Increased complexity in handling and synchronizing session state.
- Server Affinity: May require clients to interact with the same server (session stickiness).

Use case could be:

- User Sessions: Applications where user authentication and session data are critical (shopping carts, user dashboards, online banking).
- Real-Time Communication: Chat applications or games where continuous interaction is necessary.
- Transactions: Multi-step transactions that need to maintain context between steps.
