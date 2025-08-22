import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';
import { MaterialIcon } from './material-icon';
import { InputType } from './types';

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
            fontSize: '12px',
            display: 'block',
            textAlign: 'right',
            marginTop: '8px',
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
  };

  let labelManager: { updateLabelState: () => void; cleanup: () => void } | null = null;

  const updateHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    const newHeight = textarea.scrollHeight + 'px';
    state.height = textarea.value.length === 0 ? undefined : newHeight;
  };

  return {
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
        initialValue,
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
      // const attributes = toAttrs(params);
      return m('.input-field', { className, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m('textarea.materialize-textarea', {
          ...params,
          id,
          tabindex: 0,
          style: {
            height: state.height,
          },
          oncreate: ({ dom }) => {
            const textarea = (state.textarea = dom as HTMLTextAreaElement);

            // Set initial value and height if provided
            if (initialValue) {
              textarea.value = String(initialValue);
              updateHeight(textarea);
              // } else {
              // updateHeight(textarea);
            }

            // Update character count state for counter component
            if (maxLength) {
              state.currentLength = textarea.value.length; // Initial count
              m.redraw();
            }
          },
          onupdate: ({ dom }) => {
            const textarea = dom as HTMLTextAreaElement;
            if (state.height) textarea.style.height = state.height;
          },
          onfocus: () => {
            state.active = true;
          },
          oninput: (e: Event) => {
            state.active = true;
            state.hasInteracted = false;
            const target = e.target as HTMLTextAreaElement;

            // Update height for auto-resize
            updateHeight(target);

            // Update character count
            if (maxLength) {
              state.currentLength = target.value.length;
              state.hasInteracted = target.value.length > 0;
            }

            // Call onchange handler
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
          isActive: state.textarea?.value || placeholder || state.active,
          initialValue: initialValue !== undefined,
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
      ]);
    },
  };
};


/** Default component for all kinds of input fields. */
const InputField =
  <T>(type: InputType, defaultClass = ''): FactoryComponent<InputAttrs<T>> =>
  () => {
    const state = {
      id: uniqueId(),
      currentLength: 0,
      hasInteracted: false,
      isValid: true,
      active: false,
      inputElement: null as null | HTMLInputElement,
    };
    // let labelManager: { updateLabelState: () => void; cleanup: () => void } | null = null;
    // let lengthUpdateHandler: (() => void) | null = null;
    // let inputElement: HTMLInputElement | null = null;

    const getValue = (target: HTMLInputElement) => {
      const val = target.value as any as T;
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

    const lengthUpdateHandler = () => {
      const length = state.inputElement?.value.length;
      if (length) {
        state.currentLength = length;
        state.hasInteracted = length > 0;
      }
    };

    return {
      view: ({ attrs }) => {
        const {
          className = 'col s12',
          dataError,
          dataSuccess,
          helperText,
          iconName,
          id = state.id,
          initialValue,
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
          ...params
        } = attrs;
        // const attributes = toAttrs(params);
        const cn = [newRow ? 'clear' : '', defaultClass, className].filter(Boolean).join(' ').trim();
        const isActive =
          state.active || state.inputElement?.value || placeholder || type === 'color' || type === 'range'
            ? true
            : false;
        return m('.input-field', { className: cn, style }, [
          iconName ? m('i.material-icons.prefix', iconName) : undefined,
          m('input.validate', {
            ...params,
            type,
            tabindex: 0,
            id,
            placeholder,
            // attributes,
            oncreate: ({ dom }) => {
              const input = (state.inputElement = dom as HTMLInputElement);
              if (focus(attrs)) {
                input.focus();
              }

              // Set initial value if provided
              if (initialValue) {
                input.value = String(initialValue);
              }

              // Update character count state for counter component
              if (maxLength) {
                state.currentLength = input.value.length; // Initial count
              }

              // Range input functionality
              if (type === 'range') {
                const updateThumb = () => {
                  const value = input.value;
                  const min = input.min || '0';
                  const max = input.max || '100';
                  const percentage =
                    ((parseFloat(value) - parseFloat(min)) / (parseFloat(max) - parseFloat(min))) * 100;
                  input.style.setProperty('--range-progress', `${percentage}%`);
                };
                input.addEventListener('input', updateThumb);
                updateThumb(); // Initial position
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
            onupdate: validate
              ? ({ dom }) => {
                  const target = dom as HTMLInputElement;
                  setValidity(target, validate(getValue(target), target));
                }
              : undefined,
            oninput: (e: Event) => {
              state.active = true;
              const target = e.target as HTMLInputElement;

              // Handle original oninput logic
              const value = getValue(target);
              if (oninput) {
                oninput(value);
              }

              if (maxLength) {
                lengthUpdateHandler();
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
              }
            },
            onfocus: () => {
              state.active = true;
            },
            onblur: (e: FocusEvent) => {
              state.active = false;
              const target = e.target as HTMLInputElement;
              state.hasInteracted = true;

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
          m(Label, {
            label,
            id,
            isMandatory,
            isActive,
            initialValue: initialValue !== undefined,
          }),
          m(HelperText, {
            helperText,
            dataError: state.hasInteracted && !state.isValid ? dataError : undefined,
            dataSuccess: state.hasInteracted && state.isValid ? dataSuccess : undefined,
          }),
          maxLength
            ? m(CharacterCounter, {
                currentLength: state.currentLength,
                maxLength,
                show: state.currentLength > 0,
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
  initialValue?: string;
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
        initialValue,
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
                if (initialValue) i.value = initialValue;
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
