import m, { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId } from './utils';
import { Label, HelperText } from './label';

export interface IDatePickerI18n {
  /** Label for date field */
  dateLabel?: string;
  /** Helper text showing format */
  helperText?: string;
  /** Today button text */
  todayLabel?: string;
  /** Clear button text */
  clearLabel?: string;
  /** Close button text */
  closeLabel?: string;
  /** Icon for date input */
  iconName?: string;
}

export interface IDatePickerFormat {
  /** Date format for display (e.g., 'yyyy-mm-dd', 'dd/mm/yyyy', 'mm/dd/yyyy') */
  displayFormat?: string;
  /** Date format for value (always ISO format for consistency) */
  valueFormat?: string;
}

export interface IDatePickerOptions extends IDatePickerI18n, IDatePickerFormat {
  /** Show clear button */
  showClearBtn?: boolean;
  /** Show today button */
  showTodayBtn?: boolean;
  /** Default date */
  defaultDate?: Date;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disable weekends */
  disableWeekends?: boolean;
  /** Disabled dates array */
  disableDayFn?: (date: Date) => boolean;
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDay?: number;
  /** Show months after current */
  showMonthsAfterCurrentMonth?: number;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when picker is opened */
  onOpen?: () => void;
  /** Callback when picker is closed */
  onClose?: () => void;
  /** Change handler for the date value (ISO string) */
  onChange?: (value: string) => void;
}

