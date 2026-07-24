import m, { Component } from 'mithril';
import { getDropdownStyles, uniqueId, sortOptions } from './utils';
import { MaterialIcon } from './material-icon';
import { SelectAttrs } from './select';
import { InputOption } from './option';
import {
  AsyncComboboxState,
  getComboboxKeyResult,
  getComboboxOptionId,
  getComboboxViewState,
  rejectAsyncComboboxRequest,
  resolveAsyncComboboxRequest,
  startAsyncComboboxRequest,
} from './combobox';

const SelectedChip = <T extends string | number>({
  option,
  onRemove,
}: {
  option: InputOption<T>;
  onRemove: (id: T) => void;
}) =>
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
  ]);

const DropdownOption = <T extends string | number>({
  option,
  index,
  optionId,
  selectedIds,
  isFocused,
  onToggle,
  onMouseOver,
  showCheckbox,
}: {
  option: InputOption<T>;
  index: number;
  optionId: string;
  selectedIds: T[];
  isFocused: boolean;
  onToggle: (option: InputOption<T>) => void;
  onMouseOver: (index: number) => void;
  showCheckbox: boolean;
}) => {
  const optionLabel = option.label || option.id.toString();

  return m(
    'li',
    {
      id: optionId,
      role: 'option',
      'aria-selected': selectedIds.includes(option.id) ? 'true' : 'false',
      class: `${option.disabled ? 'disabled' : ''} ${isFocused ? 'active' : ''}`.trim(),
      onmouseover: () => {
        if (!option.disabled) {
          onMouseOver(index);
        }
      },
    },
    m(
      'label',
      {
        class: 'search-select-option-label',
        onclick: (e: Event) => {
          // A single-select row has no native checkbox to emit change.
          if (!showCheckbox) {
            e.preventDefault();
            onToggle(option);
          }
        },
      },
      [
        showCheckbox &&
          m('input', {
            type: 'checkbox',
            checked: selectedIds.includes(option.id),
            disabled: option.disabled,
            onchange: (e: Event) => {
              e.stopPropagation();
              onToggle(option);
            },
          }),
        m('span', optionLabel),
      ]
    )
  );
};

// Internationalization interface for SearchSelect
export interface SearchSelectI18n {
  /** Text shown when no options match the search */
  noOptionsFound?: string;
  /** Text shown while async options are loading */
  loadingOptions?: string;
  /** Text shown when async option loading fails */
  loadingError?: string;
  /** Prefix for adding new option */
  addNewPrefix?: string;
  /** Message template for truncated results. Use {shown} and {total} placeholders */
  showingXofY?: string;
  /** Message shown when max selections reached. Use {max} placeholder */
  maxSelectionsReached?: string;
}

// Extended SearchSelect attributes that inherit from SelectAttrs
export interface SearchSelectAttrs<T extends string | number> extends SelectAttrs<T> {
  /** Async options loader for remote/large data sets */
  loadOptions?: (query: string) => Promise<InputOption<T>[]>;
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
  listboxId: string;
  isOpen: boolean;
  searchTerm: string;
  inputRef: HTMLElement | null;
  dropdownRef: HTMLElement | null;
  focusedIndex: number;
  internalSelectedIds: T[];
  createdOptions: InputOption<T>[];
  asyncOptions: InputOption<T>[];
  isLoading: boolean;
  loadError: string | null;
  latestRequestId: number;
}

/**
 * Mithril Factory Component for Multi-Select Dropdown with search
 */
