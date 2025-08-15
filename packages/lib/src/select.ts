import m, { Attributes, Component } from 'mithril';
import { Label, HelperText } from './label';
import { InputOption } from './option';
import { getDropdownStyles, uniqueId } from './utils';
import { MaterialIcon } from './material-icon';

export interface SelectAttributes<T extends string | number> extends Attributes {
  /** Options to select from */
  options: InputOption<T>[];
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

interface SelectState<T extends string | number> {
  id: string;
  isOpen: boolean;
  selectedIds: T[];
  focusedIndex: number;
  inputRef?: HTMLElement | null;
  dropdownRef?: HTMLElement | null;
}

/** Select component */
export const Select = <T extends string | number>(): Component<SelectAttributes<T>> => {
  const state: SelectState<T> = {
    id: '',
    isOpen: false,
    selectedIds: [],
    focusedIndex: -1,
    inputRef: null,
    dropdownRef: null,
  };

  const isSelected = (id: T, selectedIds: T[]) => {
    return selectedIds.some((selectedId) => selectedId === id);
  };

  const toggleOption = (id: T, multiple: boolean, attrs: SelectAttributes<T>) => {
    if (multiple) {
      const newIds = state.selectedIds.includes(id)
        ? // isSelected(id, state.selectedIds)
          state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id];
      state.selectedIds = newIds;
      attrs.onchange(newIds);
      console.log(newIds);
      // Keep dropdown open for multiple select
    } else {
      state.selectedIds = [id];
      // Close dropdown for single select
      state.isOpen = false;
      attrs.onchange([id]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, attrs: SelectAttributes<T>) => {
    const { options } = attrs;
    const selectableOptions = options.filter((opt) => !opt.disabled);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = 0;
        } else {
          const currentSelectableIndex = selectableOptions.findIndex((opt) => opt === options[state.focusedIndex]);
          const nextSelectableIndex = Math.min(currentSelectableIndex + 1, selectableOptions.length - 1);
          const nextOption = selectableOptions[nextSelectableIndex];
          state.focusedIndex = options.findIndex((opt) => opt === nextOption);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (state.isOpen) {
          const currentSelectableIndex = selectableOptions.findIndex((opt) => opt === options[state.focusedIndex]);
          const prevSelectableIndex = Math.max(currentSelectableIndex - 1, 0);
          const prevOption = selectableOptions[prevSelectableIndex];
          state.focusedIndex = options.findIndex((opt) => opt === prevOption);
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

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('.select-wrapper-container')) {
      state.isOpen = false;
      m.redraw();
    }
  };

  const renderGroupedOptions = (options: InputOption<T>[], multiple: boolean, attrs: SelectAttributes<T>) => {
    const groupedOptions: { [key: string]: InputOption<T>[] } = {};
    const ungroupedOptions: InputOption<T>[] = [];

    // Group options by their group property
    options.forEach((option) => {
      if (option.group) {
        if (!groupedOptions[option.group]) {
          groupedOptions[option.group] = [];
        }
        groupedOptions[option.group].push(option);
      } else {
        ungroupedOptions.push(option);
      }
    });

    const renderElements: any[] = [];

    // Render ungrouped options first
    ungroupedOptions.forEach((option) => {
      renderElements.push(
        m(
          'li',
          {
            class: option.disabled ? 'disabled' : state.focusedIndex === options.indexOf(option) ? 'focused' : '',
            ...(option.disabled
              ? {}
              : {
                  onclick: (e: MouseEvent) => {
                    e.stopPropagation();
                    toggleOption(option.id, multiple, attrs);
                  },
                }),
          },
          m(
            'span',
            multiple
              ? m(
                  'label',
                  { for: option.id },
                  m('input', {
                    id: option.id,
                    type: 'checkbox',
                    checked: state.selectedIds.includes(option.id),
                    disabled: option.disabled ? true : undefined,
                    onclick: (e: MouseEvent) => {
                      e.stopPropagation();
                    },
                  }),
                  m('span', option.label)
                )
              : option.label
          )
        )
      );
    });

    // Render grouped options
    Object.keys(groupedOptions).forEach((groupName) => {
      // Add group header
      renderElements.push(m('li.optgroup', { tabindex: 0 }, m('span', groupName)));

      // Add group options
      groupedOptions[groupName].forEach((option) => {
        renderElements.push(
          m(
            'li',
            {
              class: `optgroup-option${option.disabled ? ' disabled' : ''}${
                isSelected(option.id, state.selectedIds) ? ' selected' : ''
              }${state.focusedIndex === options.indexOf(option) ? ' focused' : ''}`,
              ...(option.disabled
                ? {}
                : {
                    onclick: (e: MouseEvent) => {
                      e.stopPropagation();
                      toggleOption(option.id, multiple, attrs);
                    },
                  }),
            },
            m(
              'span',
              multiple
                ? m(
                    'label',
                    { for: option.id },
                    m('input', {
                      id: option.id,
                      type: 'checkbox',
                      checked: state.selectedIds.includes(option.id),
                      disabled: option.disabled ? true : undefined,
                      onclick: (e: MouseEvent) => {
                        e.stopPropagation();
                      },
                    }),
                    m('span', option.label)
                  )
                : option.label
            )
          )
        );
      });
    });

    return renderElements;
  };

  return {
    oninit: ({ attrs }) => {
      const { checkedId, initialValue, id } = attrs;
      state.id = id || uniqueId();
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

    view: ({ attrs }) => {
      // Sync external checkedId prop with internal state - do this in view for immediate response
      const { checkedId } = attrs;
      if (checkedId !== undefined) {
        const newIds = checkedId instanceof Array ? checkedId : [checkedId];
        if (JSON.stringify(newIds) !== JSON.stringify(state.selectedIds)) {
          state.selectedIds = newIds;
        }
      }
      const {
        newRow,
        className = 'col s12',
        key,
        options,
        multiple = false,
        label,
        helperText,
        placeholder = '',
        isMandatory,
        iconName,
        disabled,
        style,
      } = attrs;

      const finalClassName = newRow ? `${className} clear` : className;
      const selectedOptions = options.filter((opt) => isSelected(opt.id, state.selectedIds));

      return m(
        '.input-field.select-space',
        {
          className: finalClassName,
          key,
          style,
        },
        [
          // Icon prefix
          iconName && m('i.material-icons.prefix', iconName),
          m(
            '.select-wrapper',
            {
              onclick: disabled
                ? undefined
                : () => {
                    state.isOpen = !state.isOpen;
                  },
              onkeydown: disabled ? undefined : (e: KeyboardEvent) => handleKeyDown(e, attrs),
              tabindex: disabled ? -1 : 0,
              'aria-expanded': state.isOpen ? 'true' : 'false',
              'aria-haspopup': 'listbox',
              role: 'combobox',
            },
            [
              m('input[type=text][readonly=true].select-dropdown.dropdown-trigger', {
                id: state.id,
                value:
                  selectedOptions.length > 0 ? selectedOptions.map((o) => o.label || o.id).join(', ') : placeholder,
                oncreate: ({ dom }) => {
                  state.inputRef = dom as HTMLElement;
                },
                onclick: (e: Event) => {
                  e.preventDefault();
                  e.stopPropagation();
                  state.isOpen = !state.isOpen;
                },
              }),
              // Dropdown Menu
              state.isOpen &&
                m(
                  'ul.dropdown-content.select-dropdown',
                  {
                    tabindex: 0,
                    oncreate: ({ dom }) => {
                      state.dropdownRef = dom as HTMLElement;
                    },
                    onremove: () => {
                      state.dropdownRef = null;
                    },
                    style: getDropdownStyles(state.inputRef, true, options),
                  },
                  [
                    placeholder && m('li.disabled', { tabindex: 0 }, m('span', placeholder)),
                    ...renderGroupedOptions(options, multiple, attrs),
                  ]
                ),
              m(MaterialIcon, {
                name: 'caret',
                direction: 'down',
              }),
            ]
          ),

          // Label
          label &&
            m(Label, {
              id: state.id,
              label,
              isMandatory,
            }),

          // Helper text
          helperText && m(HelperText, { helperText }),
        ]
      );
    },
  };
};
