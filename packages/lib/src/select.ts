import m, { FactoryComponent } from 'mithril';
import { uniqueId, toDottedClassList } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

export interface ISelectOption {
  id?: string | number;
  label: string;
  disabled?: boolean;
}

export interface ISelectOptions extends IInputOptions {
  options: ISelectOption[];
  checkedId?: string | number | string[] | number[];
  multiple?: boolean;
}

/** Component to select from a list of values in a dropdowns */
export const Select: FactoryComponent<ISelectOptions> = () => {
  const state = { id: uniqueId() };
  const isSelected = <T extends number | string>(index: number, id: T, checkedId?: T | T[]) =>
    (index === 0 && typeof checkedId === 'undefined') ||
    (checkedId instanceof Array ? checkedId.indexOf(id) >= 0 : checkedId === id);
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
      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : undefined,
        m(
          `select[id=${id}]${multiple ? '[multiple]' : ''}`,
          {
            oncreate: ({ dom }) => {
              M.FormSelect.init(dom);
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
          placeholder ? m('option[value=""][disabled]', placeholder) : '',
          options.map((o, i) =>
            m(
              `option[value=${o.id}]${o.disabled ? '[disabled]' : ''}${
                isSelected(i, o.id || o.label, checkedId) ? '[selected]' : ''
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
