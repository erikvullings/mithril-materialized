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
  /** Currently selected item id. This property controls the component state and should be updated externally to change selection programmatically. */
  checkedId?: T;
  /** When a value or name is selected */
  onchange?: (value: T) => void;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
}

interface DropdownState {
  isOpen: boolean;
  id: string;
  focusedIndex: number;
  inputRef?: HTMLElement | null;
  dropdownRef?: HTMLElement | null;
}

/** Pure TypeScript Dropdown component - no Materialize dependencies */
export const Dropdown = <T extends string | number>(): Component<DropdownAttrs<T>> => {
  const state: DropdownState = {
    isOpen: false,
    id: '',
    focusedIndex: -1,
    inputRef: null,
    dropdownRef: null,
  };

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('.dropdown-wrapper.input-field')) {
      state.isOpen = false;
      m.redraw();
    }
  };

  const handleKeyDown = (e: KeyboardEvent, items: DropdownItem<T>[], onchange?: (value: T) => void) => {
    const availableItems = items.filter((item) => !item.divider && !item.disabled);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = availableItems.length > 0 ? 0 : -1;
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
          state.isOpen = false;
          state.focusedIndex = -1;
          if (onchange) onchange(value);
        } else if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = availableItems.length > 0 ? 0 : -1;
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
    oninit: ({ attrs }) => {
      state.id = attrs.id?.toString() || uniqueId();
      // Add global click listener to close dropdown
      document.addEventListener('click', closeDropdown);
    },

    onremove: () => {
      // Cleanup global listener
      document.removeEventListener('click', closeDropdown);
    },

    view: ({
      attrs: {
        checkedId,
        key,
        label,
        onchange,
        disabled = false,
        items,
        iconName,
        helperText,
        style,
        className = 'col s12',
      },
    }) => {
      const selectedItem = checkedId
        ? items.filter((i: DropdownItem<T>) => (i.id ? i.id === checkedId : i.label === checkedId)).shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      console.log({ title });
      const availableItems = items.filter((item) => !item.divider && !item.disabled);

      return m('.dropdown-wrapper.input-field', { className, key, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          '.select-wrapper',
          {
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
                  // Reset focus index when opening/closing
                  state.focusedIndex = -1;
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
                  style: getDropdownStyles(state.inputRef, true, items, true),
                },
                items.map((item) => {
                  if (item.divider) {
                    return m('li.divider');
                  }

                  const itemIndex = availableItems.indexOf(item);
                  const isFocused = itemIndex === state.focusedIndex;

                  const className =
                    [
                      item.disabled ? 'disabled' : '',
                      isFocused ? 'focused' : '',
                      selectedItem?.id === item.id || selectedItem?.label === item.label ? 'selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ') || undefined;
                  return m(
                    'li',
                    {
                      className,
                      onclick: item.disabled
                        ? undefined
                        : () => {
                            const value = (item.id || item.label) as T;
                            state.isOpen = false;
                            state.focusedIndex = -1;
                            if (onchange) onchange(value);
                          },
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
