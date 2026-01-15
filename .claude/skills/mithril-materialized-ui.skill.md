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
```

**Implementation in component:**

```typescript
// In component attrs:
export interface InputAttrs<T> extends Attributes {
  value?: T;
  validate?: ValidatorFunction<T>;
  dataError?: string;
  dataSuccess?: string;
  // ... other props
}

// In component view - onblur handler:
onblur: (e: FocusEvent) => {
  const target = e.target as HTMLInputElement;
  state.hasInteracted = true;

  // Skip validation for readonly/disabled inputs
  if (attrs.readonly || attrs.disabled) {
    if (attrs.onblur) attrs.onblur(e);
    if (onchange) onchange(getValue(target));
    return;
  }

  // Custom validation
  if (validate) {
    const value = getValue(target);

    // Only validate if user has entered something
    if (value && String(value).length > 0) {
      const validationResult = validate(value, target);
      state.isValid = typeof validationResult === 'boolean'
        ? validationResult
        : validationResult === '';

      // Set HTML5 validation message
      if (typeof validationResult === 'boolean') {
        target.setCustomValidity(validationResult ? '' : 'Validation failed');
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
        target.classList.remove('valid');
        state.isValid = false;
      }
    } else {
      // Clear validation state if no text
      target.classList.remove('valid', 'invalid');
      state.isValid = true;
    }
  }

  // Call parent handlers
  if (attrs.onblur) attrs.onblur(e);
  if (onchange) onchange(getValue(target));
}
```

**Validation Examples:**

```typescript
// Boolean validation (simple pass/fail)
m(TextInput, {
  label: 'Username',
  validate: (value) => value.length >= 3,
  dataError: 'Username must be at least 3 characters'
})

// String validation (custom error message)
m(TextInput, {
  label: 'Username',
  validate: (value) => {
    if (value.length < 3) return 'Too short (min 3 chars)';
    if (value.length > 20) return 'Too long (max 20 chars)';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only alphanumeric and underscore allowed';
    return true; // or return '' for success
  }
})

// Validation with HTML element access
m(NumberInput, {
  label: 'Age',
  validate: (value, element) => {
    const num = Number(value);
    if (isNaN(num)) return 'Must be a number';
    if (num < 0) return 'Must be positive';
    if (num > 120) return 'Must be realistic';

    // Can also access element properties
    if (element && !element.validity.valid) {
      return element.validationMessage;
    }

    return true;
  }
})

// Async validation (using onchange instead)
m(TextInput, {
  label: 'Email',
  value: email,
  oninput: (v) => email = v,
  onchange: async (value) => {
    // Perform async validation on blur
    const isAvailable = await checkEmailAvailability(value);
    if (!isAvailable) {
      // Handle error state
    }
  },
  validate: (value) => {
    // Synchronous email format check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format';
  }
})
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
Located in: `select.ts`, `search-select.ts`, `radio.ts`, `switch.ts`, `dropdown.ts`, `likert-scale.ts`

- Select
- SearchSelect (searchable dropdown)
- RadioButtons
- LikertScale (survey rating scales with semantic anchors)
- Switch
- Dropdown

#### LikertScale Component (New in v3.13)

The **LikertScale** component is a purpose-built solution for survey questions and rating scales that eliminates the need for RadioButtons workarounds.

**Key Features:**
- **Horizontal/Vertical/Responsive Layouts**: Automatically adapts to desktop (horizontal) and mobile (vertical)
- **Scale Anchors**: Optional start, middle, and end labels for semantic meaning (e.g., "Very Unhappy" → "Neutral" → "Very Happy")
- **Multi-Question Alignment**: Grid-based layout for vertically aligned survey forms
- **Optional Tooltips**: Show descriptive text on hover (similar to Rating component)
- **Optional Number Display**: Show/hide numeric values (default: false)
- **Size Variants**: Small (36px), Medium (48px), Large (56px) touch targets
- **Density Variants**: Compact (4px), Standard (12px), Comfortable (20px) spacing
- **Full Accessibility**: Keyboard navigation, ARIA labels, screen reader support

