# OOCSS (Object-Oriented CSS)

Object-Oriented CSS (OOCSS) is a CSS methodology focused on creating reusable, scalable, and more maintainable stylesheets by applying object-oriented programming principles to CSS development. Developed by Nicole Sullivan around 2008, OOCSS aims to reduce redundancy and increase modularity in CSS.

## Core Principles

### 1. Separation of Structure and Skin

Separate the structure (width, height, margins, padding, overflow) from the skin (visual features like colors, fonts, shadows, gradients):

**Before OOCSS:**

```css
.button-green {
  width: 100px;
  height: 40px;
  padding: 10px;
  border: 1px solid #9eb25d;
  background-color: #9eb25d;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.box-red {
  width: 200px;
  padding: 10px;
  border: 1px solid #dd3030;
  background-color: #dd3030;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
```

**After OOCSS:**

```css
/* Structure */
.button {
  width: 100px;
  height: 40px;
  padding: 10px;
}

.box {
  width: 200px;
  padding: 10px;
}

/* Skin */
.skin-green {
  border: 1px solid #9eb25d;
  background-color: #9eb25d;
  color: #fff;
}

.skin-red {
  border: 1px solid #dd3030;
  background-color: #dd3030;
  color: #fff;
}

.rounded {
  border-radius: 5px;
}

.shadowed {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
```

Usage in HTML:

```html
<button class="button skin-green rounded shadowed">Green Button</button>
<div class="box skin-red rounded shadowed">Red Box</div>
```

### 2. Separation of Containers and Content

Content elements should look the same regardless of their container:

**Before OOCSS:**

```css
.sidebar h2 {
  font-size: 18px;
  color: #333;
  line-height: 1.5;
}

.footer h2 {
  font-size: 18px;
  color: #333;
  line-height: 1.5;
}
```

**After OOCSS:**

```css
.heading {
  font-size: 18px;
  color: #333;
  line-height: 1.5;
}
```

Usage in HTML:

```html
<div class="sidebar">
  <h2 class="heading">Sidebar Title</h2>
</div>
<div class="footer">
  <h2 class="heading">Footer Title</h2>
</div>
```

## Benefits of OOCSS

1. **Reduced CSS size**: Eliminates redundant code by creating reusable patterns
2. **Improved performance**: Smaller CSS files, fewer style recalculations
3. **Better maintainability**: Changes can be made in one place and applied across the site
4. **Consistent UI**: Encourages consistency in design patterns
5. **Easier collaboration**: Team members can understand and work with standardized modules

## Common OOCSS Patterns

### Media Object

One of the most famous OOCSS patterns is the Media Object, which handles an image or media on one side and text on the other:

```css
.media {
  display: flex;
  align-items: flex-start;
}

.media__image {
  margin-right: 10px;
}

.media__content {
  flex: 1;
}
```

Usage:

```html
<div class="media">
  <img class="media__image" src="profile.jpg" alt="User profile" />
  <div class="media__content">
    <h3>User Name</h3>
    <p>User description or message goes here...</p>
  </div>
</div>
```

### Flag Object

Similar to the Media Object but with vertical alignment options:

```css
.flag {
  display: flex;
  align-items: center; /* Middle alignment by default */
}

.flag--top {
  align-items: flex-start;
}

.flag--bottom {
  align-items: flex-end;
}

.flag__image {
  margin-right: 10px;
}

.flag__content {
  flex: 1;
}
```

## Implementation Strategies

1. **Start with base objects**: Identify common patterns in your design
2. **Extract repeated styles**: Look for visual patterns that can be reused
3. **Name descriptively**: Use names based on function, not appearance
4. **Avoid contextual styles**: Minimize styles based on location
5. **Create theme classes**: Group visual styles that are used together

## OOCSS vs. Other Methodologies

| Methodology    | Focus                                 | Naming Convention          | Complexity  |
| -------------- | ------------------------------------- | -------------------------- | ----------- |
| **OOCSS**      | Reusability, separation of concerns   | Functional, descriptive    | Medium      |
| **BEM**        | Component-based, strict relationships | Block\_\_Element--Modifier | Medium-High |
| **SMACSS**     | Categorization, organization          | Categorized prefixes       | Medium      |
| **Atomic CSS** | Single-purpose classes                | Functional abbreviations   | Low         |

## Limitations and Considerations

- **Multiple classes in HTML**: Can make the HTML more verbose
- **Learning curve**: Team needs to understand and follow the pattern
- **Balancing granularity**: Too many small classes can become hard to manage
- **Finding the right abstractions**: Identifying reusable patterns requires experience

## Best Practices

1. **Don't go overboard with abstraction**: Create objects that have clear utility
2. **Document your objects**: Create a style guide for team reference
3. **Be consistent**: Use the same patterns throughout your project
4. **Balance flexibility and specificity**: Too generic can lead to excessive overrides
5. **Combine with other methodologies**: OOCSS principles can complement BEM or SMACSS

## Resources

- [Nicole Sullivan's Original OOCSS Presentation](https://www.slideshare.net/stubbornella/object-oriented-css)
- [OOCSS on GitHub](https://github.com/stubbornella/oocss/wiki)
- [The Media Object Saves Hundreds of Lines of Code](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
- [An Introduction To Object Oriented CSS (OOCSS) - Smashing Magazine](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
- [OOCSS + Sass = ❤️ - CSS-Tricks](https://css-tricks.com/oocss-sass-feeling-superficial/)
