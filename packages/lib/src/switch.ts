import m, { FactoryComponent } from 'mithril';
import { uniqueId } from './utils';
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
      const cn = ['input-field', newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      return m('div', { className: cn }, [
        label ? m(Label, { label: label || '', id, isMandatory, className: 'active' }) : undefined,
        m(
          '.switch',
          params,
          m('label', {
            style: { cursor: 'pointer' },
            onclick: (e: Event) => {
              // Let the checkbox handle the click naturally
              e.stopPropagation();
            }
          }, [
            m('span', left || 'Off'),
            m('input[type=checkbox]', {
              id,
              disabled,
              checked,
              onclick: (e: Event) => {
                // Ensure checkbox state changes
                e.stopPropagation();
              },
              onchange: onchange
                ? (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    if (target) {
                      console.log('Switch changed:', target.checked); // Debug log
                      onchange(target.checked);
                    }
                  }
                : undefined,
            }),
            m('span.lever', {
              onclick: (e: Event) => {
                // When clicking on lever, trigger checkbox
                e.preventDefault();
                const checkbox = (e.target as HTMLElement).parentElement?.querySelector('input[type=checkbox]') as HTMLInputElement;
                if (checkbox && !disabled) {
                  checkbox.click();
                }
              }
            }),
            m('span', right || 'On'),
          ])
        ),
      ]);
    },
  };
};
