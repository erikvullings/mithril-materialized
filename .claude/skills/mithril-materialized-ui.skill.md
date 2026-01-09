# Mithril Materialized UI Development Skill

**Description**: Expert skill for developing and maintaining the mithril-materialized library - a TypeScript-based Mithril.js component library implementing Material Design without external JavaScript dependencies.

**When to use**: When working with Mithril Materialized components, creating new components, fixing bugs, implementing features, or helping users integrate the library.

## Project Overview

Mithril Materialized is a **zero external JavaScript dependency** component library that wraps Material Design functionality in Mithril.js components. This monorepo uses pnpm workspaces and consists of:

- **`packages/lib/`** - The main library published to npm as `mithril-materialized`
- **`packages/example/`** - Example application serving as documentation and live demo site

### Key Architectural Principles

1. **Zero External JS Dependencies**: No materialize-css JavaScript, jQuery, or other runtime dependencies
2. **CSS-Only Styling**: All styling is done via CSS, no JavaScript initialization required
3. **Factory Component Pattern**: Uses Mithril's FactoryComponent for optimal performance
4. **Controlled/Uncontrolled Support**: Components support both controlled and uncontrolled modes
5. **TypeScript First**: Full TypeScript support with comprehensive type definitions
6. **Modular CSS**: Tree-shakable CSS modules for optimal bundle sizes

## Component Architecture Patterns

### 1. Factory Component Pattern

All components use the `FactoryComponent` pattern for performance and proper lifecycle management:

```typescript
import m, { FactoryComponent, Attributes } from 'mithril';

export interface MyComponentAttrs extends Attributes {
  label?: string;
  value?: string;
  onchange?: (value: string) => void;
  // ... other attributes
}

export const MyComponent: FactoryComponent<MyComponentAttrs> = () => {
  // State is defined in the factory closure (persists across redraws)
  const state = {
    id: uniqueId(),
    internalValue: '',
    hasInteracted: false,
  };

  return {
    oninit: ({ attrs }) => {
      // Initialize state
    },

    onremove: () => {
      // Cleanup resources
    },

    view: ({ attrs }) => {
      // Render component
      return m('.my-component', { ... });
    },
  };
};
```

### 2. Controlled vs Uncontrolled Components

Components MUST support both controlled and uncontrolled modes:

**Controlled Mode** (parent manages state):
```typescript
m(TextInput, {
  value: this.state.username,
  oninput: (value) => this.state.username = value
})
```

**Uncontrolled Mode** (component manages state):
```typescript
m(TextInput, {
  defaultValue: 'initial',
  onchange: (value) => console.log(value)
})
```

**Implementation Pattern**:
```typescript
const isControlled = (attrs: InputAttrs<T>) =>
  attrs.value !== undefined &&
  (attrs.oninput !== undefined || attrs.onchange !== undefined);

// In oninit:
if (attrs.value !== undefined && !isControlled(attrs) && !isNonInteractive) {
  console.warn(
    `Component received 'value' without handler. ` +
    `Use 'defaultValue' for uncontrolled or add handler for controlled.`
  );
}

// In view:
let currentValue: T;
if (isControlled(attrs)) {
  currentValue = attrs.value;
} else if (isNonInteractive) {
  currentValue = attrs.defaultValue ?? attrs.value ?? '';
} else {
  currentValue = state.internalValue ?? attrs.defaultValue ?? '';
}
```

### 3. Validation Pattern

Components with validation should follow this pattern:

```typescript
export interface ValidatorFunction<T> {
  (value: T, element?: HTMLInputElement): ValidationResult;
}

export type ValidationResult = true | false | '' | string;

// In component:
validate?: ValidatorFunction<T>;

// On blur:
if (validate) {
  const validationResult = validate(value, target);
  state.isValid = typeof validationResult === 'boolean'
    ? validationResult
    : validationResult === '';

  if (typeof validationResult === 'boolean') {
    if (validationResult) {
      target.classList.add('valid');
      target.classList.remove('invalid');
    } else {
      target.classList.add('invalid');
      target.classList.remove('valid');
    }
  } else if (typeof validationResult === 'string') {
    target.setCustomValidity(validationResult);
    target.classList.add('invalid');
  }
}
```

