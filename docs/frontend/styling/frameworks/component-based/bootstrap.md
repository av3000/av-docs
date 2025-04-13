# Bootstrap

Bootstrap is a free, open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS, and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.

## Overview

Originally created by Twitter developers Mark Otto and Jacob Thornton in 2011, Bootstrap has grown to become one of the most popular front-end frameworks and open-source projects in the world. It's designed to enable responsive development of mobile-first websites with a focus on simplicity and flexibility.

### Key Features

- **Responsive Grid System**: Flexible 12-column layout that works across devices
- **Extensive Component Library**: Pre-designed UI components ready to use
- **Consistent Design Language**: Cohesive visual style across components
- **Built-in JavaScript Behaviors**: Interactive components with minimal coding
- **Customizable Theming**: Adaptable design system for custom branding
- **Browser Compatibility**: Works across modern browsers
- **Accessibility Support**: Components designed with accessibility in mind

## Installation and Setup

### Basic CDN Installation

The simplest way to include Bootstrap is via CDN:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bootstrap Example</title>

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Your content here -->

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

### Package Manager Installation

```bash
# Using npm
npm install bootstrap

# Using yarn
yarn add bootstrap

# Using pnpm
pnpm add bootstrap
```

Then import in your JavaScript:

```javascript
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Or import only what you need
import { Modal, Tooltip } from "bootstrap";
```

And include the CSS:

```javascript
// In your Sass file
@import "bootstrap/scss/bootstrap";

// Or in your JavaScript if using a bundler
import 'bootstrap/dist/css/bootstrap.min.css'
```

### Customization with Sass

Create a custom.scss file:

```scss
// Custom variables
$primary: #0074d9;
$danger: #ff4136;

// Required Bootstrap imports
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";

// Optional Bootstrap components
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";
// ... other components as needed

// Add custom code after Bootstrap imports
.custom-element {
  color: $primary;
}
```

## Core Components

### Grid System

Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content:

```html
<div class="container">
  <div class="row">
    <div class="col-sm-4">Column 1</div>
    <div class="col-sm-4">Column 2</div>
    <div class="col-sm-4">Column 3</div>
  </div>
</div>
```

Responsive grid options:

```bash
- `col-` (extra small, <576px)
- `col-sm-` (small, ≥576px)
- `col-md-` (medium, ≥768px)
- `col-lg-` (large, ≥992px)
- `col-xl-` (extra large, ≥1200px)
- `col-xxl-` (extra extra large, ≥1400px)
```

### Typography

```html
<h1>h1. Bootstrap heading</h1>
<h2>h2. Bootstrap heading</h2>
<h3>h3. Bootstrap heading</h3>
<h4>h4. Bootstrap heading</h4>
<h5>h5. Bootstrap heading</h5>
<h6>h6. Bootstrap heading</h6>

<p class="lead">This is a lead paragraph.</p>
<p>This is a regular paragraph.</p>

<p class="text-primary">.text-primary</p>
<p class="text-secondary">.text-secondary</p>
<p class="text-danger">.text-danger</p>
```

### Buttons

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>

<!-- Outline buttons -->
<button type="button" class="btn btn-outline-primary">Primary</button>

<!-- Different sizes -->
<button type="button" class="btn btn-lg btn-primary">Large</button>
<button type="button" class="btn btn-sm btn-primary">Small</button>
```

### Forms

```html
<form>
  <div class="mb-3">
    <label for="emailInput" class="form-label">Email address</label>
    <input
      type="email"
      class="form-control"
      id="emailInput"
      placeholder="name@example.com"
    />
    <div class="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div class="mb-3">
    <label for="passwordInput" class="form-label">Password</label>
    <input type="password" class="form-control" id="passwordInput" />
  </div>

  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="rememberCheck" />
    <label class="form-check-label" for="rememberCheck">Remember me</label>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Cards

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### Navigation

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## Interactive Components

### Modal

