import { DatePicker, TimePicker, CodeBlock, Switch } from 'mithril-materialized';
import m from 'mithril';

export const PickerPage = () => {
  const state = { disabled: false };

  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);
  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Pickers'),
        m(
          '.row',
          m(Switch, {
            label: 'Disable pickers',
            left: 'enable',
            right: 'disable',
            onchange: v => (state.disabled = v),
          })
        ),
        m('h3.header', 'DatePicker'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            format: 'mmmm d, yyyy',
            label: 'What is your birthday?',
            yearRange: [1900, new Date().getFullYear() - 17],
            initialValue: new Date(),
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(DatePicker, {
            format: 'mmmm d, yyyy',
            label: 'What is your birthday?',
            yearRange: [1900, new Date().getFullYear() - 17],
            initialValue: new Date().toDateString(),
            onchange,
          })`,
        }),

        m('h3.header', 'TimePicker'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            label: 'When do you normally get up?',
            twelveHour: false,
            initialValue: '09:00',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(TimePicker, {
            label: 'What is your birthday?',
            twelveHour: false,
            initialValue: '09:00',
            onchange,
          })`,
        }),
      ]),
  };
};
