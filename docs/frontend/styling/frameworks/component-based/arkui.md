# Ark UI

Ark UI is a headless UI component library that provides behavior, accessibility, and interactivity while giving you complete styling freedom.

## What is Ark UI?

Ark UI is a collection of headless, framework-agnostic UI components that handle complex interactions, accessibility, and state management without imposing any styling constraints. It focuses on providing the functionality and behavior of UI components while leaving the visual design entirely up to you.

## Key Features

- **Framework-Agnostic**: Works with React, Vue, and Solid
- **Headless Design**: Completely unstyled components
- **Accessibility First**: WAI-ARIA compliant components
- **State Machines**: Built on state machines for reliable interactions
- **Controlled & Uncontrolled APIs**: Flexible component usage
- **TypeScript Support**: Fully typed API
- **Composable Parts**: Components broken down into atomic parts
- **Custom Element Support**: Can be used with web components
- **Zero Styling Dependencies**: No CSS dependencies

## Why It Emerged

Ark UI emerged to address several limitations in the UI component ecosystem:

1. **Framework Fragmentation**: Most libraries are tied to specific frameworks
2. **Styling Conflicts**: Many libraries impose styling approaches
3. **Limited Accessibility**: Accessibility often requires extra work
4. **Complex Interactions**: Difficult to implement reliable interactive components
5. **State Management Complexity**: Managing component state is challenging

By creating a framework-agnostic, headless library, Ark UI allows developers to use the same component logic across different frameworks and styling systems.

## Pros

- **Complete Styling Freedom**: No predefined styles to override
- **Cross-Framework Usage**: Same API across React, Vue, and Solid
- **Accessibility Built-in**: WAI-ARIA compliant out of the box
- **Reliable State Management**: State machines ensure predictable behavior
- **Flexible APIs**: Both controlled and uncontrolled options
- **Zero Style Dependencies**: No CSS frameworks required
- **Composable Architecture**: Fine-grained control over component parts
- **Small Bundle Size**: Only the behavior without styling overhead

## Cons

- **More Initial Setup**: Requires you to implement all styling
- **Learning Curve**: Understanding the component API and state machines
- **Extra Development Time**: Creating styles from scratch takes time
- **Documentation Complexity**: Managing docs across multiple frameworks
- **Design System Integration**: Additional work to integrate with design systems
- **Limited Visual Guidance**: No default styling examples

## When to Use It

- When you need complete styling control
- For cross-framework projects (React, Vue, Solid)
- When accessibility is a top priority
- When building complex interactive components
- For custom design systems with unique visual language
- When you want to avoid styling methodology lock-in
- If you're using multiple styling approaches in one project

## When Not to Use It

- For rapid prototyping where styled components would be faster
- When you need a complete, styled UI kit
- If your team lacks design resources
- For projects with tight deadlines where styling from scratch is impractical
- When your team prefers opinionated component libraries

## Problems It Solves

1. **Framework Lock-in**: Works across multiple JavaScript frameworks
2. **Styling Methodology Lock-in**: Compatible with any styling approach
3. **Accessibility Implementation**: Provides accessible behaviors by default
4. **Complex Interaction States**: Manages interaction states reliably
5. **Component Consistency**: Same behavior across frameworks
6. **Design System Implementation**: Provides the behavior foundation for design systems

## What It's Best For

Ark UI excels in:

- Custom design systems with unique visual identity
- Cross-framework projects
- Applications requiring maximum styling flexibility
- Projects with strong accessibility requirements
- Complex interactive components (dropdowns, modals, etc.)
- Teams with dedicated design resources

## Comparison with Other Libraries

| Library     | Framework Support | Styling Approach | State Management | Component Parts       |
| ----------- | ----------------- | ---------------- | ---------------- | --------------------- |
| Ark UI      | React, Vue, Solid | Unstyled         | State machines   | Atomic parts          |
| Radix UI    | React-only        | Unstyled         | Custom hooks     | Compound components   |
| Headless UI | React, Vue        | Unstyled         | Simple state     | Monolithic components |
| React Aria  | React-only        | Unstyled         | React hooks      | Hook-based            |
| shadcn/ui   | React-only        | Tailwind CSS     | Based on Radix   | Compound components   |

## Framework Compatibility

Ark UI is designed to be framework-agnostic and currently supports:

- React
- Vue
- Solid

This makes it more flexible than React-only alternatives like Radix UI or React Aria.

## Getting Started

Installation depends on your framework:

```bash
# For React
npm install @ark-ui/react

# For Vue
npm install @ark-ui/vue

# For Solid
npm install @ark-ui/solid
```

## Example Usage (React)

```jsx
import { Dialog } from "@ark-ui/react";
import { styled } from "your-styling-solution";

// Style components with your preferred styling solution
const StyledOverlay = styled(Dialog.Backdrop)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled(Dialog.Content)`
  background: white;
  padding: 20px;
  border-radius: 4px;
`;

function App() {
  return (
    <Dialog>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Backdrop>
    </Dialog>
  );
}
```

## Resources

- [Official Website](https://ark-ui.com/)
- [GitHub Repository](https://github.com/ark-ui/ark)
- [Documentation](https://ark-ui.com/docs/react/overview/introduction)
- [Components](https://ark-ui.com/docs/react/components/accordion)
- [Examples](https://ark-ui.com/examples)
