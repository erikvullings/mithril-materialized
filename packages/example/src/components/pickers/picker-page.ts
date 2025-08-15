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
        m('h3.header', 'DatePicker - Enhanced with custom text input and display formats'),

        // Basic date picker
        m('h4', 'Basic Date Picker (ISO format - YYYY-MM-DD)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'What is your birthday?',
            helperText: 'Enter date in YYYY-MM-DD format or click to select',
            iconName: 'cake',
            displayFormat: 'yyyy-mm-dd',
            initialValue: '1990-01-15',
            oninput,
            onchange,
          })
        ),

        // New Materialize CSS style DatePicker with format attribute
        m('h4', 'New DatePicker with format attribute'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            label: 'What is your birthday?',
            helperText: 'Uses the new format attribute',
            iconName: 'cake',
            format: 'mmmm d, yyyy',
            yearrange: '1970,2045',
            initialValue: '1990-01-15', // Add initial value so date displays
            showClearBtn: true,
            autoClose: true,
            i18n: {
              done: 'Ok',
              clear: 'Clear',
              cancel: 'Cancel'
            },
            onchange: (value) => {
              console.log('New DatePicker selected:', value);
              onchange(value);
            },
          })
        ),

        // European format (dd/mm/yyyy)
        m('h4', 'European Format (DD/MM/YYYY)'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateLabel: 'Project Start Date',
            helperText: 'Type in DD/MM/YYYY format (e.g., 25/12/2024)',
            displayFormat: 'dd/mm/yyyy',
            iconName: 'event',
            initialValue: '2024-03-15',
            oninput,
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
            helperText: 'Type in MM/DD/YYYY format (e.g., 12/25/2024)',
            displayFormat: 'mm/dd/yyyy',
            iconName: 'schedule',
            initialValue: '2024-07-04',
            oninput,
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
            helperText: 'Format: TT.MM.JJJJ (z.B., 25.12.2024)',
            displayFormat: 'dd.mm.yyyy',
            iconName: 'person',
            initialValue: '1985-11-09',
            showClearBtn: true,
            i18n: {
              cancel: 'Abbrechen',
              clear: 'Löschen',
              done: 'Fertig',
              previousMonth: '‹',
              nextMonth: '›',
              months: [
                'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
              ],
              monthsShort: [
                'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
                'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
              ],
              weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
              weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
              weekdaysAbbrev: ['S', 'M', 'D', 'M', 'D', 'F', 'S']
            },
            oninput,
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
            initialValue: '2024-01-01',
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
              initialValue: '2024-01-15',
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
              initialValue: '2024-12-25',
              iconName: 'visibility',
              onchange,
            })
          ),
        ]),

        m(CodeBlock, {
          code: `// Basic usage with custom text input and display formats
m(DatePicker, {
  dateLabel: 'What is your birthday?',
  helperText: 'Enter date in YYYY-MM-DD format',
  iconName: 'cake',
  displayFormat: 'yyyy-mm-dd', // Supports various formats
  initialValue: '1990-01-15',
  oninput: (v) => console.log('Input:', v), // Fires on typing
  onchange: (v) => console.log('Change:', v), // Fires on blur
})

// European format with custom text input
m(DatePicker, {
  dateLabel: 'Geburtsdatum',
  displayFormat: 'dd.mm.yyyy', // User types DD.MM.YYYY
  todayLabel: 'Heute',
  clearLabel: 'Löschen',
  helperText: 'Format: TT.MM.JJJJ',
  onchange,
})

// US format with validation
m(DatePicker, {
  dateLabel: 'Appointment Date',
  displayFormat: 'mm/dd/yyyy', // User types MM/DD/YYYY
  helperText: 'Type in MM/DD/YYYY format',
  onchange, // Always returns ISO format internally
})

// Supported display formats:
// - 'yyyy-mm-dd' (ISO format)
// - 'dd/mm/yyyy' (European)
// - 'mm/dd/yyyy' (US)
// - 'dd.mm.yyyy' (German-style)
// - 'dd-mm-yyyy' (Alternative format)`,
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
            initialValue: '09:00',
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
            initialValue: '13:30',
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
              initialValue: '15:30',
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
              initialValue: '09:15',
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
  initialValue: '14:30',
  onchange,
})`,
        }),
      ]),
  };
};
