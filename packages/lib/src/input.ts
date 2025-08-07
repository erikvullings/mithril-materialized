import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';
// import './styles/input.css';

/** Character counter component that tracks text length against maxLength */
const CharacterCounter: FactoryComponent<{ currentLength: number; maxLength: number }> = () => {
  return {
    view: ({ attrs }) => {
      const { currentLength, maxLength } = attrs;
      const isOverLimit = currentLength > maxLength;
      return m('span.character-counter', {
        style: {
          color: isOverLimit ? 'var(--md-error)' : 'var(--md-grey-600)'
        }
      }, `${currentLength}/${maxLength}`);
    }
  };
};

/** Create a TextArea */
export const TextArea: FactoryComponent<IInputOptions<string>> = () => {
  const state = { id: uniqueId(), currentLength: 0, hasInteracted: false, isValid: true };
  return {
    view: ({ attrs }) => {
      const {
        className = 'col s12',
        helperText,
        iconName,
        id = state.id,
        initialValue,
        isMandatory,
        label,
        maxLength,
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
          oncreate: ({ dom }) => {
            // Auto-resize functionality
            const textarea = dom as HTMLTextAreaElement;
            const autoResize = () => {
              textarea.style.height = 'auto';
              textarea.style.height = textarea.scrollHeight + 'px';
            };
            textarea.addEventListener('input', autoResize);
            autoResize(); // Initial resize
            
            // Update character count state for counter component
            if (maxLength) {
              const updateLength = () => {
                state.currentLength = textarea.value.length;
                m.redraw();
              };
              textarea.addEventListener('input', updateLength);
              state.currentLength = textarea.value.length; // Initial count
            }
          },
          oninput: () => {
            state.hasInteracted = true;
          },
          onchange: onchange
            ? (e: Event) => {
                const target = e.target as HTMLInputElement;
                const value = target && typeof target.value === 'string' ? target.value : '';
                state.hasInteracted = true;
                onchange(value);
              }
            : undefined,
          value: initialValue,
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
          onblur,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue || attrs.placeholder }),
        m(HelperText, { 
          helperText, 
          dataError: state.hasInteracted && attrs.dataError ? attrs.dataError : undefined,
          dataSuccess: state.hasInteracted && attrs.dataSuccess ? attrs.dataSuccess : undefined 
        }),
        maxLength ? m(CharacterCounter, { currentLength: state.currentLength, maxLength }) : undefined,
      ]);
    },
  };
};

export type InputType = 'url' | 'color' | 'text' | 'number' | 'email' | 'range' | 'password';

/** Default component for all kinds of input fields. */
const InputField =
  <T>(type: InputType, defaultClass = ''): FactoryComponent<IInputOptions<T>> =>
  () => {
    const state = { id: uniqueId(), currentLength: 0, hasInteracted: false, isValid: true };
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
    const focus = ({ autofocus }: IInputOptions<T>) =>
      autofocus ? (typeof autofocus === 'boolean' ? autofocus : autofocus()) : false;

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
          isMandatory,
          label,
          maxLength,
          newRow,
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
        return m('.input-field', { className: cn, style }, [
          iconName ? m('i.material-icons.prefix', iconName) : undefined,
          m('input.validate', {
            ...params,
            type,
            tabindex: 0,
            id,
            // attributes,
            oncreate: ({ dom }) => {
              if (focus(attrs)) {
                (dom as HTMLElement).focus();
              }

              const input = dom as HTMLInputElement;
              const parentElement = input.parentElement as HTMLElement;

              // Set initial value if provided
              if (initialValue !== undefined) {
                input.value = String(initialValue);
              }

              // Update character count state for counter component
              if (maxLength) {
                const updateLength = () => {
                  state.currentLength = input.value.length;
                  m.redraw();
                };
                input.addEventListener('input', updateLength);
                state.currentLength = input.value.length; // Initial count
              }

              // Add focus and blur event handlers for label animation
              const label = parentElement.querySelector('label');

              const updateLabelState = () => {
                if (label) {
                  if (input.value !== '' || document.activeElement === input || input.placeholder) {
                    label.classList.add('active');
                  } else {
                    label.classList.remove('active');
                  }
                }
              };

              input.addEventListener('focus', updateLabelState);
              input.addEventListener('blur', updateLabelState);
              input.addEventListener('input', updateLabelState);

              // Initial label state
              updateLabelState();

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
              const target = e.target as HTMLInputElement;
              state.hasInteracted = true;
              
              // Handle original oninput logic
              const value = getValue(target);
              if (onchange) {
                onchange(value);
              }
              
              // Validate on input if there's content and user has interacted
              if (validate && target.value.length > 0) {
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
              }
            },
            onblur: (e: FocusEvent) => {
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
            },
            value: initialValue,
          }),
          m(Label, {
            label,
            id,
            isMandatory,
            isActive:
              typeof initialValue !== 'undefined' ||
              attrs.placeholder ||
              type === 'number' ||
              type === 'color' ||
              type === 'range'
                ? true
                : false,
          }),
          m(HelperText, { 
            helperText, 
            dataError: state.hasInteracted && !state.isValid ? dataError : undefined, 
            dataSuccess: state.hasInteracted && state.isValid && initialValue ? dataSuccess : undefined 
          }),
          maxLength ? m(CharacterCounter, { currentLength: state.currentLength, maxLength }) : undefined,
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

export interface IFileInputOptions extends Attributes {
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
export const FileInput: FactoryComponent<IFileInputOptions> = () => {
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
          (canClear || initialValue) &&
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
              m('i.material-icons', 'clear')
            ),
        ]
      );
    },
  };
};
