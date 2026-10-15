import m, { Attributes, Component } from 'mithril';
import { InputOption } from './option';
import {
  getDropdownStyles,
  uniqueId,
  sortOptions,
  normalizeSelection,
  renderFieldChrome,
} from './utils';
import { MaterialIcon } from './material-icon';
import { Icon } from './icon';
import { ComponentStyle } from './types';
import { createControllableFieldState } from './controllable-field';
import { createSelectionInteraction } from './combobox';
import { createPortalHandle, type PortalHandle } from './portal';

export type SortSelected<T extends string | number> =
  | 'asc'
  | 'desc'
  | 'none'
  | ((a: InputOption<T>, b: InputOption<T>) => number);

export type SelectSummaryMode = 'labels' | 'count' | 'all-or-count';
export type SelectAppearance = 'standard' | 'outlined';

export interface SelectAttrs<T extends string | number> extends Attributes {
  /** Options to select from */
  options: InputOption<T>[];
  /** Called when the selection changes, contains all selected (checked) ids as an array */
  onchange?: (checkedIds: T[]) => void;
  /**
   * Currently selected id or ids. For controlled mode, pass the current selection and provide onchange.
   * For single select, pass a single value or array with one item.
   * For multiple select, pass an array of selected ids.
   */
  checkedId?: T | T[];
  /**
   * Default selected id or ids for uncontrolled mode. Only used when checkedId and onchange are not provided.
   * The component will manage its own internal state in uncontrolled mode.
   */
  defaultCheckedId?: T | T[];
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
  /** Built-in icon names render as SVG; other names need the Material Icons font. */
  iconName?: string;
  /** Sets the input field to disabled. */
  disabled?: boolean;
  /** Optional style information. */
  style?: ComponentStyle;
  /** If true, break to a new row */
  newRow?: boolean;
  /**
   * If true, add a mandatory * after the label (if any),
   * and mark the combobox as required for assistive technology.
   */
  isMandatory?: boolean;
  /** Mark the combobox as required for assistive technology. */
  required?: boolean;
  /** Enable the clear icon */
  showClearButton?: boolean;
  /** Max height of the dropdown menu, default '400px' */
  maxHeight?: string;
  /** Sort selected items: 'asc' (alphabetically A-Z), 'desc' (Z-A), 'none' (insertion order), or custom sort function */
  sortSelected?: SortSelected<T>;
  /** Display mode for selected values in the input field. Defaults to 'labels'. */
  summaryMode?: SelectSummaryMode;
  /** Label shown when all selectable options are selected in summary mode 'all-or-count'. */
  allSelectedLabel?: string;
  /** Label shown when no options are selected in summary mode 'all-or-count'. */
  noneSelectedLabel?: string;
  /** Custom formatter for count-based summary modes. */
  countLabel?: (selectedCount: number, totalCount: number) => string;
  /** Visual style of the trigger. Defaults to 'standard'. */
  appearance?: SelectAppearance;
}

interface SelectState {
  id: string;
  dropdownId: string;
  isOpen: boolean;
  focusedIndex: number;
  rootRef?: HTMLElement | null;
  inputRef?: HTMLElement | null;
  dropdownRef?: HTMLElement | null;
  isInsideModal: boolean;
  isMultiple: boolean;
}

