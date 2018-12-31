import m, { Component } from 'mithril';
import { uniqueId, toDottedClassList } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

export interface ISelectOptions extends IInputOptions {
  options: Array<{ id: string | number; label: string }>;
  checkedId?: string | number | string[] | number[];
  multiple?: boolean;
}

/** Component to select from a list of values in a dropdowns */
export const Select = (): Component<ISelectOptions> => {
  const state = { id: uniqueId() };
  const isSelected = <T extends number | string>(id: T, checkedId?: T | T[]) =>
    checkedId instanceof Array ? checkedId.indexOf(id) >= 0 : checkedId === id;
  return {
    oncreate: () => {
      const elem = document.querySelector(`#${state.id}`);
      if (elem) {
        M.FormSelect.init(elem);
      }
    },
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
      },
    }) => {
      const id = state.id;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field.select-space${clear}${toDottedClassList(contentClass)}`, [
        m(
          `select[id=${id}]${multiple ? '[multiple]' : ''}`,
          {
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
          options.map(o =>
            m(`option[value=${o.id}]${isSelected(o.id, checkedId) ? '[selected]' : ''}`, o.label.replace('&amp;', '&'))
          )
        ),
        m(Label, { label, isMandatory }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};
