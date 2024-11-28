# Memento

Use case: Saving and restoring an object's state.

Example: Implementing undo/redo functionality in forms or applications.

How to find: Look for code that saves snapshots of state and can restore them later.

Explanation:

The Memento pattern captures an object's internal state without exposing its implementation, allowing the state to be restored later. In Angular, you might implement this pattern to provide undo/redo capabilities.

Example Code:

```js
// text-editor.component.ts
import { Component } from '@angular/core';

interface Memento {
  content: string;
}

@Component({
  selector: 'app-text-editor',
  template: `
    <textarea [(ngModel)]="content"></textarea>
    <button (click)="save()">Save</button>
    <button (click)="undo()">Undo</button>
  `,
})
export class TextEditorComponent {
  content: string = '';
  private history: Memento[] = [];

  save() {
    this.history.push({ content: this.content });
  }

  undo() {
    if (this.history.length > 0) {
      const memento = this.history.pop();
      this.content = memento.content;
    }
  }
}
```

- The component saves the state of content into the history stack.
- `undo()` restores the last saved state.
- The internal state is saved and restored without exposing implementation details.