**Basic Usage:**
```typescript
import { LikertScale } from 'mithril-materialized';

// Simple rating scale
m(LikertScale, {
  label: 'How happy are you?',
  min: 1,
  max: 5,
  value: happiness,
  onchange: (v) => { happiness = v; },
  startLabel: 'Very Unhappy',
  endLabel: 'Very Happy',
})
```

**Multi-Question Survey Pattern:**
```typescript
// Aligned survey questions
m('.survey-section', [
  m('h5', 'Employee Satisfaction Survey'),

  m(LikertScale, {
    label: 'How happy are you?',
    min: 1,
    max: 5,
    value: q1,
    onchange: (v) => { q1 = v; },
    startLabel: 'Unhappy',
    endLabel: 'Happy',
    alignLabels: true,  // Enables grid alignment
  }),

  m(LikertScale, {
    label: 'How satisfied are you with your work?',
    min: 1,
    max: 5,
    value: q2,
    onchange: (v) => { q2 = v; },
    startLabel: 'Dissatisfied',
    endLabel: 'Satisfied',
    alignLabels: true,
  }),

  m(LikertScale, {
    label: 'How engaged do you feel?',
    min: 1,
    max: 5,
    value: q3,
    onchange: (v) => { q3 = v; },
    startLabel: 'Disengaged',
    endLabel: 'Engaged',
    alignLabels: true,
  }),
])
```

**Advanced Features:**
```typescript
// With all features
m(LikertScale, {
  label: 'Rate your satisfaction',
  description: 'Please rate from 1 (Very Dissatisfied) to 7 (Very Satisfied)',
  min: 1,
  max: 7,
  value: satisfaction,
  onchange: (v) => { satisfaction = v; },

  // Scale anchors
  startLabel: 'Very Dissatisfied',
  middleLabel: 'Neutral',          // Optional middle anchor
  endLabel: 'Very Satisfied',

  // Tooltips (hover to see descriptive text)
  showTooltips: true,
  tooltipLabels: [
    'Very Dissatisfied',
    'Dissatisfied',
    'Somewhat Dissatisfied',
    'Neutral',
    'Somewhat Satisfied',
    'Satisfied',
    'Very Satisfied',
  ],

  // Display options
  showNumbers: false,               // Hide numbers (default)
  density: 'comfortable',           // compact | standard | comfortable
  size: 'medium',                   // small | medium | large
  layout: 'horizontal',             // horizontal | vertical | responsive

  // Form integration
  name: 'satisfaction',
  isMandatory: true,
})
```

**Component Interface:**
```typescript
interface LikertScaleAttrs<T extends number = number> extends Attributes {
  // Scale configuration
  min?: number;                     // default: 1
  max?: number;                     // default: 5
  step?: number;                    // default: 1

  // State management (consistent with Rating)
  value?: T;                        // controlled mode
  defaultValue?: T;                 // uncontrolled mode
  onchange?: (value: T) => void;

  // Labels
  label?: string;                   // question/prompt
  description?: string;             // helper text
  startLabel?: string;              // anchor for min value
  middleLabel?: string;             // anchor for middle value (optional)
  endLabel?: string;                // anchor for max value

  // Display options
  showNumbers?: boolean;            // default: false
  showTooltips?: boolean;           // default: false
  tooltipLabels?: string[];         // custom tooltip per value

  // Size and density
  density?: 'compact' | 'standard' | 'comfortable';  // default: 'standard'
  size?: 'small' | 'medium' | 'large';              // default: 'medium'

  // Layout
  layout?: 'horizontal' | 'vertical' | 'responsive'; // default: 'responsive'

  // Form integration
  id?: string;
  name?: string;                    // for form submission
  disabled?: boolean;
  readonly?: boolean;
  isMandatory?: boolean;

  // Accessibility
  'aria-label'?: string;
  ariaLabel?: string;

  // Styling
  className?: string;
  style?: any;

  // Multi-question alignment
  alignLabels?: boolean;            // use CSS grid for alignment (default: false)
}
```

