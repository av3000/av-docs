# Panda CSS

Panda CSS is a modern, zero-runtime CSS-in-JS framework designed by the creators of Chakra UI. It combines the benefits of CSS-in-JS with the performance advantages of build-time CSS generation, focusing on type safety, developer experience, and atomic CSS principles.

## Core Concepts

### Zero-Runtime Approach

Panda CSS is a zero-runtime solution that processes your styles at build time:

- No runtime JavaScript overhead
- Static CSS extraction for optimal performance
- No style recalculation during rendering
- Works seamlessly with SSR and React Server Components

### Atomic CSS

Panda uses an atomic CSS approach to minimize CSS output:

```jsx
// Instead of this CSS
.button {
  padding: 8px 16px;
  background-color: blue;
  color: white;
  border-radius: 4px;
}

// Panda generates atomic classes like these
.p_8px_16px { padding: 8px 16px; }
.bg_blue { background-color: blue; }
.text_white { color: white; }
.rounded_4px { border-radius: 4px; }
```

### Design Token System

Panda is built around a robust design token system:

```js
// tokens.config.ts
export default defineTokens({
  colors: {
    primary: { value: "#3b82f6" },
    secondary: { value: "#10b981" },
    // More colors...
  },
  spacing: {
    sm: { value: "0.5rem" },
    md: { value: "1rem" },
    lg: { value: "2rem" },
    // More spacing values...
  },
  // More token categories...
});
```

### TypeScript Integration

Full TypeScript support for catching errors at compile time:

```tsx
import { css } from "../styled-system/css";

// Type safe - Will give error if 'primary' isn't a valid color
const validStyle = css({ color: "primary", padding: "md" });

// Type error - 'invalid-color' doesn't exist in your tokens
const invalidStyle = css({ color: "invalid-color" });
```

## Installation and Setup

### Basic Installation

```bash
# Using npm
npm install -D @pandacss/dev

# Using yarn
yarn add -D @pandacss/dev

# Using pnpm
pnpm add -D @pandacss/dev
```

### Initialize Panda CSS

```bash
npx panda init
```

This creates three configuration files:

- `panda.config.ts`: Main configuration
- `styled-system`: Generated files directory
- Various theme files (optional)

### Configuration File

```ts
// panda.config.ts
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Output directory for generated files
  outdir: "styled-system",

  // Files to analyze for used styles
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Theme configuration
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: "#3b82f6" },
          secondary: { value: "#10b981" },
        },
      },
    },
  },

  // Enable JSX style props
  jsxFramework: "react",

  // Set up styling patterns
  patterns: {
    extend: {
      // Custom patterns
      card: {
        properties: {
          variant: { type: "enum", value: ["elevated", "outline"] },
        },
        transform(props) {
          const { variant, ...rest } = props;
          return {
            p: "4",
            borderRadius: "md",
            ...(variant === "elevated" && { boxShadow: "md" }),
            ...(variant === "outline" && { borderWidth: "1px" }),
            ...rest,
          };
        },
      },
    },
  },

  // Utilities configuration
  utilities: {
    extend: {
      // Custom utilities
    },
  },
});
```

### Add Build Scripts

```json
{
  "scripts": {
    "prepare": "panda codegen",
    "dev": "panda watch",
    "build": "panda codegen"
  }
}
```

### Framework Integration

#### Next.js App Router

```ts
// next.config.js
const { createPreset } = require("@pandacss/dev/presets");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pandacss/dev"],
};

module.exports = nextConfig;
```

#### Vite/React

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

## Core APIs

### css Function

Create style objects from token-aware properties:

```tsx
import { css } from "../styled-system/css";

function Button() {
  return (
    <button
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 16px",
        borderRadius: "md",
        backgroundColor: "primary",
        color: "white",
        _hover: { backgroundColor: "primary.600" },
      })}
    >
      Button
    </button>
  );
}
```

### cva (Component Variant API)

Create components with variants:

```tsx
import { cva } from "../styled-system/css";

const button = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "md",
    fontWeight: "medium",
  },
  variants: {
    size: {
      sm: { padding: "6px 12px", fontSize: "sm" },
      md: { padding: "8px 16px", fontSize: "md" },
      lg: { padding: "12px 24px", fontSize: "lg" },
    },
    variant: {
      primary: { backgroundColor: "primary", color: "white" },
      secondary: { backgroundColor: "gray.200", color: "gray.800" },
      outline: { borderWidth: "1px", borderColor: "current" },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

function Button({ size, variant, children }) {
  return <button className={button({ size, variant })}>{children}</button>;
}
```

### pattern Function

Use predefined style patterns:

```tsx
import { pattern } from "../styled-system/patterns";

function Card({ title, content }) {
  return (
    <div className={pattern.flex({ direction: "column", gap: "4" })}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
```

