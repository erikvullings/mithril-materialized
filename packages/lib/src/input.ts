import M from 'materialize-css';
import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId, toAttrs } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';
import './styles/input.css';

/** Create a TextArea */
export const TextArea: FactoryComponent<IInputOptions<string>> = () => {
  const state = { id: uniqueId() };
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
        onchange,
        style,
        ...params
      } = attrs;
      const attributes = toAttrs(params);
      return m(`.input-field`, { className, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`textarea.materialize-textarea[tabindex=0][id=${id}]${attributes}`, {
          oncreate: ({ dom }) => {
            M.textareaAutoResize(dom);
            if (attrs.maxLength) {
              M.CharacterCounter.init(dom);
            }
          },
          onchange: onchange
            ? (e: Event) => {
                const target = e.target as HTMLInputElement;
                const value = target && typeof target.value === 'string' ? target.value : '';
                onchange(value);
              }
            : undefined,
          value: initialValue,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};

export type InputType = 'url' | 'color' | 'text' | 'number' | 'email' | 'range';

/** Default component for all kinds of input fields. */
const InputField = <T>(type: InputType, defaultClass = ''): FactoryComponent<IInputOptions<T>> => () => {
  const state = { id: uniqueId() };
  const getValue = (target: HTMLInputElement) => {
    const val = (target.value as any) as T;
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
      const attributes = toAttrs(params);
      return m(`.input-field${newRow ? '.clear' : ''}${defaultClass}`, { className, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(`input.validate[type=${type}][tabindex=0][id=${id}]${attributes}`, {
          oncreate: ({ dom }) => {
            if (focus(attrs)) {
              (dom as HTMLElement).focus();
            }
            if (maxLength) {
              M.CharacterCounter.init(dom);
            }
            if (type === 'range') {
              M.Range.init(dom);
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
          onchange: (e: UIEvent) => {
            const target = e.target as HTMLInputElement;
            if (target) {
              const value = getValue(target);
              if (onchange) {
                onchange(value);
              }
              if (validate) {
                setValidity(target, validate(value, target));
              }
            }
          },
          value: initialValue,
        }),
        m(Label, {
          label,
          id,
          isMandatory,
          isActive: initialValue || type === 'number' || type === 'color' || type === 'range' ? true : false,
          // typeof initialValue !== 'undefined' || type === 'color' || type === 'range',
        }),
        m(HelperText, { helperText, dataError, dataSuccess }),
      ]);
    },
  };
};

/** Component for entering some text */
export const TextInput = InputField<string>('text');
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
  return {
    view: ({ attrs }) => {
      const { multiple, disabled, placeholder, onchange, className = 'col s12', accept } = attrs;
      const accepted = accept ? (accept instanceof Array ? accept.join(', ') : accept) : undefined;
      const acc = accepted ? `[accept=${accepted}]` : '';
      const mul = multiple ? '[multiple]' : '';
      const dis = disabled ? '[disabled]' : '';
      const ph = placeholder ? `[placeholder=${placeholder}]` : '';
      return m(
        '.file-field.input-field',
        {
          className: attrs.class || className,
        },
        [
          m('.btn', [
            m('span', 'File'),
            m(`input[type=file]${mul}${dis}${acc}`, {
              className,
              onchange: onchange
                ? (e: UIEvent) => {
                    const i = e.target as HTMLInputElement;
                    if (i && i.files) {
                      onchange(i.files);
                    }
                  }
                : undefined,
            }),
          ]),
          m('.file-path-wrapper', m(`input.file-path.validate${ph}[type=text]`)),
        ]
      );
    },
  };
};