**When to Use LikertScale vs RadioButtons vs Rating:**

| Component | Best For | Use Case |
|-----------|----------|----------|
| **LikertScale** | Survey questions with semantic scales | "How satisfied are you?" with 1-5 scale and anchors |
| **RadioButtons** | Multiple-choice questions | "What is your favorite color?" with distinct options |
| **Rating** | Star/icon ratings and reviews | Product ratings, skill levels, movie reviews |

**Styling:**

The LikertScale component uses the same radio button styling as RadioButtons (16x16px core circle) and supports all Material Design color theming via CSS custom properties.

```scss
// Size variants affect touch targets
.likert-scale--small .likert-scale__label { min-width: 36px; min-height: 36px; }
.likert-scale--medium .likert-scale__label { min-width: 48px; min-height: 48px; }
.likert-scale--large .likert-scale__label { min-width: 56px; min-height: 56px; }

// Density variants affect spacing
.likert-scale--compact .likert-scale__scale { gap: 4px; }
.likert-scale--standard .likert-scale__scale { gap: 12px; }
.likert-scale--comfortable .likert-scale__scale { gap: 20px; }
```

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
- Rating (configurable star/icon rating with tooltip support)
- Wizard (multi-step stepper)

### Collection Components
Located in: `collection.ts`, `collapsible.ts`

- Collection (basic, link, avatar with rich content support)
- Collapsible (accordion)

**New in v3.13**: Collection items now support rich content via the `content` property, allowing you to use Mithril vnodes instead of just plain text:

```typescript
m(Collection, {
  items: [
    {
      title: 'User Profile',
      content: m('.custom-content', [
        m('p', 'Rich HTML content'),
        m('span.badge', 'New'),
      ]),
    },
  ],
})
```

### Utility Components
Located in: `theme-switcher.ts`, `file-upload.ts`, `code-block.ts`

- ThemeSwitcher, ThemeToggle (light/dark theme)
- FileUpload (drag-and-drop)
- CodeBlock

## TypeScript Type System

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

Dark/light theme support using CSS custom properties. The library defines **50+ CSS variables** for complete theme customization.

#### Complete CSS Variables Reference

**Light Theme (`:root`):**

