import m, { Attributes, Component } from 'mithril';
import { Label, HelperText } from './label';
import { IInputOption } from './option';

export interface ISelectV2Options<T extends string | number> extends Attributes {
  /** Options to select from */
  options: IInputOption<T>[];
  /** Called when the value is changed, either contains a single or all selected (checked) ids */
  onchange: (checkedIds: T[]) => void;
  /**
   * Selected id or ids (in case of multiple options). Processed in the oninit and onupdate lifecycle.
   * When the checkedId property changes (using a shallow compare), the selections are updated accordingly.
   */
  checkedId?: T | T[];
  /** Selected id or ids (in case of multiple options). Only processed in the oninit lifecycle. */
  initialValue?: T | T[];
  /** Select a single option or multiple options */
  multiple?: boolean;
  /** Optional label. */
  label?: string;
  /** Optional ID. */
  id?: string;
  /** Unique key for use of the element in an array. */
  key?: string | number;
  /** Add a a placeholder to the input field. */
  placeholder?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Sets the input field to disabled. */
  disabled?: boolean;
  /** Optional style information. */
  style?: string;
  /** If true, break to a new row */
  newRow?: boolean;
  /**
   * If true, add a mandatory * after the label (if any),
   * and add the required and aria-required attributes to the input element.
   */
  isMandatory?: boolean;
  /** Add the required and aria-required attributes to the input element */
  required?: boolean;
  /** Enable the clear icon */
  showClearButton?: boolean;
}

interface ISelectState<T extends string | number> {
  isOpen: boolean;
  selectedIds: T[];
  focusedIndex: number;
}