### 4. Icon Integration

Components can include Material icons using either:

**Icon Component** (for material-icons font):
```typescript
import { Icon } from './icon';

m(Icon, { iconName: 'search', className: 'left' })
```

**MaterialIcon Component** (for custom SVG icons):
```typescript
import { MaterialIcon } from './material-icon';

m(MaterialIcon, { name: 'close', className: 'input-clear-btn' })
```

### 5. Label and Helper Text Pattern

Form components should use the Label and HelperText components:

```typescript
import { Label, HelperText } from './label';

m(Label, {
  label,
  id,
  isMandatory,
  isActive: currentValue || placeholder || state.active,
  initialValue: currentValue !== '',
}),

m(HelperText, {
  helperText,
  dataError: state.hasInteracted && !state.isValid ? dataError : undefined,
  dataSuccess: state.hasInteracted && state.isValid ? dataSuccess : undefined,
})
```

## Component Categories

### Input Components
Located in: `packages/lib/src/input.ts`, `autocomplete.ts`, `chip.ts`

- TextInput, PasswordInput, NumberInput, UrlInput, ColorInput, EmailInput
- TextArea (with auto-resize)
- RangeInput (with vertical, double-thumb support)
- FileInput
- AutoComplete
- Chips

### Selection Components
Located in: `select.ts`, `search-select.ts`, `radio.ts`, `switch.ts`, `dropdown.ts`

- Select
- SearchSelect (searchable dropdown)
- RadioButtons
- Switch
- Dropdown

### Button Components
Located in: `button.ts`, `floating-action-button.ts`

- Button, FlatButton, IconButton, RoundIconButton, SubmitButton, LargeButton, SmallButton
- FloatingActionButton

### Picker Components
Located in: `datepicker.ts`, `timepicker.ts`, `time-range-picker.ts`

- DatePicker (with date range support, week numbers)
- TimePicker (with inline mode, AM/PM/24h)
- TimeRangePicker

### Display Components
Located in: `modal.ts`, `tooltip.ts`, `toast.ts`, `badge.ts`, `material-box.ts`

- ModalPanel
- Tooltip
- Toast (with action support)
- Badge
- MaterialBox (lightbox)

### Navigation Components
Located in: `sidenav.ts`, `breadcrumb.ts`, `tabs.ts`, `pagination.ts`

- Sidenav
- Breadcrumb
- Tabs
- Pagination, PaginationControls

### Layout Components
Located in: `masonry.ts`, `image-list.ts`, `timeline.ts`, `carousel.ts`, `parallax.ts`

- Masonry (Pinterest-style grid)
- ImageList (responsive galleries)
- Timeline (vertical event display)
- Carousel
- Parallax

### Data Components
Located in: `datatable.ts`, `treeview.ts`, `rating.ts`, `wizard.ts`

- DataTable (sorting, filtering, pagination)
- TreeView (hierarchical data with expand/collapse)
- Rating (configurable star/icon rating)
- Wizard (multi-step stepper)

### Collection Components
Located in: `collection.ts`, `collapsible.ts`

- Collection (basic, link, avatar)
- Collapsible (accordion)

### Utility Components
Located in: `theme-switcher.ts`, `file-upload.ts`, `code-block.ts`

- ThemeSwitcher, ThemeToggle (light/dark theme)
- FileUpload (drag-and-drop)
- CodeBlock

## TypeScript Types System

### Core Types
Located in: `packages/lib/src/types.ts`

```typescript
// Size and positioning
type ComponentSize = 'tiny' | 'small' | 'medium' | 'large';
type MaterialPosition = 'top' | 'bottom' | 'left' | 'right';
type ExtendedPosition = MaterialPosition | 'top-left' | 'top-right' | ...;

// Validation
type ValidationSuccess = true | '';
type ValidationError = false | string;
type ValidationResult = ValidationSuccess | ValidationError;

interface ValidatorFunction<T> {
  (value: T, element?: HTMLInputElement): ValidationResult;
}

// Input types
type InputType = 'text' | 'email' | 'password' | 'number' | 'range' | ...;
type InputValue<T extends InputType> = ...;

// Buttons
type ButtonVariant = 'button' | 'submit' | 'reset';

// Theme
type ThemeVariant = 'light' | 'dark' | 'auto';

// Material Design colors
type MaterialColor = 'red' | 'pink' | 'purple' | ...;
type ColorIntensity = 'lighten-5' | 'lighten-4' | ... | 'darken-4';
type MaterialColorSpec = MaterialColor | `${MaterialColor} ${ColorIntensity}`;
```

