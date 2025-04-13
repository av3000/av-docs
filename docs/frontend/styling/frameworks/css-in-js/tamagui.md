# Tamagui

Tamagui is a universal UI kit and styling system for React Native and Web that features a compiler for significant performance optimizations. Created by Nate Wienert, it offers a unique approach that combines the consistency of cross-platform development with the performance of zero-runtime CSS-in-JS.

## Core Concepts

Tamagui stands out by focusing on these key principles:

1. **Universal by Design**: Write once, run on both React Native and Web with the same code
2. **Compile-time Optimization**: Transforms dynamic React and style code into optimized static output
3. **Design Tokens System**: Comprehensive token system for consistent design across platforms
4. **Theme Switching**: Efficient theme switching that doesn't cause re-renders
5. **Fully-featured UI Kit**: Includes a complete UI component library built on the styling system

## Installation and Setup

### Basic Installation

```bash
# For new projects
npx create-tamagui@latest

# For existing projects
npm install tamagui @tamagui/core @tamagui/config
```

### Setting up the Compiler

For React Native:

```bash
npm install @tamagui/babel-plugin
```

Update your babel.config.js:

```js
module.exports = {
  plugins: [
    [
      "@tamagui/babel-plugin",
      {
        components: ["tamagui"],
        config: "./tamagui.config.ts",
      },
    ],
  ],
};
```

For Next.js:

```bash
npm install @tamagui/next-plugin
```

Update your next.config.js:

```js
const { withTamagui } = require("@tamagui/next-plugin");

module.exports = withTamagui({
  config: "./tamagui.config.ts",
  // other config options
});
```

### Configuration

Create a tamagui.config.ts file:

```tsx
import { createTamagui, createTokens } from "@tamagui/core";
import { createInterFont } from "@tamagui/font-inter";

// Your tokens
const tokens = createTokens({
  color: {
    primary: "#0070f3",
    secondary: "#6b46c1",
    // ... more colors
  },
  space: {
    $1: 4,
    $2: 8,
    $3: 16,
    // ... more spacing
  },
  size: {
    $1: 4,
    $2: 8,
    // ... more sizes
  },
  radius: {
    $1: 4,
    $2: 8,
    // ... more radii
  },
  zIndex: {
    $1: 1,
    $2: 2,
    // ... more z-indices
  },
});

const interFont = createInterFont();

const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  tokens,
  themes: {
    light: {
      background: "#fff",
      color: "#000",
    },
    dark: {
      background: "#111",
      color: "#fff",
    },
  },
});

export type AppConfig = typeof config;

export default config;
```

## Basic Usage

### Core Styling Components

```tsx
import { Stack, Text, XStack, YStack } from "tamagui";

function MyComponent() {
  return (
    <YStack spacing="$3" padding="$4" backgroundColor="$background">
      <Text fontSize="$5" fontWeight="bold" color="$color">
        Hello Tamagui
      </Text>
      <XStack spacing="$2" alignItems="center">
        <Stack width={50} height={50} backgroundColor="$primary" />
        <Text>Welcome to the future of styling</Text>
      </XStack>
    </YStack>
  );
}
```

### Using Style Props

```tsx
import { Stack } from "tamagui";

function Card() {
  return (
    <Stack
      padding="$4"
      margin="$2"
      backgroundColor="$background"
      borderRadius="$2"
      shadowColor="$shadowColor"
      shadowRadius={5}
      elevation={2}
    >
      {/* Card content */}
    </Stack>
  );
}
```

### Interactive States

```tsx
import { Button } from "tamagui";

function InteractiveButton() {
  return (
    <Button
      backgroundColor="$primary"
      color="white"
      fontWeight="bold"
      // Different states
      hoverStyle={{ backgroundColor: "$primary2" }}
      pressStyle={{ scale: 0.98 }}
      focusStyle={{ borderColor: "$primary" }}
    >
      Click Me
    </Button>
  );
}
```

### Theme Switching

```tsx
import { useTheme, Button, XStack, Text } from "tamagui";

function ThemeSwitcher() {
  const theme = useTheme();

  return (
    <XStack space="$2">
      <Text>Current theme: {theme.name}</Text>
      <Button
        theme={theme.name === "light" ? "dark" : "light"}
        onPress={() => {
          // Use your theme switching logic here
        }}
      >
        Switch to {theme.name === "light" ? "Dark" : "Light"}
      </Button>
    </XStack>
  );
}
```

## Key Features

### 1. The Compiler

Tamagui's compiler is its standout feature, offering:

- **Static extraction**: Converts dynamic React code to optimal CSS and HTML
- **Prop flattening**: Simplifies the React render tree for faster performance
- **Constant folding**: Evaluates expressions at build time where possible
- **Partial evaluation**: Optimizes what it can while leaving dynamic parts intact

Before compilation:

```tsx
<Stack padding={isCompact ? "$2" : "$4"} backgroundColor="$background">
  <Text color="$primary">Hello</Text>
</Stack>
```

After compilation:

```tsx
<div className="tamagui-stack-0">
  <span className="tamagui-text-1">Hello</span>
</div>
```

With generated CSS:

```css
.tamagui-stack-0 {
  padding: var(--space-4);
  background-color: var(--background);
}
.dark .tamagui-stack-0 {
  background-color: var(--background-dark);
}
/* Dynamic part handled in JS */
.tamagui-text-1 {
  color: var(--primary);
}
```

