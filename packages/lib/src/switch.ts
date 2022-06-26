import m, { FactoryComponent } from 'mithril';
import { uniqueId, disable } from './utils';
import { IInputOptions } from './input-options';
import { Label } from './label';
import './styles/switch.css';

export interface ISwitchOptions extends Partial<IInputOptions<boolean>> {
  /** Left text label */
  left?: string;
  /** Right text label */
  right?: string;
  /** If checked is true, the switch is set in the right position. */
  checked?: boolean;
}

/** Component to display a switch with two values. */
export const Switch: FactoryComponent<ISwitchOptions> = () => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const {
        label,
        left,
        right,
        disabled,
        newRow,
        onchange,
        checked,
        isMandatory,
        className = 'col s12',
        ...params
      } = attrs;
      return m(`div${newRow ? '.clear' : ''}`, { className }, [
        label ? m(Label, { label: label || '', id, isMandatory }) : undefined,
        m(
          '.switch',
          params,
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