Built-in patterns include:

- `flex`
- `grid`
- `stack`
- `wrap`
- `container`
- `hstack`
- `vstack`
- `spacer`
- And any custom patterns you define

### styled Function

Create styled components with token-aware props:

```tsx
import { styled } from '../styled-system/jsx'

const Button = styled('button', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontWeight: 'medium',
  },
  variants: {
    size: {
      sm: { padding: '6px 12px', fontSize: 'sm' },
      md: { padding: '8px 16px', fontSize: 'md' },
      lg: { padding: '12px 24px', fontSize: 'lg' },
    },
    variant: {
      primary: { backgroundColor: 'primary', color: 'white' },
      secondary: { backgroundColor: 'gray.200', color: 'gray.800' },
      outline: { borderWidth: '1px', borderColor: 'current' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

// Usage
<Button size="lg" variant="outline">Click me</Button>
```

### JSX Style Props

Use style props directly on JSX elements:

```tsx
import { jsx } from "../styled-system/jsx";

function Component() {
  return (
    <jsx.div
      display="flex"
      flexDirection="column"
      padding="4"
      backgroundColor="gray.100"
      color="gray.900"
      borderRadius="md"
    >
      Content with style props
    </jsx.div>
  );
}

// Or with the 'styled' import
import { styled } from "../styled-system/jsx";

function AnotherComponent() {
  return (
    <styled.div
      display="flex"
      flexDirection="column"
      padding="4"
      backgroundColor="gray.100"
      color="gray.900"
      borderRadius="md"
    >
      Content with style props
    </styled.div>
  );
}
```

## Advanced Features

### Recipes (Style Compositions)

Create reusable style compositions:

```tsx
// panda.config.ts
export default defineConfig({
  // ...other config
  recipes: {
    button: {
      description: "Button component",
      base: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "md",
        fontWeight: "medium",
      },
      variants: {
        size: {
          sm: { padding: "6px 12px", fontSize: "sm" },
          md: { padding: "8px 16px", fontSize: "md" },
          lg: { padding: "12px 24px", fontSize: "lg" },
        },
        variant: {
          primary: { backgroundColor: "primary", color: "white" },
          secondary: { backgroundColor: "gray.200", color: "gray.800" },
          outline: { borderWidth: "1px", borderColor: "current" },
        },
      },
      defaultVariants: {
        size: "md",
        variant: "primary",
      },
    },
  },
});
```

```tsx
import { recipe } from "../styled-system/recipes";

function Button({ size, variant, children }) {
  return (
    <button className={recipe.button({ size, variant })}>{children}</button>
  );
}
```

### Conditional Styles

Apply styles conditionally:

```tsx
import { css } from "../styled-system/css";

function Component({ isActive, isDisabled }) {
  return (
    <div
      className={css({
        color: "gray.800",
        backgroundColor: "white",
        padding: "4",
        ...(isActive && {
          fontWeight: "bold",
          color: "primary",
        }),
        ...(isDisabled && {
          opacity: 0.5,
          cursor: "not-allowed",
        }),
      })}
    >
      Content
    </div>
  );
}
```

### Responsive Styles

Apply styles at different breakpoints:

```tsx
import { css } from "../styled-system/css";

function ResponsiveComponent() {
  return (
    <div
      className={css({
        width: "100%",
        padding: "4",
        fontSize: { base: "md", md: "lg", lg: "xl" },
        flexDirection: { base: "column", md: "row" },
        gap: { base: "2", md: "4", lg: "6" },
      })}
    >
      Responsive content
    </div>
  );
}
```

### Theme Tokens

Panda CSS allows you to define and use theme tokens:

```ts
// tokens.config.ts
import { defineTokens } from "@pandacss/dev";

export default defineTokens({
  colors: {
    primary: { value: "#3b82f6" },
    gray: {
      50: { value: "#f9fafb" },
      100: { value: "#f3f4f6" },
      // More shades...
      900: { value: "#111827" },
    },
  },
  spacing: {
    "1": { value: "0.25rem" },
    "2": { value: "0.5rem" },
    // More values...
  },
  fontSizes: {
    xs: { value: "0.75rem" },
    sm: { value: "0.875rem" },
    // More sizes...
  },
  radii: {
    sm: { value: "0.125rem" },
    md: { value: "0.25rem" },
    // More values...
  },
  // Other token categories...
});
```

### Semantic Tokens

Create semantic tokens based on low-level design tokens:

```ts
// semantic-tokens.config.ts
import { defineSemanticTokens } from "@pandacss/dev";

export default defineSemanticTokens({
  colors: {
    background: {
      value: {
        base: "{colors.white}",
        _dark: "{colors.gray.900}",
      },
    },
    text: {
      value: {
        base: "{colors.gray.900}",
        _dark: "{colors.gray.100}",
      },
    },
    // More semantic colors...
  },
});
```

