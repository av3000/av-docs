# UnoCSS

UnoCSS is an atomic CSS engine, designed as the spiritual successor to Windi CSS. Created by Anthony Fu (Voorjaar), UnoCSS takes the concepts pioneered in Windi CSS to the next level with a focus on performance, flexibility, and extensibility. Rather than being a CSS framework with predefined utilities, UnoCSS is an engine that lets you define your own CSS utilities or use existing presets.

## Core Concepts

### Engine vs. Framework

UnoCSS differentiates itself from other utility CSS approaches:

- **Not a framework**: No predefined utilities, everything is customizable
- **Pure engine**: You decide what utilities to include via presets and rules
- **Extremely fast**: Claimed to be the fastest CSS-in-JS engine
- **Extensible**: Define custom rules, shortcuts, and presets

### On-Demand Atomic CSS

Like Windi CSS before it, UnoCSS generates CSS on-demand:

```html
<div class="m-4 text-blue-500">
  <!-- Only m-4 and text-blue-500 utilities are generated -->
</div>
```

### Preset System

UnoCSS uses presets to define sets of utilities:

```js
// uno.config.js
import { defineConfig, presetUno, presetWind, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // Default preset with common utilities
    presetWind(), // Windi CSS compatible preset
    presetAttributify(), // Enables attributify mode
  ],
});
```

Popular presets:

- `presetUno`: Default preset with common utilities
- `presetWind`: Windi CSS compatible preset
- `presetMini`: Minimal but essential rules
- `presetAttributify`: Attributify mode
- `presetIcons`: Use any icon as a class
- `presetTypography`: Typography utilities
- `presetWebFonts`: Web fonts utilities
- `presetTagify`: Use utilities as tags

## Installation and Setup

### Basic Installation

```bash
# Using npm
npm install -D unocss

# Using yarn
yarn add -D unocss

# Using pnpm
pnpm add -D unocss
```

### Framework Integration

#### Vite

```js
// vite.config.js
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [UnoCSS()],
});
```

```js
// main.js
import "uno.css";
```

#### Nuxt

```bash
npm i -D @unocss/nuxt
```

```js
// nuxt.config.js
export default defineNuxtConfig({
  modules: ["@unocss/nuxt"],
});
```

#### Next.js

```bash
npm i -D @unocss/webpack
```

```js
// next.config.js
const UnoCSS = require("@unocss/webpack").default;

module.exports = {
  webpack: (config) => {
    config.plugins.push(UnoCSS());
    return config;
  },
};
```

#### Astro

```bash
npm i -D @unocss/astro
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import UnoCSS from "@unocss/astro";

export default defineConfig({
  integrations: [UnoCSS()],
});
```

### Configuration

Create a `uno.config.js` or `unocss.config.js` file:

```js
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then((i) => i.default),
      },
    }),
  ],
  rules: [
    // Custom rules
    ["custom-rule", { color: "red" }],
    // Dynamic rules with regex
    [/^text-(.*)$/, ([_, size]) => ({ "font-size": `${size}px` })],
  ],
  shortcuts: {
    // Custom shortcuts
    btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
    "btn-green": "text-white bg-green-500 hover:bg-green-700",
  },
  theme: {
    colors: {
      primary: "#3498db",
      secondary: "#2ecc71",
    },
  },
});
```

## Key Features

### Custom Rules

Define your own utilities with simple rules:

```js
rules: [
  // Static rules
  [
    "center",
    { display: "flex", "align-items": "center", "justify-content": "center" },
  ],

  // Dynamic rules with regex capture groups
  [/^m-(\d+)$/, ([_, num]) => ({ margin: `${num}px` })],

  // Complex rules with functions
  [
    /^grid-cols-(.+)$/,
    ([_, cols]) => {
      if (/^\d+$/.test(cols))
        return { "grid-template-columns": `repeat(${cols}, minmax(0, 1fr))` };
      return { "grid-template-columns": cols };
    },
  ],

  // Using themes
  [
    /^text-(.*)$/,
    ([_, c]) => {
      if (theme.colors?.[c]) return { color: theme.colors[c] };
    },
  ],
];
```

### Shortcuts

Create utility combinations:

```js
shortcuts: {
  // Static shortcuts
  'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  'card': 'bg-white rounded-lg shadow p-4 m-4',

  // Dynamic shortcuts
  'btn-': c => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`,

  // Multi-value variants
  'custom': {
    'base': 'text-sm font-medium',
    'hover': 'text-base font-bold',
  },
}
```

Usage:

```html
<button class="btn">Button</button>
<button class="btn-green">Green Button</button>
<div class="card">Card content</div>
```

### Attributify Mode

Group utilities by property:

```html
<!-- Traditional approach -->
<button
  class="text-white font-medium py-2 px-4 rounded bg-blue-500 hover:bg-blue-600"
>
  Button
</button>

<!-- Attributify mode -->
<button
  text="white"
  font="medium"
  p="y-2 x-4"
  rounded
  bg="blue-500 hover:blue-600"
