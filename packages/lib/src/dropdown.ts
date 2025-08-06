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

export interface IDropdownOptions<T extends string | number> extends Attributes {
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

interface IDropdownState<T extends string | number> {
  isOpen: boolean;
  initialValue?: T;
  id: T;
  focusedIndex: number;
}

/** Pure TypeScript Dropdown component - no Materialize dependencies */
export const Dropdown = <T extends string | number>(): Component<IDropdownOptions<T>> => {
  const state: IDropdownState<T> = {
    isOpen: false,
    initialValue: undefined,
    id: '' as T,
    focusedIndex: -1
  };

  const handleKeyDown = (e: KeyboardEvent, items: IDropdownOption<T>[], onchange?: (value: T) => void) => {
    const availableItems = items.filter(item => !item.divider && !item.disabled);
    
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

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('.dropdown-wrapper')) {
      state.isOpen = false;
      state.focusedIndex = -1;
    }
  };

  return {
    oninit: ({ attrs: { id = uniqueId(), initialValue, checkedId } }) => {
      state.id = id as T;
      state.initialValue = initialValue || checkedId;
      document.addEventListener('click', handleClickOutside);
    },

    onremove: () => {
      document.removeEventListener('click', handleClickOutside);
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
        className = 'col s12'
      },
    }) => {
      const { id, initialValue } = state;
      const selectedItem = initialValue
        ? items.filter((i: IDropdownOption<T>) => (i.id ? i.id === initialValue : i.label === initialValue)).shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      const availableItems = items.filter(item => !item.divider && !item.disabled);

      return m('.dropdown-wrapper.input-field', { className, key, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          'button.dropdown-trigger.btn.truncate',
          {
            id: `${id}-trigger`,
            disabled,
            className: 'col s12',
            style: style || (iconName ? 'margin: 0.2em 0 0 3em;' : undefined),
            onclick: () => {
              if (!disabled) {
                state.isOpen = !state.isOpen;
                state.focusedIndex = state.isOpen ? 0 : -1;
              }
            },
            onkeydown: (e: KeyboardEvent) => {
              if (!disabled) {
                handleKeyDown(e, items, onchange);
              }
            },
            'aria-haspopup': 'listbox',
            'aria-expanded': state.isOpen ? 'true' : 'false',
            'aria-controls': id,
            tabindex: disabled ? -1 : 0
          },
          [
            title,
            m('i.material-icons.right', 'arrow_drop_down')
          ]
        ),
        state.isOpen && m(
          'ul.dropdown-content.active',
          { 
            id,
            role: 'listbox',
            'aria-labelledby': `${id}-trigger`,
            style: {
              display: 'block',
              opacity: 1,
              position: 'absolute',
              zIndex: 1000,
              width: '100%',
              top: '100%',
              left: 0,
              backgroundColor: 'white',
              boxShadow: '0 2px 5px rgba(0,0,0,0.16), 0 2px 10px rgba(0,0,0,0.12)',
              borderRadius: '2px',
              maxHeight: '200px',
              overflowY: 'auto'
            }
          },
          items.map((item, index) => {
            if (item.divider) {
              return m('li.divider', { 
                key: `divider-${index}`,
                style: {
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  margin: '5px 0'
                }
              });
            }

            const itemIndex = availableItems.indexOf(item);
            const isFocused = itemIndex === state.focusedIndex;
            
            return m(
              'li',
              {
                key: item.id || `item-${index}`,
                tabindex: -1,
                className: [
                  item.disabled ? 'disabled' : '',
                  isFocused ? 'focused' : ''
                ].filter(Boolean).join(' '),
                style: {
                  backgroundColor: isFocused ? '#f5f5f5' : 'transparent',
                  cursor: item.disabled ? 'not-allowed' : 'pointer'
                },
                role: 'option',
                'aria-selected': selectedItem?.id === item.id || selectedItem?.label === item.label
              },
              m(
                'a',
                {
                  onclick: !item.disabled && onchange ? (e: Event) => {
                    e.preventDefault();
                    const value = (item.id || item.label) as T;
                    state.initialValue = value;
                    state.isOpen = false;
                    state.focusedIndex = -1;
                    onchange(value);
                  } : undefined,
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 16px',
                    color: item.disabled ? '#9e9e9e' : '#212121',
                    textDecoration: 'none'
                  }
                },
                [
                  item.iconName ? m('i.material-icons', { 
                    style: { marginRight: '32px' } 
                  }, item.iconName) : undefined, 
                  item.label
                ]
              )
            );
          })
        )
      ]);
    },
  };
};
