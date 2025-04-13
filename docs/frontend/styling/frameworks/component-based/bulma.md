# Bulma

Bulma is a free, open-source CSS framework based on Flexbox and designed for building responsive, mobile-first web interfaces. It's a lightweight, modular alternative to frameworks like Bootstrap with a clean and modern design aesthetic.

## Overview

Created by Jeremy Thomas in 2016, Bulma has gained popularity for its simplicity, modern design, and flexibility. Unlike some other CSS frameworks, Bulma is CSS-only with no JavaScript components, which gives developers complete freedom to implement behavior as needed.

### Key Features

- **Pure CSS Framework**: No JavaScript dependencies
- **Flexbox-Based**: Modern layout capabilities
- **Modular Architecture**: Import only what you need
- **Responsive Design**: Mobile-first approach
- **Modern Aesthetic**: Clean, minimalist design
- **Simple Syntax**: Human-readable classes
- **Customizable**: Easy to theme and extend
- **Lightweight**: Small file size compared to other frameworks

## Installation and Setup

### Basic CDN Installation

The simplest way to include Bulma is via CDN:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bulma Example</title>

    <!-- Bulma CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
    />
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

### Package Manager Installation

```bash
# Using npm
npm install bulma

# Using yarn
yarn add bulma

# Using pnpm
pnpm add bulma
```

Then import in your project:

```scss
// In your .scss file
@import "bulma/bulma";

// Or import specific parts
@import "bulma/sass/utilities/_all";
@import "bulma/sass/base/_all";
@import "bulma/sass/elements/button";
@import "bulma/sass/elements/container";
@import "bulma/sass/elements/title";
@import "bulma/sass/form/_all";
@import "bulma/sass/components/navbar";
@import "bulma/sass/layout/hero";
@import "bulma/sass/layout/section";
```

Using JavaScript bundlers:

```javascript
// In JavaScript file
import "bulma/css/bulma.min.css";
```

### Customization with Sass

Create a custom.scss file:

```scss
// Import Bulma's core
@import "bulma/sass/utilities/_all";

// Set your custom variables
$primary: #8a4d76;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Update Bulma's global variables
$family-sans-serif: "Nunito", sans-serif;
$grey-dark: $brown;
$grey-light: $beige-light;
$link: $pink;
$widescreen-enabled: false;
$fullhd-enabled: false;

// Update some of Bulma's component variables
$body-background-color: $beige-lighter;
$control-border-width: 2px;
$input-border-color: transparent;
$input-shadow: none;

// Import the rest of Bulma
@import "bulma/bulma";
```

## Core Components

### Layout Elements

#### Container

Bulma's container is a simple element to center content horizontally:

```html
<div class="container">
  <h1 class="title">Container title</h1>
  <p>This content is centered on desktop.</p>
</div>
```

#### Columns

Bulma uses a simple flexbox-based grid system:

```html
<div class="columns">
  <div class="column">First column</div>
  <div class="column">Second column</div>
  <div class="column">Third column</div>
  <div class="column">Fourth column</div>
</div>
```

Responsive columns:

```html
<div class="columns is-mobile">
  <div class="column is-full-mobile is-half-tablet is-one-third-desktop">
    <!-- Different widths based on screen size -->
  </div>
</div>
```

Column sizing:

```html
<div class="columns">
  <div class="column is-one-quarter">is-one-quarter</div>
  <div class="column">Auto (will take the rest)</div>
</div>
```

#### Hero

The hero component creates a full-width banner:

```html
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Primary title</h1>
      <h2 class="subtitle">Primary subtitle</h2>
    </div>
  </div>
</section>
```

Hero sizes and styles:

```html
<!-- Hero sizes -->
<section class="hero is-small"><!-- Small hero --></section>
<section class="hero is-medium"><!-- Medium hero --></section>
<section class="hero is-large"><!-- Large hero --></section>

<!-- Hero colors -->
<section class="hero is-primary"><!-- Primary color --></section>
<section class="hero is-info"><!-- Info color --></section>
<section class="hero is-success"><!-- Success color --></section>
<section class="hero is-warning"><!-- Warning color --></section>
<section class="hero is-danger"><!-- Danger color --></section>
```

### Elements

#### Buttons

