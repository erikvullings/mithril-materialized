import { CharacterCounter } from 'materialize-css';
import m, { Vnode, Lifecycle, Component } from 'mithril';
import { uniqueId, toAttributeString, toDottedClassList } from './utils';

export interface IHtmlAttributes {
  id?: string;
  for?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'text' | 'textarea' | 'number';
}

export interface IHtmlInputEvents<Attrs, State> extends Lifecycle<Attrs, State> {
  value?: string | number | boolean;
  href?: string;
  class?: string;
  style?: string;
  type?: string;
  onclick?: (e: UIEvent) => void;
}

export const Icon = (iconName: string, attrs = {}) => m('i.material-icons', attrs, iconName);
export const SmallIcon = (iconName: string, attrs = {}) => m('i.small.material-icons', attrs, iconName);
export const PrefixedIcon = (iconName: string, attrs = {}) => m('i.material-icons.prefix', attrs, iconName);

/** A button factory */
export const baseButtonFactory = (defaultClassNames: string, attributes: string = '') => <Attrs, State>() =>
  ({
    view: ({ attrs }) =>
      m(
        `${defaultClassNames}${attributes}${attrs.contentClass ? '.' + attrs.contentClass : ''}${
          attrs.tooltip ? '.tooltipped[data-position=top][data-tooltip=' + attrs.tooltip + ']' : ''
        }${toAttributeString(attrs.attr)}`,
        attrs.ui || {},
        attrs.iconName ? Icon(attrs.iconName, { class: attrs.iconClass || 'left' }) : '',
        attrs.label ? attrs.label : ''
      ),
  } as Component<{
    name?: string;
    label?: string;
    iconName?: string;
    iconClass?: string;
    attr?: IHtmlAttributes;
    tooltip?: string;
    ui?: IHtmlInputEvents<Attrs, State>;
    contentClass?: string;
  }>);

export const Button = baseButtonFactory('a.waves-effect.waves-light.btn');
export const LargeButton = baseButtonFactory('a.waves-effect.waves-light.btn-large');
export const SmallButton = baseButtonFactory('a.waves-effect.waves-light.btn-small');
export const FlatButton = baseButtonFactory('a.waves-effect.waves-teal.btn-flat');
export const RoundIconButton = baseButtonFactory('button.btn-floating.btn-large.waves-effect.waves-light');
export const SubmitButton = baseButtonFactory('button.btn.waves-effect.waves-light', '[type=submit]');

export const CodeBlock = (): Component<{
  language?: string;
  code: string | string[];
  newRow?: boolean;
  contentClass?: string;
}> => ({
  view: ({ attrs }) => {
    const { newRow, contentClass } = attrs;
    const language = attrs.language || 'lang-TypeScript';
    const label = language.replace('lang-', '');
    const code = attrs.code instanceof Array ? attrs.code.join('\n') : attrs.code;
    return m(`pre.codeblock${toDottedClassList(contentClass)}${newRow ? '.clear' : ''}`, [
      m('div', m('label', label)),
      m(`code.${language}`, code),
    ]);
  },
});

