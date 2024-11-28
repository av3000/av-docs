# Observer

Use case: Reactive programming with RxJS.

Example: Using Subject or BehaviorSubject for state management.

How to find: Look for RxJS import statements and usage of Observables in services and components.

Explanation:

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. In Angular, this pattern is implemented using RxJS Observables and Subjects, allowing components and services to subscribe to and emit events or data streams.

Example Code:

```js
// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSource = new BehaviorSubject<string>('Initial Data');
  data$ = this.dataSource.asObservable();

  updateData(data: string) {
    this.dataSource.next(data);
  }
}

// component-a.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-component-a',
  template: `
    <div>Component A Data: {{ data }}</div>
    <button (click)="changeData()">Change Data</button>
  `,
})
export class ComponentAComponent {
  data: string;

  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe((data) => (this.data = data));
  }

  changeData() {
    this.dataService.updateData('Data from Component A');
  }
}

// component-b.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-component-b',
  template: `<div>Component B Data: {{ data }}</div>`,
})
export class ComponentBComponent {
  data: string;

  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe((data) => (this.data = data));
  }
}
```

- DataService uses a BehaviorSubject to store and emit data.
- ComponentA and ComponentB subscribe to data$ to receive updates.
- When ComponentA updates the data, ComponentB automatically receives the new data.
