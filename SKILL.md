---
name: mithril-materialized-development
description: "Develops, maintains, and debugs the mithril-materialized library — a zero-dependency TypeScript component library implementing Material Design for Mithril.js. Creates new FactoryComponents, fixes validation and theming bugs, integrates components into apps, and manages the pnpm monorepo build and release pipeline. Use when working on mithril-materialized source code, creating Mithril.js Material Design components, debugging component rendering or validation issues, or helping users integrate the library."
---

# Mithril Materialized Development

Develop, maintain, and debug mithril-materialized — a TypeScript Mithril.js component library implementing Material Design with zero external JavaScript dependencies.

## Project Structure

Monorepo using pnpm workspaces:

- `packages/lib/` — Core library (npm: `mithril-materialized`), components in `src/*.ts`, styles in `src/*.scss`
- `packages/example/` — Documentation site and live demos

Key files: `packages/lib/src/types.ts` (shared types), `packages/lib/src/utils.ts` (uniqueId, helpers), `packages/lib/src/index.ts` (all exports).

## Architecture

1. **Zero External JS Dependencies** — CSS-only styling, no Materialize.js or jQuery
2. **FactoryComponent Pattern** — All components use Mithril's `FactoryComponent` for lifecycle management
3. **Controlled/Uncontrolled Modes** — Detect via `isControlled(attrs)` (checks for `value` + handler)
4. **TypeScript First** — Full types, JSDoc on public APIs
5. **Modular CSS** — Tree-shakable: `core.css`, `forms.css`, `components.css`, `pickers.css`, `advanced.css`, `utilities.css`
6. **Light/Dark Themes** — 50+ CSS custom properties (`--mm-*`), `ThemeManager.setTheme('dark'|'light'|'auto')`

## Component Pattern

Every component follows this structure:

```typescript
import m, { FactoryComponent, Attributes } from 'mithril';

export interface MyComponentAttrs extends Attributes {
  label?: string;
  value?: T;              // controlled mode
  defaultValue?: T;       // uncontrolled mode
  oninput?: (value: T) => void;
  onchange?: (value: T) => void;
  validate?: ValidatorFunction<T>;
}

export const MyComponent: FactoryComponent<MyComponentAttrs> = () => {
  const state = { id: uniqueId(), internalValue: undefined as T | undefined, hasInteracted: false, isValid: true };

  return {
    oninit: ({ attrs }) => { /* initialize state */ },
    onremove: () => { /* cleanup resources */ },
    view: ({ attrs }) => {
      const currentValue = isControlled(attrs) ? attrs.value : state.internalValue ?? attrs.defaultValue ?? '';
      return m('.my-component', { /* render */ });
    },
  };
};
```

**Controlled mode**: parent provides `value` + `oninput`/`onchange`. **Uncontrolled mode**: use `defaultValue`, component tracks state internally. Warn if `value` passed without handler.

## Validation

Use `ValidatorFunction<T>` returning `true | false | '' | string`. Validate on **blur** (not input), track `hasInteracted`. Integrate with HTML5 `setCustomValidity`.

```typescript
m(TextInput, {
  label: 'Username',
  validate: (v) => v.length >= 3 || 'Too short (min 3 chars)',
  dataError: 'Invalid username',
  isMandatory: true,
})
```

## Component Reference

| Category | Components | Source Files |
|----------|-----------|-------------|
| **Inputs** | TextInput, TextArea, AutoComplete, Chips, RangeInput, FileInput | `input.ts`, `autocomplete.ts`, `chip.ts` |
| **Selections** | Select, SearchSelect, RadioButtons, Switch, Dropdown, LikertScale | `select.ts`, `search-select.ts`, `likert-scale.ts` |
| **Buttons** | Button, FlatButton, IconButton, SubmitButton, ConfirmButton, FAB | `button.ts`, `floating-action-button.ts` |
| **Pickers** | DatePicker, TimePicker, TimeRangePicker | `datepicker.ts`, `timepicker.ts` |
| **Displays** | ModalPanel, Tooltip, Toast, Badge, MaterialBox | `modal.ts`, `tooltip.ts`, `toast.ts` |
| **Navigation** | Sidenav, Breadcrumb, Tabs, Pagination | `sidenav.ts`, `breadcrumb.ts`, `tabs.ts` |
| **Layouts** | Masonry, ImageList, Timeline, Carousel, Parallax | `masonry.ts`, `image-list.ts`, `timeline.ts` |
| **Data** | DataTable, TreeView, Rating, Wizard | `datatable.ts`, `treeview.ts`, `rating.ts` |
| **Collections** | Collection (rich content via `content` prop), Collapsible | `collection.ts`, `collapsible.ts` |
| **Utilities** | ThemeSwitcher, ThemeToggle, FileUpload, CodeBlock | `theme-switcher.ts`, `file-upload.ts` |

## Prop Naming Conventions

Standard names across all components: `label`, `value`, `defaultValue`, `oninput`, `onchange`, `onblur`, `validate`, `helperText`, `dataError`, `dataSuccess`, `className`, `disabled`, `readonly`, `isMandatory`.

## Theme Customization

Override CSS variables in your global CSS:

```css
:root {
  --mm-primary-color: #1976d2;
  --mm-secondary-color: #ff4081;
  --mm-background-color: #ffffff;
  --mm-surface-color: #ffffff;
  --mm-text-primary: rgba(0, 0, 0, 0.87);
}
```

Programmatic control: `ThemeManager.setTheme('dark')`, `ThemeManager.toggle()`, `ThemeManager.getTheme()`.

## Development Commands

```bash
# Root level
pnpm start              # Dev servers for both packages
npm run build           # Build library
npm run build:domain    # Clean + build both + generate docs

# Library (packages/lib/)
npm run dev             # Watch mode
npm run patch-release   # Bump patch, build, publish, push tags

# Example (packages/example/)
npm start               # Webpack dev server with hot reload
```

Build outputs ESM, CommonJS, UMD via microbundle. External: `mithril`.

## Adding a New Component

1. Create `packages/lib/src/my-component.ts` — extend `Attributes`, use `FactoryComponent` pattern
2. Add styles to relevant `.scss` file
3. Export from `packages/lib/src/index.ts`
4. Add demo in `packages/example/src/`
5. Verify both controlled and uncontrolled modes work
6. Test in light and dark themes

## Common Pitfalls

- **Always support uncontrolled mode** — implement both controlled and uncontrolled
- **Validate on blur, not input** — better UX, track `hasInteracted`
- **Use `uniqueId()`** — never hardcode element IDs
- **Clean up in `onremove`** — prevent memory leaks
- **Never modify `attrs.value` directly** — breaks controlled mode
- **Import CSS** — `import 'mithril-materialized/index.css'` or use modular imports

## Troubleshooting

- **Component not updating**: Check controlled mode has both `value` and handler; verify `m.redraw()` after async state changes
- **Validation not firing**: Ensure `validate` runs in `onblur`, `hasInteracted` is set, function returns correct types
- **Styles missing**: Verify CSS import, check theme variable overrides, inspect CSS specificity
- **TypeScript errors**: Ensure attrs extend `Attributes`, types exported from component file and re-exported from `index.ts`
