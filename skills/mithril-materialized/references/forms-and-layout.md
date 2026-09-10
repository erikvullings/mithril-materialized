# Forms and layout

## Controlled and uncontrolled inputs

Use controlled mode when application state is authoritative:

```typescript
let email = '';

m(TextInput, {
  label: 'Email',
  value: email,
  oninput: (value) => {
    email = value;
  },
});
```

The parent must update `value`; otherwise the rendered control cannot reflect edits. Use `defaultValue` without `value` and `oninput` when the component may own its state:

```typescript
m(TextInput, {
  label: 'Display name',
  defaultValue: 'Ada',
});
```

Check each component's attrs before assuming its state callback. Selection, picker, upload, and composite components can use different value shapes.

## Validation

`TextInput` and related input fields accept `validate`. Return `true` or an empty string when valid, `false` for the default invalid message, or a non-empty string for a custom validity message.

```typescript
m(TextInput, {
  label: 'Project code',
  value: projectCode,
  isMandatory: true,
  helperText: 'Use at least three characters.',
  validate: (value) =>
    value.trim().length >= 3 || 'Project code must contain at least three characters.',
  oninput: (value) => {
    projectCode = value;
  },
});
```

Keep cross-field and server-side rules in application state. Associate custom error summaries with their fields and move focus deliberately after failed submission.

## Grid wrappers

Most field-like controls participate in the Materialize grid. Place grid columns inside `.row`:

```typescript
m('.row', [
  m(TextInput, { className: 'col s12 m6', label: 'First name' }),
  m(TextInput, { className: 'col s12 m6', label: 'Last name' }),
]);
```

In Version 4, `SearchSelect`, `FileUpload`, `LikertScale`, `Rating`, `SingleRangeSlider`, and `DoubleRangeSlider` default their outer wrapper to `col s12`. Override the width explicitly:

```typescript
m('.row', [
  m(SearchSelect, {
    className: 'col s12 m6',
    label: 'Owner',
    options: owners,
  }),
]);
```

Pass `className: ''` only when intentionally opting out of grid-column behavior. Avoid wrapping a default `col s12` component in another `.col` unless the component documentation calls for it; nested columns create duplicate horizontal gutters.

## Form structure

Use `FormSection` to divide a long form into titled sections. Use `Fieldset` when a set of controls shares a semantic legend, such as notification preferences or delivery method. Do not replace a real fieldset/legend relationship with visual headings.

## Composition checklist

- Give every input an accessible label.
- Use `helperText` for guidance, not placeholder text alone.
- Preserve focus order and keyboard interaction.
- Use `disabled` only when a value is unavailable; use `readOnly` when it remains readable and focusable.
- Keep touch targets usable. The Compact Minimal preset automatically restores larger targets for coarse pointers.
- Test controlled values after redraw, validation after blur, and long or localized labels.
