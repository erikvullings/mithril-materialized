import m, { Component, Attributes } from 'mithril';
import { HelperText } from './label';
import { uniqueId, getDropdownStyles } from './utils';
import { MaterialIcon } from './material-icon';

export interface DropdownItem<T extends string | number> {
  /** ID property of the selected item */
  id?: T;
  /** Label to show in the dropdown */
  label: string;
  /** Can we select the item */
  disabled?: boolean;
  /** Display a Materials Icon in front of the label */
  iconName?: string;
  /** Add a divider */
  divider?: boolean;
}

export interface DropdownAttrs<T extends string | number> extends Attributes {
  /**
   * Optional id of the dropdown element
   * @default 'dropdown'
   */
  id?: T;
  /**
   * Optional label when no item is selected
   * @default 'Select'
   */
  label?: string;
  key?: string | number;
  /** If true, disable the selection */
  disabled?: boolean;
  /** Item array to show in the dropdown. If the value is not supplied, uses he name. */
  items: DropdownItem<T>[];
  /**
   * Currently selected item id for controlled mode. If provided along with `onchange`, the component operates in controlled mode
   * where the parent manages the state. The parent must update this value in response to `onchange` callbacks.
   */
  checkedId?: T;
  /**
   * Default selected item id for uncontrolled mode. Only used when `checkedId` and `onchange` are not provided.
   * The component will manage its own internal state in uncontrolled mode.
   */
  defaultCheckedId?: T;
  /** When a value or name is selected. Optional for uncontrolled mode. */
  onchange?: (value: T) => void;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
  /** Max height of the dropdown menu, default '400px', use 'none' to disable it */
  maxHeight?: string;
}

interface DropdownState<T extends string | number> {
  isOpen: boolean;
  id: string;
  focusedIndex: number;
  inputRef?: HTMLElement | null;
  dropdownRef?: HTMLElement | null;
  internalCheckedId?: T;
  isInsideModal: boolean;
}

