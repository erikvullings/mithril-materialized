import m, { Component, Attributes } from 'mithril';
import { HelperText } from './label';
import { uniqueId, getDropdownStyles } from './utils';
import { MaterialIcon } from './material-icon';

export interface DropdownItem<T extends string | number> {
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

export interface DropdownAttrs<T extends string | number> extends Attributes {
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
  items: DropdownItem<T>[];
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

interface DropdownState<T extends string | number> {
  isOpen: boolean;
  initialValue?: T;
  id: T;
  focusedIndex: number;
  inputRef?: HTMLElement | null;
  dropdownRef?: HTMLElement | null;
}

/** Pure TypeScript Dropdown component - no Materialize dependencies */
export const Dropdown = <T extends string | number>(): Component<DropdownAttrs<T>> => {
  const state: DropdownState<T> = {
    isOpen: false,
    initialValue: undefined,
    id: '' as T,
    focusedIndex: -1,
    inputRef: null,
    dropdownRef: null,
  };

  const handleKeyDown = (e: KeyboardEvent, items: DropdownItem<T>[], onchange?: (value: T) => void) => {
    const availableItems = items.filter((item) => !item.divider && !item.disabled);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = 0;
        } else {
          state.focusedIndex = Math.min(state.focusedIndex + 1, availableItems.length - 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (state.isOpen) {
          state.focusedIndex = Math.max(state.focusedIndex - 1, 0);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (state.isOpen && state.focusedIndex >= 0 && state.focusedIndex < availableItems.length) {
          const selectedItem = availableItems[state.focusedIndex];
          const value = (selectedItem.id || selectedItem.label) as T;
          state.initialValue = value;
          state.isOpen = false;
          state.focusedIndex = -1;
          if (onchange) onchange(value);
        } else if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = 0;
        }
        break;
      case 'Escape':
        e.preventDefault();
        state.isOpen = false;
        state.focusedIndex = -1;
        break;
    }
  };

  return {
    oninit: ({ attrs: { id = uniqueId(), initialValue, checkedId } }) => {
      state.id = id as T;
      state.initialValue = initialValue || checkedId;
      // Mithril will handle click events through the component structure
    },

    view: ({
      attrs: { key, label, onchange, disabled = false, items, iconName, helperText, style, className = 'col s12' },
    }) => {
      const { initialValue } = state;
      const selectedItem = initialValue
        ? items.filter((i: DropdownItem<T>) => (i.id ? i.id === initialValue : i.label === initialValue)).shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      const availableItems = items.filter((item) => !item.divider && !item.disabled);

      return m('.dropdown-wrapper.input-field', { className, key, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          '.select-wrapper',
          {
            onclick: disabled
              ? undefined
              : () => {
                  state.isOpen = !state.isOpen;
                  state.focusedIndex = state.isOpen ? 0 : -1;
                },
            onkeydown: disabled ? undefined : (e: KeyboardEvent) => handleKeyDown(e, items, onchange),
            tabindex: disabled ? -1 : 0,
            'aria-expanded': state.isOpen ? 'true' : 'false',
            'aria-haspopup': 'listbox',
            role: 'combobox',
          },
          [
            m('input[type=text][readonly=true].select-dropdown.dropdown-trigger', {
              id: state.id,
              value: title,
              oncreate: ({ dom }) => {
                state.inputRef = dom as HTMLElement;
              },
              onclick: (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                if (!disabled) {
                  state.isOpen = !state.isOpen;
                  state.focusedIndex = state.isOpen ? 0 : -1;
                }
              },
            }),
            // Dropdown Menu using Select component's positioning logic
            state.isOpen &&
              m(
                'ul.dropdown-content.select-dropdown',
                {
                  tabindex: 0,
                  role: 'listbox',
                  'aria-labelledby': state.id,
                  oncreate: ({ dom }) => {
                    state.dropdownRef = dom as HTMLElement;
                  },
                  onremove: () => {
                    state.dropdownRef = null;
                  },
                  style: getDropdownStyles(
                    state.inputRef,
                    true,
                    items.map((item) => ({
                      ...item,
                      // Convert dropdown items to format expected by getDropdownStyles
                      group: undefined, // Dropdown doesn't use groups
                    })),
                    true
                  ),
                },
                items.map((item, index) => {
                  if (item.divider) {
                    return m('li.divider', {
                      key: `divider-${index}`,
                    });
                  }

                  const itemIndex = availableItems.indexOf(item);
                  const isFocused = itemIndex === state.focusedIndex;

                  return m(
                    'li',
                    {
                      key: item.id || `item-${index}`,
                      class: [
                        item.disabled ? 'disabled' : '',
                        isFocused ? 'focused' : '',
                        selectedItem?.id === item.id || selectedItem?.label === item.label ? 'selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' '),
                      ...(item.disabled
                        ? {}
                        : {
                            onclick: (e: MouseEvent) => {
                              e.stopPropagation();
                              const value = (item.id || item.label) as T;
                              state.initialValue = value;
                              state.isOpen = false;
                              state.focusedIndex = -1;
                              if (onchange) onchange(value);
                            },
                          }),
                    },
                    m(
                      'span',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          padding: '14px 16px',
                        },
                      },
                      [
                        item.iconName
                          ? m(
                              'i.material-icons',
                              {
                                style: { marginRight: '32px' },
                              },
                              item.iconName
                            )
                          : undefined,
                        item.label,
                      ]
                    )
                  );
                })
              ),
            m(MaterialIcon, {
              name: 'caret',
              direction: 'down',
              class: 'caret',
            }),
          ]
        ),
      ]);
    },
  };
};
