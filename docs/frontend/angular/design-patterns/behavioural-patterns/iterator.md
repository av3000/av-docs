# Iterator

Use case: Accessing elements of a collection sequentially without exposing its underlying representation.

Example: Using Angular's \*ngFor directive to iterate over collections.

How to find: Look for \*ngFor usage in component templates.

Explanation:

The Iterator pattern provides a way to access elements of a collection sequentially without exposing its underlying structure. In Angular, the \*ngFor directive acts as an iterator over collections in templates.

Example code:

```js

// item-list.component.html
<ul>
  <li *ngFor="let item of items">{{ item.name }}</li>
</ul>

// item-list.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
  ];
}
```

- \*ngFor iterates over the items array.
- The component does not expose the underlying data structure; the template handles the iteration.