export interface IInputOptions<T = string> {
  label: string;
  id?: string;
  initialValue?: T;
  onchange?: (value: T) => void;
  placeholder?: string;
  helperText?: string;
  /** Will replace the helperText, if any, when the input is incorrect. */
  dataError?: string;
  /** Will replace the helperText, if any, when the input is correct. */
  dataSuccess?: string;
  iconName?: string;
  disabled?: boolean;
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

/** Options that we want to convert to attributes  */
const inputAttributes = ['min', 'max', 'minLength', 'maxLength', 'rows', 'cols', 'placeholder'];

const isInputAttribute = (key: string) => inputAttributes.indexOf(key) >= 0;

const isDefinedAttribute = <T>(opt: IInputOptions<T>) => (key: string) => typeof (opt as any)[key] !== 'undefined';

const isLabelActive = (s?: string | boolean) => (s ? '.active' : '');

const toProps = <T>(o: IInputOptions<T>) => {
  const isAttributeDefined = isDefinedAttribute(o);
  return Object.keys(o)
    .filter(isInputAttribute)
    .filter(isAttributeDefined)
    .reduce(
      (p, c) => {
        const value = (o as any)[c];
        p.push(`[${c.toLowerCase()}=${value}]`);
        return p;
      },
      [] as string[]
    )
    .join('');
};

/** Add a character counter when there is an input restriction. */
const charCounter = <T>(o: IInputOptions<T>) => (o.maxLength ? `[data-length=${o.maxLength}]` : '');

/** Add the disabled attribute when required */
const disable = ({ disabled }: { disabled?: boolean }) => (disabled ? '[disabled]' : '');

/** Convert input options to a set of input attributes */
const toAttrs = <T>(o: IInputOptions<T>) => toProps(o) + charCounter(o) + disable(o);

export const Mandatory = { view: () => m('span.mandatory', '*') };

export const Label = () =>
  ({
    view: ({ attrs }) => {
      const { label, id, isMandatory, isActive } = attrs;
      return m(`label${isLabelActive(isActive)}[for=${id}]`, [m.trust(label), isMandatory ? m(Mandatory) : undefined]);
    },
  } as Component<{ label: string; id: string; isMandatory?: boolean; isActive?: boolean | string }>);

export const TextArea = () => {
  const state = { id: uniqueId() };
  return {
    oncreate: ({ attrs }) => {
      const elem = document.querySelector(`#${state.id}`);
      if (elem) {
        M.textareaAutoResize(elem);
        if (attrs.maxLength) {
          CharacterCounter.init(elem);
        }
      }
    },
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, iconName, onchange, initialValue, contentClass, style, helperText, isMandatory } = attrs;
      return m(`.input-field${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`textarea.materialize-textarea[tabindex=0][id=${id}]${attributes}`, {
          onchange: onchange ? m.withAttr('value', onchange) : undefined,
          value: initialValue,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  } as Component<IInputOptions>;
};

export type InputType = 'url' | 'color' | 'text' | 'number' | 'email' | 'range';

const oncreateFactory = (type: InputType, id: string) => {
  switch (type) {
    default: return undefined;
    case 'text': return ({ attrs }: Vnode<IInputOptions>) => {
      if (attrs && attrs.maxLength) {
        const elem = document.querySelector(`#${id}`);
        if (elem) {
          CharacterCounter.init(elem);
        }
      }
    };
    case 'range': return () => {
      const elem = document.querySelectorAll(`#${id}`);
      if (elem) {
        M.Range.init(elem);
      }
    };
  }
};

export const HelperText = (): Component<{ helperText?: string; dataError?: string; dataSuccess?: string; }> => {
  return {
    view: ({ attrs }) => {
      const { helperText, dataError, dataSuccess } = attrs;
      const a = dataError || dataSuccess ? toAttributeString({ dataError, dataSuccess }) : '';
      return helperText || a
        ? m(`span.helper-text${a}`, helperText ? m.trust(helperText) : '')
        : undefined;
    },
  };
};

const InputField = (
  type: InputType,
  defaultClass = ''
) => (): Component<IInputOptions> => {
  const state = { id: uniqueId() };
  const oncreate = oncreateFactory(type, state.id);
  return {
    oncreate,
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const attributes = toAttrs(attrs);
      const {
        label,
        helperText,
        initialValue,
        onchange,
        newRow,
        contentClass,
        style,
        iconName,
        dataError,
        dataSuccess,
        isMandatory,
      } = attrs;
      return m(`.input-field${newRow ? '.clear' : ''}${defaultClass}${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.validate[type=${type}][tabindex=0][id=${id}]${attributes}`, {
          onchange: onchange ? m.withAttr('value', onchange) : undefined,
          value: initialValue,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue || type === 'color' || type === 'range' }),
        m(HelperText, { helperText, dataError, dataSuccess }),
      ]);
    },
  };
};

