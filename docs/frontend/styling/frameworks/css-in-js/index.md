## Implementation Approaches

### Runtime Styling

Traditional CSS-in-JS libraries generate and inject styles at runtime:

- **Pros**: Fully dynamic, supports all CSS features, adapts to changing props
- **Cons**: Runtime performance cost, increases bundle size, may cause flash of unstyled content, SSR hydration challenges

Most first-generation libraries like styled-components and Emotion use this approach by default.

### Static Extraction (Zero-Runtime)

Modern CSS-in-JS solutions extract styles at build time:

- **Pros**: Better runtime performance, no style recalculation, smaller JS bundle
- **Cons**: Less dynamic, may not support all dynamic styling features

StyleX, vanilla-extract, Linaria, and Panda CSS follow this approach.

## The Evolution of CSS-in-JS

### First Generation Challenges

Runtime CSS-in-JS libraries face several challenges that have led to the industry shift:

1. **Performance Issues**:

   - JavaScript overhead during rendering
   - Style recalculation on prop changes
   - Increased bundle size
   - Style tag injection causing layout thrashing

2. **Server-Side Rendering Complications**:

   - Complex style extraction process
   - Hydration mismatches
   - Flash of unstyled content
   - Extra JavaScript for rehydration

3. **React Concurrent Rendering Incompatibility**:
   - Style injection during rendering can conflict with concurrent mode
   - Potential for inconsistent UI states when rendering is interrupted

As Sam Magura, a styled-components maintainer, noted:

> "The primary reason [we're moving away from CSS-in-JS] is performance. CSS-in-JS libraries have a runtime cost... and as your application grows, this cost becomes increasingly noticeable."

### The Rise of Build-Time Solutions

In response to these challenges, the industry has moved toward zero-runtime solutions:

1. **Atomic CSS Generation**: StyleX, Panda CSS
2. **Static CSS Extraction**: vanilla-extract, Linaria
3. **Hybrid Approaches**: Tamagui, Tokenami

These newer approaches maintain the developer experience benefits of CSS-in-JS while eliminating the runtime overhead.

### Current Trends

