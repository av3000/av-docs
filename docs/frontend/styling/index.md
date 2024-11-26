---
sidebar_label: "Intro"
sidebar_position: 1
---

# Styling

In modern web development, creating scalable and modular CSS is essential for maintaining large codebases and ensuring that styles are manageable, reusable, and maintainable. This involves adopting methodologies and using tools that promote organized and efficient CSS code.

This guide will cover:

- Approaches to scalable and modular CSS
- CSS preprocessors: SCSS and LESS
- Best practices and concepts
- Example repositories demonstrating best practices

---

## Good reads for real-world examples:

[https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/](https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/)

## **Approaches to Scalable and Modular CSS**

### **1. BEM (Block, Element, Modifier)**

**Concept:**

BEM is a naming convention that aims to make CSS classes more informative and readable. It stands for **Block**, **Element**, **Modifier**.

- **Block**: A standalone component that is meaningful on its own (e.g., `header`, `menu`, `button`).
- **Element**: A part of a block that has no standalone meaning and is semantically tied to its block (e.g., `menu item`, `list item`).
- **Modifier**: A flag on a block or element that changes its appearance or behavior (e.g., `disabled`, `highlighted`).

**Syntax:**

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

**Example:**

```css
.button {
}
.button--primary {
}
.button__icon {
}
.button__icon--small {
}
```

**Benefits:**

- **Predictability**: Class names clearly indicate where a style applies.
- **Reusability**: Encourages the creation of reusable components.
- **Scalability**: Easy to scale styles in large projects.

**Use Case:**

In a project with multiple developers, BEM helps maintain a consistent naming convention, reducing the likelihood of class name collisions and making the codebase easier to navigate.

---

### **2. OOCSS (Object-Oriented CSS)**

**Concept:**

OOCSS promotes writing CSS with reusable "objects" or patterns, focusing on separating structure and skin (visual appearance).

**Principles:**

1. **Separate Structure and Skin**: Divide your styles into structural styles (layout) and skin styles (colors, fonts).
2. **Separate Containers and Content**: Ensure that containers don't depend on the content inside them.

**Example:**

```css
/* Structure */
.media-object {
  display: flex;
  align-items: center;
}

/* Skin */
.media-image {
  width: 50px;
  height: 50px;
}

.media-content {
  margin-left: 10px;
}
```

**Benefits:**

- **Reusability**: Encourages the use of generic classes that can be reused across components.
- **Efficiency**: Reduces redundancy by sharing styles.

**Use Case:**

When building components like cards or media objects, OOCSS allows developers to apply consistent layout styles while customizing the visual aspects separately.

---

### **3. SMACSS (Scalable and Modular Architecture for CSS)**

**Concept:**

SMACSS is a style guide that provides a way to categorize CSS rules to make styles more manageable.

**Categories:**

1. **Base**: Default styles for HTML elements (e.g., `a`, `ul`, `h1`).
2. **Layout**: Styles for major layout components (e.g., header, footer, sidebar).
3. **Module**: Reusable components (e.g., buttons, forms).
4. **State**: Styles that represent different states (e.g., `.is-active`, `.is-hidden`).
5. **Theme**: Styles for theming purposes.

**Example:**

```css
/* Base */
h1 {
  font-size: 2em;
}

/* Layout */
.l-header {
}

/* Module */
.m-button {
}

/* State */
.is-active {
}

/* Theme */
.theme-dark {
}
```

**Benefits:**

- **Organization**: Clear categorization helps in maintaining and scaling CSS.
- **Modularity**: Encourages modular design, making components easier to update.

**Use Case:**

In a large application with multiple pages and components, SMACSS helps in organizing styles systematically, making it easier to locate and modify them.

---

### **4. ITCSS (Inverted Triangle CSS)**

**Concept:**

ITCSS is a CSS architecture that organizes styles in a specific order to manage specificity and dependencies.

**Layers (from low to high specificity):**

1. **Settings**: Global variables and configurations.
2. **Tools**: Mixins and functions.
3. **Generic**: Reset and normalize styles.
4. **Elements**: Styles for HTML elements.
5. **Objects**: Reusable non-cosmetic design patterns.
6. **Components**: Specific UI components.
7. **Utilities**: Helpers and utility classes.

**Example:**

```css
/* Settings */
$primary-color: #333;

/* Tools */
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Generic */
* {
  margin: 0;
  padding: 0;
}

/* Elements */
h1 {
  font-size: 2em;
}

/* Objects */
.o-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Components */
.c-button {
}

/* Utilities */
.u-text-center {
  text-align: center !important;
}
```

**Benefits:**

