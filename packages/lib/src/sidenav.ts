import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { MaterialIcon } from './material-icon';

/** Icon definition - supports material icon name, inline SVG, or image URL */
export type IconDefinition = string | { type: 'svg' | 'image'; content: string };

export interface NavbarSubItemAttrs {
  /** Text content of the submenu item */
  text: string;
  /** Optional icon - material icon name, SVG object, or image object */
  icon?: IconDefinition;
  /** Whether this submenu item is selected */
  selected?: boolean;
  /** Value for the submenu item */
  value?: any;
  /** Selection callback */
  onSelect?: (value: any, selected: boolean) => void;
}

export interface SidenavAttrs extends Attributes {
  /** Unique ID for the sidenav */
  id?: string;
  /** Whether the sidenav is open */
  isOpen?: boolean;
  /** Callback when sidenav open state changes */
  onToggle?: (isOpen: boolean) => void;
  /** Position of the sidenav */
  position?: 'left' | 'right';
  /** Whether sidenav should overlay content or push it */
  mode?: 'overlay' | 'push';
  /** Width of the sidenav in pixels (when expanded) */
  width?: number;
  /** Custom class for the sidenav */
  className?: string;
  /** Whether to show backdrop overlay */
  showBackdrop?: boolean;
  /** Close sidenav when backdrop is clicked */
  closeOnBackdropClick?: boolean;
  /** Close sidenav when escape key is pressed */
  closeOnEscape?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Fixed sidenav (always visible on larger screens) */
  fixed?: boolean;
  /** Breakpoint for responsive behavior (in pixels) */
  breakpoint?: number;
  /** Show hamburger toggle button */
  showHamburger?: boolean;
  /** Enable collapse/expand functionality */
  expandable?: boolean;
  /** Whether the sidenav is expanded (shows icons + text) */
  isExpanded?: boolean;
  /** Callback when expand state changes */
  onExpandChange?: (expanded: boolean) => void;
  /** Header item displayed before expand/collapse toggle */
  header?: SidenavItemAttrs;
  /** Footer item displayed at the bottom of the sidenav */
  footer?: SidenavItemAttrs;
}

export interface SidenavItemAttrs {
  /** Text content of the item */
  text?: string;
  /** Icon - material icon name, SVG object, or image object */
  icon?: IconDefinition;
  /** Whether this item is active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Click handler */
  onclick?: (e: Event) => void;
  /** Href for link items */
  href?: string;
  /** Custom class */
  className?: string;
  /** Whether this is a divider */
  divider?: boolean;
  /** Whether this is a subheader */
  subheader?: boolean;
  /** Submenu items */
  submenu?: NavbarSubItemAttrs[];
  /** Submenu selection mode - 'checkbox' for multi-select, 'radio' for single-select, 'none' for no indicators */
  submenuMode?: 'checkbox' | 'radio' | 'none';
  /** @internal - Whether the sidenav is expanded (passed from parent) */
  _isExpanded?: boolean;
  /** @internal - Position of the sidenav (passed from parent) */
  _position?: 'left' | 'right';
}

interface SidenavState {
  id: string;
  isOpen: boolean;
  isAnimating: boolean;
  isExpanded: boolean;
  activeItemIndex: number | null;
  selectedSubmenuItems: Map<number, Set<any>>;
}

// List of MaterialIcon SVG icons that are available
const materialIconSvgNames = [
  'caret', 'close', 'chevron', 'chevron_left', 'chevron_right', 'menu',
  'expand', 'collapse', 'check', 'radio_checked', 'radio_unchecked',
  'light_mode', 'dark_mode'
] as const;

/**
 * Helper function to render icons based on IconDefinition type
 */
const renderIcon = (icon: IconDefinition | undefined, style?: any): m.Children => {
  if (!icon) return null;

  if (typeof icon === 'string') {
    // Check if this is a MaterialIcon SVG name
    if (materialIconSvgNames.includes(icon as any)) {
      return m(MaterialIcon as any, { name: icon, style });
    }
    // Fall back to Material Icons font for other icon names
    return m('i.material-icons', { style }, icon);
  }

  if (icon.type === 'svg') {
    // Inline SVG
    return m.trust(icon.content);
  }

  if (icon.type === 'image') {
    // Image URL
    return m('img', {
      src: icon.content,
      style: { ...style, width: '24px', height: '24px', objectFit: 'contain' },
    });
  }

  return null;
};