/** CSS-only Select component - no Materialize dependencies */
export const SelectV2 = <T extends string | number>(): Component<ISelectV2Options<T>> => {
  const state: ISelectState<T> = {
    isOpen: false,
    selectedIds: [],
    focusedIndex: -1
  };

  const isSelected = (id: T, selectedIds: T[]) => {
    return selectedIds.some(selectedId => selectedId === id);
  };

  const toggleOption = (id: T, multiple: boolean, attrs: ISelectV2Options<T>) => {
    if (multiple) {
      const newIds = isSelected(id, state.selectedIds)
        ? state.selectedIds.filter(selectedId => selectedId !== id)
        : [...state.selectedIds, id];
      state.selectedIds = newIds;
      attrs.onchange(newIds);
      // Keep dropdown open for multiple select
    } else {
      state.selectedIds = [id];
      state.isOpen = false;
      attrs.onchange([id]);
    }
    m.redraw();
  };

  const handleKeyDown = (e: KeyboardEvent, attrs: ISelectV2Options<T>) => {
    const { options } = attrs;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = 0;
        } else {
          state.focusedIndex = Math.min(state.focusedIndex + 1, options.length - 1);
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
        if (state.isOpen && state.focusedIndex >= 0 && state.focusedIndex < options.length) {
          const option = options[state.focusedIndex];
          if (option && !option.disabled) {
            toggleOption(option.id, attrs.multiple || false, attrs);
          }
        } else if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = 0; // Set focus to first option when opening
        }
        break;
      case 'Escape':
        e.preventDefault();
        state.isOpen = false;
        state.focusedIndex = -1;
        break;
    }
    m.redraw();
  };

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('.select-wrapper')) {
      state.isOpen = false;
      m.redraw();
    }
  };

  return {
    oninit: ({ attrs }) => {
      const { checkedId, initialValue } = attrs;
      const iv = checkedId || initialValue;
      
      if (iv !== null && typeof iv !== 'undefined') {
        if (iv instanceof Array) {
          state.selectedIds = [...iv];
        } else {
          state.selectedIds = [iv];
        }
      }

      // Add global click listener to close dropdown
      document.addEventListener('click', closeDropdown);
    },

    onremove: () => {
      // Cleanup global listener
      document.removeEventListener('click', closeDropdown);
    },

    onupdate: ({ attrs }) => {
      const { checkedId } = attrs;
      
      // Sync external checkedId prop with internal state
      if (checkedId !== undefined) {
        const newIds = checkedId instanceof Array ? checkedId : [checkedId];
        if (JSON.stringify(newIds) !== JSON.stringify(state.selectedIds)) {
          state.selectedIds = newIds;
        }
      }
    },

    view: ({ attrs }) => {
      const {
        newRow,
        className = 'col s12',
        key,
        options,
        multiple,
        label,
        helperText,
        placeholder = '',
        isMandatory,
        iconName,
        disabled,
        style
      } = attrs;

      const finalClassName = newRow ? `${className} clear` : className;
      const hasValue = state.selectedIds.length > 0;
      const wrapperClasses = [
        'select-wrapper',
        'input-field',
        hasValue ? 'has-value' : '',
        state.isOpen ? 'focused' : '',
        disabled ? 'disabled' : ''
      ].filter(Boolean).join(' ');

      const selectedOptions = options.filter(opt => isSelected(opt.id, state.selectedIds));
      const displayText = selectedOptions.length > 0 
        ? selectedOptions.map(opt => opt.label).join(', ')
        : placeholder;

      // Group options by group if any
      const groups = options.reduce((acc, option) => {
        const group = option.group || '';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, IInputOption<T>[]>);

      const renderOption = (option: IInputOption<T>, index: number) => {
        const isOptionSelected = isSelected(option.id, state.selectedIds);
        const isFocused = index === state.focusedIndex;
        
        return m('.select-dropdown-option', {
          key: option.id,
          className: [
            isOptionSelected ? 'selected' : '',
            option.disabled ? 'disabled' : '',
            isFocused ? 'focused' : ''
          ].filter(Boolean).join(' '),
          onclick: option.disabled ? undefined : () => toggleOption(option.id, multiple || false, attrs)
        }, [
          // Checkbox for multiple select
          multiple && m('input.select-dropdown-option-checkbox', {
            type: 'checkbox',
            checked: isOptionSelected,
            disabled: option.disabled,
            tabindex: -1
          }),
          
          // Option image
          option.img && m('img.select-dropdown-option-img', {
            src: option.img,
            alt: option.label
          }),
          
          // Option text
          m('.select-dropdown-option-text', option.label?.replace('&amp;', '&'))
        ]);
      };

      const renderDropdown = () => {
        if (Object.keys(groups).length === 1 && groups['']) {
          // No groups, render options directly
          return options.map((option, index) => renderOption(option, index));
        } else {
          // Render grouped options
          let optionIndex = 0;
          return Object.entries(groups).map(([groupName, groupOptions]) => [
            groupName && m('.select-dropdown-optgroup', { key: `group-${groupName}` }, groupName),
            ...groupOptions.map(option => renderOption(option, optionIndex++))
          ]);
        }
      };

      return m('.select-wrapper-container', {
        className: finalClassName,
        key,
        style
      }, [
        m(`.${wrapperClasses}`, {
          onclick: disabled ? undefined : () => {
            state.isOpen = !state.isOpen;
            m.redraw();
          },
          onkeydown: disabled ? undefined : (e: KeyboardEvent) => handleKeyDown(e, attrs),
          tabindex: disabled ? -1 : 0,
          'aria-expanded': state.isOpen ? 'true' : 'false',
          'aria-haspopup': 'listbox',
          role: 'combobox'
        }, [
          // Icon prefix
          iconName && m('i.material-icons.prefix', {
            className: hasValue || state.isOpen ? 'active' : ''
          }, iconName),

          // Multiple select tags or single select display
          multiple && hasValue ? m('.select-tags', 
            selectedOptions.map(option => 
              m('.select-tag', { key: option.id }, [
                option.label,
                !disabled && m('.select-tag-close', {
                  onclick: (e: MouseEvent) => {
                    e.stopPropagation();
                    toggleOption(option.id, true, attrs);
                  }
                }, '×')
              ])
            )
          ) : m('.select-display', {
            className: hasValue ? 'has-value' : ''
          }, displayText),

          // Label
          label && m(Label, { 
            label, 
            isMandatory,
            className: hasValue || state.isOpen ? 'active' : ''
          }),

          // Dropdown
          m('.select-dropdown', {
            className: state.isOpen ? 'active' : '',
            role: 'listbox',
            'aria-multiselectable': multiple
          }, renderDropdown())
        ]),

        // Helper text
        helperText && m(HelperText, { helperText })
      ]);
    }
  };
};