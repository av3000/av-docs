# Design patterns

## Table of contents

[Anemic Model](#anemic-model)

### Anemic Model

Anemic model - design pattern where domain objects are just data containers with no business logic; the logic is instead placed in separate service classes. This anti-pattern, where objects only have public getters and setters, separates data from behavior and can lead to complex, duplicated logic in service layers, making the code harder to maintain and understand.

According to [Martin Flawer Anemic Domain Model Design](https://martinfowler.com/bliki/AnemicDomainModel.html) `the fundamental horror of this anti-pattern is that it's so contrary to the basic idea of object-oriented design; which is to combine data and process together. The anemic domain model is really just a procedural style design. Many people think that anemic objects are real objects, and thus completely miss the point of what object-oriented design is all about.

Now object-oriented purism is all very well, but I realize that I need more fundamental arguments against this anemia. In essence the problem with anemic domain models is that they incur all of the costs of a domain model, without yielding any of the benefits. The primary cost is the awkwardness of mapping to a database, which typically results in a whole layer of O/R mapping. This is worthwhile if you use the powerful OO techniques to organize complex logic. By pulling all the behavior out into services, however, you essentially end up with [Transaction Scripts](https://martinfowler.com/eaaCatalog/transactionScript.html), and thus lose the advantages that the domain model can bring.`
