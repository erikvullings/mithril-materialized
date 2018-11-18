import { InputType } from './../models/specification/question';
import { CharacterCounter } from 'materialize-css';
import m, { Vnode, Lifecycle, Component } from 'mithril';
import { uniqueId, removeParagraphs } from './utils';

export const compose = <F extends (d: any) => any, T>(...functions: F[]) => (data: T) =>
  functions.reduceRight((value, func) => func(value), data);

export const map = <T>(f: (...args: any[]) => any) => (x: T[]) => Array.prototype.map.call(x, f);

export const join = <T>(seperator: string) => (list: T[]): string => Array.prototype.join.call(list, seperator);

/**
 * Convert camel case to snake case.
 *
 * @param {string} cc: Camel case string
 */
export const camelToSnake = (cc: string) => cc.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());

const encodeAttribute = (x = '') => x.toString().replace(/"/g, '&quot;');

const toAttributeString = <T extends { [key: string]: any }>(x?: T) =>
  x
    ? compose(
        join(''),
        map((attribute: string) => `[${camelToSnake(attribute)}="${encodeAttribute(x[attribute])}"]`),
        Object.keys
      )(x)
    : '';

export interface IHtmlAttributes {
  id?: string;
  for?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'text' | 'textarea' | 'number';
}

export interface IHtmlInputEvents<State, Attrs> extends Lifecycle<Attrs, State> {
  value?: string | number | boolean;
  href?: string;
  class?: string;
  style?: string;
  type?: string;
  onclick?: (e: UIEvent) => void;
}

export const icon = (iconName: string, attrs = {}) => m('i.material-icons', attrs, iconName);
export const smallIcon = (iconName: string, attrs = {}) => m('i.small.material-icons', attrs, iconName);
export const iconPrefix = (iconName: string, attrs = {}) => m('i.material-icons.prefix', attrs, iconName);

/**
 * Convert a list of class names to mithril syntax, e.g. .class1.class2.class3
 * @param contentClass
 */
export const toDottedClassList = (contentClass?: string | string[]) =>
  contentClass instanceof Array && contentClass.length > 0
    ? '.' + contentClass.join('.')
    : contentClass && typeof contentClass === 'string'
    ? '.' + contentClass.replace(' ', '.')
    : '';

const baseButton = (defaultClassNames: string[]) => <State, Attrs>(opt: {
  label?: string;
  iconName?: string;
  attr?: IHtmlAttributes;
  tooltip?: string;
  ui?: IHtmlInputEvents<State, Attrs>;
  contentClass?: string;
}) =>
  m(
    `${defaultClassNames.join('.')}${opt.contentClass ? '.' + opt.contentClass : ''}${
      opt.tooltip ? '.tooltipped[data-position=top][data-tooltip=' + opt.tooltip + ']' : ''
    }${toAttributeString(opt.attr)}`,
    opt.ui || {},
    opt.iconName ? icon(opt.iconName, { class: 'left' }) : '',
    opt.label ? opt.label : ''
  );

export const button = baseButton(['a', 'waves-effect', 'waves-light', 'btn']);
export const flatButton = baseButton(['button', 'waves-effect', 'waves-teal', 'btn-flat']);
export const roundIconButton = baseButton(['button', 'btn-floating', 'btn-large', 'waves-effect', 'waves-light']);

export const mandatory = '<span style="color: red;">*</span>';

export interface IInputOptions {
  id: string;
  initialValue?: string;
  onchange: (value: string | number | boolean | Date)  => void;
  label: string;
  placeholder?: string;
  helperText?: string;
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
  /** If true, break to a new line */
  newLine?: boolean;
  /** Classes that you wish to attach to a question, e.g. "col s12 m6 l4 xl3" to specify the size. */
  contentClass?: string | string[];
}

/** Options that we want to convert to attributes  */
const inputAttributes = ['min', 'max', 'minLength', 'maxLength', 'rows', 'cols', 'placeholder'];

const isInputAttribute = (key: string) => inputAttributes.indexOf(key) >= 0;
const isDefinedAttribute = (opt: IInputOptions) => (key: string) => typeof (opt as any)[key] !== 'undefined';

const isLabelActive = (s?: string) => s ? '.active' : '';

const toProps = (o: IInputOptions) => {
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
const charCounter = (o: IInputOptions) => (o.maxLength ? `[data-length=${o.maxLength}]` : '');

/** Add the disabled attribute when required */
const disabled = (o: IInputOptions) => (o.disabled ? '[disabled]' : '');

/** Convert input options to a set of input attributes */
const toAttrs = (o: IInputOptions) => toProps(o) + charCounter(o) + disabled(o);

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
      const { label, iconName, onchange, initialValue, contentClass, style } = attrs;
      return m(`.input-field${toDottedClassList(contentClass || 'col s12')}`, { style: style || '' }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`textarea.materialize-textarea[tabindex=0][id=${id}]${attributes}`, {
          onchange: m.withAttr('value', onchange),
          value: initialValue,
        }),
        m(`label${isLabelActive(initialValue)}[for=${id}]`, label),
      ]);
    },
  } as Component<IInputOptions>;
};

