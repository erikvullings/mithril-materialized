import m, { Component, Attributes } from 'mithril';
import { HelperText } from './label';

export interface IDropdownOption<T> {
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

export interface IDropdownOptions<T> extends Partial<M.DropdownOptions>, Attributes {
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
  key?: string;
  /** Item array to show in the dropdown. If the value is not supplied, uses he name. */
  items: Array<IDropdownOption<T>>;
  /** Selected value or name */
  checkedId?: T;
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
  const state = {
    checkedId: undefined as T | undefined,
  };
  return {
    view: ({ attrs }) => {
      const id = attrs.id || 'dropdown';
      const {
        key,
        label,
        onchange,
        items,
        checkedId = state.checkedId,
        iconName,
        helperText,
        className = 'col s12',
      } = attrs;
      const selectedItem = checkedId
        ? items
            .filter((i: IDropdownOption<T>) => (i.id ? i.id === checkedId : i.label === checkedId))
            .shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      return m('.input-field', { className, key }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          `a.dropdown-trigger.btn[href=#][data-target=${id}]`,
          {
            class: 'col s12',
            style: attrs.style || (iconName ? 'margin: 0.2em 0 0 3em;' : undefined),
            oncreate: ({ dom }) => {
              M.Dropdown.init(dom, attrs);
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
                            state.checkedId = i.id || i.label as T;
                            onchange(i.id || i.label as T);
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
