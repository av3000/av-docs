# Windi CSS

Windi CSS is a next-generation utility-first CSS framework that was created as an alternative to Tailwind CSS. Developed by Voorjaar in 2020, it pioneered on-demand utility generation, which was later adopted by Tailwind's JIT (Just-in-Time) compiler. While Windi CSS is no longer under active development (as of 2023), it introduced several innovative features that influenced the utility CSS ecosystem.

## Core Features

### On-Demand Engine

Unlike the original Tailwind CSS approach of generating all possible utility classes then purging unused ones, Windi CSS only generates the classes you actually use:

```html
<div class="p-4 bg-white rounded-xl shadow-md">
  <!-- Only these specific utilities are generated -->
</div>
```

Benefits:

- Faster development build times
- No configuration for purging
- No need for PurgeCSS
- Smaller CSS output

### Attributify Mode

Windi CSS introduced a unique syntax that groups utilities by property using HTML attributes:

```html
<!-- Traditional utility classes -->
<button
  class="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
>
  Button
</button>

<!-- Attributify mode -->
<button
  bg="blue-400 hover:blue-500"
  text="white"
  font="medium"
  p="y-2 x-4"
  rounded
>
  Button
</button>
```

Benefits:

- Better organization of utilities
- Cleaner HTML
- Easier to read and maintain
- Reduced class string length

### Variant Groups

Allows you to apply the same variant to multiple utilities by grouping them:

```html
<!-- Traditional approach -->
<div class="hover:bg-blue-500 hover:text-white hover:font-bold">
  <!-- Content -->
</div>

<!-- With variant groups -->
<div class="hover:(bg-blue-500 text-white font-bold)">
  <!-- Content -->
</div>
```

Benefits:

- Reduced repetition
- More maintainable code
- Cleaner HTML

### Auto-inferred Values

Windi CSS allows arbitrary values without the need for square brackets:

```html
<!-- Using numeric values -->
<div class="p-4.5"><!-- Padding: 1.125rem --></div>

<!-- Using calculated values -->
<div class="p-[calc(100%-10px)]"><!-- Calculated padding --></div>

<!-- Using CSS variables -->
<div class="p-[var(--spacing)]"><!-- Dynamic padding --></div>
```

### Responsive Design

Similar to Tailwind, Windi CSS uses breakpoint prefixes for responsive design:

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile, half on medium, third on large -->
</div>
```

Default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Installation and Setup

### Using npm/yarn

```bash
# Using npm
npm i -D windicss windicss-webpack-plugin

# Using yarn
yarn add -D windicss windicss-webpack-plugin
```

### Framework Integrations

#### Vue/Vite

```bash
npm i -D vite-plugin-windicss
```

```js
// vite.config.js
import WindiCSS from "vite-plugin-windicss";

export default {
  plugins: [WindiCSS()],
};
```

```js
// main.js
import "virtual:windi.css";
// If you want to support dark mode
import "virtual:windi-devtools";
```

#### Next.js

```bash
npm i -D windicss-webpack-plugin
```

```js
// next.config.js
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

module.exports = {
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
};
```

#### Webpack

```js
// webpack.config.js
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

module.exports = {
  plugins: [
    new WindiCSSWebpackPlugin({
      scan: {
        dirs: ["./src"],
        fileExtensions: ["html", "js", "ts", "jsx", "tsx", "vue"],
      },
    }),
  ],
};
```

### Configuration

Create a `windi.config.js` or `windi.config.ts` file in your project root:

```js
import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class", // or 'media'
  attributify: true, // Enable attributify mode
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500],
        secondary: colors.pink[500],
      },
    },
  },
  plugins: [
    require("windicss/plugin/typography"),
    require("windicss/plugin/forms"),
  ],
});
```

## Core Utilities

Windi CSS provides a similar set of utilities to Tailwind CSS:

### Layout

```html
<div class="container mx-auto p-4">
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">Column 1</div>
    <div class="flex-1">Column 2</div>
  </div>