/** Enhanced DatePicker component with i18n support and improved functionality */
export const DatePicker: FactoryComponent<IInputOptions<string> & IDatePickerOptions> = () => {
  const state = { 
    id: uniqueId(),
    date: '',
  };

  // Default i18n values
  const getI18nDefaults = (): Required<IDatePickerI18n> => ({
    dateLabel: 'Date',
    helperText: 'YYYY-MM-DD',
    todayLabel: 'Today',
    clearLabel: 'Clear',
    closeLabel: 'Close',
    iconName: 'event',
  });

  // Get today's date in ISO format
  const todayISO = (): string => {
    return new Date().toISOString().slice(0, 10);
  };

  // Format date for display based on specified format (utility for future custom display formats)
  // Currently the native date input handles this automatically
  // const formatDateForDisplay = (isoDate: string, displayFormat: string = 'yyyy-mm-dd'): string => { ... }

  // Parse display format back to ISO date (utility for future use)
  // const parseDisplayDate = (displayDate: string, displayFormat: string = 'yyyy-mm-dd'): string => {
  //   // Implementation available for custom text input parsing if needed
  // };

  // Set date value
  const setDate = (newDate: string, attrs: IInputOptions<string> & IDatePickerOptions) => {
    state.date = newDate;
    if (attrs.onChange) attrs.onChange(newDate);
    if (attrs.onchange) attrs.onchange(newDate);
    if (attrs.onSelect && newDate) {
      attrs.onSelect(new Date(newDate));
    }
  };

  return {
    oninit: ({ attrs }) => {
      // Initialize date from value or defaultDate
      const initialDate = attrs.value || 
                          (attrs.defaultDate ? attrs.defaultDate.toISOString().slice(0, 10) : '') ||
                          (attrs.initialValue ? String(attrs.initialValue) : '');
      state.date = initialDate;
    },

    view: ({ attrs }) => {
      const i18n = { ...getI18nDefaults(), ...attrs };
      const {
        label = i18n.dateLabel,
        helperText = i18n.helperText,
        newRow,
        className = 'col s12',
        iconName = i18n.iconName,
        isMandatory,
        disabled = false,
        required = false,
        displayFormat = 'yyyy-mm-dd',
        showClearBtn = true,
        showTodayBtn = true,
        maxWidth = '320px',
        style = {},
        ...props
      } = attrs;

      const id = state.id;
      const finalClassName = newRow ? `${className} clear` : className;
      // Display value for reference (could be used for custom display formats in the future)
      // const displayValue = formatDateForDisplay(state.date, displayFormat);

      return m('.input-field', {
        className: finalClassName,
        style: { maxWidth, ...style }
      }, [
        // Icon prefix
        iconName && m('i.material-icons.prefix', iconName),
        
        // Main date input (readonly, triggers native date picker)
        m('input.validate', {
          ...props,
          id,
          type: 'date',
          value: state.date,
          disabled,
          required,
          onchange: (e: Event) => {
            const target = e.target as HTMLInputElement;
            setDate(target.value, attrs);
          },
        }),
        
        // Label
        m('label.active', { for: id }, label),
        
        // Helper text
        helperText && m('span.helper-text', helperText),

        // Action buttons panel
        m('.card-panel', {
          style: { 
            padding: '12px', 
            marginTop: '8px',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.16), 0 2px 10px rgba(0,0,0,0.12)'
          }
        }, [
          m('.row', { style: { marginBottom: 0 } }, [
            // Today button
            showTodayBtn && m('.col.s6', [
              m('button.btn-flat', {
                type: 'button',
                disabled,
                onclick: () => setDate(todayISO(), attrs),
                style: {
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }, [
                m('i.material-icons.left', 'today'),
                i18n.todayLabel
              ]),
            ]),
            
            // Clear button
            showClearBtn && m(`.col.s${showTodayBtn ? '6' : '12'}`, [
              m('button.btn-flat', {
                type: 'button',
                disabled,
                onclick: () => setDate('', attrs),
                style: {
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }, [
                m('i.material-icons.left', 'clear'),
                i18n.clearLabel
              ]),
            ]),
          ]),
        ]),

        // Hidden input with current value for form submission
        m('input', { 
          type: 'hidden', 
          name: id, 
          value: state.date 
        }),
      ]);
    },
  };
};

export interface ITimePickerOptions {
  /** Use 12-hour format */
  twelveHour?: boolean;
  /** Show clear button */
  showClearBtn?: boolean;
  /** Default time */
  defaultTime?: string;
  /** Auto close picker after selection */
  autoClose?: boolean;
  /** Callback when time is selected */
  onSelect?: (hours: number, minutes: number) => void;
  /** Callback when picker is opened */
  onOpen?: () => void;
  /** Callback when picker is closed */
  onCloseEnd?: () => void;
}

/** Pure TypeScript TimePicker component - no MaterializeCSS dependencies */
export const TimePicker: FactoryComponent<IInputOptions & ITimePickerOptions> = () => {
  const state = { 
    id: uniqueId(),
    isOpen: false,
    selectedTime: '',
    inputElement: null as HTMLInputElement | null,
  };

  const formatTime = (time: string, twelveHour: boolean = false): string => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':').map(Number);
    
    if (twelveHour) {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
    }
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const selectTime = (time: string, attrs: IInputOptions & ITimePickerOptions) => {
    state.selectedTime = time;
    state.isOpen = false;
    
    if (state.inputElement) {
      state.inputElement.value = formatTime(time, attrs.twelveHour);
    }
    
    const [hours, minutes] = time.split(':').map(Number);
    if (attrs.onSelect) attrs.onSelect(hours, minutes);
    if (attrs.onchange) attrs.onchange(time);
    if (attrs.onCloseEnd) attrs.onCloseEnd();
    
    m.redraw.sync();
  };

  const openPicker = (attrs: IInputOptions & ITimePickerOptions) => {
    state.isOpen = true;
    if (attrs.onOpen) attrs.onOpen();
    m.redraw.sync();
  };

  const closePicker = (attrs: IInputOptions & ITimePickerOptions) => {
    state.isOpen = false;
    if (attrs.onCloseEnd) attrs.onCloseEnd();
    m.redraw.sync();
  };

  return {
    view: ({ attrs }) => {
      const {
        label,
        helperText,
        initialValue,
        newRow,
        className = 'col s12',
        iconName,
        isMandatory,
        onchange,
        disabled,
        twelveHour = false,
        showClearBtn = true,
        defaultTime,
        ...props
      } = attrs;
      const id = state.id;
      const cn = ['input-field', 'timepicker', newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      
      // Initialize selected time from initial value or default
      if (!state.selectedTime && (initialValue || defaultTime)) {
        state.selectedTime = initialValue || defaultTime || '';
      }

      return m(
        'div',
        {
          className: cn,
        },
        [
          iconName ? m('i.material-icons.prefix', iconName) : '',
          m('input', {
            ...props,
            type: 'text',
            id,
            disabled,
            readonly: true,
            value: state.selectedTime ? formatTime(state.selectedTime, twelveHour) : '',
            onclick: disabled ? undefined : () => openPicker(attrs),
            oncreate: ({ dom }) => {
              state.inputElement = dom as HTMLInputElement;
            },
            style: {
              cursor: disabled ? 'not-allowed' : 'pointer',
            }
          }),
          m(Label, { label, id, isMandatory, isActive: !!state.selectedTime }),
          m(HelperText, { helperText }),
          
          // Simple time picker popup
          state.isOpen && m('.timepicker-popup', {
            style: {
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'white',
              border: '1px solid var(--md-grey-300)',
              borderRadius: 'var(--md-radius-small)',
              boxShadow: 'var(--md-shadow-2)',
              zIndex: 1000,
              padding: 'var(--md-spacing-md)',
            }
          }, [
            // Simple time input
            m('input', {
              type: 'time',
              value: state.selectedTime,
              onchange: (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  selectTime(target.value, attrs);
                }
              },
              style: {
                width: '100%',
                padding: 'var(--md-spacing-sm)',
                border: '1px solid var(--md-grey-400)',
                borderRadius: 'var(--md-radius-small)',
              }
            }),
            m('.timepicker-actions', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'var(--md-spacing-sm)',
              }
            }, [
              showClearBtn && m('button', {
                type: 'button',
                onclick: () => {
                  state.selectedTime = '';
                  if (state.inputElement) state.inputElement.value = '';
                  if (onchange) onchange('');
                  closePicker(attrs);
                },
                style: {
                  background: 'transparent',
                  border: '1px solid var(--md-grey-400)',
                  padding: 'var(--md-spacing-xs) var(--md-spacing-sm)',
                  borderRadius: 'var(--md-radius-small)',
                  cursor: 'pointer',
                }
              }, 'Clear'),
              m('button', {
                type: 'button',
                onclick: () => closePicker(attrs),
                style: {
                  background: 'var(--md-primary)',
                  color: 'white',
                  border: 'none',
                  padding: 'var(--md-spacing-xs) var(--md-spacing-sm)',
                  borderRadius: 'var(--md-radius-small)',
                  cursor: 'pointer',
                }
              }, 'Close')
            ])
          ])
        ]
      );
    },
  };
};
