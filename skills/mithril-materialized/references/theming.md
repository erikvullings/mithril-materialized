# Theming and density

Mithril Materialized has two independent presentation axes:

1. **Color theme**: light, dark, or auto.
2. **Density preset**: default spacious styling or Compact Minimal.

Do not model Compact Minimal as a fourth color theme. It can be combined with every color theme.

## Color themes

Import the standard CSS once and initialize `ThemeManager` near application startup:

```typescript
import { ThemeManager } from 'mithril-materialized';
import 'mithril-materialized/index.css';

ThemeManager.initialize('auto');
```

Set a preference explicitly:

```typescript
ThemeManager.setTheme('dark');
ThemeManager.setTheme('light');
ThemeManager.setTheme('auto');
```

`auto` removes the explicit `data-theme` attribute and follows `prefers-color-scheme`. ThemeManager persists the preference to local storage by default. Call `ThemeManager.setUseLocalStorage(false)` before initialization when application state should own persistence.

Use `ThemeSwitcher` for light/dark/auto controls or `ThemeToggle` for a simple light/dark button.

## Compact Minimal

Load the preset after the standard stylesheet, then apply it to the document root:

```typescript
import 'mithril-materialized/index.css';
import 'mithril-materialized/presets/compact-minimal.css';

document.documentElement.dataset.mmPreset = 'compact-minimal';
```

Remove the data attribute to restore the default density:

```typescript
delete document.documentElement.dataset.mmPreset;
```

The preset compacts typography, forms, controls, menus, navigation, collections, dialogs, tables, pickers, feedback, and display components. It retains larger interactive targets under coarse-pointer media queries.

Persist density separately from `ThemeManager`; ThemeManager owns color preference only.

## CSS custom properties

Override documented `--mm-*` custom properties at application scope:

```css
:root {
  --mm-primary-color: #4f46e5;
  --mm-primary-color-dark: #3730a3;
}

[data-theme='dark'] {
  --mm-surface-color: #18181b;
}
```

Prefer semantic tokens over targeting internal selectors. Scope product-specific variants beneath an application class or data attribute so defaults remain predictable.

## Modular CSS

Use `index.css` by default. For an intentionally curated bundle, import `core.css` plus the required modules:

- `forms.css`
- `components.css`
- `pickers.css`
- `advanced.css`
- `utilities.css`

The Compact Minimal preset is separate and must be imported explicitly. Verify all component categories used by the application are covered when replacing `index.css` with modular imports.

## Theme verification

Check:

- light, dark, and system-driven auto modes;
- Compact Minimal both enabled and disabled;
- readable focus, hover, disabled, selected, error, and destructive states;
- operating-system high contrast and reduced motion where relevant;
- fine and coarse pointers;
- right-to-left layout when the application supports it.
