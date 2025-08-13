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
            onchange: (v) => (state.disabled = v),
          })
        ),
        m('h3.header', 'DatePicker - Enhanced with i18n support'),
        
        // Basic date picker
        m('h4', 'Basic Date Picker (ISO format)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'What is your birthday?',
            helperText: 'Select your date of birth',
            iconName: 'cake',
            value: '1990-01-15',
            onChange: onchange,
          })
        ),
        
        // European format (dd/mm/yyyy)
        m('h4', 'European Format (DD/MM/YYYY)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'Project Start Date',
            helperText: 'DD/MM/YYYY format',
            displayFormat: 'dd/mm/yyyy',
            iconName: 'event',
            onChange: onchange,
          })
        ),
        
        // US format (mm/dd/yyyy)
        m('h4', 'US Format (MM/DD/YYYY)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'Appointment Date',
            helperText: 'MM/DD/YYYY format',
            displayFormat: 'mm/dd/yyyy',
            iconName: 'schedule',
            onChange: onchange,
          })
        ),
        
        // Multilingual example (German-like)
        m('h4', 'Multilingual Example (German-style)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'Geburtsdatum',
            helperText: 'TT.MM.JJJJ Format',
            displayFormat: 'dd.mm.yyyy',
            todayLabel: 'Heute',
            clearLabel: 'Löschen',
            iconName: 'person',
            showTodayBtn: true,
            showClearBtn: true,
            onChange: onchange,
          })
        ),
        
        // Minimal example (only clear button)
        m('h4', 'Minimal (Clear only)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'Optional Date',
            showTodayBtn: false,
            showClearBtn: true,
            clearLabel: 'Remove',
            onChange: onchange,
          })
        ),

        m(CodeBlock, {
          code: `// Basic usage with i18n support
m(DatePicker, {
  dateLabel: 'What is your birthday?',
  helperText: 'Select your date of birth',
  iconName: 'cake',
  value: '1990-01-15',
  onChange: (dateString) => console.log('Selected:', dateString),
})

// European format with custom labels
m(DatePicker, {
  dateLabel: 'Geburtsdatum',
  displayFormat: 'dd.mm.yyyy',
  todayLabel: 'Heute',
  clearLabel: 'Löschen',
  onChange: onchange,
})

// US format
m(DatePicker, {
  dateLabel: 'Appointment Date',
  displayFormat: 'mm/dd/yyyy',
  helperText: 'MM/DD/YYYY format',
  onChange: onchange,
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
