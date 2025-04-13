# BEM (Block Element Modifier)

BEM is a naming convention methodology for CSS classes that creates clear, strict relationships between HTML and CSS. The name BEM stands for Block, Element, Modifier, which are the three core components of this approach.

## Core Concepts

### Block

A standalone entity that is meaningful on its own. Examples include:

- Header
- Menu
- Button
- Form

```css
.button {
}
.header {
}
.menu {
}
```

### Element

A part of a block that has no standalone meaning and is semantically tied to its block. Elements are denoted by two underscores (`__`). Examples include:

- Menu item
- List item
- Header title

```css
.menu__item {
}
.button__icon {
}
.form__input {
}
```

### Modifier

A flag on a block or element that changes appearance or behavior. Modifiers are denoted by two hyphens (`--`). Examples include:

- Disabled
- Highlighted
- Size variation

```css
.button--primary {
}
.menu__item--active {
}
.form__input--disabled {
}
```

## Syntax

```css
/* Block */
.block {
}

/* Element */
.block__element {
}

/* Modifier on Block */
.block--modifier {
}

/* Modifier on Element */
.block__element--modifier {
}
```

## Example

```html
<button class="button button--primary">
  <span class="button__icon button__icon--large"></span>
  Submit
</button>
```

```css
.button {
  padding: 10px 15px;
  border-radius: 3px;
  background-color: #e0e0e0;
}

.button--primary {
  background-color: #0066cc;
  color: white;
}

.button__icon {
  margin-right: 5px;
  width: 16px;
  height: 16px;
}

.button__icon--large {
  width: 24px;
  height: 24px;
}
```

## Benefits of BEM

1. **Clear structure**: The naming convention clearly communicates the purpose of each class.
2. **Modularity**: Encourages creating self-contained components that can be reused.
3. **Reduced specificity issues**: Flat class structure avoids specificity wars.
4. **Improved collaboration**: Makes CSS more predictable and easier for teams to work with.
5. **Better maintainability**: Classes are easier to understand, update, and extend.

## Best Practices

- Keep block names short but descriptive
- Avoid excessive nesting of elements (stick to 1-2 levels)
- Use modifiers for variations, not for creating new blocks
- Consider using utility classes alongside BEM for common behaviors
- Combine with preprocessors to reduce class name repetition

## Common Mistakes

1. **Excessive nesting**:

   ```css
   /* Avoid this */
   .block__element1__element2 {
   }

   /* Better approach */
   .block__element1 {
   }
   .block__element2 {
   }
   ```

2. **Inconsistent naming**:

   ```css
   /* Avoid mixing conventions */
   .block__element--modifier {
   }
   .block-element--modifier {
   }
   ```

3. **Creating overly-specific elements**:

   ```css
   /* Avoid */
   .form__submit-button__icon {
   }

   /* Better */
   .form__submit-button {
   }
   .button__icon {
   }
   ```

## When to Use BEM

BEM is particularly well-suited for:

- Medium to large projects
- Teams with multiple developers
- Component-based architectures
- Projects requiring clear CSS namespacing

## Resources

- [Official BEM Documentation](https://en.bem.info/)
- [Get BEM](http://getbem.com/)
- [BEM by Example](https://sparkbox.com/foundry/bem_by_example)
- [BEM 101 on CSS-Tricks](https://css-tricks.com/bem-101/)