```html
<button class="button">Button</button>
<button class="button is-primary">Primary</button>
<button class="button is-link">Link</button>
<button class="button is-info">Info</button>
<button class="button is-success">Success</button>
<button class="button is-warning">Warning</button>
<button class="button is-danger">Danger</button>

<!-- Button sizes -->
<button class="button is-small">Small</button>
<button class="button">Default</button>
<button class="button is-medium">Medium</button>
<button class="button is-large">Large</button>

<!-- Button styles -->
<button class="button is-outlined">Outlined</button>
<button class="button is-rounded">Rounded</button>
<button class="button is-loading">Loading</button>
<button class="button" disabled>Disabled</button>
```

#### Typography

```html
<h1 class="title">Title</h1>
<h2 class="subtitle">Subtitle</h2>

<h1 class="title is-1">Title 1</h1>
<h2 class="title is-2">Title 2</h2>
<h3 class="title is-3">Title 3</h3>
<h4 class="title is-4">Title 4</h4>
<h5 class="title is-5">Title 5</h5>
<h6 class="title is-6">Title 6</h6>

<p class="content">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus
  ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu
  lectus.
</p>
```

#### Forms

```html
<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left">
    <input class="input" type="text" placeholder="e.g. johnsmith" />
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left">
    <input class="input" type="email" placeholder="e.g. john@example.com" />
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Your message here"></textarea>
  </div>
</div>

<div class="field">
  <div class="control">
    <button class="button is-primary">Submit</button>
  </div>
</div>
```

#### Tables

```html
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>john@example.com</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>jane@example.com</td>
      <td>Los Angeles</td>
    </tr>
  </tbody>
</table>
```

Table modifiers:

```html
<table class="table is-striped is-narrow is-hoverable is-fullwidth">
  <!-- Table content -->
</table>
```

### Components

#### Navbar

```html
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
    </a>

    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item"> Home </a>

      <a class="navbar-item"> Documentation </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"> More </a>

        <div class="navbar-dropdown">
          <a class="navbar-item"> About </a>
          <a class="navbar-item"> Jobs </a>
          <a class="navbar-item"> Contact </a>
          <hr class="navbar-divider" />
          <a class="navbar-item"> Report an issue </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light"> Log in </a>
        </div>
      </div>
    </div>
  </div>
</nav>
```

For the navbar burger to work, you need JavaScript:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});
```

#### Card

```html
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img
            src="https://bulma.io/images/placeholders/96x96.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
      iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
      <a href="#">#responsive</a>
      <br />
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
```

#### Modal

The modal requires JavaScript to toggle the `is-active` class:

```html
<!-- Modal trigger button -->
<button class="button is-primary js-modal-trigger" data-target="modal-example">
  Open Modal
</button>

<!-- Modal structure -->
<div id="modal-example" class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content -->
      <p>Modal content goes here</p>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
    </footer>
  </div>
</div>
```

JavaScript for the modal:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal .delete, .modal .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});
```

## Helper Classes

Bulma provides various helper classes for quick styling:

### Colors

```html
<!-- Text colors -->
<p class="has-text-primary">Primary text</p>
<p class="has-text-link">Link text</p>
<p class="has-text-info">Info text</p>
<p class="has-text-success">Success text</p>
<p class="has-text-warning">Warning text</p>
<p class="has-text-danger">Danger text</p>

<!-- Background colors -->
<div class="has-background-primary">Primary background</div>
<div class="has-background-link">Link background</div>
<div class="has-background-info">Info background</div>
<div class="has-background-success">Success background</div>
<div class="has-background-warning">Warning background</div>
<div class="has-background-danger">Danger background</div>
```

### Typography

```html
<!-- Text alignment -->
<p class="has-text-centered">Centered text</p>
<p class="has-text-justified">Justified text</p>
<p class="has-text-left">Left aligned text</p>
<p class="has-text-right">Right aligned text</p>

<!-- Text transformation -->
<p class="is-capitalized">capitalized text</p>
<p class="is-lowercase">LOWERCASE TEXT</p>
<p class="is-uppercase">uppercase text</p>
<p class="is-italic">Italic text</p>

<!-- Text weight -->
<p class="has-text-weight-light">Light text</p>
<p class="has-text-weight-normal">Normal text</p>
<p class="has-text-weight-medium">Medium text</p>
<p class="has-text-weight-semibold">Semibold text</p>
<p class="has-text-weight-bold">Bold text</p>
```

