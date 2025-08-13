import { DatePicker, TimePicker, CodeBlock, Switch } from 'mithril-materialized';
import m from 'mithril';

export const PickerPage = () => {
  const state = { disabled: false };

  const onchange = (v: unknown) => console.log(`onchange fired. New value: ${v}`);
  const oninput = (v: unknown) => console.log(`oninput fired. New value: ${v}`);
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
            oninput,
            onchange,
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
            onchange,
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
            onchange,
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
            onchange,
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
            onchange,
          })
        ),

        // Disabled and Readonly examples
        m('h4', 'Disabled and Readonly Examples'),
        m('.row', [
          m(
            '.col.s6',
            m(DatePicker, {
              disabled: true,
              dateLabel: 'Disabled Date',
              helperText: 'Cannot interact',
              value: '2024-01-15',
              iconName: 'block',
              onchange,
            })
          ),
          m(
            '.col.s6',
            m(DatePicker, {
              readonly: true,
              dateLabel: 'Readonly Date',
              helperText: 'View only',
              value: '2024-12-25',
              iconName: 'visibility',
              onchange,
            })
          ),
        ]),

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
  onChange,
})

// US format
m(DatePicker, {
  dateLabel: 'Appointment Date',
  displayFormat: 'mm/dd/yyyy',
  helperText: 'MM/DD/YYYY format',
  onChange,
})`,
        }),

        m('h3.header', 'TimePicker - Enhanced with i18n support'),

        // Basic time picker (24h format)
        m('h4', 'Basic Time Picker (24h format)'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            timeLabel: 'When do you normally get up?',
            helperText: 'Select your wake-up time',
            iconName: 'alarm',
            value: '09:00',
            onchange,
          })
        ),

        // 12-hour format
        m('h4', '12-Hour Format'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            timeLabel: 'Appointment Time',
            helperText: 'HH:MM AM/PM format',
            twelveHour: true,
            iconName: 'schedule',
            value: '14:30',
            onchange,
          })
        ),

        // Inline time picker (no modal)
        m('h4', 'Inline Time Picker (No Modal)'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            timeLabel: 'Meeting Time',
            helperText: 'Use arrow buttons to adjust',
            useModal: false,
            allowFormatToggle: true,
            twelveHour: false,
            iconName: 'access_time',
            oninput: oninput,
            onchange,
          })
        ),

        // Modal time picker with format toggle
        m('h4', 'Modal Time Picker with Format Toggle'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            timeLabel: 'Appointment Time',
            helperText: 'Click to open modal',
            useModal: true,
            allowFormatToggle: true,
            twelveHour: false,
            iconName: 'event',
            oninput: oninput,
            onchange,
          })
        ),

        // Multilingual example (German-like)
        m('h4', 'Multilingual Example (German-style)'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            timeLabel: 'Startzeit',
            helperText: 'Wählen Sie eine Zeit',
            nowLabel: 'Jetzt',
            clearLabel: 'Löschen',
            closeLabel: 'Schließen',
            amLabel: 'VM',
            pmLabel: 'NM',
            iconName: 'schedule',
            showNowBtn: true,
            showClearBtn: true,
            onchange,
          })
        ),

        // Minimal example (clear only)
        m('h4', 'Minimal (Clear only)'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            timeLabel: 'Optional Time',
            showNowBtn: false,
            showClearBtn: true,
            clearLabel: 'Remove',
            onchange,
          })
        ),

        // Disabled and Readonly examples for TimePicker
        m('h4', 'Disabled and Readonly Time Examples'),
        m('.row', [
          m(
            '.col.s6',
            m(TimePicker, {
              disabled: true,
              timeLabel: 'Disabled Time',
              helperText: 'Cannot interact',
              value: '14:30',
              iconName: 'block',
              onchange,
            })
          ),
          m(
            '.col.s6',
            m(TimePicker, {
              readonly: true,
              timeLabel: 'Readonly Time',
              helperText: 'View only',
              value: '09:15',
              iconName: 'visibility',
              useModal: false,
              onchange,
            })
          ),
        ]),

        m(CodeBlock, {
          code: `// Inline time picker (no modal) - direct time input
m(TimePicker, {
  timeLabel: 'Meeting Time',
  useModal: false, // Shows HTML5 time input
  allowFormatToggle: true,
  oninput: (v) => console.log('Input:', v), // Fires on every change
  onchange: (v) => console.log('Change:', v), // Fires on blur
})

// Modal time picker with format toggle
m(TimePicker, {
  timeLabel: 'Appointment Time',
  useModal: true, // Default - shows modal
  allowFormatToggle: true,
  oninput: oninput,
  onchange,
})

// Disabled/readonly examples
m(TimePicker, {
  disabled: true, // or readonly: true
  timeLabel: 'Disabled Time',
  value: '14:30',
  onchange,
})`,
        }),
      ]),
  };
};
