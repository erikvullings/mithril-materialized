---
name: mithril-materialized
description: "Use this contributor skill only when modifying the mithril-materialized repository itself, especially `packages/lib`, `packages/example`, generated `docs`, or the installable consumer skill. Trigger for requests to add, modify, style, document, test, debug, or release components; work on Dialog, Menu, CommandPalette, SnackbarQueue, Avatar, Skeleton, EmptyState, VirtualList, themes, Compact Minimal, form grids, accessibility, exports, examples, TypeDoc, or semantic-release. For an application consuming the npm package, install the public skill under `skills/mithril-materialized`."
---

# Mithril Materialized UI Development

Develop and maintain the `mithril-materialized` repository: a TypeScript Mithril.js Material Design component library with no external JavaScript UI dependencies. This is a contributor skill, not an application-integration guide.

Do not use it for a generic Mithril application that neither uses nor modifies this library. The installable application-integration skill lives in `skills/mithril-materialized/`.

## Project Structure

Monorepo with pnpm workspaces:

- **`packages/lib/`** — Core library (npm: `mithril-materialized`), source and entry Sass files in `src/`, component Sass partials in `sass/`
- **`packages/example/`** — Documentation site with live component demos
- **`docs/`** — Generated GitHub Pages assets and TypeDoc output; commit regenerated content when a release requires it

Key files: `src/types.ts` (shared types), `src/utils.ts` (uniqueId, helpers), `src/index.ts` (all exports).

## Core patterns

Components that need lifecycle state use Mithril's factory pattern. Keep state inside the factory and return lifecycle methods:

```typescript
export const MyComponent: FactoryComponent<MyAttrs> = () => {
  const state = { id: uniqueId() };
  return {
    onremove: () => cleanup(),
    view: ({ attrs }) => m('.my-component', render(attrs, state)),
  };
};
```

### Controlled vs uncontrolled

- **Controlled**: Parent provides `value` + `oninput`/`onchange`
- **Uncontrolled**: Use `defaultValue`, component tracks state internally
- Follow the component's existing `isControlled` contract; do not assume every component uses the same value or handler property

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
| **Feedback & overlays** | ModalPanel, Dialog, AlertDialog, Menu, ContextMenu, CommandPalette, SnackbarQueue, Tooltip, Toast, Badge, Skeleton, EmptyState, CircularProgress, LinearProgress | `modal.ts`, `dialog.ts`, `menu.ts`, `command-palette.ts`, `snackbar.ts` |
| **Navigation & organisation** | Sidenav, Breadcrumb, Tabs, Pagination, Collapsible, Collection, Dropdown, Wizard | `sidenav.ts`, `tabs.ts`, `wizard.ts` |
| **Data & visual layout** | Avatar, AvatarGroup, DataTable, VirtualList, TreeView, Masonry, ImageList, Timeline, Carousel, Parallax | `avatar.ts`, `datatable.ts`, `virtual-list.ts`, `treeview.ts`, `masonry.ts` |

## Theming

Light/dark/auto colors use CSS custom properties (`--mm-primary-color`, `--mm-surface-color`, etc.) and `ThemeManager`. The opt-in Compact Minimal density preset is exported as `mithril-materialized/presets/compact-minimal.css` and activated with `data-mm-preset="compact-minimal"` on the document root. Color theme and density are independent; keep every preset rule root-scoped and preserve coarse-pointer targets.

## Version 4 layout contract

`SearchSelect`, `FileUpload`, `LikertScale`, `Rating`, `SingleRangeSlider`, and `DoubleRangeSlider` default to `className: 'col s12'`. Examples must place them in a `.row`, use an explicit grid width when needed, and avoid duplicate nested column gutters. `className: ''` intentionally opts out.

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
