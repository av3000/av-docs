# Mediator

Use case: Reducing coupling between components by having them communicate through a mediator.

Example: Using a shared service as a message bus for component communication.

How to find: Look for services that facilitate communication between components without them referencing each other directly.

Explanation:

The Mediator pattern defines an object that encapsulates how a set of objects interact, promoting loose coupling. In Angular, a shared service with observables can act as a mediator between components.

Example Code:

```js
// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}

// sender.component.ts
import { Component } from '@angular/core';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-sender',
  template: `<button (click)="sendMessage()">Send Message</button>`,
})
export class SenderComponent {
  constructor(private communicationService: CommunicationService) {}

  sendMessage() {
    this.communicationService.sendMessage('Hello from Sender Component');
  }
}

// receiver.component.ts
import { Component } from '@angular/core';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-receiver',
  template: `<div>Received Message: {{ message }}</div>`,
})
export class ReceiverComponent {
  message: string;

  constructor(private communicationService: CommunicationService) {
    this.communicationService.message$.subscribe((msg) => (this.message = msg));
  }
}
```

- CommunicationService acts as the mediator.
- SenderComponent sends messages via the service.
- ReceiverComponent subscribes to messages via the service.
- Components do not directly reference each other, reducing coupling.
