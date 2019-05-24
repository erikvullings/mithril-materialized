import m from 'mithril';
import { toAttributeString } from './utils';
import { Icon } from './icon';
/**
 * A factory to create new buttons.
 *
 * @example FlatButton = ButtonFactory('a.waves-effect.waves-teal.btn-flat');
 */
export const ButtonFactory = (defaultClassNames, attributes = '') => () => {
    return {
        view: ({ attrs }) => {
            const { modalId, tooltip, tooltipPostion, iconName, iconClass, label, attr } = attrs;
            const passThrough = {
                ...attrs,
                modalId: undefined,
                tooltip: undefined,
                tooltipPostion: undefined,
                iconName: undefined,
                iconClass: undefined,
                label: undefined,
                attr: undefined,
            };
            return m(`${defaultClassNames}${attributes}${modalId ? '.modal-trigger[href=#' + modalId + ']' : ''}${tooltip ? `.tooltipped[data-position=${tooltipPostion || 'top'}][data-tooltip=${tooltip}]` : ''}${toAttributeString(attr)}`, passThrough, iconName ? m(Icon, { iconName, class: iconClass || 'left' }) : undefined, label ? label : undefined);
        },
    };
};
export const Button = ButtonFactory('a.waves-effect.waves-light.btn');
export const LargeButton = ButtonFactory('a.waves-effect.waves-light.btn-large');
export const SmallButton = ButtonFactory('a.waves-effect.waves-light.btn-small');
export const FlatButton = ButtonFactory('a.waves-effect.waves-teal.btn-flat');
export const RoundIconButton = ButtonFactory('button.btn-floating.btn-large.waves-effect.waves-light');
export const SubmitButton = ButtonFactory('button.btn.waves-effect.waves-light', '[type=submit]');
//# sourceMappingURL=button.js.map