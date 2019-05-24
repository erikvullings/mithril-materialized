import M from 'materialize-css';
import m from 'mithril';
import { uniqueId, toAttrs } from './utils';
import { Label, HelperText } from './label';
import './styles/input.css';
/** Create a TextArea */
export const TextArea = () => {
    const state = { id: uniqueId() };
    return {
        view: ({ attrs }) => {
            const { className = 'col s12', helperText, iconName, id = state.id, initialValue, isMandatory, label, onchange, style, ...params } = attrs;
            const attributes = toAttrs(params);
            return m(`.input-field`, { className, style }, [
                iconName ? m('i.material-icons.prefix', iconName) : '',
                m(`textarea.materialize-textarea[tabindex=0][id=${id}]${attributes}`, {
                    oncreate: ({ dom }) => {
                        M.textareaAutoResize(dom);
                        if (attrs.maxLength) {
                            M.CharacterCounter.init(dom);
                        }
                    },
                    onchange: onchange
                        ? (e) => {
                            const target = e.target;
                            const value = target && typeof target.value === 'string' ? target.value : '';
                            onchange(value);
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
/** Default component for all kinds of input fields. */
const InputField = (type, defaultClass = '') => () => {
    const state = { id: uniqueId() };
    const getValue = (target) => {
        const val = target.value;
        return (val ? (type === 'number' || type === 'range' ? +val : val) : val);
    };
    const setValidity = (target, validationResult) => {
        if (typeof validationResult === 'boolean') {
            target.setCustomValidity(validationResult ? '' : 'Custom validation failed');
        }
        else {
            target.setCustomValidity(validationResult);
        }
    };
    const focus = ({ autofocus }) => autofocus ? (typeof autofocus === 'boolean' ? autofocus : autofocus()) : false;
    return {
        view: ({ attrs }) => {
            const { className = 'col s12', dataError, dataSuccess, helperText, iconName, id = state.id, initialValue, isMandatory, label, maxLength, newRow, onchange, onkeydown, onkeypress, onkeyup, style, validate, ...params } = attrs;
            const attributes = toAttrs(params);
            return m(`.input-field${newRow ? '.clear' : ''}${defaultClass}`, { className, style }, [
                iconName ? m('i.material-icons.prefix', iconName) : undefined,
                m(`input.validate[type=${type}][tabindex=0][id=${id}]${attributes}`, {
                    oncreate: ({ dom }) => {
                        if (focus(attrs)) {
                            dom.focus();
                        }
                        if (maxLength) {
                            M.CharacterCounter.init(dom);
                        }
                        if (type === 'range') {
                            M.Range.init(dom);
                        }
                    },
                    onkeyup: onkeyup
                        ? (ev) => {
                            onkeyup(ev, getValue(ev.target));
                        }
                        : undefined,
                    onkeydown: onkeydown
                        ? (ev) => {
                            onkeydown(ev, getValue(ev.target));
                        }
                        : undefined,
                    onkeypress: onkeypress
                        ? (ev) => {
                            onkeypress(ev, getValue(ev.target));
                        }
                        : undefined,
                    onupdate: validate
                        ? ({ dom }) => {
                            const target = dom;
                            setValidity(target, validate(getValue(target), target));
                        }
                        : undefined,
                    onchange: (e) => {
                        const target = e.target;
                        if (target) {
                            const value = getValue(target);
                            if (onchange) {
                                onchange(value);
                            }
                            if (validate) {
                                setValidity(target, validate(value, target));
                            }
                        }
                    },
                    value: initialValue,
                }),
                m(Label, {
                    label,
                    id,
                    isMandatory,
                    isActive: initialValue || type === 'number' || type === 'color' || type === 'range' ? true : false,
                }),
                m(HelperText, { helperText, dataError, dataSuccess }),
            ]);
        },
    };
};
/** Component for entering some text */
export const TextInput = InputField('text');
/** Component for entering a number */
export const NumberInput = InputField('number');
/** Component for entering a URL */
export const UrlInput = InputField('url');
/** Component for entering a color */
export const ColorInput = InputField('color');
/** Component for entering a range */
export const RangeInput = InputField('range', '.range-field');
/** Component for entering an email */
export const EmailInput = InputField('email');
/** Component for uploading a file */
export const FileInput = () => {
    return {
        view: ({ attrs }) => {
            const { multiple, disabled, placeholder, onchange, className = 'col s12', accept } = attrs;
            const accepted = accept ? (accept instanceof Array ? accept.join(', ') : accept) : undefined;
            const acc = accepted ? `[accept=${accepted}]` : '';
            const mul = multiple ? '[multiple]' : '';
            const dis = disabled ? '[disabled]' : '';
            const ph = placeholder ? `[placeholder=${placeholder}]` : '';
            return m('.file-field.input-field', {
                class: attrs.class || attrs.className || 'col s12',
            }, [
                m('.btn', [
                    m('span', 'File'),
                    m(`input[type=file]${mul}${dis}${acc}`, {
                        className,
                        onchange: onchange
                            ? (e) => {
                                const i = e.target;
                                if (i && i.files) {
                                    onchange(i.files);
                                }
                            }
                            : undefined,
                    }),
                ]),
                m('.file-path-wrapper', m(`input.file-path.validate${ph}[type=text]`)),
            ]);
        },
    };
};
//# sourceMappingURL=input.js.map