### Utility Types

```typescript
// Makes specified keys required
type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Makes specified keys optional
type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Type guards
const isValidationSuccess = (result: ValidationResult): result is ValidationSuccess =>
  result === true || result === '';
```

## CSS Architecture

### Modular CSS Structure

The library uses modular CSS for tree-shaking:

- **`core.css`** (18KB) - Essential foundation (normalize, grid, typography, variables)
- **`components.css`** - Interactive components (buttons, dropdowns, modals, tabs)
- **`forms.css`** - Form components (inputs, selects, switches)
- **`pickers.css`** - Date and time pickers
- **`advanced.css`** - Specialized components (carousel, sidenav)
- **`utilities.css`** - Visual utilities (badges, cards, icons, toast)

### Theme System

Dark/light theme support using CSS custom properties:

```css
:root {
  --mm-primary-color: #26a69a;
  --mm-background-color: #ffffff;
  --mm-text-primary: rgba(0, 0, 0, 0.87);
}

[data-theme="dark"] {
  --mm-primary-color: #80cbc4;
  --mm-background-color: #121212;
  --mm-text-primary: rgba(255, 255, 255, 0.87);
}
```

**Usage**:
```typescript
import { ThemeManager } from 'mithril-materialized';

ThemeManager.setTheme('dark');  // 'light' | 'dark' | 'auto'
ThemeManager.toggle();
ThemeManager.getTheme();
```

## Development Workflow

### Directory Structure
```
packages/
  lib/
    src/
      *.ts         # Component source files
      *.scss       # Modular SCSS files
      index.ts     # Main export file
      types.ts     # Shared TypeScript types
    dist/          # Build output
    rollup.config.mjs
    package.json
  example/
    src/           # Example/documentation app
    webpack.config.js
```

### Common Development Commands

**Root level**:
```bash
pnpm start              # Start dev servers for both packages
npm run build           # Build library only
npm run build:example   # Build example only
npm run build:domain    # Clean, build both, generate docs
npm run clean           # Clean all artifacts
```

**Library (`packages/lib/`)**:
```bash
npm run dev             # Watch mode build
npm run build           # Production build
npm run typedoc         # Generate TypeScript docs
npm run patch-release   # Version bump (patch), build, publish
npm run minor-release   # Version bump (minor), build, publish
npm run major-release   # Version bump (major), build, publish
```

**Example (`packages/example/`)**:
```bash
npm start               # Start webpack dev server on localhost
npm run build           # Production webpack build
```

### Build System Details

**Library Build** (microbundle + rollup):
- Outputs: ESM, CommonJS, UMD formats
- External dependencies: `mithril` (marked as external)
- CSS: Compiled from SCSS, generates modular CSS files
- TypeScript: Full type definitions generated

**Example Build** (webpack):
- Hot reload dev server
- TypeScript transpilation
- CSS processing

### Release Process

The library uses automated versioning:

```bash
npm run patch-release  # Bug fixes
npm run minor-release  # New features (backward compatible)
npm run major-release  # Breaking changes
```

Each release:
1. Cleans build artifacts
2. Builds library
3. Bumps version in package.json
4. Creates git tag
5. Publishes to npm
6. Pushes tags to GitHub

## Best Practices for Component Development

### 1. Component Structure