</div>
```

### Typography

```html
<h1 class="text-2xl font-bold text-gray-900">Heading</h1>
<p class="text-base leading-relaxed text-gray-600">
  Paragraph with relaxed line height.
</p>
```

### Backgrounds and Colors

```html
<div class="bg-blue-500 text-white p-4">Blue background with white text</div>
<div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
  Gradient background
</div>
```

### Borders and Shadows

```html
<div class="border border-gray-200 rounded-lg shadow-md p-4">
  Card with border and shadow
</div>
```

### Transitions and Animations

```html
<button class="transition duration-300 ease-in-out transform hover:scale-105">
  Hover to scale
</button>
```

## Unique Features

### Shortcuts (Custom Utilities)

Define custom combinations of utilities:

```js
// windi.config.js
export default {
  shortcuts: {
    btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
    "btn-green": "text-white bg-green-500 hover:bg-green-700",
    card: "bg-white rounded-lg shadow-md p-4 m-4",
  },
};
```

Usage:

```html
<button class="btn btn-green">Button</button>
<div class="card">Card content</div>
```

### Applying Directives

Similar to Tailwind's `@apply`, but with extended functionality:

```css
.btn {
  @apply py-2 px-4 font-semibold rounded-lg shadow-md;
}

/* With variants */
.btn-blue {
  @apply text-white bg-blue-500 hover:bg-blue-700;
}

/* With responsive variants */
.responsive-element {
  @apply text-sm md:text-base lg:text-lg;
}
```

### Dynamic Utilities

Generate utilities with variables:

```html
<!-- Width with percentage -->
<div class="w-[75%]">75% width</div>

<!-- Padding with calculation -->
<div class="p-[calc(1rem+10px)]">Dynamic padding</div>

<!-- Height with viewport units -->
<div class="h-[50vh]">50% of viewport height</div>
```

### Important Modifier

Make any utility important with the `!` prefix:

```html
<div class="!p-4">
  <!-- This padding will have !important -->
</div>
```

## Advanced Usage

### Layers

Define and control the order of your CSS:

```js
// windi.config.js
export default {
  layers: {
    base: 1,
    components: 2,
    utilities: 3,
    my-custom-layer: 0, // Will be injected before 'base'
  },
}
```

### Writing Plugins

Create custom utilities and components:

```js
// windi.config.js
import plugin from "windicss/plugin";

export default {
  plugins: [
    plugin(({ addUtilities, addComponents, e, theme }) => {
      // Add custom utilities
      addUtilities({
        ".skew-10deg": {
          transform: "skewY(10deg)",
        },
        ".skew-15deg": {
          transform: "skewY(15deg)",
        },
      });

      // Add custom components
      addComponents({
        ".card": {
          backgroundColor: theme("colors.white"),
          borderRadius: theme("borderRadius.lg"),
          padding: theme("spacing.6"),
          boxShadow: theme("boxShadow.xl"),
        },
      });
    }),
  ],
};
```

### Using Theme Helper

Access theme values in JavaScript:

```js
import { theme } from "virtual:windi-utilities";

console.log(theme("colors.blue.500")); // #3b82f6
```

### Dark Mode

Configure dark mode in `windi.config.js`:

```js
export default {
  darkMode: "class", // or 'media'
};
```

Usage:

```html
<!-- With class mode -->
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  <!-- Content changes in dark mode -->
</div>

<!-- Toggle with JavaScript -->
<script>
  document.documentElement.classList.toggle("dark");
