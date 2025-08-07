# Sass Usage Guide

This project uses the original Materialize CSS Sass files for authentic styling with support for partial imports.

## Complete Styles (Default)

Import the main package to get all Materialize CSS styles:

```typescript
import 'mithril-materialized'; // Includes complete Materialize CSS
```

## Partial Imports (Recommended for smaller bundles)

Import directly from the original Materialize CSS Sass files:

```scss
// Base styles (required for all components)
@import 'mithril-materialized/sass/components/color-variables';
@import 'mithril-materialized/sass/components/variables';
@import 'mithril-materialized/sass/components/normalize';
@import 'mithril-materialized/sass/components/global';
@import 'mithril-materialized/sass/components/grid';
@import 'mithril-materialized/sass/components/typography';
@import 'mithril-materialized/sass/components/transitions';
@import 'mithril-materialized/sass/components/waves';
@import 'mithril-materialized/sass/components/icons-material-design';

// Individual components (choose what you need)
@import 'mithril-materialized/sass/components/buttons';
@import 'mithril-materialized/sass/components/forms/forms';
@import 'mithril-materialized/sass/components/modal';
@import 'mithril-materialized/sass/components/tabs';
@import 'mithril-materialized/sass/components/dropdown';
@import 'mithril-materialized/sass/components/chips';
@import 'mithril-materialized/sass/components/carousel';
@import 'mithril-materialized/sass/components/collapsible';
@import 'mithril-materialized/sass/components/materialbox';
```

## Available Components

All components are located in `mithril-materialized/sass/components/`:

- `_buttons.scss` - Button components
- `forms/_forms.scss` - Input, textarea, select, switch, checkbox, radio components  
- `_modal.scss` - Modal dialog components
- `_tabs.scss` - Tab navigation components
- `_dropdown.scss` - Dropdown menu components
- `_chips.scss` - Chip/tag components
- `_carousel.scss` - Image carousel components
- `_collapsible.scss` - Accordion/collapsible components
- `_materialbox.scss` - Image lightbox components

## Complete Component List

For a full list, see the main `mithril-materialized/sass/materialize.scss` file which imports all available components.

## Benefits

- **Direct Access**: No wrapper files, use original Materialize CSS structure
- **Authentic**: Identical to official Materialize CSS
- **Flexible**: Mix and match exactly what you need
- **Maintainable**: Easy to update with Materialize CSS releases
- **Efficient**: Include only the styles your app uses

## Known Issues

### Sass Deprecation Warnings

The build process currently shows deprecation warnings from the original Materialize CSS Sass files. These warnings are expected and do not affect functionality. The warnings include:

- `@import` deprecations (should use `@use`)
- Global builtin function deprecations (`map-has-key` should use `map.has-key`)
- Color function deprecations (`lighten()` should use `color.adjust()`)
- Slash division deprecations (`/` should use `math.div()`)
- Mixed declaration warnings (CSS declarations after nested rules)

These warnings originate from the upstream Materialize CSS codebase and will be addressed in a future migration to Sass modules (`@use/@forward`). The current build produces correct CSS output despite these warnings.