---
name: mithril-materialized
description: "Builds, maintains, and integrates mithril-materialized UI components — a zero-dependency TypeScript library implementing Material Design for Mithril.js. Creates FactoryComponents with controlled/uncontrolled modes, implements validation, manages light/dark theming via CSS custom properties, and handles the pnpm monorepo build pipeline. Use when building Mithril.js apps with Material Design, creating or modifying mithril-materialized components, debugging component state or validation, customizing themes, or integrating the library into a project."
---

# Mithril Materialized UI Development

Develop and maintain the mithril-materialized library — a TypeScript Mithril.js component library implementing Material Design without external JavaScript dependencies.

## When to Use

- Building Mithril.js applications with Material Design components
- Creating, modifying, or debugging mithril-materialized components
- Integrating mithril-materialized into a project (forms, data tables, navigation, theming)
- Fixing validation, theming, or rendering issues in the library
- Managing the monorepo build and release pipeline

## Project Structure

Monorepo with pnpm workspaces:

- **`packages/lib/`** — Core library (npm: `mithril-materialized`), source in `src/*.ts`, styles in `src/*.scss`
- **`packages/example/`** — Documentation site with live component demos

Key files: `src/types.ts` (shared types), `src/utils.ts` (uniqueId, helpers), `src/index.ts` (all exports).

## Core Patterns

### FactoryComponent Pattern

All components use this structure for lifecycle management:

```typescript
import m, { FactoryComponent, Attributes } from 'mithril';

export const MyComponent: FactoryComponent<MyComponentAttrs> = () => {
  const state = { id: uniqueId(), internalValue: undefined, hasInteracted: false };

  return {
    oninit: ({ attrs }) => { /* init */ },
    onremove: () => { /* cleanup */ },
    view: ({ attrs }) => {
      const value = isControlled(attrs) ? attrs.value : state.internalValue ?? attrs.defaultValue;
      return m('.my-component', { /* ... */ });
    },
  };
};
```

### Controlled vs Uncontrolled

- **Controlled**: Parent provides `value` + `oninput`/`onchange`
- **Uncontrolled**: Use `defaultValue`, component tracks state internally
- Detect with `isControlled(attrs)` — checks for `value` and a handler

### Validation

`ValidatorFunction<T>` returns `true | false | '' | string`. Always validate on **blur**, track `hasInteracted`, integrate with HTML5 `setCustomValidity`.

## Component Categories

| Category | Components | Files |
|----------|-----------|-------|
| **Inputs** | TextInput, TextArea, AutoComplete, Chips, RangeInput | `input.ts`, `autocomplete.ts` |
| **Selections** | Select, RadioButtons, Switch, LikertScale | `select.ts`, `likert-scale.ts` |
| **Buttons** | Button, FlatButton, IconButton, SubmitButton, ConfirmButton, FAB | `button.ts` |
| **Pickers** | DatePicker, TimePicker, TimeRangePicker | `datepicker.ts`, `timepicker.ts` |
| **Displays** | ModalPanel, Tooltip, Toast, Badge | `modal.ts`, `tooltip.ts` |
| **Navigation** | Sidenav, Breadcrumb, Tabs, Pagination | `sidenav.ts`, `tabs.ts` |
| **Data** | DataTable, TreeView, Rating, Wizard | `datatable.ts`, `treeview.ts` |
| **Layouts** | Masonry, ImageList, Timeline, Carousel | `masonry.ts`, `timeline.ts` |

## Theming

Light/dark via 50+ CSS custom properties (`--mm-primary-color`, `--mm-surface-color`, etc.). Programmatic: `ThemeManager.setTheme('dark')`, `ThemeManager.toggle()`.

## Development Workflow

```bash
pnpm start              # Dev servers (lib + example)
npm run build           # Build library (ESM, CJS, UMD via microbundle)
npm run patch-release   # Bump, build, publish, push tags
```

### Adding a Component

1. Create `packages/lib/src/my-component.ts` using FactoryComponent pattern
2. Export from `packages/lib/src/index.ts`
3. Add styles to relevant `.scss` file
4. Add demo in `packages/example/src/`
5. Verify: both modes work, light/dark themes, keyboard navigation

### Common Pitfalls

- Support both controlled and uncontrolled modes
- Validate on blur, not input — track `hasInteracted`
- Use `uniqueId()` for element IDs
- Clean up in `onremove` to prevent leaks
- Never modify `attrs.value` directly
- Always import CSS: `import 'mithril-materialized/index.css'`
