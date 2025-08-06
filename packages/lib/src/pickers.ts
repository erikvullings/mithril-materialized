import m, { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId } from './utils';
import { Label, HelperText } from './label';

export interface IDatePickerOptions {
  /** Date format string */
  format?: string;
  /** Show clear button */
  showClearBtn?: boolean;
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
}

/** Pure TypeScript DatePicker component - no MaterializeCSS dependencies */
export const DatePicker: FactoryComponent<IInputOptions<Date> & IDatePickerOptions> = () => {
  const state = { 
    id: uniqueId(),
    isOpen: false,
    selectedDate: null as Date | null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    inputElement: null as HTMLInputElement | null,
  };

  const formatDate = (date: Date, format: string = 'yyyy/mm/dd'): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const shortMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return format
      .replace('yyyy', String(year))
      .replace('mmmm', monthNames[month - 1])
      .replace('mmm', shortMonthNames[month - 1])
      .replace('mm', String(month).padStart(2, '0'))
      .replace('dd', String(day).padStart(2, '0'))
      .replace('d', String(day));
  };


  const selectDate = (date: Date, attrs: IInputOptions<Date> & IDatePickerOptions) => {
    state.selectedDate = date;
    state.isOpen = false;
    
    if (state.inputElement) {
      state.inputElement.value = formatDate(date, attrs.format);
    }
    
    if (attrs.onSelect) attrs.onSelect(date);
    if (attrs.onchange) attrs.onchange(date);
    if (attrs.onClose) attrs.onClose();
    
    m.redraw.sync();
  };

  const openPicker = (attrs: IInputOptions<Date> & IDatePickerOptions) => {
    state.isOpen = true;
    if (attrs.onOpen) attrs.onOpen();
    m.redraw.sync();
  };

  const closePicker = (attrs: IInputOptions<Date> & IDatePickerOptions) => {
    state.isOpen = false;
    if (attrs.onClose) attrs.onClose();
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
        format = 'yyyy/mm/dd',
        showClearBtn = true,
        defaultDate,
        ...props
      } = attrs;
      const id = state.id;
      const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      
      // Initialize selected date from initial value or default
      if (!state.selectedDate && (initialValue || defaultDate)) {
        state.selectedDate = initialValue || defaultDate || null;
      }

      return m(
        '.input-field',
        {
          className: cn,
        },
        [
          iconName ? m('i.material-icons.prefix', iconName) : '',
          m('input', {
            ...props,
            type: 'text',
            className: 'datepicker',
            id,
            disabled,
            readonly: true,
            value: state.selectedDate ? formatDate(state.selectedDate, format) : '',
            onclick: disabled ? undefined : () => openPicker(attrs),
            oncreate: ({ dom }) => {
              state.inputElement = dom as HTMLInputElement;
            },
            style: {
              cursor: disabled ? 'not-allowed' : 'pointer',
            }
          }),
          m(Label, { label, id, isMandatory, isActive: !!state.selectedDate }),
          m(HelperText, { helperText }),
          
          // Simple date picker popup (basic implementation)
          state.isOpen && m('.datepicker-popup', {
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
            // Simple date input for now
            m('input', {
              type: 'date',
              value: state.selectedDate ? state.selectedDate.toISOString().split('T')[0] : '',
              onchange: (e: Event) => {
                const target = e.target as HTMLInputElement;
                const date = new Date(target.value);
                if (!isNaN(date.getTime())) {
                  selectDate(date, attrs);
                }
              },
              style: {
                width: '100%',
                padding: 'var(--md-spacing-sm)',
                border: '1px solid var(--md-grey-400)',
                borderRadius: 'var(--md-radius-small)',
              }
            }),
            m('.datepicker-actions', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'var(--md-spacing-sm)',
              }
            }, [
              showClearBtn && m('button', {
                type: 'button',
                onclick: () => {
                  state.selectedDate = null;
                  if (state.inputElement) state.inputElement.value = '';
                  if (onchange) onchange(null as any);
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
