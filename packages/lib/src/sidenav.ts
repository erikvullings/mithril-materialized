import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';

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
  /** Width of the sidenav in pixels */
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
}

export interface SidenavItemAttrs {
  /** Text content of the item */
  text?: string;
  /** Icon name (material icons) */
  icon?: string;
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
}

interface SidenavState {
  id: string;
  isOpen: boolean;
  isAnimating: boolean;
}

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

  return {
    oninit: ({ attrs }) => {
      state = {
        id: attrs.id || uniqueId(),
        isOpen: attrs.isOpen || false,
        isAnimating: false,
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
      } = attrs;

      const isOpen = state.isOpen;

      return [
        // Backdrop (using existing materialize class)
        showBackdrop &&
          mode === 'overlay' &&
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
              [position === 'right' ? 'right-aligned' : '', fixed ? 'sidenav-fixed' : '', className]
                .filter(Boolean)
                .join(' ') || undefined,
            style: {
              width: `${width}px`,
              transform: isOpen ? 'translateX(0)' : position === 'left' ? 'translateX(-105%)' : 'translateX(105%)',
              'transition-duration': `${animationDuration}ms`,
            },
          },
          children
        ),
      ];
    },
  };
};

/**
 * Sidenav Item Component
 * Individual items for the sidenav menu
 */
export const SidenavItem: FactoryComponent<SidenavItemAttrs> = () => {
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
      } = attrs;

      if (divider) {
        return m('li.divider');
      }

      if (subheader) {
        return m('li.subheader', text || children);
      }

      const itemClasses =
        [active ? 'active' : '', disabled ? 'disabled' : '', className].filter(Boolean).join(' ') || undefined;

      const content = [icon && m('i.material-icons', icon), text || children];

      if (href && !disabled) {
        return m('li', { class: itemClasses }, [
          m(
            'a',
            {
              href,
              onclick: disabled ? undefined : onclick,
            },
            content
          ),
        ]);
      }

      return m('li', { class: itemClasses }, [
        m(
          'a',
          {
            onclick: disabled ? undefined : onclick,
            href: '#!',
          },
          content
        ),
      ]);
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
