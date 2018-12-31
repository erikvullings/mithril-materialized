export interface IInputOptions<T = string> {
  /** Optional label. */
  label?: string;
  /** Optional ID. */
  id?: string;
  /** Unique key for use of the element in an array. */
  key?: string;
  /** Initial value of the input field. */
  initialValue?: T;
  /** When true, add the autofocus attribute to the input field. */
  autofocus?: (() => boolean) | boolean;
  /** Invoked when the value changes. */
  onchange?: (value: T) => void;
  /** Add a a placeholder to the input field. */
  placeholder?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
  /**
   * When returning true or an empty string, clear the custom validity (= valid).
   * When returning false, set the custom validity message to a default string string.
   * When returning a non-empty string, set the custom validity message to this string.
   */
  validate?: (v: T) => boolean | string;
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
  /** Classes that you wish to attach to the content, e.g. "col s12 m6 l4 xl3" to specify the size. */
  contentClass?: string;
  /** If true, add a mandatory * after the label */
  isMandatory?: boolean;
}
