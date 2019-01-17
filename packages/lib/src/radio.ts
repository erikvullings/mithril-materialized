import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId, toDottedClassList } from './utils';

export interface IRadioButtons extends Attributes {
  label: string;
  options: Array<{ id: string; label: string }>;
  onchange: (id: string) => void;
  checkedId?: string;
  description?: string;
  newRow?: boolean;
  contentClass?: string;
}

/** Component to show a list of radio buttons, from which you can choose one. */
export const RadioButtons: FactoryComponent<IRadioButtons> = () => {
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

export interface IRadioButton {
  id: string;
  checked?: boolean;
  onchange: (id: string) => void;
  label: string;
  groupId: string;
  disabled?: boolean;
  contentClass?: string;
}

export const RadioButton: FactoryComponent<IRadioButton> = () => ({
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