### Dark Mode

Implement dark mode with semantic tokens:

```tsx
import { css } from "../styled-system/css";

function ThemeComponent() {
  return (
    <div
      className={css({
        backgroundColor: "background",
        color: "text",
        padding: "4",
        borderRadius: "md",
      })}
    >
      Content that adapts to theme
    </div>
  );
}
```

Toggle dark mode with a class or attribute:

```html
<html class="dark">
  <!-- Dark mode enabled -->
</html>
```

## Panda CSS in the CSS-in-JS Ecosystem

Panda CSS represents the evolution of CSS-in-JS beyond runtime solutions, addressing many of the performance concerns that led developers away from traditional CSS-in-JS libraries.

### Evolution from Chakra UI

Panda CSS was created by the team behind Chakra UI, drawing on their experience to build a more performant styling solution:

1. **From Runtime to Build Time**: Chakra UI used Emotion (runtime CSS-in-JS), while Panda CSS generates static CSS
2. **Style Props Maintained**: Kept the developer-friendly style props API from Chakra UI
3. **Token System Enhanced**: Expanded the design token system for even more flexibility

As Segun Adebayo, creator of Chakra UI and Panda CSS, explains:

> "Panda CSS takes the best parts of Chakra UI's developer experience and combines it with the performance benefits of build-time CSS generation and atomic CSS principles."

### Comparison with Other Zero-Runtime Solutions

| Feature                  | Panda CSS          | StyleX             | vanilla-extract    | Stitches          |
| ------------------------ | ------------------ | ------------------ | ------------------ | ----------------- |
| **Created By**           | Chakra UI team     | Meta               | Mark Dalgleish     | WorkOS            |
| **Approach**             | Atomic + JSX props | Atomic classes     | CSS Modules-like   | Near-zero runtime |
| **TypeScript**           | Strong             | Strong             | Strong             | Strong            |
| **Style Composition**    | Recipes & Patterns | StyleX.compose     | recipe API         | Variants API      |
| **Design Tokens**        | Comprehensive      | Basic              | Theme contract     | Theme tokens      |
| **Framework Dependency** | Framework agnostic | Framework agnostic | Framework agnostic | React focused     |
| **Learning Curve**       | Medium             | Medium             | Medium             | Low-Medium        |

## When to Use Panda CSS

Panda CSS is particularly well-suited for:

1. **React/Next.js projects**: Full integration with modern React patterns
2. **Design system development**: Strong token system and component patterns
3. **Performance-critical applications**: Zero-runtime approach eliminates CSS-in-JS overhead
4. **Chakra UI users**: Familiar API and concepts for Chakra UI developers
5. **TypeScript projects**: Strong type safety throughout the styling system
6. **Server-side rendering**: Works perfectly with SSR and React Server Components

It might not be ideal for:

1. **Simple static sites**: Setup may be overkill for basic websites
2. **Projects without a build step**: Requires a build process
3. **Teams preferring traditional CSS**: Learning curve for CSS-first developers

## Best Practices

### Organization

1. **Structure tokens systematically**: Organize design tokens by purpose and meaning
2. **Create semantic tokens**: Abstract away direct values with meaningful names
3. **Use patterns for layout**: Leverage built-in patterns for consistent spacing

### Performance

1. **Minimize style recalculation**: Avoid dynamic class string concatenation
2. **Use recipes for complex components**: Recipes generate optimized atomic classes
3. **Leverage atomic CSS generation**: Let Panda optimize your CSS output

### Maintainability

1. **Create component libraries**: Abstract repeated patterns into components
2. **Document your token system**: Create a style guide with your theme tokens
3. **Use semantic naming**: Create meaningful names for tokens and patterns

### TypeScript Integration

1. **Take advantage of type checking**: Let TypeScript catch style errors
2. **Create type-safe component APIs**: Define proper types for styled components
3. **Extract types from your theme**: Use Panda's utility types for props

## Resources

- [Panda CSS Documentation](https://panda-css.com/)
- [Panda CSS GitHub Repository](https://github.com/chakra-ui/panda)
- [Panda CSS Discord Community](https://discord.gg/VQrkpsgSx7)
- [Styling with Panda CSS](https://www.youtube.com/watch?v=QxA-KB2lKgU) - YouTube tutorial
- [Panda CSS Playground](https://panda-css.com/playground)
- [Why We're Building Panda CSS](https://www.adebayosegun.com/blog/why-we-are-building-panda-css) - By Segun Adebayo
- [Panda CSS vs. Tailwind CSS](https://panda-css.com/docs/comparisons/tailwind-css)
- [Migration from Chakra UI](https://panda-css.com/docs/migration/from-chakra-ui)
