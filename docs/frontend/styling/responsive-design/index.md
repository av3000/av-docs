# Responsive Web Design

Responsive web design (RWD) is an approach to web design that makes websites render well on various devices and window or screen sizes. It's essential for providing an optimal viewing experience across a wide range of devices, from desktop monitors to mobile phones.

## Examples

[Responsive Product List with grid, splashes, aspect ratio images](/av-docs/examples/responsive-design/)

## Core Principles

### 1. Fluid Layouts

Use relative units instead of fixed units to create layouts that adapt to different screen sizes:

- Percentages (`%`) for widths
- `em` or `rem` for typography and spacing
- `vw`, `vh`, `vmin`, and `vmax` for viewport-relative sizing

```css
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
```

### 2. Flexible Images and Media

Make media elements scale with their containers:

```css
img,
video,
canvas {
  max-width: 100%;
  height: auto;
}
```

### 3. Media Queries

Apply different styles based on device characteristics:

```css
/* Base styles for mobile */
.grid {
  display: grid;
  grid-template-columns: 1fr;
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

## Approaches to Responsive Design

### Mobile-First

<!-- (./mobile-first.md) -->

Start by designing for small screens and then progressively enhance for larger screens:

```css
/* Base styles for mobile devices */
.element {
  width: 100%;
}

/* Larger screens */
@media (min-width: 768px) {
  .element {
    width: 50%;
    float: left;
  }
}
```

Benefits:

- Forces focus on essential content and features
- Typically results in faster-loading websites
- Aligns with mobile usage trends

### Desktop-First

Start by designing for desktop screens and then adapt for smaller screens:

```css
/* Base styles for desktop */
.element {
  width: 50%;
  float: left;
}

/* Smaller screens */
@media (max-width: 767px) {
  .element {
    width: 100%;
    float: none;
  }
}
```

Benefits:

- Better suited for complex desktop interfaces
- May be easier for designers accustomed to desktop design
- Can provide a richer initial experience for desktop users

## Media Queries

### Media Query Basics

<!-- (./media-queries.md) -->

Media queries allow you to apply styles based on the device characteristics:

```css
@media [media-type] and ([media-feature]) {
  /* CSS rules */
}
```

#### Media Types

- `all` - All devices (default)
- `print` - Printers and print preview
- `screen` - Screens (computers, tablets, phones)
- `speech` - Screen readers

#### Media Features

- `width`, `min-width`, `max-width` - Viewport width
- `height`, `min-height`, `max-height` - Viewport height
- `orientation` - Portrait or landscape
- `aspect-ratio` - Width-to-height ratio
- `resolution` - Pixel density
- `prefers-color-scheme` - User color scheme preference
- `prefers-reduced-motion` - Motion preference

### Common Breakpoints

While breakpoints should be based on your content, common ranges include:

- **Small devices (phones)**: up to 576px
- **Medium devices (tablets)**: 577px to 991px
- **Large devices (laptops/desktops)**: 992px to 1199px
- **Extra large devices (large desktops)**: 1200px and above

```css
/* Extra small devices (phones) */
/* Base CSS */

/* Small devices (tablets) */
@media (min-width: 576px) {
}

/* Medium devices (laptops) */
@media (min-width: 768px) {
}

/* Large devices (desktops) */
@media (min-width: 992px) {
}

/* Extra large devices */
@media (min-width: 1200px) {
}
```

## Advanced Responsive Techniques

### Container Queries

<!-- (./container-queries.md) -->

Style elements based on the size of their container, not just the viewport:

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

### Viewport Units

<!-- (./viewport-units.md) -->

Size elements relative to the viewport:

- `vw` - 1% of viewport width
- `vh` - 1% of viewport height
- `vmin` - 1% of the smaller dimension
- `vmax` - 1% of the larger dimension

```css
.hero {
  height: 80vh;
  padding: 5vw;
}

.text {
  font-size: calc(16px + 2vw);
}
```

### Responsive Typography

Create fluid typography that scales smoothly:

```css
/* Static approach */
body {
  font-size: 16px;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}

/* Fluid approach */
body {
  font-size: calc(16px + 0.5vw);
}

/* Using clamp for bounded fluid sizing */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

### Art Direction

Different images for different screen sizes:

```html
<picture>
  <source srcset="large.jpg" media="(min-width: 1024px)" />
  <source srcset="medium.jpg" media="(min-width: 640px)" />
  <img src="small.jpg" alt="Description" />
</picture>
```

## Responsive UI Patterns

### Navigation Patterns

- **Toggle Menu**: Hidden behind a hamburger icon on mobile
- **Priority Plus**: Show most important items, collapse others
- **Responsive Mega Menu**: Adapts layout based on screen size

### Layout Patterns

- **Mostly Fluid**: Multi-column layout that stacks on small screens
- **Column Drop**: Columns stack vertically as viewport narrows
- **Layout Shifter**: Different layouts for different screen sizes
- **Off Canvas**: Content moves off-screen on small devices

## Testing Responsive Designs

### Tools for Testing

- **Browser Developer Tools**: Built-in responsive design mode
- **BrowserStack**: Test on real devices remotely
- **Responsively App**: View multiple screen sizes simultaneously
- **Lighthouse**: Performance and accessibility testing

### Testing Checklist

- Test on actual devices when possible
- Check all major breakpoints
- Test both orientations (portrait/landscape)
- Verify touch interactions work well
- Test with different connection speeds
- Validate accessibility across screen sizes

## Best Practices

1. **Design for content first**: Let content determine breakpoints
2. **Use relative units**: Prefer `em`, `rem`, and percentages over pixels
3. **Avoid fixed heights**: Allow content to determine element height
4. **Test on real devices**: Emulators can't replace real-world testing
5. **Consider loading performance**: Optimize assets for mobile connections
6. **Embrace progressive enhancement**: Start with core functionality
7. **Maintain accessibility**: Ensure all users can access content
8. **Use meta viewport tag**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
9. **Optimize touch targets**: Make buttons and links at least 44×44px
10. **Consider high-density displays**: Provide appropriate image resolutions

## Resources

- [MDN Responsive Design Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
- [Responsive Web Design Patterns](https://www.lukew.com/ff/entry.asp?1514)
- [The Complete Guide to Responsive Images](https://cloudinary.com/blog/responsive_images_guide)
- [A Book Apart: Responsive Web Design](https://abookapart.com/products/responsive-web-design)