>
  Button
</button>
```

Enable with the attributify preset:

```js
import { presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    // other presets...
  ],
});
```

### Variant Groups

Apply variants to multiple utilities:

```html
<!-- Without variant groups -->
<div class="hover:text-red hover:font-bold hover:border-2">
  <!-- Content -->
</div>

<!-- With variant groups -->
<div class="hover:(text-red font-bold border-2)">
  <!-- Content -->
</div>
```

### Icon Sets

Use any Iconify icon as a class with the icons preset:

```js
import { presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      collections: {
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then((i) => i.default),
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
  ],
});
```

Usage:

```html
<div class="i-carbon-heart text-red-500 text-3xl"></div>
<span class="i-mdi-home"></span>
```

### Directives

Use `@apply` to extract utility patterns:

```css
.my-class {
  @apply text-center text-blue-500 p-4 m-2;
}
```

### Inspector

UnoCSS provides a development inspector for debugging:

```js
// vite.config.js
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    UnoCSS({
      inspector: true, // enable inspector
    }),
  ],
});
```

Access with `Ctrl+Shift+I` or `⌘+⌥+I` on Mac.

## Advanced Features

### Preflights

Add base styles:

```js
export default defineConfig({
  preflights: [
    {
      getCSS: () => `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
        }
      `,
    },
  ],
});
```

### Layers

Control the order of generated CSS:

```js
export default defineConfig({
  rules: [["btn", { padding: "4px 8px" }, { layer: "components" }]],
});
```

Default layers order:

1. `preflights`
2. `base`
3. `components`
4. `utilities`
5. `safelist`

### Transformers

Process and transform the generated CSS:

```js
import { defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  transformers: [
    transformerDirectives(), // Enable @apply directive
    transformerVariantGroup(), // Enable variant groups
  ],
});
```

Available transformers:

- `transformerDirectives`: Support for `@apply` and other directives
- `transformerVariantGroup`: Support for variant groups
- `transformerCompileClass`: Compile classes for better browser compatibility
- `transformerAttributifyJsx`: Support for attributify mode in JSX

### Web Fonts

Easily include web fonts:

```js
import { defineConfig } from "unocss";
import { presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Roboto",
        mono: ["Fira Code", "Fira Mono:400,700"],
        custom: {
          name: "Inter",
          weights: [400, 500, 600, 700],
        },
      },
    }),
  ],
});
```

Usage:

```html
<p class="font-sans">Roboto font</p>
<p class="font-mono">Fira Code font</p>
<p class="font-custom">Inter font</p>
```

## Performance Comparison

UnoCSS is designed to be extremely fast:

| Framework          | Build Time (approx.) |
| ------------------ | -------------------- |
| UnoCSS             | 8-15ms               |
| Tailwind JIT       | 150-300ms            |
| Windi CSS          | 60-150ms             |
| Tailwind (pre-JIT) | 3000ms+              |

_Note: Performance varies based on project size and configuration_

Key performance features:

- Pure CSS-in-JS with no runtime overhead
- No parsing of CSS files
- Direct AST (Abstract Syntax Tree) generation
- Parallelized processing
- Highly optimized internal algorithms

## Comparison with Other Frameworks

### UnoCSS vs. Tailwind CSS

| Feature              | UnoCSS                          | Tailwind CSS              |
| -------------------- | ------------------------------- | ------------------------- |
| **Type**             | Engine                          | Framework                 |
| **Approach**         | Fully customizable              | Predefined utilities      |
| **Performance**      | Fastest                         | Fast with JIT             |
| **Customization**    | Unlimited via rules and presets | Config and plugins        |
| **Attributify Mode** | Built-in via preset             | Requires plugins          |
| **Variant Groups**   | Built-in support                | Requires plugins          |
| **Icons**            | Native integration              | Requires additional setup |
| **Ecosystem**        | Growing                         | Mature and extensive      |

### UnoCSS vs. Windi CSS

| Feature           | UnoCSS                       | Windi CSS         |
| ----------------- | ---------------------------- | ----------------- |
| **Status**        | Active development           | Discontinued      |
| **Performance**   | Faster                       | Fast              |
| **Architecture**  | Engine-based                 | Framework         |
| **Flexibility**   | More customizable            | Less customizable |
| **Compatibility** | Can emulate Windi via preset | N/A               |
| **Creator**       | Same creator                 | Same creator      |

## Real-World Examples

### Basic Layout

```html
<div class="container mx-auto px-4">
  <header class="flex justify-between items-center py-4">
    <h1 class="text-2xl font-bold">Website</h1>
    <nav class="flex gap-4">
      <a href="#" class="hover:text-blue-500">Home</a>
      <a href="#" class="hover:text-blue-500">About</a>
      <a href="#" class="hover:text-blue-500">Contact</a>
    </nav>
  </header>

  <main class="py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">Card 1</div>
      <div class="bg-white p-6 rounded-lg shadow">Card 2</div>
      <div class="bg-white p-6 rounded-lg shadow">Card 3</div>
    </div>
  </main>

  <footer class="py-6 text-center text-gray-500">
    &copy; 2023 UnoCSS Example
  </footer>
