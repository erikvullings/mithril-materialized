import m, { Component } from 'mithril';
import { uniqueId, toDottedClassList, disable } from './utils';
import { IInputOptions } from './input-options';
import { Label } from './label';

export interface ISwitchOptions extends Partial<IInputOptions<boolean>> {
  /** Left text label */
  left?: string;
  /** Right text label */
  right?: string;
  /** If checked is true, the switch is set in the right position. */
  checked?: boolean;
}

/** Component to display a switch with two values. */
export const Switch = (): Component<ISwitchOptions> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const { label, contentClass, left, right, disabled, newRow, onchange, checked, isMandatory } = attrs;
      return m(`div${newRow ? '.clear' : ''}${toDottedClassList(contentClass)}`, [
        label ? m(Label, { label: label || '', id, isMandatory }) : undefined,
        m(
          '.switch',
          m('label', [
            left || 'Off',
            m(`input[id=${id}][type=checkbox]${disable({ disabled })}${checked ? '[checked]' : ''}`, {
              onclick: onchange
                ? (e: Event) => {
                    if (e.target && typeof (e.target as HTMLInputElement).checked !== 'undefined') {
                      onchange((e.target as HTMLInputElement).checked);
                    }
                  }
                : undefined,
            }),
            m('span.lever'),
            right || 'On',
          ])
        ),
      ]);
    },
  };
};
