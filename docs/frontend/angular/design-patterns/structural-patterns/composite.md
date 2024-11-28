# Composite

Use case: Building complex UI structures from simpler components.

Example: Nested components in Angular templates.

How to find: Analyze component templates for nested custom elements.

Explanation:

The Composite pattern composes objects into tree structures to represent part-whole hierarchies. In Angular, this is seen in how components are nested within each other to build complex UIs.

Example Code:

Leaf Component:

```js
// menu-item.component.ts
@Component({
  selector: 'app-menu-item',
  template: `<li>{{ item.name }}</li>`,
})
export class MenuItemComponent {
  @Input() item: any;
}

Composite Component:

// menu.component.ts
@Component({
  selector: 'app-menu',
  template: `
    <ul>
      <ng-container *ngFor="let item of menuItems">
        <app-menu-item *ngIf="!item.children" [item]="item"></app-menu-item>
        <li *ngIf="item.children">
          {{ item.name }}
          <app-menu [menuItems]="item.children"></app-menu>
        </li>
      </ng-container>
    </ul>
  `,
})
export class MenuComponent {
  @Input() menuItems: any[];
}

// Usage in a Parent component:
// app.component.ts
@Component({
  selector: 'app-root',
  template: `<app-menu [menuItems]="menu"></app-menu>`,
})
export class AppComponent {
  menu = [
    {
      name: 'File',
      children: [
        { name: 'New' },
        { name: 'Open' },
        {
          name: 'Recent',
          children: [{ name: 'Project 1' }, { name: 'Project 2' }],
        },
      ],
    },
    { name: 'Edit' },
    { name: 'View' },
  ];
}
```

- MenuComponent can contain MenuItemComponent or other MenuComponent instances, forming a tree structure.
- This allows building complex menus with nested items.
- The pattern allows clients to treat individual objects and compositions uniformly.
