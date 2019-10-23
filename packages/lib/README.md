# mithril-materialized

A [materialize-css](https://materializecss.com) library for the Mithril framework (tested with v2.0.0-rc4 and higher, but presumably, it should work with v1.1.6 too), making it easier to use a Materialize theme in your application. The main focus of this library is on creating Mithril components for the more complicated Materialize components.

Supported components:

- [Buttons](https://erikvullings.github.io/mithril-materialized/#!/buttons)
  - Button
  - FlatButton
  - RoundButton
  - SubmitButton
  - FloatingActionButton
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
- [Modals](https://erikvullings.github.io/mithril-materialized/#!/modals)
  - ModalPanel
- [Miscellaneous](https://erikvullings.github.io/mithril-materialized/#!/misc)
  - Tabs
  - MaterialBox
  - Carousel
  - Pagination
  - Parallax
- Additional
  - Label
  - HelperText
- Not from Materialize-CSS
  - CodeBlock
  - [Kanban](https://erikvullings.github.io/mithril-materialized/#!/kanban)
  - [Timeline](https://erikvullings.github.io/mithril-materialized/#!/timeline)
  - [MapEditor](https://erikvullings.github.io/mithril-materialized/#!/map_editor)

## Version history

v0.15.2

- FIX: `Pagination` did not properly compute the go forward disabled/enabled state.

v0.15.1

- FIX: `Pagination` did not highlight current item when item index exceeded size limit. Also updated example with actual routes.

v0.15.0

- NEW: `FloatingActionButton` created.

v0.14.14

- FIX: `Kanban` triggering too many `onchange` messages.

v0.14.12

- FIX: `Select` when using `multiple` keeps the dropdown open, but re-initialize select when the options change.

v0.14.11

- FIX: `Kanban` did not trigger `onChange` when disabled, but with editable properties.

v0.14.10

- FIX: `Chips` did not initialize properly when `onChange` was not specified (e.g. when disabled).

v0.14.9

- NEW: `PasswordInput` component to enter passwords.

v0.14.8

- FIX: `Tabs` component selection did not work in Edge due to the way the `select` function was implemented in materialize-css.

v0.14.7

- FIX: `Select` when using `multiple` keeps the dropdown open, `dropdownOptions` and `classes` are passed on creation.
- `Select`, `Options`, `Radios` use `initialValue` instead of `checkedId` (which is deprecated but still working). The rationale is that the checked values are only read initially, when the component is created.

v0.14.5

- FIX: `Options` and `Radios` no longer use `h6` element for labels, so they behave more like other labels.

v0.14.4

- FIX: `Options` and `RadioButtons` did not listen to the `disabled` property.

v0.14.3

- When using a placeholder in an `input` field, the label should be active.

v0.14.2

- `LinksCollection` sometimes created unwanted `href` attribute in links.

v0.14.1 Using Mithril v2

- Migrated backwards from Mithril v2.0.3 to v2.0.1 due to bugs in the released version.
- When `Collection` items have an `id` property, the `id` property is used as key (e.g. for sorting the collection). You should not include a `key` property directly in your item's data, as explained [here](https://mithril.js.org/keys.html#avoid-passing-model-data-directly-to-components-if-the-model-uses-key-as-a-data-property).

v0.14.0 Using Mithril v2

- Upgrading all dependencies
- `Pickers` now trigger `onchange` when closing.
- Replace all links `oncreate: m.route.link` with `m.route.Link`.

v0.13.15 Patch

- `Select` removed `console.warn` in library.
- Updated `npm` scripts.

v0.13.14 Enhancements

- `Dropdown`: displayed text is truncated, so it doesn't overflow the button.
- `Select` can receive options, e.g. `dropdownOptions: { container: document.body }` to display it properly in a `Modal`.
- `Modal` examples added with `Select` and `Dropdown` components.

v0.13.13 Bug fix related to mithril RC7

- FIX `Kanban` key usage and drag-n-drop behaviour

v0.13.12 Bug fix

- `Options` `checkboxClass` was not applied, so you could not align items properly.

v0.13.11 Enhancements

- `Chips` component can now have an optional `label` (title) and `helperText` (under the input). Also the alignment has been fixed (the input used to be slightly wider than a regular input).

v0.13.10 Enhancement

- Added IIFE and ESM output builds
- Refactoring the code slightly
- `Chips` now has a default `className: col s12`

v0.13.9 Enhancement

- `ModalPanel` buttons' `onclick` handler now also receives the event, so you can prevent mithril from redrawing.
- `ModalPanel` has a new handler, `onCreate` which can be used to receive the modal instance, so you can control it programmatically.

v0.13.8 Bug fix

- `Select`, checkedId is evaluated in the view instead of `oninit`.

v0.13.6 Minor updates

- `Dropdown`, `Kanban`, `TimePicker`, `DatePicker` can be disabled.

v0.13.5 Minor updates

- `Dropdown` id, if not supplied, caused confusion when multiple `Dropdowns` were used on one page.
- `Kanban` uses type information. New property, `editableIds`, which makes some properties also editable in the list view.

v0.13.0 Breaking changes

- `Select` component now maintains the checkedIds internally, i.e. they are only processed during `oninit`. This is to create consistent behaviour with the `Options` and `RadioButtons` components.
- `Select`, `Options`, `Dropdown` and `RadioButtons` are no longer of the generic type, since IDs can only be strings or numbers.
- `ISelectOption` is removed, and is replaced by `IInputOption`, making it easier to switch between a radios, select and options.
- `Options` has a property `checkedId`, similar to `RadioButtons` and `Select`, to specify the checked/selected IDs. This replaces the `IInputOption.isChecked` property, which has been removed.

NEW

- [Kanban](https://erikvullings.github.io/mithril-materialized/#!/kanban): new component to render an editable list of items. Supports drag-and-drop between lists too, essentially allowing you to create a Kanban list. Hence the name.
- `InputCheckbox`: label is optional
- `Options` and `RadioButtons` are more consistent with respect to look and feel.
- `Options` and `RadioButtons` support an `inline` property to align them horizontally.
- `Select`, `Options`, and `RadioButtons` all use `IInputOption` to specify their options. An item can be disabled now.

v0.12.2 No breaking changes

- `Tabs`: added `contentClass` to add a class to the content.

v0.12.1 No breaking changes

- Simplified bundling after issues in `webpack`.

v0.12.0 No breaking changes

- `Tabs` component added, to show [tabs](https://erikvullings.github.io/mithril-materialized/#!/misc).

v0.11.11 No breaking changes

- Bug fix: `TextArea` did not invoke `onchange` when the input was cleared.
- Using Rollup as bundler, generating two bundles (ESM, regular JS).

v0.11.8 No breaking changes

- `Collection onclick` event was not registered properly.

v0.11.7 No breaking changes

- `Timeline` title can now be a Vnode too.

v0.11.6 No breaking changes

- `Select` control can now be disabled by adding the property `disabled: true` to the control's properties.

v0.11.5 No breaking changes

- `MapEditor` has an `onchange` callback to notify changes to the properties collection.
- `MapEditor` allows you to set the column width (`keyClass`) for the key and value column (`keyValue`).

v0.11.4 No breaking changes

- FIX `CodeBlock` missed importing of `css`.

v0.11.3 No breaking changes

- FIX `Timeline`: Default date formatter did not add 1 to the months. See [here](https://www.w3schools.com/js/js_dates.asp).
- FIX `MapEditor` when dealing with number inputs and the number was 0, it did not work properly.
- FIX `NumberInput` when the number was 0, the label was not active (and overlaying the number).

v0.11.2 No breaking changes

- FIX Issue with `SecondaryContent` in `Collection` component: when no `href` was provided, it still created a `href=#!undefined` link.

v0.11.1 No breaking changes

- Improved generics of `Select` and `Dropdown` component
- FIX Issue with `placeholder` in `Select` component: when no item was selected, it would not show the placeholder text.

v0.11.0 New component, `Timeline`

- Added a `Timeline` component to render vertical timelines.
- `Collection` now accepts other parameters, e.g. styles.
- All `css` styles are extracted into separate `css` files, and imported in the component. This implies that you don't need to add the required CSS in your own application anymore (except for `materialisecss`, of course).
- Added documentation using `Typedoc`. It can be found [here](https://erikvullings.github.io/mithril-materialized/typedoc/index.html).

v0.10.0 New component, `MapEditor`

- Added a new component, `MapEditor`, to edit a map of key-value pairs.
- `InputCheckbox` can now be disabled.
- Attributes are better dealt with and no longer end up as unused attributes of elements.
- Fixed a bug for `TextInput`, where sometimes the `active` class was not added even if the `input` element had a value.

v0.9.10 Breaking changes

- Deprecated the use of all `contentClass` properties in favour of the mithril convention `className`.

v0.9.9 Breaking changes

- `ModalPanel`: it's description (i.e. the main content area of the modal) can be a `Vnode`.
- `Select` does not use `contentClass` anymore, but instead uses the regular mithril `className` (but not `class`, since this is a reserved keyword in TypeScript).

v0.9.6 No breaking changes

- For a `Collection` with secondary content, do not create a SPA route (with a #!) but leave the URL as is.

v0.9.5 No breaking changes

- FIX `Select` bug when numeric option IDs were used and ID === 0, option was never selected.

v0.9.4 No breaking changes

- FIX `Collection` without headers did no longer render.

v0.9.3 No breaking changes

- `Collection` with links can now also contain a header.
- `Collection` with no items and only a header will now just render the header

v0.9.0 Breaking changes

- `Collapsible` is now correctly spelled (used to be `Collabsible`, oops).
- Added `Collection`, to create a collection of items: supports basic, link and avatar collections.

v0.8.3 No breaking changes

- `FileInput` component can be disabled, and accepts file types.

v0.8.1 No breaking changes

- Closes issue #1: Select issue with id === 0
- MaterialBox can set height, passes attributes to wrapped image element

v0.8.0 No breaking changes

- `FileInput` component can specify `class` property on the `div` wrapper (default `col s12`) and `contentClass` property on the file input element.

v0.7.0 Breaking changes for Dropdown component.

- New `FileInput` component to upload one or more files.
- `Dropdown` uses similar items as `Select`, and uses `checkedId` to select the item.
- `Dropdown` items can now use an icon and dividers.
- `Dropdown` can now have a helper text option and an icon prefix.

v0.6.4 Breaking changes, bug fix.

- `Select` did not always return the proper id on selection changes with multiple elements.

v0.6.3 No breaking changes, bug fix.

- `Select` did not update dynamically when checkedId changed.

v0.6.2 No breaking changes

- `Select` can use `M.FormSelectOptions`.

v0.6.1 No breaking changes

- `Select` can have `disabled` options, and `id` is optional (in which case the label is used).
- `Select` can use a prefix icon.

v0.6.0 No breaking changes

- `Inputs` can now use `onkeyup`, `onkeydown`, and `onkeypress` events. They also return the value.
- Additionally, they can use `readOnly`, `pattern` and `autocomplete` (does not always seem to work).

v0.5.0 No breaking changes

- NEW: Pagination control
- BUG FIX: `Input.onchange` would not fire if the input was cleared.
- All options now derives from mithril's `Attributes`.
- Using `FactoryComponent` type

v0.4.4 No breaking changes

- Do not pass attributes through, e.g. if you had a `m(FlatButton, { onupdate })`, the `onupdate` was passed through to the `HelperText` too.

v0.4.3 No breaking changes

- The validate method for inputs now also accepts the HTMLInputElement
- Removed a few left-over `console.log` statements.

v0.4.2 No breaking changes

- Added `required` and `aria-required="true"` attributes when the `required` or `isMandatory` property are set.

v0.4.1 No breaking changes

- Updated all components to use the mithril `dom` attribute instead of performing a document query. This has two advantages: first of all, performance, since we do not need to query for an element we already have. Second, when implementing custom elements that have an `oncreate` function. Using document.query... will lead to no results.

v0.4.0 No breaking changes

- New components: MaterialBox, Collapsible or accordion, and Carousel

v0.3.0 Breaking changes

- Buttons no longer use the `ui` class to specify additional properties like `onclick`. Instead, you can leverage the mithril attributes directly. See the example, `button-page`.
- `contentClass` has been removed in favour of the default mithril `class` or `className` attribute.
- The Icon function has been replaced by the `Icon` component. The `SmallIcon` and `PrefixedIcon` have been removed, as they can easily be created using the `Icon` component.
- The `autofocus` attribute for inputs now also works on updates (by calling the element.focus() method).
- The code has been split over multiple files, so it is easier to only import the components that you need.

v0.2.2

- Validate function can return a custom validation message. Also, it is called in `onupdate`, so the validation occurs also when you just attach the validate function conditionally.

v0.2.1

- Label field is optional for inputs.
- Added autofocus function|property to input fields.
- Added custom validation using the validate function|property to add valid/invalid label to an input.
- Removed dependency on materialize-css (it is expected that it is imported via the main app).

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