export const UrlInput = InputField('url');
export const ColorInput = InputField('color');
export const TextInput = InputField('text');
export const NumberInput = InputField('number');
export const RangeInput = InputField('range', '.range-field');
export const EmailInput = InputField('email');

export const Autocomplete = (): Component<Partial<M.AutocompleteOptions> & IInputOptions> => {
  const state = { id: uniqueId() };
  return {
    oncreate: ({ attrs }) => {
      const elem = document.querySelectorAll(`#${state.id}`);
      if (elem) {
        M.Autocomplete.init(elem, attrs);
      }
    },
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const attributes = toAttrs(attrs);
      const {
        label,
        helperText,
        initialValue,
        onchange,
        newRow,
        contentClass,
        style,
        iconName,
        isMandatory,
      } = attrs;
      return m(`.input-field${newRow ? '.clear' : ''}${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.validate.autocomplete[type=text][tabindex=0][id=${id}]${attributes}`, {
          onchange: onchange ? m.withAttr('value', onchange) : undefined,
          value: initialValue,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};

export const InputCheckbox = () => {
  return {
    view: ({ attrs }) => {
      const { contentClass, onchange, label, checked } = attrs;
      return m(
        `div${toDottedClassList(contentClass)}`,
        m('label', [
          m(`input[type=checkbox][tabindex=0]${checked ? '[checked]' : ''}`, {
            onclick: m.withAttr('checked', onchange),
          }),
          m('span', m.trust(label)),
        ])
      );
    },
  } as Component<{
    onchange: (value: boolean) => void;
    label: string;
    checked?: boolean;
    contentClass?: string;
  }>;
};

export interface ISwitchOptions extends Partial<IInputOptions<boolean>> {
  left?: string;
  right?: string;
  checked?: boolean;
}

export const Switch = (): Component<ISwitchOptions> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const { label, contentClass, left, right, disabled, newRow, onchange, checked, isMandatory } = attrs;
      return m(`div${newRow ? '.clear' : ''}${toDottedClassList(contentClass)}`, [
        label ? m(Label, { label: label || '', id, isMandatory }) : undefined,
        m(
          '.switch',
          m('label', [
            left || 'Off',
            m(`input[id=${id}][type=checkbox]${disable({ disabled })}${checked ? '[checked]' : ''}`, {
              onclick: onchange ? m.withAttr('checked', onchange) : undefined,
            }),
            m('span.lever'),
            right || 'On',
          ])
        ),
      ]);
    },
  };
};

