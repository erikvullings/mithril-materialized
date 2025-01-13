import m, { Attributes, Component } from 'mithril';
import { uniqueId } from './utils';
import { IInputOption } from './option';
import { Label } from './label';

export interface IRadioButtons<T extends string | number> extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption<T>[];
  /** Event handler that is called when an option is changed */
  onchange: (id: T) => void;
  /** Selected id (in oninit lifecycle) */
  initialValue?: T;
  /** Selected id (in oninit and onupdate lifecycle) */
  checkedId?: T;
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

export interface IRadioButton<T extends string | number> extends Attributes {
  id: T;
  checked?: boolean;
  onchange: (id: T) => void;
  label: string;
  groupId: string;
  disabled?: boolean;
}

export const RadioButton = <T extends string | number>(): Component<IRadioButton<T>> => ({
  view: ({ attrs: { id, groupId, label, onchange, className = 'col s12', checked, disabled } }) => {
    return m(
      'div',
      { className },
      m('label', [
        m('input[type=radio][tabindex=0]', {
          name: groupId,
          disabled,
          checked,
          onclick: onchange ? () => onchange(id) : undefined,
        }),
        m('span', m.trust(label)),
      ])
    );
  },
});

/** Component to show a list of radio buttons, from which you can choose one. */
// export const RadioButtons: FactoryComponent<IRadioButtons<T>> = () => {
export const RadioButtons = <T extends string | number>(): Component<IRadioButtons<T>> => {
  const state = { groupId: uniqueId() } as {
    groupId: string;
    oldCheckedId?: T;
    checkedId?: T;
    onchange: (id: T) => void;
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
        checkboxClass,
        onchange: callback,
      },
    }) => {
      if (state.oldCheckedId !== cid) {
        state.oldCheckedId = state.checkedId = cid;
      }
      const { groupId, checkedId } = state;
      const onchange = (propId: T) => {
        state.checkedId = propId;
        if (callback) {
          callback(propId);
        }
      };

      if (newRow) className += ' clear';
      return m('div', { id, className }, [
        m('div', { className: 'input-field options' }, m(Label, { id, label, isMandatory })),
        description ? m('p.helper-text', m.trust(description)) : '',
        ...options.map((r) =>
          m(RadioButton, {
            ...r,
            onchange,
            groupId,
            disabled,
            className: checkboxClass,
            checked: r.id === checkedId,
          } as IRadioButton<T>)
        ),
      ]);
    },
  };
};
