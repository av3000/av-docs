# Stylus

Stylus is a dynamic, expressive, and feature-rich CSS preprocessor built on Node.js. Created by TJ Holowaychuk (the creator of Express.js), Stylus offers perhaps the most flexible syntax of all preprocessors, allowing developers to write CSS with or without colons, semicolons, brackets, and even commas in some cases.

## Installation and Setup

### Using npm

```bash
# Global installation
npm install -g stylus

# Project installation
npm install --save-dev stylus
```

### Command Line Usage

```bash
# Basic compilation
stylus input.styl -o output.css

# Watch mode
stylus -w input.styl -o output.css

# Compile directory
stylus src/ -o dist/

# With compression
stylus input.styl -o output.css -c
```

### Build Tool Integration

#### Webpack

```bash
npm install --save-dev stylus stylus-loader
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
};
```

#### Gulp

```bash
npm install --save-dev gulp-stylus
```

```js
const gulp = require("gulp");
const stylus = require("gulp-stylus");

gulp.task("stylus", function () {
  return gulp
    .src("./src/stylus/**/*.styl")
    .pipe(
      stylus({
        compress: true,
      })
    )
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("watch", function () {
  gulp.watch("./src/stylus/**/*.styl", gulp.series("stylus"));
});
```

## Syntax Flexibility

One of Stylus's most distinctive features is its flexible, indentation-based syntax:

### Traditional CSS-like Syntax

```stylus
body {
  font: 14px/1.5 Arial, sans-serif;
  color: #333;
}
```

### Optional Braces

```stylus
body
  font: 14px/1.5 Arial, sans-serif
  color: #333
```

### Optional Colons and Semicolons

```stylus
body
  font 14px/1.5 Arial, sans-serif
  color #333
```

You can mix and match these styles based on your preference.

## Key Features

### Variables

Variables are defined without any special character:

```stylus
// Variable definition
primary-color = #3498db
font-stack = Arial, sans-serif
base-size = 16px

// Usage
body
  font-family font-stack
  font-size base-size
  color primary-color
```

### Nesting

Like other preprocessors, Stylus supports selector nesting:

```stylus
nav
  background-color #f8f8f8

  ul
    margin 0
    padding 0
    list-style none

    li
      display inline-block

      a
        display block
        padding 10px 15px
        color primary-color

        &:hover
          text-decoration underline
```

### Mixins

Stylus has a simple, flexible mixin syntax:

```stylus
// Mixin definition
border-radius(radius = 5px)
  -webkit-border-radius radius
  -moz-border-radius radius
  border-radius radius

// Usage
.button
  border-radius(3px)
  background-color primary-color
```

### Functions

Functions in Stylus are similar to mixins, but return a value:

```stylus
// Function definition
subtract(a, b)
  a - b

// Usage
margin-top subtract(20px, 10px)  // Results in margin-top: 10px
```

### Built-in Functions

Stylus includes many built-in functions for color manipulation, math, and more:

```stylus
primary = #3498db
secondary = lighten(primary, 20%)
tertiary = darken(primary, 20%)
complement = invert(primary)

.button
  background-color primary

  &:hover
    background-color lighten(primary, 10%)
```

### Interpolation

Embed expressions in selectors, properties, and values:

```stylus
prefix = 'col'
num = 12

.{prefix}-{num}
  width percentage(num / 12)
```

Compiles to:

```css
.col-12 {
  width: 100%;
}
```

### Parent Reference

The `&` character references the parent selector:

```stylus
.button
  background-color primary-color

  &.active
    font-weight bold

  &--primary
    background-color primary-color

  &--secondary
    background-color secondary-color
```

### Iteration

Stylus supports powerful iteration features:

```stylus
// Generate grid classes
for i in (1..12)
  .col-{i}
    width (i/12 * 100)%
```

### Conditionals

Use if/else statements to apply styles conditionally:

```stylus
apply-theme(dark = false)
  if dark
    background-color #222
    color #f5f5f5
  else
    background-color #f5f5f5
    color #222

.dark-theme
  apply-theme(true)

.light-theme
  apply-theme(false)
```

### Importing

Split your code across multiple files:

```stylus
// variables.styl
primary-color = #3498db

// main.styl
@import 'variables'

body
  color primary-color
```

## Advanced Features

### Property Lookup

Reference previously defined properties:

```stylus
.element
  width 300px
  margin-left -(width / 2)
```

### Rest Parameters

Collect arguments into a single variable:

```stylus
box-shadow(args...)
  -webkit-box-shadow args
  -moz-box-shadow args
  box-shadow args

.card
  box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
```

### Hashes (Objects)