```typescript
// 1. Imports
import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { Label, HelperText } from './label';

// 2. Type definitions
export interface MyComponentAttrs extends Attributes {
  /** JSDoc documentation for each prop */
  label?: string;
  value?: T;
  defaultValue?: T;
  oninput?: (value: T) => void;
  onchange?: (value: T) => void;
  validate?: ValidatorFunction<T>;
  // ... more props
}

// 3. Component factory
export const MyComponent: FactoryComponent<MyComponentAttrs> = () => {
  // 4. State definition
  const state = {
    id: uniqueId(),
    internalValue: undefined as T | undefined,
    hasInteracted: false,
    isValid: true,
  };

  // 5. Helper functions
  const isControlled = (attrs: MyComponentAttrs) => { ... };

  // 6. Lifecycle hooks
  return {
    oninit: ({ attrs }) => { ... },
    onremove: () => { ... },
    view: ({ attrs }) => { ... },
  };
};
```

### 2. Prop Naming Conventions

- `label` - Text label for the component
- `value` - Current value (controlled mode)
- `defaultValue` - Initial value (uncontrolled mode)
- `oninput` - Called on every input change
- `onchange` - Called on blur or when value commits
- `helperText` - Helper text below component
- `dataError` - Error message for validation
- `dataSuccess` - Success message for validation
- `validate` - Validation function
- `className` - Additional CSS classes
- `disabled` - Disable the component
- `readonly` - Make component read-only
- `isMandatory` - Show required asterisk

### 3. State Management

- Use `state` object in factory closure for persistent state
- Support both controlled and uncontrolled modes
- Warn developers about improper usage (value without handler)
- Use `state.internalValue` for uncontrolled mode
- Track `state.hasInteracted` for validation timing

### 4. Event Handling

```typescript
// Input changes
oninput: (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = getValue(target);

  // Update internal state if uncontrolled
  if (!isControlled(attrs)) {
    state.internalValue = value;
  }

  // Call parent handler
  if (attrs.oninput) {
    attrs.oninput(value);
  }
}

// Blur (validation)
onblur: (e: FocusEvent) => {
  state.hasInteracted = true;

  // Perform validation
  if (attrs.validate) {
    const result = attrs.validate(value, target);
    // Update validity state
  }

  // Call parent handlers
  if (attrs.onblur) attrs.onblur(e);
  if (attrs.onchange) attrs.onchange(value);
}
```

### 5. Accessibility

- Always use proper semantic HTML
- Include ARIA attributes where needed
- Support keyboard navigation
- Use proper label associations (id/for)
- Support focus management (autofocus, tabindex)
- Provide meaningful error messages

### 6. Performance Optimization

- Use `FactoryComponent` for optimal performance
- Avoid unnecessary redraws
- Use proper cleanup in `onremove`
- Minimize DOM operations
- Use CSS for animations/transitions

## Common Development Tasks

### Adding a New Component

1. **Create component file**: `packages/lib/src/my-component.ts`
2. **Define types**: Extend `Attributes`, document with JSDoc
3. **Implement factory**: Follow the standard pattern
4. **Export from index**: Add to `packages/lib/src/index.ts`
5. **Add styles**: Create or update relevant `.scss` file
6. **Test manually**: Add to example app
7. **Document**: Update README, add example usage

### Modifying Existing Component

1. **Read the component**: Understand current implementation
2. **Check types**: Ensure TypeScript types are correct
3. **Test both modes**: Verify controlled and uncontrolled work
4. **Maintain backward compatibility**: Don't break existing APIs
5. **Update docs**: Update JSDoc comments

### Fixing Validation Issues

1. Check `validate` function implementation
2. Verify validation runs on correct events (blur, not input)
3. Ensure `state.hasInteracted` is tracked correctly
4. Test with both custom validators and built-in HTML5 validation
5. Verify error messages display correctly

### Debugging CSS Issues

1. Check which CSS module includes the styles
2. Verify CSS custom properties for theming
3. Test in both light and dark themes
4. Check MaterializeCSS compatibility
5. Verify responsive behavior

### Performance Issues

1. Check for unnecessary redraws (add console.log in view)
2. Verify proper use of `FactoryComponent`
3. Look for memory leaks (cleanup in `onremove`)
4. Check for heavy computations in `view`
5. Profile with browser dev tools

## Integration Examples

### Basic Form

