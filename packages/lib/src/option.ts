import m, { Vnode, FactoryComponent, Attributes, Component } from 'mithril';
import { HelperText } from './label';
import { uniqueId } from './utils';

export interface InputCheckboxAttrs extends Attributes {
  /** Optional event handler when a checkbox is clicked */
  onchange?: (checked: boolean) => void;
  /** Label of the checkbox, can be a string or Vnode */
  label?: string | Vnode<any, any>;
  /** If true, the checkbox is checked */
  checked?: boolean;
  /** If true, the checkbox is disabled */
  disabled?: boolean;
  /** Optional input id for the checkbox */
  inputId?: string;
}

/** Component to show a check box */
export const InputCheckbox: FactoryComponent<InputCheckboxAttrs> = () => {
  let checkboxId: string | undefined;

  return {
    view: ({ attrs: { className = 'col s12', onchange, label, checked, disabled, description, style, inputId } }) => {
      if (!checkboxId) checkboxId = inputId || uniqueId();
      return m(
        `p`,
        { className, style },
        m('label', { for: checkboxId }, [
          m('input[type=checkbox][tabindex=0]', {
            className: disabled ? 'disabled' : undefined,
            id: checkboxId,
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

export interface InputOption<T extends string | number> {
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

export interface OptionsAttrs<T extends string | number> extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: InputOption<T>[];
  /** Event handler that is called when an option is changed */
  onchange?: (checkedIds: T[]) => void;
  /** Currently selected ids. This property controls the component state and should be updated externally to change selection programmatically. */
  checkedId?: T | T[];
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
  /** Layout for the options: 'vertical' (default) or 'horizontal' */
  layout?: 'vertical' | 'horizontal';
  /** If true, show select all/none buttons */
  showSelectAll?: boolean;
  /** Text for select all button */
  selectAllText?: string;
  /** Text for select none button */
  selectNoneText?: string;
}

/** Reusable layout component for rendering options horizontally or vertically */
export const OptionsList: Component<{
  options: Array<{ component: any; props: any; key: string | number }>;
  layout: 'vertical' | 'horizontal';
}> = {
  view: ({ attrs: { options, layout } }) => {
    const optionElements = options.map(({ component, props, key }) => 
      m(component, { ...props, key })
    );
    
    return layout === 'horizontal'
      ? m('div.grid-container', optionElements)
      : optionElements;
  },
};

/** A list of checkboxes */
export const Options = <T extends string | number>(): Component<OptionsAttrs<T>> => {
  const state = {
    componentId: '',
  };

  const selectAll = (options: InputOption<T>[], onchange?: (checkedIds: T[]) => void) => {
    const allIds = options.map((option) => option.id);
    onchange && onchange(allIds);
  };

  const selectNone = (onchange?: (checkedIds: T[]) => void) => {
    onchange && onchange([]);
  };

  const handleChange = (propId: T, checked: boolean, checkedIds: T[], onchange?: (checkedIds: T[]) => void) => {
    const newCheckedIds = checkedIds.filter((i) => i !== propId);
    if (checked) {
      newCheckedIds.push(propId);
    }
    onchange && onchange(newCheckedIds);
  };

  return {
    oninit: ({ attrs }) => {
      state.componentId = attrs.id || uniqueId();
    },
    view: ({
      attrs: {
        checkedId,
        label,
        options,
        description,
        className = 'col s12',
        style,
        disabled,
        checkboxClass,
        newRow,
        isMandatory,
        layout = 'vertical',
        showSelectAll = false,
        selectAllText = 'Select All',
        selectNoneText = 'Select None',
        onchange,
      },
    }) => {
      // Derive checked IDs from props
      const checkedIds = checkedId !== undefined ? (Array.isArray(checkedId) ? checkedId : [checkedId]) : [];

      const isChecked = (id: T) => checkedIds.includes(id);

      const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim() || undefined;

      const optionItems = options.map((option) => ({
        component: InputCheckbox,
        props: {
          disabled: disabled || option.disabled,
          label: option.label,
          onchange: onchange ? (v: boolean) => handleChange(option.id, v, checkedIds, onchange) : undefined,
          className: option.className || checkboxClass,
          checked: isChecked(option.id),
          description: option.description,
          inputId: `${state.componentId}-${option.id}`,
        },
        key: option.id,
      }));

      const optionsContent = m(OptionsList, {
        options: optionItems,
        layout,
      });

      return m('div', { id: state.componentId, className: cn, style }, [
        label && m('h5.form-group-label', label + (isMandatory ? ' *' : '')),
        showSelectAll &&
          m('div.select-all-controls', { style: { marginBottom: '10px' } }, [
            m(
              'a',
              {
                href: '#',
                onclick: (e: Event) => {
                  e.preventDefault();
                  selectAll(options, onchange);
                },
                style: { marginRight: '15px' },
              },
              selectAllText
            ),
            m(
              'a',
              {
                href: '#',
                onclick: (e: Event) => {
                  e.preventDefault();
                  selectNone(onchange);
                },
              },
              selectNoneText
            ),
          ]),
        description && m(HelperText, { helperText: description }),
        m('form', { action: '#' }, optionsContent),
      ]);
    },
  };
};
