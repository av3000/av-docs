# CSS Best Practices

Creating maintainable, scalable, and efficient CSS requires following established best practices. This guide outlines key principles and techniques to improve your CSS codebase.

## Organization

### File Organization

<!-- (./organization.md) -->

Structure your CSS files logically to enhance maintainability:

```
styles/
├── base/             # Reset, typography, etc.
│   ├── _reset.scss
│   └── _typography.scss
├── components/       # Reusable components
│   ├── _buttons.scss
│   └── _forms.scss
├── layout/           # Major layout components
│   ├── _header.scss
│   └── _footer.scss
├── utils/            # Mixins, functions, variables
│   ├── _variables.scss
│   └── _mixins.scss
└── main.scss         # Main file that imports all others
```

Key principles:

- Group related styles together
- Use a consistent naming convention for files
- Separate concerns (layout, components, utilities)
- Keep files small and focused

### Code Organization Within Files

Organize properties consistently within rule sets:

```css
.element {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: flex;
  width: 100px;
  padding: 10px;

  /* Typography */
  font-family: sans-serif;
  font-size: 16px;

  /* Visual */
  background-color: #fff;
  border: 1px solid #ddd;

  /* Misc */
  cursor: pointer;
}
```

Add meaningful comments to explain complex code or hacks.

## Naming Conventions

<!-- (./naming-conventions.md) -->

### Class Naming

Choose a naming convention and apply it consistently:

#### BEM (Block, Element, Modifier)

```css
.card {
}
.card__title {
}
.card--featured {
}
```

#### SMACSS (Scalable and Modular Architecture for CSS)

```css
.l-header {
} /* Layout */
.btn {
} /* Module */
.is-active {
} /* State */
```

#### Namespacing

```css
.c-card {
} /* Component */
.u-hidden {
} /* Utility */
.js-toggle {
} /* JavaScript hook */
```

### Naming Best Practices

1. **Be descriptive**: Use names that describe purpose, not appearance

   ```css
   /* Good */
   .alert-message {
   }

   /* Bad */
   .red-box {
   }
   ```

2. **Be consistent**: Use the same conventions throughout the project

3. **Avoid excessive abbreviations**: Prioritize clarity over brevity

4. **Keep selectors simple**: Avoid deep nesting and overqualification

5. **Use hyphens as separators**: For multi-word class names (e.g., `.user-profile`)

## Maintainability

<!-- (./maintainability.md) -->

### DRY (Don't Repeat Yourself)

Avoid repetition to make updates easier:

```scss
// Bad
.button-primary {
  padding: 10px 15px;
  border-radius: 4px;
  background-color: blue;
}

.button-secondary {
  padding: 10px 15px;
  border-radius: 4px;
  background-color: gray;
}

// Good
.button {
  padding: 10px 15px;
  border-radius: 4px;
}

.button-primary {
  @extend .button;
  background-color: blue;
}

.button-secondary {
  @extend .button;
  background-color: gray;
}
```

### Avoid Magic Numbers

Use variables for repeated values and document unusual values:

```css
/* Bad */
.element {
  top: 37px;
}

/* Good */
:root {
  --header-height: 60px;
  --spacing-medium: 16px;
}

.element {
  /* Position below header with some spacing */
  top: calc(
    var(--header-height) + var(--spacing-medium) + 1px
  ); /* +1px for border */
}
```

### Responsive Design Considerations

Make maintenance easier by using consistent breakpoints:

```scss
// Define breakpoints
$breakpoints: (
  "sm": 576px,
  "md": 768px,
  "lg": 992px,
  "xl": 1200px,
);

// Create mixin
@mixin respond-to($breakpoint) {
  $value: map-get($breakpoints, $breakpoint);

  @if $value {
    @media (min-width: $value) {
      @content;
    }
  }
}

// Usage
.element {
  width: 100%;

  @include respond-to("md") {
    width: 50%;
  }
}
```

## Performance

<!-- (./performance.md) -->

### Selector Efficiency

Optimize selector performance:

1. **Avoid universal selectors** (`*`)
2. **Minimize selector depth**:

   ```css
   /* Less efficient */
   .header .navigation ul li a {
   }

   /* More efficient */
   .nav-link {
   }
   ```

