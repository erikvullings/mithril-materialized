# mithril-materialized

A Mithril.js component library inspired by [materialize-css](https://materializecss.com) design principles, [available on npm](https://www.npmjs.com/package/mithril-materialized). This library provides you with ready-to-use Mithril components that follow Material Design guidelines, with **no external JavaScript dependencies**.

## 🚀 v3.3 - Latest Release

The current stable release that provides a complete Mithril.js Material Design component library with no external JavaScript dependencies.

### ✨ What's New

- **🔥 Zero External JS Dependencies**: No longer requires `materialize-css` JavaScript or `material-icons` fonts
- **📦 Smaller Bundle Size**: Reduced package size by eliminating external dependencies
- **⚡ Better Performance**: Direct implementations without jQuery or other heavy dependencies
- **🛠️ Enhanced Components**: Improved DatePicker with date ranges, week numbers, and TimePicker with configurable AM/PM/24h or inline style
- **🛠️ New Components**: DataTable, TreeView, Timeline, Masonry, RatingControl, ImageList, Wizard/Stepper, Breadcrumb
- **📱 Modern Architecture**: Factory components with proper TypeScript support
- **🎯 CSS-Only Styling**: Uses only CSS for styling - no JavaScript initialization needed
- **🎨 Custom SVG Icons**: Built-in MaterialIcon component with custom SVG icons (caret, close)

### ✨ Key Features

- **🔥 Zero External JS Dependencies**: No longer requires `materialize-css` JavaScript or `material-icons` fonts
- **📦 Smaller Bundle Size**: Reduced package size by eliminating external dependencies  
- **🎨 Custom SVG Icons**: Built-in MaterialIcon component with custom SVG icons
- **⚡ Better Performance**: Direct implementations without jQuery or other heavy dependencies
- **🛠️ Enhanced Components**: Comprehensive component library with modern features
- **🌗 Dark Theme Support**: Built-in light/dark theme system with CSS custom properties
- **📱 Modern Architecture**: Factory components with proper TypeScript support, and clear separation between [controlled and uncontrolled](CONTROLLED_COMPONENTS.md) component state
- **🎯 CSS-Only Styling**: Uses only CSS for styling - no JavaScript initialization needed

### 📦 Installation

```bash
npm install mithril mithril-materialized
```

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
- [Selections](https://erikvullings.github.io/mithril-materialized/#!/selections)
  - Select
  - SearchSelect*, a searchable select dropdown
  - Options
  - RadioButtons
  - Switch
  - Dropdown
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
  - ModalPanel
  - MaterialBox
  - Carousel
  - Pagination
  - PaginationControls*
  - Parallax
- Layout & Display
  - [Masonry](https://erikvullings.github.io/mithril-materialized/#!/masonry)* (Pinterest-style responsive grid layout)
  - [ImageList](https://erikvullings.github.io/mithril-materialized/#!/image-list)* (responsive image galleries with various layouts)
  - [Timeline](https://erikvullings.github.io/mithril-materialized/#!/timeline)* (vertical timeline with events and milestones)
- [Rating](https://erikvullings.github.io/mithril-materialized/#!/rating)*
  - RatingControl (Horizontal control, configurable range and step size, optionally with custom icons)
- [Data & Tables](https://erikvullings.github.io/mithril-materialized/#!/datatable)
  - DataTable* (sorting, filtering, pagination, selection)
  - TreeView* (hierarchical data with expand/collapse, selection, and customizable icons)
- Additional
  - Label
  - HelperText
  - CodeBlock
  - Icon, a simple wrapper for creating icons using material-icons font
  - MaterialIcon, for creating the close/clear and caret as SVG

## 📖 Usage Instructions

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
     DataTable,
     TreeView,
     ThemeToggle,
     FileUpload,
     Sidenav,
     Breadcrumb,
     Wizard,
     Masonry,
     Timeline,
     ImageList
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

> **Note**: The date range picker is now fully implemented with comprehensive validation and formatting support.

## 🗺️ Roadmap & Planned Improvements

### 🚀 Phase 1: Core Optimizations & New Components (In Progress)

**✅ Completed:**

- ✅ Modular CSS architecture with tree-shaking support
- ✅ Dark theme system with CSS custom properties  
- ✅ File upload component with drag-and-drop
- ✅ Theme switching components (ThemeSwitcher, ThemeToggle)
- ✅ Sidenav component with responsive behavior
- ✅ Breadcrumb navigation component
- ✅ Wizard/Stepper component for multi-step forms

**✅ Recently Completed (v3.2.x):**

- ✅ **TextArea Height Alignment**: Fixed single-line `textarea` height to match TextInput components perfectly
- ✅ **Improved AutoResize Logic**: TextArea now only sets custom height for multi-line content, matching Materialize CSS reference behavior
- ✅ **Better Mithril Integration**: Hidden div for height measurement now properly managed within Mithril's render cycle
- ✅ DataTable component with sorting, filtering, and pagination
- ✅ TreeView component for hierarchical data with expand/collapse, selection, and VSCode-style connectors
- ✅ Enhanced TypeScript definitions with better JSDoc comments
- ✅ Performance optimizations and bundle size improvements
- ✅ Enhanced RangeInput with vertical orientation, double-thumb range selection, and smart tooltip display
- ✅ Advanced DatePicker with date range selection, constraints, and format support
- ✅ Layout components: Masonry (Pinterest-style grid), Timeline (vertical event display), ImageList (responsive galleries)
- ✅ RatingControl with configurable icons, min/max, tooltip/helpers, readonly and disabled mode
- ✅ Improved RangeInput components converted to proper Mithril components with better lifecycle management
- ✅ Enhanced accessibility with individual thumb slider elements and PageUp/PageDown keyboard support

### 🎯 Phase 2: Advanced Components & Features

**Data Display:**

- Card layouts with enhanced Material Design 3.0 styling
- Advanced tree operations (drag & drop, context menus)

**Input & Forms:**

- ✅ Advanced date range picker with validation and constraints
- Autocomplete with async data loading

**Navigation & Layout:**

- AppBar/Toolbar component with responsive behavior
- Bottom navigation component for mobile apps
- Drawer/Sidebar component with overlay and push modes
- Grid system enhancements with CSS Grid support

### 🔮 Phase 3: Modern Features & Integration

**Developer Experience:**

- Storybook integration for component documentation
- Figma design system integration
- CLI tools for component generation
- Better accessibility (ARIA) support throughout

**Performance & Optimization:**

- Virtual scrolling for large lists
- Lazy loading component utilities
- Bundle analyzer and optimization tools
- CSS-in-JS runtime support option

### 📊 Bundle Size Targets

**Current Status (v3.2.2):**

- Total: ~65KB gzipped (42KB JS + 23KB CSS)
- Modular CSS can reduce bundle by 30-50%
- Optimized component implementations reduce overhead

**Phase 1 Targets:**

- Core bundle: <40KB gzipped
- Modular approach: <25KB for typical apps
- Tree-shaking effectiveness: 60%+

**Long-term Goals:**

- Individual components: <2KB each
- Micro-bundle support for single components
- Zero-runtime CSS option for static sites

### 🤝 Contributing

We welcome contributions! Priority areas for community involvement:

1. **Usage**: Accessibility improvements, performance optimizations
2. **Documentation**: Examples, guides, API documentation
3. **Testing**: Unit tests, visual regression tests, browser compatibility

See our [contributing guide](CONTRIBUTING.md) for detailed information.

### 📈 Performance Benchmarks

**Bundle Size Comparison:**

- mithril-materialized v3.2.2: ~65KB gzipped
- Material-UI: ~350KB gzipped
- Materialize CSS + jQuery: ~180KB gzipped
- Vuetify: ~250KB gzipped

**Runtime Performance:**

- Component initialization: <5ms average
- Theme switching: <10ms for full page
- File upload processing: Real-time without blocking
- TextArea auto-resize: <1ms per keystroke

## Build instructions

This repository consists of two packages, combined using `lerna`: the `lib` package that is published to `npm`, as well as an `example` project which uses this library to display the Mithril components that it contains.

To install the dependencies, you can use `npm i`, or, alternatively, use `pnpm m i` (assuming you have installed `pnpm` as alternative package manager using `npm i -g pnpm`) to perform a multi-repository install. Next, build everything using `npm start` and visit the documentation page on [http://localhost:1234](http://localhost:1234) in case port 1234 is not occupied already.

## 🎨 Styling & CSS

### CSS Usage

The library includes carefully crafted CSS that provides Material Design styling without external dependencies. You can import the ready-to-use CSS:

```typescript
import 'mithril-materialized/index.css';
```

**Important**: The CSS styling is **completely independent** of the original materialize-css. This means:

- ✅ No conflicting styles from materialize-css
- ✅ Smaller CSS bundle size
- ✅ Custom optimizations for better performance
- ✅ No external font dependencies

### 🔥 NEW: Modular CSS Architecture

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

**Bundle Size Optimization:**

- Full bundle: 64KB gzipped (44KB JS + 20KB CSS)
- Modular approach can reduce CSS by 30-50%
- Use only `core.css` + specific modules for your use case

### 🌓 Dark Theme Support

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
