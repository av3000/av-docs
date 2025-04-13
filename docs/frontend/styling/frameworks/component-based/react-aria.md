# React Aria

React Aria is a library of React Hooks that provides accessible UI primitives for building inclusive design systems and web applications.

## What is React Aria?

React Aria is a collection of React Hooks that implement behavior and accessibility for UI components according to the WAI-ARIA design patterns. Created by Adobe, it's part of the larger React Spectrum library but can be used independently to build custom components with robust accessibility support.

React Aria takes a unique approach compared to other UI libraries by focusing on behavior and accessibility through composable React Hooks rather than pre-built components or styling.

## Key Features

- **Hook-based API**: Implements UI patterns as composable React Hooks
- **Accessibility First**: Comprehensive WAI-ARIA implementation
- **Internationalization**: Built-in i18n support
- **Device Adaptation**: Adapts to mouse, touch, and keyboard interactions
- **Customizable Behavior**: Fine-grained control over component behavior
- **TypeScript Support**: Fully typed API
- **Virtual Event System**: Normalized across browsers and input methods
- **Focus Management**: Robust focus handling for complex components
- **Zero Styling**: No styles or design opinions
- **SSR Support**: Works with server-side rendering

## Why It Emerged

React Aria emerged to solve several challenges in building accessible UI components:

1. **Accessibility Complexity**: Making truly accessible components is difficult
2. **Behavior Reuse**: Duplicating complex behavior across projects
3. **Input Method Differences**: Handling mouse, touch, and keyboard consistently
4. **International Support**: Building components that work globally
5. **Design System Flexibility**: Enabling custom visual design with consistent behavior

By providing behavior as hooks, React Aria lets developers focus on styling and composition while ensuring accessibility and proper behavior.

## Pros

- **Accessibility Excellence**: Industry-leading accessibility implementation
- **Complete Styling Freedom**: No styling to override
- **Fine-grained Control**: Use only the hooks you need
- **Device Adaptation**: Works across input methods and devices
- **International Support**: Built for global applications
- **Enterprise Backing**: Developed and maintained by Adobe
- **Extensive Testing**: Tested with screen readers and assistive technologies
- **Documentation Quality**: Detailed technical documentation and examples

## Cons

- **React-Only**: Not available for other frameworks
- **Learning Curve**: Hook composition model is different from component-based libraries
- **Verbosity**: More boilerplate compared to component libraries
- **Documentation Density**: Technical documentation can be overwhelming
- **Development Time**: More setup than pre-styled components
- **Community Size**: Smaller community compared to some alternatives

## When to Use It

- When building a custom design system from scratch
- When accessibility is non-negotiable
- When you need complete styling freedom
- For complex interactive components (date pickers, combo boxes, etc.)
- When supporting international users
- For applications that must work across devices and input methods
- When your team has design resources but needs behavior implementation
- For enterprise applications with strict accessibility requirements

## When Not to Use It

- For rapid prototyping where styled components would be faster
- If you're not using React
- When you need a complete, styled UI kit
- For projects with tight deadlines where hook composition takes too much time
- If your team prefers a more traditional component-based approach
- When you need a framework-agnostic solution

## Problems It Solves

1. **Accessibility Implementation**: Ensures components meet WCAG standards
2. **Input Method Handling**: Normalizes behavior across mouse, touch, and keyboard
3. **Internationalization**: Handles RTL languages, date formatting, etc.
4. **Focus Management**: Implements proper focus handling for complex components
5. **State Management**: Manages component state with proper ARIA attributes
6. **Behavior Consistency**: Ensures components behave consistently

## What It's Best For

React Aria excels in:

- Enterprise-grade applications with strict accessibility requirements
- Custom design systems with unique visual identity
- Applications supporting international users
- Cross-device applications
- Complex interactive components (data grids, date pickers, etc.)
- Teams with strong design resources that need behavior implementation

## Comparison with Other Libraries

| Library     | API Style       | Framework Support | Focus Area                  | Component Structure |
| ----------- | --------------- | ----------------- | --------------------------- | ------------------- |
| React Aria  | Hook-based      | React-only        | Accessibility & behavior    | Custom composition  |
| Radix UI    | Component-based | React-only        | Accessibility & composition | Compound components |
| Headless UI | Component-based | React, Vue        | Tailwind integration        | Simple components   |
| Ark UI      | Component-based | React, Vue, Solid | Framework-agnostic          | Atomic parts        |
| shadcn/ui   | Component-based | React-only        | Developer experience        | Based on Radix      |

## Framework Compatibility

React Aria is specifically designed for React applications. It is not framework-agnostic and works exclusively with:

- React
- Next.js
- Remix
- Any React-based framework

For other frameworks, alternatives would be needed.

## Getting Started

```bash
# Install specific collections
npm install @react-aria/button @react-aria/dialog

# Or install core packages
npm install react-aria
```

## Example Usage

```jsx
import { useButton } from "@react-aria/button";
import { useState, useRef } from "react";

function Button(props) {
  const { children, onPress } = props;
  const ref = useRef();
  const [isPressed, setPressed] = useState(false);

  // useButton provides the behavior and accessibility attributes
  const { buttonProps } = useButton(
    {
      onPress,
      isPressed,
      onPressStart: () => setPressed(true),
      onPressEnd: () => setPressed(false),
      // Additional options like isDisabled could be added
    },
    ref
  );

  // You provide the styling
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`my-button ${isPressed ? "pressed" : ""}`}
    >
      {children}
    </button>
  );
}
```

## Complex Component Example

```jsx
import { useDialog } from "@react-aria/dialog";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { useRef } from "react";
import { FocusScope } from "@react-aria/focus";

function Dialog(props) {
  const { title, children, isOpen, onClose } = props;

  // Handle clicking outside the dialog and pressing Escape to close
  const ref = useRef();
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable: true,
    },
    ref
  );

  // Prevent scrolling while the modal is open
  usePreventScroll({ isDisabled: !isOpen });

  // Make the modal dialog accessible
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog({}, ref);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <FocusScope contain autoFocus restoreFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          className="dialog"
        >
          <h3 {...titleProps}>{title}</h3>
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </FocusScope>
    </div>
  );
}
```

## Resources

- [Official Website](https://react-spectrum.adobe.com/react-aria/)
- [GitHub Repository](https://github.com/adobe/react-spectrum/tree/main/packages/react-aria)
- [Documentation](https://react-spectrum.adobe.com/react-aria/index.html)
- [Hooks API](https://react-spectrum.adobe.com/react-aria/hooks.html)
- [Examples](https://react-spectrum.adobe.com/react-aria/examples.html)
