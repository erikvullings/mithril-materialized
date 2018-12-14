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
        `${defaultClassNames}${attrs.contentClass ? '.' + attrs.contentClass : ''}${attributes}${
          attrs.modalId ? '.modal-trigger[href=#' + attrs.modalId + ']' : ''
        }${
          attrs.tooltip ? '.tooltipped[data-position=top][data-tooltip=' + attrs.tooltip + ']' : ''
        }${toAttributeString(attrs.attr)}`,
        attrs.ui || {},
        attrs.iconName ? Icon(attrs.iconName, { class: attrs.iconClass || 'left' }) : '',
        attrs.label ? attrs.label : ''
      ),
  } as Component<{
    label?: string;
    /** If the button is intended to open a modal, specify its modal id */
    modalId?: string;
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
  /** Unique key for use of the element in an array */
  key?: string;
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
      return m(`label${isLabelActive(isActive)}[for=${id || uniqueId()}]`, [
        m.trust(label),
        isMandatory ? m(Mandatory) : undefined,
      ]);
    },
  } as Component<{ label: string; id?: string; isMandatory?: boolean; isActive?: boolean | string }>);

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
  } as Component<IInputOptions>;
};

export type InputType = 'url' | 'color' | 'text' | 'number' | 'email' | 'range';

const oncreateFactory = (type: InputType, id: string) => {
  switch (type) {
    default:
      return undefined;
    case 'text':
      return ({ attrs }: Vnode<IInputOptions>) => {
        if (attrs && attrs.maxLength) {
          const elem = document.querySelector(`#${id}`);
          if (elem) {
            CharacterCounter.init(elem);
          }
        }
      };
    case 'range':
      return () => {
        const elem = document.querySelectorAll(`#${id}`);
        if (elem) {
          M.Range.init(elem);
        }
      };
  }
};

export const HelperText = (): Component<{ helperText?: string; dataError?: string; dataSuccess?: string }> => {
  return {
    view: ({ attrs }) => {
      const { helperText, dataError, dataSuccess } = attrs;
      const a = dataError || dataSuccess ? toAttributeString({ dataError, dataSuccess }) : '';
      return helperText || a ? m(`span.helper-text${a}`, helperText ? m.trust(helperText) : '') : undefined;
    },
  };
};