```html
<!-- Button trigger modal -->
<button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#exampleModal"
>
  Launch demo modal
</button>

<!-- Modal -->
<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">Modal content goes here.</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

JavaScript initialization (if not using data attributes):

```javascript
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
```

### Dropdown

```html
<div class="dropdown">
  <button
    class="btn btn-secondary dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
```

### Carousel

```html
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="slide1.jpg" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="slide2.jpg" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="slide3.jpg" class="d-block w-100" alt="..." />
    </div>
  </div>
  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```

## Utility Classes

Bootstrap provides numerous utility classes for quick styling without custom CSS:

### Spacing

```html
<!-- Margin -->
<div class="mt-4">Margin top 4</div>
<div class="mb-5">Margin bottom 5</div>
<div class="ms-3">Margin start 3</div>
<div class="me-3">Margin end 3</div>
<div class="mx-auto">Horizontal centering</div>
<div class="my-2">Vertical margin 2</div>

<!-- Padding -->
<div class="p-3">Padding all sides 3</div>
<div class="pt-4">Padding top 4</div>
<div class="pb-0">No padding bottom</div>
<div class="ps-5">Padding start 5</div>
<div class="pe-2">Padding end 2</div>
<div class="px-4">Horizontal padding 4</div>
<div class="py-5">Vertical padding 5</div>
```

### Display and Flex

```html
<div class="d-flex justify-content-between align-items-center">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="d-none d-md-block">Visible only on medium screens and up</div>
```

### Colors and Backgrounds

```html
<div class="text-primary">Primary text</div>
<div class="bg-success text-white">Success background</div>
<div class="bg-warning">Warning background</div>
```

### Borders

```html
<div class="border border-primary rounded p-3">
  Content with primary border and rounded corners
</div>
```

## Framework Integration

### React (React Bootstrap)

```bash
npm install react-bootstrap bootstrap
```

```jsx
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Example() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Launch Modal
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal content here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

### Vue (BootstrapVue)

```bash
npm install bootstrap bootstrap-vue
```

```vue
<template>
  <div>
    <b-button v-b-modal.modal-1>Launch Modal</b-button>

    <b-modal id="modal-1" title="Bootstrap Vue Modal">
      <p>Modal content here</p>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('modal-1')">
          Close
        </b-button>
        <b-button variant="primary" @click="$bvModal.hide('modal-1')">
          Save Changes
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalExample",
};
</script>
```

### Angular (ng-bootstrap)

```bash
ng add @ng-bootstrap/ng-bootstrap
```

```typescript
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [NgbModule],
  // ...
})
export class AppModule {}
```

```html
<div class="d-flex justify-content-center">
  <button class="btn btn-primary" (click)="open(content)">Launch modal</button>
</div>

<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title">Modal title</h4>
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      (click)="modal.dismiss()"
    ></button>
  </div>
  <div class="modal-body">
    <p>Modal content here</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="modal.close()">
      Close
    </button>
    <button type="button" class="btn btn-primary" (click)="modal.close()">
      Save changes
    </button>
  </div>
</ng-template>
```

## Customization

### Using Sass Variables

```scss
// Custom variables
$primary: #0074d9;
$secondary: #6c757d;
$success: #28a745;
$info: #17a2b8;
$warning: #ffc107;
$danger: #dc3545;
$light: #f8f9fa;
$dark: #343a40;

// Required Bootstrap imports
@import "bootstrap/scss/bootstrap";
```

### Custom Theme with CSS Variables

Bootstrap 5 includes CSS custom properties for easy theming:

```css
:root {
  --bs-primary: #0074d9;
  --bs-primary-rgb: 0, 116, 217;
  --bs-secondary: #6c757d;
  --bs-secondary-rgb: 108, 117, 125;
  /* Add other custom colors */
}

/* Create a dark theme */
[data-bs-theme="dark"] {
  --bs-body-bg: #212529;
  --bs-body-color: #f8f9fa;
}
```

