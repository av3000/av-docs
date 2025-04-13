# Flexbox

Flexbox (Flexible Box Layout) is a one-dimensional layout method designed for arranging items in rows or columns. It provides a more efficient way to distribute space and align items, even when their size is unknown or dynamic.

## Core Concepts

### Flex Container and Flex Items

The flex container is the element with `display: flex` or `display: inline-flex`. Its direct children automatically become flex items.

```css
.container {
  display: flex; /* or inline-flex */
}
```

### Main Axis and Cross Axis

Flexbox operates on two axes:

- **Main axis**: The primary axis along which flex items are placed (horizontal by default)
- **Cross axis**: Perpendicular to the main axis (vertical by default)

## Container Properties

### flex-direction

Establishes the main axis:

```css
.container {
  flex-direction: row; /* default - left to right */
  /* flex-direction: row-reverse; */ /* right to left */
  /* flex-direction: column; */ /* top to bottom */
  /* flex-direction: column-reverse; */ /* bottom to top */
}
```

### flex-wrap

Controls whether items can wrap onto multiple lines:

```css
.container {
  flex-wrap: nowrap; /* default - all items on one line */
  /* flex-wrap: wrap; */ /* items wrap onto multiple lines */
  /* flex-wrap: wrap-reverse; */ /* items wrap onto multiple lines in reverse */
}
```

### flex-flow

Shorthand for `flex-direction` and `flex-wrap`:

```css
.container {
  flex-flow: row nowrap; /* default */
  /* flex-flow: column wrap; */
}
```

### justify-content

Aligns items along the main axis:

```css
.container {
  justify-content: flex-start; /* default - items packed toward start */
  /* justify-content: flex-end; */ /* items packed toward end */
  /* justify-content: center; */ /* items centered */
  /* justify-content: space-between; */ /* items evenly distributed; first at start, last at end */
  /* justify-content: space-around; */ /* items evenly distributed with equal space around */
  /* justify-content: space-evenly; */ /* items evenly distributed with equal space between */
}
```

### align-items

Aligns items along the cross axis:

```css
.container {
  align-items: stretch; /* default - items stretched to fill container */
  /* align-items: flex-start; */ /* items aligned to start of cross axis */
  /* align-items: flex-end; */ /* items aligned to end of cross axis */
  /* align-items: center; */ /* items centered on cross axis */
  /* align-items: baseline; */ /* items aligned by their baselines */
}
```

### align-content

Aligns multiple lines of content along the cross axis (only works with wrapping):

```css
.container {
  align-content: normal; /* default */
  /* align-content: flex-start; */ /* lines packed to start */
  /* align-content: flex-end; */ /* lines packed to end */
  /* align-content: center; */ /* lines packed to center */
  /* align-content: space-between; */ /* lines evenly distributed; first at start, last at end */
  /* align-content: space-around; */ /* lines evenly distributed with equal space around */
  /* align-content: space-evenly; */ /* lines evenly distributed with equal space between */
  /* align-content: stretch; */ /* lines stretched to fill container */
}
```

### gap, row-gap, column-gap

Creates space between flex items:

```css
.container {
  gap: 20px; /* gap between all items */
  /* row-gap: 20px; */ /* gap between rows */
  /* column-gap: 20px; */ /* gap between columns */
}
```

## Item Properties

### order

Controls the order in which items appear:

```css
.item {
  order: 0; /* default */
  /* order: 1; */ /* appears after items with lower order */
  /* order: -1; */ /* appears before items with higher order */
}
```

### flex-grow

Determines how much an item can grow relative to others:

```css
.item {
  flex-grow: 0; /* default - does not grow */
  /* flex-grow: 1; */ /* can grow equally with other items */
  /* flex-grow: 2; */ /* can grow twice as much as items with flex-grow: 1 */
}
```

### flex-shrink

Determines how much an item can shrink relative to others:

```css
.item {
  flex-shrink: 1; /* default - can shrink equally with other items */
  /* flex-shrink: 0; */ /* cannot shrink */
  /* flex-shrink: 2; */ /* can shrink twice as much as others */
}
```

### flex-basis

Sets the initial main size of an item:

```css
.item {
  flex-basis: auto; /* default - based on content */
  /* flex-basis: 0; */ /* based entirely on flex-grow */
  /* flex-basis: 200px; */ /* specific starting size */
}
```

### flex

Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`:

```css
.item {
  flex: 0 1 auto; /* default */
  /* flex: 1; */ /* 1 0 0% - can grow, cannot shrink, starts at 0 */
  /* flex: auto; */ /* 1 1 auto - can grow, can shrink, starts at content size */
  /* flex: none; */ /* 0 0 auto - cannot grow, cannot shrink, starts at content size */
}
```

Common presets:

- `flex: 1` - flexible item that can grow
- `flex: auto` - flexible item that considers content size
- `flex: none` - inflexible item

### align-self

Overrides the `align-items` value for specific items:

```css
.item {
  align-self: auto; /* default - follows container's align-items */
  /* align-self: flex-start; */ /* aligned to start of cross axis */
  /* align-self: flex-end; */ /* aligned to end of cross axis */
  /* align-self: center; */ /* centered on cross axis */
  /* align-self: baseline; */ /* aligned by baseline */
  /* align-self: stretch; */ /* stretched to fill cross axis */
}
```

## Common Use Cases

### Centering Content

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* For vertical centering */
}
```

### Navigation Bar

```css
.navbar {
  display: flex;
  justify-content: space-between; /* Logo on left, links on right */
}

.nav-links {
  display: flex;
  gap: 20px;
}
```

### Card Layout

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, basis */
  /* Card styling */
}
```

### Holy Grail Layout

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header,
.footer {
  flex: 0 0 auto;
}

.main-content {
  display: flex;
  flex: 1 0 auto;
}

.sidebar-left,
.sidebar-right {
  flex: 0 0 200px;
}

.content {
  flex: 1 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar-left,
  .sidebar-right {
    flex: 0 0 auto;
  }
}
```

## Tips and Tricks

### Equal-Width Columns

```css
.columns {
  display: flex;
}

.column {
  flex: 1;
}
```

### Sticky Footer

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}
```

### Vertical Centering

```css
.container {
  display: flex;
  align-items: center;
  min-height: 100vh;
}
```

### Last Item Push Right

```css
.toolbar {
  display: flex;
}

.spacer {
  flex: 1;
}

.logout-button {
  /* Will be pushed to the right */
}
```

## Browser Support

Flexbox is supported in all modern browsers. For older browsers (like IE10), some features may be partially supported or require prefixes. Consider using a tool like Autoprefixer to add necessary vendor prefixes.

## Resources

- [MDN Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- [CSS-Tricks Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Interactive learning game
- [Flexbox Defense](http://www.flexboxdefense.com/) - Another learning game
- [Flexbox Cheatsheet](https://yoksel.github.io/flex-cheatsheet/) - Visual reference
