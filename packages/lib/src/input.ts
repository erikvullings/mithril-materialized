import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';
import { MaterialIcon } from './material-icon';
import { InputType } from './types';
import { DoubleRangeSlider, SingleRangeSlider } from './range-slider';

/** Character counter component that tracks text length against maxLength */
export const CharacterCounter: FactoryComponent<{ currentLength: number; maxLength: number; show: boolean }> = () => {
  return {
    view: ({ attrs }) => {
      const { currentLength, maxLength, show } = attrs;
      if (!show) return null;

      const isOverLimit = currentLength > maxLength;
      return m(
        'span.character-counter',
        {
          style: {
            color: isOverLimit ? '#F44336' : '#9e9e9e',
          },
        },
        `${currentLength}/${maxLength}`
      );
    },
  };
};

/** Create a TextArea */
export const TextArea: FactoryComponent<InputAttrs<string>> = () => {
  const state = {
    id: uniqueId(),
    currentLength: 0,
    hasInteracted: false,
    isValid: true,
    height: undefined as undefined | string,
    active: false,
    textarea: undefined as undefined | HTMLTextAreaElement,
    hiddenDiv: undefined as undefined | HTMLDivElement,
    internalValue: '',
  };

  let labelManager: { updateLabelState: () => void; cleanup: () => void } | null = null;

  const updateHeight = (textarea: HTMLTextAreaElement, hiddenDiv?: HTMLDivElement) => {
    if (!textarea || !hiddenDiv) return;

    // Copy font properties from textarea to hidden div
    const computedStyle = window.getComputedStyle(textarea);
    hiddenDiv.style.fontFamily = computedStyle.fontFamily;
    hiddenDiv.style.fontSize = computedStyle.fontSize;
    hiddenDiv.style.lineHeight = computedStyle.lineHeight;

    // Copy padding from textarea (important for accurate measurement)
    hiddenDiv.style.paddingTop = computedStyle.paddingTop;
    hiddenDiv.style.paddingRight = computedStyle.paddingRight;
    hiddenDiv.style.paddingBottom = computedStyle.paddingBottom;
    hiddenDiv.style.paddingLeft = computedStyle.paddingLeft;

    // Handle text wrapping
    if (textarea.getAttribute('wrap') === 'off') {
      hiddenDiv.style.overflowWrap = 'normal';
      hiddenDiv.style.whiteSpace = 'pre';
    } else {
      hiddenDiv.style.overflowWrap = 'break-word';
      hiddenDiv.style.whiteSpace = 'pre-wrap';
    }

    // Set content with extra newline for measurement
    hiddenDiv.textContent = textarea.value + '\n';
    const content = hiddenDiv.innerHTML.replace(/\n/g, '<br>');
    hiddenDiv.innerHTML = content;

    // Set width to match textarea
    if (textarea.offsetWidth > 0) {
      hiddenDiv.style.width = textarea.offsetWidth + 'px';
    } else {
      hiddenDiv.style.width = window.innerWidth / 2 + 'px';
    }

    // Get the original/natural height of the textarea
    const originalHeight = textarea.offsetHeight;
    const measuredHeight = hiddenDiv.offsetHeight;

    // Key logic: Only set custom height when content requires MORE space than original height
    // This matches the Materialize CSS reference behavior
    if (originalHeight <= measuredHeight) {
      state.height = measuredHeight + 'px';
    } else {
      // Single line content or content that fits in original height - let CSS handle it
      state.height = undefined;
    }
  };

  const isControlled = (attrs: InputAttrs<string>) =>
    attrs.value !== undefined && (attrs.oninput !== undefined || attrs.onchange !== undefined);

  return {
    oninit: ({ attrs }) => {
      const controlled = isControlled(attrs);
      const isNonInteractive = attrs.readonly || attrs.disabled;

      // Warn developer for improper controlled usage
      if (attrs.value !== undefined && !controlled && !isNonInteractive) {
        console.warn(
          `TextArea received 'value' prop without 'oninput' or 'onchange' handler. ` +
            `Use 'defaultValue' for uncontrolled components or add an event handler for controlled components.`
        );
      }

      // Initialize internal value for uncontrolled mode
      if (!controlled) {
        state.internalValue = attrs.defaultValue || '';
      }
    },
    onremove: () => {
      if (labelManager) {
        labelManager.cleanup();
        labelManager = null;
      }
    },
    view: ({ attrs }) => {
      const {
        className = 'col s12',
        helperText,
        iconName,
        id = state.id,
        value,
        placeholder,
        isMandatory,
        label,
        maxLength,
        oninput,
        onchange,
        onkeydown,
        onkeypress,
        onkeyup,
        onblur,
        style,
        ...params
      } = attrs;

      const controlled = isControlled(attrs);
      const isNonInteractive = attrs.readonly || attrs.disabled;

      let currentValue: string;
      if (controlled) {
        currentValue = value || '';
      } else if (isNonInteractive) {
        // Non-interactive components: prefer defaultValue, fallback to value
        currentValue = attrs.defaultValue ?? value ?? '';
      } else {
        // Interactive uncontrolled: use internal state
        currentValue = state.internalValue ?? attrs.defaultValue ?? '';
      }

      return [
        // Hidden div for height measurement - positioned outside the input-field
        m('.hiddendiv', {
          style: {
            visibility: 'hidden',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-1',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          },
          oncreate: ({ dom }) => {
            const hiddenDiv = (state.hiddenDiv = dom as HTMLDivElement);
            if (state.textarea) {
              updateHeight(state.textarea, hiddenDiv);
            }
          },
          onupdate: ({ dom }) => {
            const hiddenDiv = (state.hiddenDiv = dom as HTMLDivElement);
            if (state.textarea) {
              updateHeight(state.textarea, hiddenDiv);
            }
          },
        }),
        m('.input-field', { className, style }, [
          iconName ? m('i.material-icons.prefix', iconName) : '',
          m('textarea.materialize-textarea', {
            ...params,
            id,
            tabindex: 0,
            value: controlled ? currentValue : undefined,
            style: {
              height: state.height,
            },
            oncreate: ({ dom }) => {
              const textarea = (state.textarea = dom as HTMLTextAreaElement);

              // For uncontrolled mode, set initial value only
              if (!controlled && attrs.defaultValue !== undefined) {
                textarea.value = String(attrs.defaultValue);
              }

              // Height will be calculated by hidden div

              // Update character count state for counter component
              if (maxLength) {
                state.currentLength = textarea.value.length;
              }
            },
            onupdate: ({ dom }) => {
              const textarea = dom as HTMLTextAreaElement;
              if (state.height) textarea.style.height = state.height;

              // Trigger height recalculation when value changes programmatically
              if (state.hiddenDiv) {
                updateHeight(textarea, state.hiddenDiv);
              }
            },
            onfocus: () => {
              state.active = true;
            },
            oninput: (e: Event) => {
              state.active = true;
              state.hasInteracted = false;
              const target = e.target as HTMLTextAreaElement;

              // Height will be recalculated by hidden div on next update

              // Update character count
              if (maxLength) {
                state.currentLength = target.value.length;
                state.hasInteracted = target.value.length > 0;
              }

              // Update internal state for uncontrolled mode
              if (!controlled) {
                state.internalValue = target.value;
              }

              // Call oninput handler
              if (oninput) {
                oninput(target.value);
              }
            },
            onblur: (e: FocusEvent) => {
              state.active = false;
              // const target = e.target as HTMLTextAreaElement;
              state.hasInteracted = true;

              // Call original onblur if provided
              if (onblur) {
                onblur(e);
              }

              if (onchange && state.textarea) {
                onchange(state.textarea.value);
              }
            },
            onkeyup: onkeyup
              ? (ev: KeyboardEvent) => {
                  onkeyup(ev, (ev.target as HTMLTextAreaElement).value);
                }
              : undefined,
            onkeydown: onkeydown
              ? (ev: KeyboardEvent) => {
                  onkeydown(ev, (ev.target as HTMLTextAreaElement).value);
                }
              : undefined,
            onkeypress: onkeypress
              ? (ev: KeyboardEvent) => {
                  onkeypress(ev, (ev.target as HTMLTextAreaElement).value);
                }
              : undefined,
          }),
          m(Label, {
            label,
            id,
            isMandatory,
            isActive: currentValue || placeholder || state.active,
            initialValue: currentValue !== '',
          }),
          m(HelperText, {
            helperText,
            dataError: state.hasInteracted && attrs.dataError ? attrs.dataError : undefined,
            dataSuccess: state.hasInteracted && attrs.dataSuccess ? attrs.dataSuccess : undefined,
          }),
          maxLength
            ? m(CharacterCounter, {
                currentLength: state.currentLength,
                maxLength,
                show: state.currentLength > 0,
              })
            : undefined,
        ]),
      ];
    },
  };
};

/** Default component for all kinds of input fields. */
const InputField =
  <T>(type: InputType, defaultClass = ''): FactoryComponent<InputAttrs<T>> =>
  () => {
    const state = {
      id: uniqueId(),
      internalValue: undefined as undefined | T,
      hasInteracted: false,
      isValid: true,
      active: false,
      inputElement: null as null | HTMLInputElement,
      // Range-specific state
      rangeMinValue: undefined as number | undefined,
      rangeMaxValue: undefined as number | undefined,
      singleValue: undefined as number | undefined,
      isDragging: false,
      activeThumb: null as 'min' | 'max' | null,
    };

    const isControlled = (attrs: InputAttrs<T>) =>
      'value' in attrs && typeof attrs.value !== 'undefined' && typeof attrs.oninput === 'function';

    const getValue = (target: HTMLInputElement) => {
      const val = target.value as unknown as T;
      return (val ? (type === 'number' || type === 'range' ? +val : val) : val) as T;
    };

    const setValidity = (target: HTMLInputElement, validationResult: string | boolean) => {
      if (typeof validationResult === 'boolean') {
        target.setCustomValidity(validationResult ? '' : 'Custom validation failed');
      } else {
        target.setCustomValidity(validationResult);
      }
    };

    const focus = ({ autofocus }: InputAttrs<T>) =>
      autofocus ? (typeof autofocus === 'boolean' ? autofocus : autofocus()) : false;

    // const lengthUpdateHandler = () => {
    //   const length = state.inputElement?.value.length;
    //   if (length) {
    //     state.currentLength = length;
    //     state.hasInteracted = length > 0;
    //   }
    // };

    const clearInput = (
      oninput?: (value: any, maxValue?: any) => void,
      onchange?: (value: any, maxValue?: any) => void
    ) => {
      if (state.inputElement) {
        state.inputElement.value = '';
        state.inputElement.focus();
        state.active = false;
        // state.currentLength = 0;
        // state.hasInteracted = false;

        // Trigger oninput and onchange callbacks
        const value = getValue(state.inputElement);
        if (oninput) {
          oninput(value);
        }
        if (onchange) {
          onchange(value);
        }

        // Update validation state
        state.inputElement.classList.remove('valid', 'invalid');
        state.isValid = true;
        m.redraw();
      }
    };

    // Range slider helper functions
    // Range slider rendering functions are now in separate module

    return {
      oninit: ({ attrs }) => {
        const controlled = isControlled(attrs);
        const isNonInteractive = attrs.readonly || attrs.disabled;

        // Warn developer for improper controlled usage
        if (attrs.value !== undefined && !controlled && !isNonInteractive) {
          console.warn(
            `${type} input with label '${attrs.label}' received 'value' prop without 'oninput' handler. ` +
              `Use 'defaultValue' for uncontrolled components or add an event handler for controlled components.`
          );
        }

        // Initialize internal value if not in controlled mode
        if (!controlled) {
          const isNumeric = ['number', 'range'].includes(type);
          if (attrs.defaultValue !== undefined) {
            if (isNumeric) {
              state.internalValue = attrs.defaultValue as T;
            } else {
              state.internalValue = String(attrs.defaultValue) as T;
            }
          } else {
            state.internalValue = (type === 'color' ? '#ff0000' : isNumeric ? undefined : '') as T;
          }
        }
      },
      view: ({ attrs }) => {
        const {
          className = 'col s12',
          dataError,
          dataSuccess,
          helperText,
          iconName,
          id = state.id,
          placeholder,
          isMandatory,
          label,
          maxLength,
          newRow,
          oninput,
          onchange,
          onkeydown,
          onkeypress,
          onkeyup,
          style,
          validate,
          canClear,
          ...params
        } = attrs;

        // const attributes = toAttrs(params);
        const cn = [newRow ? 'clear' : '', defaultClass, className].filter(Boolean).join(' ').trim() || undefined;

        // Special rendering for minmax range sliders
        if (type === 'range' && (attrs.minmax || attrs.valueDisplay)) {
          return m(attrs.minmax ? DoubleRangeSlider : SingleRangeSlider, {
            ...attrs,
            state,
            cn,
            style,
            iconName,
            id,
            label,
            isMandatory,
            helperText,
          });
        }
        const isNumeric = ['number', 'range'].includes(type);
        const controlled = isControlled(attrs);
        const isNonInteractive = attrs.readonly || attrs.disabled;

        let value: T;
        if (controlled) {
          value = attrs.value as T;
        } else if (isNonInteractive) {
          // Non-interactive components: prefer defaultValue, fallback to value
          value = (attrs.defaultValue ?? attrs.value ?? (isNumeric ? 0 : '')) as T;
        } else {
          // Interactive uncontrolled: use internal state
          value = (state.internalValue ?? attrs.defaultValue ?? (isNumeric ? 0 : '')) as T;
        }

        const isActive =
          state.active || state.inputElement?.value || value || placeholder || type === 'color' || type === 'range'
            ? true
            : false;
        const rangeType = type === 'range' && !attrs.minmax;

        // Only add validate class if input is interactive and validation is needed
        const shouldValidate = !isNonInteractive && (validate || type === 'email' || type === 'url' || isNumeric);

        return m('.input-field', { className: cn, style }, [
          iconName ? m('i.material-icons.prefix', iconName) : undefined,
          m('input', {
            class: shouldValidate ? 'validate' : undefined,
            ...params,
            type,
            tabindex: 0,
            id,
            placeholder,
            value: controlled ? value : undefined,
            class: type === 'range' && attrs.vertical ? 'range-slider vertical' : undefined,
            style:
              type === 'range' && attrs.vertical
                ? {
                    height: attrs.height || '200px',
                    width: '6px',
                    writingMode: 'vertical-lr' as const,
                    direction: 'rtl' as const,
                  }
                : undefined,
            // attributes,
            oncreate: ({ dom }) => {
              const input = (state.inputElement = dom as HTMLInputElement);
              if (focus(attrs)) {
                input.focus();
              }

              // For uncontrolled mode, set initial value only
              if (!controlled && attrs.defaultValue !== undefined) {
                input.value = String(attrs.defaultValue);
              }
            },
            onkeyup: onkeyup
              ? (ev: KeyboardEvent) => {
                  onkeyup(ev, getValue(ev.target as HTMLInputElement));
                }
              : undefined,
            onkeydown: onkeydown
              ? (ev: KeyboardEvent) => {
                  onkeydown(ev, getValue(ev.target as HTMLInputElement));
                }
              : undefined,
            onkeypress: onkeypress
              ? (ev: KeyboardEvent) => {
                  onkeypress(ev, getValue(ev.target as HTMLInputElement));
                }
              : undefined,
            oninput: (e: Event) => {
              state.active = true;
              state.hasInteracted = false;
              const target = e.target as HTMLInputElement;

              // Handle original oninput logic
              const inputValue = getValue(target);

              // Update internal state for uncontrolled mode
              if (!controlled) {
                state.internalValue = inputValue;
              }

              if (oninput) {
                oninput(inputValue);
              }

              if (rangeType) {
                const value = target.value;
                const min = parseFloat(target.min || '0');
                const max = parseFloat(target.max || '100');
                const percentage = Math.round((100 * (parseFloat(value) - min)) / (max - min));
                target.style.setProperty('--range-progress', `${percentage}%`);
              }

              // Don't validate on input, only clear error states if user is typing
              if (validate && target.classList.contains('invalid') && target.value.length > 0) {
                const validationResult = validate(value, target);
                if (typeof validationResult === 'boolean' && validationResult) {
                  target.classList.remove('invalid');
                  target.classList.add('valid');
                  state.isValid = true;
                } else if (typeof validationResult === 'string' && validationResult === '') {
                  target.classList.remove('invalid');
                  target.classList.add('valid');
                  state.isValid = true;
                }
              } else if (
                (type === 'email' || type === 'url') &&
                target.classList.contains('invalid') &&
                target.value.length > 0
              ) {
                // Clear native validation errors if user is typing and input becomes valid
                if (target.validity.valid) {
                  target.classList.remove('invalid');
                  target.classList.add('valid');
                  state.isValid = true;
                }
              }
            },
            onfocus: () => {
              state.active = true;
            },
            onblur: (e: FocusEvent) => {
              state.active = false;
              const target = e.target as HTMLInputElement;
              state.hasInteracted = true;

              // Skip validation for readonly/disabled inputs
              if (attrs.readonly || attrs.disabled) {
                // Call original onblur if provided
                if (attrs.onblur) {
                  attrs.onblur(e);
                }
                if (onchange && state.inputElement) {
                  onchange(getValue(state.inputElement));
                }
                return;
              }

              if (target && validate) {
                const value = getValue(target);
                // Only validate if user has entered some text
                if (value && String(value).length > 0) {
                  const validationResult = validate(value, target);
                  state.isValid = typeof validationResult === 'boolean' ? validationResult : false;
                  setValidity(target, validationResult);

                  // Update visual validation state
                  if (typeof validationResult === 'boolean') {
                    if (validationResult) {
                      target.classList.remove('invalid');
                      target.classList.add('valid');
                    } else {
                      target.classList.remove('valid');
                      target.classList.add('invalid');
                    }
                  } else if (typeof validationResult === 'string') {
                    target.classList.remove('valid');
                    target.classList.add('invalid');
                    state.isValid = false;
                  }
                } else {
                  // Clear validation state if no text
                  target.classList.remove('valid', 'invalid');
                  state.isValid = true;
                }
              } else if (type === 'email' || type === 'url') {
                // Use browser's native HTML5 validation for email and url types
                const value = getValue(target);
                if (value && String(value).length > 0) {
                  state.isValid = target.validity.valid;
                  target.setCustomValidity(''); // Clear any custom validation message

                  if (state.isValid) {
                    target.classList.remove('invalid');
                    target.classList.add('valid');
                  } else {
                    target.classList.remove('valid');
                    target.classList.add('invalid');
                  }
                } else {
                  // Clear validation state if no text
                  target.classList.remove('valid', 'invalid');
                  state.isValid = true;
                }
              } else if (isNumeric) {
                // Use browser's native HTML5 validation for numeric inputs (handles min, max, step, etc.)
                const value = getValue(target);
                if (value !== undefined && value !== null && !isNaN(Number(value))) {
                  state.isValid = target.validity.valid;
                  target.setCustomValidity(''); // Clear any custom validation message

                  if (state.isValid) {
                    target.classList.remove('invalid');
                    target.classList.add('valid');
                  } else {
                    target.classList.remove('valid');
                    target.classList.add('invalid');
                  }
                } else {
                  // Clear validation state if no valid number
                  target.classList.remove('valid', 'invalid');
                  state.isValid = true;
                }
              }

              // Also call the original onblur handler if provided
              if (attrs.onblur) {
                attrs.onblur(e);
              }
              if (onchange && state.inputElement) {
                onchange(getValue(state.inputElement));
              }
            },
          }),
          // Clear button - only for text inputs with canClear enabled and has content
          canClear && type === 'text' && state.inputElement?.value
            ? m(MaterialIcon, {
                name: 'close',
                className: 'input-clear-btn',
                onclick: (e: MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearInput(oninput, onchange);
                },
              })
            : undefined,
          m(Label, {
            label,
            id,
            isMandatory,
            isActive,
            initialValue: value !== undefined && value !== '',
          }),
          m(HelperText, {
            helperText,
            dataError: state.hasInteracted && !state.isValid ? dataError : undefined,
            dataSuccess: state.hasInteracted && state.isValid ? dataSuccess : undefined,
          }),
          maxLength && typeof value === 'string'
            ? m(CharacterCounter, {
                currentLength: value.length,
                maxLength,
                show: value.length > 0,
              })
            : undefined,
        ]);
      },
    };
  };

/** Component for entering some text */
export const TextInput = InputField<string>('text');
/** Component for entering a password */
export const PasswordInput = InputField<string>('password');
/** Component for entering a number */
export const NumberInput = InputField<number>('number');
/** Component for entering a URL */
export const UrlInput = InputField<string>('url');
/** Component for entering a color */
export const ColorInput = InputField<string>('color');
/** Component for entering a range */
export const RangeInput = InputField<number>('range', '.range-field');
/** Component for entering an email */
export const EmailInput = InputField<string>('email');

export interface FileInputAttrs extends Attributes {
  /** Displayed on the button, @default File */
  label?: string;
  /** Current value of the file input, write only */
  value?: string;
  /** Adds a placeholder message */
  placeholder?: string;
  /** If true, upload multiple files */
  multiple?: boolean;
  /** Called when the file input is changed */
  onchange?: (files: FileList) => void;
  /** If true, disable the box */
  disabled?: boolean;
  /**
   * Accepted file types, e.g. image/png, image/jpeg,
   * any image/*, video/*. audio/*, .pdf, a valid MIME type string, with no extensions, etc.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
   */
  accept?: string | string[];
}

/** Component for uploading a file */
export const FileInput: FactoryComponent<FileInputAttrs> = () => {
  let canClear = false;
  let i: HTMLInputElement;
  return {
    view: ({ attrs }) => {
      const {
        multiple,
        disabled,
        value,
        placeholder,
        onchange,
        className = 'col s12',
        accept: acceptedFiles,
        label = 'File',
      } = attrs;
      const accept = acceptedFiles
        ? acceptedFiles instanceof Array
          ? acceptedFiles.join(', ')
          : acceptedFiles
        : undefined;
      return m(
        '.file-field.input-field',
        {
          className: attrs.class || className,
        },
        [
          m('.btn', [
            m('span', label),
            m('input[type=file]', {
              title: label,
              accept,
              multiple,
              disabled,
              onchange: onchange
                ? (e: UIEvent) => {
                    const i = e.target as HTMLInputElement;
                    if (i && i.files && onchange) {
                      canClear = true;
                      onchange(i.files);
                    }
                  }
                : undefined,
            }),
          ]),
          m(
            '.file-path-wrapper',
            m('input.file-path.validate[type=text]', {
              placeholder,
              oncreate: ({ dom }) => {
                i = dom as HTMLInputElement;
                if (value) i.value = value;
              },
            })
          ),
          (canClear || i?.value) &&
            m(
              'a.waves-effect.waves-teal.btn-flat',
              {
                style: {
                  float: 'right',
                  position: 'relative',
                  top: '-3rem',
                  padding: 0,
                },
                onclick: () => {
                  canClear = false;
                  i.value = '';
                  onchange && onchange({} as FileList);
                },
              },
              m(MaterialIcon, {
                name: 'close',
                className: 'close',
              })
            ),
        ]
      );
    },
  };
};
