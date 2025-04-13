# CSS Modules

CSS Modules is a methodology that allows you to write CSS that is scoped locally by default, eliminating the global nature of traditional CSS and the resulting naming conflicts. It works by automatically generating unique class names when you compile your code, ensuring styles don't leak or conflict.

## Core Concepts

### Local Scoping

CSS Modules transforms class names into unique identifiers:

```css
/* button.module.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
}

.primary {
  background-color: #0066cc;
}
```

When used in JavaScript:

```jsx
import styles from "./button.module.css";

function Button({ primary, children }) {
  return (
    <button className={`${styles.button} ${primary ? styles.primary : ""}`}>
      {children}
    </button>
  );
}
```

Compiles to something like:

```html
<button class="button_button_1VrBM button_primary_2Dsa7">Click Me</button>
```

The actual CSS becomes:

```css
.button_button_1VrBM {
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
}

.button_primary_2Dsa7 {
  background-color: #0066cc;
}
```

### Composition

CSS Modules allows composition of classes using the `composes` keyword:

```css
/* typography.module.css */
.headline {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 24px;
}

/* card.module.css */
.title {
  composes: headline from "./typography.module.css";
  color: #333;
}
```

This generates HTML with multiple classes:

```html
<h2 class="card_title_xJk92 typography_headline_8svFG">Card Title</h2>
```

### Global Exceptions

You can explicitly mark selectors as global when needed:

```css
:global(.global-class) {
  background-color: red;
}

.localClass :global(.nested-global) {
  color: green;
}
```

## SCSS Modules

SCSS Modules combines the power of SCSS preprocessing with CSS Modules scoping:

```scss
/* button.module.scss */
$primary-color: #0066cc;
$border-radius: 4px;

.button {
  padding: 10px 15px;
  border-radius: $border-radius;
  font-weight: bold;

  &.primary {
    background-color: $primary-color;
    color: white;
  }

  &.secondary {
    background-color: transparent;
    color: $primary-color;
    border: 1px solid $primary-color;
  }

  &:hover {
    opacity: 0.9;
  }
}

.icon {
  margin-right: 8px;
}
```

Usage with React:

```jsx
import styles from "./button.module.scss";
import { Icon } from "./Icon";

function Button({ variant = "primary", icon, children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
      {children}
    </button>
  );
}
```

## Integration with Build Tools

### Webpack

CSS Modules is commonly used with webpack via loaders:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
```

### Create React App

Create React App has built-in support for CSS Modules:

```jsx
// Just name your CSS files with the .module.css or .module.scss extension
import styles from "./Button.module.css";
```

### Next.js

Next.js supports CSS Modules out of the box:

```jsx
// Import CSS Modules with .module.css or .module.scss extension
import styles from "./Button.module.css";
```

### Vite

Vite has built-in support for CSS Modules:

```jsx
// Files ending with .module.css or .module.scss are treated as CSS modules
import styles from "./Button.module.css";
```

## Naming Conventions

### File Naming

```
ComponentName.module.css
ComponentName.module.scss
```

### Class Naming

Since CSS Modules handles scoping, you can use simple, descriptive class names:

```css
/* Good: Simple and descriptive */
.button {
}
.primary {
}
.wrapper {
}
.title {
}

/* Avoid BEM-style naming (unnecessary with CSS Modules) */
.button__icon--large {
}
```

## Benefits of CSS Modules

### 1. Eliminates Global Namespace Collisions

With locally scoped class names, you don't need to worry about naming conflicts.

### 2. Explicit Dependencies

Importing styles makes dependencies clear and traceable:

```jsx
import styles from "./Card.module.css";
```

### 3. No More Naming Conventions

You can use simple, semantic class names without worrying about collisions:

```css
.title {
} /* Instead of .card__title or .card-title */
.button {
} /* Instead of .c-button or .btn-primary */
```

### 4. Dead Code Elimination

Unused CSS can be detected and eliminated more easily since imports create explicit dependencies.

### 5. Easier Refactoring

You can safely rename classes within a module without affecting other components.

## CSS Modules with Different Frontend Frameworks

### React

```jsx
import styles from "./Button.module.css";

function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}
```

### Vue

```vue
<template>
  <button :class="$style.button">
    <slot></slot>
  </button>
</template>

<style module>
.button {
  background-color: blue;
  color: white;
}
</style>
```

### Angular

Angular uses a different approach with encapsulated styles by default:

```typescript
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // Default
})
```

### Svelte

Svelte automatically scopes component styles:

```svelte
<button class="button">
  <slot></slot>
</button>

<style>
  .button {
    background-color: blue;
    color: white;
  }
</style>
```

## Advanced Techniques

### TypeScript Integration

Type-safe CSS Modules with TypeScript:

```typescript
// button.module.css.d.ts
declare const styles: {
  readonly button: string;
  readonly primary: string;
  readonly secondary: string;
  readonly icon: string;
};

export default styles;
```

### Dynamic Class Names

Conditionally apply classes:

```jsx
import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

function Button({ primary, disabled, className, children }) {
  return (
    <button
      className={cx(
        "button",
        {
          primary,
          disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
}
```

### CSS Modules with CSS Variables

```css
/* variables.css (global) */
:root {
  --primary-color: #0066cc;
  --border-radius: 4px;
}

/* button.module.css */
.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
```

## Limitations and Considerations

### Learning Curve

Teams need to understand the new mental model and build tool configuration.

### Build Tool Requirement

CSS Modules requires a build step and cannot be used with plain HTML/CSS.

### Debugging

Generated class names can make debugging slightly more challenging, though most tools add helpful comments.

### Dynamic Styles

Some dynamic styling techniques can be more complex with CSS Modules.

## Best Practices

1. **One component per file**: Keep styles focused on a single component
2. **Consistent naming**: Use clear, descriptive class names
3. **Avoid global selectors**: Minimize use of `:global` except when necessary
4. **Use composition**: Leverage `composes` for reusable styles
5. **Keep modules small**: Aim for focused, maintainable CSS files
6. **Add comments**: Document complex styles or compositions
7. **Avoid nested selectors**: Keep styles flat when possible
8. **Use CSS Variables**: For theming and consistent values

## CSS Modules vs. Other Methodologies

| Methodology     | Scoping            | Build Tools | HTML Classes | Learning Curve |
| --------------- | ------------------ | ----------- | ------------ | -------------- |
| **CSS Modules** | Automated          | Required    | Simple       | Medium         |
| **BEM**         | Manual             | Optional    | Verbose      | Medium         |
| **OOCSS**       | Manual             | Optional    | Multiple     | Medium         |
| **Atomic CSS**  | None (intentional) | Optional    | Very verbose | Medium         |
| **CSS-in-JS**   | Automated          | Required    | Generated    | High           |

## Resources

- [CSS Modules GitHub Repository](https://github.com/css-modules/css-modules)
- [CSS Modules: Welcome to the Future](https://glenmaddern.com/articles/css-modules)
- [CSS Modules Webpack Demo](https://github.com/css-modules/webpack-demo)
- [Understanding CSS Modules - LogRocket](https://blog.logrocket.com/understanding-css-modules-methodology/)
- [CSS Modules with React and TypeScript](https://www.typescriptlang.org/docs/handbook/react.html#stateful-components)
- [CSS Modules - Create React App Documentation](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
- [CSS Modules and SCSS by CSS-Tricks](https://css-tricks.com/css-modules-part-1-need/)