/**
 * Helper function to render a single sidenav item (for header/footer items)
 */
const renderSidenavItem = (item: SidenavItemAttrs, isExpanded: boolean, position: 'left' | 'right'): m.Children => {
  const { text, icon, onclick, href, className = '' } = item;
  const isRightAligned = position === 'right';

  const content = isRightAligned
    ? [
        isExpanded && m('span.sidenav-item-text', { style: { 'flex': '1', 'text-align': 'left', 'margin-right': '8px' } }, text),
        renderIcon(icon, { 'min-width': '24px', 'width': '24px' }),
      ]
    : [
        renderIcon(icon, { 'min-width': '24px', 'width': '24px' }),
        isExpanded && m('span.sidenav-item-text', { style: { 'margin-left': '8px', 'flex': '1' } }, text),
      ];

  const linkStyle = {
    display: 'flex',
    'align-items': 'center',
    padding: isExpanded ? '12px 16px' : '12px 18px',
    'justify-content': isExpanded ? (isRightAligned ? 'flex-end' : 'flex-start') : 'center',
  };

  return m(
    'li',
    { class: className },
    m(
      'a',
      {
        href: href || '#!',
        onclick: onclick,
        style: linkStyle,
      },
      content
    )
  );
};

/**
 * Sidenav Component
 * A responsive navigation drawer that slides in from the side
 */
