import m, { FactoryComponent, Attributes } from 'mithril';
import { HelperText, ISelectOption } from '.';

export interface IDropdownOption<T extends string | number> extends ISelectOption {
  id?: T;
  iconName?: string;
  divider?: boolean;
}

export interface IDropdownOptions<T extends string | number> extends Partial<M.DropdownOptions>, Attributes {
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
  /** Classes that you wish to attach to the content, e.g. "col s12 m6 l4 xl3" to specify the size. */
  contentClass?: string;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
}

/** Dropdown component */
export const Dropdown: FactoryComponent<IDropdownOptions<string | number>> = () => {
  const state = {
    checkedId: '' as string | number,
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
        contentClass = 'col s12',
      } = attrs;
      const selectedItem = checkedId
        ? items
            .filter((i: IDropdownOption<string | number>) => (i.id ? i.id === checkedId : i.label === checkedId))
            .shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      return m('.input-field', { class: contentClass, key }, [
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
          items.map((i: IDropdownOption<string | number>) =>
            m(
              `li${i.divider ? '.divider[tabindex=-1]' : ''}`,
              i.divider
                ? undefined
                : m(
                    'a',
                    {
                      onclick: onchange
                        ? () => {
                            state.checkedId = i.id || i.label;
                            onchange(i.id || i.label);
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
