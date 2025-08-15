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
  - DatePicker
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
- [Others](https://erikvullings.github.io/mithril-materialized/#!/modals)
  - ModalPanel
  - MaterialBox
  - Carousel
  - Pagination
  - Parallax
- Additional
  - Label
  - HelperText
- Not from Materialize-CSS
  - CodeBlock
  - SearchSelect, a searchable select dropdown
  - [MapEditor](https://erikvullings.github.io/mithril-materialized/#!/map_editor)
  - [Timeline](https://erikvullings.github.io/mithril-materialized/#!/timeline)

## 📖 Usage Instructions

### Quick Start

1. **Install the package**:
   ```bash
   npm install mithril mithril-materialized
   ```

2. **Import the CSS** (optional, for Material Design styling):
   ```typescript
   import 'mithril-materialized/dist/index.css';
   ```

3. **Use components in your app**:
   ```typescript
   import m from 'mithril';
   import { TextInput, Button, DatePicker } from 'mithril-materialized';

   const MyComponent = () => ({
     view: () => m('.container', [
       m(TextInput, {
         label: 'Your name',
         onchange: (value) => console.log(value)
       }),
       m(Button, { 
         label: 'Submit',
         onclick: () => alert('Hello!')
       }),
       m(DatePicker, {
         label: 'Select date',
         onchange: (date) => console.log(date)
       })
     ])
   });
   ```

### Integration with Build Tools

**Webpack/Vite/Parcel**: The library works out-of-the-box with modern bundlers.

**CSS Framework Integration**: You can use the components with any CSS framework. The included CSS provides Material Design styling, but you can override it with your own styles.

**TypeScript**: Full TypeScript support with comprehensive type definitions included.

See the [live documentation](https://erikvullings.github.io/mithril-materialized/index.html) for examples and component APIs.

## Build instructions

This repository consists of two packages, combined using `lerna`: the `lib` package that is published to `npm`, as well as an `example` project which uses this library to display the Mithril components that it contains.

To install the dependencies, you can use `npm i`, or, alternatively, use `pnpm m i` (assuming you have installed `pnpm` as alternative package manager using `npm i -g pnpm`) to perform a multi-repository install. Next, build everything using `npm start` and visit the documentation page on [http://localhost:1234](http://localhost:1234) in case port 1234 is not occupied already.

## 🎨 Styling & CSS

### CSS Usage

The library includes carefully crafted CSS that provides Material Design styling without external dependencies. You can import the ready-to-use CSS:

```typescript
import 'mithril-materialized/dist/index.css';
```

**Important**: The CSS styling is **completely independent** of the original materialize-css. This means:
- ✅ No conflicting styles from materialize-css 
- ✅ Smaller CSS bundle size
- ✅ Custom optimizations for better performance
- ✅ No external font dependencies

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
  /* overflow: hidden; Précaution pour IE 7 */
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