```css
:root {
  /* Primary & Secondary Colors */
  --mm-primary-color: #26a69a;
  --mm-primary-color-light: #80cbc4;
  --mm-primary-color-dark: #00695c;
  --mm-secondary-color: #ff6f00;
  --mm-secondary-color-light: #ffa726;
  --mm-secondary-color-dark: #ef6c00;

  /* Background Colors */
  --mm-background-color: #ffffff;
  --mm-surface-color: #ffffff;
  --mm-card-background: #ffffff;

  /* Text Colors */
  --mm-text-primary: rgba(0, 0, 0, 0.87);
  --mm-text-secondary: rgba(0, 0, 0, 0.6);
  --mm-text-disabled: rgba(0, 0, 0, 0.38);
  --mm-text-hint: rgba(0, 0, 0, 0.38);

  /* Border & Divider Colors */
  --mm-border-color: rgba(0, 0, 0, 0.12);
  --mm-divider-color: rgba(0, 0, 0, 0.12);

  /* Input Colors */
  --mm-input-background: #ffffff;
  --mm-input-border: rgba(0, 0, 0, 0.42);
  --mm-input-border-focus: var(--mm-primary-color);
  --mm-input-text: var(--mm-text-primary);

  /* Button Colors */
  --mm-button-background: var(--mm-primary-color);
  --mm-button-text: #ffffff;
  --mm-button-flat-text: var(--mm-primary-color);

  /* Navigation Colors */
  --mm-nav-background: var(--mm-primary-color);
  --mm-nav-text: #ffffff;
  --mm-nav-active-text: #ffffff;

  /* Modal & Overlay Colors */
  --mm-modal-background: #ffffff;
  --mm-overlay-background: rgba(0, 0, 0, 0.5);

  /* Shadow Colors */
  --mm-shadow-color: rgba(0, 0, 0, 0.16);
  --mm-shadow-umbra: rgba(0, 0, 0, 0.2);
  --mm-shadow-penumbra: rgba(0, 0, 0, 0.14);
  --mm-shadow-ambient: rgba(0, 0, 0, 0.12);

  /* Chip Colors */
  --mm-chip-bg: #e4e4e4;
  --mm-chip-text: var(--mm-text-secondary);

  /* Dropdown Colors */
  --mm-dropdown-hover: #eee;
  --mm-dropdown-focus: #ddd;
  --mm-dropdown-selected: #e3f2fd;

  /* Table & Collection Colors */
  --mm-row-hover: rgba(0, 0, 0, 0.04);
  --mm-table-striped-color: rgba(0, 0, 0, 0.05);

  /* Switch Colors */
  --mm-switch-checked-track: rgba(38, 166, 154, 0.3);
  --mm-switch-checked-thumb: #26a69a;
  --mm-switch-unchecked-track: rgba(0, 0, 0, 0.6);
  --mm-switch-unchecked-thumb: #f5f5f5;
  --mm-switch-disabled-track: rgba(0, 0, 0, 0.12);
  --mm-switch-disabled-thumb: #bdbdbd;
}
```

**Dark Theme (`[data-theme="dark"]`):**

```css
[data-theme="dark"] {
  /* Primary & Secondary Colors */
  --mm-primary-color: #80cbc4;
  --mm-primary-color-light: #b2dfdb;
  --mm-primary-color-dark: #4db6ac;
  --mm-secondary-color: #ffa726;
  --mm-secondary-color-light: #ffcc02;
  --mm-secondary-color-dark: #ff8f00;

  /* Background Colors */
  --mm-background-color: #121212;
  --mm-surface-color: #1e1e1e;
  --mm-card-background: #2d2d2d;

  /* Text Colors */
  --mm-text-primary: rgba(255, 255, 255, 0.87);
  --mm-text-secondary: rgba(255, 255, 255, 0.6);
  --mm-text-disabled: rgba(255, 255, 255, 0.38);
  --mm-text-hint: rgba(255, 255, 255, 0.38);

  /* Border & Divider Colors */
  --mm-border-color: rgba(255, 255, 255, 0.12);
  --mm-divider-color: rgba(255, 255, 255, 0.12);

  /* Input Colors */
  --mm-input-background: #2d2d2d;
  --mm-input-border: rgba(255, 255, 255, 0.42);
  --mm-input-border-focus: var(--mm-primary-color);
  --mm-input-text: var(--mm-text-primary);

  /* Button Colors */
  --mm-button-background: var(--mm-primary-color);
  --mm-button-text: #000000;  /* Dark text on light primary */
  --mm-button-flat-text: var(--mm-primary-color);

  /* Navigation Colors */
  --mm-nav-background: #1e1e1e;
  --mm-nav-text: #ffffff;
  --mm-nav-active-text: #ffffff;

  /* Modal & Overlay Colors */
  --mm-modal-background: #2d2d2d;
  --mm-overlay-background: rgba(0, 0, 0, 0.8);

  /* Shadow Colors */
  --mm-shadow-color: rgba(0, 0, 0, 0.5);
  --mm-shadow-umbra: rgba(0, 0, 0, 0.5);
  --mm-shadow-penumbra: rgba(0, 0, 0, 0.36);
  --mm-shadow-ambient: rgba(0, 0, 0, 0.3);

  /* Chip Colors */
  --mm-chip-bg: #424242;
  --mm-chip-text: var(--mm-text-secondary);

  /* Dropdown Colors */
  --mm-dropdown-hover: #444;
  --mm-dropdown-focus: #555;
  --mm-dropdown-selected: #1e3a8a;

  /* Table & Collection Colors */
  --mm-row-hover: rgba(255, 255, 255, 0.04);
  --mm-row-stripe: rgba(255, 255, 255, 0.02);
  --mm-table-striped-color: rgba(255, 255, 255, 0.05);

  /* Switch Colors */
  --mm-switch-checked-track: rgba(128, 203, 196, 0.3);
  --mm-switch-checked-thumb: #80cbc4;
  --mm-switch-unchecked-track: rgba(255, 255, 255, 0.6);
  --mm-switch-unchecked-thumb: #616161;
  --mm-switch-disabled-track: rgba(255, 255, 255, 0.12);
  --mm-switch-disabled-thumb: #424242;
}
```