- **Manageability**: Organizes CSS from generic to specific.
- **Scalability**: Reduces specificity issues, making styles easier to override and extend.

**Use Case:**

ITCSS is useful in projects where CSS specificity becomes a challenge, ensuring that base styles don't interfere with component-specific styles.

---

### **5. Atomic CSS**

**Concept:**

Atomic CSS involves writing small, single-purpose classes that apply one style rule.

**Example:**

```css
.mt-10 {
  margin-top: 10px;
}
.text-center {
  text-align: center;
}
.bg-primary {
  background-color: #007bff;
}
```

**Benefits:**

- **Performance**: Smaller CSS files due to reusing classes.
- **Consistency**: Encourages consistent styling across components.
- **Maintainability**: Changes to a utility class affect all instances.

**Use Case:**

Atomic CSS is beneficial in projects where rapid development and consistency are required. Tools like Tailwind CSS are based on this approach.

---

### **6. CSS Modules**

**Concept:**

CSS Modules treat CSS files as modules where class names are scoped locally by default.

**Features:**

- **Local Scope**: Class names are hashed to ensure uniqueness.
- **No Global Namespace**: Reduces the risk of style conflicts.
- **Composition**: Allows composing classes from other classes.

**Example:**

```css
/* styles.module.css */
.button {
  background-color: blue;
  color: white;
}
```

```javascript
// Component.jsx
import styles from "./styles.module.css";

function Button() {
  return <button className={styles.button}>Click Me</button>;
}
```

**Benefits:**

- **Isolation**: Styles don't leak into other components.
- **Maintainability**: Easier to reason about styles within a component.

**Use Case:**

CSS Modules are commonly used in React projects to encapsulate styles at the component level, preventing unintended side effects.

---

## **CSS Preprocessors: SCSS and LESS**

CSS preprocessors extend the capabilities of CSS by adding features like variables, nesting, mixins, functions, and more. This helps in writing more maintainable and scalable CSS.

### **SCSS (Sassy CSS)**

**Concept:**

SCSS is a syntax for Sass (Syntactically Awesome Stylesheets) that is fully compatible with CSS syntax.

**Features:**

1. **Variables:**

   ```scss
   $primary-color: #333;

   body {
     color: $primary-color;
   }
   ```

2. **Nesting:**

   ```scss
   nav {
     ul {
       list-style: none;

       li {
         display: inline-block;

         a {
           text-decoration: none;
         }
       }
     }
   }
   ```

3. **Mixins:**

   ```scss
   @mixin flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }

   .container {
     @include flex-center;
   }
   ```

4. **Functions:**

   ```scss
   @function rem($pixels) {
     @return $pixels / 16px * 1rem;
   }

   .container {
     font-size: rem(18px);
   }
   ```

5. **Imports and Partials:**

   - Use `@import` to include SCSS files.
   - Partials are SCSS files prefixed with `_`, indicating they are meant to be imported.

   ```scss
   // _variables.scss
   $primary-color: #333;

   // styles.scss
   @import "variables";

   body {
     color: $primary-color;
   }
   ```

**Benefits:**

- **Modularity**: Breaks CSS into smaller, manageable files.
- **Reusability**: Mixins and functions promote code reuse.
- **Maintainability**: Variables and nesting make styles easier to manage.

---

### **LESS (Leaner Style Sheets)**

**Concept:**

LESS is another CSS preprocessor that offers similar features to SCSS but with some syntactical differences.

**Features:**

1. **Variables:**

   ```less
   @primary-color: #333;

   body {
     color: @primary-color;
   }
   ```

2. **Nesting:**

   ```less
   nav {
     ul {
       list-style: none;

       li {
         display: inline-block;

         a {
           text-decoration: none;
         }
       }
     }
   }
   ```

3. **Mixins:**

   ```less
   .flex-center() {
     display: flex;
     justify-content: center;
     align-items: center;
   }

   .container {
     .flex-center();
   }
   ```

4. **Functions and Operations:**

   ```less
   @base: 16px;

   .container {
     font-size: (@base * 1.125); // 18px
   }
   ```

5. **Imports:**

   - Use `@import` to include LESS files.

   ```less
   // variables.less
   @primary-color: #333;

   // styles.less
   @import "variables.less";

   body {
     color: @primary-color;
   }
   ```

**Benefits:**

- **Simplicity**: Easy to learn for those familiar with CSS.
- **Dynamic Behavior**: Allows for operations and functions within styles.

---

## **Best Practices and Concepts**

### **1. Organizing CSS with Preprocessors**

