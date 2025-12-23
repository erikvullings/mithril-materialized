import m, { Component } from 'mithril';
import { getDropdownStyles, uniqueId, sortOptions } from './utils';
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
  showCheckbox: boolean;
}> = {
  view: ({ attrs: { option, index, selectedIds, isFocused, onToggle, onMouseOver, showCheckbox } }) => {
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
        showCheckbox &&
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
  /** Message template for truncated results. Use {shown} and {total} placeholders */
  showingXofY?: string;
  /** Message shown when max selections reached. Use {max} placeholder */
  maxSelectionsReached?: string;
}

// Extended SearchSelect attributes that inherit from SelectAttrs
export interface SearchSelectAttrs<T extends string | number> extends SelectAttrs<T> {
  /** Callback when user creates a new option: should return new ID */
  oncreateNewOption?: (term: string) => InputOption<T> | Promise<InputOption<T>>;
  /** Placeholder text for the search input, default 'Search options...' */
  searchPlaceholder?: string;
  /** When no options are left, displays this text, default 'No options found' */
  noOptionsFound?: string;
  /** Max height of the dropdown menu, default '400px', use 'none' to disable it */
  maxHeight?: string;
  /** Internationalization options */
  i18n?: SearchSelectI18n;
  /** Maximum number of options to display. When set, limits displayed options to improve performance with large datasets */
  maxDisplayedOptions?: number;
  /** Maximum number of options that can be selected. When max=1, checkboxes are hidden and behaves like single select */
  maxSelectedOptions?: number;
  /** Sort selected items: 'asc' (alphabetically A-Z), 'desc' (Z-A), 'none' (insertion order), or custom sort function */
  sortSelected?: 'asc' | 'desc' | 'none' | ((a: InputOption<T>, b: InputOption<T>) => number);
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
  createdOptions: InputOption<T>[];
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
    createdOptions: [],
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
    m.redraw();
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
            return 'selectOption';
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

  // Create new option and add to state
  const createAndSelectOption = async (attrs: SearchSelectAttrs<T>) => {
    if (!attrs.oncreateNewOption || !state.searchTerm) return;

    const newOption = await attrs.oncreateNewOption(state.searchTerm);

    // Store the created option internally
    state.createdOptions.push(newOption);

    // Select the new option
    toggleOption(newOption, attrs);
  };

  // Toggle option selection
  const toggleOption = (option: InputOption<T>, attrs: SearchSelectAttrs<T>) => {
    if (option.disabled) return;

    const controlled = isControlled(attrs);
    const { maxSelectedOptions } = attrs;

    // Get current selected IDs from props or internal state
    const currentSelectedIds = controlled
      ? attrs.checkedId !== undefined
        ? Array.isArray(attrs.checkedId)
          ? attrs.checkedId
          : [attrs.checkedId]
        : []
      : state.internalSelectedIds;

    const isSelected = currentSelectedIds.includes(option.id);

    let newIds: T[];
    if (isSelected) {
      // Remove if already selected
      newIds = currentSelectedIds.filter((id) => id !== option.id);
    } else {
      // Check if we've reached the max selection limit
      if (maxSelectedOptions && currentSelectedIds.length >= maxSelectedOptions) {
        // If max=1, replace the selection
        if (maxSelectedOptions === 1) {
          newIds = [option.id];
        } else {
          // Otherwise, don't add more
          return;
        }
      } else {
        // Add to selection
        newIds = [...currentSelectedIds, option.id];
      }
    }

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
        maxDisplayedOptions,
        maxSelectedOptions,
        maxHeight,
      } = attrs;

      // Use i18n values if provided, otherwise use defaults
      const texts = {
        noOptionsFound: i18n.noOptionsFound || noOptionsFound,
        addNewPrefix: i18n.addNewPrefix || '+',
        showingXofY: i18n.showingXofY || 'Showing {shown} of {total} options',
        maxSelectionsReached: i18n.maxSelectionsReached || 'Maximum {max} selections reached',
      };

      // Check if max selections is reached
      const isMaxSelectionsReached = maxSelectedOptions && selectedIds.length >= maxSelectedOptions;

      // Merge provided options with internally created options
      const allOptions = [...options, ...state.createdOptions];

      // Get selected options for display
      const selectedOptionsUnsorted = allOptions.filter((opt) => selectedIds.includes(opt.id));
      const selectedOptions = sortOptions(selectedOptionsUnsorted, attrs.sortSelected);

      // Safely filter options
      const filteredOptions = allOptions.filter(
        (option) =>
          (option.label || option.id.toString()).toLowerCase().includes((state.searchTerm || '').toLowerCase()) &&
          !selectedIds.includes(option.id)
      );

      // Apply display limit if configured
      const totalFilteredCount = filteredOptions.length;
      const displayedOptions = maxDisplayedOptions ? filteredOptions.slice(0, maxDisplayedOptions) : filteredOptions;
      const isTruncated = maxDisplayedOptions && totalFilteredCount > maxDisplayedOptions;

      // Check if we should show the "add new option" element
      const showAddNew =
        oncreateNewOption &&
        state.searchTerm &&
        !displayedOptions.some((o) => (o.label || o.id.toString()).toLowerCase() === state.searchTerm.toLowerCase());

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
              style: {
                ...getDropdownStyles(state.inputRef),
                ...(maxHeight ? { maxHeight } : {}),
              },
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
                      const result = handleKeyDown(e, displayedOptions, !!showAddNew);
                      if (result === 'addNew' && oncreateNewOption) {
                        await createAndSelectOption(attrs);
                      } else if (result === 'selectOption' && state.focusedIndex < displayedOptions.length) {
                        toggleOption(displayedOptions[state.focusedIndex], attrs);
                      }
                    },
                    class: 'search-select-input',
                  }),
                ]
              ),

              // No options found message or list of options
              ...(displayedOptions.length === 0 && !showAddNew
                ? [m('li.search-select-no-options', texts.noOptionsFound)]
                : []),

              // Truncation message
              ...(isTruncated
                ? [
                    m(
                      'li.search-select-truncation-info',
                      {
                        style: {
                          fontStyle: 'italic',
                          color: 'var(--mm-text-hint, #9e9e9e)',
                          padding: '8px 16px',
                          cursor: 'default',
                        },
                      },
                      texts.showingXofY
                        .replace('{shown}', displayedOptions.length.toString())
                        .replace('{total}', totalFilteredCount.toString())
                    ),
                  ]
                : []),

              // Max selections reached message
              ...(isMaxSelectionsReached
                ? [
                    m(
                      'li.search-select-max-info',
                      {
                        style: {
                          fontStyle: 'italic',
                          color: 'var(--mm-text-hint, #9e9e9e)',
                          padding: '8px 16px',
                          cursor: 'default',
                        },
                      },
                      texts.maxSelectionsReached.replace('{max}', maxSelectedOptions!.toString())
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
                          await createAndSelectOption(attrs);
                        },
                        class: state.focusedIndex === displayedOptions.length ? 'active' : '',
                        onmouseover: () => {
                          state.focusedIndex = displayedOptions.length;
                        },
                      },
                      [m('span', `${texts.addNewPrefix} "${state.searchTerm}"`)]
                    ),
                  ]
                : []),

              // List of filtered options
              ...displayedOptions.map((option, index) =>
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
                  showCheckbox: maxSelectedOptions !== 1,
                })
              ),
            ]
          ),
      ]);
    },
  };
};
