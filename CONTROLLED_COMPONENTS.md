# Controlled vs Uncontrolled Components Design Principles

This document outlines the design principles for controlled and uncontrolled components in Mithril Materialized.

## Overview

All interactive input components (Rating, TextInput, NumberInput, Select, RadioButtons, etc.) support both controlled and uncontrolled modes to provide flexibility for different use cases.

## Component States

### Controlled Components

**Pattern**: Provide both `value`/`checkedId` AND an event handler (normally `oninput`, sometimes `onchange`). `onchange` is typically called when the component looses focus or a final value has been set, and `oninput` is called immediately after changing the value. For a text or range input component, `oninput` should be used, since the state is changed on every keydown. For a number input, a select or dropdown, `onchange` can be used, since `oninput` does not make sense.

```typescript
// Controlled Rating
m(Rating, {
  value: currentRating,
  onchange: (rating) => { currentRating = rating; }
})

// Controlled TextInput  
m(TextInput, {
  value: text,
  onchange: (newText) => { text = newText; } // or oninput
})

// Controlled Select
m(Select, {
  checkedId: selectedId,
  onchange: (ids) => { selectedId = ids[0]; }
})
```

**Behavior**: Component displays the provided value and calls the event handler when user interacts.

### Uncontrolled Interactive Components

**Pattern**: Use `defaultValue`/`defaultCheckedId` OR omit value props entirely

```typescript
// Uncontrolled with default
m(Rating, {
  defaultValue: 3,
  onchange: (rating) => console.log('Changed to:', rating)
})

// Uncontrolled without default
m(TextInput, {
  onchange: (text) => console.log('Text:', text)
})
```

**Behavior**: Component manages its own internal state. User interactions update internal state first, then internal state is displayed.

### Read-only/Disabled Components

**Pattern**: Use either `value`/`defaultValue` with `readOnly: true` or `disabled: true`

```typescript
// Read-only - prefer defaultValue, fallback to value
m(Rating, {
  defaultValue: 4,  // ✅ Preferred
  readOnly: true
})

m(Rating, {
  value: 4,         // ✅ Also works as fallback
  readOnly: true  
})

// Disabled works the same way
m(Select, {
  defaultCheckedId: 'option1',
  disabled: true
})
```

**Behavior**: Component displays the value but ignores user interactions.

## Value Resolution Priority

### For Controlled Components

```typescript
displayed_value = attrs.value || attrs.checkedId || default_empty_value
```

### For Uncontrolled Interactive Components  

```typescript
displayed_value = internal_state ?? attrs.defaultValue ?? default_empty_value
```

*Note: `internal_state` takes precedence because user should be able to change it*

### For Read-only/Disabled Components

```typescript
displayed_value = attrs.defaultValue ?? attrs.value ?? default_empty_value  
```

*Note: `defaultValue` takes precedence, but `value` works as intuitive fallback*

## Developer Warnings

The library will show console warnings for common misconfigurations:

### Missing Event Handler Warning

```typescript
// ⚠️ Warning: Component received 'value' prop without event handler
m(Rating, {
  value: 3  // Missing onchange - component can't be controlled
})
```

**Fix**: Add event handler for controlled mode OR use `defaultValue` for uncontrolled mode:

```typescript
// ✅ Controlled
m(Rating, {
  value: 3,
  onchange: (v) => { /* handle change */ }
})

// ✅ Uncontrolled  
m(Rating, {
  defaultValue: 3
})
```

## Event Handler Compatibility

### Input Components Support Both

TextInput, NumberInput, TextArea support both event handlers:

```typescript
// Both work for controlled mode
m(TextInput, { value: text, onchange: handler })   // ✅
m(TextInput, { value: text, oninput: handler })    // ✅
```

### Other Components Use `onchange`

Rating, Select, RadioButtons use `onchange`:

```typescript
m(Rating, { value: 3, onchange: handler })        // ✅
m(Select, { checkedId: 'id', onchange: handler }) // ✅  
```

## Examples

### Form with Mixed Components

```typescript
// All controlled
let formData = {
  name: '',
  rating: 0,
  category: '',
  agreed: false
};

m('form', [
  m(TextInput, {
    label: 'Name',
    value: formData.name,
    onchange: (v) => { formData.name = v; }
  }),
  
  m(Rating, {
    value: formData.rating,
    onchange: (v) => { formData.rating = v; }
  }),
  
  m(Select, {
    label: 'Category', 
    checkedId: formData.category,
    onchange: (ids) => { formData.category = ids[0]; },
    options: categoryOptions
  }),
  
  m(Switch, {
    label: 'I agree',
    checked: formData.agreed,
    onchange: (v) => { formData.agreed = v; }
  })
])
```

### Display-only Components

```typescript  
// Read-only components for display
m('.product-info', [
  m('h3', product.name),
  m(Rating, {
    value: product.averageRating,  // Just works!
    readOnly: true
  }),
  m('p', `${product.reviewCount} reviews`)
])
```

## Best Practices

1. **For forms**: Use controlled components to maintain form state
2. **For display**: Use `value` with `readOnly: true` - most intuitive  
3. **For standalone widgets**: Use uncontrolled with `defaultValue`
4. **Always provide feedback**: Handle `onchange` events appropriately
5. **Consistent prop names**: Use `value` for single values, `checkedId` for selections

## Migration Guide

### From older versions that used different patterns

- Replace `initialValue` → `defaultValue`
- Add event handlers for controlled components
- Read-only components now accept `value` directly (no event handler needed)

This design ensures consistency across all components while providing intuitive behavior for different use cases.