export const DatePicker = (): Component<IInputOptions<Date> & Partial<M.DatepickerOptions>> => {
  const state = { id: uniqueId() };
  return {
    oncreate: ({ attrs }) => {
      const elems = document.querySelectorAll(`#${state.id}`);
      if (elems) {
        const { initialValue, onchange } = attrs;
        M.Datepicker.init(elems, {
          format: 'yyyy/mm/dd',
          showClearBtn: true,
          setDefaultDate: true,
          defaultDate: initialValue ? new Date(initialValue) : new Date(),
          onSelect: onchange,
          ...attrs,
        } as Partial<M.DatepickerOptions>);
      }
    },
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, newRow, contentClass, iconName, isMandatory } = attrs;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field.datepicker${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=text][tabindex=0][id=${id}]${attributes}`),
        m(Label, { label, id, isMandatory, isActive: !!initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};

export const TimePicker = (): Component<IInputOptions & Partial<M.TimepickerOptions>> => {
  const state = { id: uniqueId() };
  return {
    oncreate: ({ attrs }) => {
      const elems = document.querySelectorAll(`#${state.id}`);
      if (elems) {
        const { initialValue, onchange } = attrs;
        M.Timepicker.init(elems, {
          twelveHour: false,
          showClearBtn: true,
          defaultTime: initialValue,
          onSelect: onchange ? (hours, minutes) => onchange(`${hours}:${minutes}`) : undefined,
          ...attrs,
        } as Partial<M.TimepickerOptions>);
      }
    },
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, newRow, contentClass, iconName, isMandatory } = attrs;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field.timepicker${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=text][tabindex=0][id=${id}]${attributes}`, {
          value: initialValue,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};

export interface IInputOption {
  id: string;
  label: string;
  isChecked?: boolean;
}

export const Options = (): Component<{
  label: string;
  options: IInputOption[];
  onchange: (isChecked: boolean, id: string, option: IInputOption) => void;
  description?: string;
  contentClass?: string;
  titleClass?: string;
  newRow?: boolean;
}> => {
  return {
    view: ({ attrs }) => {
      const { label, options, onchange, description, contentClass, titleClass, newRow } = attrs;
      const clear = newRow ? '.clear' : '';
      return m(`div${clear}${toDottedClassList(titleClass || 'col s12')}`, [
        m('h4', m.trust(label)),
        description ? m('p.helper-text', m.trust(description)) : '',
        ...options.map(option =>
          m(InputCheckbox, {
            label: option.label,
            onchange: (v: boolean) => onchange(v, option.id, option),
            contentClass,
            checked: option.isChecked,
          })
        ),
      ]);
    },
  };
};

export interface ISelectOptions extends IInputOptions {
  options: Array<{ id: string | number; label: string }>;
  checkedId?: string | number;
}

export const Select = (): Component<ISelectOptions> => {
  const state = { id: uniqueId() };
  return {
    oncreate: () => {
      const elem = document.querySelector(`#${state.id}`);
      if (elem) {
        M.FormSelect.init(elem);
      }
    },
    view: ({ attrs }) => {
      const id = state.id;
      const { checkedId, newRow, contentClass, onchange, options, label, helperText } = attrs;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        m(
          `select[id=${id}]`,
          {
            onchange: (e: Event) => {
              if (e && e.currentTarget) {
                const b = e.currentTarget as HTMLButtonElement;
                if (onchange) { onchange(b.value); }
              }
            },
          },
          options.map(o =>
            m(`option[value=${o.id}]${checkedId === o.id ? '[selected]' : ''}`, o.label.replace('&amp;', '&'))
          )
        ),
        m('label', m.trust(label)),
        m(HelperText, { helperText }),
      ]);
    },
  };
};

export const RadioButtons = (): Component<{
  label: string;
  options: Array<{ id: string; label: string }>;
  onchange: (id: string) => void;
  checkedId?: string;
  description?: string;
  newRow?: boolean;
  contentClass?: string;
}> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const groupId = state.id;
      const { newRow, contentClass, label, description, onchange, options } = attrs;
      const checkedId = attrs.checkedId;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field${clear}${toDottedClassList(contentClass)}`, [
        m('h4', m.trust(label)),
        description ? m('p.helper-text', m.trust(description)) : '',
        ...options.map(r =>
          m(RadioButton, {
            ...r,
            onchange,
            groupId,
            checked: r.id === checkedId,
          })
        ),
      ]);
    },
  };
};

const RadioButton = (): Component<{
  id: string;
  checked?: boolean;
  onchange: (id: string) => void;
  label: string;
  groupId: string;
  disabled?: boolean;
  contentClass?: string;
}> => ({
  view: ({ attrs }) => {
    const { id, groupId, label, onchange, contentClass } = attrs;
    return m(
      `div${toDottedClassList(contentClass)}`,
      m('label', [
        m(`input[type=radio][tabindex=0][name=${groupId}]${attrs.checked ? '[checked=checked]' : ''}`, {
          onclick: m.withAttr('checked', v => onchange(id)),
        }),
        m('span', m.trust(label)),
      ])
    );
  },
});
