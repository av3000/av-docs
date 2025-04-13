# CSS Preprocessors

CSS preprocessors are scripting languages that extend CSS with programming features like variables, nesting, functions, mixins, and more. They compile into standard CSS that browsers can understand, allowing developers to write more maintainable and modular stylesheets.

## Why Use CSS Preprocessors?

CSS preprocessors offer several advantages over writing plain CSS:

- **Variables**: Store and reuse values throughout your stylesheets
- **Nesting**: Write cleaner, more readable CSS by nesting selectors
- **Mixins**: Create reusable blocks of styles
- **Functions**: Perform calculations and manipulate values
- **Partials and Imports**: Split your CSS into manageable files
- **Extend/Inheritance**: Share properties between selectors
- **Control Directives**: Add logic to your stylesheets with conditionals and loops

## Popular CSS Preprocessors

This section covers the most widely-used CSS preprocessors:

### [Sass/SCSS](./scss.md)

The most mature and feature-rich preprocessor, with two syntaxes: the original indented syntax (Sass) and the newer SCSS syntax that's closer to CSS.

### [Less](./less.md)

A JavaScript-based preprocessor that extends CSS with dynamic behavior through variables, mixins, operations, and functions.

### [Stylus](./stylus.md)

A flexible preprocessor that offers an expressive syntax with optional colons, semicolons, and braces.

### [PostCSS](./postcss.md)

A tool for transforming CSS with JavaScript plugins, which can add future CSS features, autoprefix properties, and more.

## Choosing a Preprocessor

When selecting a preprocessor, consider:

- **Team familiarity**: Which preprocessor is your team most comfortable with?
- **Project requirements**: What features do you need?
- **Integration**: How well does it integrate with your build process?
- **Community support**: How active is the community and documentation?

## Common Features Across Preprocessors

While each preprocessor has its own syntax and quirks, they share many common features:

### Variables

```scss
// SCSS
$primary-color: #3498db;
.button {
  background-color: $primary-color;
}
```

### Nesting

```scss
// SCSS
nav {
  ul {
    margin: 0;

    li {
      display: inline-block;

      a {
        color: blue;
      }
    }
  }
}
```

### Mixins

```scss
// SCSS
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
}
```

### Functions

```scss
// SCSS
@function rem($pixels) {
  @return $pixels / 16px * 1rem;
}

.container {
  font-size: rem(18);
}
```

## Best Practices

- **Don't over-nest**: Limit nesting to 3-4 levels to avoid specificity problems
- **Use variables for reusable values**: Colors, font sizes, spacing, etc.
- **Create mixins for repeating patterns**: Keep your code DRY
- **Split files logically**: Organize by component, feature, or purpose
- **Comment your code**: Especially for complex mixins and functions
- **Think mobile-first**: Structure your media queries accordingly
- **Avoid unnecessary abstraction**: Just because you can doesn't mean you should

Explore each preprocessor in detail through the links above to determine which tool best fits your workflow and project needs.