### Spacing

```html
<!-- Margin -->
<div class="m-0">No margin</div>
<div class="m-1">Small margin</div>
<div class="m-2">Medium margin</div>
<div class="m-3">Medium margin</div>
<div class="m-4">Large margin</div>
<div class="m-5">Extra large margin</div>
<div class="m-6">Super large margin</div>

<!-- Specific margin directions -->
<div class="mt-4">Margin top</div>
<div class="mr-4">Margin right</div>
<div class="mb-4">Margin bottom</div>
<div class="ml-4">Margin left</div>
<div class="mx-4">Horizontal margins</div>
<div class="my-4">Vertical margins</div>

<!-- Padding works the same way -->
<div class="p-4">All sides padding</div>
<div class="pt-4">Padding top</div>
<div class="pb-4">Padding bottom</div>
<!-- etc. -->
```

### Display and Visibility

```html
<!-- Responsive display -->
<div class="is-hidden-mobile">Hidden on mobile</div>
<div class="is-hidden-tablet-only">Hidden on tablet only</div>
<div class="is-hidden-desktop">Hidden on desktop</div>

<!-- Flex helpers -->
<div class="is-flex">Flex container</div>
<div class="is-flex-direction-row">Row direction</div>
<div class="is-flex-direction-column">Column direction</div>
<div class="is-justify-content-space-between">Space between items</div>
<div class="is-align-items-center">Center aligned items</div>
```

## Responsive Design

Bulma is mobile-first with a simple responsive design system:

### Responsive Columns

```html
<div class="columns is-mobile">
  <!-- Mobile columns (always use the column layout, even on mobile) -->
</div>

<div class="columns is-multiline">
  <!-- Wrap columns when they don't fit -->
</div>

<div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
  <!-- Different widths based on screen size -->
</div>
```

### Responsive Visibility

```html
<div class="is-hidden-mobile">Only visible on tablet and desktop</div>
<div class="is-hidden-tablet">Only visible on mobile</div>
<div class="is-hidden-desktop">Only visible on tablet and mobile</div>

<div class="is-hidden-touch">Only visible on desktop</div>
<div class="is-hidden-desktop">Only visible on mobile and tablet</div>
```

### Responsive Helpers

```html
<p class="has-text-centered-mobile">Centered on mobile only</p>
<p class="has-text-justified-tablet">Justified on tablet and above</p>
<p class="has-text-left-desktop">Left aligned on desktop only</p>
<p class="has-text-right-widescreen">Right aligned on widescreen only</p>
```

## Framework Integration

### React (with react-bulma-components)

```bash
npm install react-bulma-components
```

```jsx
import React from "react";
import {
  Button,
  Card,
  Columns,
  Content,
  Heading,
  Image,
} from "react-bulma-components";
import "bulma/css/bulma.min.css";

function Example() {
  return (
    <Card>
      <Card.Image>
        <Image src="https://bulma.io/images/placeholders/1280x960.png" />
      </Card.Image>

      <Card.Content>
        <Heading>Card Title</Heading>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
        </Content>
        <Button color="primary">Read More</Button>
      </Card.Content>
    </Card>
  );
}
```

### Vue (with Buefy)

```bash
npm install buefy
```

```vue
<template>
  <div>
    <b-card>
      <b-card-image
        :src="'https://bulma.io/images/placeholders/1280x960.png'"
      ></b-card-image>
      <b-card-content>
        <p class="title is-4">Card Title</p>
        <p class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
        </p>
        <b-button type="is-primary">Read More</b-button>
      </b-card-content>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardExample",
};
</script>
```

Configure Buefy in your Vue app:

```javascript
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);
```

## Customization

### Sass Variables

Bulma allows extensive customization via Sass variables:

