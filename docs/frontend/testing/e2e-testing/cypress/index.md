# Cypress

An all-in one testing framework, assertion library, with mocking and stubbing. Enables E2E and component testing in real-world scenarios of entire application's workflows that user is going through.

- Runs in the browser written in JS.
- Provides [native access](https://docs.cypress.io/app/get-started/why-cypress#Native-access) to the DOM and the application via cypress test runner, enabling to use the app during the testing.
- Good performance and suitable for CI/CD integration.
- Time travel for debugging.
- Automatic waiting for execution.
- Hot reload.

As well, due to running on a machine of the application, it has functions like:

- [Screenshots and video](https://docs.cypress.io/app/guides/screenshots-and-videos). -[ File system operations](https://docs.cypress.io/api/commands/exec).
- [Network operations](https://docs.cypress.io/api/commands/request).

It also has important [trade-offs](https://docs.cypress.io/app/references/trade-offs) to be aware.

Good reads:

To guide the way, the Cypress team has created [the Real World App (RWA), a full stack example application that demonstrates testing with Cypress in practical and realistic scenarios](https://github.com/av3000/cypress-realworld-app).

The RWA achieves full code-coverage with end-to-end tests across multiple browsers and device sizes, but also includes visual regression tests, API tests, unit tests, and runs them all in an efficient CI pipeline. Use the RWA to learn, experiment, tinker, and practice web application testing with Cypress.

There is also a [example recipes repository with common testing cases](https://github.com/av3000/cypress-example-recipes).

[Testing your App](https://docs.cypress.io/app/end-to-end-testing/testing-your-app)

[Best Practices](https://docs.cypress.io/app/core-concepts/best-practices)

[Cypress Testing Library for well-known methods and selectors](https://testing-library.com/docs/cypress-testing-library/intro/)

[Accessibility testing guide](https://docs.cypress.io/app/guides/accessibility-testing)

## Quickstart

Requires your development server running.

## Fundamentals

### Network Requests

Ways of backend API network handling. There are use cases for all three of the methods/strategies and may be used all of these in the same application testing.

[discussion on stubbing](https://www.reddit.com/r/softwaretesting/comments/rvxuo3/stubbing_every_single_network_request_in_ui/)

#### Stub Requests

Pros:

- Fast, easy, flexible
- No server / DB

Needs:

- Requires fixtures

Cons:

- Not true E2E

#### Static User

Pros:

- Real session e2e

Needs:

- Requires server
- Seed the DB

Cons:

- Shared Test State

#### Dynamic User

Strategy to create New User before for each single test.

- Modify DB within tests.
- Query DB within tests.

Pros:

- No state mutations
- Flexible Powerful

Needs:

- DB Setup / Teardown

Cons:

- Slow / Complex

### Describe blocks

Tests exist in describe blocks, which takes 2 arguments:

- Description. Explanation of what is being tested in this block.
- Callback function for actual tests within that block.

### It blocks

Block within describe block with same API, single unit test within overall test file. Consists of:

- Description. Title of individual test.
- Callback function for test code content.

### Commands & interacting with elements

[Commands](https://docs.cypress.io/api/table-of-contents#Commands) to use with `cy` objects with shorthand methods like `cy.click()`, `cy.type()`, `cy.check()`.

Important to note that [Cypress commands are asynchronous](https://docs.cypress.io/app/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous), meaning we should use `[.then()](https://docs.cypress.io/api/commands/then)` and `[.wrap()](https://docs.cypress.io/api/commands/wrap)` methods.

### Getting elements

We often need to get an element from the DOM and make assertions, like h1 element contains certain text. We can get elements in Cypress by using the get function and pass in a CSS query selector. Good practice is to use special attributes for testing like `data-cy` or `data.testId` to avoid unwanted refactoring issues forcing tests to be rewritten. It also helps to get elements quickly and precisely.
[Good practices for selecting elements](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements).

### Command chaining & assertions

[Assertions on elements](https://docs.cypress.io/app/references/assertions) can be chained and Cypress provides various [ways of making the assertions documented](https://docs.cypress.io/app/references/assertions#Chai). Ex: `.get('h1').contains('text')`.
[We can add our own assertions or extending chai](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/extending-cypress__chai-assertions).

Good example of chaining:

```js
// retry until this input does not have class disabled
cy.get("form").find("input").should("not.have.class", "disabled");
```

[Aliases](https://docs.cypress.io/app/core-concepts/introduction-to-cypress#Using-Aliases-to-Refer-to-Previous-Subjects) allows to create subject reference we can later specify for following actions.

```js
cy.get("table").find("tr").as("rows");
// Later can be referenced as
cy.get("@rows");
```

### Focusing on a single test

### beforeEach

### Custom commands