- **Use Partials and Imports**: Break styles into logical partials (e.g., `_variables.scss`, `_mixins.scss`, `_buttons.scss`).
- **Maintain a Consistent Structure**: Adopt a directory structure that aligns with your chosen methodology (e.g., base, components, layout).

**Example Structure:**

```
styles/
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _button.scss
│   └── _card.scss
├── layout/
│   ├── _header.scss
│   └── _footer.scss
├── utils/
│   ├── _variables.scss
│   └── _mixins.scss
└── main.scss
```

### **2. Naming Conventions**

- **Consistency is Key**: Stick to one naming convention throughout the project.
- **Avoid Deep Nesting**: Keep nesting to a maximum of three levels to prevent overly specific selectors.
- **Use Meaningful Class Names**: Names should reflect the purpose of the class.

### **3. Reusability and DRY (Don't Repeat Yourself)**

- **Use Mixins and Functions**: Encapsulate reusable styles and logic.
- **Leverage Variables**: Define common values like colors, font sizes, and spacing in variables.

### **4. Maintainability**

- **Comment Your Code**: Provide context where necessary, especially for complex styles.
- **Modularize Components**: Keep component styles self-contained.

### **5. Performance Optimization**

- **Minimize CSS File Size**: Use tools to minify CSS for production.
- **Avoid Unused CSS**: Remove styles that are not in use to reduce file size.

### **6. Tooling and Automation**

- **Use a Task Runner or Bundler**: Tools like Webpack, Gulp, or Grunt can automate compiling SCSS/LESS, autoprefixing, and minification.
- **Implement Linting**: Use stylelint to enforce consistent coding standards.

---

## **Example Repositories Demonstrating Best Practices**

### **1. [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)**

- **Description**: Airbnb's style guide for CSS and Sass, focusing on style, conventions, and best practices.
- **Highlights**:
  - Emphasizes consistent naming conventions.
  - Provides guidelines for organizing and structuring styles.

### **2. [Bootstrap](https://github.com/twbs/bootstrap)**

- **Description**: Popular CSS framework that utilizes Sass for its styles.
- **Highlights**:
  - Demonstrates effective use of variables, mixins, and functions.
  - Modular structure with components and utilities.

### **3. [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)**

- **Description**: A utility-first CSS framework that follows Atomic CSS principles.
- **Highlights**:
  - Shows how to implement utility classes effectively.
  - Customizable through configuration files.

### **4. [inuitcss](https://github.com/inuitcss/inuitcss)**

- **Description**: A scalable, Sass-based, OOCSS framework.
- **Highlights**:
  - Implements ITCSS architecture.
  - Focuses on a minimal and flexible codebase.

### **5. [CSS Modules Example with React](https://github.com/css-modules/webpack-demo)**

- **Description**: Demonstrates how to use CSS Modules in a React application with Webpack.
- **Highlights**:
  - Shows local scoping of CSS.
  - Illustrates composition of styles.

### **6. [Semantic UI](https://github.com/Semantic-Org/Semantic-UI)**

- **Description**: A UI framework that uses LESS for styling components.
- **Highlights**:
  - Well-organized structure.
  - Extensive use of variables and mixins for theming.

### **7. [Material Design Lite](https://github.com/google/material-design-lite)**

- **Description**: A library of components based on Material Design principles, using Sass.
- **Highlights**:
  - Modular components.
  - Shows best practices in component-based styling.

---

## **Conclusion**

Understanding and applying scalable and modular CSS approaches is crucial for developing maintainable and efficient web applications. By leveraging methodologies like BEM, OOCSS, and SMACSS, and utilizing preprocessors like SCSS and LESS, you can create a robust styling foundation for your projects.

**Remember to:**

- **Choose a Methodology**: Select a CSS architecture that suits your project's needs.
- **Utilize Preprocessors**: Take advantage of the powerful features offered by SCSS or LESS.
- **Follow Best Practices**: Consistency, organization, and modularity are key.
- **Learn from Examples**: Study well-established projects to see these principles in action.

By adhering to these principles and continuously refining your approach, you'll enhance the scalability and maintainability of your CSS, making it easier to manage as your project grows.

---

**Additional Resources:**

- **[CSS-Tricks - Sass Guidelines](https://css-tricks.com/sass-style-guide/):** A comprehensive guide on writing Sass.
- **[SMACSS Official Website](https://smacss.com/):** Detailed explanations and examples of SMACSS.
- **[Get BEM](http://getbem.com/):** A resource for understanding and implementing BEM.
- **[ITCSS Explanation](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/):** In-depth article on ITCSS principles.

These resources provide further insights and practical advice to help you master scalable and modular CSS, as well as preprocessors like SCSS and LESS.

---
