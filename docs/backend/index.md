# Backend development

## Glossary

permissions like a senior https://youtu.be/5GG-VUvruzE?si=9W59eClZKLRe6N3W

Idempotency:

https://www.youtube.com/watch?v=4OuaONkZw1I&list=PLQnljOFTspQV1emqxKbcP5esAf4zpqWpe&index=24&pp=iAQB

## API Architecture styles

Application programming interface act as a data exchange bridge for various software components and systems to communicate and interact

There are main 6 styles of API architecture

### SOAP - XML based for enterprise application

Mature, comprehensive, XML based, heavily used in financial services and payment gateways where security and reliability is a key.

Working on an web or mobile app would be an overkill and verbose.

### RESTful - Resource-based for web servers

Internet backbone, built on HTTP methods.

### GraphQL - Query language reduce network load

Enables client to ask for specific data as they need. No over or under fetching of data, faster responses. Great for apps with complex data requirements.

Although, has a steep learning curve, requires more processing query capabilities.

### gRPC - High performance for microservices

Modern and high performance, uses Protocol Buffers. Favorite for microservice architectures and companies like Netflix uses to handle their immense inter-service communication.

Dealing with browser clients poses some challenges due to limited browser support.

### WebSocket - Bi-directional for low-latency data exchange

Real-time, bi-directional and persistent connections, perfect for live chat applications and real-time gaming where low-latency data exchange is crucial.

Not requiring real-time data is most likely unnecessary overhead.

### Webhook - Asynchronous for event-driven application

Event-driven HTTP callbacks and asynchronous operations. GitHub uses webhooks to notify other systems when new commit is pushed.

If we need synchronous communication immediate response, webhook might not be the best use.
