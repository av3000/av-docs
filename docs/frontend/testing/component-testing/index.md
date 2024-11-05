# Component Testing

Docs everything for component(integration) testing.

## Example repository for component testing

For context we will use [https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing](`https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing`) repository.

### Native way

Example [request-info.component.spec.ts](`https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing/blob/master/src/app/holidays/request-info/request-info.component.spec.ts`) component:

- mocking dependencies from [request-info.component.ts](https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing/blob/master/src/app/holidays/request-info/request-info.component.ts),
- interact with DOM via `fixture.debugElement()`,
- `fixture.detectChanges()` to render html changes,
- `dispatchEvent()` triggering event for `fixture.debugElement()` to mock input,
- `TestBed` injection for synchronous mock Http request using `HttpTestingController`,
- `fakeAsync` for delay operator used in component async handling with `tick()`,
- `data-testid` marked html elements for easy selecting via `fixture.debugElement()`,
- once again `fixture.detectChanges()` to render html changes after event, and asynchronous Http request mocked,
- selecting `fixture.debugElement().nativeElement` to get the message text which had to be dispatched and rendered into the html.
- check if result is as expected.

### Test with `@ngneat/spectator/jest`

Example [request-info.component.spectator.spec.ts](`https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing/blob/master/src/app/holidays/request-info/request-info.component.spectator.spec.ts`) component.

- Spectator provised shorthand methods to handle same issues of mocking dependencies, detectChanges which automatically, handling things behind the hood by using `createComponentFactory()`.
- `spectator.typeInElement()` selects input element and passes event value.
- `spectator.click()` triggers dispatch event for search element.
- `TestBed`injection for synchronous mock Http request using `HttpTestingController`.
- `fakeAsync` for delay operator used in component async handling with `spectator.tick()`.
- `spectator.query` select element.
  ` check if result is as expected

### Test with `@testing-library`

Example [request-info.component.tl.spec.ts](`https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing/blob/master/src/app/holidays/request-info/request-info.component.tl.spec.ts`) component:

- Provides even shorter way of handling the test using `@testing-library/angular/render` function replaces and acts as `TestBed.configure`, `creatComponent`, `fixture.detectChanges()`. Accepts html code or Component type as long as it is imported.
- `user.type` selects input element and passes event value.
- `user.click` triggers dispatch event for search element.
- `TestBed`injection for synchronous mock Http request using `HttpTestingController`.
- `@testing-library/angular/screen` provide findByTestId to select element
- check if result is as expected.

### Test with `@cypress`

Example [request-info.component.cy.ts](`https://github.com/av3000/rainerhahnekamp-angular-cypress-component-testing/blob/master/src/app/holidays/request-info/request-info.component.cy.ts`) component:

- We can provide HTML template with stylings to test if it works as intended.
- Runs in a real-browser, solves all dependencies, async requests, DOM and change detection problems.
- `cy.mount` use isolated component and set up its dependencies. We can use actuall HttpClientModule and make actuall request.
- `cy.intercept` providing url we can intercept and response to modify the response.
- `cy.get` select element and interact with it either using filters like `.first()` or dispatch events like `.click()`.
- `cy.testid` select element with data attribute of `data-testid` and expect our wanted result with `.should()`.
- visualisation (browser, screenshots, video recording) and time-travel makes it very straight forward and easy to debug.

Summary:

- Biggest disadvantages are slow speed and the need of providing infrastructure and backend services.
- Insignificant slower than Jest/Karma.
- Unsuited for tests without DOM interaction.
- Migrating to cypress requires rewrite(although TestingModule can be reused)
