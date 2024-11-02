import m, { Vnode, FactoryComponent, Attributes, Component } from 'mithril';
import { Label, HelperText } from './label';

export interface IInputCheckbox extends Attributes {
  /** Optional event handler when a checkbox is clicked */
  onchange?: (checked: boolean) => void;
  /** Label of the checkbox, can be a string or Vnode */
  label?: string | Vnode<any, any>;
  /** If true, the checkbox is checked */
  checked?: boolean;
  /** If true, the checkbox is disabled */
  disabled?: boolean;
}

/** Component to show a check box */
export const InputCheckbox: FactoryComponent<IInputCheckbox> = () => {
  return {
    view: ({ attrs: { className = 'col s12', onchange, label, checked, disabled, description, style } }) => {
      return m(
        `div`,
        { className, style },
        m('label', [
          m('input[type=checkbox][tabindex=0]', {
            checked,
            disabled,
            onclick: onchange
              ? (e: Event) => {
                  if (e.target && typeof (e.target as HTMLInputElement).checked !== 'undefined') {
                    onchange((e.target as HTMLInputElement).checked);
                  }
                }
              : undefined,
          }),
          label ? (typeof label === 'string' ? m('span', label) : label) : undefined,
        ]),
        description && m(HelperText, { className: 'input-checkbox-desc', helperText: description })
      );
    },
  };
};

export interface IInputOption<T extends string | number> {
  /** Option ID */
  id: T;
  /** Displayed label */
  label: string;
  /** Optional title, often used to display a tooltip - will only work when choosing browser-defaults */
  title?: string;
  /** Is the option disabled? */
  disabled?: boolean;
  /** Select image */
  img?: string;
  /** Select group label */
  group?: string;
  /** Optional class name */
  className?: string;
  /** Optional description */
  description?: string;
}

export interface IOptions<T extends string | number> extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption<T>[];
  /** Event handler that is called when an option is changed */
  onchange?: (checkedId: T[]) => void;
  /**
   * Selected id or ids (in case of multiple options)
   * @deprecated Please use initialValue instead
   */
  checkedId?: T | T[];
  /** Selected id or ids (in case of multiple options) */
  initialValue?: T | T[];
  /** Optional description */
  description?: string;
  /** Optional CSS that is added to the input checkbox, e.g. if you add col s4, the items will be put inline */
  checkboxClass?: string;
  /** If true, start on a new row */
  newRow?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
  /** If true, disable the options. */
  disabled?: boolean;
}

/** A list of checkboxes */
export const Options = <T extends string | number>(): Component<IOptions<T>> => {
  const state = {} as {
    checkedId?: T | T[];
    checkedIds: T[];
  };

  const isChecked = (id: T) => state.checkedIds.indexOf(id) >= 0;

  return {
    oninit: ({ attrs: { initialValue, checkedId } }) => {
      const iv = checkedId || initialValue;
      state.checkedId = checkedId;
      state.checkedIds = iv ? (iv instanceof Array ? [...iv] : [iv]) : [];
    },
    view: ({
      attrs: {
        label,
        id,
        options,
        checkedId,
        description,
        className = 'col s12',
        style,
        disabled,
        checkboxClass,
        newRow,
        isMandatory,
        onchange: callback,
      },
    }) => {
      if (checkedId && state.checkedId !== checkedId) {
        state.checkedId = checkedId;
        state.checkedIds = checkedId instanceof Array ? checkedId : [checkedId];
      }
      const clear = newRow ? '.clear' : '';
      const onchange = callback
        ? (propId: T, checked: boolean) => {
            const checkedIds = state.checkedIds.filter((i) => i !== propId);
            if (checked) {
              checkedIds.push(propId);
            }
            state.checkedIds = checkedIds;
            callback(checkedIds);
          }
        : undefined;
      return m(`div${clear}`, { className, style }, [
        m('div', { className: 'input-field options' }, m(Label, { id, label, isMandatory })),
        m(HelperText, { helperText: description }),
        ...options.map((option) =>
          m(InputCheckbox, {
            disabled: disabled || option.disabled,
            label: option.label,
            onchange: onchange ? (v: boolean) => onchange(option.id, v) : undefined,
            className: option.className || checkboxClass,
            checked: isChecked(option.id),
            description: option.description,
          })
        ),
      ]);
    },
  };
};
