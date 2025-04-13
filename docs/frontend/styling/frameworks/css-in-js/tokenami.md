# Tokenami

Tokenami is a zero-runtime, token-based CSS-in-JS solution created by Sunil Pai and the team behind Stitches. It's designed to provide type-safe styling with a focus on design tokens, responsive styles, and build-time CSS generation.

## Core Concepts

Tokenami emphasizes several key principles:

1. **Design Token Centricity**: Built around design tokens from the ground up
2. **Static Extraction**: Generates CSS at build time, not runtime
3. **Type Safety**: Full TypeScript integration for catching errors early
4. **Theme Switching**: First-class support for themes including dark mode
5. **Responsive Design**: Built-in responsive token handling
6. **Variant Support**: Strong support for component variants

## Installation and Setup

```bash
npm install @tokenami/css
```

For build tool integration:

```bash
# For Next.js
npm install @tokenami/dev

# Add to next.config.js
const { withTokenami } = require('@tokenami/dev');

module.exports = withTokenami({
  // Your Next.js config
});
```

## Basic Configuration

First, define your tokens and create a configuration:

```tsx
// tokens.ts
import { createTokens } from "@tokenami/css";

export const tokens = createTokens({
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      900: "#171717",
    },
  },
  space: {
    1: "4px",
    2: "8px",
    3: "16px",
    4: "24px",
    5: "32px",
    6: "48px",
  },
  radii: {
    sm: "2px",
    md: "4px",
    lg: "8px",
    round: "9999px",
  },
  fontSizes: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  // Additional token categories as needed
});

export type AppTokens = typeof tokens;
```

Then create your themes:

```tsx
// themes.ts
import { createTheme } from "@tokenami/css";
import { tokens } from "./tokens";

export const lightTheme = createTheme("light", {
  colors: {
    background: tokens.colors.neutral[50],
    text: tokens.colors.neutral[900],
    primary: tokens.colors.primary[500],
    primaryHover: tokens.colors.primary[600],
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    background: tokens.colors.neutral[900],
    text: tokens.colors.neutral[50],
    primary: tokens.colors.primary[600],
    primaryHover: tokens.colors.primary[700],
  },
});
```

## Basic Usage

### Styling with the css Function

```tsx
import { css } from "@tokenami/css";
import { tokens } from "./tokens";

const button = css({
  padding: `${tokens.space[2]} ${tokens.space[3]}`,
  backgroundColor: tokens.colors.primary[500],
  color: "white",
  borderRadius: tokens.radii.md,
  fontSize: tokens.fontSizes.md,
  border: "none",
  cursor: "pointer",

  ":hover": {
    backgroundColor: tokens.colors.primary[600],
  },
});

function Button({ children }) {
  return <button className={button}>{children}</button>;
}
```

### Using Theme Tokens

```tsx
import { css } from "@tokenami/css";
import { lightTheme } from "./themes";

const card = css({
  backgroundColor: lightTheme.colors.background,
  color: lightTheme.colors.text,
  padding: tokens.space[4],
  borderRadius: tokens.radii.lg,
  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
});

function Card({ children }) {
  return <div className={card}>{children}</div>;
}
```

### Responsive Styles

```tsx
import { css } from "@tokenami/css";
import { tokens } from "./tokens";

const container = css({
  display: "flex",
  flexDirection: "column",
  padding: tokens.space[3],

  // Responsive styles
  "@media (min-width: 768px)": {
    flexDirection: "row",
    padding: tokens.space[4],
  },

  "@media (min-width: 1024px)": {
    maxWidth: "1200px",
    margin: "0 auto",
  },
});
```

### Variant Patterns

```tsx
import { css, cva } from "@tokenami/css";
import { tokens } from "./tokens";
import { lightTheme } from "./themes";

// Using Component Variant API
const buttonStyles = cva({
  base: {
    padding: `${tokens.space[2]} ${tokens.space[3]}`,
    borderRadius: tokens.radii.md,
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
  },
  variants: {
    intent: {
      primary: {
        backgroundColor: lightTheme.colors.primary,
        color: "white",
        ":hover": {
          backgroundColor: lightTheme.colors.primaryHover,
        },
      },
      secondary: {
        backgroundColor: "transparent",
        color: lightTheme.colors.primary,
        border: `1px solid ${lightTheme.colors.primary}`,
        ":hover": {
          backgroundColor: tokens.colors.primary[50],
        },
      },
    },
    size: {
      small: {
        fontSize: tokens.fontSizes.sm,
        padding: `${tokens.space[1]} ${tokens.space[2]}`,
      },
      large: {
        fontSize: tokens.fontSizes.lg,
        padding: `${tokens.space[3]} ${tokens.space[4]}`,
      },
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
});

function Button({ intent, size, children }) {
  return <button className={buttonStyles({ intent, size })}>{children}</button>;
}
```

## Key Features

### 1. Zero-Runtime Architecture

Tokenami extracts all styles at build time:

