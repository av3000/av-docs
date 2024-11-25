---
sidebar_label: "Intro"
sidebar_position: 2
---

# System Design

## Patterns

When we talk about different logical components in our system we basically ask "what type of code sits where in our project" This can mean different:

- parts in a single file or specific folder
- projects
- microservices

Separation is logical, and not necesarrily physical, it helps us make sense of the code, navigate, group, etc.

## Glossary

Glossary should be like list of tables, grouped by categories, for example:

- Architecture(link-to-intro-of-architecture)
  - architecture type A(link-to-doc)
  - architecture type B(link-to-doc)
  - architecture type C(link-to-doc)
- title(link-to-doc)
- title(link-to-doc)
- title(link-to-doc)
- title(link-to-doc)
- title(link-to-doc)

### Concepts

Layered Architecture
The Repository Pattern

**Presentation Logic** - all of the interaction with the end-user occurs. It is the part of the application that handles receiving inputs from the end-user and presenting the application’s output to the end-user. Receiving and invoking the corresponding logic in the core of the application.
It is abstraction layer, it does not include the logic, but only invokes the needed method of the needed service. That way we have separation of concerns and the service implementation can be easily refactored
Application logic -
Data access logic
Data storage logic
**Domain/Business logic** - is the part that defines the rules and processes that govern how data is created, stored, and manipulated, reflecting the real-world business rules and requirements. It determines what actions a program should perform based on specific inputs and conditions.

Presentation logic calls -> Application Logic calls -> Domain Logic

### Tools

[Informatica PowerCenter](./software/index.md)

## Architecture Examples

## Good reads

[Unlocking Clean Architecture: The Power of the Repository Pattern](https://medium.com/@yasin162001/introduction-90f7f7e19d43)

[How Canva Collects 25 Billion Events Per Day](https://blog.quastor.org/p/canva-collects-25-billion-events-per-day-1)

[3 Interview Questions on Event-Driven Patterns](https://newsletter.systemdesigncodex.com/p/3-interview-questions-on-event-driven)

[How to Design WhatsApp or Facebook Messenger?](https://medium.com/javarevisited/how-to-design-a-messaging-app-like-whatsapp-or-facebook-messenger-on-system-design-interview-f6d7cbdb8363)

[System Design: The complete course](https://kps.hashnode.dev/system-design-the-complete-course)

[The Ultimate Software Architect Knowledge Map](https://blog.bytebytego.com/p/ep128-the-ultimate-software-architect)
