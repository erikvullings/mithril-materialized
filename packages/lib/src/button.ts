import m, { FactoryComponent, Attributes } from 'mithril';
import { Icon } from './icon';

export interface IHtmlAttributes {
  id?: string;
  for?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'text' | 'textarea' | 'number';
}

export interface IMaterialButton extends Attributes {
  /** Optional (e.g. in case you only want to use an icon) button label */
  label?: string;
  /** Optional icon material-icons name, @see https://materializecss.com/icons.html */
  iconName?: string;
  /** Optional icon class, e.g. tiny (1em), small (2em), medium (4em), large (6em), or 'tiny right' */
  iconClass?: string;
  /**
   * If the button is intended to open a modal, specify its modal id so we can trigger it,
   * @see https://materializecss.com/modals.html
   */
  modalId?: string;
  /** Some additional HTML attributes that can be attached to the button */
  attr?: IHtmlAttributes;
  /** Optional text-based tooltip, @see https://materializecss.com/tooltips.html */
  tooltip?: string;
  /** Optional location for the tooltip */
  tooltipPostion?: 'top' | 'bottom' | 'left' | 'right';
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
): FactoryComponent<IMaterialButton> => {
  return () => {
    return {
      view: ({ attrs }) => {
        const { modalId, tooltip, tooltipPostion, iconName, iconClass, label, className, attr, ...params } = attrs;
        const cn = [modalId ? 'modal-trigger' : '', tooltip ? 'tooltipped' : '', defaultClassNames, className]
          .filter(Boolean)
          .join(' ')
          .trim();
        return m(
          element,
          {
            ...params,
            ...attr,
            className: cn,
            href: modalId ? `#${modalId}` : undefined,
            'data-position': tooltip ? tooltipPostion || 'top' : undefined,
            'data-tooltip': tooltip || undefined,
            type,
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
export const RoundIconButton = ButtonFactory('button', 'btn-floating waves-effect waves-light', 'button');
export const SubmitButton = ButtonFactory('button', 'btn waves-effect waves-light', 'submit');
