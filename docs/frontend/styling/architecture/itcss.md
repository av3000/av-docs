# ITCSS

https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/

https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528

https://jonassebastianohlsson.com/specificity-graph/
https://www.youtube.com/watch?v=1OKZOV-iLj4&ab_channel=DaFED - Harry Roberts - Managing CSS Projects with ITCSS.

Inverted Triangle CSS. It helps you organize your project CSS files in such a way that you can better deal with CSS specifics like global namespace, cascade and selectors specificity.

You can use ITCSS with preprocessors or without them and it is compatible with CSS methodologies like BEM, SMACSS or OOCSS.

The main idea of ITCSS is that it separates your CSS codebase into several sections (called layers), which can be represented as sections of an inverted triangle:

![Triangle of ITCSS](https://www.xfivecdn.com/xfive/wp-content/uploads/2016/02/01083650/itcss-layers2.svg)

Those layers are:

- Settings – used with preprocessors and contain font, colors definitions, etc.
- Tools – globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.
- Generic – reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
- Elements – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.
- Objects – class-based selectors which define undecorated design patterns, for example the media object known from OOCSS
- Components – specific UI components. This is where most of our work takes place. We often compose UI components of Objects and Components
- Utilities – utilities and helper classes with ability to override anything which goes before in the triangle, e.g. hide helper class

The triangle also shows how styles appear in the resulting CSS: from generic styles to explicit ones, from low-specificity selectors to more specific ones and from far-reaching to localized ones.

![itcss-key-metrics](https://www.xfivecdn.com/xfive/wp-content/uploads/2016/02/10154630/itcss-key-metrics.svg)
