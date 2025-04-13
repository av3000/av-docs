# LESS (Leaner Style Sheets)

LESS is a dynamic preprocessor that extends CSS with programming features like variables, mixins, operations, and functions. Created by Alexis Sellier in 2009, LESS makes CSS more maintainable, themable, and extendable.

Unlike Sass, LESS is JavaScript-based, which means it can run both on the client-side (browser) and server-side (with Node.js).

## Installation and Setup

### Using npm

```bash
# Global installation
npm install -g less

# Project installation
npm install --save-dev less
```

### Command Line Usage

```bash
# Basic compilation
lessc styles.less styles.css

# With compression
lessc --compress styles.less styles.css
```

### Browser Usage

```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="https://cdn.jsdelivr.net/npm/less@4"></script>
```

⚠️ Note: Browser compilation should only be used for development, not production.

### Build Tool Integration

#### Webpack

```bash
npm install --save-dev less less-loader
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader", // Injects CSS into the DOM
          "css-loader", // Interprets @import, url() etc.
          "less-loader", // Compiles Less to CSS
        ],
      },
    ],
  },
};
```

#### Gulp

```bash
npm install --save-dev gulp-less
```

```js
const gulp = require("gulp");
const less = require("gulp-less");

gulp.task("less", function () {
  return gulp
    .src("./src/less/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("watch", function () {
  gulp.watch("./src/less/**/*.less", gulp.series("less"));
});
```

## Key Features

### Variables

Variables make it easy to reuse and update values:

```less
@primary-color: #3498db;
@base-font-size: 16px;
@base-spacing: 24px;

body {
  font-size: @base-font-size;
  color: @primary-color;
  padding: @base-spacing;
}
```

### Nesting

LESS allows you to nest selectors, following the DOM hierarchy:

```less
nav {
  background-color: #f8f8f8;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        display: block;
        padding: 10px 15px;
        color: @primary-color;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
```

The `&` character represents the parent selector.

### Mixins

Mixins allow you to reuse groups of properties:

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.button {
  .border-radius(4px);
  background-color: @primary-color;
  color: white;
}
```

#### Mixins with Default Parameters

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}

.card {
  .box-shadow(0, 2px, 5px, rgba(0, 0, 0, 0.1));
}
```

### Operations

LESS allows mathematical operations:

```less
@base-size: 16px;
@large-size: @base-size * 1.5;
@small-size: @base-size * 0.75;

.container {
  width: 100% / 3;
  padding: @base-size + 8px;
}
```

### Functions

LESS provides color manipulation and other utility functions:

```less
@base-color: #3498db;
@dark-color: darken(@base-color, 20%);
@light-color: lighten(@base-color, 20%);
@desaturated-color: desaturate(@base-color, 30%);

.button {
  background-color: @base-color;
  border-color: @dark-color;

  &:hover {
    background-color: @light-color;
  }
}
```

### Importing

Split your code into multiple files:

```less
// variables.less
@primary-color: #3498db;

// typography.less
@import "variables";

body {
  font-family: Arial, sans-serif;
  color: @primary-color;
}

// main.less
@import "variables";
@import "typography";

.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Parent Selectors

The `&` character allows for advanced combinations:

```less
.button {
  &-primary {
    background-color: @primary-color;
  }

  &-secondary {
    background-color: @secondary-color;
  }

  &.active {
    font-weight: bold;
  }
}
```

Compiles to:

```css
.button-primary {
  background-color: #3498db;
}
.button-secondary {
  background-color: #2ecc71;
}
.button.active {
  font-weight: bold;
}
```

## Advanced Features

### Guard Mixins (Conditional Mixins)

Create mixins that execute only when certain conditions are true:

```less
.generate-columns(@n, @i: 1) when (@i <= @n) {
  .col-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}

// Generate 12 columns
.generate-columns(12);
```

### Mixin Loops

Create loops with recursive mixins:

```less
.loop(@counter) when (@counter > 0) {
  .mt-@{counter} {
    margin-top: (@counter * 4px);
  }
  .loop(@counter - 1);
}

