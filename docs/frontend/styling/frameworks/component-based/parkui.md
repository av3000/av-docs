# Park UI

Park UI is a modern, open-source component library that combines the accessibility of Ark UI with the styling flexibility of your choice.

## What is Park UI?

Park UI is a collection of accessible, customizable UI components built on top of [Ark UI](./ark-ui.md). It provides ready-to-use components with preset styling while maintaining the flexibility to use different styling systems. Park UI supports multiple styling approaches including:

- Panda CSS (CSS-in-JS)
- Tailwind CSS (Utility-first CSS)
- CSS Modules
- CSS Variables

## Key Features

- **Framework-Agnostic**: Works with React, Vue, and Solid
- **Multiple Styling Options**: Compatible with different styling approaches
- **Accessibility First**: Built on top of Ark UI primitives
- **Design System Tokens**: Implements design tokens for consistent styling
- **Full TypeScript Support**: Strong type definitions
- **Theme Customization**: Easily customize to match your brand
- **Dark Mode Support**: Built-in light and dark themes
- **Responsive Design**: Mobile-friendly components

## Why It Emerged

Park UI emerged to fill the gap between unstyled headless UI libraries and fully styled component libraries. Its creation was driven by several needs:

1. **Styling Flexibility**: Allow developers to choose their preferred styling approach
2. **Framework Flexibility**: Support for multiple JavaScript frameworks
3. **Accessibility Foundation**: Build on accessible primitives
4. **Design Token Integration**: Support design systems with tokens
5. **Developer Experience**: Provide a great DX without sacrificing flexibility

## Pros

- **Styling Freedom**: Choose between Panda CSS, Tailwind, CSS Modules, or CSS Variables
- **Multiple Framework Support**: Works with React, Solid, and Vue
- **Accessibility Built-in**: Based on Ark UI's accessible primitives
- **Design System Ready**: Works well with design tokens
- **Customizable**: Easily adapt to match your brand
- **Modern Architecture**: Built with current best practices
- **Community-Driven**: Open-source with active community
- **Incremental Adoption**: Use only what you need

## Cons

- **Newer Library**: Less mature than alternatives like Chakra UI or Material UI
- **Smaller Ecosystem**: Fewer resources, extensions, and community examples
- **Documentation Gaps**: Still evolving documentation
- **Learning Curve**: Understanding the relationship between Park UI and Ark UI
- **Setup Complexity**: Initial configuration can be more involved
- **Component Coverage**: Not as extensive as some established libraries

## When to Use It

- When you need framework flexibility (React, Vue, Solid)
- When you want to choose your own styling approach
- When building design systems that need to work across different styling methods
- When accessibility is a top priority
- When you prefer a more unopinionated approach to styling
- For projects that need to balance pre-built components with customization
- When you're using or considering Ark UI

## When Not to Use It

- For projects needing a comprehensive, fully-styled solution
- When extensive documentation and examples are critical
- When you need maximum community support
- If you prefer opinionated design systems
- For teams without capacity to fill documentation gaps
- For projects with extremely tight deadlines where setup time is limited

## Problems It Solves

1. **Framework Lock-in**: Works across multiple JavaScript frameworks
2. **Styling Methodology Lock-in**: Supports multiple styling approaches
3. **Accessibility Implementation**: Provides accessible components by default
4. **Design System Creation**: Helps implement consistent design tokens
5. **Component Customization**: Offers flexibility without starting from scratch
6. **Dark Mode Support**: Built-in theming capabilities

## What It's Best For

Park UI excels in:

- Cross-framework projects
- Design systems that need to be implemented across different technologies
- Projects with strong accessibility requirements
- Teams that want styling flexibility
- Applications needing a balanced approach between pre-styled and custom components
- Projects already using or considering Ark UI

## Comparison with Other Libraries

| Library     | Framework Support | Styling Approach    | Accessibility     | Component Count |
| ----------- | ----------------- | ------------------- | ----------------- | --------------- |
| Park UI     | React, Vue, Solid | Multiple            | Built on Ark UI   | 30+             |
| shadcn/ui   | React-only        | Tailwind CSS        | Built on Radix UI | 40+             |
| Chakra UI   | React-only        | Styled System       | Good              | 70+             |
| Material UI | React-only        | CSS-in-JS (Emotion) | Good              | 100+            |
| Radix UI    | React-only        | Unstyled            | Excellent         | 30+             |

## Framework Compatibility

One of Park UI's key strengths is its framework compatibility. It supports:

- React
- Vue
- Solid

This makes it one of the more flexible options compared to React-only libraries like Chakra UI, Material UI, or shadcn/ui.

## Getting Started

Installation depends on your framework and styling preference. For React with Panda CSS:

```bash
# Install dependencies
npm install @park-ui/panda-preset @pandacss/dev @ark-ui/react

# Setup Panda CSS
npx panda init --preset @park-ui/panda-preset

# Add components
npm install @park-ui/react
```

## Example Usage (React with Panda CSS)

```jsx
import { Button } from "@park-ui/react";

function App() {
  return (
    <div>
      <Button variant="solid" colorScheme="primary">
        Click me
      </Button>
      <Button variant="outline" colorScheme="neutral">
        Cancel
      </Button>
    </div>
  );
}
```

## Resources

- [Official Website](https://park-ui.com/)
- [GitHub Repository](https://github.com/park-ui/park-ui)
- [Documentation](https://park-ui.com/docs/overview/introduction)
- [Components](https://park-ui.com/docs/components/button)
- [Playground](https://park-ui.com/playground)
