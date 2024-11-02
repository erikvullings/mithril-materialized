import m, { Component } from 'mithril';

// Option interface for type safety
export interface Option<T> {
  id: T;
  label?: string;
  disabled?: boolean;
}

// Component attributes interface
export interface SearchSelectAttrs<T> {
  options?: Option<T>[];
  /** Initial value */
  initialValue?: T[];
  onchange?: (selectedOptions: T[]) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  /** Max height of the dropdown menu, default '25rem' */
  maxHeight?: string;
}

// Component state interface
interface SearchSelectState<T> {
  isOpen: boolean;
  selectedOptions: Option<T>[];
  searchTerm: string;
  options: Option<T>[];
  inputRef: HTMLElement | null;
  dropdownRef: HTMLElement | null;
}

/**
 * Mithril Factory Component for Multi-Select Dropdown with search
 */
export const SearchSelect = <T extends string | number>(): Component<SearchSelectAttrs<T>, SearchSelectState<T>> => {
  // State initialization
  const state: SearchSelectState<T> = {
    isOpen: false,
    selectedOptions: [], //options.filter((o) => iv.includes(o.id)),
    searchTerm: '',
    options: [],
    inputRef: null,
    dropdownRef: null,
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

  return {
    oninit: ({ attrs: { options = [], initialValue = [] } }) => {
      state.options = options;
      state.selectedOptions = options.filter((o) => initialValue.includes(o.id));
    },
    oncreate() {
      document.addEventListener('click', handleClickOutside);
    },
    onremove() {
      document.removeEventListener('click', handleClickOutside);
    },
    view({ attrs: { onchange, className, placeholder, label, maxHeight = '25rem' } }) {
      // Safely filter options
      const filteredOptions = state.options.filter(
        (option) =>
          (option.label || option.id.toString()).toLowerCase().includes((state.searchTerm || '').toLowerCase()) &&
          !state.selectedOptions.some((selected) => selected.id === option.id)
      );

      // Toggle option selection
      const toggleOption = (option: Option<T>) => {
        state.selectedOptions = state.selectedOptions.some((item) => item.id === option.id)
          ? state.selectedOptions.filter((item) => item.id !== option.id)
          : [...state.selectedOptions, option];
        onchange && onchange(state.selectedOptions.map((o) => o.id));
        m.redraw();
      };

      // Remove a selected option
      const removeOption = (option: Option<T>) => {
        state.selectedOptions = state.selectedOptions.filter((item) => item.id !== option.id);
        onchange && onchange(state.selectedOptions.map((o) => o.id));
        m.redraw();
      };

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
                      option.label,
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
              [
                m('path', { d: 'M7 10l5 5 5-5z' }),
                m('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
                // <svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
              ]
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
                width: '100%',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                marginTop: '0.25rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              },
            },
            [
              // Search Input
              m('.search-input', { style: { padding: '0 .75rem' } }, [
                m('input', {
                  type: 'text',
                  placeholder: 'Search options...',
                  value: state.searchTerm || '',
                  oninput: (e: InputEvent) => {
                    state.searchTerm = (e.target as HTMLInputElement).value;
                    m.redraw();
                  },
                  style: {
                    width: '100%',
                    outline: 'none',
                    fontSize: '0.875rem',
                  },
                }),
              ]),

              // Options List
              m(
                'ul.dropdown-content.select-dropdown',
                {
                  style: {
                    maxHeight,
                    opacity: 1,
                    display: 'contents',
                  },
                },
                filteredOptions.length === 0
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
                        'No options found'
                      ),
                    ]
                  : filteredOptions.map((option) =>
                      m(
                        'li',
                        {
                          onclick: () => (option.disabled ? undefined : toggleOption(option)),
                          class: option.disabled ? 'disabled' : undefined,
                          style: {
                            // padding: '0 0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            lineHeight: '22px',
                            padding: '14px 16px',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                          },
                        },
                        [
                          m('input', {
                            type: 'checkbox',
                            checked: state.selectedOptions.some((selected) => selected.id === option.id),
                            style: { marginRight: '0.5rem' },
                          }),
                          option.label,
                        ]
                      )
                    )
              ),
            ]
          ),
      ]);
    },
  };
};
