import m from 'mithril';
import { uniqueId, toAttrs } from './utils';
import { Label, HelperText } from './label';
/** Component to pick a date */
export const DatePicker = () => {
    const state = { id: uniqueId() };
    return {
        view: ({ attrs }) => {
            const id = state.id;
            const attributes = toAttrs(attrs);
            const { label, helperText, initialValue, newRow, className = 'col s12', iconName, isMandatory, onchange } = attrs;
            const clear = newRow ? '.clear' : '';
            return m(`.input-field${clear}`, { className }, [
                iconName ? m('i.material-icons.prefix', iconName) : '',
                m(`input.datepicker[type=text][tabindex=0][id=${id}]${attributes}`, {
                    oncreate: ({ dom }) => {
                        M.Datepicker.init(dom, {
                            format: 'yyyy/mm/dd',
                            showClearBtn: true,
                            setDefaultDate: true,
                            defaultDate: initialValue ? new Date(initialValue) : new Date(),
                            onSelect: onchange,
                            ...attrs,
                        });
                    },
                }),
                m(Label, { label, id, isMandatory, isActive: !!initialValue }),
                m(HelperText, { helperText }),
            ]);
        },
    };
};
/** Component to pick a time */
export const TimePicker = () => {
    const state = { id: uniqueId() };
    return {
        view: ({ attrs }) => {
            const id = state.id;
            const attributes = toAttrs(attrs);
            const { label, helperText, initialValue, newRow, className = 'col s12', iconName, isMandatory, onchange } = attrs;
            const clear = newRow ? '.clear' : '';
            return m(`.input-field.timepicker${clear}`, { className }, [
                iconName ? m('i.material-icons.prefix', iconName) : '',
                m(`input[type=text][tabindex=0][id=${id}]${attributes}`, {
                    value: initialValue,
                    oncreate: ({ dom }) => {
                        M.Timepicker.init(dom, {
                            twelveHour: false,
                            showClearBtn: true,
                            defaultTime: initialValue,
                            onSelect: onchange ? (hours, minutes) => onchange(`${hours}:${minutes}`) : undefined,
                            ...attrs,
                        });
                    },
                }),
                m(Label, { label, id, isMandatory, isActive: initialValue }),
                m(HelperText, { helperText }),
            ]);
        },
    };
};
//# sourceMappingURL=pickers.js.map