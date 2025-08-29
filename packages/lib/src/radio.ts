import m, { Attributes, Component } from 'mithril';
import { uniqueId } from './utils';
import { InputOption } from './option';

export interface RadioButtonsAttrs<T extends string | number> extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: InputOption<T>[];
  /** Event handler that is called when an option is changed */
  onchange: (id: T) => void;
  /** Currently selected id. This property controls the component state and should be updated externally to change selection programmatically. */
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
  /** Layout for the options: 'vertical' (default) or 'horizontal' */
  layout?: 'vertical' | 'horizontal';
}

export interface RadioButtonAttrs<T extends string | number> extends Attributes {
  id: T;
  checked?: boolean;
  onchange: (id: T) => void;
  label: string;
  groupId: string;
  disabled?: boolean;
  /** Optional input id for the radio button */
  inputId?: string;
}

export const RadioButton = <T extends string | number>(): Component<RadioButtonAttrs<T>> => ({
  view: ({ attrs: { id, groupId, label, onchange, className = 'col s12', checked, disabled, inputId } }) => {
    const radioId = inputId || `${groupId}-${id}`;
    return m(
      'p',
      { className },
      m('label', { for: radioId }, [
        m('input[type=radio][tabindex=0]', {
          id: radioId,
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
export const RadioButtons = <T extends string | number>(): Component<RadioButtonsAttrs<T>> => {
  const state = {
    groupId: uniqueId(),
    componentId: '',
  };
  return {
    oninit: ({ attrs }) => {
      state.componentId = attrs.id || uniqueId();
    },
    view: ({
      attrs: {
        checkedId,
        newRow,
        className = 'col s12',
        label = '',
        disabled,
        description,
        options,
        isMandatory,
        checkboxClass,
        layout = 'vertical',
        onchange,
      },
    }) => {
      const { groupId, componentId } = state;

      const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim() || undefined;

      const optionsContent =
        layout === 'horizontal'
          ? m(
              'div.grid-container',
              options.map((r) =>
                m(RadioButton, {
                  ...r,
                  onchange,
                  groupId,
                  disabled: disabled || r.disabled,
                  className: checkboxClass,
                  checked: r.id === checkedId,
                  inputId: `${componentId}-${r.id}`,
                } as RadioButtonAttrs<T>)
              )
            )
          : options.map((r) =>
              m(RadioButton, {
                ...r,
                onchange,
                groupId,
                disabled: disabled || r.disabled,
                className: checkboxClass,
                checked: r.id === checkedId,
                inputId: `${componentId}-${r.id}`,
              } as RadioButtonAttrs<T>)
            );

      return m('div', { id: componentId, className: cn }, [
        label && m('h5.form-group-label', label + (isMandatory ? ' *' : '')),
        description && m('p.helper-text', m.trust(description)),
        m('form', { action: '#' }, optionsContent),
      ]);
    },
  };
};
