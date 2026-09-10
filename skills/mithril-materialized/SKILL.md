---
name: mithril-materialized
description: Builds accessible Mithril applications with the published mithril-materialized package. Use when installing or importing mithril-materialized, choosing or configuring its components, implementing forms and overlays, applying light/dark/auto themes or the Compact Minimal preset, customizing CSS, or handling Version 4 layout behavior.
---

# Using Mithril Materialized

Use `mithril-materialized` as a typed Mithril component library. Prefer its public component APIs and styles over recreating Materialize behavior in application code.

## Quick start

```bash
npm install mithril mithril-materialized
```

```typescript
import m from 'mithril';
import { Button, TextInput } from 'mithril-materialized';
import 'mithril-materialized/index.css';

let name = '';

export const ProfileForm = {
  view: () =>
    m('.row', [
      m(TextInput, {
        label: 'Name',
        value: name,
        oninput: (value) => {
          name = value;
        },
      }),
      m(Button, { label: 'Save', onclick: saveProfile }),
    ]),
};
```

## Choose the right reference

- Read [references/components.md](references/components.md) to select components and use Version 4 APIs such as Dialog, Menu, CommandPalette, SnackbarQueue, Avatar, Skeleton, EmptyState, and VirtualList.
- Read [references/forms-and-layout.md](references/forms-and-layout.md) for controlled state, validation, grid wrappers, and the Version 4 `col s12` defaults.
- Read [references/theming.md](references/theming.md) for light/dark/auto themes, CSS customization, modular styles, and the Compact Minimal preset.

## Component routing

| Need | Prefer |
|------|--------|
| Text and numeric values | TextInput, TextArea, NumberInput, PasswordInput, EmailInput, UrlInput, ColorInput |
| Choices and search | Select, SearchSelect, RadioButtons, Switch, ToggleButton, ToggleGroup, LikertScale, Rating |
| Actions | Button, FlatButton, IconButton, RoundIconButton, SubmitButton, ConfirmButton, FloatingActionButton |
| Dates and ranges | DatePicker, TimePicker, TimeRangePicker, SingleRangeSlider, DoubleRangeSlider |
| Dialogs and commands | Dialog, AlertDialog, Menu, ContextMenu, CommandPalette |
| Feedback and states | SnackbarQueue, Toast, Tooltip, Badge, Skeleton, EmptyState, CircularProgress, LinearProgress |
| Identity and data | Avatar, AvatarGroup, DataTable, VirtualList, TreeView, Timeline |
| Structure and navigation | FormSection, Fieldset, Collection, Collapsible, Tabs, Sidenav, Breadcrumb, Pagination, Wizard |

## Operating rules

- Import a CSS entry point once. Use `index.css` unless bundle-level modularization is required.
- Check the generated documentation or exported TypeScript attrs before using an unfamiliar component; do not invent property names.
- Keep generic component factories such as `Menu<T>()`, `ContextMenu<T>()`, `CommandPalette<T>()`, and `VirtualList<T>()` stable outside `view`.
- Follow each component's controlled/uncontrolled contract. In controlled mode, update the supplied value from its callback.
- Preserve keyboard behavior, labels, focus management, and accessible names when composing custom content.
- Treat color theme and density preset as independent choices.