```typescript
import m from 'mithril';
import { TextInput, EmailInput, NumberInput, Button } from 'mithril-materialized';

const MyForm = () => {
  let name = '';
  let email = '';
  let age = 0;

  return {
    view: () => m('form', [
      m(TextInput, {
        label: 'Name',
        value: name,
        oninput: (v) => name = v,
        validate: (v) => v.length >= 3 || 'Name must be at least 3 characters',
        isMandatory: true,
      }),

      m(EmailInput, {
        label: 'Email',
        value: email,
        oninput: (v) => email = v,
        isMandatory: true,
      }),

      m(NumberInput, {
        label: 'Age',
        value: age,
        oninput: (v) => age = v,
        min: 0,
        max: 120,
      }),

      m(Button, {
        label: 'Submit',
        variant: 'submit',
        onclick: () => console.log({ name, email, age }),
      }),
    ]),
  };
};
```

### Advanced Data Table

```typescript
import { DataTable } from 'mithril-materialized';

m(DataTable, {
  data: users,
  columns: [
    { field: 'name', label: 'Name', sortable: true },
    { field: 'email', label: 'Email', sortable: true },
    { field: 'role', label: 'Role', sortable: false },
  ],
  selectable: true,
  onselection: (selectedIds) => console.log(selectedIds),
  pagination: true,
  pageSize: 10,
})
```

### Theme Integration

```typescript
import { ThemeSwitcher, ThemeToggle } from 'mithril-materialized';

// In navigation
m('.nav-wrapper', [
  m('.right', m(ThemeToggle)),
])

// Or with dropdown
m(ThemeSwitcher, {
  onThemeChange: (theme) => {
    console.log('Theme changed to:', theme);
    // Persist to localStorage, etc.
  },
})
```

## Testing Guidelines

### Manual Testing Checklist

- [ ] Test controlled mode with value + oninput
- [ ] Test uncontrolled mode with defaultValue
- [ ] Test readonly and disabled states
- [ ] Test validation (both success and error)
- [ ] Test keyboard navigation
- [ ] Test with and without labels
- [ ] Test error messages display correctly
- [ ] Test in both light and dark themes
- [ ] Test responsive behavior
- [ ] Test browser compatibility

### Common Pitfalls

1. **Forgetting to support uncontrolled mode**: Always implement both modes
2. **Validating on input instead of blur**: Validate on blur for better UX
3. **Not tracking hasInteracted**: Prevents showing errors before user interaction
4. **Missing cleanup**: Always clean up in `onremove`
5. **Hardcoding IDs**: Use `uniqueId()` for component IDs
6. **Breaking controlled mode**: Never modify props.value directly
7. **Not documenting types**: Always add JSDoc to public APIs

## Troubleshooting

### Component Not Updating

- Check if component is controlled (value prop requires oninput/onchange)
- Verify m.redraw() is called after state changes
- Ensure factory returns view function correctly

### Validation Not Working

- Verify `validate` prop is a function returning correct types
- Check `state.hasInteracted` is set on blur
- Ensure validation runs in onblur, not oninput

### Styles Not Applied

- Verify CSS is imported: `import 'mithril-materialized/index.css'`
- Check correct CSS module is imported for modular approach
- Verify className prop is passed through correctly
- Check for CSS specificity issues

### TypeScript Errors

- Ensure component attrs extend `Attributes` from mithril
- Check types are exported from component file
- Verify types are re-exported from index.ts
- Check for conflicts with HTML attributes

---

## Quick Reference

### Must-Know Files
- `packages/lib/src/types.ts` - All TypeScript type definitions
- `packages/lib/src/utils.ts` - Utility functions (uniqueId, etc.)
- `packages/lib/src/input-options.ts` - Shared input attribute types
- `packages/lib/src/label.ts` - Label and HelperText components
- `packages/lib/src/index.ts` - Main export file

### Key Functions
- `uniqueId()` - Generate unique component ID
- `ThemeManager.setTheme()` - Programmatically set theme
- `ThemeManager.toggle()` - Toggle between light/dark

### Common Patterns
- Factory component closure for state
- Controlled/uncontrolled detection
- Validation on blur, not input
- Label integration with isActive tracking
- Helper text with error/success states

This skill provides comprehensive guidance for developing, maintaining, and troubleshooting the mithril-materialized library. Use it as a reference when working with any aspect of the library.
