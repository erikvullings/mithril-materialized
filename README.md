# mithril-materialized

A Mithril.js component library inspired by [materialize-css](https://materializecss.com) design principles, [available on npm](https://www.npmjs.com/package/mithril-materialized). This library provides you with ready-to-use Mithril components that follow Material Design guidelines, with **no external JavaScript dependencies**.

## 🚀 v2.0.0 Beta - Major Release

This is a **major breaking release** that removes all external JavaScript dependencies, making the library completely self-contained and significantly reducing bundle sizes.

### ✨ What's New

- **🔥 Zero External JS Dependencies**: No longer requires `materialize-css` JavaScript or `material-icons` fonts
- **📦 Smaller Bundle Size**: Reduced package size by eliminating external dependencies
- **🎨 Custom SVG Icons**: Built-in MaterialIcon component with custom SVG icons (caret, close)
- **⚡ Better Performance**: Direct implementations without jQuery or other heavy dependencies
- **🛠️ Enhanced Components**: Improved DatePicker and TimePicker with custom implementations
- **📱 Modern Architecture**: Factory components with proper TypeScript support
- **🎯 CSS-Only Styling**: Uses only CSS for styling - no JavaScript initialization needed

### 💥 Breaking Changes from v1.x

- **Removed dependencies**: No longer requires `materialize-css` or `material-icons` packages
- **Component updates**: DatePicker and TimePicker now have custom implementations
- **Icon changes**: Uses custom SVG icons instead of Material Icons font
- **Installation**: Simpler installation process with fewer dependencies

### 📈 Migration from v1.x

**Old installation (v1.x):**

```bash
npm install materialize-css material-icons mithril mithril-materialized
```

**New installation (v2.x):**

```bash
npm install mithril mithril-materialized
```

Your CSS imports can remain the same, but you no longer need the materialize-css JavaScript.

## Supported Components

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
  - RangeInput
  - Chips
- [Pickers](https://erikvullings.github.io/mithril-materialized/#!/pickers)
  - DatePicker (with optional week numbers)
  - TimePicker
- [Selections](https://erikvullings.github.io/mithril-materialized/#!/selections)
  - Select
  - Options
  - RadioButtons
  - Switch
  - Dropdown
- [Collections](https://erikvullings.github.io/mithril-materialized/#!/collections)
  - Basic, Link and Avatar Collections
  - Collapsible or accordion
- [Theme & Upload](https://erikvullings.github.io/mithril-materialized/#!/theme)
  - ThemeSwitcher (light/dark/auto theme switching)
  - ThemeToggle (simple light/dark toggle)
  - FileUpload (drag-and-drop with validation and preview)
- [Navigation](https://erikvullings.github.io/mithril-materialized/#!/navigation)
  - Sidenav (responsive navigation drawer)
  - Breadcrumb (navigation path indicator)
  - Wizard/Stepper (multi-step process guidance)
- [Others](https://erikvullings.github.io/mithril-materialized/#!/modals)
  - ModalPanel
  - MaterialBox
  - Carousel
  - Pagination
  - Parallax
- Additional
  - Label
  - HelperText
  - CodeBlock
  - SearchSelect, a searchable select dropdown
  - Icon, a simple wrapper for creating icons using material-icons font
  - MaterialIcon, for creating the close/clear and caret as SVG

## 📖 Usage Instructions

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
     DatePicker,
     ThemeToggle,
     FileUpload,
     Sidenav,
     Breadcrumb,
     Wizard
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
       m(Button, { 
         label: 'Submit',
         onclick: () => alert('Hello!')
       }),
       
       // File upload
       m(FileUpload, {
         accept: 'image/*',
         multiple: true,
         onFilesSelected: (files) => console.log(files)
       })
     ])
   });
   ```

### Integration with Build Tools

**Webpack/Vite/Parcel**: The library works out-of-the-box with modern bundlers.

**CSS Framework Integration**: You can use the components with any CSS framework. The included CSS provides Material Design styling, but you can override it with your own styles.

**TypeScript**: Full TypeScript support with comprehensive type definitions included.

See the [live documentation](https://erikvullings.github.io/mithril-materialized/index.html) for examples and component APIs.

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

**🔄 Currently Working On:**

- 🔄 DataTable component with sorting, filtering, and pagination

**📋 Phase 1 Remaining:**

- Enhanced TypeScript definitions with better JSDoc comments
- Performance optimizations and bundle size improvements

### 🎯 Phase 2: Advanced Components & Features

**Navigation & Layout:**

- AppBar/Toolbar component with responsive behavior
- Bottom navigation component for mobile apps
- Drawer/Sidebar component with overlay and push modes
- Grid system enhancements with CSS Grid support

**Data Display:**

- Enhanced DataTable with virtual scrolling for large datasets
- TreeView component for hierarchical data
- Card layouts with enhanced Material Design 3.0 styling
- List components with advanced features (virtual scrolling, infinite load)

**Input & Forms:**

- Advanced date range picker
- Autocomplete with async data loading

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

**Ecosystem Integration:**

- React compatibility layer
- Vue.js compatibility layer
- Web Components export option
- PWA-friendly components

### 📊 Bundle Size Targets

**Current Status (v2.0.0-beta.5):**

- Total: 64KB gzipped (44KB JS + 20KB CSS)
- Modular CSS can reduce bundle by 30-50%

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

1. **High Impact**: New components (DataTable, Sidenav, Breadcrumb)
2. **Medium Impact**: Accessibility improvements, performance optimizations
3. **Documentation**: Examples, guides, API documentation
4. **Testing**: Unit tests, visual regression tests, browser compatibility

See our [contributing guide](CONTRIBUTING.md) for detailed information.

### 📈 Performance Benchmarks

**Bundle Size Comparison:**

- mithril-materialized v2.0: 64KB gzipped
- Material-UI: ~350KB gzipped
- Materialize CSS + jQuery: ~180KB gzipped
- Vuetify: ~250KB gzipped

**Runtime Performance:**

- Component initialization: <5ms average
- Theme switching: <10ms for full page
- File upload processing: Real-time without blocking

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

```scss
// Import all SASS components
@import 'mithril-materialized/sass/materialize.scss';

// Or import individual components
@import 'mithril-materialized/sass/components/buttons';
@import 'mithril-materialized/sass/components/forms';
@import 'mithril-materialized/sass/components/grid';
```

**SASS Variables**: You can customize colors, spacing, and other design tokens by overriding SASS variables before importing:

```scss
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
