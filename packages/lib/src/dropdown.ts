import m, { Component, Attributes } from 'mithril';
import { HelperText } from './label';
import { uniqueId } from './utils';

export interface IDropdownOption<T extends string | number> {
  /** ID property of the selected item */
  id?: T;
  /** Label to show in the dropdown */
  label: string;
  /** Can we select the item */
  disabled?: boolean;
  /** Display a Materials Icon in front of the label */
  iconName?: string;
  /** Add a divider */
  divider?: boolean;
}

export interface IDropdownOptions<T extends string | number> extends Partial<M.DropdownOptions>, Attributes {
  /**
   * Optional id of the dropdown element
   * @default 'dropdown'
   */
  id?: T;
  /**
   * Optional label when no item is selected
   * @default 'Select'
   */
  label?: string;
  key?: string | number;
  /** If true, disable the selection */
  disabled?: boolean;
  /** Item array to show in the dropdown. If the value is not supplied, uses he name. */
  items: IDropdownOption<T>[];
  /**
   * Selected value or name
   * @deprecated Use initialValue instead
   */
  checkedId?: T;
  /** Selected value or name */
  initialValue?: T;
  /** When a value or name is selected */
  onchange?: (value: T) => void;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
}

/** Dropdown component */
export const Dropdown = <T extends string | number>(): Component<IDropdownOptions<T>> => {
  // export const Dropdown: FactoryComponent<IDropdownOptions> = () => {
  const state = {} as {
    initialValue?: T;
    id: T;
  };
  return {
    oninit: ({ attrs: { id = uniqueId(), initialValue, checkedId } }) => {
      state.id = id as T;
      state.initialValue = initialValue || checkedId;
    },
    view: ({
      attrs: {
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
      },
    }) => {
      const { id, initialValue } = state;
      const selectedItem = initialValue
        ? items.filter((i: IDropdownOption<T>) => (i.id ? i.id === initialValue : i.label === initialValue)).shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      return m('.input-field', { className, key, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          'a.dropdown-trigger.btn.truncate[href=#]',
          {
            'data-target': id,
            disabled,
            className: 'col s12',
            style: style || (iconName ? 'margin: 0.2em 0 0 3em;' : undefined),
            oncreate: ({ dom }) => {
              M.Dropdown.init(dom, props);
            },
          },
          title
        ),
        m(
          'ul.dropdown-content',
          { id },
          items.map((i) =>
            m(
              'li[tabindex=-1]',
              {
                className: i.divider ? 'divider' : '',
              },
              i.divider
                ? undefined
                : m(
                    'a',
                    {
                      onclick: onchange
                        ? () => {
                            state.initialValue = (i.id || i.label) as T;
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
