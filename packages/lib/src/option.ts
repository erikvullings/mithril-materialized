import m, { FactoryComponent, Attributes } from 'mithril';
import { Label, HelperText } from './label';

export interface IInputCheckbox extends Attributes {
  /** Optional event handler when an option is clicked */
  onchange?: (checked: boolean) => void;
  /** Title or label of the option */
  label: string;
  /** If true, the option is checked */
  checked?: boolean;
}

/** Component to show a check box */
export const InputCheckbox: FactoryComponent<IInputCheckbox> = () => {
  return {
    view: ({ attrs }) => {
      const { className = 'col s12', onchange, label, checked } = attrs;
      return m(
        `div`,
        { className },
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
  };
};

export interface IInputOption extends Attributes {
  /** Option ID */
  id: string;
  /** Title or label */
  label: string;
  /** Is the option selected? */
  isChecked?: boolean;
}

export interface IOptions extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption[];
  /** Event handler that is called when an option is changed */
  onchange?: (isChecked: boolean, id: string, option: IInputOption) => void;
  /** Optional description */
  description?: string;
  /** Optional CSS that is added to the input checkbox */
  checkboxClass?: string;
  /** If true, start on a new row */
  newRow?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
}

/** A list of checkboxes */
export const Options: FactoryComponent<IOptions> = () => {
  return {
    view: ({ attrs: { label, id, options, onchange, description, className, checkboxClass, newRow, isMandatory } }) => {
      const clear = newRow ? '.clear' : '';
      return m(`div${clear}`, { className },  [
        m('h4', m(Label, { id, label, isMandatory })),
        m(HelperText, { helperText: description }),
        ...options.map(option =>
          m(InputCheckbox, {
            label: option.label,
            onchange: onchange ? (v: boolean) => onchange(v, option.id, option) : undefined,
            checkboxClass,
            checked: option.isChecked,
          })
        ),
      ]);
    },
  };
};
