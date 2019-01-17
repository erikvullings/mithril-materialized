import m, { FactoryComponent, Attributes } from 'mithril';

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
  key?: string;
  /** Item array to show in the dropdown. If the value is not supplied, uses he name. */
  items: Array<{ name: string; value?: string | number }>;
  /** Selected value or name */
  selected?: string | number;
  /** When a value or name is selected */
  onchange?: (value: string | number) => void;
}

/** Dropdown component */
export const Dropdown: FactoryComponent<IDropdownOptions> = () => {
  return {
    view: ({ attrs }) => {
      const id = attrs.id || 'dropdown';
      const { key, label, onchange, items, selected } = attrs;
      const selectedItem = attrs.selected
        ? items.filter(i => (i.value ? i.value === selected : i.name === selected)).shift()
        : undefined;
      const title = selectedItem ? selectedItem.name : label || 'Select';
      return m('div', { key }, [
        m(
          `a.dropdown-trigger.btn[href=#][data-target=${id}]`,
          {
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
              'li',
              m(
                'a',
                {
                  onclick: onchange ? () => onchange(i.value || i.name) : undefined,
                },
                i.name
              )
            )
          )
        ),
      ]);
    },
  };
};