**Auto Dark Mode (prefers-color-scheme):**
```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Automatically applies dark theme variables */
    /* when user's OS is in dark mode and no explicit theme is set */
  }
}
```

#### Programmatic Theme Control

**TypeScript API**:
```typescript
import { ThemeManager } from 'mithril-materialized';

// Set theme explicitly
ThemeManager.setTheme('dark');   // 'light' | 'dark' | 'auto'
ThemeManager.setTheme('light');
ThemeManager.setTheme('auto');   // Respects OS preference

// Toggle between light and dark
ThemeManager.toggle();

// Get current theme
const currentTheme = ThemeManager.getTheme(); // Returns 'light' | 'dark' | 'auto'
```

#### Custom Theme Colors

Override CSS variables to create custom themes:

```css
/* Custom brand theme */
:root {
  --mm-primary-color: #1976d2;        /* Blue primary */
  --mm-primary-color-light: #63a4ff;
  --mm-primary-color-dark: #004ba0;
  --mm-secondary-color: #ff4081;      /* Pink accent */
}

/* Custom dark theme colors */
[data-theme="dark"] {
  --mm-primary-color: #90caf9;
  --mm-background-color: #0a0a0a;     /* Deeper black */
  --mm-surface-color: #1a1a1a;
}
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

**Standard Event Handlers:**

```typescript
// Input changes (oninput fires on every keystroke)
oninput: (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = getValue(target);

  // Update internal state if uncontrolled
  if (!isControlled(attrs)) {
    state.internalValue = value;
  }

  // Call parent handler with clean value
  if (attrs.oninput) {
    attrs.oninput(value);
  }

  // Don't validate on input - wait for blur
  // Clear invalid state if user is actively fixing
  if (validate && target.classList.contains('invalid')) {
    const validationResult = validate(value, target);
    if (typeof validationResult === 'boolean' && validationResult) {
      target.classList.remove('invalid');
      target.classList.add('valid');
      state.isValid = true;
    }
  }
}

// Change (fires on blur after value changed)
onblur: (e: FocusEvent) => {
  const target = e.target as HTMLInputElement;
  state.active = false;
  state.hasInteracted = true;

  // Perform validation (see validation section)
  if (attrs.validate && !attrs.readonly && !attrs.disabled) {
    const value = getValue(target);
    const result = attrs.validate(value, target);
    // Update validity state
  }

  // Call parent handlers
  if (attrs.onblur) attrs.onblur(e);
  if (attrs.onchange) attrs.onchange(getValue(target));
}

// Focus
onfocus: () => {
  state.active = true;
}

// Keyboard events (with typed values)
onkeyup: onkeyup
  ? (ev: KeyboardEvent) => {
      const value = getValue(ev.target as HTMLInputElement);
      onkeyup(ev, value);
    }
  : undefined,

