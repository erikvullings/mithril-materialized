import m, { Attributes, Component } from 'mithril';

// Option interface for type safety
export interface Option<T extends string | number> {
  id: T;
  label?: string;
  disabled?: boolean;
}

// Component attributes interface
export interface SearchSelectAttrs<T extends string | number> extends Attributes {
  /** Options to display in the select */
  options?: Option<T>[];
  /** Initial value */
  initialValue?: T[];
  /** Callback when user selects or deselects an option */
  onchange?: (selectedOptions: T[]) => void | Promise<void>;
  /** Callback when user creates a new option: should return new ID */
  oncreateNewOption?: (term: string) => Option<T> | Promise<Option<T>>;
  /** Label for the search select, no default */
  label?: string;
  /** Placeholder text for the search input, no default */
  placeholder?: string;
  /** Placeholder text for the search input, default 'Search options...' */
  searchPlaceholder?: string;
  /** When no options are left, displays this text, default 'No options found' */
  noOptionsFound?: string;
  /** Max height of the dropdown menu, default '25rem' */
  maxHeight?: string;
}

// Component state interface
interface SearchSelectState<T extends string | number> {
  isOpen: boolean;
  selectedOptions: Option<T>[];
  searchTerm: string;
  options: Option<T>[];
  inputRef: HTMLElement | null;
  dropdownRef: HTMLElement | null;
  focusedIndex: number;
  onchange: any;
}

/**
 * Mithril Factory Component for Multi-Select Dropdown with search
 */
