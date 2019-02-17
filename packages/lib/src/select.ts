import m, { FactoryComponent } from 'mithril';
import { toDottedClassList, isNumeric } from './utils';
import { Label, HelperText } from './label';

export interface ISelectOption<T extends string | number> {
  id?: T;
  label: string;
  disabled?: boolean;
}

export interface ISelectOptions<T extends string | number> extends Partial<M.FormSelectOptions> {
  /** Options to select from */
  options: Array<ISelectOption<T>>;
  /** Called when the value is changed, either contains a single or all selected (checked) ids */
  onchange: (value?: string | number | string[] | number[]) => void;
  /** Selected id or ids (in case of multiple options) */
  checkedId?: string | number | string[] | number[];
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
  /** Classes that you wish to attach to the content, e.g. "col s12 m6 l4 xl3" to specify the size. */
  contentClass?: string;
  /**
   * If true, add a mandatory * after the label (if any),
   * and add the required and aria-required attributes to the input element.
   */
  isMandatory?: boolean;
  /** Add the required and aria-required attributes to the input element */
  required?: boolean;
}

/** Component to select from a list of values in a dropdowns */
export const Select: FactoryComponent<ISelectOptions<string | number>> = () => {
  const state = {
    instance: undefined as M.FormSelect | undefined,
  };
  const isSelected = (id?: string | number, checkedId?: string | number | Array<string | number>, selected = false) =>
    selected ||
    (checkedId instanceof Array && (id || typeof id === 'number') ? checkedId.indexOf(id) >= 0 : checkedId === id);
  return {
    view: ({
      attrs: {
        id,
        checkedId,
        newRow,
        contentClass,
        onchange,
        options,
        label,
        helperText,
        multiple,
        placeholder,
        isMandatory,
        iconName,
      },
    }) => {
      const clear = newRow ? '.clear' : '';
      const validSelection = options.filter(o => isSelected(o.id, checkedId)).length > 0;

      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(
          `select[id=${id}]${multiple ? '[multiple]' : ''}`,
          {
            oncreate: ({ dom, attrs }) => {
              state.instance = M.FormSelect.init(dom, attrs);
            },
            onupdate: ({ dom, attrs }) => {
              state.instance = M.FormSelect.init(dom, attrs);
            },
            onchange: onchange
              ? (e: Event) => {
                  if (multiple) {
                    const values = state.instance && state.instance.getSelectedValues();
                    const v = values
                      ? values.length > 0 && isNumeric(values[0])
                        ? values.map(n => +n)
                        : values
                      : undefined;
                    onchange(v);
                  } else if (e && e.currentTarget) {
                    const b = e.currentTarget as HTMLButtonElement;
                    const v = isNumeric(b.value) ? +b.value : b.value;
                    onchange(v);
                  }
                }
              : undefined,
          },
          placeholder ? m('option[value=""][disabled]', placeholder) : '',
          options.map((o, i) =>
            m(
              `option[value=${o.id}]${o.disabled ? '[disabled]' : ''}${
                isSelected(o.id, checkedId, i === 0 && !validSelection && !placeholder) ? '[selected]' : ''
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
