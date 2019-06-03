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
  /** If true, draw the radio buttons inline */
  inline?: boolean;
}

/** Component to show a check box */
export const InputCheckbox: FactoryComponent<IInputCheckbox> = () => {
  return {
    view: ({ attrs: { inline, className = inline ? 'col' : 'col s12', onchange, label, checked, disabled } }) => {
      return m(
        `div`,
        { className, style: inline ? 'display: inline-block; margin: 0 2em 1em 0;' : '' },
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
  /** Title or label */
  label: string;
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
  /** Selected id or ids (in case of multiple options) */
  checkedId?: string | number | Array<string | number>;
  /** Optional description */
  description?: string;
  /** Optional CSS that is added to the input checkbox */
  checkboxClass?: string;
  /** If true, start on a new row */
  newRow?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
  /** If true, draw the radio buttons inline */
  inline?: boolean;
}

/** A list of checkboxes */
export const Options: FactoryComponent<IOptions> = () => {
  const state = {} as {
    checkedIds: Array<string | number>;
    onchange?: (id: string | number, checked: boolean) => void;
  };

  const isChecked = (id: string | number) => state.checkedIds.indexOf(id) >= 0;

  return {
    oninit: ({ attrs: { onchange, checkedId } }) => {
      state.checkedIds = checkedId ? (checkedId instanceof Array ? [...checkedId] : [checkedId]) : [];
      state.onchange = onchange
        ? (id: string | number, checked: boolean) => {
            const checkedIds = state.checkedIds.filter(i => i !== id);
            if (checked) {
              checkedIds.push(id);
            }
            state.checkedIds = checkedIds;
            onchange(checkedIds);
          }
        : undefined;
    },
    view: ({
      attrs: { label, id, options, description, className = 'col s12', checkboxClass, newRow, isMandatory, inline },
    }) => {
      const clear = newRow ? '.clear' : '';
      const { onchange } = state;
      return m(`div${clear}`, { className }, [
        m('h6', { style: 'margin-top: 0;' }, m(Label, { id, label, isMandatory })),
        m(HelperText, { helperText: description }),
        ...options.map(option =>
          m(InputCheckbox, {
            inline,
            disabled: option.disabled,
            label: option.label,
            onchange: onchange ? (v: boolean) => onchange(option.id, v) : undefined,
            checkboxClass,
            checked: isChecked(option.id),
          })
        ),
      ]);
    },
  };
};
