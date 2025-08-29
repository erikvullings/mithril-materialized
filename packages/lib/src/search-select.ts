import m, { Component } from 'mithril';
import { getDropdownStyles, uniqueId } from './utils';
import { MaterialIcon } from './material-icon';
import { SelectAttrs } from './select';
import { InputOption } from './option';

// Extended SearchSelect attributes that inherit from SelectAttrs
export interface SearchSelectAttrs<T extends string | number> extends SelectAttrs<T> {
  /** Callback when user creates a new option: should return new ID */
  oncreateNewOption?: (term: string) => InputOption<T> | Promise<InputOption<T>>;
  /** Placeholder text for the search input, default 'Search options...' */
  searchPlaceholder?: string;
  /** When no options are left, displays this text, default 'No options found' */
  noOptionsFound?: string;
  /** Max height of the dropdown menu, default '25rem' */
  maxHeight?: string;
}

// Component state interface
interface SearchSelectState {
  id: string;
  isOpen: boolean;
  searchTerm: string;
  inputRef: HTMLElement | null;
  dropdownRef: HTMLElement | null;
  focusedIndex: number;
}

/**
 * Mithril Factory Component for Multi-Select Dropdown with search
 */
export const SearchSelect = <T extends string | number>(): Component<SearchSelectAttrs<T>, SearchSelectState> => {
  // State initialization
  const state: SearchSelectState = {
    id: '',
    isOpen: false,
    searchTerm: '',
    inputRef: null,
    dropdownRef: null,
    focusedIndex: -1,
  };

  const componentId = uniqueId();
  const searchInputId = `${componentId}-search`;

  // Handle click outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (state.dropdownRef && state.dropdownRef.contains(target)) {
      // Click inside dropdown, do nothing
      return;
    }
    if (state.inputRef && state.inputRef.contains(target)) {
      // Click on trigger handled by onclick event
      return;
    } else {
      // Click outside, close dropdown
      state.isOpen = false;
      m.redraw();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent, filteredOptions: InputOption<T>[], showAddNew: boolean) => {
    if (!state.isOpen) return;

    const totalOptions = filteredOptions.length + (showAddNew ? 1 : 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        state.focusedIndex = Math.min(state.focusedIndex + 1, totalOptions - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        state.focusedIndex = Math.max(state.focusedIndex - 1, -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (state.focusedIndex >= 0) {
          if (showAddNew && state.focusedIndex === filteredOptions.length) {
            // Handle add new option
            return 'addNew';
          } else if (state.focusedIndex < filteredOptions.length) {
            // This will be handled in the view method where attrs are available
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        state.isOpen = false;
        state.focusedIndex = -1;
        break;
    }
    return null;
  };

  // Toggle option selection
  const toggleOption = (option: InputOption<T>, attrs: SearchSelectAttrs<T>) => {
    if (option.disabled) return;

    // Get current selected IDs from props
    const currentSelectedIds =
      attrs.checkedId !== undefined ? (Array.isArray(attrs.checkedId) ? attrs.checkedId : [attrs.checkedId]) : [];

    const newIds = currentSelectedIds.includes(option.id)
      ? currentSelectedIds.filter((id) => id !== option.id)
      : [...currentSelectedIds, option.id];

    state.searchTerm = '';
    state.focusedIndex = -1;
    attrs.onchange(newIds);
  };

  // Remove a selected option
  const removeOption = (optionId: T, attrs: SearchSelectAttrs<T>) => {
    // Get current selected IDs from props
    const currentSelectedIds =
      attrs.checkedId !== undefined ? (Array.isArray(attrs.checkedId) ? attrs.checkedId : [attrs.checkedId]) : [];

    const newIds = currentSelectedIds.filter((id) => id !== optionId);
    attrs.onchange(newIds);
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id || uniqueId();
    },
    oncreate() {
      document.addEventListener('click', handleClickOutside);
    },
    onremove() {
      document.removeEventListener('click', handleClickOutside);
    },
    view({ attrs }) {
      // Derive selected IDs from props - no internal state needed
      const selectedIds =
        attrs.checkedId !== undefined ? (Array.isArray(attrs.checkedId) ? attrs.checkedId : [attrs.checkedId]) : [];

      const {
        options = [],
        oncreateNewOption,
        className,
        placeholder,
        searchPlaceholder = 'Search options...',
        noOptionsFound = 'No options found',
        label,
      } = attrs;

      // Get selected options for display
      const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));

      // Safely filter options
      const filteredOptions = options.filter(
        (option) =>
          (option.label || option.id.toString()).toLowerCase().includes((state.searchTerm || '').toLowerCase()) &&
          !selectedIds.includes(option.id)
      );

      // Check if we should show the "add new option" element
      const showAddNew =
        oncreateNewOption &&
        state.searchTerm &&
        !filteredOptions.some((o) => (o.label || o.id.toString()).toLowerCase() === state.searchTerm.toLowerCase());

      // Render the dropdown
      return m('.input-field.multi-select-dropdown', { className }, [
        m(
          '.chips.chips-initial.chips-container',
          {
            oncreate: ({ dom }) => {
              state.inputRef = dom as HTMLElement;
            },
            onclick: (e: Event) => {
              // console.log('SearchSelect clicked', state.isOpen, e); // Debug log
              e.preventDefault();
              e.stopPropagation();
              state.isOpen = !state.isOpen;
              // console.log('SearchSelect state changed to', state.isOpen); // Debug log
            },
            style: {
              display: 'flex',
              alignItems: 'end',
              flexWrap: 'wrap',
              cursor: 'pointer',
              position: 'relative',
            },
          },
          [
            // TODO FIXME Add to existing input
            // Hidden input for label association and accessibility
            m('input', {
              type: 'text',
              id: state.id,
              value: selectedOptions.map((o) => o.label || o.id.toString()).join(', '),
              readonly: true,
              style: { position: 'absolute', left: '-9999px', opacity: 0 },
            }),

            // Selected Options (chips)
            ...selectedOptions.map((option) =>
              m('.chip', [
                option.label || option.id.toString(),
                m(MaterialIcon, {
                  name: 'close',
                  className: 'close',
                  onclick: (e: Event) => {
                    e.stopPropagation();
                    removeOption(option.id, attrs);
                  },
                }),
              ])
            ),

            // Placeholder when no options selected
            selectedOptions.length === 0 &&
              placeholder &&
              m(
                'span.placeholder',
                {
                  style: {
                    color: 'var(--mm-text-hint, #9e9e9e)',
                    flexGrow: 1,
                    padding: '8px 0',
                  },
                },
                placeholder
              ),

            // Spacer to push caret to the right
            m('span.spacer', { style: { flexGrow: 1 } }),

            m(MaterialIcon, {
              name: 'caret',
              direction: state.isOpen ? 'up' : 'down',
              class: 'caret',
              style: { marginLeft: 'auto', cursor: 'pointer' },
            }),
          ]
        ),
        // Label
        label &&
          m(
            'label',
            {
              for: state.id,
              class: placeholder || selectedOptions.length > 0 ? 'active' : '',
            },
            label
          ),
        // Dropdown Menu
        state.isOpen &&
          m(
            'ul.dropdown-content.select-dropdown',
            {
              oncreate: ({ dom }) => {
                state.dropdownRef = dom as HTMLElement;
              },
              onremove: () => {
                state.dropdownRef = null;
              },
              style: getDropdownStyles(state.inputRef),
            },
            [
              m(
                'li', // Search Input
                {
                  class: 'search-wrapper',
                  style: { padding: '0 16px', position: 'relative' },
                },
                [
                  m('input', {
                    type: 'text',
                    id: searchInputId,
                    placeholder: searchPlaceholder,
                    value: state.searchTerm || '',
                    oncreate: ({ dom }) => {
                      // Auto-focus the search input when dropdown opens
                      (dom as HTMLInputElement).focus();
                    },
                    oninput: (e: InputEvent) => {
                      state.searchTerm = (e.target as HTMLInputElement).value;
                      state.focusedIndex = -1; // Reset focus when typing
                    },
                    onkeydown: async (e: KeyboardEvent) => {
                      const result = handleKeyDown(e, filteredOptions, !!showAddNew);
                      if (result === 'addNew' && oncreateNewOption) {
                        const option = await oncreateNewOption(state.searchTerm);
                        toggleOption(option, attrs);
                      } else if (
                        e.key === 'Enter' &&
                        state.focusedIndex >= 0 &&
                        state.focusedIndex < filteredOptions.length
                      ) {
                        toggleOption(filteredOptions[state.focusedIndex], attrs);
                      }
                    },
                    style: {
                      width: '100%',
                      outline: 'none',
                      fontSize: '0.875rem',
                      border: 'none',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--mm-input-border, #9e9e9e)',
                      backgroundColor: 'transparent',
                      color: 'var(--mm-text-primary, inherit)',
                    },
                  }),
                ]
              ),

              // No options found message or list of options
              ...(filteredOptions.length === 0 && !showAddNew
                ? [
                    m(
                      'li',
                      // {
                      //   style: getNoOptionsStyles(),
                      // },
                      noOptionsFound
                    ),
                  ]
                : []),

              // Add new option item
              ...(showAddNew
                ? [
                    m(
                      'li',
                      {
                        onclick: async () => {
                          const option = await oncreateNewOption(state.searchTerm);
                          toggleOption(option, attrs);
                        },
                        class: state.focusedIndex === filteredOptions.length ? 'active' : '',
                        onmouseover: () => {
                          state.focusedIndex = filteredOptions.length;
                        },
                      },
                      [m('span', `+ "${state.searchTerm}"`)]
                    ),
                  ]
                : []),

              // List of filtered options
              ...filteredOptions.map((option, index) =>
                m(
                  'li',
                  {
                    onclick: (e: Event) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleOption(option, attrs);
                    },
                    class: `${option.disabled ? 'disabled' : ''} ${
                      state.focusedIndex === index ? 'active' : ''
                    }`.trim(),
                    onmouseover: () => {
                      if (!option.disabled) {
                        state.focusedIndex = index;
                      }
                    },
                  },
                  m('span', [
                    m('input', {
                      type: 'checkbox',
                      checked: selectedIds.includes(option.id),
                    }),
                    option.label || option.id.toString(),
                  ])
                )
              ),
            ]
          ),
      ]);
    },
  };
};
