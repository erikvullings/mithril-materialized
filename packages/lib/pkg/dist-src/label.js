import m from 'mithril';
import { toAttributeString } from './utils';
import './styles/input.css';
export const Mandatory = { view: ({ attrs }) => m('span.mandatory', attrs, '*') };
/** Simple label element, used for most components. */
export const Label = () => {
    return {
        view: ({ attrs: { label, id, isMandatory, isActive, ...params } }) => label
            ? m(`label${isActive ? '.active' : ''}${id ? `[for=${id}]` : ''}`, params, [
                m.trust(label),
                isMandatory ? m(Mandatory) : undefined,
            ])
            : undefined,
    };
};
/** Create a helper text, often used for displaying a small help text. May be replaced by the validation message. */
export const HelperText = () => {
    return {
        view: ({ attrs: { helperText, dataError, dataSuccess } }) => {
            const a = dataError || dataSuccess ? toAttributeString({ dataError, dataSuccess }) : '';
            return helperText || a ? m(`span.helper-text${a}`, helperText ? m.trust(helperText) : '') : undefined;
        },
    };
};
//# sourceMappingURL=label.js.map