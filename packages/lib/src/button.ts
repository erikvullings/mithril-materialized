import m, { FactoryComponent, Attributes } from 'mithril';
import { Icon } from './icon';
import { MaterialPosition, IconClass, ButtonVariant } from './types';

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
 *   variant: { type: 'submit' },
 *   label: 'Save',
 *   iconName: 'save',
 *   iconClass: 'small left'
 * })
 *
 * // Modal trigger button
 * m(Button, {
 *   variant: { type: 'modal', modalId: 'my-modal' },
 *   label: 'Open Modal'
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
   * Button behavior variant - determines button type and behavior
   * @example
   * { type: 'button' } - Standard button
   * { type: 'submit' } - Form submit button
   * { type: 'modal', modalId: 'my-modal' } - Modal trigger
   * { type: 'reset' } - Form reset button
   */
  variant?: ButtonVariant;

  /**
   * @deprecated Use variant instead
   * If the button is intended to open a modal, specify its modal id so we can trigger it
   */
  modalId?: string;

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
      view: ({ attrs }) => {
        const {
          modalId,
          tooltip,
          tooltipPosition,
          tooltipPostion, // Keep for backwards compatibility
          iconName,
          iconClass,
          label,
          className,
          attr,
          variant,
          ...params
        } = attrs;

        // Handle both new variant prop and legacy modalId/type
        const buttonType = variant?.type || (modalId ? 'modal' : type || 'button');
        const modalTarget = variant?.type === 'modal' ? variant.modalId : modalId;

        const cn = [modalTarget ? 'modal-trigger' : '', tooltip ? 'tooltipped' : '', defaultClassNames, className]
          .filter(Boolean)
          .join(' ')
          .trim();

        // Use tooltipPosition if available, fallback to legacy tooltipPostion
        const position = tooltipPosition || tooltipPostion || 'top';

        return m(
          element,
          {
            ...params,
            ...attr,
            className: cn,
            href: modalTarget ? `#${modalTarget}` : undefined,
            'data-position': tooltip ? position : undefined,
            'data-tooltip': tooltip || undefined,
            type: buttonType === 'modal' ? 'button' : buttonType,
          },
          // `${dca}${modalId ? `.modal-trigger[href=#${modalId}]` : ''}${
          //   tooltip ? `.tooltipped[data-position=${tooltipPostion || 'top'}][data-tooltip=${tooltip}]` : ''
          // }${toAttributeString(attr)}`, {}
          iconName ? m(Icon, { iconName, className: iconClass || 'left' }) : undefined,
          label ? label : undefined
        );
      },
    };
  };
};

export const Button = ButtonFactory('a', 'waves-effect waves-light btn', 'button');
export const LargeButton = ButtonFactory('a', 'waves-effect waves-light btn-large', 'button');
export const SmallButton = ButtonFactory('a', 'waves-effect waves-light btn-small', 'button');
export const FlatButton = ButtonFactory('a', 'waves-effect waves-teal btn-flat', 'button');
export const RoundIconButton = ButtonFactory('button', 'btn-floating btn-large waves-effect waves-light', 'button');
export const SubmitButton = ButtonFactory('button', 'btn waves-effect waves-light', 'submit');
