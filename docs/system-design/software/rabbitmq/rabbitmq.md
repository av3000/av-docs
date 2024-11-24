# RabbitMQ

Message broker for [message queueing](../../concepts/index.md#message-queueing).

RabbitMQ is an implementation of the AMQP(advanced message queueing protocol) message model(version 0.9.1), In memory message broker.

Ideal for direct, real-time processing task-based communication, especially with synchronous request-response interactions. Often in microservices that need rapid message acknowledgment and delivery, but avoid to be forced performing intensive tasks on the spot and blocking the service by potentially taking long time.

## Use cases

- Simply upload picture to the app, but the image needs to be scaled first for web and mobile applications. The message to scale is sent into queue, then scaling service subscribes to it and scales it. Messages can be taken one-by-one or in batches.
- User requests for a PDF to be created(could be tickets, receipt, book or other readings), message sent to RabbitMQ queue, PDF services subscribes to it, generates pdf and sends it via email.
- In an online ordering system, RabbitMQ can handle the processing pipeline, such as order fulfillment, sending emails, or updating inventory, where each task needs to be completed sequentially and acknowledged.
- In a banking app, RabbitMQ can handle the flow between services, such as triggering notifications after a transaction or processing requests for balance updates. Its lower latency makes it effective for synchronous, fast-paced message handling.
- Uploading video to youtube, all the backend has to do is encode the videos and store them.
- Posting on facebook, all the backend cares is to store it and push it to user newsfeed cache.

### Weaknesses

- Does not keep messages long-term, messages are deleted once consumed.
- Queue sizes are generally limited, and performance degrades with larger queues. This makes it unsuitable for scenarios where multiple consumers need to access both recent and old messages at different times.
- Uses Round robin delivery method which leads to more throughput, but does not ensure in-order message processing. Using fan-out can solve it, but throughput is reduced.

## Main benefits

- One of main benefits is tremendous amount of flexibility you have moving messages through your system.
- How the message has to go through the system is largely a part of the message metadata. In the checkout app example, it is the application and the developer that has a lot of control with the way messages move through the system rather than the broker administrator.
- RabbitMQ is cloud friendly, meanings it is easy to get started, we can deploy an instance of it on Docker or other containerization software or it can run as a clster for fault-tolerance, high-availability and high throughput.
- Cross-language communication with extensive library and good security. Producer checkout can be "Go app", and consumers of inventory "Javascript App" and shipping "Python app".
- Security. Supports FASL, LDAP and TLS for authentication and authorization.
- Message acknowledgements. When a message is in a queue and goes to the consumer, the message stays in the queue until the consumer lets the broker know that it has received the message, and only then the message taken out of queue. That prevents the system from losing any messages.
- Great Management. Browser based management UI, as well as incentinve CLI tools and many open source plugins enhancing RabbitMQ, even supporting other message models (MQTT, Stomp, AMQP1.0).

## Mechanism

Service that produces the messages, instead of producing directly to a **message queue**, it is going to produce to an **exchange**.
**Exchange** is going to receive all the messages and distribute them according to how they are addressed. An exchange can be connected via **bindings** to many **queues** which are connected to the consuming service, the consumers.

**Example Checkout App design**:

- Checkout (Producer),
- Exchange,
- Queues(2),
- Inventory(Consumer),
- Shipping(Consumer).

Checkout sends message to exchange, the exchange is connected to queues via connection bindings and these can be referenced by the **binding key**. Consumer service subscribe to the queues.

Exchange and queues is RabbitMQ message broker of the system.
System model enables flexible messages due to different types of exchange.

**Fanout exchange** - checkout produced message will go to the exchange, where it will be duplicated and sent to every single queue that it knows about.

**Direct exchange** - checkout will produce the message and then that message will get a **routing key** which is being compared to the **binding key** and if it is an exact match, then the message will move through the system accordingly.

**Topic exchange** - we can do a partial match between the routing key and the binding key. A routing key on the message called ship.shoes and the binding key ship.any would get that message routed through that particular topic queue.

**Header exchange** - the routing key is ignored completely and the message is moved through the system according to the header.

**Default/Nameless exchange** - unique to RabbitMQ. for example the routing key is 'inv' which is tied to the name of the queue itself.
