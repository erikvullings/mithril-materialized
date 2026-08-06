import m, { type Attributes , type FactoryComponent } from 'mithril';
import { MaterialIcon, type IconName } from './material-icon';
import type { ComponentStyle } from './types';
import { uniqueId } from './utils';

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
  value?: unknown;
  /** Selection callback */
  onSelect?: (value: unknown, selected: boolean) => void;
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
  /** Custom vnode content rendered in the header slot (first item, before hamburger) */
  headerContent?: m.Children;
  /** Custom vnode content rendered in the footer slot (last item, pushed to the bottom) */
  footerContent?: m.Children;
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
  /** Native title attribute text shown on hover */
  title?: string;
  /** Alias for title; used when title is not provided */
  tooltip?: string;
  /** Show tooltip only while sidenav is collapsed, @default true */
  tooltipWhenCollapsedOnly?: boolean;
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
  selectedSubmenuItems: Map<number, Set<unknown>>;
}

// List of MaterialIcon SVG icons that are available
const materialIconSvgNames = [
  'caret',
  'close',
  'chevron',
  'chevron_left',
  'chevron_right',
  'menu',
  'expand',
  'collapse',
  'check',
  'radio_checked',
  'radio_unchecked',
  'light_mode',
  'dark_mode',
] as const;

/**
 * Helper function to render icons based on IconDefinition type
 */
const renderIcon = (icon: IconDefinition | undefined, style?: ComponentStyle): m.Children => {
  if (!icon) return null;
  const objectStyle = typeof style === 'string' ? undefined : style;

  if (typeof icon === 'string') {
    // Check if this is a MaterialIcon SVG name
    if ((materialIconSvgNames as readonly string[]).includes(icon)) {
      return m(MaterialIcon, { name: icon as IconName, style });
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
      style: { ...objectStyle, width: '24px', height: '24px', objectFit: 'contain' },
    });
  }

  return null;
};

/**
 * Sidenav Header/Footer Item Component
 */
const SidenavHeaderFooterItem: FactoryComponent<
  SidenavItemAttrs & {
    _isExpanded: boolean;
    _position: 'left' | 'right';
  }
