import m, { Vnode, FactoryComponent, Attributes, Component } from 'mithril';
import { HelperText } from './label';
import { uniqueId } from './utils';

export interface IInputCheckbox extends Attributes {
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
export const InputCheckbox: FactoryComponent<IInputCheckbox> = () => {
  return {
    view: ({ attrs: { className = 'col s12', onchange, label, checked, disabled, description, style, inputId } }) => {
      const checkboxId = inputId || uniqueId();
      return m(
        `p`,
        { className, style },
        m('label', { for: checkboxId }, [
          m('input[type=checkbox][tabindex=0]', {
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

export interface IInputOption<T extends string | number> {
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

export interface IOptions<T extends string | number> extends Attributes {
  /** Element ID */
  id?: string;
  /** Optional title or label */
  label?: string;
  /** The options that you have */
  options: IInputOption<T>[];
  /** Event handler that is called when an option is changed */
  onchange?: (checkedId: T[]) => void;
  /**
   * Selected id or ids (in case of multiple options)
   * @deprecated Please use initialValue instead
   */
  checkedId?: T | T[];
  /** Selected id or ids (in case of multiple options) */
  initialValue?: T | T[];
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
}

/** A list of checkboxes */
export const Options = <T extends string | number>(): Component<IOptions<T>> => {
  const state = {} as {
    checkedId?: T | T[];
    checkedIds: T[];
    componentId: string;
  };

  const isChecked = (id: T) => state.checkedIds.indexOf(id) >= 0;

  const selectAll = (options: IInputOption<T>[], callback?: (checkedId: T[]) => void) => {
    const allIds = options.map(option => option.id);
    state.checkedIds = [...allIds];
    if (callback) callback(allIds);
  };

  const selectNone = (callback?: (checkedId: T[]) => void) => {
    state.checkedIds = [];
    if (callback) callback([]);
  };

  return {
    oninit: ({ attrs: { initialValue, checkedId, id } }) => {
      const iv = checkedId || initialValue;
      state.checkedId = checkedId;
      state.checkedIds = iv ? (iv instanceof Array ? [...iv] : [iv]) : [];
      state.componentId = id || uniqueId();
    },
    view: ({
      attrs: {
        label,
        options,
        checkedId,
        description,
        className = 'col s12',
        style,
        disabled,
        checkboxClass,
        newRow,
        isMandatory,
        layout = 'vertical',
        showSelectAll = false,
        onchange: callback,
      },
    }) => {
      if (checkedId && state.checkedId !== checkedId) {
        state.checkedId = checkedId;
        state.checkedIds = checkedId instanceof Array ? checkedId : [checkedId];
      }
      const onchange = callback
        ? (propId: T, checked: boolean) => {
            const checkedIds = state.checkedIds.filter((i) => i !== propId);
            if (checked) {
              checkedIds.push(propId);
            }
            state.checkedIds = checkedIds;
            callback(checkedIds);
          }
        : undefined;
      const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      
      const optionsContent = layout === 'horizontal' 
        ? m('div.grid-container', 
            options.map((option) =>
              m(InputCheckbox, {
                disabled: disabled || option.disabled,
                label: option.label,
                onchange: onchange ? (v: boolean) => onchange(option.id, v) : undefined,
                className: option.className || checkboxClass,
                checked: isChecked(option.id),
                description: option.description,
                inputId: `${state.componentId}-${option.id}`,
              })
            )
          )
        : options.map((option) =>
            m(InputCheckbox, {
              disabled: disabled || option.disabled,
              label: option.label,
              onchange: onchange ? (v: boolean) => onchange(option.id, v) : undefined,
              className: option.className || checkboxClass,
              checked: isChecked(option.id),
              description: option.description,
              inputId: `${state.componentId}-${option.id}`,
            })
          );

      return m('div', { id: state.componentId, className: cn, style }, [
        label && m('h5.form-group-label', label + (isMandatory ? ' *' : '')),
        showSelectAll && m('div.select-all-controls', { style: 'margin-bottom: 10px;' }, [
          m('a', { 
            href: '#', 
            onclick: (e: Event) => { e.preventDefault(); selectAll(options, callback); },
            style: 'margin-right: 15px;'
          }, 'Select All'),
          m('a', { 
            href: '#', 
            onclick: (e: Event) => { e.preventDefault(); selectNone(callback); }
          }, 'Select None'),
        ]),
        description && m(HelperText, { helperText: description }),
        m('form', { action: '#' }, optionsContent),
      ]);
    },
  };
};