- **No runtime CSS processing**: All styles are converted to static CSS
- **No style injection during render**: No impact on React's rendering
- **No hydration mismatches**: Works perfectly with SSR
- **Smaller bundle size**: No CSS-in-JS runtime code

### 2. Token-First Design

Unlike many CSS-in-JS solutions, Tokenami puts tokens at the center:

```tsx
// Define once, use everywhere
export const tokens = createTokens({
  colors: {
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      // ...more shades
    },
    // ...more colors
  },
  // ...more token categories
});

// Use in styles
const component = css({
  color: tokens.colors.blue[500],
  backgroundColor: tokens.colors.blue[50],
});
```

### 3. Theme Switching

Tokenami's theming system is designed for efficient theme switching:

```tsx
// Define themes based on tokens
export const lightTheme = createTheme("light", {
  colors: {
    background: tokens.colors.white,
    text: tokens.colors.gray[900],
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    background: tokens.colors.gray[900],
    text: tokens.colors.white,
  },
});

// Use in components
const card = css({
  backgroundColor: lightTheme.colors.background,
  color: lightTheme.colors.text,
});

// Switch themes with a class or data-attribute on a parent element
// <html class="dark">
```

### 4. Responsive Design

Tokenami supports responsive design patterns:

```tsx
const responsiveText = css({
  fontSize: tokens.fontSizes.md,
  lineHeight: 1.5,

  "@media (min-width: 768px)": {
    fontSize: tokens.fontSizes.lg,
  },

  "@media (min-width: 1024px)": {
    fontSize: tokens.fontSizes.xl,
    lineHeight: 1.6,
  },
});
```

### 5. Type Safety

Full TypeScript integration ensures your styles are type-safe:

```tsx
// Type errors if token doesn't exist
const invalid = css({
  color: tokens.colors.nonExistent, // TypeScript error
  padding: tokens.space[999], // TypeScript error
});

// Type-safe variants
const buttonVariants = cva({
  variants: {
    size: {
      small: {
        /* styles */
      },
      medium: {
        /* styles */
      },
      large: {
        /* styles */
      },
    },
  },
});

// TypeScript knows which variants are valid
buttonVariants({ size: "medium" }); // OK
buttonVariants({ size: "huge" }); // TypeScript error
```

## Tokenami vs. Other CSS-in-JS Solutions

### Compared to Runtime CSS-in-JS (styled-components, Emotion)

- **Performance**: Much faster due to zero-runtime approach
- **SSR Compatibility**: No hydration issues
- **Bundle Size**: Smaller as no runtime JS needed
- **React Integration**: Works with all React features including Concurrent Mode

### Compared to StyleX

- **Focus**: Token-centric vs. atomic CSS-in-JS
- **API Style**: Object style vs. StyleX's atomic classes
- **Variants**: First-class variant API vs. manual composition

### Compared to Tamagui

- **Platforms**: Web-focused vs. universal (Web + Native)
- **Components**: Styling solution only vs. full component library
- **Architecture**: Both use build-time optimization

## Tokenami in the CSS-in-JS Evolution

Tokenami is part of the shift away from runtime CSS-in-JS toward zero-runtime solutions that address performance concerns. It builds on lessons learned from earlier libraries:

1. **From Emotion/styled-components**: Took the developer experience but removed runtime cost
2. **From Stitches**: Improved the variant API and token system while removing all runtime code
3. **From Theme UI/Chakra UI**: Adapted the token-centric design but with static extraction

As the CSS-in-JS ecosystem has matured, libraries like Tokenami represent a "best of both worlds" approach that combines the developer experience of CSS-in-JS with the performance characteristics of traditional CSS.

## When to Use Tokenami

Tokenami is particularly suitable for:

1. **Design system development**: The token-centric approach fits well with design systems
2. **Performance-critical applications**: When runtime CSS-in-JS is causing issues
3. **Server-side rendered apps**: Works perfectly with Next.js and other SSR frameworks
4. **Teams that value type safety**: Strong TypeScript integration
5. **Projects moving away from runtime CSS-in-JS**: Familiar API for easier migration

## Best Practices

1. **Design your token system first**: Think carefully about your design tokens
2. **Use semantic token names**: Name tokens by their purpose, not their value
3. **Leverage the variant API**: Use `cva()` for components with multiple variants
4. **Create component libraries**: Build reusable, styled components
5. **Consider responsive from the start**: Plan your responsive strategy early
6. **Organize tokens by category**: Keep token definitions logical and well-structured
7. **Use theme tokens for color schemes**: Leverage theme tokens for light/dark modes

## Resources

- [Tokenami Documentation](https://tokenami.com/docs/getting-started)
- [Tokenami GitHub Repository](https://github.com/tokenami/tokenami)
- [The Evolution of CSS-in-JS](https://frontendmastery.com/posts/the-evolution-of-scalable-css/)
- [Why Zero-Runtime CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)
- [Building Design Systems with Tokens](https://www.youtube.com/watch?v=xlQAe9DPx-U)
