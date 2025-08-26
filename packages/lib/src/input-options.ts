import { Attributes } from 'mithril';

export interface InputAttrs<T = string> extends Attributes {
  /** Optional label. */
  label?: string;
  /** Optional ID. */
  id?: string;
  /** Unique key for use of the element in an array. */
  key?: string | number;
  /** Initial value of the input field. */
  initialValue?: T;
  /**
   * The autocomplete property sets or returns the value of the autocomplete
   * attribute in a text field. When autocomplete is on, the browser automatically
   * complete values based on values that the user has entered before.
   * @default 'on'
   */
  autocomplete?: 'on' | 'off';
  /**
   * The pattern property sets or returns the value of the pattern attribute of
   * a text field. The pattern attribute specifies a regular expression that the
   * text field's value is checked against.
   */
  pattern?: RegExp;
  /**
   * The readOnly property sets or returns whether a text field is read-only, or not.
   * A read-only field cannot be modified. However, a user can tab to it, highlight it,
   * and copy the text from it.
   */
  readOnly?: boolean;
  /** When true, add the autofocus attribute to the input field. */
  autofocus?: (() => boolean) | boolean;
  /** Key down event */
  onkeydown?: (ev: KeyboardEvent, value?: T) => void;
  /** Key press event */
  onkeypress?: (ev: KeyboardEvent, value?: T) => void;
  /** Key up event */
  onkeyup?: (ev: KeyboardEvent, value?: T) => void;
  /** Invoked when the element looses focus */
  onblur?: (ev: FocusEvent) => void;
  /** Invoked when the value changes (immediate feedback). For range sliders with minmax, second parameter is maxValue. */
  oninput?: (value: T, maxValue?: T) => void;
  /** Invoked when the input looses focus. For range sliders with minmax, second parameter is maxValue. */
  onchange?: (value: T, maxValue?: T) => void;
  /** Add a a placeholder to the input field. */
  placeholder?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
  /** Show a clear button (small 'x') to clear the input value. Only valid for TextInput. */
  canClear?: boolean;
  /**
   * When returning true or an empty string, clear the custom validity (= valid).
   * When returning false, set the custom validity message to a default string string.
   * When returning a non-empty string, set the custom validity message to this string.
   */
  validate?: (v: T, target?: HTMLInputElement) => boolean | string;
  /** Will replace the helperText, if any, when the input is invalid. */
  dataError?: string;
  /** Will replace the helperText, if any, when the input is valid. */
  dataSuccess?: string;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Sets the input field to disabled. */
  disabled?: boolean;
  /** Optional style information. */
  style?: string;
  /** When input type is a number, optionally specify the minimum value. */
  min?: number;
  /** When input type is a number, optionally specify the maximum value. */
  max?: number;
  /** When input type is a text or text area, optionally specify the minimum length. */
  minLength?: number;
  /** When input type is a text or text area, optionally specify the maximum length. */
  maxLength?: number;
  /** Number of rows of a textarea */
  rows?: number;
  /** Number of cols of a textarea */
  cols?: number;
  /** If true, break to a new row */
  newRow?: boolean;
  /**
   * If true, add a mandatory * after the label (if any),
   * and add the required and aria-required attributes to the input element.
   */
  isMandatory?: boolean;
  /** Add the required and aria-required attributes to the input element */
  required?: boolean;
  /** For range inputs: render vertically instead of horizontally */
  vertical?: boolean;
  /** For range inputs: enable dual thumb (min/max) range selection */
  minmax?: boolean;
  /** For range inputs with minmax: initial minimum value */
  minValue?: number;
  /** For range inputs with minmax: initial maximum value */
  maxValue?: number;
  /** For range inputs: control value display behavior. 'auto' shows on drag, 'always' shows always, 'none' never shows */
  valueDisplay?: 'auto' | 'always' | 'none';
  /** For vertical range inputs: height of the slider */
  height?: string;
  /** For range inputs with valueDisplay: position of value tooltips */
  tooltipPos?: 'top' | 'bottom' | 'left' | 'right';
}
