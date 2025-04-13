# SMACSS (Scalable and Modular Architecture for CSS)

SMACSS (pronounced "smacks") is a style guide and CSS architecture methodology created by Jonathan Snook in 2011. It's not a rigid framework but rather a set of guidelines to organize your CSS code into distinct categories, making it more scalable and maintainable.

## Core Categories

SMACSS divides CSS rules into five distinct categories:

### 1. Base

Base rules are the defaults applied to HTML elements using element selectors, attribute selectors, pseudo-class selectors, or any combination. These define how elements should look by default.

```css
/* Base rules */
body {
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  color: #333;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  font-weight: 500;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### 2. Layout

Layout rules divide the page into sections and hold one or more modules together. These are often denoted with an `l-` or `layout-` prefix.

```css
/* Layout rules */
.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.l-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.l-header {
  grid-column: span 12;
}

.l-sidebar {
  grid-column: span 3;
}

.l-main {
  grid-column: span 9;
}

@media (max-width: 768px) {
  .l-sidebar,
  .l-main {
    grid-column: span 12;
  }
}
```

### 3. Module

Modules are reusable, modular components of a design. They are the meat of the page and contain the majority of your design. Examples include navigation bars, carousels, dialogs, widgets, etc.

```css
/* Module rules */
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  background-color: #fff;
}

.card-header {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #0066cc;
  color: white;
  font-weight: 500;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 10px 0;
}

.navbar-item {
  display: inline-block;
  margin-right: 15px;
}
```

### 4. State

State rules define how modules or layouts look in a particular state. These are denoted with an `is-` or `has-` prefix.

```css
/* State rules */
.is-hidden {
  display: none;
}

.is-active {
  font-weight: bold;
  border-bottom: 2px solid #0066cc;
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.has-error {
  border-color: #cc0000;
  color: #cc0000;
}
```

### 5. Theme

Theme rules define colors and images that give your application or site its look and feel. These can be separated out to enable easy theme switching.

```css
/* Theme rules */
.t-dark {
  background-color: #222;
  color: #f8f8f8;
}

.t-light {
  background-color: #f8f8f8;
  color: #222;
}

.t-brand-primary {
  color: #0066cc;
}

.t-brand-secondary {
  color: #ff9900;
}
```

## Naming Conventions

SMACSS recommends the following naming conventions:

- **Base**: No prefix, just the element name (`body`, `a`, `h1`)
- **Layout**: Prefix with `l-` or `layout-` (e.g., `l-header`, `l-sidebar`)
- **Module**: Use the module name (e.g., `card`, `btn`, `modal`)
- **Submodule**: Use the module name followed by a hyphen and the submodule name (e.g., `card-header`, `btn-large`)
- **State**: Prefix with `is-` or `has-` (e.g., `is-active`, `has-error`)
- **Theme**: Prefix with `theme-` or `t-` (e.g., `theme-dark`, `t-large`)

## SMACSS Principles

### Categorization

By categorizing CSS rules, it becomes easier to find the rules that apply to a part of the page. This organization provides clarity on which styles belong where.

### Naming Convention

Naming conventions improve readability and make it clear what role a class plays in the code.

### Minimize Selectors and Depth

Keep selector specificity as low as reasonably possible:

```css
/* Avoid */
#sidebar ul.navigation li a {
  ...;
}

/* Better */
.nav-item {
  ...;
}
```

### Module Independence

Modules should be designed to exist as standalone components. Avoid creating styles that require a certain location or context.

## Implementation Example

Here's how a SMACSS-structured project's CSS might be organized:

```
styles/
├── base/
│   ├── _reset.css
│   ├── _typography.css
│   └── _forms.css
├── layout/
│   ├── _grid.css
│   ├── _header.css
│   └── _footer.css
├── modules/
│   ├── _buttons.css
│   ├── _cards.css
│   └── _navigation.css
├── states/
│   └── _states.css
├── themes/
│   ├── _light.css
│   └── _dark.css
└── main.css
```

## Pros and Cons

### Advantages

1. **Organized structure**: Clear categories make code easier to navigate
2. **Scalability**: Scales well for larger projects
3. **Reduced specificity issues**: Encourages flatter selectors
4. **Modularity**: Components can be easily moved or reused
5. **Predictable**: Consistent naming provides clarity

### Limitations

1. **Learning curve**: The system takes time to learn and apply consistently
2. **Strict categorization**: Sometimes elements don't fit neatly into categories
3. **Verbose naming**: Prefixing can lead to longer class names
4. **Subjective boundaries**: The line between module and layout can be ambiguous

## SMACSS vs. Other Methodologies

| Methodology    | Strengths                    | Focus                            | Naming Style               |
| -------------- | ---------------------------- | -------------------------------- | -------------------------- |
| **SMACSS**     | Organization, categorization | Structured approach              | Categorical prefixes       |
| **BEM**        | Clear relationships          | Component structure              | Block\_\_Element--Modifier |
| **OOCSS**      | Reusability                  | Separation of structure and skin | Object-based               |
| **Atomic CSS** | Utility-focused              | Single purpose classes           | Functional                 |

## Best Practices

1. **Start simple**: Begin with the basic categories and refine as needed
2. **Document conventions**: Create a style guide for your team
3. **Be consistent**: Apply naming conventions consistently
4. **Adapt to your needs**: SMACSS is flexible; modify it to suit your project
5. **Combine with preprocessors**: Use Sass/LESS to enhance organization

## Resources

- [SMACSS Official Website](https://smacss.com/)
- [SMACSS Book by Jonathan Snook](http://smacss.com/book/) (free online)
- [Organizing CSS with SMACSS - Tuts+ Course](https://webdesign.tutsplus.com/courses/organizing-css-with-smacss)
- [SMACSS with Sass - CSS-Tricks](https://css-tricks.com/combining-sass-and-smacss-a-real-world-example/)
- [Jonathan Snook's GitHub](https://github.com/snookca)
- [SMACSS and Sass: The Future of Stylesheets](https://www.sitepoint.com/smacss-and-sass-the-future-of-stylesheets/)
