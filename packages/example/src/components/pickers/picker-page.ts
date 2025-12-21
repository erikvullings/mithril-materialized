import { DatePicker, TimePicker, CodeBlock, Switch, ModalPanel } from 'mithril-materialized';
import m from 'mithril';

export const PickerPage = () => {
  const state = {
    disabled: false,
    modalOpen: false,
    modalDate: '',
    modalTime: '',
    modalDateRange: '',
  };

  const onchange = (v: unknown) => console.log(`onchange fired. New value: ${v}`);
  const oninput = (v: unknown) => console.log(`oninput fired. New value: ${v}`);
  const year = new Date().getUTCFullYear();

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
            defaultValue: '1990-01-15',
            oninput,
            onchange,
            showWeekNumbers: true,
            weekNumbering: 'iso',
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
            defaultValue: '1990-01-15', // Add initial value so date displays
            showClearBtn: true,
            autoClose: true,
            i18n: {
              done: 'Ok',
              clear: 'Clear',
              cancel: 'Cancel',
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
            helperText: `Type in DD/MM/YYYY format (e.g., 25/12/${year})`,
            displayFormat: 'dd/mm/yyyy',
            iconName: 'event',
            defaultValue: `${year}-03-15`,
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
            helperText: `Type in MM/DD/YYYY format (e.g., 12/25/${year})`,
            displayFormat: 'mm/dd/yyyy',
            iconName: 'schedule',
            defaultValue: `${year}-07-04`,
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
            helperText: `Format: TT.MM.JJJJ (z.B., 25.12.${year})`,
            displayFormat: 'dd.mm.yyyy',
            iconName: 'person',
            defaultValue: '1985-11-09',
            showClearBtn: true,
            i18n: {
              cancel: 'Abbrechen',
              clear: 'Löschen',
              done: 'Fertig',
              previousMonth: '‹',
              nextMonth: '›',
              months: [
                'Januar',
                'Februar',
                'März',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember',
              ],
              monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
              weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
              weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
              weekdaysAbbrev: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
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
            defaultValue: `${year}-01-01`,
            onchange,
          })
        ),

        // Disabled and Readonly examples
        m('h4', 'Disabled and Readonly Examples'),
        m('.row', [
          m(DatePicker, {
            class: 'col s6',
            disabled: true,
            dateLabel: 'Disabled Date',
            helperText: 'Cannot interact',
            defaultValue: `${year}-01-15`,
            iconName: 'block',
            onchange,
          }),
          m(DatePicker, {
            class: 'col s6',
            readonly: true,
            dateLabel: 'Readonly Date',
            helperText: 'View only',
            defaultValue: `${year}-12-25`,
            iconName: 'visibility',
            onchange,
          }),
        ]),

        // Pickers in Modal Examples
        m('h3.header', 'Pickers in Modal'),
        m(
          'p',
          'DatePicker and TimePicker now work correctly inside modals - they float above the modal instead of being constrained by it.'
        ),

        m('.row', [
          m(
            'button.btn.waves-effect.waves-light',
            {
              onclick: () => {
                state.modalOpen = true;
              },
            },
            ['Open Modal with Pickers', m('i.material-icons.right', 'calendar_today')]
          ),
        ]),

        m(ModalPanel, {
          id: 'picker-modal',
          title: 'Select Date and Time',
          description: m('div', [
            m('p', 'The pickers below will float above this modal thanks to portal rendering:'),
            m('.row', [
              m(DatePicker, {
                class: 'col s12',
                label: 'Select a Date',
                helperText: 'This picker floats above the modal',
                iconName: 'event',
                defaultValue: state.modalDate || `${year}-01-15`,
                showClearBtn: true,
                onchange: (v) => {
                  state.modalDate = v;
                  console.log('Modal date selected:', v);
                },
              }),
            ]),
            m('.row', [
              m(TimePicker, {
                class: 'col s12',
                label: 'Select a Time',
                helperText: 'This picker also floats above the modal',
                iconName: 'access_time',
                useModal: true,
                twelveHour: true,
                defaultValue: state.modalTime || '09:00',
                showClearBtn: true,
                onchange: (v) => {
                  state.modalTime = v;
                  console.log('Modal time selected:', v);
                },
              }),
            ]),
            m('.row', [
              m(DatePicker, {
                class: 'col s12',
                dateRange: true,
                label: 'Select Date Range',
                helperText: 'Range picker also works in modals',
                iconName: 'date_range',
                initialStartDate: new Date(`${year}-03-01`),
                initialEndDate: new Date(`${year}-03-15`),
                showClearBtn: true,
                onchange: (v) => {
                  state.modalDateRange = v;
                  console.log('Modal date range selected:', v);
                },
              }),
            ]),
            m('p.grey-text', [
              'Selected date: ',
              m('strong', state.modalDate || 'none'),
              m('br'),
              'Selected time: ',
              m('strong', state.modalTime || 'none'),
              m('br'),
              'Selected range: ',
              m('strong', state.modalDateRange || 'none'),
            ]),
          ]),
          isOpen: state.modalOpen,
          onToggle: (open) => {
            state.modalOpen = open;
          },
          buttons: [
            {
              label: 'Close',
              onclick: () => {
                state.modalOpen = false;
              },
            },
          ],
        }),

        m(CodeBlock, {
          code: `// Pickers now work correctly inside modals!
m(ModalPanel, {
  title: 'Select Date and Time',
  description: m('div', [
    m(DatePicker, {
      label: 'Select a Date',
      helperText: 'This picker floats above the modal',
      iconName: 'event',
      onchange: (v) => console.log('Date:', v),
    }),
    m(TimePicker, {
      label: 'Select a Time',
      useModal: true,
      onchange: (v) => console.log('Time:', v),
    }),
    m(DatePicker, {
      dateRange: true,
      label: 'Select Date Range',
      onchange: (v) => console.log('Range:', v),
    }),
  ]),
  isOpen: state.modalOpen,
  onToggle: (open) => state.modalOpen = open,
})`,
        }),

        // Date Range Picker Examples
        m('h3.header', 'Date Range Picker'),

        m('h4', 'Basic Date Range Picker'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateRange: true,
            label: 'Select Date Range',
            helperText: 'Click to select start and end dates',
            iconName: 'date_range',
            initialStartDate: new Date(`${year}-03-01`),
            initialEndDate: new Date(`${year}-03-15`),
            showClearBtn: true,
            onSelect: (start, end) => console.table({ start, end }),
            onchange: (value) => {
              console.log('Date range selected:', value);
              onchange(value);
            },
          })
        ),

        m('h4', 'Date Range with Constraints'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateRange: true,
            label: 'Project Timeline',
            helperText: 'Min 3 days, max 30 days range',
            iconName: 'work',
            minDateRange: 3,
            maxDateRange: 30,
            format: 'mmmm d, yyyy',
            onchange: (value) => {
              console.log('Project timeline:', value);
              onchange(value);
            },
          })
        ),

        m('h4', 'Date Range with Min/Max Dates'),
        m(
          '.row',
          m(DatePicker, {
            disabled: state.disabled,
            dateRange: true,
            label: 'Vacation Dates',
            helperText: 'Select dates within this year',
            iconName: 'flight_takeoff',
            minDate: new Date(`${year}-01-01`),
            maxDate: new Date(`${year}-12-31`),
            autoClose: true,
            onchange: (value) => {
              console.log('Vacation dates:', value);
              onchange(value);
            },
          })
        ),

        m(CodeBlock, {
          code: `// Basic Date Range Picker
m(DatePicker, {
  dateRange: true,
  label: 'Select Date Range',
  helperText: 'Click to select start and end dates',
  initialStartDate: new Date('${year}-03-01'),
  initialEndDate: new Date('${year}-03-15'),
  onSelect: (start, end) => console.table({ start, end }),
  onchange: (value) => console.log('Range:', value), // Returns "YYYY-MM-DD - YYYY-MM-DD"
})

// Date Range with Constraints
m(DatePicker, {
  dateRange: true,
  label: 'Project Timeline',
  minDateRange: 3,  // Minimum 3 days
  maxDateRange: 30, // Maximum 30 days
  format: 'mmmm d, yyyy',
  onchange: (value) => console.log('Timeline:', value),
})

// Date Range with Date Limits
m(DatePicker, {
  dateRange: true,
  label: 'Vacation Dates',
  minDate: new Date('${year}-01-01'),
  maxDate: new Date('${year}-12-31'),
  autoClose: true, // Closes after selecting both dates
  onchange: (value) => console.log('Vacation:', value),
})`,
        }),

        m(CodeBlock, {
          code: `// Basic usage with custom text input and display formats
m(DatePicker, {
  dateLabel: 'What is your birthday?',
  helperText: 'Enter date in YYYY-MM-DD format',
  iconName: 'cake',
  displayFormat: 'yyyy-mm-dd', // Supports various formats
  defaultValue: '1990-01-15',
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
            label: 'When do you normally get up?',
            helperText: 'Select your wake-up time',
            iconName: 'alarm',
            defaultValue: '09:00',
            onchange,
          })
        ),

        // 12-hour format
        m('h4', '12-Hour Format'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            label: 'Appointment Time',
            helperText: 'HH:MM AM/PM format',
            twelveHour: true,
            iconName: 'schedule',
            defaultValue: '13:30',
            onchange,
          })
        ),

        // Inline time picker (no modal)
        m('h4', 'Inline Time Picker (No Modal)'),
        m(
          '.row',
          m(TimePicker, {
            disabled: state.disabled,
            label: 'Meeting Time',
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
            label: 'Appointment Time',
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
            label: 'Startzeit',
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
            label: 'Optional Time',
            showNowBtn: false,
            showClearBtn: true,
            clearLabel: 'Remove',
            onchange,
          })
        ),

        // Disabled and Readonly examples for TimePicker
        m('h4', 'Disabled and Readonly Time Examples'),
        m('.row', [
          m(TimePicker, {
            class: 'col s6',
            disabled: true,
            label: 'Disabled Time',
            helperText: 'Cannot interact',
            defaultValue: '15:30',
            iconName: 'block',
            onchange,
          }),
          m(TimePicker, {
            class: 'col s6',
            readonly: true,
            label: 'Readonly Time',
            helperText: 'View only',
            defaultValue: '09:15',
            iconName: 'visibility',
            useModal: false,
            onchange,
          }),
        ]),

        m(CodeBlock, {
          code: `// Inline time picker (no modal) - direct time input
m(TimePicker, {
  label: 'Meeting Time',
  useModal: false, // Shows HTML5 time input
  allowFormatToggle: true,
  oninput: (v) => console.log('Input:', v), // Fires on every change
  onchange: (v) => console.log('Change:', v), // Fires on blur
})

// Modal time picker with format toggle
m(TimePicker, {
  label: 'Appointment Time',
  useModal: true, // Default - shows modal
  allowFormatToggle: true,
  oninput: oninput,
  onchange,
})

// Disabled/readonly examples
m(TimePicker, {
  disabled: true, // or readonly: true
  label: 'Disabled Time',
  defaultValue: '14:30',
  onchange,
})`,
        }),
      ]),
  };
};