### 2. Style Props API

Tamagui offers an extensive set of style props:

```tsx
<YStack
  // Layout
  flex={1}
  width="100%"
  height={200}
  // Spacing
  padding="$4"
  margin="$2"
  gap="$3"
  // Colors & Appearance
  backgroundColor="$background"
  opacity={0.9}
  // Border
  borderWidth={1}
  borderColor="$borderColor"
  borderRadius="$2"
  // Positioning
  position="relative"
  top={0}
  // Responsive props
  $gtSm={{
    flexDirection: "row",
    padding: "$5",
  }}
  $dark={{
    backgroundColor: "$background2",
  }}
/>
```

### 3. Theme Tokens

Tamagui uses a comprehensive token system:

```tsx
// In your configuration
const tokens = createTokens({
  color: {
    primary: "#0070f3",
    secondary: "#6b46c1",
    gray100: "#f7fafc",
    gray900: "#1a202c",
  },
  space: {
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
  },
  size: {
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
  },
  radius: {
    $1: 2,
    $2: 4,
    $3: 8,
    $4: 16,
    $5: 9999,
  },
  // More token categories...
});
```

### 4. Variant Props

Create component variants:

```tsx
import { styled } from "tamagui";

const Button = styled(Stack, {
  name: "Button",
  padding: "$2",
  borderRadius: "$2",
  backgroundColor: "$primary",

  variants: {
    size: {
      small: {
        padding: "$1",
        fontSize: "$1",
      },
      large: {
        padding: "$3",
        fontSize: "$3",
      },
    },
    outlined: {
      true: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$primary",
        color: "$primary",
      },
    },
  },
});

// Usage
<Button size="large" outlined>
  My Button
</Button>;
```

### 5. Responsive Styling

```tsx
import { Stack } from "tamagui";

function ResponsiveComponent() {
  return (
    <Stack
      flexDirection="column"
      $gtSm={{ flexDirection: "row" }}
      $gtMd={{ maxWidth: 1000 }}
      $gtLg={{ maxWidth: 1200 }}
    >
      {/* Content */}
    </Stack>
  );
}
```

## Tamagui and the CSS-in-JS Evolution

Tamagui represents a new generation of CSS-in-JS libraries that address the performance concerns that plague traditional CSS-in-JS approaches.

### How Tamagui Addresses CSS-in-JS Limitations

1. **Eliminates Runtime Overhead**: The compiler extracts as much CSS as possible at build time
2. **Optimizes SSR Compatibility**: No complex style extraction process needed
3. **Supports React Concurrent Mode**: No style injection during render
4. **Reduces Bundle Size**: Extracted styles don't require JavaScript processing

As Rich Harris, creator of Svelte, noted:

> "CSS-in-JS was a necessary step in the evolution of our thinking, but ultimately we want tools that operate at build time rather than runtime."

Tamagui embodies this philosophy by pushing as much work as possible to build time.

## Tamagui vs. Other Approaches

### Compared to Traditional CSS-in-JS (styled-components, Emotion)

- **Performance**: Much faster due to compile-time extraction
- **Bundle Size**: Smaller due to extracted CSS
- **SSR Compatibility**: Better without runtime extraction
- **Feature Set**: Similar styling capabilities
- **Platforms**: Works universally across Web and Native

### Compared to StyleX

- **Focus**: Universal styling vs. web-only
- **Component Library**: Includes complete UI kit vs. styling only
- **Optimization**: Both use build-time compilation
- **Syntax**: Style props vs. object styles
- **Native Support**: Full support vs. web-focused

### Compared to Utility CSS (Tailwind)

- **Approach**: JS-based vs. HTML class-based
- **Type Safety**: Strong typing vs. string literals
- **Dynamism**: Better support for dynamic styling
- **Cross-Platform**: Works on Native and Web vs. Web-only
- **Learning Curve**: Component props vs. utility classes

## When to Use Tamagui

Tamagui is particularly well-suited for:

1. **Cross-platform applications**: When targeting both React Native and Web
2. **Performance-critical applications**: When runtime CSS-in-JS is too costly
3. **Design systems**: When building a consistent component library
4. **Teams familiar with React Native**: The API will feel natural
5. **Projects that value type safety**: Full TypeScript integration

## Best Practices

1. **Use the compiler**: Ensure it's properly set up for maximum performance
2. **Stick to Tamagui components**: Use Stack, Text, etc. rather than native elements
3. **Leverage the token system**: Use tokens for consistent design
4. **Extract reusable components**: Create styled components for common patterns
5. **Use responsive helpers**: Take advantage of the built-in responsive props
6. **Theme with tokens**: Build themes around your token system
7. **Keep animations performant**: Use Tamagui's optimized animation system

## Resources

- [Tamagui Documentation](https://tamagui.dev/docs/intro/introduction)
- [Tamagui GitHub Repository](https://github.com/tamagui/tamagui)
- [Tamagui Compiler Documentation](https://tamagui.dev/docs/intro/compiler)
- [Tamagui Studio](https://tamagui.dev/studio) - Design tool for Tamagui
- [Tamagui Examples](https://github.com/tamagui/tamagui/tree/master/apps/site/data/docs/guides/examples)
- [Universal App Demo](https://github.com/tamagui/tamagui/tree/master/apps/kitchen-sink)
