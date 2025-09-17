import m, { FactoryComponent } from 'mithril';
import { uniqueId } from './utils';
import { InputAttrs } from './input-options';
import { Label } from './label';
// Styles are imported via the main index or individual component imports

export interface SwitchAttrs
  extends Pick<InputAttrs<boolean>, 'label' | 'disabled' | 'id' | 'className' | 'onchange' | 'newRow' | 'isMandatory'> {
  /** Left text label */
  left?: string;
  /** Right text label */
  right?: string;
  /** If checked is true, the switch is set in the right position. */
  checked?: boolean;
}

/** Component to display a switch with two values. */
export const Switch: FactoryComponent<SwitchAttrs> = () => {
  const state = { id: uniqueId(), checked: false };
  return {
    oninit: ({ attrs: { checked } }) => {
      state.checked = checked || false;
    },
    view: ({ attrs }) => {
      const {
        checked,
        label,
        left,
        right,
        disabled,
        newRow,
        onchange,
        isMandatory,
        className = 'col s12',
        id = state.id,
        ...params
      } = attrs;
      const cn = ['input-field', newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      return m(
        'div',
        {
          className: cn,
          onclick: (e: MouseEvent) => {
            e.preventDefault();
            onchange && onchange(!checked);
          },
        },
        [
          label && m(Label, { label: label || '', id, isMandatory, className: 'active' }),
          m(
            '.switch',
            params,
            m('label', [
              m('span', left || 'Off'),
              m('input[type=checkbox]', {
                id,
                disabled,
                checked,
              }),
              m('span.lever'),
              m('span', right || 'On'),
            ])
          ),
        ]
      );
    },
  };
};
