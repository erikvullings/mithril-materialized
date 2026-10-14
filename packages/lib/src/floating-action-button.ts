import m, { FactoryComponent } from 'mithril';
import { WavesEffect } from './waves';
import { ComponentStyle } from './types';
import { Icon } from './icon';

interface FloatingActionButtonState {
  isOpen: boolean;
}

export interface FloatingActionButtonAttrs {
  /** Optional classes to add to the top element */
  className?: string;
  /** Optional style to add to the top element, e.g. for positioning it inline */
  style?: ComponentStyle;
  /** Material-icons name for the main FAB, @see https://materializecss.com/icons.html */
  iconName: string;
  /** Accessible name for the main action; defaults to its icon name. */
  ariaLabel?: string;
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
    /** Accessible name for this action; defaults to its icon name. */
    ariaLabel?: string;
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
        ariaLabel,
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
              'a.btn-floating.btn-large.waves-effect.waves-light',
              {
                className,
                role: 'button',
                tabindex: 0,
                'aria-label': ariaLabel || iconName.replace(/[_-]/g, ' '),
                onkeydown: (e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    (e.currentTarget as HTMLElement).click();
                  }
                },
                onmousedown: WavesEffect.onMouseDown,
                onmouseup: WavesEffect.onMouseUp,
                onmouseleave: WavesEffect.onMouseLeave,
                ontouchstart: WavesEffect.onTouchStart,
                ontouchend: WavesEffect.onTouchEnd,
              },
              m(Icon, { className: iconClass, iconName })
            ),
            buttons &&
              buttons.length > 0 &&
              m(
                'ul',
                { 'aria-hidden': state.isOpen ? undefined : 'true' },
                buttons.map((button, index) =>
                  m(
                    'li',
                    m(
                      `a.btn-floating.waves-effect.waves-light.${button.className || 'red'}`,
                      {
                        role: 'button',
                        tabindex: state.isOpen ? 0 : -1,
                        'aria-label': button.ariaLabel || button.iconName.replace(/[_-]/g, ' '),
                        onkeydown: (e: KeyboardEvent) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            (e.currentTarget as HTMLElement).click();
                          }
                        },
                        style: {
                          opacity: state.isOpen ? '1' : '0',
                          transform: state.isOpen ? 'scale(1)' : 'scale(0.4)',
                          transition: `all 0.3s ease ${index * 40}ms`,
                        },
                        onclick: (e: UIEvent) => {
                          e.stopPropagation();
                          if (button.onclick) button.onclick(e);
                        },
                        onmousedown: WavesEffect.onMouseDown,
                        onmouseup: WavesEffect.onMouseUp,
                        onmouseleave: WavesEffect.onMouseLeave,
                        ontouchstart: WavesEffect.onTouchStart,
                        ontouchend: WavesEffect.onTouchEnd,
                      },
                      m(Icon, { className: button.iconClass, iconName: button.iconName })
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
