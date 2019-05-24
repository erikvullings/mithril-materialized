import m from 'mithril';
import { isNumeric } from './utils';
import { Label, HelperText } from './label';
/** Component to select from a list of values in a dropdowns */
export const Select = () => {
    const state = {
        instance: undefined,
    };
    const isSelected = (id, checkedId, selected = false) => selected ||
        (checkedId instanceof Array && (id || typeof id === 'number') ? checkedId.indexOf(id) >= 0 : checkedId === id);
    return {
        view: ({ attrs: { id, checkedId, newRow, className = 'col s12', key, onchange, options, label, helperText, multiple, placeholder, isMandatory, iconName, disabled, }, }) => {
            const clear = newRow ? '.clear' : '';
            const isDisabled = disabled ? '[disabled]' : '';
            const isMultiple = multiple ? '[multiple]' : '';
            const noValidSelection = options.filter(o => isSelected(o.id, checkedId)).length === 0;
            return m(`.input-field.select-space${clear}`, { className, key }, [
                iconName ? m('i.material-icons.prefix', iconName) : undefined,
                m(`select[id=${id}]${isDisabled}${isMultiple}`, {
                    oncreate: ({ dom, attrs }) => {
                        state.instance = M.FormSelect.init(dom, attrs);
                    },
                    onupdate: ({ dom, attrs }) => {
                        state.instance = M.FormSelect.init(dom, attrs);
                    },
                    onchange: onchange
                        ? (e) => {
                            if (multiple) {
                                const values = state.instance && state.instance.getSelectedValues();
                                const v = values
                                    ? values.length > 0 && isNumeric(values[0])
                                        ? values.map(n => +n)
                                        : values
                                    : undefined;
                                onchange(v);
                            }
                            else if (e && e.currentTarget) {
                                const b = e.currentTarget;
                                const v = isNumeric(b.value) ? +b.value : b.value;
                                onchange(v);
                            }
                        }
                        : undefined,
                }, placeholder ? m(`option[disabled]${noValidSelection ? '[selected]' : ''}`, placeholder) : '', options.map((o, i) => m(`option[value=${o.id}]${o.disabled ? '[disabled]' : ''}${isSelected(o.id, checkedId, i === 0 && noValidSelection && !placeholder) ? '[selected]' : ''}`, o.label.replace('&amp;', '&')))),
                m(Label, { label, isMandatory }),
                m(HelperText, { helperText }),
            ]);
        },
    };
};
//# sourceMappingURL=select.js.map