/** Pure TypeScript Dropdown component - no Materialize dependencies */
export const Dropdown = <T extends string | number>(): Component<DropdownAttrs<T>> => {
  const state: DropdownState<T> = {
    isOpen: false,
    id: '',
    focusedIndex: -1,
    inputRef: null,
    dropdownRef: null,
    internalCheckedId: undefined,
    isInsideModal: false,
  };

  const isControlled = (attrs: DropdownAttrs<T>) =>
    attrs.checkedId !== undefined && typeof attrs.onchange === 'function';

  const closeDropdown = () => {
    state.isOpen = false;
    m.redraw(); // Needed to remove the dropdown options list (potentially added to document root)
  };

  const handleKeyDown = (e: KeyboardEvent, items: DropdownItem<T>[]): T | undefined => {
    const availableItems = items.filter((item) => !item.divider && !item.disabled);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = availableItems.length > 0 ? 0 : -1;
        } else {
          state.focusedIndex = (state.focusedIndex + 1) % availableItems.length;
        }
        return undefined;
      case 'ArrowUp':
        e.preventDefault();
        if (state.isOpen) {
          state.focusedIndex = state.focusedIndex <= 0 ? availableItems.length - 1 : state.focusedIndex - 1;
        }
        return undefined;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (state.isOpen && state.focusedIndex >= 0 && state.focusedIndex < availableItems.length) {
          const selectedItem = availableItems[state.focusedIndex];
          const value = (selectedItem.id || selectedItem.label) as T;
          state.isOpen = false;
          state.focusedIndex = -1;
          return value;
        } else if (!state.isOpen) {
          state.isOpen = true;
          state.focusedIndex = availableItems.length > 0 ? 0 : -1;
        }
        return undefined;
      case 'Escape':
        e.preventDefault();
        state.isOpen = false;
        state.focusedIndex = -1;
        return undefined;
      default:
        return undefined;
    }
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
      zIndex: 10000,
      maxHeight: showAbove ? `${spaceAbove - 20}px` : `${spaceBelow - 20}px`,
      overflow: 'auto',
      display: 'block',
      opacity: 1,
    };
  };

  const updatePortalDropdown = (
    items: DropdownItem<T>[],
    selectedLabel: string,
    onSelectItem: (item: DropdownItem<T>) => void,
    maxHeight?: string
  ) => {
    if (!state.isInsideModal) return;

    // Clean up existing portal
    const existingPortal = document.getElementById(`${state.id}-dropdown`);
    if (existingPortal) {
      existingPortal.remove();
    }

    if (!state.isOpen || !state.inputRef) return;

    // Create portal element
    const portalElement = document.createElement('div');
    portalElement.id = `${state.id}-dropdown`;
    document.body.appendChild(portalElement);

    // Create dropdown content
    const availableItems = items.filter((item) => !item.divider && !item.disabled);
    const dropdownContent = items.map((item) => {
      if (item.divider) {
        return m('li.divider');
      }

      const itemIndex = availableItems.indexOf(item);
      const isSelected = selectedLabel === item.label;
      const isFocused = state.focusedIndex === itemIndex;

      return m(
        'li',
        {
          class: `${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''}${item.disabled ? ' disabled' : ''}`,
          onclick: item.disabled ? undefined : () => onSelectItem(item),
        },
        m(
          'span',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              padding: '14px 16px',
            },
          },
          [
            item.iconName
              ? m(
                  'i.material-icons',
                  {
                    style: { marginRight: '32px' },
                  },
                  item.iconName
                )
              : undefined,
            item.label,
          ]
        )
      );
    });

    // Create dropdown with proper positioning
    const dropdownVnode = m(
      'ul.dropdown-content.select-dropdown',
      {
        tabindex: 0,
        style: {
          ...getPortalStyles(state.inputRef),
          ...(maxHeight ? { maxHeight } : {}),
        },
        oncreate: ({ dom }) => {
          state.dropdownRef = dom as HTMLElement;
        },
        onremove: () => {
          state.dropdownRef = null;
        },
      },
      dropdownContent
    );

    // Render to portal
    m.render(portalElement, dropdownVnode);
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id?.toString() || uniqueId();

      // Initialize internal state for uncontrolled mode
      if (!isControlled(attrs)) {
        state.internalCheckedId = attrs.defaultCheckedId;
      }

      // Add global click listener to close dropdown
      document.addEventListener('click', closeDropdown);
    },

    oncreate: ({ dom }) => {
      // Detect if component is inside a modal
      state.isInsideModal = !!dom.closest('.modal');
    },

    onremove: () => {
      // Cleanup global listener
      document.removeEventListener('click', closeDropdown);

      // Cleanup portal
      const portalElement = document.getElementById(`${state.id}-dropdown`);
      if (portalElement) {
        portalElement.remove();
      }
    },

    view: ({ attrs }) => {
      const {
        checkedId,
        key,
        label,
        onchange,
        disabled = false,
        items,
        iconName,
        helperText,
        style,
        className = 'col s12',
      } = attrs;

      const controlled = isControlled(attrs);
      const currentCheckedId = controlled ? checkedId : state.internalCheckedId;

      const handleSelection = (value: T) => {
        // Update internal state for uncontrolled mode
        if (!controlled) {
          state.internalCheckedId = value;
        }

        // Call onchange if provided
        if (onchange) {
          onchange(value);
        }
      };

      const selectedItem = currentCheckedId
        ? items
            .filter((i: DropdownItem<T>) => (i.id ? i.id === currentCheckedId : i.label === currentCheckedId))
            .shift()
        : undefined;
      const title = selectedItem ? selectedItem.label : label || 'Select';
      const availableItems = items.filter((item) => !item.divider && !item.disabled);

      // Update portal dropdown when inside modal
      if (state.isInsideModal) {
        updatePortalDropdown(
          items,
          title,
          (item) => {
            if (item.id) {
              state.isOpen = false;
              state.focusedIndex = -1;
              handleSelection(item.id);
            }
          },
          attrs.maxHeight
        );
      }

      return m('.dropdown-wrapper.input-field', { className, key, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(HelperText, { helperText }),
        m(
          '.select-wrapper',
          {
            onkeydown: disabled
              ? undefined
              : (e: KeyboardEvent) => {
                  const selectedValue = handleKeyDown(e, items);
                  if (selectedValue) {
                    handleSelection(selectedValue);
                  }
                },
            tabindex: disabled ? -1 : 0,
            'aria-expanded': state.isOpen ? 'true' : 'false',
            'aria-haspopup': 'listbox',
            role: 'combobox',
          },
          [
            m('input[type=text][readonly=true].select-dropdown.dropdown-trigger', {
              id: state.id,
              value: title,
              oncreate: ({ dom }) => {
                state.inputRef = dom as HTMLElement;
              },
              onclick: (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                if (!disabled) {
                  state.isOpen = !state.isOpen;
                  // Reset focus index when opening/closing
                  state.focusedIndex = -1;
                }
              },
            }),
            // Dropdown Menu - render inline only when NOT inside modal
            state.isOpen &&
              !state.isInsideModal &&
              m(
                'ul.dropdown-content.select-dropdown',
                {
                  tabindex: 0,
                  role: 'listbox',
                  'aria-labelledby': state.id,
                  oncreate: ({ dom }) => {
                    state.dropdownRef = dom as HTMLElement;
                  },
                  onremove: () => {
                    state.dropdownRef = null;
                  },
                  style: {
                    ...getDropdownStyles(state.inputRef, true, items, true),
                    ...(attrs.maxHeight ? { maxHeight: attrs.maxHeight } : {}),
                  },
                },
                items.map((item) => {
                  if (item.divider) {
                    return m('li.divider');
                  }

                  const itemIndex = availableItems.indexOf(item);
                  const isFocused = itemIndex === state.focusedIndex;

                  const className =
                    [
                      item.disabled ? 'disabled' : '',
                      isFocused ? 'focused' : '',
                      selectedItem?.id === item.id || selectedItem?.label === item.label ? 'selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ') || undefined;
                  return m(
                    'li',
                    {
                      className,
                      onclick: item.disabled
                        ? undefined
                        : () => {
                            const value = (item.id || item.label) as T;
                            state.isOpen = false;
                            state.focusedIndex = -1;
                            handleSelection(value);
                          },
                    },
                    m(
                      'span',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          padding: '14px 16px',
                        },
                      },
                      [
                        item.iconName
                          ? m(
                              'i.material-icons',
                              {
                                style: { marginRight: '32px' },
                              },
                              item.iconName
                            )
                          : undefined,
                        item.label,
                      ]
                    )
                  );
                })
              ),
            m(MaterialIcon, {
              name: 'caret',
              direction: 'down',
              class: 'caret',
            }),
          ]
        ),
      ]);
    },
  };
};
