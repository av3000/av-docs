# CSS Layout

CSS layout is the foundation of web design, determining how elements are positioned and arranged on a page. Modern CSS provides several powerful layout techniques that have transformed how we structure web pages.

## Evolution of CSS Layout

### Traditional Layout Methods

- **Normal Flow**: The default document layout with block and inline elements
- **Float-based layouts**: Using `float` properties for multi-column designs
- **Table-based layouts**: Using HTML tables or CSS table properties
- **Positioning**: Using `position: relative`, `absolute`, `fixed` and `sticky`

### Modern Layout Methods

- **[Flexbox](./flexbox.md)**: One-dimensional layout method for arranging items in rows or columns
- **Grid**: Two-dimensional layout system for more complex designs
- **Positioning**: Advanced techniques for precise control over element placement
- **Multi-column Layout**: Newspaper-style column layouts

## Choosing the Right Layout Method

Each layout method has unique strengths and use cases:

| Layout Method    | Best For                                                  | Limitations           |
| ---------------- | --------------------------------------------------------- | --------------------- |
| **Flexbox**      | One-dimensional layouts, navigation menus, card layouts   | Complex grid systems  |
| **Grid**         | Two-dimensional layouts, page sections, complex alignment | Older browser support |
| **Positioning**  | UI elements, overlays, fixed elements                     | Full-page layouts     |
| **Multi-column** | Text-heavy content, magazine layouts                      | Interactive content   |

## Common Layout Patterns

### Holy Grail Layout

A classic layout pattern with header, footer, main content, and two sidebars:

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-area: header;
}
.nav {
  grid-area: nav;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

### Card Layout

A flexible grid of card components:

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;
  /* Card styling */
}
```

### Split Screen

Dividing the viewport into two sections:

```css
.split-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}
```

## Responsive Layout Strategies

### Media Queries

```css
.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

### Fluid Layouts

```css
.container {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}
```

### Mobile-First Approach

Start with styles for mobile devices and progressively enhance for larger screens:

```css
/* Base styles for mobile */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## Advanced Layout Techniques

### Subgrid

Allows grid items to use the parent grid's tracks:

```css
.parent {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}

.child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid;
}
```

### Aspect Ratio

Maintain element proportions:

```css
.element {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

### Container Queries

Style elements based on their container's size:

```css
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .child {
    font-size: 1.5rem;
  }
}
```

## Browser Support and Fallbacks

When using modern layout techniques, consider providing fallbacks for older browsers:

```css
/* Fallback for older browsers */
.container {
  overflow: hidden;
}
.item {
  float: left;
  width: 33.333%;
}

/* Modern layout */
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .item {
    float: none;
    width: auto;
  }
}
```

## Best Practices

1. **Choose the right tool for the job**: Select a layout method based on your specific requirements
2. **Start with semantic HTML**: Good layout begins with well-structured content
3. **Design for mobile first**: Begin with simple layouts for small screens
4. **Use relative units**: Employ percentages, em, rem for fluid layouts
5. **Test across devices**: Verify that layouts work on various screen sizes
6. **Avoid fixed heights**: Let content determine height whenever possible
7. **Mind accessibility**: Ensure layouts work with zooming and screen readers

Explore each layout method in detail through the links above to master modern CSS layout techniques.
