# Facade

Use case: Providing a simplified interface to a complex subsystem.

Example: Creating a service that wraps multiple HTTP calls into a single method.

How to find: Look for services that aggregate operations from multiple sources or APIs.

Explanation:

The Facade pattern provides a unified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use.

Example Code:

Suppose you have multiple APIs to fetch user data, orders, and notifications.

Individual Services:

```js
// user.service.ts
@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserDetails() { /* ... */ }
}

// order.service.ts
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  getUserOrders() { /* ... */ }
}

// notification.service.ts
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  getUserNotifications() { /* ... */ }
}

// dashboard.service.ts
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  getDashboardData() {
    return forkJoin({
      user: this.userService.getUserDetails(),
      orders: this.orderService.getUserOrders(),
      notifications: this.notificationService.getUserNotifications(),
    });
  }
}

// dashboard.component.ts
@Component({
  selector: 'app-dashboard',
  template: `<div *ngIf="data">
               <!-- Display data -->
             </div>`,
})
export class DashboardComponent implements OnInit {
  data: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe((res) => {
      this.data = res;
    });
  }
}
```

- DashboardService acts as a facade, simplifying access to multiple services.
- The component interacts with DashboardService rather than multiple individual services.
- This simplifies the component code and reduces coupling.
