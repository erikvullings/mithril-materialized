# mithril-materialized

Typed Mithril components with Material Design foundations, accessible interaction patterns, and no external JavaScript UI runtime.

[Documentation](https://erikvullings.github.io/mithril-materialized/#!/home) · [npm](https://www.npmjs.com/package/mithril-materialized) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

## Why mithril-materialized

- **TypeScript-first APIs** with explicit controlled and uncontrolled component contracts.
- **Broad component coverage** for forms, navigation, overlays, feedback, data display, and application layouts.
- **Accessible interaction** with keyboard navigation, focus management, ARIA semantics, and coarse-pointer support.
- **Flexible styling** through light and dark themes, CSS custom properties, modular stylesheets, and an optional Compact Minimal preset.
- **No JavaScript framework dependency beyond Mithril**; components do not require Materialize JavaScript or jQuery.

## Version 4 release

Version 4 introduces the Compact Minimal design preset for dense desktop applications and standardizes field layout across the library. It also includes Dialog and AlertDialog abstractions, typed menus, CommandPalette, SnackbarQueue, Avatar and AvatarGroup, Skeleton and EmptyState, VirtualList, and virtualized DataTable rows.

### Breaking layout change

`SearchSelect`, `FileUpload`, `LikertScale`, `Rating`, `SingleRangeSlider`, and `DoubleRangeSlider` now default their outer wrapper to `col s12`. Pass `className: ''` to retain a classless inline layout, or provide an explicit grid width such as `className: 'col s6'`.

### Compact Minimal preset

Import the preset after the standard stylesheet and activate it on the document root:

```typescript
import 'mithril-materialized/index.css';
import 'mithril-materialized/presets/compact-minimal.css';

document.documentElement.dataset.mmPreset = 'compact-minimal';
```

The preset provides compact typography, controls, forms, menus, navigation, dialogs, tables, pickers, feedback, and display components while retaining larger targets for coarse pointers.

## Installation

```bash
npm install mithril mithril-materialized
```

### AI agent skill

Install the application-integration skill for supported coding agents with:

```bash
npx skills add erikvullings/mithril-materialized --skill mithril-materialized
```

The skill includes focused component, form-layout, and theming references. It teaches agents the Version 4 APIs and Compact Minimal preset without loading the full reference material into every conversation. Review third-party skills before installation; use `npx skills add erikvullings/mithril-materialized --list` to inspect what the repository exposes.

## Supported Components

Components marked with an * are not included in the original materialize-css library.

- [Buttons](https://erikvullings.github.io/mithril-materialized/#!/buttons)
  - Button
  - FlatButton
  - RoundButton
  - SubmitButton
- [Inputs](https://erikvullings.github.io/mithril-materialized/#!/inputs)
  - TextInput
  - TextArea
  - AutoComplete
  - UrlInput
  - EmailInput
  - NumberInput
  - ColorInput
  - RangeInput* (with vertical, double-thumb support, and smart tooltip display)
  - Chips
- [Pickers](https://erikvullings.github.io/mithril-materialized/#!/pickers)
  - DatePicker (with optional week numbers and date range selection)*
  - TimePicker (with inline mode and switchable AM/PM/24h)*
  - TimeRangePicker* (select time ranges with analog or digital clock display)
  - AnalogClock* (standalone analog clock component)
  - DigitalClock* (standalone digital clock component)
- [Selections](https://erikvullings.github.io/mithril-materialized/#!/selections)
  - Select
  - SearchSelect*, a searchable select dropdown (supports async remote loading via `loadOptions`)
  - Options
  - RadioButtons (HTML labels/descriptions require explicit `allowHtml: true`)
  - LikertScale* (survey rating scales with anchor labels)
  - Switch
  - Dropdown
  - ToggleGroup* (grouped toggle buttons for multiple selection)
  - ToggleButton* (single toggle button component)
- [Collections](https://erikvullings.github.io/mithril-materialized/#!/collections)
  - Basic, Link and Avatar Collections
  - Collapsible or accordion
- [Theme & Upload](https://erikvullings.github.io/mithril-materialized/#!/theme)
  - ThemeSwitcher* (light/dark/auto theme switching)
  - ThemeToggle* (simple light/dark toggle)
  - FileUpload* (drag-and-drop with validation and preview)
- [Navigation](https://erikvullings.github.io/mithril-materialized/#!/navigation)
  - Sidenav (responsive navigation drawer)
  - Breadcrumb* (navigation path indicator)
  - Wizard/Stepper* (multi-step process guidance)
- [Others](https://erikvullings.github.io/mithril-materialized/#!/modals)
  - Dialog and AlertDialog* (accessible confirmation and destructive-action dialogs)
  - Menu and ContextMenu* (typed action menus with keyboard navigation)
  - CommandPalette* (searchable keyboard command launcher)
  - ModalPanel
  - MaterialBox
  - Carousel
  - Pagination
  - PaginationControls*
  - Parallax
  - Toast* (notifications with optional actions)
  - SnackbarQueue* (ordered notifications with actions and accessible announcements)
  - Badge* (labels and notification indicators)
- Layout & Display
  - [Avatar and AvatarGroup](https://erikvullings.github.io/mithril-materialized/#!/misc?section=avatar)* (identity images, initials, icons, and grouped overflow)
  - [Skeleton and EmptyState](https://erikvullings.github.io/mithril-materialized/#!/misc?section=skeleton)* (loading and no-content states)
  - [Masonry](https://erikvullings.github.io/mithril-materialized/#!/masonry)* (Pinterest-style responsive grid layout)
  - [ImageList](https://erikvullings.github.io/mithril-materialized/#!/image-list)* (responsive image galleries with various layouts)
  - [Timeline](https://erikvullings.github.io/mithril-materialized/#!/timeline)* (vertical timeline with events and milestones)
  - CircularProgress* (circular loading indicator)
  - LinearProgress* (linear loading indicator)
- [Rating](https://erikvullings.github.io/mithril-materialized/#!/rating)*
  - Rating (configurable range, step size, density, and custom icons)
- [Data & Tables](https://erikvullings.github.io/mithril-materialized/#!/datatable)
  - DataTable* (sorting, filtering, pagination, selection, and optional fixed-height virtualization)
  - VirtualList* (fixed-height virtualized rendering for large lists)
  - TreeView* (hierarchical data with expand/collapse, selection, and customizable icons)
- Additional
  - Label
  - HelperText
  - CodeBlock
  - Icon, a simple wrapper for creating icons using material-icons font
  - MaterialIcon, for creating the close/clear and caret as SVG

## Usage

Online [flems](flems.io) examples: [FlatButton](https://flems.io/#0=N4IgtglgJlA2CmIBcBWFA6AnAJgDQgGd4EBjAF3imRHTIJHwDMIF6kBtUAOwEMxEkNABZkwsBiBIB7LhVnUAPLAhcA1gAIATsQC8AHUJkAnqyHx4ZA+qHbG+kCLIAHAkgD0bgK5cnqgObo0mBukGQ2LAC0YDwUmhA8ygBelG5QEARkbipQ8AAegQQEBgB8elwSRKRkEDJsIACMSAAMIAC+uNx8AjR0EtKy8PKC-RnqwOoAYrAxAEKeZGQy6q3qOuoA7tlS6+wA5KHhsFEx8HEJEMlQuwC6ANxlZSNk6jIkyiQaawAUAJSrxeoEqcyF9dqoAFZCCG7H4PLhgdDaLg5TRfKBSEiefiydAAIykUCMuHUYC+U1m80WXGJ42muOISHUBgAskZJtNnrjKTIDMTXu8NK0fj97lwyhViPByDUuHUAGzNNodEC8fjUAr0fD9ORkahta74ZRqNicFVdagHOLifCeTTiQSOFzuLw+fyBKTBS0sAAC2HQAGZ0AB2EIQMJW9CQLjocGakDGJzdAgkOJOXXtTpqwReo7RWLxJKUCS2+0OBZOjzeXwBIKh8ORPOnAsXSjewOBgAsqXSmWyeXQWKgMbjCaTKYgaf1rSAA) and [Select](https://flems.io/#0=N4IgtglgJlA2CmIBcBWFA6AnAJgDQgGd4EBjAF3imRHTIJHwDMIF6kBtUAOwEMxEkNABZkwsBiBIB7LhVnUAPLAhcA1gAIATsQC8AHUJkAnqyHx4ZA+qHbG+kCLIAHAkgD0bgK5cnqgObo0mBukGQ2LAC0YDwUmhA8ygBelG5QEARkbipQ8AAegQQEBgB8elwSRKRkEDJsIACMSAAMIAC+uNx8AjR0EtKy8PKC-RnqwOoAysTw5Oqt6jrqAO7ZUkvsAOSh4bBRMfBxCRDJUBsAugDcZWUIZOokZiSqlACSUAvqG9gbV1xlYOgwFJvGQABRQKQkTz8WToABGUigRlwY2uZAAbhB4EskOpQQBKBbFdRgUEbdCaNYbFHjDImeC48bRTR+FQAFSkTlxG3qTScuQ2czmKLK6jFJNBUyqNPUsB4cOI3KlMzu-Gp6lF4rFTjlJHgQiksBymm5AGFlE91DJ4NTNVqHjNnlA3rg7eLOdVarj2G6teNoNz6uq5QrYNyAPJOT1cdRB4W+8X+qDc74okOKz6R6Pqb7xmNaxPqAOfADMwflGY2WZqMbLeYL6jOrvzWpkDx4XD8DLx6MJOmJwATYodT1e70W6N+Dfabta+LKc+uf3K+EqKprdSazQi2EaLXanX41AK9Hw-TkZGobSbIGUajYnBAvCPgm2cXE+E8mnEgkcLncXg+P4gRSMEb4sAAAtg6AlugADsIQQGE76Aio6AAFaniAxhON0BAkHEUZtB0T5dNQ4G7NEsTxEklASF+P4OGQziuB43i+AEQSIchkRUQcNHHJQEGwbBAAsqTpJk2R5Og0JQBhWE4XhBEQERrRnK0QA).

### Quick Start

1. **Install the package**:

   ```bash
   npm install mithril mithril-materialized
   ```

2. **Import the CSS** (optional, for Material Design styling):

   ```typescript
   import 'mithril-materialized/index.css';
   ```

3. **Use components in your app**:

   ```typescript
   import m from 'mithril';
   import {
     TextInput,
     Button,
     RangeInput,
     DatePicker,
     TimePicker,
     TimeRangePicker,
     AnalogClock,
     DigitalClock,
     DataTable,
     TreeView,
     ThemeToggle,
     FileUpload,
     Sidenav,
     Breadcrumb,
     Wizard,
     Masonry,
     Timeline,
     ImageList,
     Badge,
     CircularProgress,
     LinearProgress,
     ToggleGroup,
     LikertScale,
     Rating,
     Toast
   } from 'mithril-materialized';

   const MyComponent = () => ({
     view: () => m('.container', [
       // Theme toggle in header
       m('nav', [
         m('.nav-wrapper', [
           m('.right', m(ThemeToggle))
         ])
       ]),
       
       // Breadcrumb navigation
       m(Breadcrumb, {
         items: [
           { text: 'Home', href: '/' },
           { text: 'Products', href: '/products' },
           { text: 'Details', active: true }
         ]
       }),
       
       // Form inputs
       m(TextInput, {
         label: 'Your name',
         onchange: (value) => console.log(value)
       }),
       
       // Enhanced range sliders with smart tooltips
       m(RangeInput, {
         label: 'Volume',
         min: 0,
         max: 100,
         valueDisplay: 'auto', // Show tooltip on drag
         onchange: (value) => console.log('Volume:', value)
       }),
       
       m(RangeInput, {
         label: 'Price Range',
         min: 0,
         max: 1000,
         minmax: true,
         minValue: 100,
         maxValue: 500,
         valueDisplay: 'always', // Always show values
         onchange: (min, max) => console.log('Range:', min, '-', max)
       }),
       
       m(RangeInput, {
         label: 'Vertical Slider',
         min: 0,
         max: 100,
         vertical: true,
         height: '200px',
         valueDisplay: 'auto',
         tooltipPos: 'right',
         onchange: (value) => console.log('Vertical:', value)
       }),
       
       // Enhanced DatePicker with range selection
       m(DatePicker, {
         label: 'Event Date',
         helperText: 'Select a single date',
         format: 'mmmm d, yyyy',
         onchange: (value) => console.log('Date:', value)
       }),
       
       m(DatePicker, {
         dateRange: true,
         label: 'Project Timeline',
         helperText: 'Select start and end dates',
         format: 'mmmm d, yyyy',
         minDateRange: 1,
         maxDateRange: 30,
         onchange: (value) => console.log('Date range:', value)
       }),
       
       m(Button, {
         label: 'Submit',
         onclick: () => alert('Hello!')
       }),

       // Progress indicators
       m(CircularProgress, {
         color: 'blue',
         size: 'medium'
       }),

       m(LinearProgress, {
         progress: 65,
         color: 'green'
       }),

       // Badge component
       m('.section', [
         m('span', { style: 'position: relative' }, [
           'Notifications',
           m(Badge, { value: 3, color: 'red' })
         ])
       ]),

       // Toggle Group for selections
       m(ToggleGroup, {
         items: [
           { id: 'left', label: 'Left', icon: 'align_left' },
           { id: 'center', label: 'Center', icon: 'align_center' },
           { id: 'right', label: 'Right', icon: 'align_right' }
         ],
         selectedIds: ['center'],
         onchange: (selectedIds) => console.log('Selected:', selectedIds)
       }),

       // LikertScale for survey questions
       m(LikertScale, {
         label: 'How satisfied are you with our service?',
         min: 1,
         max: 5,
         value: 3,
         onchange: (value) => console.log('Rating:', value),
         startLabel: 'Very Dissatisfied',
         middleLabel: 'Neutral',
         endLabel: 'Very Satisfied',
         showTooltips: true,
         tooltipLabels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
       }),

       // Multi-question survey with alignment
       m('.survey-section', [
         m('h5', 'Employee Satisfaction Survey'),
         m(LikertScale, {
           label: 'How happy are you at work?',
           alignLabels: true,
           min: 1,
           max: 5,
           value: 4,
           onchange: (v) => console.log('Happiness:', v),
           startLabel: 'Unhappy',
           endLabel: 'Happy'
         }),
         m(LikertScale, {
           label: 'How satisfied are you with your role?',
           alignLabels: true,
           min: 1,
           max: 5,
           value: 3,
           onchange: (v) => console.log('Satisfaction:', v),
           startLabel: 'Dissatisfied',
           endLabel: 'Satisfied'
         })
       ]),

       // Rating component with tooltips
       m(Rating, {
         value: 4,
         max: 5,
         showTooltips: true,
         tooltipLabels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
         onchange: (value) => console.log('Rating:', value)
       }),

       // Time Range Picker
       m(TimeRangePicker, {
         label: 'Select Time Range',
         startTime: '09:00',
         endTime: '17:00',
         clockType: 'analog',
         onchange: (start, end) => console.log('Time range:', start, '-', end)
       }),

       // File upload
       m(FileUpload, {
         accept: 'image/*',
         multiple: true,
         onFilesSelected: (files) => console.log(files)
       }),
       
       // TreeView for hierarchical data
       m(TreeView, {
         data: [
           {
             id: 'root',
             label: 'Project Root',
             expanded: true,
             children: [
               { id: 'src', label: 'src/' },
               { id: 'docs', label: 'docs/' },
             ]
           }
         ],
         selectionMode: 'multiple',
         iconType: 'caret',
         showConnectors: true,
         onselection: (selectedIds) => console.log('Selected:', selectedIds)
       }),
       
       // Layout components
       m(Masonry, {
         items: [
           { id: 1, title: 'Card 1', content: 'Short content' },
           { id: 2, title: 'Card 2', content: 'Much longer content...' },
           { id: 3, title: 'Card 3', content: 'Medium content' }
         ],
         columnWidth: 250,
         gap: 16,
         renderItem: (item) => m('.card', [
           m('.card-content', [
             m('span.card-title', item.title),
             m('p', item.content)
           ])
         ])
       }),
       
       m(Timeline, {
         events: [
           {
             id: 1,
             title: 'Project Started',
             date: '2024-01-15',
             description: 'Initial project kickoff',
             type: 'milestone'
           },
           {
             id: 2,
             title: 'First Release',
             date: '2024-03-20',
             description: 'Released version 1.0',
             type: 'release'
           }
         ]
       }),
       
       m(ImageList, {
         images: [
           { src: '/image1.jpg', alt: 'Image 1' },
           { src: '/image2.jpg', alt: 'Image 2' },
           { src: '/image3.jpg', alt: 'Image 3' }
         ],
         layout: 'masonry', // 'grid' | 'masonry' | 'quilted'
         cols: 3
       })
     ])
   });
   ```

### Integration with Build Tools

**Webpack/Vite/Parcel**: The library works out-of-the-box with modern bundlers.

**CSS Framework Integration**: You can use the components with any CSS framework. The included CSS provides Material Design styling, but you can override it with your own styles.

**TypeScript**: Full TypeScript support with comprehensive type definitions included.

See the [live documentation](https://erikvullings.github.io/mithril-materialized/index.html) for examples and component APIs.

### Button semantics

`Button`, `LargeButton`, `SmallButton`, and `FlatButton` render native `<button>` elements for actions. Use `href` when the component represents navigation; it then renders an `<a>` without a button `type`.

```typescript
m(Button, { label: 'Save', onclick: save });
m(Button, { label: 'Read the docs', href: '/docs' });
```

> **Migration:** If you relied on the previous anchor markup for navigation, add `href`. Action buttons now correctly use native button semantics.

### Async SearchSelect

`SearchSelect` supports remote option loading for large datasets through `loadOptions(query)`.

```typescript
m(SearchSelect<number>, {
  label: 'Remote search',
  checkedId: selectedIds,
  options: [],
  loadOptions: async (query) => fetchOptions(query),
  i18n: {
    loadingOptions: 'Loading options...',
    loadingError: 'Request failed',
    noOptionsFound: 'No options found',
  },
  onchange: (ids) => {
    selectedIds = ids;
  },
});
```

### Combobox Keyboard & Accessibility

- Trigger uses `role="combobox"` with `aria-expanded` and `aria-haspopup="listbox"`
- Option list uses `role="listbox"`; options use `role="option"` and `aria-selected`
- Keyboard navigation supports `ArrowDown`, `ArrowUp`, `Enter`/`Space`, and `Escape`

> **Note**: The date range picker is now fully implemented with comprehensive validation and formatting support.

### Feedback and empty states

`snackbar()` adds messages to the shared FIFO queue. Actions and dismiss controls use native buttons, and the active timeout pauses while the snackbar is hovered or focused.

```typescript
import { EmptyState, Skeleton, snackbar } from 'mithril-materialized';

snackbar({
  message: 'Project deleted',
  dismissible: true,
  action: { label: 'Undo', onclick: restoreProject },
});

m(Skeleton, { shape: 'text', count: 3 });
m(Skeleton, { shape: 'circular', width: 48, margin: '0 0 16px' });

m(EmptyState, {
  title: 'No projects yet',
  description: 'Create a project to start organizing your work.',
  primaryAction: { label: 'Create project', onclick: createProject },
});
```

### Command palette

Create the generic component once and keep it stable between redraws. It supports controlled or uncontrolled visibility, grouped commands, custom filtering, and accessible combobox keyboard interaction.

```typescript
import { CommandPalette } from 'mithril-materialized';

const ProjectCommands = CommandPalette<'new' | 'settings'>();

m(ProjectCommands, {
  enableGlobalShortcut: true,
  commands: [
    { id: 'new', label: 'New project', group: 'Project', execute: createProject },
    { id: 'settings', label: 'Open settings', execute: openSettings },
  ],
});
```

### Avatars

Images fall back once to explicit text, deterministic initials, or an icon. Set `alt: ''` for decorative avatars. Wrap interactive avatars in a native link or button.

```typescript
import { Avatar, AvatarGroup } from 'mithril-materialized';

m(Avatar, { src: user.photo, name: user.name, alt: user.name });

m(AvatarGroup, { max: 3, totalCount: 8, ariaLabel: 'Project members' }, [
  m(Avatar, { name: 'Ada Lovelace', alt: 'Ada Lovelace' }),
  m(Avatar, { name: 'Grace Hopper', alt: 'Grace Hopper' }),
  m(Avatar, { name: 'Katherine Johnson', alt: 'Katherine Johnson' }),
]);
```

### Large-data virtualization

`VirtualList` and DataTable virtualization use a fixed item/row height. Variable-height content is intentionally unsupported because it requires measurement and scroll-anchor invalidation.

```typescript
import { DataTable, VirtualList } from 'mithril-materialized';

const UserList = VirtualList<User>();

m(UserList, {
  items: users,
  height: 400,
  itemHeight: 48,
  overscan: 2,
  getItemKey: (user) => user.id,
  renderItem: (user) => user.name,
});

m(DataTable<User>, {
  data: users,
  columns,
  getRowKey: (user) => user.id,
  virtualization: { viewportHeight: 480, rowHeight: 48, overscan: 2 },
});
```

## Contributing

Contributions are welcome. See the [contributing guide](CONTRIBUTING.md) for development setup, coding conventions, and submission guidance. Please use the issue tracker for reproducible defects and focused feature proposals.

## Build instructions

This pnpm workspace contains the published library in `packages/lib` and the documentation application in `packages/example`.

```bash
pnpm install
pnpm start
```

The development server prints its local URL when ready. Use `pnpm --dir packages/lib test` for the library tests, `pnpm --dir packages/lib build` for the distributable package, and `pnpm build:example` for the documentation application.

## Styling and CSS

### CSS Usage

The library includes carefully crafted CSS that provides Material Design styling without external dependencies. You can import the ready-to-use CSS:

```typescript
import 'mithril-materialized/index.css';
```

**Important**: The CSS styling is **completely independent** of the original materialize-css. This means:

- No conflicting styles from materialize-css
- Smaller CSS bundle size
- Custom optimizations for better performance
- No external font dependencies

### Modular CSS architecture

**Tree-shakable CSS modules** for optimal bundle sizes! Import only the CSS you need:

```typescript
// Option 1: Import everything (64KB total)
import 'mithril-materialized/index.css';

// Option 2: Import only what you need (modular approach)
import 'mithril-materialized/core.css';      // Essential styles (18KB)
import 'mithril-materialized/forms.css';     // Form components only
import 'mithril-materialized/components.css'; // Interactive components

// Option 3: Advanced components only when needed
import 'mithril-materialized/pickers.css';   // Date/Time pickers
import 'mithril-materialized/advanced.css';  // Carousel, sidenav, etc.
import 'mithril-materialized/utilities.css'; // Badges, icons, cards
```

**CSS Modules Available:**

- `core.css` (18KB) - Essential foundation (normalize, grid, typography, variables)
- `components.css` - Interactive components (buttons, dropdowns, modals, tabs)
- `forms.css` - All form components (inputs, selects, switches, file upload)
- `pickers.css` - Date and time picker components
- `advanced.css` - Specialized components (carousel, sidenav, navbar, preloader)
- `utilities.css` - Visual utilities (badges, cards, icons, toast, chips)

### Compact Minimal preset

The optional Compact Minimal preset provides a denser, low-elevation desktop-tool presentation without changing component APIs or the default spacious design. Import it after your regular CSS bundle and activate it on the document root:

```typescript
import 'mithril-materialized/index.css';
import 'mithril-materialized/presets/compact-minimal.css';

document.documentElement.dataset.mmPreset = 'compact-minimal';
```

The preset is independent of color theme, so it works with `data-theme="light"`, `data-theme="dark"`, and automatic system theme selection. Remove the attribute to restore the default presentation:

```typescript
delete document.documentElement.dataset.mmPreset;
```

It covers buttons, form controls, selects, menus, navigation, dialogs, CommandPalette, DataTable, VirtualList, Snackbar, Avatar, Skeleton, and EmptyState. Coarse pointers automatically retain larger control and menu targets.
Its semantic typography scale also reduces heading, body, label, and control sizes while preserving the existing font family and readable hierarchy.

The preset does not change runtime geometry. Keep fixed-height virtualization configuration aligned with your content, for example:

```typescript
m(DataTable, {
  data,
  columns,
  virtualization: { viewportHeight: 360, rowHeight: 36, overscan: 2 },
});
```

Customize the preset after its import by overriding semantic tokens within the same activation scope:

```css
[data-mm-preset="compact-minimal"] {
  --mm-control-height: 34px;
  --mm-row-height: 38px;
  --mm-heading-2-font-size: 1.875rem;
  --mm-surface-radius: 2px;
}
```

### Form grid convention

Field-like controls default their outer wrapper to `col s12`, including `SearchSelect`, `FileUpload`, `LikertScale`, `Rating`, `SingleRangeSlider`, and `DoubleRangeSlider`. Pass `className` to replace that width:

```typescript
m('.row', [
  m(TextInput, { className: 'col s6', label: 'Name' }),
  m(SearchSelect, { className: 'col s6', options }),
]);
```

`ToggleButton` and `ToggleGroup` remain inline controls. **Migration note:** starting with the next major release, the six components listed above gain the full-width default. Consumers that relied on their previous classless layout should pass `className: ''`; use an explicit grid class such as `className: 'col s6'` when a fixed width is intended.

### Layout Utility Classes

The library now includes shared layout utility classes for common flex patterns used by selection and navigation components:

- `.mm-layout-row` and row modifiers such as `.mm-layout-row--center`, `.mm-layout-row--wrap`, `.mm-layout-row--justify-start`, and `.mm-layout-row--justify-between`
- `.mm-layout-stack` for vertical stacking patterns
- `.mm-layout-cluster` for wrapped horizontal clusters with tokenized gaps
- `.mm-layout-grow` and spacing helpers such as `.mm-layout-ml-auto`, `.mm-layout-ml-8`, `.mm-layout-mr-8`

These utilities use CSS custom-property fallbacks (for example `--mm-layout-gap`) so theme switching remains unaffected.

**Bundle Size Optimization:**

- Full bundle: 64KB gzipped (44KB JS + 20KB CSS)
- Modular approach can reduce CSS by 30-50%
- Use only `core.css` + specific modules for your use case

### Dark theme support

Built-in dark theme support with CSS custom properties:

```typescript
import { ThemeManager, ThemeSwitcher } from 'mithril-materialized';

// Programmatic theme control
ThemeManager.setTheme('dark');    // 'light' | 'dark' | 'auto'
ThemeManager.toggle();            // Toggle between light/dark
ThemeManager.getTheme();          // Get current theme

// UI Components
m(ThemeSwitcher, {
  onThemeChange: (theme) => console.log('Theme:', theme)
});

m(ThemeToggle); // Simple toggle button
```

**CSS Custom Properties**: All colors use CSS variables for runtime theme switching:

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

### SASS Usage

For advanced customization, you can use the SASS source files directly:

```css
// Import all SASS components
@import 'mithril-materialized/sass/materialize.scss';

// Or import individual components
@import 'mithril-materialized/sass/components/buttons';
@import 'mithril-materialized/sass/components/forms';
@import 'mithril-materialized/sass/components/grid';
```

**SASS Variables**: You can customize colors, spacing, and other design tokens by overriding SASS variables before importing:

```css
// Customize Material Design variables
$primary-color: #2196F3;
$secondary-color: #FF9800;

// Then import the library
@import 'mithril-materialized/sass/materialize.scss';
```

### Custom Styles

The library includes these additional styles for enhanced functionality:

```css
/* For the switch */
.clear,
.clear-10,
.clear-15 {
  clear: both;
  /* overflow: hidden; Precaution pour IE 7 */
}
.clear-10 {
  margin-bottom: 10px;
}
.clear-15 {
  margin-bottom: 15px;
}

span.mandatory {
  margin-left: 5px;
  color: red;
}

label+.switch {
  margin-top: 1rem;
}

/* For the color input */
input[type='color']:not(.browser-default) {
  margin: 0px 0 8px 0;
  /** Copied from input[type=number] */
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 16px;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transition: border 0.3s, -webkit-box-shadow 0.3s;
  transition: border 0.3s, -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s, border 0.3s;
  transition: box-shadow 0.3s, border 0.3s, -webkit-box-shadow 0.3s;
}

/* For the options' label */
.input-field.options > label {
  top: -2.5rem;
}

/* For the code block */
.codeblock {
  margin: 1.5rem 0 2.5rem 0;
}
.codeblock > div {
  margin-bottom: 1rem;
}
.codeblock > label {
  display: inline-block;
}
```
