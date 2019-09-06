import m, { Component, Attributes } from 'mithril';
import { HelperText } from './label';
import { uniqueId } from './utils';

export interface IDropdownOption {
  /** ID property of the selected item */
  id?: string | number;
  /** Label to show in the dropdown */
  label: string;
  /** Can we select the item */
  disabled?: boolean;
  /** Display a Materials Icon in front of the label */
  iconName?: string;
  /** Add a divider */
  divider?: boolean;
}

export interface IDropdownOptions extends Partial<M.DropdownOptions>, Attributes {
  /**
   * Optional id of the dropdown element
   * @default 'dropdown'
   */
  id?: string;
  /**
   * Optional label when no item is selected
   * @default 'Select'
   */
  label?: string;
  key?: string | number;
  /** If true, disable the selection */
  disabled?: boolean;
  /** Item array to show in the dropdown. If the value is not supplied, uses he name. */
  items: IDropdownOption[];
  /**
   * Selected value or name
   * @deprecated Use initialValue instead
   */
  checkedId?: string | number;
   /** Selected value or name */
  initialValue?: string | number;
  /** When a value or name is selected */
  onchange?: (value: string | number) => void;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
}

/** Dropdown component */
export const Dropdown = (): Component<IDropdownOptions> => {
// export const Dropdown: FactoryComponent<IDropdownOptions> = () => {
  const state = {} as {
    initialValue?: string | number;
    id: string;
  };
  return {
    oninit: ({ attrs: { id = uniqueId(), initialValue, checkedId }}) => {
      state.id = id;
      state.initialValue = initialValue || checkedId;
    },
    view: ({ attrs: {
      key,
      label,
      onchange,
      disabled = false,
      items,
      iconName,
      helperText,
      style,
      className = 'col s12',
      ...props
    } }) => {
      const { id, initialValue } = state;
      const selectedItem = initialValue
        ? items
            .filter((i: IDropdownOption) => (i.id ? i.id === initialValue : i.label === initialValue))
            .shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      return m('.input-field', { className, key, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          `a.dropdown-trigger.btn.truncate[href=#][data-target=${id}]${disabled ? '[disabled]' : ''}`,
          {
            className: 'col s12',
            style: style || (iconName ? 'margin: 0.2em 0 0 3em;' : undefined),
            oncreate: ({ dom }) => {
              M.Dropdown.init(dom, props);
            },
          },
          title
        ),
        m(
          `ul.dropdown-content[id=${id}]`,
          items.map(i =>
            m(
              `li${i.divider ? '.divider[tabindex=-1]' : ''}`,
              i.divider
                ? undefined
                : m(
                    'a',
                    {
                      onclick: onchange
                        ? () => {
                            state.initialValue = i.id || i.label;
                            onchange(state.initialValue);
                          }
                        : undefined,
                    },
                    [i.iconName ? m('i.material-icons', i.iconName) : undefined, i.label]
                  )
            )
          )
        ),
      ]);
    },
  };
};
