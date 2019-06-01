import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { IInputOption } from './option';
import { Label } from './label';

export interface IRadioButtons extends Attributes {
  label?: string;
  options: IInputOption[];
  onchange: (id: string | number) => void;
  checkedId?: string | number;
  description?: string;
  newRow?: boolean;
  isMandatory?: boolean;
}

/** Component to show a list of radio buttons, from which you can choose one. */
export const RadioButtons: FactoryComponent<IRadioButtons> = () => {
  const state = { id: uniqueId() };
  return {
    view: ({
      attrs: { newRow, className = 'col s12', label = '', description, onchange, options, checkedId, isMandatory },
    }) => {
      const groupId = state.id;
      const clear = newRow ? '.clear' : '';
      return m(`div${clear}`, { className }, [
        m('h6', m(Label, { label, isMandatory })),
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

export interface IRadioButton extends Attributes {
  id: string | number;
  checked?: boolean;
  onchange: (id: string | number) => void;
  label: string;
  groupId: string;
  disabled?: boolean;
}

export const RadioButton: FactoryComponent<IRadioButton> = () => ({
  view: ({ attrs: { id, groupId, label, onchange, className = 'col s12', checked } }) => {
    return m(
      `div`,
      { className },
      m('label', [
        m(`input[type=radio][tabindex=0][name=${groupId}]${checked ? '[checked=checked]' : ''}`, {
          onclick: onchange ? () => onchange(id) : undefined,
        }),
        m('span', m.trust(label)),
      ])
    );
  },
});
