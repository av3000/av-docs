# Flyweight

Use case: Reducing memory usage by sharing common parts of objects.

Example: Caching Angular pipes or reusing component templates.

How to find: Look for instances where objects are reused rather than recreated.

Explanation:

The Flyweight pattern minimizes memory usage by sharing as much data as possible with similar objects. In Angular, this can be seen in scenarios where you have a large number of similar components or data structures that can share common data.

Example Code:

Suppose you have a large list of items with similar properties.

```js
// flyweight.service.ts
@Injectable({
  providedIn: 'root',
})
export class FlyweightService {
  private flyweights: { [key: string]: any } = {};

  getFlyweight(key: string) {
    if (!this.flyweights[key]) {
      // Create a new flyweight if it doesn't exist
      this.flyweights[key] = { sharedState: key };
    }
    return this.flyweights[key];
  }
}

// item-list.component.ts
@Component({
  selector: 'app-item-list',
  template: `<div *ngFor="let item of items">
               {{ item.sharedState }} - {{ item.uniqueState }}
             </div>`,
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private flyweightService: FlyweightService) {}

  ngOnInit() {
    const sharedStates = ['TypeA', 'TypeB', 'TypeC'];

    for (let i = 0; i < 1000; i++) {
      const sharedState = sharedStates[i % 3];
      const uniqueState = `Item ${i}`;
      const flyweight = this.flyweightService.getFlyweight(sharedState);

      this.items.push({
        ...flyweight,
        uniqueState,
      });
    }
  }
}
```

- The FlyweightService manages shared states (sharedState).
- Instead of creating 1000 separate objects with the same sharedState, we reuse them.
- This reduces memory usage by sharing common data among multiple objects.
