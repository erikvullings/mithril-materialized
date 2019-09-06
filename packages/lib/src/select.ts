import m, { FactoryComponent, Attributes } from 'mithril';
import { isNumeric } from './utils';
import { Label, HelperText } from './label';
import { IInputOption } from './option';

export interface ISelectOptions extends Attributes, Partial<M.FormSelectOptions> {
  /** Options to select from */
  options: IInputOption[];
  /** Called when the value is changed, either contains a single or all selected (checked) ids */
  onchange: (checkedIds: Array<string | number>) => void;
  /**
   * Selected id or ids (in case of multiple options)
   * @deprecated Please use initialValue instead
   */
  checkedId?: string | number | Array<string | number>;
  /** Selected id or ids (in case of multiple options) */
  initialValue?: string | number | Array<string | number>;
  /** Select a single option or multiple options */
  multiple?: boolean;
  /** Optional label. */
  label?: string;
  /** Optional ID. */
  id?: string;
  /** Unique key for use of the element in an array. */
  key?: string | number;
  /** Add a a placeholder to the input field. */
  placeholder?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Sets the input field to disabled. */
  disabled?: boolean;
  /** Optional style information. */
  style?: string;
  /** If true, break to a new row */
  newRow?: boolean;
  /**
   * If true, add a mandatory * after the label (if any),
   * and add the required and aria-required attributes to the input element.
   */
  isMandatory?: boolean;
  /** Add the required and aria-required attributes to the input element */
  required?: boolean;
}

/** Component to select from a list of values in a dropdowns */
export const Select: FactoryComponent<ISelectOptions> = () => {
  const state = {} as {
    initialValue: Array<string | number>;
    instance?: M.FormSelect;
    onchange?: (e: Event) => void;
  };
  const isSelected = (id?: string | number, checkedId?: string | number | Array<string | number>, selected = false) =>
    selected ||
    (checkedId instanceof Array && (id || typeof id === 'number') ? checkedId.indexOf(id) >= 0 : checkedId === id);
  return {
    oninit: ({ attrs: { onchange, multiple, checkedId, initialValue } }) => {
      const iv = initialValue || checkedId;
      state.initialValue = iv
        ? iv instanceof Array
          ? [...iv.filter(i => i !== null)]
          : [iv]
        : [];
      state.onchange = onchange
        ? multiple
          ? () => {
              const values = state.instance && state.instance.getSelectedValues();
              const v = values
                ? values.length > 0 && isNumeric(values[0])
                  ? values.map(n => +n)
                  : values.filter(i => i !== null || typeof i !== 'undefined')
                : undefined;
              state.initialValue = v ? v : [];
              onchange(state.initialValue);
            }
          : (e: Event) => {
              if (e && e.currentTarget) {
                const b = e.currentTarget as HTMLButtonElement;
                const v = isNumeric(b.value) ? +b.value : b.value;
                state.initialValue = typeof v !== undefined ? [v] : [];
              }
              onchange(state.initialValue);
            }
        : undefined;
    },
    view: ({
      attrs: {
        id,
        newRow,
        className = 'col s12',
        key,
        options,
        multiple,
        label,
        helperText,
        placeholder,
        isMandatory,
        iconName,
        disabled,
        classes,
        dropdownOptions,
      },
    }) => {
      const { initialValue, onchange } = state;
      const clear = newRow ? '.clear' : '';
      const isDisabled = disabled ? '[disabled]' : '';
      const isMultiple = multiple ? '[multiple]' : '';
      const noValidSelection = options.filter(o => isSelected(o.id, initialValue)).length === 0;
      return m(`.input-field.select-space${clear}`, { className, key }, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(
          `select[id=${id}]${isDisabled}${isMultiple}`,
          {
            oncreate: ({ dom }) => {
              state.instance = M.FormSelect.init(dom, { classes, dropdownOptions });
            },
            onchange,
          },
          placeholder ? m(`option[disabled]${noValidSelection ? '[selected]' : ''}`, placeholder) : '',
          options.map((o, i) =>
            m(
              `option[value=${o.id}]${o.disabled ? '[disabled]' : ''}${
                isSelected(o.id, initialValue, i === 0 && noValidSelection && !placeholder) ? '[selected]' : ''
              }`,
              o.label.replace('&amp;', '&')
            )
          )
        ),
        m(Label, { label, isMandatory }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};
