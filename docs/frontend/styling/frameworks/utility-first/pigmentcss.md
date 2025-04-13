# PigmentCSS

PigmentCSS is a modern, utility-first CSS framework that focuses on providing a lightweight yet comprehensive set of utilities with a focus on performance and developer experience. It offers a balanced approach between customization and convention, making it suitable for both rapid prototyping and production applications.

## Core Features

### Lightweight and Fast

PigmentCSS is designed to be minimal yet complete:

- Core file size is under 10KB (gzipped)
- No dependencies
- Fast build times with on-demand compilation

### Intuitive Naming Convention

PigmentCSS uses a consistent and intuitive naming system that is easy to remember:

```html
<div
  class="flex justify-center items-center p-4 bg-blue-500 text-white rounded"
>
  Centered content with blue background and white text
</div>
```

### Responsive Design

Built with a mobile-first approach using intuitive breakpoint prefixes:

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile, half on tablet, third on desktop -->
</div>
```

Default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Theming System

PigmentCSS includes a flexible theming system:

```html
<div class="bg-primary text-on-primary p-4">
  Themed component using primary color
</div>
```

### Dark Mode Support

Easy toggling between light and dark modes:

```html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content that adapts to dark mode
</div>
```

## Installation and Setup

### Basic Installation

```bash
# Using npm
npm install pigmentcss

# Using yarn
yarn add pigmentcss

# Using pnpm
pnpm add pigmentcss
```

### CDN Usage

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/pigmentcss/dist/pigment.min.css"
/>
```

### Configuration

Create a `pigment.config.js` file in your project root:

```js
// pigment.config.js
module.exports = {
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
      accent: "#f59e0b",
    },
    extend: {
      spacing: {
        128: "32rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
};
```

### Integration with Build Tools

#### Webpack

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("pigmentcss/postcss")],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### Vite

```js
// vite.config.js
import { defineConfig } from "vite";
import pigment from "pigmentcss/vite";

export default defineConfig({
  plugins: [pigment()],
});
```

## Core Utilities

### Layout

```html
<div class="container mx-auto px-4">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/2">Left column</div>
    <div class="w-full md:w-1/2">Right column</div>
  </div>
</div>
```

### Typography

```html
<h1 class="text-2xl font-bold text-gray-900">Large Heading</h1>
<p class="text-base leading-relaxed text-gray-600">
  Paragraph with optimal reading line height.
</p>
```

### Spacing

```html
<div class="p-4 m-2">
  <div class="mb-6">Item with margin-bottom</div>
  <div class="space-y-4">
    <div>Item with space below</div>
    <div>Item with space around</div>
  </div>
</div>
```

### Flexbox

```html
<div class="flex justify-between items-center">
  <div>Left aligned</div>
  <div>Right aligned</div>
</div>
```

### Grid

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Colors & Backgrounds

```html
<div class="bg-blue-500 text-white p-4">Blue background with white text</div>
<div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
  Gradient background
</div>
```

## Advanced Features

### State Variants

Apply styles based on element states:

```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 active:bg-blue-800">
  Interactive Button
</button>
```

### Component Extraction

Use the `@apply` directive to extract utility patterns:

```css
.btn {
  @apply px-4 py-2 rounded font-medium focus:outline-none;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}
```

### Shorthand Notations

PigmentCSS offers useful shorthands for common patterns:

```html
<!-- Margin and padding shorthands -->
<div class="m-4">All sides margin</div>
<div class="mx-4">Horizontal margin</div>
<div class="my-4">Vertical margin</div>
<div class="mt-4">Top margin</div>

<!-- Border shorthands -->
<div class="border border-blue-500">All sides border</div>
<div class="border-t border-blue-500">Top border</div>
```

### Custom Utilities

Extend PigmentCSS with your own utilities:

```js
// pigment.config.js
module.exports = {
  theme: {
    // theme config
  },
  utilities: {
    ".text-shadow": {
      "text-shadow": "2px 2px 4px rgba(0,0,0,0.5)",
    },
    ".custom-scrollbar": {
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: "4px",
      },
    },
  },
};
```

## Responsive Design

PigmentCSS uses a mobile-first approach with intuitive breakpoint prefixes:

```html
<!-- Base styles (mobile) -->
<div class="block">
  <!-- Block on mobile -->
</div>

<!-- Tablet and up -->
<div class="hidden md:block">
  <!-- Hidden on mobile, block on tablet and up -->
</div>

<!-- Responsive layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
</div>
```

## PigmentCSS vs. Other Frameworks