3. **Limit descendant selectors**
4. **Be specific but not overly**

### Reduce Repaints and Reflows

Some properties trigger layout recalculation more than others:

```css
/* May trigger layout recalculation */
.element {
  width: 50%;
  height: 100px;
}

/* Generally more efficient for animations */
.element {
  transform: scale(1.5);
  opacity: 0.8;
}
```

### Critical CSS

Extract and inline critical styles for faster initial render:

```html
<head>
  <style>
    /* Critical CSS for above-the-fold content */
    header {
      /* ... */
    }
    .hero {
      /* ... */
    }
  </style>
  <link
    rel="stylesheet"
    href="main.css"
    media="print"
    onload="this.media='all'"
  />
</head>
```

### File Size Optimization

Reduce unnecessary code:

- Remove unused styles (tools like PurgeCSS can help)
- Minify CSS for production
- Consider code splitting for large applications

## Accessibility

<!-- (./accessibility.md) -->

### Color and Contrast

Ensure sufficient contrast for readability:

```css
/* Good contrast */
.text {
  color: #333;
  background-color: #fff;
}

/* Consider high contrast mode */
@media (prefers-contrast: high) {
  .text {
    color: #000;
    background-color: #fff;
  }
}
```

### Text Sizing

Use relative units for better accessibility:

```css
body {
  font-size: 16px; /* Base size */
}

h1 {
  font-size: 2rem; /* Relative to root font size */
}

p {
  font-size: 1em; /* Relative to parent */
}
```

### Focus Styles

Never remove focus indicators without providing alternatives:

```css
/* Bad */
:focus {
  outline: none;
}

/* Good */
:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 3px;
}

/* Alternative focus style */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid #4a90e2;
  outline-offset: 3px;
}
```

### Reduced Motion

Respect user preferences for reduced motion:

```css
.element {
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
  }
}
```

## Browser Compatibility

### Vendor Prefixes

Use tools like Autoprefixer instead of manually adding prefixes:

```css
/* Let Autoprefixer handle this */
.element {
  display: flex;
  user-select: none;
}
```

### Feature Detection

Use `@supports` to provide fallbacks:

```css
.element {
  display: block; /* Fallback */
}

@supports (display: grid) {
  .element {
    display: grid;
  }
}
```

### CSS Variables with Fallbacks

```css
.element {
  color: #3498db; /* Fallback */
  color: var(--primary-color, #3498db);
}
```

## Documentation

### Code Comments

Document your CSS appropriately:

```css
/* ==========================================================================
   Section comment block
   ========================================================================== */

/* Sub-section comment block
   ========================================================================== */

/**
 * Component: Button
 * 
 * Primary buttons are used for main actions.
 * Use .btn--secondary for less prominent actions.
 */
.btn {
  /* ... */
}

/* Simple comment for a specific declaration */
.element {
  z-index: 100; /* Needs to appear above .modal (z-index: 90) */
}
```

### Style Guide

Maintain a living style guide that documents:

- Color palette
- Typography
- Components
- Layout patterns
- Usage guidelines

## Tools and Workflows

### CSS Linting

Use stylelint to enforce consistent style:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "indentation": 2,
    "color-hex-case": "lower",
    "selector-class-pattern": "^[a-z][a-zA-Z0-9_-]+$"
  }
}
```

### Formatting

Use Prettier or similar tools to maintain consistent formatting.

### Version Control

Commit smaller, focused changes with descriptive messages.

## Common Pitfalls to Avoid

1. **Overriding styles repeatedly**: Fix the root issue instead
2. **Overly specific selectors**: Keeps specificity wars at bay
3. **Styling with IDs**: Leads to specificity problems
4. **Using `!important`**: Often indicates a specificity problem
5. **Ignoring mobile devices**: Always design with responsiveness in mind
6. **Inconsistent units**: Stick to a system (e.g., rem for most sizing)
7. **Not refactoring**: Regularly clean up and improve CSS codebase

## Resources

- [MDN CSS Guidelines](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/CSS)
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
- [CSS Guidelines by Harry Roberts](https://cssguidelin.es/)
- [CSS Tricks Articles](https://css-tricks.com/guides/)