### Using the Customization Tool

Bootstrap offers an online customization tool: https://getbootstrap.com/docs/5.3/customize/overview/

## Best Practices

### 1. Mobile-First Approach

Design for mobile first, then expand for larger screens:

```html
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">
    <!-- Content first takes full width, then half, then one-third -->
  </div>
</div>
```

### 2. Use Built-in Utilities

Leverage Bootstrap's utilities instead of writing custom CSS:

```html
<!-- Instead of custom CSS -->
<div style="margin-top: 1rem; text-align: center; background-color: #f8f9fa;">
  Content
</div>

<!-- Better approach with utilities -->
<div class="mt-3 text-center bg-light">Content</div>
```

### 3. Component Consistency

Keep components consistent across your application:

```html
<!-- Use the same button styles consistently -->
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
```

### 4. Accessibility

Ensure your Bootstrap components are accessible:

```html
<!-- Add proper labels and ARIA attributes -->
<div class="mb-3">
  <label for="formInput" class="form-label">Email address</label>
  <input
    type="email"
    class="form-control"
    id="formInput"
    aria-describedby="emailHelp"
  />
  <div id="emailHelp" class="form-text">
    We'll never share your email with anyone else.
  </div>
</div>
```

### 5. Custom Components

Create reusable components for your specific needs:

```html
<!-- Create a consistent card pattern -->
<div class="card custom-product-card">
  <img src="..." class="card-img-top" alt="Product image" />
  <div class="card-body">
    <h5 class="card-title">Product Name</h5>
    <p class="card-text text-muted">$99.99</p>
    <div class="d-grid">
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</div>
```

### 6. Minimize Custom CSS

Try to use Bootstrap's components and utilities before writing custom CSS:

```scss
// Try to minimize these custom overrides
.custom-component {
  // Use Bootstrap's variables
  margin-bottom: $spacer;
  color: $primary;
}
```

## Performance Considerations

### Reducing Bundle Size

Include only the Bootstrap components you need:

```scss
// Required
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";

// Include only what you need
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/card";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/utilities/api";
```

Or use the JavaScript import approach to reduce the JS bundle:

```javascript
// Import only specific components
import Alert from "bootstrap/js/dist/alert";
import Modal from "bootstrap/js/dist/modal";
```

### Lazy Loading

Load non-critical Bootstrap components only when needed:

```javascript
// Lazy load a Bootstrap component
const loadTooltip = async () => {
  const { Tooltip } = await import("bootstrap/js/dist/tooltip");
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach((tooltip) => new Tooltip(tooltip));
};

// Only load when needed
document
  .querySelector("#tooltipTrigger")
  .addEventListener("click", loadTooltip);
```

## Common Patterns

### Dashboard Layout

```html
<div class="container-fluid">
  <div class="row">
    <!-- Sidebar -->
    <nav
      id="sidebar"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#"> Dashboard </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Orders </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Products </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main content -->
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">Dashboard</h1>
      </div>

      <!-- Dashboard content -->
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Sales</h5>
              <p class="card-text display-4">$12,345</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Orders</h5>
              <p class="card-text display-4">254</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Customers</h5>
              <p class="card-text display-4">1,120</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

### Sign-up Form

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <div class="card shadow mt-5">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">Create an Account</h2>

          <form>
            <div class="mb-3">
              <label for="fullName" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="fullName" required />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                required
              />
              <div class="form-text">
                Password must be at least 8 characters long.
              </div>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="terms" />
              <label class="form-check-label" for="terms"
                >I agree to the Terms of Service</label
              >
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
          </form>

          <div class="mt-3 text-center">
            <p>Already have an account? <a href="#">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Product Cards

```html
<div class="container">
  <h2 class="my-4">Featured Products</h2>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <!-- Product Card 1 -->
    <div class="col">
      <div class="card h-100">
        <img src="product1.jpg" class="card-img-top" alt="Product 1" />
        <div class="card-body">
          <h5 class="card-title">Product Name</h5>
          <p class="card-text">Product description goes here.</p>
          <p class="card-text fw-bold">$24.99</p>
        </div>
        <div class="card-footer bg-transparent border-top-0">
          <div class="d-grid">
            <button class="btn btn-outline-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>

    <!-- More product cards -->
  </div>