### PigmentCSS vs. Tailwind CSS

| Feature             | PigmentCSS      | Tailwind CSS   |
| ------------------- | --------------- | -------------- |
| **File Size**       | Smaller (~10KB) | Larger (~44KB) |
| **Learning Curve**  | Moderate        | Moderate       |
| **Customization**   | Good            | Excellent      |
| **Community Size**  | Smaller         | Much larger    |
| **Documentation**   | Good            | Excellent      |
| **Build Process**   | Optional        | Required       |
| **Browser Support** | Modern browsers | Configurable   |

### PigmentCSS vs. UnoCSS

| Feature            | PigmentCSS         | UnoCSS              |
| ------------------ | ------------------ | ------------------- |
| **Type**           | Framework          | Engine              |
| **Approach**       | Balanced utilities | Custom rules engine |
| **Performance**    | Fast               | Fastest             |
| **Customization**  | Config-based       | Rule-based          |
| **Learning Curve** | Moderate           | Steeper             |
| **Preset System**  | Limited            | Extensive           |

## When to Use PigmentCSS

PigmentCSS might be a good choice when:

1. **You need a lightweight solution**: The small file size makes it suitable for performance-critical applications
2. **You prefer convention over configuration**: PigmentCSS offers sensible defaults that work well without extensive customization
3. **You're building a small to medium project**: It provides enough utilities for most common use cases
4. **CDN usage is important**: Works well without a build step
5. **You want a balanced approach**: Not as verbose as Tailwind, but more comprehensive than minimal frameworks

## Best Practices

### Organization

Group related utilities for better readability:

```html
<div
  class="
  /* Layout */
  flex justify-between items-center
  /* Spacing */
  p-4 gap-2
  /* Visual */
  bg-white rounded shadow
"
>
  <!-- Content -->
</div>
```

### Component Extraction

Extract repeated patterns into components or CSS classes:

```css
/* For repeated patterns */
.card {
  @apply bg-white rounded shadow p-4;
}
```

```jsx
// React component
function Button({ primary, children }) {
  return (
    <button
      className={`
        px-4 py-2 rounded font-medium
        ${primary ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
      `}
    >
      {children}
    </button>
  );
}
```

### Performance Considerations

For optimal performance:

1. Minimize unused utilities (if not using the build process)
2. Consider extracting commonly used combinations
3. Use responsive utilities judiciously

### Responsive Design Strategy

1. Start with mobile layout
2. Add tablet styles with `md:` prefix
3. Add desktop styles with `lg:` prefix
4. Add extra-large screen styles with `xl:` prefix

## Common Patterns

### Card Component

```html
<div class="bg-white rounded shadow p-4">
  <h3 class="text-lg font-medium mb-2">Card Title</h3>
  <p class="text-gray-600 mb-4">
    Card content goes here with additional information.
  </p>
  <div class="flex justify-end">
    <button class="px-4 py-2 bg-blue-500 text-white rounded">Action</button>
  </div>
</div>
```

### Form Controls

```html
<div class="mb-4">
  <label class="block text-gray-700 mb-2" for="email">Email</label>
  <input
    id="email"
    type="email"
    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
  />
</div>
```

### Navigation Bar

```html
<nav class="bg-white shadow px-6 py-4">
  <div class="flex justify-between items-center">
    <div class="text-xl font-bold">Logo</div>
    <div class="hidden md:flex space-x-4">
      <a href="#" class="hover:text-blue-500">Home</a>
      <a href="#" class="hover:text-blue-500">About</a>
      <a href="#" class="hover:text-blue-500">Services</a>
      <a href="#" class="hover:text-blue-500">Contact</a>
    </div>
    <div class="md:hidden">
      <button class="focus:outline-none">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5h14v2H3V5zm0 6h14v2H3v-2zm0 6h14v2H3v-2z"></path>
        </svg>
      </button>
    </div>
  </div>
</nav>
```

## Resources

- [PigmentCSS Official Website](https://pigmentcss.org/)
- [PigmentCSS Documentation](https://docs.pigmentcss.org/)
- [PigmentCSS GitHub Repository](https://github.com/pigmentcss/pigmentcss)
- [PigmentCSS Discord Community](https://discord.gg/pigmentcss)
- [PigmentCSS vs. Tailwind CSS](https://blog.pigmentcss.org/comparison-tailwind)
- [Getting Started with PigmentCSS](https://blog.pigmentcss.org/getting-started)
- [PigmentCSS Playground](https://play.pigmentcss.org/)
- [PigmentCSS Components](https://components.pigmentcss.org/)
