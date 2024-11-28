# Bridge

Use case: Decoupling an abstraction from its implementation so that the two can vary independently.

Example: Separating component logic from UI implementations (e.g., switching between different themes or UI frameworks).

How to find: Look for scenarios where you can switch implementations at runtime without affecting the abstraction.

The Bridge pattern allows you to vary both the abstraction and the implementation independently. In Angular, this can be useful when you have components that can use different services or strategies without changing their core logic.

Example Code:

Suppose you have different APIs for fetching data in development and production environments.

```js
// data.service.ts
export abstract class DataService {
  abstract getData(): Observable<any>;
}

// dev-data.service.ts
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class DevDataService extends DataService {
  getData(): Observable<any> {
    // Return mock data
    return of({ data: 'Mock data from DevDataService' });
  }
}

// prod-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdDataService extends DataService {
  constructor(private http: HttpClient) {
    super();
  }

  getData(): Observable<any> {
    return this.http.get('/api/data');
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { DevDataService } from './dev-data.service';
import { ProdDataService } from './prod-data.service';
import { environment } from '../environments/environment';

@NgModule({
  providers: [
    {
      provide: DataService,
      useClass: environment.production ? ProdDataService : DevDataService,
    },
  ],
  // Other module metadata
})
export class AppModule {}

// data-display.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-display',
  template: `<div>{{ data | json }}</div>`,
})
export class DataDisplayComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((res) => {
      this.data = res;
    });
  }
}
```

- DataService is the abstraction.
- DevDataService and ProdDataService are implementations.
- The AppModule bridges the abstraction and implementation by providing the appropriate service based on the environment.
- DataDisplayComponent uses DataService without needing to know which implementation it is.
