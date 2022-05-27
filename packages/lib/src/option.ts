import m, { Vnode, FactoryComponent, Attributes } from 'mithril';
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
    view: ({ attrs: { className = 'col s12', onchange, label, checked, disabled } }) => {
      return m(
        `div`,
        { className },
        m('label', [
          m(`input[type=checkbox][tabindex=0]${checked ? '[checked]' : ''}${disabled ? '[disabled]' : ''}`, {
            onclick: onchange
              ? (e: Event) => {
                  if (e.target && typeof (e.target as HTMLInputElement).checked !== 'undefined') {
                    onchange((e.target as HTMLInputElement).checked);
                  }
                }
              : undefined,
          }),
          label ? (typeof label === 'string' ? m('span', label) : label) : undefined,
        ])
      );
    },
  };
};

export interface IInputOption {
  /** Option ID */
  id: string | number;
  /** Displayed label */
  label: string;
  /** Optional title, often used to display a tooltip - will only work when choosing browser-defaults */
  title?: string;
  /** Is the option disabled? */
  disabled?: boolean;
  // isChecked?: boolean;
}

export interface IOptions extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption[];
  /** Event handler that is called when an option is changed */
  onchange?: (checkedId: Array<string | number>) => void;
  /**
   * Selected id or ids (in case of multiple options)
   * @deprecated Please use initialValue instead
   */
  checkedId?: string | number | Array<string | number>;
  /** Selected id or ids (in case of multiple options) */
  initialValue?: string | number | Array<string | number>;
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
export const Options: FactoryComponent<IOptions> = () => {
  const state = {} as {
    checkedId?: string | number | Array<string | number>;
    checkedIds: Array<string | number>;
  };

  const isChecked = (id: string | number) => state.checkedIds.indexOf(id) >= 0;

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
        ? (propId: string | number, checked: boolean) => {
            const checkedIds = state.checkedIds.filter((i) => i !== propId);
            if (checked) {
              checkedIds.push(propId);
            }
            state.checkedIds = checkedIds;
            callback(checkedIds);
          }
        : undefined;
      return m(`div${clear}`, { className }, [
        m('div', { className: 'input-field options' }, m(Label, { id, label, isMandatory })),
        m(HelperText, { helperText: description }),
        ...options.map((option) =>
          m(InputCheckbox, {
            disabled: disabled || option.disabled,
            label: option.label,
            onchange: onchange ? (v: boolean) => onchange(option.id, v) : undefined,
            className: checkboxClass,
            checked: isChecked(option.id),
          })
        ),
      ]);
    },
  };
};