```stylus
themes = {
  dark: {
    bg: #222,
    text: #f5f5f5
  },
  light: {
    bg: #f5f5f5,
    text: #222
  }
}

.dark-theme
  background-color themes.dark.bg
  color themes.dark.text
```

### Block Mixins

Pass a block of styles to a mixin:

```stylus
mobile()
  @media (max-width: 480px)
    {block}

.header
  height 80px

  +mobile()
    height 50px
```

### Built-in transparent functions

Stylus has built-in functions that simply return the expression passed:

```stylus
add(a, b)
  a + b

width add(10px, 5px)  // width: 15px
```

## Project Structure

A typical Stylus project might be organized as:

```
stylus/
├── base/
│   ├── reset.styl
│   └── typography.styl
├── components/
│   ├── buttons.styl
│   ├── forms.styl
│   └── cards.styl
├── layout/
│   ├── grid.styl
│   ├── header.styl
│   └── footer.styl
├── utils/
│   ├── variables.styl
│   ├── mixins.styl
│   └── functions.styl
└── main.styl
```

The main.styl file would import all others:

```stylus
// Utils
@import 'utils/variables'
@import 'utils/mixins'
@import 'utils/functions'

// Base
@import 'base/reset'
@import 'base/typography'

// Layout
@import 'layout/grid'
@import 'layout/header'
@import 'layout/footer'

// Components
@import 'components/buttons'
@import 'components/forms'
@import 'components/cards'
```

## Best Practices

### 1. Be Consistent with Syntax

Pick a style (with or without braces, colons, etc.) and stick to it throughout your project.

### 2. Create a Style Guide

Document your approach to variables, mixins, and organization.

### 3. Use Meaningful Variable Names

```stylus
// Good
primary-color = #3498db
heading-font-size = 24px

// Avoid
color1 = #3498db
size1 = 24px
```

### 4. Avoid Deep Nesting

Limit nesting to 3-4 levels to prevent specificity issues.

### 5. Document Mixins and Functions

```stylus
/**
 * Creates a flexbox container with optional properties
 * @param {string} direction - flex-direction
 * @param {string} justify - justify-content
 * @param {string} align - align-items
 */
flex-container(direction = row, justify = flex-start, align = stretch)
  display flex
  flex-direction direction
  justify-content justify
  align-items align
```

### 6. Create a Design System

Use variables to define consistent values:

```stylus
// Colors
colors = {
  primary: #3498db,
  secondary: #2ecc71,
  tertiary: #e74c3c,
  text: {
    dark: #333,
    light: #f5f5f5
  }
}

// Spacing
spacing = {
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px
}

// Usage
.button
  background-color colors.primary
  padding spacing.sm spacing.md
  color colors.text.light
```

## Tools and Extensions

### Editor Support

- **VSCode**: [Language Stylus](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus)
- **Sublime Text**: [Stylus Package](https://packagecontrol.io/packages/Stylus)
- **Atom**: [Stylus language support](https://atom.io/packages/language-stylus)

### Plugins

- **[Autoprefixer-Stylus](https://github.com/jescalan/autoprefixer-stylus)**: Add vendor prefixes automatically
- **[Rupture](https://github.com/jescalan/rupture)**: Simple media query mixins
- **[Nib](https://github.com/stylus/nib)**: Useful mixins and utilities

## Stylus vs. Other Preprocessors

| Feature          | Stylus                              | SCSS                           | LESS                           |
| ---------------- | ----------------------------------- | ------------------------------ | ------------------------------ |
| **Syntax**       | Optional braces, colons, semicolons | CSS-like, requires punctuation | CSS-like, requires punctuation |
| **Variables**    | `name = value`                      | `$name: value;`                | `@name: value;`                |
| **Mixins**       | `name()`                            | `@mixin name() { }`            | `.name() { }`                  |
| **Nesting**      | Indentation-based                   | Requires braces                | Requires braces                |
| **Imports**      | `@import 'file'`                    | `@import 'file';`              | `@import 'file';`              |
| **Loops**        | `for in`                            | `@for`, `@each`                | Recursive mixins               |
| **Conditionals** | `if/else`                           | `@if/@else`                    | Guards                         |
| **Language**     | Node.js                             | Ruby/Dart                      | JavaScript                     |

## Resources

- [Official Stylus Documentation](https://stylus-lang.com/)
- [Stylus GitHub Repository](https://github.com/stylus/stylus)
- [The Little Book on Stylus](https://learnboost.github.io/stylus/)
- [Stylus Playground](https://stylus-lang.com/try.html)
- [CSS to Stylus Converter](https://css2stylus.com/)
- [Nib - Stylus Library](https://github.com/stylus/nib)
- [Kouto Swiss - Stylus Toolkit](https://kouto-swiss.io/)
- [Rupture - Media Queries for Stylus](https://jescalan.github.io/rupture/)
