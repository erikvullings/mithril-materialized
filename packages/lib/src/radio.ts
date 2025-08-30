import m, { Attributes, Component } from 'mithril';
import { uniqueId } from './utils';
import { InputOption, OptionsList } from './option';

export interface RadioButtonsAttrs<T extends string | number> extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: InputOption<T>[];
  /** Event handler that is called when an option is changed. Optional for uncontrolled mode. */
  onchange?: (id: T) => void;
  /**
   * Currently selected id for controlled mode. If provided along with `onchange`, the component operates in controlled mode
   * where the parent manages the state. The parent must update this value in response to `onchange` callbacks.
   */
  checkedId?: T;
  /**
   * Default selected id for uncontrolled mode. Only used when `checkedId` and `onchange` are not provided.
   * The component will manage its own internal state in uncontrolled mode.
   */
  defaultCheckedId?: T;
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
export const RadioButtons = <T extends string | number>(): Component<RadioButtonsAttrs<T>> => {
  const state = {
    groupId: uniqueId(),
    componentId: '',
    internalCheckedId: undefined as T | undefined,
  };

  const isControlled = (attrs: RadioButtonsAttrs<T>) =>
    attrs.checkedId !== undefined && typeof attrs.onchange === 'function';

  return {
    oninit: ({ attrs }) => {
      state.componentId = attrs.id || uniqueId();

      // Initialize internal state for uncontrolled mode
      if (!isControlled(attrs)) {
        state.internalCheckedId = attrs.defaultCheckedId;
      }
    },
    view: ({ attrs }) => {
      const {
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
      } = attrs;
      
      const { groupId, componentId } = state;
      const controlled = isControlled(attrs);
      
      // Get current checked ID from props or internal state
      const currentCheckedId = controlled ? checkedId : state.internalCheckedId;

      const handleChange = (id: T) => {
        // Update internal state for uncontrolled mode
        if (!controlled) {
          state.internalCheckedId = id;
        }

        // Call onchange if provided
        if (onchange) {
          onchange(id);
        }
      };

      const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim() || undefined;

      const radioItems = options.map((r) => ({
        component: RadioButton<T>,
        props: {
          ...r,
          onchange: handleChange,
          groupId,
          disabled: disabled || r.disabled,
          className: checkboxClass,
          checked: r.id === currentCheckedId,
          inputId: `${componentId}-${r.id}`,
        } as RadioButtonAttrs<T>,
        key: r.id,
      }));

      const optionsContent = m(OptionsList, {
        options: radioItems,
        layout,
      });

      return m('div', { id: componentId, className: cn }, [
        label && m('h5.form-group-label', label + (isMandatory ? ' *' : '')),
        description && m('p.helper-text', m.trust(description)),
        m('form', { action: '#' }, optionsContent),
      ]);
    },
  };
};
