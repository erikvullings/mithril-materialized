import m from 'mithril';
import { Label, HelperText } from './label';
/** Component to show a check box */
export const InputCheckbox = () => {
    return {
        view: ({ attrs: { className = 'col s12', onchange, label, checked, disabled } }) => {
            return m(`div`, { className }, m('label', [
                m(`input[type=checkbox][tabindex=0]${checked ? '[checked]' : ''}${disabled ? '[disabled]' : ''}`, {
                    onclick: onchange
                        ? (e) => {
                            if (e.target && typeof e.target.checked !== 'undefined') {
                                onchange(e.target.checked);
                            }
                        }
                        : undefined,
                }),
                typeof label === 'string' ? m('span', label) : label,
            ]));
        },
    };
};
/** A list of checkboxes */
export const Options = () => {
    return {
        view: ({ attrs: { label, id, options, onchange, description, className, checkboxClass, newRow, isMandatory } }) => {
            const clear = newRow ? '.clear' : '';
            return m(`div${clear}`, { className }, [
                m('h4', m(Label, { id, label, isMandatory })),
                m(HelperText, { helperText: description }),
                ...options.map(option => m(InputCheckbox, {
                    label: option.label,
                    onchange: onchange ? (v) => onchange(v, option.id, option) : undefined,
                    checkboxClass,
                    checked: option.isChecked,
                })),
            ]);
        },
    };
};
//# sourceMappingURL=option.js.map