export const SearchSelect = <T extends string | number>(
  maybeVnode?: m.Vnode<
    SearchSelectAttrs<T>,
    {
      __searchSelectInstance?: Component<SearchSelectAttrs<T>, SearchSelectState<T>>;
    }
  >
): Component<SearchSelectAttrs<T>, SearchSelectState<T>> => {
  const cachedInstance = maybeVnode?.state?.__searchSelectInstance;
  if (cachedInstance) {
    return cachedInstance;
  }

  // State initialization
  const state: SearchSelectState<T> = {
    id: '',
    listboxId: '',
    isOpen: false,
    searchTerm: '',
    inputRef: null,
    dropdownRef: null,
    focusedIndex: -1,
    internalSelectedIds: [],
    createdOptions: [],
    asyncOptions: [],
    isLoading: false,
    loadError: null,
    latestRequestId: 0,
  };

  const updateAsyncState = (nextState: AsyncComboboxState<InputOption<T>>) => {
    state.asyncOptions = nextState.options;
    state.isLoading = nextState.isLoading;
    state.loadError = nextState.error;
    state.latestRequestId = nextState.latestRequestId;
  };

  const readAsyncState = (): AsyncComboboxState<InputOption<T>> => ({
    options: state.asyncOptions,
    isLoading: state.isLoading,
    error: state.loadError,
    latestRequestId: state.latestRequestId,
  });

  const isControlled = (attrs: SearchSelectAttrs<T>) =>
    attrs.checkedId !== undefined && typeof attrs.onchange === 'function';

  const componentId = uniqueId();
  const searchInputId = `${componentId}-search`;

  // Handle click outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    const targetElement = e.target instanceof Element ? e.target : null;
    if (state.dropdownRef && state.dropdownRef.contains(target)) {
      // Click inside dropdown, do nothing
      return;
    }
    if (targetElement && targetElement.closest('.chips-container')) {
      // Click on trigger, do nothing
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

  // Handle keyboard navigation through shared combobox primitive.
  const handleKeyDown = (e: KeyboardEvent, optionCount: number, includeActionRow: boolean) => {
    const result = getComboboxKeyResult({
      key: e.key,
      isOpen: state.isOpen,
      focusedIndex: state.focusedIndex,
      optionCount,
      includeActionRow,
    });

    if (result.preventDefault) {
      e.preventDefault();
    }

    state.isOpen = result.isOpen;
    state.focusedIndex = result.focusedIndex;
    return result.action;
  };

  const loadAsyncOptions = async (attrs: SearchSelectAttrs<T>, query: string) => {
    if (!attrs.loadOptions) {
      return;
    }

    const started = startAsyncComboboxRequest(readAsyncState());
    updateAsyncState(started.nextState);
    m.redraw();

    try {
      const loadedOptions = await attrs.loadOptions(query);
      const resolved = resolveAsyncComboboxRequest(readAsyncState(), started.requestId, loadedOptions);
      updateAsyncState(resolved);
      if (started.requestId !== state.latestRequestId) {
        return;
      }
      if (state.focusedIndex >= loadedOptions.length) {
        state.focusedIndex = -1;
      }
    } catch (error) {
      const rejected = rejectAsyncComboboxRequest(
        readAsyncState(),
        started.requestId,
        error instanceof Error ? error.message : 'Unable to load options'
      );
      updateAsyncState(rejected);
      if (started.requestId !== state.latestRequestId) {
        return;
      }
      state.focusedIndex = -1;
    } finally {
      m.redraw();
    }
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

  const componentInstance: Component<SearchSelectAttrs<T>, SearchSelectState<T>> = {
    oninit: ({ attrs }) => {
      state.id = attrs.id || uniqueId();
      state.listboxId = `${state.id}-listbox`;

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
        loadOptions,
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
        loadingOptions: i18n.loadingOptions || 'Loading options...',
        loadingError: i18n.loadingError || 'Unable to load options',
        addNewPrefix: i18n.addNewPrefix || '+',
        showingXofY: i18n.showingXofY || 'Showing {shown} of {total} options',
        maxSelectionsReached: i18n.maxSelectionsReached || 'Maximum {max} selections reached',
      };

      // Check if max selections is reached
      const isMaxSelectionsReached = maxSelectedOptions && selectedIds.length >= maxSelectedOptions;

      // In async mode, the active list is sourced remotely.
      const sourceOptions = loadOptions ? state.asyncOptions : options;

      // Merge active options with internally created options
      const allOptions = [...sourceOptions, ...state.createdOptions];

      // Keep selected label lookups stable across static, async, and created sets.
      const lookupOptions = [...options, ...state.asyncOptions, ...state.createdOptions];

      // Get selected options for display
      const selectedOptionsUnsorted = lookupOptions.filter((opt) => selectedIds.includes(opt.id));
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

      const activeDescendantId =
        state.isOpen && state.focusedIndex >= 0 && state.focusedIndex < displayedOptions.length
          ? getComboboxOptionId(state.id, state.focusedIndex)
          : undefined;
      const viewState = getComboboxViewState({
        isLoading: state.isLoading,
        error: state.loadError,
        optionCount: displayedOptions.length,
      });

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
              const wasOpen = state.isOpen;
              state.isOpen = !state.isOpen;
              if (!wasOpen && state.isOpen && loadOptions) {
                void loadAsyncOptions(attrs, state.searchTerm);
              }
              // console.log('SearchSelect state changed to', state.isOpen); // Debug log
            },
            onkeydown: async (e: KeyboardEvent) => {
              const action = handleKeyDown(e, displayedOptions.length, !!showAddNew);
              if (action === 'open' && loadOptions) {
                await loadAsyncOptions(attrs, state.searchTerm);
                return;
              }
              if (action === 'selectAction' && oncreateNewOption) {
                await createAndSelectOption(attrs);
              }
              if (action === 'selectFocused' && state.focusedIndex < displayedOptions.length) {
                toggleOption(displayedOptions[state.focusedIndex], attrs);
              }
            },
            class: 'chips chips-container mm-layout-row mm-layout-row--wrap mm-layout-row--align-end',
            role: 'combobox',
            tabindex: 0,
            'aria-expanded': state.isOpen ? 'true' : 'false',
            'aria-haspopup': 'listbox',
            'aria-controls': state.isOpen ? state.listboxId : undefined,
            'aria-activedescendant': activeDescendantId,
            style: {
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
              style: {
                position: 'absolute',
                width: '1px',
                height: '1px',
                margin: '-1px',
                padding: 0,
                border: 0,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(50%)',
                whiteSpace: 'nowrap',
              },
            }),

            // Selected Options (chips)
            ...selectedOptions.map((option) =>
              SelectedChip({
                option: option as InputOption<T>,
                onRemove: (id: T) => removeOption(id, attrs),
              })
            ),

            // Placeholder when no options selected
            selectedOptions.length === 0 &&
              placeholder &&
              m(
                'span.placeholder',
                {
                  class: 'mm-layout-grow',
                  style: {
                    color: 'var(--mm-text-hint, #9e9e9e)',
                    padding: '8px 0',
                  },
                },
                placeholder
              ),

            // Spacer to push caret to the right
            m('span.spacer.mm-layout-grow'),

            m(MaterialIcon, {
              name: 'caret',
              direction: state.isOpen ? 'up' : 'down',
              class: 'caret mm-layout-ml-auto',
              style: { cursor: 'pointer' },
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
              id: state.listboxId,
              role: 'listbox',
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
                      if (loadOptions) {
                        void loadAsyncOptions(attrs, state.searchTerm);
                      }
                    },
                    onkeydown: async (e: KeyboardEvent) => {
                      const action = handleKeyDown(e, displayedOptions.length, !!showAddNew);
                      if (action === 'open' && loadOptions) {
                        await loadAsyncOptions(attrs, state.searchTerm);
                      } else if (action === 'selectAction' && oncreateNewOption) {
                        await createAndSelectOption(attrs);
                      } else if (action === 'selectFocused' && state.focusedIndex < displayedOptions.length) {
                        toggleOption(displayedOptions[state.focusedIndex], attrs);
                      }
                    },
                    class: 'search-select-input',
                    'aria-autocomplete': 'list',
                    'aria-controls': state.listboxId,
                  }),
                ]
              ),

              // Async loading status
              ...(viewState === 'loading'
                ? [m('li.search-select-loading-info', { role: 'status', 'aria-live': 'polite' }, texts.loadingOptions)]
                : []),

              // Async loading error
              ...(viewState === 'error' && state.loadError
                ? [
                    m(
                      'li.search-select-error-info',
                      { role: 'status', 'aria-live': 'assertive' },
                      `${texts.loadingError}: ${state.loadError}`
                    ),
                  ]
                : []),

              // No options found message or list of options
              ...(viewState === 'empty' && !showAddNew ? [m('li.search-select-no-options', texts.noOptionsFound)] : []),

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
                        id: `${state.listboxId}-action`,
                        role: 'option',
                        'aria-selected': 'false',
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
                DropdownOption({
                  option,
                  index,
                  optionId: getComboboxOptionId(state.id, index),
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

  if (maybeVnode?.state) {
    maybeVnode.state.__searchSelectInstance = componentInstance;
  }

  return componentInstance;
};
