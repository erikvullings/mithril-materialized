---
name: mithril-materialized
description: "Use this consumer skill when building a Mithril application that uses the published `mithril-materialized` npm package. Trigger when a request mentions importing or configuring mithril-materialized; using components such as TextInput, NumberInput, Select, Switch, ToggleButton, FormSection, Fieldset, FlatButton, DataTable, ModalPanel, or ThemeManager; styling the package; or implementing forms, themes, layout, and accessibility with it. Do not use for changes to the mithril-materialized repository itself; use its local contributor skill instead."
---

# Using Mithril Materialized

Build Mithril applications with `mithril-materialized`, a Material Design component library with no external JavaScript UI dependency.

## Install and import

```bash
npm install mithril mithril-materialized
```

Import the CSS once in the application entry point, then import components from the package:

```typescript
import 'mithril-materialized/index.css';
import m from 'mithril';
import { Button, NumberInput, Switch, TextInput } from 'mithril-materialized';
```

For smaller CSS bundles, use the package's modular styles such as `core.css`, `forms.css`, `components.css`, `pickers.css`, `advanced.css`, and `utilities.css`.

## Component selection

| Need | Components |
|------|------------|
| Form layout | FormSection, Fieldset |
| Text and values | TextInput, TextArea, NumberInput, PasswordInput, EmailInput, UrlInput, ColorInput |
| Choices | Select, RadioButton(s), Switch, ToggleButton, ToggleGroup, LikertScale, Rating |
| Actions | Button, FlatButton, IconButton, RoundIconButton, SubmitButton, ConfirmButton, FloatingActionButton |
| Search and upload | AutoComplete, Combobox, SearchSelect, Chips, FileInput, FileUpload |
| Dates and ranges | DatePicker, TimePicker, TimeRangePicker, SingleRangeSlider, DoubleRangeSlider |
| Data and feedback | DataTable, TreeView, ModalPanel, Tooltip, Toast, Badge, CircularProgress, LinearProgress |

Consult the generated TypeDoc or the package exports for the exact attrs of a component; do not guess property names.

## Forms

Prefer the component's documented controlled or uncontrolled mode; follow its particular attrs rather than assuming all controls use identical `value` and handler names. Keep validation in the parent when application rules span fields, and use the component's `validator` support for single-field validation.

Use FormSection and Fieldset to group related controls. Respect normal HTML labels, focus behaviour, keyboard operation, and error feedback when composing custom forms.

## Themes and customization

Use `ThemeManager` for the built-in light, dark, and auto themes:

```typescript
import { ThemeManager } from 'mithril-materialized';

ThemeManager.setTheme('dark');
```

Customize the visual system with the documented `--mm-*` CSS custom properties. If building Sass, override the package Sass variables before importing its Sass entry point.

## Boundaries

This skill is for consuming the published package. Do not edit `packages/lib`, `packages/example`, the docs site, generated TypeDoc, or release configuration in an application task.