</script>
```

## The Discontinuation of Windi CSS

In February 2022, Windi CSS's creator Voorjaar announced that active development of Windi CSS would be discontinued. This came after a period of slowed development and the creator's decision to focus on a new project called UnoCSS.

### Reasons for Discontinuation

1. **Tailwind's JIT Adoption**: After Windi CSS pioneered on-demand generation, Tailwind CSS incorporated a similar approach with its JIT engine in version 2.1, which removed one of Windi's key advantages.

2. **Maintenance Burden**: Supporting multiple framework integrations and keeping up with Tailwind's features became increasingly difficult for the small team.

3. **UnoCSS Development**: The creator shifted focus to UnoCSS, described as an "atomic CSS engine" rather than a framework, which took the performance and customization concepts from Windi CSS even further.

4. **Resource Constraints**: As an open-source project maintained by a small team, Windi CSS faced challenges in maintaining feature parity with Tailwind, which had significant commercial backing.

From the creator's [announcement](https://github.com/windicss/windicss/discussions/1111):

> "After taking a step back to re-evaluate, I realize that I've put myself in the awkward position of competing with Tailwind Labs. To be frank, I didn't think this through when I first started this project. My intention was never to 'beat' or 'replace' Tailwind, but to provide a solution for the pain points I was experiencing at the time."

### Legacy and Influence

Despite its discontinuation, Windi CSS made significant contributions to the utility CSS ecosystem:

1. **On-Demand Generation**: Windi CSS's most innovative feature was later adopted by Tailwind, showing its significant impact on utility CSS development.

2. **Attributify Mode**: Introduced a novel approach to organizing utilities that influenced other frameworks.

3. **Variant Groups**: Provided a cleaner syntax for applying variants that was widely appreciated.

4. **UnoCSS Inspiration**: Served as the foundation for UnoCSS, which continues to innovate in the atomic CSS space.

## Migration Paths

For existing Windi CSS users, there are two main migration paths:

### To Tailwind CSS

```bash
# Remove Windi CSS
npm uninstall windicss windicss-webpack-plugin

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Key differences to be aware of:

- No attributify mode in Tailwind
- No variant groups (though similar functionality exists with plugins)
- Different plugin architecture
- Syntax differences for arbitrary values: Windi: `p-4.5` vs Tailwind: `p-[1.125rem]`

### To UnoCSS

```bash
# Remove Windi CSS
npm uninstall windicss windicss-webpack-plugin

# Install UnoCSS
npm install -D unocss
```

Benefits of migrating to UnoCSS:

- Faster performance
- Most Windi CSS features are supported
- Extended customization capabilities
- Maintained by the same creator

## UnoCSS: The Spiritual Successor

UnoCSS was created by Voorjaar (the creator of Windi CSS) as the next evolution in atomic CSS engines. Rather than being a framework with predefined utilities, UnoCSS is an atomic CSS engine that lets you define your own utilities:

```js
// uno.config.js
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    ["custom-rule", { color: "red" }],
    [/^text-(.*)$/, ([_, size]) => ({ "font-size": size })],
  ],
  shortcuts: {
    btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
  },
  presets: [
    require("@unocss/preset-wind"), // Windi CSS compatible preset
    require("@unocss/preset-uno"), // Default preset
  ],
});
```

UnoCSS offers:

- Even faster performance than Windi CSS
- Complete customization of rules and presets
- Multiple built-in presets (including Windi CSS and Tailwind compatibility)
- All the features that made Windi CSS unique

## When to Use Windi CSS

While Windi CSS is no longer actively maintained, it can still be used in certain scenarios:

1. **Existing projects**: If you have a project already using Windi CSS and it's working well
2. **Learning purposes**: To understand the history and evolution of utility CSS
3. **Specific features**: If you need attributify mode or variant groups and prefer them over UnoCSS

For new projects, consider:

- **Tailwind CSS**: For broad ecosystem support and active development
- **UnoCSS**: For maximum performance and customization
- **Tachyons**: For a minimal, stable utility CSS approach

## Resources

- [Windi CSS Documentation](https://windicss.org/guide/) (historical)
- [Windi CSS GitHub Repository](https://github.com/windicss/windicss)
- [UnoCSS Repository](https://github.com/unocss/unocss) (the successor to Windi CSS)
- [Discontinuation Announcement](https://github.com/windicss/windicss/discussions/1111)
- [Windi CSS vs. Tailwind CSS](https://windicss.org/guide/comparison.html)
- [Migration Guide to UnoCSS](https://github.com/unocss/unocss/tree/main/packages/preset-wind)
- [Atomic CSS Evolution](https://antfu.me/posts/reimagine-atomic-css)
