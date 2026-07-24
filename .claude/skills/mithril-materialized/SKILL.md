---
name: mithril-materialized
description: "Use this contributor skill only when modifying the mithril-materialized repository itself, especially `packages/lib`, `packages/example`, or generated `docs`. Trigger for requests to add, modify, style, document, test, debug, or release library components such as TextInput, NumberInput, Switch, ToggleButton, FormSection, Fieldset, or FlatButton; fix component state, validation, Sass/CSS, accessibility, row/layout behaviour, exports, examples, TypeDoc, or the semantic-release workflow. For an application merely consuming the npm package, use the root SKILL.md instead."
---

# Mithril Materialized UI Development

Develop and maintain the `mithril-materialized` repository: a TypeScript Mithril.js Material Design component library with no external JavaScript UI dependencies. This is a contributor skill, not an application-integration guide.

## Scope and triggers

Use this skill for prompts such as:

- “Add a Switch/TextInput/NumberInput example”, “align an input row”, or “style the Select label”.
- “Add a ToggleButton or ToggleGroup”, “use FormSection or Fieldset”, or “make this a FlatButton”.
- “Make this component controlled”, “fix validation on blur”, or “debug a Mithril redraw”.
- “Add dark-theme support”, “change the Sass variables”, or “export this component”.
- “Refresh the docs/TypeDoc”, “test a library component”, or “make a patch release”.

Do not use it for a generic Mithril application that neither uses nor modifies this library.

## Project Structure

Monorepo with pnpm workspaces:

- **`packages/lib/`** — Core library (npm: `mithril-materialized`), source and entry Sass files in `src/`, component Sass partials in `sass/`
- **`packages/example/`** — Documentation site with live component demos
- **`docs/`** — Generated GitHub Pages assets and TypeDoc output; commit regenerated content when a release requires it

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
- Follow the component's existing `isControlled` contract; do not assume every component uses the same value or handler property

### Validation

`ValidatorFunction<T>` returns `true | false | '' | string`. Always validate on **blur**, track `hasInteracted`, integrate with HTML5 `setCustomValidity`.

## Component catalogue

The table is a routing guide, not the API source of truth. Before using an unfamiliar component, inspect its export and attrs in `packages/lib/src/index.ts` and the component's source file.

| Category | Components | Files |
|----------|-----------|-------|
| **Text & numeric inputs** | TextInput, TextArea, NumberInput, PasswordInput, EmailInput, UrlInput, ColorInput, RangeInput, FileInput, CharacterCounter | `input.ts` |
| **Form structure** | FormSection, Fieldset | `form-section.ts` |
| **Choices & toggles** | Select, RadioButton(s), Switch, ToggleButton, ToggleGroup, LikertScale, Rating | `select.ts`, `radio.ts`, `switch.ts`, `toggle-*.ts` |
| **Search & file inputs** | AutoComplete, Combobox, SearchSelect, Chips, FileUpload | `autocomplete.ts`, `combobox.ts`, `search-select.ts`, `file-upload.ts` |
| **Buttons** | Button, LargeButton, SmallButton, FlatButton, IconButton, RoundIconButton, SubmitButton, ConfirmButton, FloatingActionButton | `button.ts`, `floating-action-button.ts` |
| **Ranges & pickers** | SingleRangeSlider, DoubleRangeSlider, DatePicker, TimePicker, TimeRangePicker, AnalogClock, DigitalClock | `range-slider.ts`, `datepicker.ts`, `timepicker.ts` |
| **Feedback & overlays** | ModalPanel, Tooltip, Toast, Badge, CircularProgress, LinearProgress | `modal.ts`, `tooltip.ts`, `toast.ts` |
| **Navigation & organisation** | Sidenav, Breadcrumb, Tabs, Pagination, Collapsible, Collection, Dropdown, Wizard | `sidenav.ts`, `tabs.ts`, `wizard.ts` |
| **Data & visual layout** | DataTable, TreeView, Masonry, ImageList, Timeline, Carousel, Parallax | `datatable.ts`, `treeview.ts`, `masonry.ts` |

## Theming

Light/dark via 50+ CSS custom properties (`--mm-primary-color`, `--mm-surface-color`, etc.). Programmatic: `ThemeManager.setTheme('dark')`, `ThemeManager.toggle()`.

## Development workflow

```bash
pnpm start              # Dev servers (lib + example)
pnpm --dir packages/lib test                # Unit tests
pnpm --dir packages/lib build:domain        # Library build + TypeDoc → docs/typedoc
pnpm build:example                          # Example site → docs/
```

For a normal change, update the component, its Sass, focused tests, and the live example when it clarifies behaviour. Run the narrow test first, then the relevant build.

### Releases

Releases are created by GitHub Actions on pushes to `master`, using semantic-release. Use Conventional Commit syntax: `fix(scope): ...` creates a patch release and `feat(scope): ...` creates a minor release. The workflow builds the library and example, runs tests, then commits release metadata and generated docs. Do not use the legacy local `patch-release` or `minor-release` scripts unless explicitly asked.

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
