# E2E Testing

Docs everything for e2e testing.

## Cypress

[Cypress Real World App](https://github.com/av3000/cypress-realworld-app/blob/develop/cypress.config.ts)

[Best practices](https://docs.cypress.io/app/core-concepts/best-practices?utm_source=Binary%3A+App&utm_medium=Docs+Menu&utm_content=Best+Practices)

### Component Testing with Cypress

Example repository for component testing [https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing](https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing)

Example [request-info.component.cy.ts](https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing/blob/master/src/app/holidays/request-info/request-info.component.cy.ts) component:

- Runs in a real-browser, solves all dependencies, async requests, DOM and change detection problems.
- `cy.visit` navigate wanted url.
- `cy.get` select element and interact with it either using filters like `.first()` or dispatch events like `.click()`
- `cy.testid` select element with data attribute of `data-testid` and expect our wanted result with `.should()`
- visualisation (browser, screenshots, video recording) and time-travel makes it very straight forward and easy to debug.

**Biggest disadvantages are slow speed and the need of providing infrastructure and backend services.**
