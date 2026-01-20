import m, { FactoryComponent, Attributes } from 'mithril';
import { Icon } from './icon';
import { MaterialIcon, IconName } from './material-icon';
import { MaterialPosition, IconClass, ButtonVariant } from './types';
import { WavesEffect } from './waves';

/**
 * HTML attributes that can be passed to button elements
 * @deprecated Use native HTML attributes directly instead
 */
export interface HtmlAttrs {
  id?: string;
  for?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

/**
 * Enhanced button attributes with improved TypeScript support
 * @example
 * ```typescript
 * // Basic button
 * m(Button, { label: 'Click me' })
 *
 * // Submit button with icon
 * m(Button, {
 *   variant: 'submit',
 *   label: 'Save',
 *   iconName: 'save',
 *   iconClass: 'small left'
 * })
 *
 * // Reset button
 * m(Button, {
 *   variant: 'reset',
 *   label: 'Clear Form'
 * })
 * ```
 */
export interface ButtonAttrs extends Attributes {
  /** Button label text (optional for icon-only buttons) */
  label?: string;

  /** Material icon name - see https://materializecss.com/icons.html */
  iconName?: string;

  /**
   * Icon size and position class
   * @example 'small', 'medium left', 'large right'
   */
  iconClass?: IconClass;

  /**
   * Button type - determines the HTML button behavior
   * @default 'button'
   * @example
   * ```typescript
   * // Standard clickable button (default)
   * variant: 'button'
   *
   * // Form submission button
   * variant: 'submit'
   *
   * // Form reset button
   * variant: 'reset'
   * ```
   */
  variant?: ButtonVariant;

  /**
   * @deprecated Use native HTML attributes directly instead
   * Some additional HTML attributes that can be attached to the button
   */
  attr?: HtmlAttrs;

  /** Tooltip text to display on hover */
  tooltip?: string;

  /**
   * Tooltip position
   * @fixed typo: tooltipPostion -> tooltipPosition
   */
  tooltipPosition?: MaterialPosition;
}

/**
 * A factory to create new buttons.
 *
 * @example FlatButton = ButtonFactory('a.waves-effect.waves-teal.btn-flat');
 */
export const ButtonFactory = (
  element: string,
  defaultClassNames: string,
  type: string = ''
): FactoryComponent<ButtonAttrs> => {
  return () => {
    return {
      view: ({ attrs, children }) => {
        const {
          tooltip,
          tooltipPosition,
          tooltipPostion, // Keep for backwards compatibility
          iconName,
          iconClass,
          label,
          className,
          variant,
          ...params
        } = attrs;

        // Use variant or fallback to factory type
        const buttonType = variant || type || 'button';

        const cn = [tooltip ? 'tooltipped' : '', defaultClassNames, className].filter(Boolean).join(' ').trim();

        // Use tooltipPosition if available, fallback to legacy tooltipPostion
        const position = tooltipPosition || tooltipPostion || 'top';

        // Add waves effect event handlers if waves-effect class is present
        const wavesHandlers = cn.includes('waves-effect')
          ? {
              onmousedown: WavesEffect.onMouseDown,
              onmouseup: WavesEffect.onMouseUp,
              onmouseleave: WavesEffect.onMouseLeave,
              ontouchstart: WavesEffect.onTouchStart,
              ontouchend: WavesEffect.onTouchEnd,
            }
          : {};

        return m(
          element,
          {
            ...params,
            ...wavesHandlers,
            className: cn,
            'data-position': tooltip ? position : undefined,
            'data-tooltip': tooltip || undefined,
            type: buttonType,
          },
          iconName ? m(Icon, { iconName, className: iconClass || 'left' }) : undefined,
          label ? label : undefined,
          children
        );
      },
    };
  };
};

export const Button = ButtonFactory('a', 'waves-effect waves-light btn', 'button');
export const LargeButton = ButtonFactory('a', 'waves-effect waves-light btn-large', 'button');
export const SmallButton = ButtonFactory('a', 'waves-effect waves-light btn-small', 'button');
export const FlatButton = ButtonFactory('a', 'waves-effect waves-teal btn-flat', 'button');
export const IconButton = ButtonFactory('button', 'btn-flat btn-icon waves-effect waves-teal', 'button');
export const RoundIconButton = ButtonFactory('button', 'btn-floating btn-large waves-effect waves-light', 'button');
export const SubmitButton = ButtonFactory('button', 'btn waves-effect waves-light', 'submit');
const RaisedIconButton = ButtonFactory('button', 'btn waves-effect waves-light', 'button');

export interface ConfirmButtonAttrs extends ButtonAttrs {
  /** Use material-icon name, or internal MaterialIcon name */
  confirmIconName?: IconName | string;
  /** Use material-icon name, or internal MaterialIcon name */
  confirmColor?: IconName | string;
  timeout?: number;
  clickDelay?: number;
  onFirstClick?: () => void;
}

export const ConfirmButton: FactoryComponent<ConfirmButtonAttrs> = () => {
  let isConfirming = false;
  let isBlocked = false;
  let timeoutId: number;
  let blockTimeoutId: number;

  const reset = () => {
    isConfirming = false;
    isBlocked = false;
    m.redraw();
  };

  const unblock = () => {
    isBlocked = false;
  };

  return {
    onremove: () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(blockTimeoutId);
    },
    view: ({ attrs }) => {
      const {
        iconName = 'delete',
        confirmIconName = 'check',
        confirmColor = 'red',
        timeout = 3000,
        clickDelay = 500,
        onFirstClick,
        onclick,
        ...props
      } = attrs;

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (isBlocked) return;

        if (isConfirming) {
          window.clearTimeout(timeoutId);
          window.clearTimeout(blockTimeoutId); // Clean up safety
          isConfirming = false;
          onclick?.(e);
        } else {
          isConfirming = true;
          isBlocked = true;
          onFirstClick?.();
          timeoutId = window.setTimeout(reset, timeout);
          blockTimeoutId = window.setTimeout(unblock, clickDelay);
        }
      };

      const cn = isConfirming ? confirmColor : 'red-text';

      const commonProps = {
        ...props,
        className: `${props.className || ''} ${cn}`,
        style: {
          ...props.style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Mimic btn-icon style when confirming (RaisedIconButton doesn't have it)
          ...(isConfirming ? { padding: '0 8px', width: 'auto', minWidth: 'auto' } : {}),
        },
        onclick: handleClick,
      };

      if (isConfirming) {
        return m(RaisedIconButton, commonProps, m(MaterialIcon, { name: confirmIconName as IconName }));
      }

      return m(IconButton, commonProps, m(MaterialIcon, { name: iconName as IconName }));
    },
  };
};