```scss
// Import Bulma's core
@import "bulma/sass/utilities/_all";

// Colors
$primary: #8c67ef;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes
$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
    $primary-light,
    $primary-dark,
  ),
  "link": (
    $link,
    $link-invert,
    $link-light,
    $link-dark,
  ),
  "info": (
    $info,
    $info-invert,
    $info-light,
    $info-dark,
  ),
  "success": (
    $success,
    $success-invert,
    $success-light,
    $success-dark,
  ),
  "warning": (
    $warning,
    $warning-invert,
    $warning-light,
    $warning-dark,
  ),
  "danger": (
    $danger,
    $danger-invert,
    $danger-light,
    $danger-dark,
  ),
);

// Typography
$family-sans-serif: "Nunito", sans-serif;
$family-monospace: monospace;
$size-1: 3rem;
$size-2: 2.5rem;
$size-3: 2rem;
$size-4: 1.5rem;
$size-5: 1.25rem;
$size-6: 1rem;
$size-7: 0.75rem;

// Update component variables
$navbar-height: 4rem;
$navbar-item-img-max-height: 2.5rem;
$card-shadow: 0 0.5em 1em -0.125em rgba($black, 0.1), 0 0 0 1px rgba($black, 0.02);

// Import Bulma and other modules
@import "bulma/bulma";
```

### Custom Build

You can create a custom build by importing only what you need:

```scss
// Import only what you need from Bulma
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/elements/button.sass";
@import "bulma/sass/elements/container.sass";
@import "bulma/sass/elements/title.sass";
@import "bulma/sass/form/_all.sass";
@import "bulma/sass/components/navbar.sass";
@import "bulma/sass/layout/hero.sass";
@import "bulma/sass/layout/section.sass";
@import "bulma/sass/grid/columns.sass";
```

## Best Practices

### 1. Mobile-First Approach

Start with the mobile design, then add modifiers for larger screens:

```html
<div class="columns is-mobile">
  <div class="column is-full-mobile is-half-tablet is-one-third-desktop">
    <!-- Content -->
  </div>
</div>
```

### 2. Keep HTML Clean

Bulma's readable class names help keep HTML clean and understandable:

```html
<!-- Good: Clear and readable -->
<article class="message is-info">
  <div class="message-header">
    <p>Information</p>
  </div>
  <div class="message-body">This is an info message.</div>
</article>
```

### 3. Use Built-in Modifiers

Leverage Bulma's modifier classes instead of custom CSS:

```html
<!-- Instead of custom CSS -->
<div style="text-align: center; margin-top: 1.5rem;">
  <!-- Content -->
</div>

<!-- Better approach with modifiers -->
<div class="has-text-centered mt-5">
  <!-- Content -->
</div>
```

### 4. Combine Responsively

Combine responsive classes for adaptive layouts:

```html
<div class="columns">
  <div class="column is-12-mobile is-6-tablet is-4-desktop">
    <div class="card">
      <!-- Card content -->
    </div>
  </div>
</div>
```

## Common Patterns

### Hero with Navbar

```html
<section class="hero is-primary is-medium">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="logo.png" alt="Logo" />
          </a>
          <span class="navbar-burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item is-active"> Home </a>
            <a class="navbar-item"> Features </a>
            <a class="navbar-item"> About </a>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">Hero Title</p>
      <p class="subtitle">Hero subtitle</p>
    </div>
  </div>
</section>
```

### Login Form

```html
<div class="columns is-centered">
  <div class="column is-one-third">
    <div class="box">
      <h1 class="title has-text-centered">Login</h1>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="email"
            placeholder="e.g. name@example.com"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input class="input" type="password" placeholder="********" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" />
            Remember me
          </label>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-primary is-fullwidth">Login</button>
        </div>
      </div>

      <div class="has-text-centered mt-4">
        <a href="#">Forgot password?</a>
      </div>
    </div>
  </div>
</div>
```

### Pricing Tiers

