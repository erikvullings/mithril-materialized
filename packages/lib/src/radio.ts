import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { IInputOption } from './option';
import { Label } from './label';

export interface IRadioButtons extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption[];
  /** Event handler that is called when an option is changed */
  onchange: (id: string | number) => void;
  /** Selected id (in oninit lifecycle) */
  initialValue?: string | number;
  /** Selected id (in oninit and onupdate lifecycle) */
  checkedId?: string | number;
  /** Optional description */
  description?: string;
  /** If true, start on a new row */
  newRow?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
  /** Optional CSS that is added to the input checkbox, e.g. if you add col s4, the items will be put inline */
  checkboxClass?: string;
  /** Disable the button */
  disabled?: boolean;
}

/** Component to show a list of radio buttons, from which you can choose one. */
export const RadioButtons: FactoryComponent<IRadioButtons> = () => {
  const state = { groupId: uniqueId() } as {
    groupId: string;
    oldCheckedId?: string | number;
    checkedId?: string | number;
    onchange: (id: string | number) => void;
  };
  return {
    oninit: ({ attrs: { checkedId, initialValue } }) => {
      state.oldCheckedId = checkedId;
      state.checkedId = checkedId || initialValue;
    },
    view: ({
      attrs: {
        id,
        checkedId: cid,
        newRow,
        className = 'col s12',
        label = '',
        disabled,
        description,
        options,
        isMandatory,
        required,
        checkboxClass,
        onchange: callback,
      },
    }) => {
      if (state.oldCheckedId !== cid) {
        state.oldCheckedId = state.checkedId = cid;
      }
      const { groupId, checkedId } = state;
      const onchange = (propId: string | number) => {
        state.checkedId = propId;
        if (callback) {
          callback(propId);
        }
      };

      const clear = newRow ? '.clear' : '';
      return m(`div${id ? `[id=${id}]` : ''}${clear}`, { className }, [
        m('div', { className: 'input-field options' }, m(Label, { id, label, isMandatory })),
        description ? m('p.helper-text', m.trust(description)) : '',
        ...options.map((r) =>
          m(RadioButton, {
            ...r,
            onchange,
            groupId,
            disabled,
            required,
            className: checkboxClass,
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
  view: ({ attrs: { id, groupId, label, onchange, className = 'col s12', checked, disabled, required } }) => {
    return m(
      `div`,
      { className },
      m('label', [
        m(
          `input[type=radio][tabindex=0][name=${groupId}]${checked ? '[checked=checked]' : ''}${
            disabled ? '[disabled]' : ''
          }`,
          {
            onclick: onchange ? () => onchange(id) : undefined,
            required
          }
        ),
        m('span', m.trust(label)),
      ])
    );
  },
});
