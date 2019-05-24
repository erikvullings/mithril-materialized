import m from 'mithril';
import { uniqueId, disable } from './utils';
import { Label } from './label';
import './styles/switch.css';
/** Component to display a switch with two values. */
export const Switch = () => {
    const state = { id: uniqueId() };
    return {
        view: ({ attrs }) => {
            const id = attrs.id || state.id;
            const { label, left, right, disabled, newRow, onchange, checked, isMandatory, className = 'col s12' } = attrs;
            return m(`div${newRow ? '.clear' : ''}`, { className }, [
                label ? m(Label, { label: label || '', id, isMandatory }) : undefined,
                m('.switch', m('label', [
                    left || 'Off',
                    m(`input[id=${id}][type=checkbox]${disable({ disabled })}${checked ? '[checked]' : ''}`, {
                        onclick: onchange
                            ? (e) => {
                                if (e.target && typeof e.target.checked !== 'undefined') {
                                    onchange(e.target.checked);
                                }
                            }
                            : undefined,
                    }),
                    m('span.lever'),
                    right || 'On',
                ])),
            ]);
        },
    };
};
//# sourceMappingURL=switch.js.map