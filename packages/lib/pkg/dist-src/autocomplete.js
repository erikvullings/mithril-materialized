import m from 'mithril';
import { uniqueId, toAttrs } from './utils';
import { Label, HelperText } from './label';
/** Component to auto complete your text input */
export const Autocomplete = () => {
    const state = { id: uniqueId() };
    return {
        view: ({ attrs }) => {
            const id = attrs.id || state.id;
            const attributes = toAttrs(attrs);
            const { label, helperText, initialValue, onchange, newRow, className = 'col s12', style, iconName, isMandatory, } = attrs;
            return m(`.input-field${newRow ? '.clear' : ''}`, { className, style }, [
                iconName ? m('i.material-icons.prefix', iconName) : '',
                m(`input.autocomplete[type=text][tabindex=0][id=${id}]${attributes}`, {
                    oncreate: ({ dom }) => {
                        M.Autocomplete.init(dom, attrs);
                    },
                    onchange: onchange
                        ? (e) => {
                            if (e.target && e.target.value) {
                                onchange(e.target.value);
                            }
                        }
                        : undefined,
                    value: initialValue,
                }),
                m(Label, { label, id, isMandatory, isActive: initialValue }),
                m(HelperText, { helperText }),
            ]);
        },
    };
};
//# sourceMappingURL=autocomplete.js.map