According to the [2023 State of CSS survey](https://2023.stateofcss.com/en-US/technologies/css-in-js/):

- Tailwind CSS shows the highest satisfaction and usage growth
- Zero-runtime CSS-in-JS solutions are gaining traction
- Traditional CSS-in-JS libraries still have significant usage but decreasing growth

## Advantages of CSS-in-JS

1. **Scoped styles**: Eliminates global namespace conflicts
2. **Dynamic styling**: Easily change styles based on props and state
3. **Colocated code**: Keep related code together
4. **Dead code elimination**: Unused styles aren't included
5. **TypeScript integration**: Better type safety for styling
6. **Theming**: Consistent theming across components
7. **Conditional styling**: Apply styles based on logic
8. **Unit testing**: Test styling along with component behavior

## Challenges and Considerations

### Performance

Runtime CSS-in-JS can impact performance:

- Style recalculation on prop changes
- Increased JS bundle size
- Initial rendering overhead

Consider zero-runtime or static extraction approaches for performance-critical applications.

### Learning Curve

Developers familiar with traditional CSS need to adapt to:

- New styling syntax and patterns
- Different debugging approaches
- Library-specific APIs

### Server-Side Rendering

Extra setup is required for SSR to:

- Extract and include critical CSS
- Avoid styling mismatches during hydration
- Manage style extraction during the build process

### Tooling Support

Some CSS-in-JS challenges include:

- Less robust browser dev tools integration
- More complex setup for build tools
- Potential conflicts with other CSS methodologies

## When Different Approaches Make Sense

### Runtime CSS-in-JS (styled-components, Emotion)

Best for:

- Smaller applications
- Teams familiar with these libraries
- Projects where dynamic styling is more important than raw performance
- Applications with less concern for SSR performance

### Zero-Runtime CSS-in-JS (StyleX, vanilla-extract)

Best for:

- Performance-critical applications
- Projects using SSR or React Server Components
- Teams that want CSS-in-JS DX without runtime cost
- Large-scale applications where bundle size matters

### Utility-First CSS (Tailwind)

Best for:

- Teams that prefer direct HTML classes
- Projects prioritizing performance
- Design systems with strict constraints
- Rapid development workflows

### CSS Modules

Best for:

- Teams more comfortable with traditional CSS
- Projects needing scoped styles without JavaScript overhead
- Simpler applications with less dynamic styling needs

## Resources

- [CSS-in-JS to CSS-on-CSS](https://frontendmastery.com/posts/the-evolution-of-scalable-css/)
- [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)
- [The State of CSS 2023 Survey](https://2023.stateofcss.com/en-US/)
- [The Cost of CSS-in-JS](https://dev.to/srmagura/the-cost-of-css-in-js-5eck)
- [CSS-in-JS Benchmarks](https://github.com/A-gambit/CSS-IN-JS-Benchmarks)
- [The CSS-in-JS Spectrum](https://css-tricks.com/a-thorough-analysis-of-css-in-js/)
- [Is CSS-in-JS Actually Bad?](https://web.dev/articles/css-in-js)
- [CSS in JS: The Argument Refined](https://chriscoyier.net/2023/05/10/css-in-js-the-argument-refined/)
- [Building a Design System with CSS-in-JS](https://medium.com/styled-components/building-a-design-system-with-css-in-js-446ad41e4ce9)

# CSS-in-JS

CSS-in-JS refers to a pattern where CSS is composed using JavaScript instead of defined in external files. This approach allows for dynamic styling with the full power of JavaScript, scoped styles, and better integration with component-based architectures.

## The Evolution of CSS-in-JS

The CSS-in-JS landscape has evolved significantly since its introduction:

### First Generation (Runtime)

- **styled-components**: Component-based API with template literals
- **Emotion**: Flexible API with string or object styles
- **JSS**: Object-oriented approach to CSS definition

### Next Generation (Zero-Runtime)

- **[StyleX](./stylex.md)**: Meta's atomic CSS-in-JS with compile-time generation
- **[vanilla-extract](https://vanilla-extract.style/)**: TypeScript-first, zero-runtime CSS
- **[Linaria](https://linaria.dev/)**: Zero-runtime CSS-in-JS
- **[Tamagui](https://tamagui.dev/)**: React Native + Web universal styling with compile-time optimizations
- **[Panda CSS](./panda-css.md)**: Zero-runtime CSS-in-JS with design tokens and atomic CSS from the Chakra UI team
- **[Tokenami](https://tokenami.com/)**: Token-focused CSS-in-JS with static extraction

### Industry Shift

As Mark Dalgleish, creator of CSS Modules and vanilla-extract, noted:

> "Our industry has been on a decade long journey from CSS to CSS-in-JS, then back to CSS but with a much deeper understanding of the problems we need CSS to solve."

The trend is moving away from runtime solutions towards zero-runtime approaches that generate CSS at build time for improved performance.

## Key Concepts

### Component-Scoped Styles

CSS-in-JS typically scopes styles to specific components, avoiding global namespace collisions:

```jsx
// Using styled-components
const Button = styled.button`
  background-color: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
`;

// Usage
<Button primary>Click Me</Button>;
```

### Dynamic Styling

Styles can be computed based on props or state:

```jsx
const Text = styled.span`
  font-size: ${(props) => props.size || "16px"};
  color: ${(props) => (props.error ? "red" : "black")};
`;
```

### Colocated Styles

Styles are defined alongside the components that use them, making code organization more intuitive:

```jsx
// Everything related to the component is in one place
function Card({ title, content, highlight }) {
  return (
    <CardContainer highlight={highlight}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-color: ${(props) => (props.highlight ? "#ffcc00" : "#ddd")};
  border-radius: 4px;
  padding: 16px;
`;

const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
`;

const CardContent = styled.div`
  font-size: 16px;
`;
```

## Popular CSS-in-JS Libraries

### [Styled Components](./styled-components.md)

A popular library that uses tagged template literals to style components:

````jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;

  &:hover {
    background-color: #2980b9;
  }

  ${props => props.secondary && `
    background-color: white;
    color: #3498db;
    border: 1px solid #3498db;
  `}
`;

// Key features:
// - Full CSS syntax within template literals
// - Automatic vendor prefixing
// - Automatic critical CSS extraction
// - Theming support
// - Server-side rendering compatibility

### [Emotion](./emotion.md)

A highly flexible library with multiple APIs for styling:

```jsx
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Object style
const boxStyles = css({
  padding: 16,
  backgroundColor: '#f9f9f9',
  borderRadius: 4
});

// String style
const textStyles = css`
  font-size: 18px;
  color: #333;
`;

// Styled components API
const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
`;

// Usage
function Component() {
  return (
    <div css={boxStyles}>
      <p css={textStyles}>Styled text</p>
      <Button>Click me</Button>
    </div>
  );
}
````

### [JSS](./jss.md)

A more object-oriented approach to defining styles:

```jsx
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    "&:hover": {
      color: "blue",
    },
  },
  "@media (max-width: 768px)": {
    container: {
      flexDirection: "column",
    },
    title: {
      fontSize: 18,
    },
  },
});

function Component() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Title</h2>
    </div>
  );
}
```

### [Stitches](./stitches.md)

A CSS-in-JS library with a focus on performance and developer experience:

```jsx
import { styled, createStitches } from "@stitches/react";

const { theme } = createStitches({
  theme: {
    colors: {
      primary: "#3498db",
      text: "#333",
      background: "white",
    },
    space: {
      sm: "8px",
      md: "16px",
      lg: "24px",
    },
  },
});

const Button = styled("button", {
  backgroundColor: "$primary",
  color: "white",
  padding: "$sm $md",
  borderRadius: "4px",

  variants: {
    size: {
      small: { fontSize: "14px" },
      large: { fontSize: "18px" },
    },
    ghost: {
      true: {
        backgroundColor: "transparent",
        color: "$primary",
        border: "1px solid $primary",
      },
    },
  },
});

// Usage
<Button size="large" ghost>
  Click me
</Button>;
```

## Implementation Approaches

CSS-in-JS libraries typically use one of these approaches to apply styles:

### Runtime Styling

Styles are generated and injected into the DOM at runtime:

- **Pros**: Fully dynamic, supports all CSS features, adapts to changing props
- **Cons**: Runtime performance cost, increases bundle size, may cause flash of unstyled content

Most styled-components and Emotion implementations use this approach by default.

### Static Extraction

Styles are extracted at build time and included as static CSS:

- **Pros**: Better runtime performance, no style recalculation, smaller JS bundle
- **Cons**: Less dynamic, may not support all dynamic styling features

Libraries like Linaria and newer versions of Styled Components with the Babel plugin use this approach.

### Zero-Runtime

A newer trend that completely eliminates runtime style generation:

- **Pros**: Optimal performance, no runtime overhead, works with SSR without hydration
- **Cons**: More limited feature set, complex setup

Libraries like vanilla-extract and Compiled.js follow this approach.

## Advantages of CSS-in-JS

1. **Scoped styles**: Eliminates global namespace conflicts
2. **Dynamic styling**: Easily change styles based on props and state
3. **Colocated code**: Keep related code together
4. **Dead code elimination**: Unused styles aren't included
5. **TypeScript integration**: Better type safety for styling
6. **Theming**: Consistent theming across components
7. **Conditional styling**: Apply styles based on logic
8. **Unit testing**: Test styling along with component behavior

## Challenges and Considerations

### Performance

Runtime CSS-in-JS can impact performance:

- Style recalculation on prop changes
- Increased JS bundle size
- Initial rendering overhead

Consider zero-runtime or static extraction approaches for performance-critical applications.

### Learning Curve

Developers familiar with traditional CSS need to adapt to:

- New styling syntax and patterns
- Different debugging approaches
- Library-specific APIs

### Server-Side Rendering

Extra setup is required for SSR to:

- Extract and include critical CSS
- Avoid styling mismatches during hydration
- Manage style extraction during the build process

### Tooling Support

Some CSS-in-JS challenges include:

- Less robust browser dev tools integration
- More complex setup for build tools
- Potential conflicts with other CSS methodologies

## Best Practices

1. **Choose the right library**: Consider performance needs, features, and team familiarity
2. **Create a design system**: Define reusable components and design tokens
3. **Use composition**: Compose styles from smaller, reusable pieces
4. **Avoid style nesting**: Keep styles flat when possible
5. **Consider build-time extraction**: For performance-critical applications
6. **Document your patterns**: Create style guides for your team
7. **Be mindful of bundle size**: Monitor the impact on your application size

## When to Use CSS-in-JS

CSS-in-JS is well-suited for:

- **Component-based architectures**: React, Vue, Angular
- **Dynamic UI applications**: Apps with highly interactive interfaces
- **Design systems**: Creating consistent, themeable component libraries
- **Micro-frontends**: Avoiding style conflicts between different parts of an application

Consider other approaches when:

- **Performance is critical**: Static sites, content-heavy pages
- **Team is more familiar with traditional CSS**: Consider CSS Modules instead
- **Project has minimal dynamic styling needs**: Traditional CSS may be simpler

## Resources

- [CSS-in-JS Benchmarks](https://github.com/A-gambit/CSS-IN-JS-Benchmarks)
- [The State of CSS 2023 Survey](https://2023.stateofcss.com/en-US/technologies/css-in-js/)
- [Building a Design System with CSS-in-JS](https://medium.com/styled-components/building-a-design-system-with-css-in-js-446ad41e4ce9)
- [The styled-components documentation](https://styled-components.com/docs)
- [Emotion documentation](https://emotion.sh/docs/introduction)
- [React: CSS-in-JS by Christopher Chedeau](https://speakerdeck.com/vjeux/react-css-in-js)