onkeydown: onkeydown
  ? (ev: KeyboardEvent) => {
      const value = getValue(ev.target as HTMLInputElement);
      onkeydown(ev, value);
    }
  : undefined,
```

**Event Handler Examples:**

```typescript
// Real-time input handling
m(TextInput, {
  label: 'Search',
  oninput: (value) => {
    console.log('User is typing:', value);
    // Update search results in real-time
    performSearch(value);
  }
})

// Change on blur only
m(TextInput, {
  label: 'Name',
  defaultValue: user.name,
  onchange: (value) => {
    console.log('Final value:', value);
    // Save to backend on blur
    updateUser({ name: value });
  }
})

// Keyboard shortcuts
m(TextInput, {
  label: 'Command',
  onkeydown: (event, value) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      executeCommand(value);
    }
    if (event.key === 'Escape') {
      clearCommand();
    }
  }
})

// Combining multiple event handlers
m(TextInput, {
  label: 'Message',
  value: message,
  oninput: (v) => {
    message = v;
    updateCharacterCount(v);
  },
  onchange: (v) => {
    saveMessageDraft(v);
  },
  onkeydown: (ev, v) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      sendMessage(v);
    }
  }
})

// Focus and blur handling
m(TextInput, {
  label: 'Email',
  onfocus: () => {
    console.log('Input focused');
    showEmailSuggestions();
  },
  onblur: (event) => {
    console.log('Input blurred');
    hideEmailSuggestions();
  }
})
```

**Range Input Event Handling:**

```typescript
// Single value range
m(RangeInput, {
  label: 'Volume',
  min: 0,
  max: 100,
  value: volume,
  oninput: (value) => {
    // Called while dragging
    volume = value;
    updateVolumeDisplay(value);
  },
  onchange: (value) => {
    // Called when drag ends
    saveVolumePreference(value);
  }
})

// Double-thumb range (min-max)
m(RangeInput, {
  label: 'Price Range',
  min: 0,
  max: 1000,
  minmax: true,
  minValue: priceMin,
  maxValue: priceMax,
  oninput: (min, max) => {
    // Both values provided for minmax mode
    priceMin = min;
    priceMax = max;
    updateProductFilter(min, max);
  },
  onchange: (min, max) => {
    saveFilterPreferences({ priceMin: min, priceMax: max });
  }
})
```

**Select/Dropdown Event Handling:**

```typescript
// Simple select
m(Select, {
  label: 'Country',
  options: countries,
  value: selectedCountry,
  onchange: (value) => {
    selectedCountry = value;
    loadStates(value);
  }
})

// Multiple select
m(Select, {
  label: 'Tags',
  options: availableTags,
  multiple: true,
  value: selectedTags,
  onchange: (values) => {
    // values is an array for multiple select
    selectedTags = values;
    filterItems(values);
  }
})
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
- `packages/lib/src/likert-scale.ts` - LikertScale component (v3.13)
- `packages/lib/src/rating.ts` - Rating component with tooltips (v3.13)
- `packages/lib/src/collection.ts` - Collection with rich content (v3.13)

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

### What's New in v3.13

**New Components:**
- **LikertScale**: Purpose-built for survey questions with semantic scales
  - Horizontal/vertical/responsive layouts
  - Scale anchors (start/middle/end labels)
  - Multi-question alignment for professional surveys
  - Optional tooltips and number display
  - Size and density variants

**Enhanced Components:**
- **Rating**: Tooltips now display correctly on hover when `showTooltips: true` and `tooltipLabels` are provided
- **Collection**: Items support rich content via `content` property (Mithril vnodes)

**Use Cases:**
- Survey forms with aligned Likert-scale questions
- Product/service satisfaction ratings with descriptive anchors
- Employee engagement surveys
- Customer feedback forms
- Multi-question assessments

This skill provides comprehensive guidance for developing, maintaining, and troubleshooting the mithril-materialized library. Use it as a reference when working with any aspect of the library.
