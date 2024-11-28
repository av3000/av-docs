# Abstract Factory

Use case: Creating families of related or dependent objects without specifying their concrete classes.

Example: Using Angular's Renderer2 service to create platform-independent UI elements.

How to find: Look for usage of the RendererFactory2 to obtain a Renderer2 instance and methods like createElement, createText, and appendChild that abstract away direct DOM manipulation.

In Angular, the Renderer2 service acts as an abstract factory by providing a way to create and manipulate DOM elements without depending on the concrete implementation of the rendering layer. This is particularly useful for rendering components in different environments (e.g., server-side rendering with Angular Universal, Web Workers, or native mobile apps with NativeScript).

```js
import { Component, Renderer2, RendererFactory2 } from '@angular/core';

@Component({
  selector: 'app-abstract-factory-example',
  template: '<div></div>',
})
export class AbstractFactoryExampleComponent {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createButton() {
    const button = this.renderer.createElement('button');
    const text = this.renderer.createText('Click me');
    this.renderer.appendChild(button, text);
    this.renderer.appendChild(document.body, button);
  }
}

```