```html
<section class="section">
  <div class="container">
    <h1 class="title has-text-centered">Pricing</h1>
    <h2 class="subtitle has-text-centered">
      Choose the plan that fits your needs
    </h2>

    <div class="columns is-centered mt-5">
      <!-- Basic Tier -->
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content has-text-centered">
            <p class="title">Basic</p>
            <p class="subtitle">For individuals</p>
            <p class="is-size-1 has-text-weight-bold">$9.99</p>
            <p class="is-size-6 has-text-grey">per month</p>

            <div class="content mt-5">
              <ul style="list-style-type: none; padding: 0;">
                <li class="mb-2">✅ Feature One</li>
                <li class="mb-2">✅ Feature Two</li>
                <li class="mb-2">❌ Feature Three</li>
                <li class="mb-2">❌ Feature Four</li>
              </ul>
            </div>

            <button class="button is-primary is-fullwidth mt-5">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <!-- Pro Tier -->
      <div class="column is-one-third">
        <div class="card has-background-primary-light">
          <div class="card-content has-text-centered">
            <p class="title">Pro</p>
            <p class="subtitle">For small teams</p>
            <p class="is-size-1 has-text-weight-bold">$29.99</p>
            <p class="is-size-6 has-text-grey">per month</p>

            <div class="content mt-5">
              <ul style="list-style-type: none; padding: 0;">
                <li class="mb-2">✅ Feature One</li>
                <li class="mb-2">✅ Feature Two</li>
                <li class="mb-2">✅ Feature Three</li>
                <li class="mb-2">❌ Feature Four</li>
              </ul>
            </div>

            <button class="button is-primary is-fullwidth mt-5">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <!-- Enterprise Tier -->
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content has-text-centered">
            <p class="title">Enterprise</p>
            <p class="subtitle">For large organizations</p>
            <p class="is-size-1 has-text-weight-bold">$99.99</p>
            <p class="is-size-6 has-text-grey">per month</p>

            <div class="content mt-5">
              <ul style="list-style-type: none; padding: 0;">
                <li class="mb-2">✅ Feature One</li>
                <li class="mb-2">✅ Feature Two</li>
                <li class="mb-2">✅ Feature Three</li>
                <li class="mb-2">✅ Feature Four</li>
              </ul>
            </div>

            <button class="button is-primary is-fullwidth mt-5">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Bulma vs. Other Frameworks

### Bulma vs. Bootstrap

| Feature           | Bulma            | Bootstrap                   |
| ----------------- | ---------------- | --------------------------- |
| **JavaScript**    | No JS included   | Includes JS components      |
| **CSS Framework** | Pure CSS         | CSS and JS                  |
| **Layout System** | Flexbox-based    | Grid and Flexbox            |
| **Size**          | Lighter (~200KB) | Heavier (~300KB+)           |
| **Syntax**        | More intuitive   | More technical              |
| **Customization** | Easier with Sass | Complex with many variables |
| **Community**     | Medium sized     | Very large                  |
| **Maturity**      | Newer            | More established            |

### Bulma vs. Tailwind CSS

| Feature            | Bulma           | Tailwind CSS          |
| ------------------ | --------------- | --------------------- |
| **Approach**       | Component-based | Utility-first         |
| **Learning Curve** | Easy            | Steeper               |
| **HTML Verbosity** | Less verbose    | More verbose          |
| **Customization**  | Sass variables  | Configuration file    |
| **Size**           | Moderate        | Smaller after purging |
| **Design Freedom** | Less flexible   | More flexible         |

## When to Use Bulma

### Ideal Use Cases

1. **Small to Medium Projects**: Perfect size for most websites
2. **Prototyping**: Quick to implement with readable classes
3. **Modern Design Needs**: Clean, modern aesthetic out of the box
4. **Flexbox-Heavy Layouts**: Built entirely on Flexbox
5. **JavaScript Framework Integration**: Works well with Vue, React, etc.
6. **When JavaScript Is Handled Separately**: If you prefer your own JS implementation

### Less Ideal Cases

1. **Complex Web Applications**: May need more structure than Bulma provides
2. **Need for Built-in JavaScript Components**: Bulma doesn't include JS
3. **Heavy Customization**: Might be better to start with a utility framework
4. **Large Enterprise Applications**: May benefit from more opinionated frameworks

## Resources

- [Bulma Official Documentation](https://bulma.io/documentation/)
- [Bulma GitHub Repository](https://github.com/jgthms/bulma)
- [Bulma Extensions](https://bulma.io/extensions/)
- [Bulma Templates](https://bulma.io/expo/)
- [Bulma CSS Cheat Sheet](https://devhints.io/bulma)
- [Made with Bulma](https://madewithbulma.com/) - Examples
- [Bulma on Stack Overflow](https://stackoverflow.com/questions/tagged/bulma)
- [BulmaBuildingBlocks](https://bulma.dev/) - More components
- [Bulma Play](https://bulma-css-playground.netlify.app/) - Interactive playground
