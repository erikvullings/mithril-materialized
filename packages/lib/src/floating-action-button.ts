import m, { FactoryComponent } from 'mithril';

interface FloatingActionButtonState {
  isOpen: boolean;
}

export interface FloatingActionButtonAttrs {
  /** Optional classes to add to the top element */
  className?: string;
  /** Optional style to add to the top element, e.g. for positioning it inline */
  style?: string;
  /** Material-icons name for the main FAB, @see https://materializecss.com/icons.html */
  iconName: string;
  /** Helper option to place the FAB inline instead of the bottom right of the display */
  position?: 'left' | 'right' | 'inline-left' | 'inline-right';
  /**
   * Optional icon class, e.g. tiny (1em), small (2em), medium (4em), large (6em), or 'tiny right'.
   * @default large
   */
  iconClass?: string;
  /** The buttons you want to show */
  buttons?: Array<{
    /** Optional classes you want to add to the main element */
    className?: string;
    /** Name of the icon */
    iconName: string;
    /** Classes of the icon */
    iconClass?: string;
    /** On click function */
    onclick?: (e: UIEvent) => void;
  }>;
  /** Direction to open the buttons */
  direction?: 'top' | 'bottom' | 'left' | 'right';
  /** Whether to show the toolbar */
  toolbarEnabled?: boolean;
  /** Hover behavior */
  hoverEnabled?: boolean;
}

/**
 * Floating Action Button
 */
export const FloatingActionButton: FactoryComponent<FloatingActionButtonAttrs> = () => {
  const state: FloatingActionButtonState = {
    isOpen: false,
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('.fixed-action-btn')) {
      state.isOpen = false;
    }
  };

  return {
    oncreate: () => {
      document.addEventListener('click', handleClickOutside);
    },

    onremove: () => {
      document.removeEventListener('click', handleClickOutside);
    },

    view: ({
      attrs: {
        className,
        iconName,
        iconClass,
        position,
        style = position === 'left' || position === 'inline-left'
          ? 'position: absolute; display: inline-block; left: 24px;'
          : position === 'right' || position === 'inline-right'
          ? 'position: absolute; display: inline-block; right: 24px;'
          : undefined,
        buttons,
        direction = 'top',
        hoverEnabled = true,
      },
    }) => {
      const fabClasses = [
        'fixed-action-btn',
        direction ? `direction-${direction}` : '',
        state.isOpen ? 'active' : '',
        // hoverEnabled ? 'hover-enabled' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return m(
        'div',
        {
          style:
            position === 'inline-right' || position === 'inline-left' ? 'position: relative; height: 70px;' : undefined,
        },
        m(
          `.${fabClasses}`,
          {
            style,
            onclick: (e: Event) => {
              e.stopPropagation();
              if (buttons && buttons.length > 0) {
                state.isOpen = !state.isOpen;
              }
            },
            onmouseover: hoverEnabled
              ? () => {
                  if (buttons && buttons.length > 0) {
                    state.isOpen = true;
                  }
                }
              : undefined,
            onmouseleave: hoverEnabled
              ? () => {
                  state.isOpen = false;
                }
              : undefined,
          },
          [
            m(
              'a.btn-floating.btn-large',
              {
                className,
              },
              m('i.material-icons', { className: iconClass }, iconName)
            ),
            buttons &&
              buttons.length > 0 &&
              m(
                'ul',
                buttons.map((button, index) =>
                  m(
                    'li',
                    m(
                      `a.btn-floating.${button.className || 'red'}`,
                      {
                        style: {
                          opacity: state.isOpen ? '1' : '0',
                          transform: state.isOpen ? 'scale(1)' : 'scale(0.4)',
                          transition: `all 0.3s ease ${index * 40}ms`,
                        },
                        onclick: (e: UIEvent) => {
                          e.stopPropagation();
                          if (button.onclick) button.onclick(e);
                        },
                      },
                      m('i.material-icons', { className: button.iconClass }, button.iconName)
                    )
                  )
                )
              ),
          ]
        )
      );
    },
  };
};
