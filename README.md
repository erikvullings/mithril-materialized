# mithril-materialized

A [materialize-css](https://materializecss.com) library for the Mithril framework (tested with v2.0.0-rc4 and higher, but presumably, it should work with v1.1.6 too), making it easier to use a Materialize theme in your application. The main focus of this library is on creating Mithril components for the more complicated Materialize components.

Supported components:

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
  - [MapEditor](https://erikvullings.github.io/mithril-materialized/#!/map_editor)
  - [Timeline](https://erikvullings.github.io/mithril-materialized/#!/timeline)

## Usage instructions

See the [documentation](https://erikvullings.github.io/mithril-materialized/index.html) for examples on how to use this library in your own application. Please note that the library does not include mithril, nor the materialize-css JavaScript or CSS, so you have to include them yourself, as documented.

## Build instructions

This repository consists of two packages, combined using `lerna`: the `lib` package that is published to `npm`, as well as an `example` project which uses this library to display the Mithril components that it contains.

To install the dependencies, you can use `npm i`, or, alternatively, use `pnpm m i` (assuming you have installed `pnpm` as alternative package manager using `npm i -g pnpm`) to perform a multi-repository install. Next, build everything using `npm start` and visit the documentation page on [http://localhost:1234](http://localhost:1234) in case port 1234 is not occupied already.

## CSS

Although I've tried to limit the CSS adaptations to a minimum, I needed to tweak certain parts to make it look better. Here are the styles I've added.

```css
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

.codeblock {
  margin: 1.5rem 0 2.5rem 0;
}
.codeblock > div {
  margin-bottom: 1rem;
}

.codeblock > label {
  display: inline-block;
}

span.mandatory {
  margin-left: 5px;
  color: red;
}

label+.switch {
  margin-top: 1rem;
}
```