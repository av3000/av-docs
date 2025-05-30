# Architecture

Move these to separate folders and document.

1. Clean Code.
2. SOLID Principles.
3. Clean Architecture.
4. Domain-Driven Design (DDD).
5. Test-Driven Development (TDD).
6. Continuous Integration & Continuous Delivery (CI/CD).

## Microservices

Microservices are a type of distributed system architecture, dealing with communication, data sharing, and resilience among independently running services.

Example ticket App with each part as a separate service:

- UI
- Inventory component
- recommendation engine suggesting outputs based on user inputs
- shopping cart
- payment service
- reporting function

Strengths:

- All services talk via API's.
- No constrains of language/framework for the team.
- Service team owns container, has control over DevOps pipeline, builds, tests and deploy independently.
- Independently scalable, enabling resource optimization based on demand.
- Less risk in change, easier to monitor and manage, do not impact other parts of system.

**Straits of a good microservice**:

- **Small**. Refactoring fully does not have to scare us, if it does, most probably it is bigger than intended. Understanding of logic should fit in a head.
- **Focus on one task**. Strong separation of concers, looking from outside it should accomplish one task/feature only.
- **Bounded context**. There should be significant distinction between external protocol with which microservice exchange information with other parts of the system/microservices, versus the internal representation of that service and the model within. Difference should be treated seriously between design of API's and entry points using **ports(interfaces) and adapters(implementations)**, not using there most likely means that we make a big design mistake.
- **Autonomous**. The most real value of microservices is **implementation can be changed without the need of coordination with others**. Microservices not designed to be build, tested and deployed together. _Service based design is not a Microservice_.

_Example of Service-Based Design_.

Consider an online store application divided into services like `User Management`, `Product Catalog`, and `Order Processing`. These services are modules within the same application, possibly sharing a database, and deployed together. Communication between services is through method calls rather than network calls.

Weaknesses:

- Increased complexity managing multiple services communication.
- Distributed system challenges of network latency, data consistency and handling of service failures is more complex and requires knowledge in desing and tooling.
- More infrastructure requires more costs like load-balancing, monitoring tools, CI/CD pipelines.
- Data management complexity like for each service owning databases, requiring consistency patterns implementation.
- Integration testing more complex requiring to be tested in isolation and as a whole system.

---

## Monolith

Server-side system based on a single application which is easy to develop, deploy, manage.
traditionally found in applications with a single codebase where all functionality of UI, databases, and business logic is closely integrated.

Example ticket App:

- UI
- Inventory component
- recommendation engine suggesting outputs based on user inputs
- shopping cart
- payment service
- reporting function

Strengths:

- Simple development and deployment (_initially_).
- Communication performs faster.
- Lower infrastructure costs with less services needed.

Challenges:

- Highly dependent. Sharing libraries within architecture, tightly-coupled.
- Language/Framework. App written in Java must be developed only in Java, dependant on decisions made in the past.
- Growth. In time, additional features will grow and complexity grows to it.
- Hard deployment and time consuming. Application must be turned off at some point and re-reployed as a whole.
- Serving. Scaling resources for Payment service would require to redeploy and hurt business value.

---

## Architecture Concepts

### **Distributed Computing**

**Explanation:**
Distributed computing involves multiple computers working together to solve a problem or perform tasks. These systems share resources and coordinate their actions by passing messages to one another. The main goal is to improve performance, scalability, and reliability.

**Example:**
A distributed database where data is stored across multiple servers. When a user queries the database, the system coordinates among servers to retrieve and aggregate the required data.

### **Object Request Brokers (ORBs)**

**Explanation:**
An Object Request Broker is middleware that enables communication between distributed objects in a network. ORBs handle method invocations between objects located on different machines, abstracting the network communication details.

**Example:**
CORBA (Common Object Request Broker Architecture) allows a Java application on one machine to invoke methods on a C++ object on another machine seamlessly.

### **Cooperative Business Objects**

**Explanation:**
Cooperative Business Objects are components that represent business entities and processes, collaborating to perform complex business functions. They encapsulate both data and behavior, promoting reuse and modularity.

**Example:**
In an e-commerce application, separate business objects for `Customer`, `Order`, and `Inventory` cooperate to process a purchase: validating customer info, updating inventory, and recording the order.

### **Component-Based Development**

**Explanation:**
This approach involves building software systems by assembling pre-existing, reusable components. Each component is a modular, deployable, and replaceable part of a system that encapsulates implementation and exposes interfaces.

**Example:**
Using UI components like buttons and forms from a framework (React components) to build a web application.

### **Message-Oriented Architecture**

**Explanation:**
An architectural style where systems communicate by sending and receiving messages asynchronously via a messaging system. It decouples the sender and receiver, enhancing scalability and reliability.

**Example:**
An order processing system where orders are placed onto a message queue. Different services (inventory, shipping, billing) consume messages from the queue to process the order independently.

### **Service-Oriented Architecture (SOA)**

**Explanation:**
SOA is a design paradigm where software components provide services to other components over a network via a communication protocol. Services are self-contained and discoverable, promoting loose coupling and interoperability.

**Example:**
A payment service that can be used by different applications (web, mobile, desktop) via standard protocols like SOAP or REST.

### **Event-Driven Architecture**

**Explanation:**
In this architecture, components respond to events (changes in state) rather than direct method calls. It's useful for applications that require real-time processing and responsiveness.

**Example:**
A stock trading platform where price changes trigger events that are consumed by various services (alerts, analytics, portfolio updates).

### **Command Query Responsibility Segregation (CQRS)**

**Explanation:**
CQRS separates read and write operations into different models, optimizing each for its specific purpose. Commands change the state, while queries read the state.

**Example:**
In a banking system, write operations (money transfers) use one model to ensure data integrity, while read operations (account balance inquiries) use another optimized for performance.

### **Microservices**

**Explanation:**
An architectural style where an application is composed of small, independent services that communicate over well-defined APIs. Each microservice focuses on a specific business capability.

**Example:**
An e-commerce platform where the cart, product catalog, user reviews, and payment are separate microservices that can be developed, deployed, and scaled independently.

### **Reactive Systems**

**Explanation:**
Reactive systems are designed to be responsive, resilient, elastic, and message-driven. They handle asynchronous data streams and react to changes promptly.

**Example:**
A social media platform that updates feeds in real-time as new posts are made, adjusting to varying loads and recovering from failures without downtime.

---

### **Explanation of Service-Based Design**

Service-based design is an architectural approach where applications are built using a set of services. These services are larger than microservices and are often organized around business capabilities or domains. The focus is on modularity and separation of concerns, but services may still be part of a single application deployment and may share resources like databases.

Developers often mistake service-based design for microservices because both involve breaking down applications into services. However, the key difference lies in the level of decoupling and independence. Microservices require a higher degree of isolation, independent deployment, and ownership, which adds complexity in terms of distributed systems management, monitoring, and debugging.

### **Differences Between Service-Based Design and Microservices**

- **Granularity:**

  - Service-Based Design: Services are relatively larger and encompass broader functionality.
  - Microservices: Services are fine-grained and focus on single functionalities.

- **Deployment:**

  - Service-Based Design: Services may be deployed together as part of a monolith or fewer deployment units.
  - Microservices: Each microservice is deployed independently.

- **Data Storage:**

  - Service-Based Design: Services may share a common database.
  - Microservices: Each microservice typically has its own database to ensure loose coupling.

- **Communication:**
  - Service-Based Design: Services might communicate through direct method calls within the same process.
  - Microservices: Services communicate over the network using lightweight protocols (REST, gRPC).
