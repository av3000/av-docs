# Message Queueing

## **Problem**

E-commerce app with a shopping cart service connecting directly to inventory service over a TCP connection to check stock availability on each item added to shopping cart. Process is synchronous, waits for add to cart request to finish. Inventory service may crash in peak hours or be down for other reasons what results in Cart service not responding and failing as well.

## **Purpose:**

Breaks applications apart with asynchronous communication.

- De-couples components. Producers and Consumers do not need to know anything about one another, allowing systems to be more **modular** and **scalable**. Especially valuable in microservices for multiple independent services to communicate.
- Load Management. Storing incoming messages and releasing them gradually to consumers as they’re ready **prevents overloading** of services during peak times and smooths out traffic spikes.
- Reliability and fault tolerance. Supports message **persistence**, **acknowledgements**\* and **retries** which help to ensure messages are delivered even if a consumer or producer goes down. This reliability is critical in applications where messages represent important transactions or user actions.
- Queue itself can be on its own machine, offloading some of work from web application and make the whole system more performant.

\*acknowledgement(ACK) - a signal that a device sends to indicate that data has been received successfully.

## **Building blocks:**

- message:
  - contains data that needs to get transmitted
  - types of data formats
- queue:
  - line of messages
- producer: creates/writes the message
- consumer: consumes/reads the message

Managed by messages brokers such as [Rabbitmq](../software/rabbitmq/rabbitmq.md), [Apache Kafka](../software/kafka/kafka.md) or [AWS SQS](https://aws.amazon.com/sqs/).

Use cases could be:

- Task distribution - offloading background jobs to worker processes.
- Event-driven processing - updating a database when a new order is placed.
- Real-time messaging/chat applications.

## **Patterns:**

- **Pub/Sub**

New user order, notifying interested systems of current status, and in each status according system performs necessary algorithm for example packaging, shipping, delivering and when delivered informing end user.

- **Request-reply-reply-request**

User search request on System A sent to queue, System B applied algorithm. System B sends request of successful algorithm and has response, System A sees that search was done and consumes the response.

- **Point-to-point**

From Producer System A to Consumer System B.
For example: user filled in the web form. Meta data of form JSON object pushed into the queue, which can be consumed later to enter into database, insert into other system for marketing automation, metrics.

---
