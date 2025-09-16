import m, { Component } from 'mithril';
import { getDropdownStyles, uniqueId } from './utils';
import { MaterialIcon } from './material-icon';
import { SelectAttrs } from './select';
import { InputOption } from './option';

// Proper components to avoid anonymous closures
const SelectedChip: Component<{
  option: InputOption<any>;
  onRemove: (id: any) => void;
}> = {
  view: ({ attrs: { option, onRemove } }) =>
    m('.chip', [
      option.label || option.id.toString(),
      m(MaterialIcon, {
        name: 'close',
        className: 'close',
        onclick: (e: Event) => {
          e.stopPropagation();
          onRemove(option.id);
        },
      }),
    ]),
};

const DropdownOption: Component<{
  option: InputOption<any>;
  index: number;
  selectedIds: any[];
  isFocused: boolean;
  onToggle: (option: InputOption<any>) => void;
  onMouseOver: (index: number) => void;
}> = {
  view: ({ attrs: { option, index, selectedIds, isFocused, onToggle, onMouseOver } }) => {
    const checkboxId = `search-select-option-${option.id}`;
    const optionLabel = option.label || option.id.toString();

    return m(
      'li',
      {
        key: option.id,
        onclick: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle(option);
        },
        class: `${option.disabled ? 'disabled' : ''} ${isFocused ? 'active' : ''}`.trim(),
        onmouseover: () => {
          if (!option.disabled) {
            onMouseOver(index);
          }
        },
      },
      m('label', { for: checkboxId, class: 'search-select-option-label' }, [
        m('input', {
          type: 'checkbox',
          id: checkboxId,
          checked: selectedIds.includes(option.id),
        }),
        m('span', optionLabel),
      ])
    );
  },
};

// Internationalization interface for SearchSelect
export interface SearchSelectI18n {
  /** Text shown when no options match the search */
  noOptionsFound?: string;
  /** Prefix for adding new option */
  addNewPrefix?: string;
}

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
  /** Internationalization options */
  i18n?: SearchSelectI18n;
}

// Component state interface
interface SearchSelectState<T extends string | number> {
  id: string;
  isOpen: boolean;
  searchTerm: string;
  inputRef: HTMLElement | null;
  dropdownRef: HTMLElement | null;
  focusedIndex: number;
  internalSelectedIds: T[];
}

/**
 * Mithril Factory Component for Multi-Select Dropdown with search
 */
export const SearchSelect = <T extends string | number>(): Component<SearchSelectAttrs<T>, SearchSelectState<T>> => {
  // State initialization
  const state: SearchSelectState<T> = {
    id: '',
    isOpen: false,
    searchTerm: '',
    inputRef: null,
    dropdownRef: null,
    focusedIndex: -1,
    internalSelectedIds: [],
  };

  const isControlled = (attrs: SearchSelectAttrs<T>) =>
    attrs.checkedId !== undefined && typeof attrs.onchange === 'function';

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

    const controlled = isControlled(attrs);

    // Get current selected IDs from props or internal state
    const currentSelectedIds = controlled
      ? attrs.checkedId !== undefined
        ? Array.isArray(attrs.checkedId)
          ? attrs.checkedId
          : [attrs.checkedId]
        : []
      : state.internalSelectedIds;

    const newIds = currentSelectedIds.includes(option.id)
      ? currentSelectedIds.filter((id) => id !== option.id)
      : [...currentSelectedIds, option.id];

    // Update internal state for uncontrolled mode
    if (!controlled) {
      state.internalSelectedIds = newIds;
    }

    state.searchTerm = '';
    state.focusedIndex = -1;

    // Call onchange if provided
    if (attrs.onchange) {
      attrs.onchange(newIds);
    }
  };

  // Remove a selected option
  const removeOption = (optionId: T, attrs: SearchSelectAttrs<T>) => {
    const controlled = isControlled(attrs);

    // Get current selected IDs from props or internal state
    const currentSelectedIds = controlled
      ? attrs.checkedId !== undefined
        ? Array.isArray(attrs.checkedId)
          ? attrs.checkedId
          : [attrs.checkedId]
        : []
      : state.internalSelectedIds;

    const newIds = currentSelectedIds.filter((id) => id !== optionId);

    // Update internal state for uncontrolled mode
    if (!controlled) {
      state.internalSelectedIds = newIds;
    }

    // Call onchange if provided
    if (attrs.onchange) {
      attrs.onchange(newIds);
    }
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id || uniqueId();

      // Initialize internal state for uncontrolled mode
      if (!isControlled(attrs)) {
        const defaultIds =
          attrs.defaultCheckedId !== undefined
            ? Array.isArray(attrs.defaultCheckedId)
              ? attrs.defaultCheckedId
              : [attrs.defaultCheckedId]
            : [];
        state.internalSelectedIds = defaultIds;
      }
    },
    oncreate() {
      document.addEventListener('click', handleClickOutside);
    },
    onremove() {
      document.removeEventListener('click', handleClickOutside);
    },
    view({ attrs }) {
      const controlled = isControlled(attrs);

      // Get selected IDs from props or internal state
      const selectedIds = controlled
        ? attrs.checkedId !== undefined
          ? Array.isArray(attrs.checkedId)
            ? attrs.checkedId
            : [attrs.checkedId]
          : []
        : state.internalSelectedIds;

      const {
        options = [],
        oncreateNewOption,
        className,
        placeholder,
        searchPlaceholder = 'Search options...',
        noOptionsFound = 'No options found',
        label,
        i18n = {},
      } = attrs;

      // Use i18n values if provided, otherwise use defaults
      const texts = {
        noOptionsFound: i18n.noOptionsFound || noOptionsFound,
        addNewPrefix: i18n.addNewPrefix || '+',
      };

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
            class: 'chips chips-container',
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
              class: 'sr-only',
              style: { position: 'absolute', left: '-9999px', opacity: 0 },
            }),

            // Selected Options (chips)
            ...selectedOptions.map((option) =>
              m(SelectedChip, {
                // key: option.id,
                option,
                onRemove: (id) => removeOption(id, attrs),
              })
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
                    class: 'search-select-input',
                  }),
                ]
              ),

              // No options found message or list of options
              ...(filteredOptions.length === 0 && !showAddNew
                ? [m('li.search-select-no-options', texts.noOptionsFound)]
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
                      [m('span', `${texts.addNewPrefix} "${state.searchTerm}"`)]
                    ),
                  ]
                : []),

              // List of filtered options
              ...filteredOptions.map((option, index) =>
                m(DropdownOption, {
                  // key: option.id,
                  option,
                  index,
                  selectedIds,
                  isFocused: state.focusedIndex === index,
                  onToggle: (opt) => toggleOption(opt, attrs),
                  onMouseOver: (idx) => {
                    state.focusedIndex = idx;
                  },
                })
              ),
            ]
          ),
      ]);
    },
  };
};
