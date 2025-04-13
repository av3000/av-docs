# SCSS (Sassy CSS)

SCSS (Sassy CSS) is a syntax of Sass (Syntactically Awesome Stylesheets), a powerful CSS preprocessor that extends the capabilities of traditional CSS. SCSS offers a CSS-compatible syntax that adds programming features like variables, nesting, mixins, and functions to make writing and maintaining CSS more efficient.

## SCSS vs Sass

Sass comes in two syntaxes:

- **SCSS** (.scss files): Uses braces and semicolons like CSS
- **Sass** (.sass files): Uses indentation instead of braces and semicolons

SCSS is more widely adopted because it's a superset of CSS, meaning any valid CSS is also valid SCSS.

## Key Features

### Variables

Variables let you store and reuse values throughout your stylesheets.

```scss
$primary-color: #3498db;
$font-stack: "Helvetica", sans-serif;
$spacing-unit: 16px;

body {
  font-family: $font-stack;
  color: darken($primary-color, 20%);
  padding: $spacing-unit;
}
```

### Nesting

SCSS allows you to nest CSS selectors in a way that follows your HTML hierarchy.

```scss
nav {
  background: #f8f8f8;

  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 10px;

      a {
        text-decoration: none;
        color: $primary-color;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
```

The `&` character is used to refer to the parent selector.

### Partials and Imports

SCSS allows you to split your code into smaller, more manageable files.

```scss
// _variables.scss
$primary-color: #3498db;

// _typography.scss
@import "variables";

body {
  font-family: sans-serif;
  color: $primary-color;
}

// main.scss
@import "variables";
@import "typography";

.container {
  max-width: 1200px;
}
```

Partials are named with a leading underscore, which tells Sass not to compile them directly to CSS.

### Mixins

Mixins let you define reusable blocks of CSS.

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin media-query($breakpoint) {
  @media screen and (max-width: $breakpoint) {
    @content;
  }
}

.container {
  @include flex-center;
  flex-direction: column;

  @include media-query(768px) {
    flex-direction: row;
  }
}
```

The `@content` directive allows you to pass a block of styles to the mixin.

### Functions

SCSS provides built-in functions and allows you to define your own.

```scss
@function rem($pixels) {
  @return $pixels / 16px * 1rem;
}

.container {
  font-size: rem(18);
  padding: rem(24);
}
```

### Extend/Inheritance

Extend lets you share styles between selectors.

```scss
%button-base {
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
}

.button-secondary {
  @extend %button-base;
  background-color: #f8f8f8;
  color: $primary-color;
}
```

### Control Directives

SCSS supports programming constructs like conditionals and loops.

```scss
// Conditionals
@mixin theme($dark-mode: false) {
  @if $dark-mode {
    background-color: #333;
    color: white;
  } @else {
    background-color: white;
    color: #333;
  }
}

// Loops
$sizes: (
  small: 12px,
  medium: 16px,
  large: 24px,
);

@each $name, $size in $sizes {
  .text-#{$name} {
    font-size: $size;
  }
}

@for $i from 1 through 5 {
  .mt-#{$i} {
    margin-top: $i * 8px;
  }
}
```

## Advanced Features

### Maps

Maps are key-value pairs that can be iterated through.

```scss
$theme-colors: (
  "primary": #3498db,
  "secondary": #2ecc71,
  "accent": #e74c3c,
);

@function theme-color($key) {
  @return map-get($theme-colors, $key);
}

.button {
  background-color: theme-color("primary");
}
```

### Module System

In newer versions of Sass, you can use the `@use` rule instead of `@import`.

```scss
// _colors.scss
$primary: #3498db;
$secondary: #2ecc71;

// main.scss
@use "colors" as colors;

.button {
  background-color: colors.$primary;
}
```

### Built-in Modules

Sass provides built-in modules like `sass:math`, `sass:color`, and `sass:list`.

```scss
@use "sass:math";
@use "sass:color";

.element {
  width: math.div(600px, 4);
  background-color: color.adjust($primary-color, $lightness: 15%);
}
```

## Best Practices

1. **Create a logical file structure**:

   ```
   styles/
   ├── abstracts/
   │   ├── _variables.scss
   │   ├── _functions.scss
   │   ├── _mixins.scss
   │   └── _placeholders.scss
   ├── base/
   │   ├── _reset.scss
   │   └── _typography.scss
   ├── components/
   │   ├── _buttons.scss
   │   ├── _cards.scss
   │   └── _forms.scss
   ├── layout/
   │   ├── _header.scss
   │   ├── _footer.scss
   │   └── _grid.scss
   └── main.scss
   ```

2. **Limit nesting to 3-4 levels** to avoid specificity issues
3. **Use mixins for vendor prefixes** and repeated patterns
4. **Create meaningful variable names** that describe purpose, not value
5. **Document your code** with comments, especially for complex functions and mixins
6. **Be consistent** with your naming conventions and formatting

## Tools and Integration

- **Node-sass**: LibSass binding for Node.js
- **Dart Sass**: The primary implementation of Sass
- **Webpack**: Using sass-loader for integration
- **Gulp**: Using gulp-sass for compilation
- **VSCode Extensions**: Live Sass Compiler, Sass, etc.
- **Online Playground**: [SassMeister](https://www.sassmeister.com/)

## Resources

- [Official Sass Documentation](https://sass-lang.com/documentation)
- [Sass Guidelines](https://sass-guidelin.es/)
- [The Sass Way](http://thesassway.com/)
- [CSS-Tricks Guides on Sass](https://css-tricks.com/snippets/sass/)