// Call the loop, starting at 10
.loop(10);
```

### Maps (Object-Like Variables)

LESS doesn't have true maps, but you can use objects:

```less
@theme: {
  primary: #3498db;
  secondary: #2ecc71;
  danger: #e74c3c;
};

.button-primary {
  background-color: @theme[primary];
}
```

### Escaping

Generate dynamic property names or values:

```less
@property: color;
@selector: button;

.@{selector} {
  @{property}: @primary-color;
}
```

## Project Structure

A typical LESS project structure might look like:

```
less/
├── variables/
│   ├── colors.less
│   ├── typography.less
│   └── spacing.less
├── mixins/
│   ├── border-radius.less
│   ├── box-shadow.less
│   └── gradients.less
├── components/
│   ├── buttons.less
│   ├── forms.less
│   └── cards.less
├── layout/
│   ├── grid.less
│   ├── header.less
│   └── footer.less
└── main.less
```

Main.less would import all files:

```less
// Variables
@import "variables/colors";
@import "variables/typography";
@import "variables/spacing";

// Mixins
@import "mixins/border-radius";
@import "mixins/box-shadow";
@import "mixins/gradients";

// Components
@import "components/buttons";
@import "components/forms";
@import "components/cards";

// Layout
@import "layout/grid";
@import "layout/header";
@import "layout/footer";
```

## Best Practices

### 1. Variable Naming Conventions

Use descriptive names that indicate purpose:

```less
// Good
@color-primary: #3498db;
@font-size-base: 16px;
@spacing-unit: 8px;

// Avoid
@blue: #3498db;
@size: 16px;
@space: 8px;
```

### 2. Minimize Nesting Depth

Limit nesting to avoid specificity issues:

```less
// Good: 3 levels max
.navbar {
  .nav-list {
    .nav-item {
      // styles
    }
  }
}

// Avoid: 4+ levels
.navbar {
  .nav-list {
    .nav-item {
      .nav-link {
        span {
          // styles
        }
      }
    }
  }
}
```

### 3. Create Modular Files

Split your code into logical files for better management.

### 4. Use Comments for Documentation

```less
// ==========================================================================
// Button Component
// ==========================================================================

// Primary button mixin
// Used for all primary action buttons
.button-primary() {
  background-color: @primary-color;
  color: white;
  // ...
}
```

### 5. Consistent Patterns

Be consistent with your patterns for mixins, variables, and organization.

## LESS vs. Other Preprocessors

### LESS vs. SCSS

| Feature                 | LESS              | SCSS              |
| ----------------------- | ----------------- | ----------------- |
| **Language Base**       | JavaScript        | Ruby/Dart         |
| **Syntax**              | CSS-like          | CSS-like          |
| **Variables**           | @variable         | $variable         |
| **Mixins**              | .mixin()          | @mixin/@include   |
| **Conditionals**        | Guards            | @if/@else         |
| **Loops**               | Recursive mixins  | @for/@each/@while |
| **Extending**           | :extend()         | @extend           |
| **Maps**                | Objects (limited) | Maps (robust)     |
| **Browser Compilation** | Yes               | No                |
| **Function Creation**   | Yes               | Yes               |
| **Namespaces**          | Yes               | Yes (with @use)   |

## Tools and Plugins

### Editor Integration

- **VS Code**: [Easy LESS](https://marketplace.visualstudio.com/items?itemName=mrcrowl.easy-less)
- **Sublime Text**: [LESS Syntax Highlighting](https://packagecontrol.io/packages/LESS)
- **WebStorm/PhpStorm**: Built-in support

### Linting

- **Stylelint**: [stylelint-less](https://github.com/ssivanatarajan/stylelint-less)

### Online Tools

- [LESS Playground](http://lesscss.org/less-preview/)
- [LESS to CSS Converter](https://jsonformatter.org/less-to-css)

## Debugging

LESS can generate source maps for easier debugging:

```bash
lessc --source-map styles.less styles.css
```

With webpack:

```js
{
  loader: 'less-loader',
  options: {
    sourceMap: true
  }
}
```

## Performance Considerations

- Avoid excessive nesting (increases CSS size)
- Be careful with recursive mixins (can generate a lot of CSS)
- Consider using file minification for production

## Migration from CSS

Converting from CSS to LESS is straightforward:

1. Rename `.css` files to `.less`
2. Set up a compilation process
3. Start extracting variables for colors, fonts, etc.
4. Implement nesting for related selectors
5. Create mixins for repeated patterns

## Common Use Cases

### Responsive Grid System

```less
// Variables
@columns: 12;
@gutter: 30px;
@container-width: 1200px;