/** Select component */
export const Select = <T extends string | number>(): Component<SelectAttrs<T>> => {
  const state: SelectState = {
    id: '',
    dropdownId: '',
    isOpen: false,
    focusedIndex: -1,
    inputRef: null,
    dropdownRef: null,
    isInsideModal: false,
    isMultiple: false,
  };
  let dropdownPortal: PortalHandle | undefined;

  const valueState = createControllableFieldState<SelectAttrs<T>, T[]>({
    controlled: (attrs) => attrs.checkedId !== undefined && attrs.onchange !== undefined,
    value: (attrs) => normalizeSelection(attrs.checkedId),
    defaultValue: (attrs) => normalizeSelection(attrs.defaultCheckedId),
    fallback: () => [],
    nonInteractive: (attrs) => attrs.disabled,
    warning: (attrs) =>
      attrs.checkedId !== undefined
        ? `Select component received 'checkedId' prop without 'onchange' handler. ` +
          `Use 'defaultCheckedId' for uncontrolled components or add 'onchange' for controlled components.`
        : undefined,
  });
  const interaction = createSelectionInteraction<T>();

  const isSelected = (id: T, selectedIds: T[]) => {
    return selectedIds.some((selectedId) => selectedId === id);
  };

  const toggleOption = (option: InputOption<T>, multiple: boolean, attrs: SelectAttrs<T>) => {
    const result = interaction.selection({
      type: 'toggle',
      selectedIds: valueState.current(attrs),
      option,
      mode: multiple ? 'multiple' : 'single',
    });
    if (!result.accepted) return;

    valueState.update(attrs, result.selectedIds);
    if (result.close) {
      state.isOpen = false;
    }
    if (attrs.onchange) {
      attrs.onchange(result.selectedIds);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, attrs: SelectAttrs<T>) => {
    const result = interaction.keyboard({
      key: e.key,
      isOpen: state.isOpen,
      focusedIndex: state.focusedIndex,
      options: attrs.options,
      openOnArrowUp: false,
    });
    if (result.preventDefault) {
      e.preventDefault();
    }

    state.isOpen = result.isOpen;
    state.focusedIndex = result.focusedIndex;
    if (result.action === 'selectFocused') {
      const option = attrs.options[result.focusedIndex];
      if (option) {
        toggleOption(option, attrs.multiple || false, attrs);
      }
    }
  };

  const closeDropdown = (e: MouseEvent) => {
    if (!state.isOpen) return;
    const target = e.target as Node;
    // The trigger toggles the dropdown itself
    if (state.inputRef?.contains(target)) return;
    if (state.isMultiple) {
      // Only clicks inside this select (or its portaled dropdown) keep a multi-select open
      const isClickInsideSelect = !!state.rootRef?.contains(target);
      const isClickInsidePortalDropdown = !!state.dropdownRef?.contains(target);
      if (isClickInsideSelect || isClickInsidePortalDropdown) return;
    }
    state.isOpen = false;
    m.redraw();
  };

  const getPortalStyles = (inputRef: HTMLElement | null | undefined) => {
    if (!inputRef) return {};

    const rect = inputRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Choose whether to show above or below based on available space
    const showAbove = spaceBelow < 200 && spaceAbove > spaceBelow;

    return {
      position: 'fixed',
      top: showAbove ? 'auto' : `${rect.bottom}px`,
      bottom: showAbove ? `${viewportHeight - rect.top}px` : 'auto',
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: 10000, // Higher than modal z-index
      maxHeight: showAbove ? `${spaceAbove - 20}px` : `${spaceBelow - 20}px`, // Leave 20px margin
      overflow: 'auto',
      display: 'block',
      opacity: 1,
    };
  };

  const formatSelectionSummary = (
    attrs: SelectAttrs<T>,
    selectedLabels: string[],
    selectedIds: T[],
    placeholder: string
  ) => {
    const mode = attrs.summaryMode || 'labels';
    const selectedCount = selectedIds.length;
    const totalCount = attrs.options.filter((option) => !option.disabled).length;

    if (mode === 'labels') {
      return selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder;
    }

    const defaultCountLabel = `${selectedCount}/${totalCount} selected`;
    const formattedCount = attrs.countLabel ? attrs.countLabel(selectedCount, totalCount) : defaultCountLabel;

    if (mode === 'count') {
      return selectedCount > 0 ? formattedCount : placeholder;
    }

    if (selectedCount === 0) {
      return attrs.noneSelectedLabel || placeholder;
    }

    if (totalCount > 0 && selectedCount >= totalCount) {
      return attrs.allSelectedLabel || 'All selected';
    }

    return formattedCount;
  };

  const renderDropdownContent = (attrs: SelectAttrs<T>, selectedIds: T[], multiple: boolean, placeholder: string) => [
    placeholder && m('li.disabled', m('span', placeholder)),
    // Render ungrouped options first
    attrs.options
      .filter((option) => !option.group)
      .map((option) =>
        m(
          'li',
          {
            class: `${option.disabled ? 'disabled' : ''}${
              isSelected(option.id, selectedIds) ? ' selected' : ''
            }${state.focusedIndex === attrs.options.indexOf(option) ? ' focused' : ''}`,
            ...(option.disabled
              ? {}
              : {
                  onclick: () => {
                    toggleOption(option, multiple, attrs);
                  },
                }),
          },
          [
            option.img && m('img', { src: option.img, alt: option.label }),
            m(
              'span',
              [
                multiple
                  ? m(
                      'label',
                      { for: option.id },
                      m('input', {
                        id: option.id,
                        type: 'checkbox',
                        tabindex: -1,
                        checked: selectedIds.includes(option.id),
                        disabled: option.disabled ? true : undefined,
                        onclick: (e: MouseEvent) => {
                          e.stopPropagation();
                        },
                      }),
                      m('span', option.label)
                    )
                  : m('span', option.label),
              ].filter(Boolean)
            ),
          ]
        )
      ),
    // Render grouped options
    Object.entries(
      attrs.options
        .filter((option) => option.group)
        .reduce(
          (groups, option) => {
            const group = option.group!;
            if (!groups[group]) groups[group] = [];
            groups[group].push(option);
            return groups;
          },
          {} as { [key: string]: (typeof attrs.options)[0][] }
        )
    )
      .map(([groupName, groupOptions]) => [
        m('li.optgroup', m('span', groupName)),
        ...groupOptions.map((option) =>
          m(
            'li',
            {
              class: `optgroup-option${option.disabled ? ' disabled' : ''}${
                isSelected(option.id, selectedIds) ? ' selected' : ''
              }${state.focusedIndex === attrs.options.indexOf(option) ? ' focused' : ''}`,
              ...(option.disabled
                ? {}
                : {
                    onclick: (e: MouseEvent) => {
                      e.stopPropagation();
                      toggleOption(option, multiple, attrs);
                    },
                  }),
            },
            [
              option.img && m('img', { src: option.img, alt: option.label }),
              m(
                'span',
                [
                  multiple
                    ? m(
                        'label',
                        { for: option.id },
                        m('input', {
                          id: option.id,
                          type: 'checkbox',
                          tabindex: -1,
                          checked: selectedIds.includes(option.id),
                          disabled: option.disabled ? true : undefined,
                          onclick: (e: MouseEvent) => {
                            e.stopPropagation();
                          },
                        }),
                        m('span', option.label)
                      )
                    : m('span', option.label),
                ].filter(Boolean)
              ),
            ]
          )
        ),
      ])
      .reduce((acc, val) => acc.concat(val), []),
  ];

  const updatePortalDropdown = (attrs: SelectAttrs<T>, selectedIds: T[], multiple: boolean, placeholder: string) => {
    if (!state.isInsideModal) return;

    // Create dropdown with proper positioning
    const dropdownVnode = m(
      'ul.dropdown-content.select-dropdown',
      {
        tabindex: -1,
        style: {
          ...getPortalStyles(state.inputRef),
          ...(attrs.maxHeight ? { maxHeight: attrs.maxHeight } : {}),
          // The full-screen portal container has pointer-events disabled so it
          // does not block the modal. Re-enable them for the actual menu.
          pointerEvents: 'auto',
        },
        oncreate: ({ dom }) => {
          state.dropdownRef = dom as HTMLElement;
        },
        onremove: () => {
          state.dropdownRef = null;
        },
      },
      renderDropdownContent(attrs, selectedIds, multiple, placeholder)
    );

    dropdownPortal?.sync(state.isOpen && state.inputRef ? dropdownVnode : null);
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id || uniqueId();
      state.dropdownId = `${state.id}-dropdown`;
      dropdownPortal = createPortalHandle({ id: state.dropdownId, zIndex: 10000 });

      valueState.sync(attrs);

      // Add global click listener to close dropdown
      document.addEventListener('click', closeDropdown);
    },

    oncreate: ({ dom }) => {
      state.rootRef = dom as HTMLElement;
      // Detect if component is inside a modal
      state.isInsideModal = !!dom.closest('.modal');
    },

    onupdate: ({ dom }) => {
      state.rootRef = dom as HTMLElement;
    },

    onremove: () => {
      state.rootRef = null;
      // Cleanup global listener
      document.removeEventListener('click', closeDropdown);

      dropdownPortal?.dispose();
    },

    view: ({ attrs }) => {
      const {
        newRow,
        className = 'col s12',
        key,
        options = [],
        multiple = false,
        label,
        helperText,
        placeholder = '',
        isMandatory,
        iconName,
        appearance = 'standard',
        style,
        disabled,
      } = attrs;
      state.isMultiple = multiple;
      valueState.sync(attrs);
      // Get selected IDs from props or internal state
      const selectedIds = valueState.current(attrs);

      const layoutClassName = newRow ? `${className} clear` : className;
      const appearanceClassName = appearance === 'outlined' ? 'select-appearance-outlined' : '';
      const finalClassName = [layoutClassName, appearanceClassName].filter(Boolean).join(' ');
      const shouldInlineLabel = appearance === 'outlined' && !!label;
      const selectedOptionsUnsorted = options.filter((opt) => isSelected(opt.id, selectedIds));
      const selectedOptions = sortOptions(selectedOptionsUnsorted, attrs.sortSelected);
      const selectedLabels = selectedOptions.map((o) => o.label || o.id.toString());
      const triggerValue = formatSelectionSummary(attrs, selectedLabels, selectedIds, placeholder);

      // Update portal dropdown when inside modal
      if (state.isInsideModal) {
        updatePortalDropdown(attrs, selectedIds, multiple, placeholder);
      }

      return m(
        '.input-field.select-space',
        {
          className: finalClassName,
          key,
          style,
        },
        [
          // Icon prefix
          iconName && m(Icon, { iconName, className: 'prefix' }),
          m(
            '.select-wrapper',
            {
              onkeydown: disabled ? undefined : (e: KeyboardEvent) => handleKeyDown(e, attrs),
            },
            [
              shouldInlineLabel &&
                m('label.select-inline-label', { id: `${state.id}-label`, for: state.id }, [
                  label,
                  isMandatory && m('span.mandatory', { 'aria-hidden': 'true', style: { marginLeft: '2px' } }, '*'),
                ]),
              m('input[type=text][readonly=true].select-dropdown.dropdown-trigger', {
                id: state.id,
                value: triggerValue,
                role: 'combobox',
                tabindex: disabled ? -1 : 0,
                'aria-expanded': state.isOpen ? 'true' : 'false',
                'aria-haspopup': 'listbox',
                'aria-controls': state.dropdownId,
                'aria-disabled': disabled ? 'true' : undefined,
                'aria-required': isMandatory || attrs.required ? 'true' : undefined,
                'aria-label':
                  attrs['aria-label'] ||
                  (!label ? placeholder || (multiple ? 'Select options' : 'Select option') : undefined),
                'aria-labelledby':
                  attrs['aria-label'] || !shouldInlineLabel ? undefined : `${state.id}-label`,
                oncreate: ({ dom }) => {
                  state.inputRef = dom as HTMLElement;
                },
                onclick: (e: Event) => {
                  // Let the click bubble so other open selects/dropdowns can close themselves
                  e.preventDefault();
                  if (!disabled) {
                    state.isOpen = !state.isOpen;
                  }
                },
              }),
              // Dropdown Menu - render inline only when NOT inside modal
              state.isOpen &&
                !state.isInsideModal &&
                m(
                  'ul.dropdown-content.select-dropdown',
                  {
                    tabindex: -1,
                    oncreate: ({ dom }) => {
                      state.dropdownRef = dom as HTMLElement;
                    },
                    onremove: () => {
                      state.dropdownRef = null;
                    },
                    style: {
                      ...getDropdownStyles(state.inputRef, true, options),
                      ...(attrs.maxHeight ? { maxHeight: attrs.maxHeight } : {}),
                    },
                  },
                  renderDropdownContent(attrs, selectedIds, multiple, placeholder)
                ),
              m(MaterialIcon, {
                name: 'caret',
                direction: 'down',
                class: 'caret',
                'aria-hidden': 'true',
              }),
            ]
          ),

          // Label
          ...renderFieldChrome({
            label: shouldInlineLabel ? undefined : label,
            id: state.id,
            isMandatory,
            helperText,
          }),
        ]
      );
    },
  };
};
