import m, { FactoryComponent } from 'mithril';
import { uniqueId, toDottedClassList } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

export interface ISelectOption {
  id?: string | number;
  label: string;
  disabled?: boolean;
}

export interface ISelectOptions extends Partial<M.FormSelectOptions>, IInputOptions {
  options: ISelectOption[];
  checkedId?: string | number | string[] | number[];
  multiple?: boolean;
}

/** Component to select from a list of values in a dropdowns */
export const Select: FactoryComponent<ISelectOptions> = () => {
  const state = { id: uniqueId() };
  const isSelected = <T extends number | string>(id: T, checkedId?: T | T[], selected = false) =>
    selected || (checkedId instanceof Array ? checkedId.indexOf(id) >= 0 : checkedId === id);
  return {
    view: ({
      attrs: {
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
      const id = state.id;
      const clear = newRow ? '.clear' : '';
      const validSelection = options.filter(o => isSelected(o.id || o.label, checkedId)).length > 0;
      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(
          `select[id=${id}]${multiple ? '[multiple]' : ''}`,
          {
            oncreate: ({ dom, attrs }) => {
              M.FormSelect.init(dom, attrs);
            },
            onupdate: ({ dom, attrs }) => {
              M.FormSelect.init(dom, attrs);
            },
            onchange: (e: Event) => {
              if (e && e.currentTarget) {
                const b = e.currentTarget as HTMLButtonElement;
                if (onchange) {
                  onchange(b.value);
                }
              }
            },
          },
          placeholder ? m(`option[value=""][disabled]${validSelection ? '' : '[selected]'}`, placeholder) : '',
          options.map((o, i) =>
            m(
              `option[value=${o.id}]${o.disabled ? '[disabled]' : ''}${
                isSelected(o.id || o.label, checkedId, i === 0 && !validSelection && !placeholder) ? '[selected]' : ''
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
