import { CharacterCounter } from 'materialize-css';
import m, { VnodeDOM, FactoryComponent } from 'mithril';
import { uniqueId, toDottedClassList, toAttrs } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

/** Create a TextArea */
export const TextArea: FactoryComponent<IInputOptions<string>> = () => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, iconName, onchange, initialValue, contentClass, style, helperText, isMandatory } = attrs;
      return m(`.input-field${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`textarea.materialize-textarea[tabindex=0][id=${id}]${attributes}`, {
          oncreate: ({ dom }) => {
            M.textareaAutoResize(dom);
            if (attrs.maxLength) {
              CharacterCounter.init(dom);
            }
          },
          onchange: onchange
            ? (e: Event) => {
                if (e.target && (e.target as HTMLInputElement).value) {
                  onchange((e.target as HTMLInputElement).value);
                }
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
    const val = (target.value as unknown) as T;
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
      const id = attrs.id || state.id;
      const attributes = toAttrs(attrs);
      const {
        label,
        initialValue,
        onchange,
        newRow,
        contentClass,
        style,
        iconName,
        validate,
        isMandatory,
        maxLength,
        helperText,
        dataError,
        dataSuccess,
        onkeydown,
        onkeyup,
        onkeypress,
      } = attrs;
      return m(`.input-field${newRow ? '.clear' : ''}${defaultClass}${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(`input.validate[type=${type}][tabindex=0][id=${id}]${attributes}`, {
          oncreate: (vnode: VnodeDOM) => {
            const { dom } = vnode;
            if (focus(attrs)) {
              (dom as HTMLElement).focus();
            }
            if (maxLength) {
              CharacterCounter.init(dom);
            }
            if (type === 'range') {
              M.Range.init(dom);
            }
          },
          onkeyup: onkeyup ? (ev: KeyboardEvent) => {
            onkeyup(ev, getValue(ev.target as HTMLInputElement));
          } : undefined,
          onkeydown: onkeydown ? (ev: KeyboardEvent) => {
            onkeydown(ev, getValue(ev.target as HTMLInputElement));
          } : undefined,
          onkeypress: onkeypress ? (ev: KeyboardEvent) => {
            onkeypress(ev, getValue(ev.target as HTMLInputElement));
          } : undefined,
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
          isActive: typeof initialValue !== 'undefined' || type === 'color' || type === 'range',
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
