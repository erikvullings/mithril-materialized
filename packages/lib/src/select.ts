import m, { Attributes, Component } from 'mithril';
import { Label, HelperText } from './label';
import { InputOption } from './option';
import { getDropdownStyles, uniqueId } from './utils';
import { MaterialIcon } from './material-icon';

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
  focusedIndex: number;
  inputRef?: HTMLElement | null;
  dropdownRef?: HTMLElement | null;
  internalSelectedIds: T[];
}

/** Select component */
export const Select = <T extends string | number>(): Component<SelectAttrs<T>> => {
  const state: SelectState<T> = {
    id: '',
    isOpen: false,
    focusedIndex: -1,
    inputRef: null,
    dropdownRef: null,
    internalSelectedIds: [],
  };

  const isControlled = (attrs: SelectAttrs<T>) => attrs.checkedId !== undefined && attrs.onchange !== undefined;

  const isSelected = (id: T, selectedIds: T[]) => {
    return selectedIds.some((selectedId) => selectedId === id);
  };

  const toggleOption = (id: T, multiple: boolean, attrs: SelectAttrs<T>) => {
    const controlled = isControlled(attrs);

    // Get current selected IDs from props or internal state
    const currentSelectedIds = controlled
      ? attrs.checkedId !== undefined
        ? Array.isArray(attrs.checkedId)
          ? attrs.checkedId
          : [attrs.checkedId]
        : []
      : state.internalSelectedIds;

    let newIds: T[];
    if (multiple) {
      newIds = currentSelectedIds.includes(id)
        ? currentSelectedIds.filter((selectedId) => selectedId !== id)
        : [...currentSelectedIds, id];
    } else {
      newIds = [id];
      state.isOpen = false; // Close dropdown for single select
    }

    // Update internal state for uncontrolled mode
    if (!controlled) {
      state.internalSelectedIds = newIds;
    }

    // Call onchange if provided
    if (attrs.onchange) {
      attrs.onchange(newIds);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, attrs: SelectAttrs<T>) => {
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
    if (!target.closest('.input-field.select-space')) {
      state.isOpen = false;
      m.redraw();
    }
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id || uniqueId();

      const controlled = isControlled(attrs);

      // Warn developer for improper controlled usage
      if (attrs.checkedId !== undefined && !controlled && !attrs.disabled) {
        console.warn(
          `Select component received 'checkedId' prop without 'onchange' handler. ` +
            `Use 'defaultCheckedId' for uncontrolled components or add 'onchange' for controlled components.`
        );
      }

      // Initialize internal state for uncontrolled mode
      if (!controlled) {
        const defaultIds =
          attrs.defaultCheckedId !== undefined
            ? Array.isArray(attrs.defaultCheckedId)
              ? attrs.defaultCheckedId
              : [attrs.defaultCheckedId]
            : [];
        state.internalSelectedIds = defaultIds;
      }

      // Add global click listener to close dropdown
      document.addEventListener('click', closeDropdown);
    },

    onremove: () => {
      // Cleanup global listener
      document.removeEventListener('click', closeDropdown);
    },

    view: ({ attrs }) => {
      const controlled = isControlled(attrs);
      const { disabled } = attrs;

      // Get selected IDs from props or internal state
      let selectedIds: T[];
      if (controlled) {
        selectedIds =
          attrs.checkedId !== undefined ? (Array.isArray(attrs.checkedId) ? attrs.checkedId : [attrs.checkedId]) : [];
      } else if (disabled) {
        // Non-interactive components: prefer defaultCheckedId, fallback to checkedId
        const fallbackId = attrs.defaultCheckedId ?? attrs.checkedId;
        selectedIds = fallbackId !== undefined ? (Array.isArray(fallbackId) ? fallbackId : [fallbackId]) : [];
      } else {
        // Interactive uncontrolled: use internal state
        selectedIds = state.internalSelectedIds;
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
        style,
      } = attrs;

      const finalClassName = newRow ? `${className} clear` : className;
      const selectedOptions = options.filter((opt) => isSelected(opt.id, selectedIds));

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
                  if (!disabled) {
                    state.isOpen = !state.isOpen;
                  }
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
                    // Render ungrouped options first
                    options
                      .filter((option) => !option.group)
                      .map((option) =>
                        m(
                          'li',
                          {
                            key: option.id,
                            class: option.disabled
                              ? 'disabled'
                              : state.focusedIndex === options.indexOf(option)
                              ? 'focused'
                              : '',
                            ...(option.disabled
                              ? {}
                              : {
                                  onclick: (e: MouseEvent) => {
                                    e.stopPropagation();
                                    toggleOption(option.id, multiple, attrs);
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
                      options
                        .filter((option) => option.group)
                        .reduce((groups, option) => {
                          const group = option.group!;
                          if (!groups[group]) groups[group] = [];
                          groups[group].push(option);
                          return groups;
                        }, {} as { [key: string]: InputOption<T>[] })
                    )
                      .map(([groupName, groupOptions]) => [
                        m('li.optgroup', { key: `group-${groupName}`, tabindex: 0 }, m('span', groupName)),
                        ...groupOptions.map((option) =>
                          m(
                            'li',
                            {
                              key: option.id,
                              class: `optgroup-option${option.disabled ? ' disabled' : ''}${
                                isSelected(option.id, selectedIds) ? ' selected' : ''
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
                  ]
                ),
              m(MaterialIcon, {
                name: 'caret',
                direction: 'down',
                class: 'caret',
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
