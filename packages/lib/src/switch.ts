import m, { FactoryComponent } from 'mithril';
import { uniqueId } from './utils';
import { IInputOptions } from './input-options';
import { Label } from './label';
// Styles are imported via the main index or individual component imports

export interface ISwitchOptions extends Partial<IInputOptions<boolean>> {
  /** Left text label */
  left?: string;
  /** Right text label */
  right?: string;
  /** If checked is true, the switch is set in the right position. Only processed in oninit. */
  checked?: boolean;
}

/** Component to display a switch with two values. */
export const Switch: FactoryComponent<ISwitchOptions> = () => {
  const state = { id: uniqueId(), checked: false };
  return {
    oninit: ({ attrs: { checked } }) => {
      state.checked = checked || false;
    },
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const { label, left, right, disabled, newRow, onchange, isMandatory, className = 'col s12', ...params } = attrs;
      const cn = ['input-field', newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      return m(
        'div',
        {
          className: cn,
          onclick: () => {
            state.checked = !state.checked;
            onchange && onchange(state.checked);
          },
        },
        [
          label && m(Label, { label: label || '', id, isMandatory, className: 'active' }),
          m(
            '.switch',
            params,
            m(
              'label',
              {
                style: { cursor: 'pointer' },
              },
              [
                m('span', left || 'Off'),
                m('input[type=checkbox]', {
                  id,
                  disabled,
                  checked: state.checked,
                }),
                m('span.lever'),
                m('span', right || 'On'),
              ]
            )
          ),
        ]
      );
    },
  };
};