> = () => {
  return {
    view: ({ attrs }) => {
      const {
        text,
        icon,
        onclick,
        href,
        className = '',
        title,
        tooltip,
        tooltipWhenCollapsedOnly = true,
        _isExpanded = true,
        _position = 'left',
      } = attrs;
      const isRightAligned = _position === 'right';
      const tooltipText = title || tooltip || text;
      const shouldShowTooltip = tooltipWhenCollapsedOnly ? !_isExpanded : true;

      const handleClick = (e: Event) => {
        if (onclick) {
          e.preventDefault();
          onclick(e);
        }
      };

      const content = isRightAligned
        ? [
            m('span.sidenav-item-text.mm-layout-grow.left-align', text),
            renderIcon(icon),
          ]
        : [
            renderIcon(icon),
            m('span.sidenav-item-text.mm-layout-grow', text),
          ];

      const linkClass = [
        'mm-layout-row',
        'mm-layout-row--center',
        'sidenav-link',
        isRightAligned ? 'mm-layout-row--justify-end' : 'mm-layout-row--justify-start',
      ].join(' ');

      return m(
        'li',
        { class: className },
        m(
          'a',
          {
            href: href || '#!',
            onclick: handleClick,
            class: linkClass,
            title: shouldShowTooltip ? tooltipText : undefined,
            'aria-label': shouldShowTooltip ? tooltipText : undefined,
          },
          content
        )
      );
    },
  };
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

  const setBodyOverflow = (isOpen: boolean, mode: string, fixed: boolean) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen && mode === 'overlay' && !fixed ? 'hidden' : '';
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
        setBodyOverflow(isOpen, attrs.mode || 'overlay', attrs.fixed || false);

        // Clear animation state after animation completes
        setTimeout(() => {
          state.isAnimating = false;
          m.redraw();
        }, attrs.animationDuration || 300);
      }
    },

    onremove: ({ attrs }) => {
      // Clean up
      setBodyOverflow(false, attrs.mode || 'overlay', attrs.fixed || false);
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
      const collapsedWidth = 44;
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
            class:
              [
                position === 'right' ? 'right-aligned' : '',
                fixed ? 'sidenav-fixed' : '',
                mode === 'push' ? 'sidenav-push' : '',
                expandable && !isExpanded ? 'sidenav-collapsed' : '',
                'mm-layout-stack',
                className,
              ]
                .filter(Boolean)
                .join(' ') || undefined,
            style: {
              width: `${currentWidth}px`,
              transform: isOpen ? 'translateX(0)' : position === 'left' ? 'translateX(-105%)' : 'translateX(105%)',
              'transition-duration': `${animationDuration}ms`,
            },
          },
          [
            // Header content slot (rendered first, before hamburger)
            attrs.headerContent && m('li.sidenav-header-slot', attrs.headerContent),

            // Hamburger toggle button (inside sidenav, at the top)
            showHamburger &&
              m(
                'li.sidenav-hamburger-item',
                {
                  class: `mm-layout-row mm-layout-row--center ${position === 'right' ? 'mm-layout-row--justify-end' : 'mm-layout-row--justify-start'}`,
                  onclick: () => toggleHamburger(attrs),
                },
                m(MaterialIcon, {
                  name: 'menu',
                  style: { width: '24px', height: '24px' },
                })
              ),

            // Header item (if provided, appears before expand/collapse toggle)
            attrs.header &&
              m(SidenavHeaderFooterItem, {
                ...attrs.header,
                _isExpanded: isExpanded,
                _position: position,
              }),

            // Expand/collapse toggle button (if expandable, right below hamburger)
            expandable &&
              m(
                'li.sidenav-expand-toggle',
                {
                  class: `mm-layout-row mm-layout-row--center ${position === 'right' ? 'mm-layout-row--justify-end' : 'mm-layout-row--justify-start'}`,
                  onclick: () => toggleExpanded(attrs),
                },
                m(MaterialIcon, {
                  name:
                    position === 'right'
                      ? isExpanded
                        ? 'chevron_right'
                        : 'chevron_left'
                      : isExpanded
                        ? 'chevron_left'
                        : 'chevron_right',
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
            attrs.footer &&
              m(SidenavHeaderFooterItem, {
                ...attrs.footer,
                _isExpanded: isExpanded,
                _position: position,
                className: ['sidenav-footer-item', attrs.footer.className].filter(Boolean).join(' '),
              }),

            // Footer content slot (rendered last, pushed to bottom via margin-top: auto)
            attrs.footerContent && m('li.sidenav-footer-slot', attrs.footerContent),
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
      const indicatorIcon =
        mode !== 'none'
          ? m(MaterialIcon, {
              name:
                mode === 'checkbox' ? (selected ? 'check' : 'close') : selected ? 'radio_checked' : 'radio_unchecked',
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
            isExpanded && m('span.mm-layout-grow.left-align', text),
            icon && isExpanded && renderIcon(icon),
            indicatorIcon,
          ]
        : [
            // Left-aligned: indicator on left, text and icon on right
            indicatorIcon,
            icon && isExpanded && renderIcon(icon),
            isExpanded && m('span', { class: icon || indicatorIcon ? 'mm-layout-ml-8' : undefined }, text),
          ];

      return m(
        'li.sidenav-subitem',
        {
          class:
            [
              selected ? 'selected' : '',
              'mm-layout-row',
              'mm-layout-row--center',
              'mm-layout-gap-sm',
              isRightAligned ? 'mm-layout-row--justify-between' : 'mm-layout-row--justify-start',
            ]
              .filter(Boolean)
              .join(' ') || undefined,
          style: {
            padding: isExpanded ? '0 16px 0 48px' : '0 16px',
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
        title,
        tooltip,
        tooltipWhenCollapsedOnly = true,
      } = attrs;

      if (divider) {
        return m('li.divider');
      }

      if (subheader) {
        return m('li.subheader', text || children);
      }

      const hasSubmenu = submenu && submenu.length > 0;
      const itemClasses =
        [active ? 'active' : '', disabled ? 'disabled' : '', hasSubmenu ? 'has-submenu' : '', className]
          .filter(Boolean)
          .join(' ') || undefined;

      const handleMainClick = (e: Event) => {
        if (hasSubmenu) {
          e.preventDefault();
          isSubmenuOpen = active ? !isSubmenuOpen : true;
        }
        if (onclick && !disabled) {
          e.preventDefault();
          onclick(e);
        }
      };

      // Get internal props passed from parent Sidenav
      const isExpanded = attrs._isExpanded !== false;
      const position = attrs._position || 'left';
      const isRightAligned = position === 'right';
      const tooltipText = title || tooltip || text;
      const shouldShowTooltip = tooltipWhenCollapsedOnly ? !isExpanded : true;

      // In expanded mode, icons are at the outside edge
      // In collapsed mode, icons are centered
      const content = isRightAligned
        ? [
            // Right-aligned: text on left, icon on right
            m('span.sidenav-item-text.mm-layout-grow.left-align', text || children),
            renderIcon(icon),
          ]
        : [
            // Left-aligned: icon on left, text on right
            renderIcon(icon),
            m('span.sidenav-item-text.mm-layout-grow', text || children),
          ];

      const linkClass = [
        'mm-layout-row',
        'mm-layout-row--center',
        'sidenav-link',
        isRightAligned ? 'mm-layout-row--justify-end' : 'mm-layout-row--justify-start',
      ].join(' ');

      const mainItem =
        href && !disabled
          ? m('li', { class: itemClasses }, [
              m(
                'a',
                {
                  href,
                  onclick: handleMainClick,
                  class: linkClass,
                  title: shouldShowTooltip ? tooltipText : undefined,
                  'aria-label': shouldShowTooltip ? tooltipText : undefined,
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
                  class: linkClass,
                  title: shouldShowTooltip ? tooltipText : undefined,
                  'aria-label': shouldShowTooltip ? tooltipText : undefined,
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

/** Sidenav utilities for programmatic control */
export const SidenavManager = {
  open(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('open');
      element.classList.remove('closed');
    }
  },

  close(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove('open');
      element.classList.add('closed');
    }
  },

  toggle(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const isOpen = element.classList.contains('open');
      if (isOpen) {
        SidenavManager.close(id);
      } else {
        SidenavManager.open(id);
      }
    }
  },
};
