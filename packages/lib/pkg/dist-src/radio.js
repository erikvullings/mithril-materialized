import m from 'mithril';
import { uniqueId } from './utils';
/** Component to show a list of radio buttons, from which you can choose one. */
export const RadioButtons = () => {
    const state = { id: uniqueId() };
    return {
        view: ({ attrs: { newRow, className = 'col s12', label, description, onchange, options, checkedId } }) => {
            const groupId = state.id;
            const clear = newRow ? '.clear' : '';
            return m(`.input-field${clear}`, { className }, [
                m('h4', m.trust(label)),
                description ? m('p.helper-text', m.trust(description)) : '',
                ...options.map(r => m(RadioButton, {
                    ...r,
                    onchange,
                    groupId,
                    checked: r.id === checkedId,
                })),
            ]);
        },
    };
};
export const RadioButton = () => ({
    view: ({ attrs: { id, groupId, label, onchange, className = 'col s12', checked } }) => {
        return m(`div`, { className }, m('label', [
            m(`input[type=radio][tabindex=0][name=${groupId}]${checked ? '[checked=checked]' : ''}`, {
                onclick: onchange ? () => onchange(id) : undefined,
            }),
            m('span', m.trust(label)),
        ]));
    },
});
//# sourceMappingURL=radio.js.map