const InputField = (type: InputType, defaultClass = '') => (): Component<IInputOptions> => {
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
          onchange: onchange
            ? (e: Event) => {
                if (e.target && (e.target as HTMLInputElement).value) {
                  onchange((e.target as HTMLInputElement).value);
                }
              }
            : undefined,
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
      const { label, helperText, initialValue, onchange, newRow, contentClass, style, iconName, isMandatory } = attrs;
      return m(`.input-field${newRow ? '.clear' : ''}${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.validate.autocomplete[type=text][tabindex=0][id=${id}]${attributes}`, {
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

export const InputCheckbox = () => {
  return {
    view: ({ attrs }) => {
      const { contentClass, onchange, label, checked } = attrs;
      return m(
        `div${toDottedClassList(contentClass)}`,
        m('label', [
          m(`input[type=checkbox][tabindex=0]${checked ? '[checked]' : ''}`, {
            onclick: onchange
              ? (e: Event) => {
                  if (e.target && typeof (e.target as HTMLInputElement).checked !== 'undefined') {
                    onchange((e.target as HTMLInputElement).checked);
                  }
                }
              : undefined,
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
  /** Left text label */
  left?: string;
  /** Right text label */
  right?: string;
  /** If checked is true, the switch is set in the right position. */
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
              onclick: onchange
                ? (e: Event) => {
                    if (e.target && typeof (e.target as HTMLInputElement).checked !== 'undefined') {
                      onchange((e.target as HTMLInputElement).checked);
                    }
                  }
                : undefined,
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
  id?: string;
  label: string;
  options: IInputOption[];
  onchange: (isChecked: boolean, id: string, option: IInputOption) => void;
  description?: string;
  contentClass?: string;
  titleClass?: string;
  newRow?: boolean;
  /** If true, add a mandatory * after the label */
  isMandatory?: boolean;
}> => {
  return {
    view: ({ attrs: { label, id, options, onchange, description, contentClass, titleClass, newRow, isMandatory } }) => {
      const clear = newRow ? '.clear' : '';
      return m(`div${clear}${toDottedClassList(titleClass || 'col s12')}`, [
        m('h4', m(Label, { id, label, isMandatory })),
        m(HelperText, { helperText: description }),
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
  checkedId?: string | number | string[] | number[];
  multiple?: boolean;
}

export const Select = (): Component<ISelectOptions> => {
  const state = { id: uniqueId() };
  const isSelected = <T extends number | string>(id: T, checkedId?: T | T[]) =>
    checkedId instanceof Array ? checkedId.indexOf(id) >= 0 : checkedId === id;
  return {
    oncreate: () => {
      const elem = document.querySelector(`#${state.id}`);
      if (elem) {
        M.FormSelect.init(elem);
      }
    },
    view: ({
      attrs: {
        checkedId,
        newRow,
        contentClass,
        onchange,
        options,
        label,
        helperText,
        multiple,
        placeholder,
        isMandatory,
      },
    }) => {
      const id = state.id;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        m(
          `select[id=${id}]${multiple ? '[multiple]' : ''}`,
          {
            onchange: (e: Event) => {
              if (e && e.currentTarget) {
                const b = e.currentTarget as HTMLButtonElement;
                if (onchange) {
                  onchange(b.value);
                }
              }
            },
          },
          placeholder ? m('option[value=""][disabled]', placeholder) : '',
          options.map(o =>
            m(`option[value=${o.id}]${isSelected(o.id, checkedId) ? '[selected]' : ''}`, o.label.replace('&amp;', '&'))
          )
        ),
        m(Label, { label, isMandatory }),
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
    view: ({ attrs: { newRow, contentClass, label, description, onchange, options, checkedId } }) => {
      const groupId = state.id;
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
  view: ({ attrs: { id, groupId, label, onchange, contentClass, checked } }) => {
    return m(
      `div${toDottedClassList(contentClass)}`,
      m('label', [
        m(`input[type=radio][tabindex=0][name=${groupId}]${checked ? '[checked=checked]' : ''}`, {
          onclick: onchange ? () => onchange(id) : undefined,
        }),
        m('span', m.trust(label)),
      ])
    );
  },
});

/** Builds a modal panel, which can be triggered using its id */
export const ModalPanel = (): Component<{
  id: string;
  title: string;
  description?: string;
  /** Set to true when the description contains HTML */
  richContent?: boolean;
  /** Fixate the footer, so you can show more content. */
  fixedFooter?: boolean;
  /** Display on the bottom */
  bottomSheet?: boolean;
  options?: Partial<M.ModalOptions>;
  /** Menu buttons, from left to right */
  buttons?: Array<{ label: string; onclick?: () => void }>;
}> => ({
  oncreate: ({ attrs: { options } }) => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
  },
  view: ({ attrs: { id, title, description, fixedFooter, bottomSheet, buttons, richContent } }) => {
    const ff = fixedFooter ? '.modal-fixed-footer' : '';
    const bs = bottomSheet ? '.bottom-sheet' : '';
    return m(`.modal${ff}${bs}[id=${id}]`, [
      m('.modal-content', [m('h4', title), richContent ? m.trust(description || '') : m('p', description)]),
      buttons
        ? m(
            '.modal-footer',
            buttons.map(b => m('a.modal-close.waves-effect.waves-green.btn-flat', { onclick: b.onclick }, b.label))
          )
        : undefined,
    ]);
  },
});

export interface IChipsOptions extends Partial<M.ChipsOptions> {
  onchange?: (chips: M.ChipData[]) => void;
}

/** Chips and tags */
export const Chips = (): Component<IChipsOptions> => {
  return {
    oncreate: vnode => {
      const { attrs, dom } = vnode;
      const { onchange, onChipAdd, onChipDelete } = attrs;
      if (!onchange) {
        return;
      }
      const chips = M.Chips.getInstance(dom) as M.Chips;
      const onChipAddBound = onChipAdd ? (onChipAdd.bind(chips) as (el: Element, chip: Element) => void) : undefined;
      attrs.onChipAdd = function(this: M.Chips, el: Element, chip: Element) {
        onchange(this.chipsData);
        if (onChipAddBound) {
          onChipAddBound(el, chip);
        }
      };
      const onChipDeleteBound = onChipDelete
        ? (onChipDelete.bind(chips) as (el: Element, chip: Element) => void)
        : undefined;
      attrs.onChipDelete = function(this: M.Chips, el: Element, chip: Element) {
        onchange(this.chipsData);
        if (onChipDeleteBound) {
          onChipDeleteBound(el, chip);
        }
      };
      const elems = document.querySelectorAll('.chips');
      M.Chips.init(elems, attrs);
    },
    onupdate: vnode => {
      const { data } = vnode.attrs;
      if (!data || data.length === 0) {
        return;
      }
      const chips = M.Chips.getInstance(vnode.dom) as M.Chips;
      data.forEach(d => chips.addChip(d));
    },
    view: ({ attrs }) => {
      const { placeholder, data } = attrs;
      return m(
        `.chips.input-field.chips-autocomplete${placeholder ? '.placeholder' : ''}${data ? '.chips-initial' : ''}`
      );
    },
  };
};
