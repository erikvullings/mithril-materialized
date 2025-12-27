import m, { FactoryComponent, Attributes } from 'mithril';
import { ToggleButton, ToggleButtonAttrs } from './toggle-button';

/**
 * Attributes for the ToggleGroup component.
 *
 * A toggle group is a container for multiple toggle buttons that manages their
 * selection state. It can operate in single-select or multi-select mode.
 */
export interface ToggleGroupAttrs extends Attributes {
  /**
   * The current value(s) of the toggle group (controlled mode).
   * - Single-select: a single value
   * - Multi-select: an array of values
   */
  value?: string | number | Array<string | number>;
  /**
   * The default value(s) for uncontrolled mode.
   * Use this when you want the component to manage its own state.
   */
  defaultValue?: string | number | Array<string | number>;
  /** Whether all buttons in the group are disabled. */
  disabled?: boolean;
  /**
   * Callback invoked when the selection changes.
   * @param value - The new value (single value or array depending on `multiple`)
   */
  onchange?: (value: string | number | Array<string | number>) => void;
  /**
   * Array of button configurations to display in the group.
   * Each item can have its own icon, label, tooltip, and disabled state.
   */
  items: Array<ToggleButtonAttrs>;
  /**
   * Whether to allow multiple buttons to be selected simultaneously.
   * - false (default): only one button can be selected at a time
   * - true: multiple buttons can be selected
   */
  multiple?: boolean;
}

/**
 * ToggleGroup component.
 *
 * A group of toggle buttons that can operate in single-select or multi-select mode.
 * The component supports both controlled and uncontrolled modes.
 *
 * **Controlled mode**: Manage the state externally using the `value` prop.
 * **Uncontrolled mode**: Let the component manage its own state using `defaultValue`.
 *
 * @example
 * ```typescript
 * // Single-select, controlled mode
 * let selected = 'left';
 * m(ToggleGroup, {
 *   value: selected,
 *   onchange: (v) => selected = v,
 *   items: [
 *     { value: 'left', iconName: 'format_align_left', tooltip: 'Align Left' },
 *     { value: 'center', iconName: 'format_align_center', tooltip: 'Align Center' },
 *     { value: 'right', iconName: 'format_align_right', tooltip: 'Align Right' }
 *   ]
 * });
 *
 * // Multi-select, controlled mode
 * let selected = ['bold', 'italic'];
 * m(ToggleGroup, {
 *   multiple: true,
 *   value: selected,
 *   onchange: (v) => selected = v,
 *   items: [
 *     { value: 'bold', iconName: 'format_bold', tooltip: 'Bold' },
 *     { value: 'italic', iconName: 'format_italic', tooltip: 'Italic' },
 *     { value: 'underline', iconName: 'format_underlined', tooltip: 'Underline' }
 *   ]
 * });
 *
 * // Uncontrolled mode
 * m(ToggleGroup, {
 *   defaultValue: 'left',
 *   onchange: (v) => console.log('Changed to:', v),
 *   items: [...]
 * });
 * ```
 */
export const ToggleGroup: FactoryComponent<ToggleGroupAttrs> = () => {
  let internalValue: string | number | Array<string | number> | undefined;

  const handleSelect = (
    attrs: ToggleGroupAttrs,
    item: ToggleButtonAttrs,
    currentValue: string | number | Array<string | number> | undefined
  ) => {
    if (attrs.disabled || item.disabled) {
      return;
    }
    const { value, multiple, onchange } = attrs;
    const isControlled = value !== undefined;

    if (multiple) {
      const currentValues = (Array.isArray(currentValue) ? currentValue : currentValue !== undefined ? [currentValue] : []) as Array<
        string | number
      >;
      const newValues = currentValues.includes(item.value)
        ? currentValues.filter((v) => v !== item.value)
        : [...currentValues, item.value];
      if (!isControlled) {
        internalValue = newValues;
      }
      if (onchange) {
        onchange(newValues);
      }
    } else {
      const newValue = item.value;
      if (!isControlled) {
        internalValue = newValue;
      }
      if (onchange) {
        onchange(newValue);
      }
    }
  };

  return {
    oninit: ({ attrs }) => {
      internalValue = attrs.defaultValue;
    },
    view: ({ attrs }) => {
      const { value, items, multiple } = attrs;
      const isControlled = value !== undefined;
      const currentValue = isControlled ? value : internalValue;

      return m(
        '.toggle-group',
        items.map((item) =>
          m(ToggleButton, {
            ...item,
            checked: multiple && Array.isArray(currentValue)
              ? currentValue.includes(item.value)
              : currentValue === item.value,
            onchange: () => handleSelect(attrs, item, currentValue),
          })
        )
      );
    },
  };
};