const inputField = (type: InputType, defaultClass = '') => (): Component<IInputOptions> => {
  const state = { id: uniqueId() };
  const oncreate =
    type === 'text'
      ? (vnode: Vnode<IInputOptions>) => {
          if (vnode.attrs && vnode.attrs.maxLength) {
            const elem = document.querySelector(`#${state.id}`);
            if (elem) {
              CharacterCounter.init(elem);
            }
          }
        }
      : undefined;
  return {
    oncreate,
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, onchange, newLine, contentClass, iconName } = attrs;
      const finalType = type === 'date' || type === 'time' ? 'text' : type;
      return m(`.input-field${newLine ? '.clear' : ''}${defaultClass}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=${finalType}][tabindex=0][id=${id}]${attributes}`, {
          onchange: m.withAttr('value', v => onchange(v)),
          value: initialValue,
        }),
        m(`label${isLabelActive(initialValue)}[for=${id}]`, m.trust(label)),
        helperText ? m('span.helper-text', m.trust(helperText)) : undefined,
      ]);
    },
  };
};

export const UrlInput = inputField('url');
export const ColorInput = inputField('color');
export const TextInput = inputField('text');
export const NumberInput = inputField('number');
export const EmailInput = inputField('email');

export const DatePicker = (): Component<IInputOptions & Partial<M.DatepickerOptions>> => {
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
          onSelect: d => onchange(d),
          ...attrs,
        });
      }
    },
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, newLine, contentClass, iconName } = attrs;
      const clear = newLine ? '.clear' : '';
      return m(`.input-field.datepicker${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=text][tabindex=0][id=${id}]${attributes}`),
        m(`label[for=${id}]`, m.trust(label)),
        helperText ? m('span.helper-text', m.trust(helperText)) : undefined,
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
          onSelect: (hours, minutes) => onchange(`${hours}:${minutes}`),
          ...attrs,
        });
      }
    },
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, newLine, contentClass, iconName } = attrs;
      const clear = newLine ? '.clear' : '';
      return m(`.input-field.timepicker${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=text][tabindex=0][id=${id}]${attributes}`, {
          value: initialValue,
        }),
        m(`label[for=${id}]`, m.trust(label)),
        helperText ? m('span.helper-text', m.trust(helperText)) : undefined,
      ]);
    },
  };
};

export const InputCheckbox = () => {
  return {
    view: ({ attrs }) => {
      const { contentClass, onchange, label, checked } = attrs;
      console.warn('InputCheckbox');
      return m(
        `div${toDottedClassList(contentClass)}`,
        m('label', [
          m(`input[type=checkbox][tabindex=0]${checked ? '[checked=checked]' : ''}`, {
            onclick: m.withAttr('checked', onchange),
          }),
          m('span', m.trust(removeParagraphs(label))),
        ])
      );
    },
  } as Component<{
    onchange: (value: boolean) => void;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    contentClass?: string;
  }>;
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
  newLine?: boolean;
}> => {
  return {
    view: ({ attrs }) => {
      const { label, options, onchange, description, contentClass, titleClass, newLine } = attrs;
      const clear = newLine ? '.clear' : '';
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

export const Select = (): Component<{
  label: string;
  options: Array<{ id: string | number; label: string }>;
  onchange: (id: string | number) => void;
  description?: string;
  newLine?: boolean;
  contentClass?: string;
  checkedId: string | number | undefined;
}> => {
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
      const { checkedId, newLine, contentClass, onchange, options, label, description } = attrs;
      const clear = newLine ? '.clear' : '';
      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        m(
          `select[id=${id}]`,
          {
            onchange: (e: Event) => {
              if (e && e.currentTarget) {
                const b = e.currentTarget as HTMLButtonElement;
                onchange(b.value);
              }
            },
          },
          options.map(o =>
            m(
              `option[value=${o.id}]${checkedId === o.id ? '[selected]' : ''}`,
              removeParagraphs(o.label).replace('&amp;', '&')
            )
          )
        ),
        m('label', m.trust(removeParagraphs(label))),
        description ? m('span.helper-text', m.trust(description)) : undefined,
      ]);
    },
  };
};

export const InputRadios = (): Component<{
  checkedId: string | number | undefined;
  radios: Array<{ id: string | number; label: string }>;
  onchange: (id: string | number) => void;
  label: string;
  description?: string;
  newLine?: boolean;
  contentClass?: string;
}> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const groupId = state.id;
      const { newLine, contentClass, label, description, onchange, radios } = attrs;
      const checkedId = attrs.checkedId;
      const clear = newLine ? '.clear' : '';
      return m(`.input-field${clear}${toDottedClassList(contentClass)}`, [
        m('h4', m.trust(label)),
        description ? m('p.helper-text', m.trust(description)) : '',
        ...radios.map(r =>
          m(InputRadio, {
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

const InputRadio = (): Component<{
  id: string | number;
  checked?: boolean;
  onchange: (id: string | number) => void;
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
        m('span', m.trust(removeParagraphs(label))),
      ])
    );
  },
});
