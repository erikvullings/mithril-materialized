import m from 'mithril';
import { HelperText } from './label';
/** Dropdown component */
export const Dropdown = () => {
    // export const Dropdown: FactoryComponent<IDropdownOptions> = () => {
    const state = {
        checkedId: undefined,
    };
    return {
        view: ({ attrs }) => {
            const id = attrs.id || 'dropdown';
            const { key, label, onchange, items, checkedId = state.checkedId, iconName, helperText, className = 'col s12', } = attrs;
            const selectedItem = checkedId
                ? items
                    .filter((i) => (i.id ? i.id === checkedId : i.label === checkedId))
                    .shift()
                : undefined;
            const title = selectedItem ? selectedItem.label : label || 'Select';
            return m('.input-field', { className, key }, [
                iconName ? m('i.material-icons.prefix', iconName) : undefined,
                m(HelperText, { helperText }),
                m(`a.dropdown-trigger.btn[href=#][data-target=${id}]`, {
                    class: 'col s12',
                    style: attrs.style || (iconName ? 'margin: 0.2em 0 0 3em;' : undefined),
                    oncreate: ({ dom }) => {
                        M.Dropdown.init(dom, attrs);
                    },
                }, title),
                m(`ul.dropdown-content[id=${id}]`, items.map(i => m(`li${i.divider ? '.divider[tabindex=-1]' : ''}`, i.divider
                    ? undefined
                    : m('a', {
                        onclick: onchange
                            ? () => {
                                state.checkedId = i.id || i.label;
                                onchange(i.id || i.label);
                            }
                            : undefined,
                    }, [i.iconName ? m('i.material-icons', i.iconName) : undefined, i.label])))),
            ]);
        },
    };
};
//# sourceMappingURL=dropdown.js.map