export const SearchSelect = <T extends string | number>(): Component<SearchSelectAttrs<T>, SearchSelectState<T>> => {
  //  (): <T extends string | number>(): Component<SearchSelectAttrs<T>, SearchSelectState<T>> => {
  // State initialization
  const state: SearchSelectState<string | number> = {
    isOpen: false,
    selectedOptions: [], //options.filter((o) => iv.includes(o.id)),
    searchTerm: '',
    options: [],
    inputRef: null,
    dropdownRef: null,
    focusedIndex: -1,
    onchange: null,
  };

  // Handle click outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (state.inputRef && state.inputRef.contains(target)) {
      state.isOpen = !state.isOpen;
      m.redraw();
    } else if (state.dropdownRef && !state.dropdownRef.contains(target)) {
      state.isOpen = false;
      m.redraw();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!state.isOpen) return;

    const filteredOptions = state.options.filter(
      (option) =>
        (option.label || option.id.toString()).toLowerCase().includes((state.searchTerm || '').toLowerCase()) &&
        !state.selectedOptions.some((selected) => selected.id === option.id)
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        state.focusedIndex = Math.min(state.focusedIndex + 1, filteredOptions.length - 1);
        m.redraw();
        break;
      case 'ArrowUp':
        e.preventDefault();
        state.focusedIndex = Math.max(state.focusedIndex - 1, -1);
        m.redraw();
        break;
      case 'Enter':
        e.preventDefault();
        if (state.focusedIndex >= 0 && state.focusedIndex < filteredOptions.length) {
          toggleOption(filteredOptions[state.focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        state.isOpen = false;
        state.focusedIndex = -1;
        m.redraw();
        break;
    }
  };

  // Toggle option selection
  const toggleOption = (option: Option<string | number>) => {
    if (option.disabled) return;

    state.selectedOptions = state.selectedOptions.some((item) => item.id === option.id)
      ? state.selectedOptions.filter((item) => item.id !== option.id)
      : [...state.selectedOptions, option];
    state.searchTerm = '';
    state.focusedIndex = -1;
    state.onchange && state.onchange(state.selectedOptions.map((o) => o.id));
    m.redraw();
  };

  // Remove a selected option
  const removeOption = (option: Option<string | number>) => {
    state.selectedOptions = state.selectedOptions.filter((item) => item.id !== option.id);
    state.onchange && state.onchange(state.selectedOptions.map((o) => o.id));
    m.redraw();
  };

  return {
    oninit: ({ attrs: { options = [], initialValue = [], onchange } }) => {
      state.options = options;
      state.selectedOptions = options.filter((o) => initialValue.includes(o.id));
      state.onchange = onchange;
    },
    oncreate() {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    },
    onremove() {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    },
    view({
      attrs: {
        // onchange,
        oncreateNewOption,
        className,
        placeholder,
        searchPlaceholder = 'Search options...',
        noOptionsFound = 'No options found',
        label,
        maxHeight = '25rem',
      },
    }) {
      // Safely filter options
      const filteredOptions = state.options.filter(
        (option) =>
          (option.label || option.id.toString()).toLowerCase().includes((state.searchTerm || '').toLowerCase()) &&
          !state.selectedOptions.some((selected) => selected.id === option.id)
      );

      // Check if we should show the "add new option" element
      const showAddNew =
        oncreateNewOption &&
        state.searchTerm &&
        !filteredOptions.some((o) => (o.label || o.id.toString()).toLowerCase() === state.searchTerm.toLowerCase());

      // Render the dropdown
      return m('.multi-select-dropdown.input-field', { className }, [
        m(
          'label',
          {
            class: placeholder || state.selectedOptions.length > 0 ? 'active' : '',
          },
          label
        ),
        m(
          '.dropdown-trigger',
          {
            oncreate: ({ dom }) => {
              state.inputRef = dom as HTMLElement;
            },
            style: {
              borderBottom: '2px solid #d1d5db',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            },
          },
          [
            // Selected Options
            m(
              '.selected-options',
              {
                style: {
                  display: 'flex',
                  flexWrap: 'wrap',
                  minHeight: '50px',
                  paddingTop: '12px',
                },
              },
              state.selectedOptions.length === 0
                ? [m('span', placeholder)]
                : state.selectedOptions.map((option) =>
                    m('.chip', [
                      option.label || option.id.toString(),
                      m(
                        'button',
                        {
                          onclick: (e: Event) => {
                            e.stopPropagation();
                            removeOption(option);
                          },
                          style: {
                            marginLeft: '0.25rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          },
                        },
                        '×'
                      ),
                    ])
                  )
            ),
            // Dropdown Icon
            m(
              'svg.caret',
              {
                class: 'caret',
                height: '24',
                viewBox: '0 0 24 24',
                width: '24',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              [m('path', { d: 'M7 10l5 5 5-5z' }), m('path', { d: 'M0 0h24v24H0z', fill: 'none' })]
            ),
          ]
        ),
        // Dropdown Menu
        state.isOpen &&
          m(
            '.dropdown-menu',
            {
              oncreate: ({ dom }) => {
                state.dropdownRef = dom as HTMLElement;
              },
              onremove: () => {
                state.dropdownRef = null;
              },
              style: {
                position: 'absolute',
                width: '98%',
                marginTop: '0.4rem',
                zIndex: 1000,
              },
            },
            [
              // Options List
              m(
                'ul.dropdown-content.select-dropdown',
                {
                  style: {
                    maxHeight,
                    opacity: 1,
                    display: 'block',
                    width: '100%',
                  },
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
                        placeholder: searchPlaceholder,
                        value: state.searchTerm || '',
                        oninput: (e: InputEvent) => {
                          state.searchTerm = (e.target as HTMLInputElement).value;
                          state.focusedIndex = -1; // Reset focus when typing
                          m.redraw();
                        },
                        style: {
                          width: '100%',
                          outline: 'none',
                          fontSize: '0.875rem',
                        },
                      }),
                    ]
                  ),

                  // No options found message or list of options
                  ...(filteredOptions.length === 0 && !showAddNew
                    ? [
                        m(
                          'li',
                          {
                            style: {
                              padding: '0.5rem',
                              textAlign: 'center',
                              color: '#9ca3af',
                            },
                          },
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
                              toggleOption(option);
                            },
                            style: {
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              background: state.focusedIndex === filteredOptions.length ? '#f3f4f6' : '',
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
                        onclick: () => toggleOption(option),
                        class: option.disabled ? 'disabled' : undefined,
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          cursor: option.disabled ? 'not-allowed' : 'pointer',
                          background: state.focusedIndex === index ? '#f3f4f6' : '',
                        },
                      },
                      m('span', [
                        m('input', {
                          type: 'checkbox',
                          checked: state.selectedOptions.some((selected) => selected.id === option.id),
                          style: { marginRight: '0.5rem' },
                        }),
                        option.label || option.id.toString(),
                      ])
                    )
                  ),
                ]
              ),
            ]
          ),
      ]);
    },
  };
};