export const Sidenav: FactoryComponent<SidenavAttrs> = () => {
  let state: SidenavState;

  const handleBackdropClick = (attrs: SidenavAttrs) => {
    if (attrs.closeOnBackdropClick !== false && attrs.onToggle) {
      attrs.onToggle(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent, attrs: SidenavAttrs) => {
    if (e.key === 'Escape' && attrs.closeOnEscape !== false && attrs.onToggle) {
      attrs.onToggle(false);
      m.redraw();
    }
  };

  const setBodyOverflow = (isOpen: boolean, mode: string) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen && mode === 'overlay' ? 'hidden' : '';
    }
  };

  const toggleExpanded = (attrs: SidenavAttrs) => {
    const newExpandedState = !(attrs.isExpanded !== false);
    if (attrs.onExpandChange) {
      attrs.onExpandChange(newExpandedState);
    }
  };

  const toggleHamburger = (attrs: SidenavAttrs) => {
    const newOpenState = !state.isOpen;
    if (attrs.onToggle) {
      attrs.onToggle(newOpenState);
    }
  };

  return {
    oninit: ({ attrs }) => {
      state = {
        id: attrs.id || uniqueId(),
        isOpen: attrs.isOpen || false,
        isAnimating: false,
        isExpanded: attrs.isExpanded !== false,
        activeItemIndex: null,
        selectedSubmenuItems: new Map(),
      };

      // Set up keyboard listener
      if (typeof document !== 'undefined' && attrs.closeOnEscape !== false) {
        document.addEventListener('keydown', (e) => handleEscapeKey(e, attrs));
      }
    },

    onbeforeupdate: ({ attrs }) => {
      const wasOpen = state.isOpen;
      const isOpen = attrs.isOpen || false;

      if (wasOpen !== isOpen) {
        state.isOpen = isOpen;
        state.isAnimating = true;
        setBodyOverflow(isOpen, attrs.mode || 'overlay');

        // Clear animation state after animation completes
        setTimeout(() => {
          state.isAnimating = false;
          m.redraw();
        }, attrs.animationDuration || 300);
      }
    },

    onremove: ({ attrs }) => {
      // Clean up
      setBodyOverflow(false, attrs.mode || 'overlay');
      if (typeof document !== 'undefined' && attrs.closeOnEscape !== false) {
        document.removeEventListener('keydown', (e) => handleEscapeKey(e, attrs));
      }
    },

    view: ({ attrs, children }) => {
      const {
        position = 'left',
        mode = 'overlay',
        width = 300,
        className = '',
        showBackdrop = true,
        animationDuration = 300,
        fixed = false,
        showHamburger = false,
        expandable = false,
      } = attrs;

      const isOpen = state.isOpen;
      const collapsedWidth = 60;
      const isExpanded = attrs.isExpanded !== false;
      const currentWidth = expandable && !isExpanded ? collapsedWidth : width;

      return [
        // Backdrop (using existing materialize class) - only for overlay mode
        showBackdrop &&
          mode === 'overlay' &&
          !fixed &&
          m('.sidenav-overlay', {
            style: {
              display: isOpen ? 'block' : 'none',
              opacity: isOpen ? '1' : '0',
            },
            onclick: () => handleBackdropClick(attrs),
          }),

        // Sidenav (using existing materialize structure)
        m(
          'ul.sidenav',
          {
            id: state.id,
            class: [
              position === 'right' ? 'right-aligned' : '',
              fixed ? 'sidenav-fixed' : '',
              expandable && !isExpanded ? 'sidenav-collapsed' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ') || undefined,
            style: {
              width: `${currentWidth}px`,
              transform: isOpen ? 'translateX(0)' : position === 'left' ? 'translateX(-105%)' : 'translateX(105%)',
              'transition-duration': `${animationDuration}ms`,
              'transition-property': 'transform, width',
            },
          },
          [
            // Hamburger toggle button (inside sidenav, at the top)
            showHamburger &&
              m(
                'li.sidenav-hamburger-item',
                {
                  style: {
                    display: 'flex',
                    'justify-content': position === 'right' ? 'flex-end' : 'flex-start',
                    'align-items': 'center',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    'border-bottom': '1px solid rgba(0,0,0,0.1)',
                  },
                  onclick: () => toggleHamburger(attrs),
                },
                m(MaterialIcon, {
                  name: 'menu',
                  style: { width: '24px', height: '24px' },
                })
              ),

            // Header item (if provided, appears before expand/collapse toggle)
            attrs.header && renderSidenavItem(attrs.header, isExpanded, position),

            // Expand/collapse toggle button (if expandable, right below hamburger)
            expandable &&
              m(
                'li.sidenav-expand-toggle',
                {
                  style: {
                    display: 'flex',
                    'justify-content': position === 'right' ? 'flex-end' : 'flex-start',
                    'align-items': 'center',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    'border-bottom': '1px solid rgba(0,0,0,0.1)',
                  },
                  onclick: () => toggleExpanded(attrs),
                },
                m(MaterialIcon, {
                  name: position === 'right'
                    ? (isExpanded ? 'chevron_right' : 'chevron_left')
                    : (isExpanded ? 'chevron_left' : 'chevron_right'),
                  style: { width: '24px', height: '24px' },
                })
              ),

            // Children (menu items) - inject internal props
            Array.isArray(children)
              ? children.map((child) => {
                  if (child && typeof child === 'object' && 'tag' in child) {
                    // Clone the vnode and add internal props
                    return {
                      ...child,
                      attrs: {
                        ...child.attrs,
                        _isExpanded: isExpanded,
                        _position: position,
                      },
                    };
                  }
                  return child;
                })
              : children,

            // Footer item (if provided, appears at the bottom)
            attrs.footer && renderSidenavItem(attrs.footer, isExpanded, position),
          ]
        ),
      ];
    },
  };
};

/**
 * Sidenav Submenu Item Component
 */
const NavbarSubItem: FactoryComponent<
  NavbarSubItemAttrs & {
    mode: 'checkbox' | 'radio' | 'none';
    isExpanded: boolean;
    position: 'left' | 'right';
  }
> = () => {
  return {
    view: ({ attrs }) => {
      const { text, icon, selected = false, value, onSelect, mode, isExpanded, position = 'left' } = attrs;

      const handleClick = () => {
        if (onSelect) {
          onSelect(value !== undefined ? value : text, !selected);
        }
      };

      const isRightAligned = position === 'right';

      // Render indicator icon for checkbox/radio modes
      const indicatorIcon = mode !== 'none'
        ? m(MaterialIcon, {
            name: mode === 'checkbox' ? (selected ? 'check' : 'close') : selected ? 'radio_checked' : 'radio_unchecked',
            style: {
              width: '18px',
              height: '18px',
              opacity: mode === 'checkbox' && !selected ? '0.3' : '1',
            },
          })
        : null;

      const submenuContent = isRightAligned
        ? [
            // Right-aligned: text on left, icons on right
            isExpanded && m('span', { style: { 'flex': '1', 'text-align': 'left' } }, text),
            icon && isExpanded && renderIcon(icon, { 'font-size': '18px' }),
            indicatorIcon,
          ]
        : [
            // Left-aligned: indicator on left, text and icon on right
            indicatorIcon,
            icon && isExpanded && renderIcon(icon, { 'font-size': '18px', 'margin-left': indicatorIcon ? '8px' : '0' }),
            isExpanded && m('span', { style: { 'margin-left': icon || indicatorIcon ? '8px' : '0' } }, text),
          ];

      return m(
        'li.sidenav-subitem',
        {
          class: selected ? 'selected' : '',
          style: {
            padding: isExpanded ? '0 16px 0 48px' : '0 16px',
            cursor: 'pointer',
            display: 'flex',
            'align-items': 'center',
            gap: '8px',
            'font-size': '0.9em',
            'justify-content': isRightAligned ? 'space-between' : 'flex-start',
            height: '48px',
            'min-height': '48px',
          },
          onclick: handleClick,
        },
        submenuContent
      );
    },
  };
};

/**
 * Sidenav Item Component
 * Individual items for the sidenav menu
 */
export const SidenavItem: FactoryComponent<SidenavItemAttrs> = () => {
  let isSubmenuOpen = false;

  return {
    view: ({ attrs, children }) => {
      const {
        text,
        icon,
        active = false,
        disabled = false,
        onclick,
        href,
        className = '',
        divider = false,
        subheader = false,
        submenu = [],
        submenuMode = 'checkbox',
      } = attrs;

      if (divider) {
        return m('li.divider');
      }

      if (subheader) {
        return m('li.subheader', text || children);
      }

      const hasSubmenu = submenu && submenu.length > 0;
      const itemClasses = [
        active ? 'active' : '',
        disabled ? 'disabled' : '',
        hasSubmenu ? 'has-submenu' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ') || undefined;

      const handleMainClick = (e: Event) => {
        if (hasSubmenu) {
          e.preventDefault();
          isSubmenuOpen = active ? !isSubmenuOpen : true;
        }
        if (onclick && !disabled) {
          onclick(e);
        }
      };

      // Get internal props passed from parent Sidenav
      const isExpanded = attrs._isExpanded !== false;
      const position = attrs._position || 'left';
      const isRightAligned = position === 'right';

      // In expanded mode, icons are at the outside edge
      // In collapsed mode, icons are centered
      const content = isRightAligned
        ? [
            // Right-aligned: text on left, icon on right
            isExpanded && m('span.sidenav-item-text', { style: { 'flex': '1', 'text-align': 'left', 'margin-right': '8px' } }, text || children),
            renderIcon(icon, { 'min-width': '24px', 'width': '24px' }),
          ]
        : [
            // Left-aligned: icon on left, text on right
            renderIcon(icon, { 'min-width': '24px', 'width': '24px' }),
            isExpanded && m('span.sidenav-item-text', { style: { 'margin-left': '8px', 'flex': '1' } }, text || children),
          ];

      const linkStyle = {
        display: 'flex',
        'align-items': 'center',
        padding: isExpanded ? '12px 16px' : '12px 18px',
        'justify-content': isExpanded ? (isRightAligned ? 'flex-end' : 'flex-start') : 'center',
      };

      const mainItem = href && !disabled
        ? m('li', { class: itemClasses }, [
            m(
              'a',
              {
                href,
                onclick: handleMainClick,
                style: linkStyle,
              },
              content
            ),
          ])
        : m('li', { class: itemClasses }, [
            m(
              'a',
              {
                onclick: handleMainClick,
                href: '#!',
                style: linkStyle,
              },
              content
            ),
          ]);

      // Return main item with submenu if applicable
      if (hasSubmenu && active && isSubmenuOpen) {
        return [
          mainItem,
          submenu.map((subItem) =>
            m(NavbarSubItem, {
              ...subItem,
              mode: submenuMode,
              isExpanded,
              position,
            })
          ),
        ];
      }

      return mainItem;
    },
  };
};

/**
 * Sidenav utilities for programmatic control
 */
export class SidenavManager {
  /**
   * Open a sidenav by ID
   */
  static open(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('open');
      element.classList.remove('closed');
    }
  }

  /**
   * Close a sidenav by ID
   */
  static close(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove('open');
      element.classList.add('closed');
    }
  }

  /**
   * Toggle a sidenav by ID
   */
  static toggle(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const isOpen = element.classList.contains('open');
      if (isOpen) {
        this.close(id);
      } else {
        this.open(id);
      }
    }
  }
}