</div>
```

## Bootstrap and Accessibility

Bootstrap 5 has improved accessibility features, but still requires attention to ensure fully accessible interfaces:

### ARIA Attributes

```html
<!-- Adding proper ARIA attributes to a collapsible accordion -->
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        Accordion Item #1
      </button>
    </h2>
    <div
      id="collapseOne"
      class="accordion-collapse collapse show"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">Content for accordion item 1.</div>
    </div>
  </div>
</div>
```

### Screen Reader Only Content

```html
<!-- Include text for screen readers but hide visually -->
<button class="btn btn-primary">
  <i class="bi bi-heart"></i>
  <span class="visually-hidden">Add to favorites</span>
</button>
```

### Focus Management

```javascript
// Proper focus management with modals
const modal = document.getElementById("exampleModal");
modal.addEventListener("hidden.bs.modal", function () {
  // Return focus to the button that triggered the modal
  document.getElementById("modalTriggerButton").focus();
});
```

## Bootstrap Ecosystem

### Official Extensions

- **Bootstrap Icons**: Over 1,600 open source SVG icons
- **Bootstrap Themes**: Official themes and templates
- **Bootstrap Examples**: Collection of example pages and layouts

### Third-Party Extensions

- **Bootswatch**: Free themes for Bootstrap
- **MDBootstrap**: Material Design version of Bootstrap
- **CoreUI**: Admin template and UI components based on Bootstrap
- **Tabler**: Premium admin dashboard template based on Bootstrap
- **Bootstrap Table**: Extensions for tables
- **Bootstrap Datepicker**: Datepicker component for Bootstrap

## Bootstrap 5 vs. Previous Versions

Key changes in Bootstrap 5:

- **Dropped jQuery**: Using vanilla JavaScript instead
- **Improved Grid System**: Added new grid tiers and gutter classes
- **RTL Support**: Built-in Right-to-Left support
- **Enhanced Form Elements**: Redesigned form controls
- **CSS Custom Properties**: More CSS variables for easier theming
- **Updated Color System**: Refreshed and expanded color palette
- **Utility API**: Custom utility generation
- **SVG Icons**: Dedicated icon library
- **Improved Docs**: Better documentation and examples

## When to Use Bootstrap

### Ideal Use Cases

1. **Rapid Prototyping**: Quickly build functional UIs
2. **Admin Dashboards**: Comprehensive components suit admin interfaces
3. **Business Websites**: Professional look with minimal custom design
4. **Projects with Tight Deadlines**: Reduce development time
5. **Teams with Varying CSS Skills**: Provides consistency

### Less Ideal Cases

1. **Highly Custom Designs**: Significant overrides defeat the purpose
2. **Very Small Projects**: Might be overkill for tiny sites
3. **Performance-Critical Applications**: Full framework may be too heavy
4. **Experienced Teams with Design Systems**: May prefer custom solutions

## Resources

- [Bootstrap Official Documentation](https://getbootstrap.com/docs/)
- [Bootstrap GitHub Repository](https://github.com/twbs/bootstrap)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Themes](https://themes.getbootstrap.com/)
- [Bootstrap Blog](https://blog.getbootstrap.com/)
- [Bootstrap Stack Overflow](https://stackoverflow.com/questions/tagged/bootstrap-5)
- [Bootstrap on Twitter](https://twitter.com/getbootstrap)
- [Bootstrap Discord Server](https://discord.gg/bZUvakRU3M)
- [Bootsnipp](https://bootsnipp.com/) - Code snippets for Bootstrap