// Mixins
.make-row() {
  display: flex;
  flex-wrap: wrap;
  margin-left: -(@gutter / 2);
  margin-right: -(@gutter / 2);
}

.make-col(@size) {
  flex: 0 0 percentage(@size / @columns);
  max-width: percentage(@size / @columns);
  padding-left: (@gutter / 2);
  padding-right: (@gutter / 2);
}

// Usage
.container {
  max-width: @container-width;
  margin: 0 auto;
}

.row {
  .make-row();
}

.generate-columns(@n, @i: 1) when (@i <= @n) {
  .col-@{i} {
    .make-col(@i);
  }
  .generate-columns(@n, (@i + 1));
}

.generate-columns(@columns);
```

### Theme System

```less
// theme-variables.less
@theme-dark: {
  background: #222;
  text: #f5f5f5;
  primary: #61dafb;
  secondary: #bb86fc;
};

@theme-light: {
  background: #f5f5f5;
  text: #222;
  primary: #0066cc;
  secondary: #6200ee;
};

// Apply theme based on parameter
.apply-theme(@theme) {
  background-color: @theme[background];
  color: @theme[text];

  .button-primary {
    background-color: @theme[primary];
  }

  .button-secondary {
    background-color: @theme[secondary];
  }
}

// Usage
body.dark-mode {
  .apply-theme(@theme-dark);
}

body.light-mode {
  .apply-theme(@theme-light);
}
```

### Media Query Management

```less
@breakpoints: {
  sm: 576px;
  md: 768px;
  lg: 992px;
  xl: 1200px;
};

.media-up(@size) {
  @width: @breakpoints[@size];
  @media (min-width: @width) {
    @content();
  }
}

// Usage
.element {
  width: 100%;

  .media-up(md, {
    width: 50%;
  });

  .media-up(lg, {
    width: 33.333%;
  });
}
```

## Troubleshooting

### Common Errors

1. **Variable not defined**:

   ```
   NameError: variable @color is undefined
   ```

   Solution: Check variable scope or import the file where it's defined.

2. **Syntax errors with operations**:

   ```
   ParseError: Calculation needs parens
   ```

   Solution: Use parentheses for complex calculations: `(@base + 5px) * 2`

3. **Browser compilation issues**:
   Solution: Make sure LESS.js is loaded after your LESS stylesheets.

4. **Recursive mixin causes Maximum call stack size exceeded**:
   Solution: Add a condition to stop the recursion.

## Resources

- [Official LESS Documentation](https://lesscss.org/features/)
- [LESS GitHub Repository](https://github.com/less/less.js)
- [LESS in 10 Minutes Tutorial](http://lesscss.org/tutorials/)
- [CSS to LESS Converter](https://css2less.cc/)
- [LESS Elements (Mixins library)](https://github.com/dmitryf/elements)
- [LESS Hat (Advanced Mixins)](https://github.com/madebysource/lesshat)
- [LESS vs Sass Comparison](https://css-tricks.com/sass-vs-less/)
- [Stack Overflow LESS Tag](https://stackoverflow.com/questions/tagged/less)