</div>
```

### Component with Custom Utilities

```js
// uno.config.js
export default defineConfig({
  shortcuts: {
    btn: "py-2 px-4 rounded",
    "btn-primary": "btn bg-blue-500 text-white hover:bg-blue-600",
    "btn-secondary": "btn bg-gray-200 text-gray-800 hover:bg-gray-300",
    card: "bg-white rounded-lg shadow p-4",
  },
});
```

```html
<div class="card">
  <h2 class="text-xl font-bold mb-4">Card Title</h2>
  <p class="mb-4">Card content goes here.</p>
  <div class="flex justify-end gap-2">
    <button class="btn-secondary">Cancel</button>
    <button class="btn-primary">Submit</button>
  </div>
</div>
```

### Using Attributify Mode

```html
<form flex="~ col" gap="4" p="4" bg="white" rounded="lg" shadow="md">
  <h2 text="xl blue-800" font="bold">Contact Form</h2>

  <div flex="~ col" gap="2">
    <label for="name" font="medium">Name</label>
    <input
      id="name"
      border="~ gray-300 rounded"
      p="2"
      w="full"
      focus="outline-none border-blue-500"
    />
  </div>

  <div flex="~ col" gap="2">
    <label for="email" font="medium">Email</label>
    <input
      id="email"
      border="~ gray-300 rounded"
      p="2"
      w="full"
      focus="outline-none border-blue-500"
    />
  </div>

  <button
    type="submit"
    bg="blue-500 hover:blue-600"
    text="white"
    p="y-2 x-4"
    rounded
    font="medium"
  >
    Submit
  </button>
</form>
```

## Best Practices

### Organization

1. **Use shortcuts for common patterns**:

   ```js
   shortcuts: {
     'flex-center': 'flex items-center justify-center',
     'card': 'bg-white rounded-lg shadow p-4',
   }
   ```

2. **Group related utilities**:

   ```html
   <div
     class="
     /* Layout */
     flex flex-col items-start
     /* Spacing */
     p-4 gap-2
     /* Visual */
     bg-white rounded-lg shadow
   "
   >
     <!-- Content -->
   </div>
   ```

3. **Leverage attributify mode for cleaner markup**:
   ```html
   <div flex="~ col" items="start" p="4" gap="2" bg="white" rounded="lg" shadow>
     <!-- Content -->
   </div>
   ```

### Performance

1. **Use the right presets**: Only include presets you need
2. **Optimize rule ordering**: Put more specific rules first
3. **Use shortcuts for repeated patterns**: Reduces HTML size

### Maintainability

1. **Document custom rules and shortcuts**:

   ```js
   rules: [
     // Custom spacing utility with REM values
     [/^sp-(\d+)$/, ([_, n]) => ({ margin: `${n * 0.25}rem` })],
   ],
   ```

2. **Create a design system with theme variables**:

   ```js
   theme: {
     colors: {
       primary: {
         50: '#f0f9ff',
         100: '#e0f2fe',
         // ...
       }
     }
   }
   ```

3. **Extract components for complex UIs**:
   ```js
   // In a React component
   function Card({ title, children }) {
     return (
       <div className="bg-white rounded-lg shadow p-4">
         <h3 className="text-lg font-medium mb-2">{title}</h3>
         <div>{children}</div>
       </div>
     );
   }
   ```

## UnoCSS in the Utility CSS Ecosystem

UnoCSS represents the next evolution in utility CSS:

1. **First Generation**: Early atomic CSS like Tachyons and Basscss
2. **Second Generation**: Tailwind CSS with its design system and extensive utilities
3. **Third Generation**: Windi CSS with its on-demand engine and enhanced features
4. **Fourth Generation**: UnoCSS with its engine approach and unlimited customization

The shift to UnoCSS reflects several industry trends:

- Moving from frameworks to engines/toolkits
- Prioritizing performance and build time
- Embracing customization and extensibility
- Reducing unnecessary CSS output

## Resources

- [UnoCSS Documentation](https://unocss.dev/)
- [UnoCSS GitHub Repository](https://github.com/unocss/unocss)
- [UnoCSS Interactive Docs](https://unocss.dev/interactive/)
- [UnoCSS Playground](https://unocss.dev/play/)
- [Reimagine Atomic CSS - Anthony Fu](https://antfu.me/posts/reimagine-atomic-css)
- [From Windicss to UnoCSS - Slides](https://talks.antfu.me/2022/from-windicss-to-unocss)
- [UnoCSS Preset Icons](https://unocss.dev/presets/icons)
- [UnoCSS Preset Typography](https://unocss.dev/presets/typography)
- [UnoCSS Discord Community](https://chat.antfu.me/)
