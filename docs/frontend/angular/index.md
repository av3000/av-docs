---
sidebar_label: "Intro"
sidebar_position: 1
---

# Angular

Angular is full-fledged open-source framework for building single-page client applications using HTML and Typescript. Led by the Angular Team at Google and by a community of individuals and corporations.

Typescript managed by Microsoft to bring static type benefits helping write cleaner, safe code and optimize builds.

Uses library RxJs for reactivity, allowing to easily react and instantly reflect some of these changes.

## Glossary

[Official Angular glossary](https://angular.io/guide/glossary)

**Angular CLI**. Command line tool that we install to generate files and folders, talk to different modules, create components and much more alleviation of the boiler plate and manually wiring up our tasks. Packed with a lot of sensible defaults for easier development experience.
It does things like compile and serve project on a local host environment, build for dev and production.

## Repositories for example good practices

[Google dev library with currated projects for quality example implementations](https://devlibrary.withgoogle.com/)

Official architecture example repository [Hero List](https://stackblitz.com/run?file=src%2Fapp%2Fhero-list.component.html)

[https://github.com/muhammadawaisshaikh/solid-design-pattern-angular](https://github.com/muhammadawaisshaikh/solid-design-pattern-angular)

[Angular tuts playlist](https://www.youtube.com/playlist?list=PLaxshcaiPSdyZUjrO8WM1jM2THANoVMT_)

[https://medium.com/codeburst/directives-vs-components-8e924dd86f20?ref=angularspace.com](https://medium.com/codeburst/directives-vs-components-8e924dd86f20?ref=angularspace.com)

## Main building blocks

### Module:

- Self-contained chunk of code that allows us to group related application logic.
- Typically standalone and often relate to features, know term "Feature Module".
- Group can consist of any components, directives, pipes and services.
- Module can be easily moved from application to application, as well lazy loaded.

[NgModule FAQ](https://angular.io/guide/ngmodule-faq)

### Component:

- Small unit of code that serves a single purpose, is independant and has isolated UI functionality, usually takes data and renders through the DOM.
- Containts has HTML template and class for handling logic.
- Reusable and composable, can render other components.
- One-way data flow and immutable state.

### Directive:

- Extending/adding functionality to components or changing render behaviour to HTML.
- Enables modification or elements and component generation.
- Control rendering of elements based on conditions or data.
- There are Built-in and custom directives with optimized and fast checking.
- Encapsulate DOM manipulation logic, enables to provide lower-level functionality that requires reaching into document object model. It is the main differentiation between component and directive.

### Pipe:

- Simple pure function that transform data for rendering.
- Used inside components with data interpolation to transform the data we intend to bind before its rendered.
- Holds reusable logic like dates, currency, text translation, transform to UpperCase.

### Service:

- Generic class used for not-component related logic.
- Mostly used for data-fetching via HTTP, websockets, business logic, reusable functionality(FormService) state storage.
- Consumed by other services and components via dependency injection.
- Singleton dependency - instantiated once and their logic is shared wherever it is injected.

### Router:

- On traditional website, routing logic would be handled on the server and a page would be sent back to us on browser request for specific URL with a full page refresh.
- Nowadays browser controls Url, and router allows instruct angular to render particular componet or module based on URL with more complex route segments like IDs to dynamically fetch data providing nice abstraction to read/write essential pieces of the URL.
- Directives and API for navigation bridging the gap between URL and a component with its data.
- Preload data and guard access to features.
- Key to Lazy loading.

## Component Architecture

### Smart vs Dumb

### Reusable vs Scalable

While reusable component with inputs are flexible, scalability requires handling performance for large datasets or high-frequency operations.

- Modal Component
  Reusable: Dynamically accepts content, width, and actions.
  Scalable: Implements lazy loading of large content, support for heavy interactivity.

- Dropdown Component
  Reusable: Accepts list items as inputs.
  Scalable: Implements lazy loading with virtual scrolling or server-side search for large datasets.

- Data Table
  Reusable: Displays rows/columns based on inputs.
  Scalable: Supports server-side pagination, streaming data, and column virtualization.

- Chart Component
  Reusable: Renders generic charts (line, bar, etc.).
  Scalable: Handles real-time updates, large datasets, or WebGL rendering for performance.

- Notification System
  Reusable: Displays messages with a predefined layout.
  Scalable: Handles high-frequency notifications via queueing or batching.

#### Reusable

Designed to be used in multiple places, across whole application or even shared between applications with minimal or no modification.
Focuses on generic functions to fit multiple contexts. Customizable via properties or @Inputs to change behavior or appearance dynamically. Isolated/Decoupled from specific logic or data sources, relying on external data.

##### Button Example

```js
@Component({
  selector: 'app-button',
  template: `<button [class]="type" (click)="handleClick.emit()">{{ label }}</button>`
})
export class ButtonComponent {
  @Input() label: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Output() handleClick = new EventEmitter<void>();
}

```

Usage:

```js
<app-button secondary handleClick=cancelForm(event)>Close</app-button>
```

##### Modal Example

```js
@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-backdrop" *ngIf="isOpen">
      <div class="modal" [ngStyle]="{ width: dialogOptions?.width || '50%' }">
        <header class="modal-header">
          <h2>{{ dialogOptions?.title || 'Modal' }}</h2>
          <button *ngIf="dialogOptions?.closable" (click)="close()">Close</button>
        </header>
        <div class="modal-content" [innerHTML]="content"></div>
        <footer class="modal-footer" *ngIf="dialogOptions?.showActions">
          <button *ngFor="let action of dialogOptions.actions" (click)="action.handler()">
            {{ action.label }}
          </button>
        </footer>
      </div>
    </div>
  `,
  styles: [
    `.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); }`,
    `.modal { background: white; padding: 1rem; border-radius: 5px; }`
  ]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() content: string = '';
  @Input() dialogOptions: {
    title?: string;
    closable?: boolean;
    width?: string;
    showActions?: boolean;
    actions?: { label: string; handler: () => void }[];
  } = {};

  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }
}

```

Usage:

```js
<app-modal
  [isOpen]="isModalOpen"
  [content]="modalContent"
  [dialogOptions]="{
    title: 'Dynamic Modal',
    closable: true,
    width: '75%',
    showActions: true,
    actions: [
      { label: 'OK', handler: () => console.log('OK clicked') },
      { label: 'Cancel', handler: () => (isModalOpen = false) }
    ]
  }"
  (closeEvent)="isModalOpen = false"
></app-modal>

```

#### Scalable

Scalable Frontend / scalable frontend component -

Backend for frontend BFF architecture - https://app.daily.dev/posts/backend-for-frontend-bff-architecture-jydzqu1fl

feature-flag - https://www.youtube.com/watch?v=kc7q49G0NIw&ab_channel=MonsterlessonsAcademy

## In-depth concepts

### Dependency Injection (DI)

[https://www.angularspace.com/fascinating-dependency-injection/](https://www.angularspace.com/fascinating-dependency-injection/)

### Standalone Component

<!-- TODO: group accordingly and document concepts  -->

Reactive Form vs template-driven form:

- Reactive form gives better control over data and validation

Two-way data binding -

One-way data flow -

lazy-loading -

eager-loading -

control value accessor

Data interpolation -

immutable state practices -

services encapsulation -

API request via HTTP -

concurrency -

tree-shaking - removal of dead code.

Input & Output - Receive a properties from parents and send data back to the outside scope.

Output types:

- EventEmitter(Type)

Pipe:

- UppercasePipe
- JSON
- currencyPipe
- someEnumTypePipe

## RxJs

Observable

Switchmap vs Mergemap vs Concatmap

## Modular architecture

## Modern Angular

Signals - used to keep track of local state, whenever signals are changed, computed values and the associated DOM elements are updated. Angular is tracking references to detect signal changes, so need to use new references for setting values.

Deferrable views -
