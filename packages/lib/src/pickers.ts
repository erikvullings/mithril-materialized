import m, { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId } from './utils';
// import { Label, HelperText } from './label';

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
  /** Disabled state - prevents all interaction */
  disabled?: boolean;
  /** Readonly state - shows value but prevents editing */
  readonly?: boolean;
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
  /** Input handler - fires on every change */
  oninput?: (value: string) => void;
  /** Change handler for the date value (ISO string) - fires on blur/focus loss */
  onchange?: (value: string) => void;
}

/** Enhanced DatePicker component with i18n support and improved functionality */
export const DatePicker: FactoryComponent<IInputOptions<string> & IDatePickerOptions> = () => {
  const state = { 
    id: uniqueId(),
    date: '',
    hasFocus: false,
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

  // Set date value with immediate input callback
  const setDate = (newDate: string, attrs: IInputOptions<string> & IDatePickerOptions, triggerInput = true) => {
    state.date = newDate;
    
    // Fire oninput immediately for real-time updates
    if (triggerInput && attrs.oninput) attrs.oninput(newDate);
    
    if (attrs.onSelect && newDate) {
      attrs.onSelect(new Date(newDate));
    }
  };

  // Fire onchange on blur/focus loss
  const fireOnChange = (attrs: IInputOptions<string> & IDatePickerOptions) => {
    if (attrs.onchange) attrs.onchange(state.date);
  };

  return {
    oninit: ({ attrs }) => {
      // Initialize date from value or defaultDate
      let initialDate = attrs.value || 
                        (attrs.defaultDate ? attrs.defaultDate.toISOString().slice(0, 10) : '');
      
      // Handle initialValue which might be a Date object or string
      if (attrs.initialValue) {
        if (attrs.initialValue instanceof Date) {
          // Convert Date to ISO format for HTML5 date input
          initialDate = attrs.initialValue.toISOString().slice(0, 10);
        } else {
          initialDate = String(attrs.initialValue);
        }
      }
      
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
        readonly = false,
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
      const isInteractive = !disabled && !readonly;
      const showButtons = state.hasFocus && isInteractive && (showTodayBtn || showClearBtn);

      return m('.input-field', {
        className: finalClassName,
        style: { maxWidth, ...style }
      }, [
        // Icon prefix
        iconName && m('i.material-icons.prefix', iconName),
        
        // Main date input
        m('input.validate.datepicker', {
          ...props,
          id,
          type: 'date',
          value: state.date,
          disabled,
          readonly,
          required,
          onfocus: () => {
            state.hasFocus = true;
            if (attrs.onOpen) attrs.onOpen();
            m.redraw();
          },
          onclick: () => {
            if (attrs.onOpen) attrs.onOpen();
          },
          onblur: () => {
            // Fire onchange when losing focus if valid date
            if (state.date) {
              fireOnChange(attrs);
            }
            // Small delay to allow button clicks
            setTimeout(() => {
              state.hasFocus = false;
              m.redraw();
            }, 150);
          },
          oninput: (e: Event) => {
            const target = e.target as HTMLInputElement;
            setDate(target.value, attrs, true);
          },
          onchange: (e: Event) => {
            const target = e.target as HTMLInputElement;
            setDate(target.value, attrs, false);
            // Don't fire onchange here - only on blur
          },
          style: {
            cursor: disabled ? 'not-allowed' : 'default',
          }
        }),
        
        // Label
        m('label.active', { for: id }, label),
        
        // Helper text (hidden when buttons are shown)
        helperText && !showButtons && m('span.helper-text', helperText),

        // Small action buttons (only when focused and interactive)
        showButtons && m('div', {
          style: { 
            display: 'flex',
            gap: '8px',
            marginTop: '4px',
            fontSize: '12px'
          }
        }, [
          // Today button
          showTodayBtn && m('button.btn-flat', {
            type: 'button',
            onclick: () => setDate(todayISO(), attrs),
            style: {
              padding: '2px 8px',
              minWidth: 'auto',
              height: '24px',
              lineHeight: '20px',
              fontSize: '11px',
              textTransform: 'none'
            }
          }, [
            m('i.material-icons', {
              style: { fontSize: '14px', marginRight: '4px' }
            }, 'today'),
            i18n.todayLabel
          ]),
          
          // Clear button
          showClearBtn && m('button.btn-flat', {
            type: 'button',
            onclick: () => setDate('', attrs),
            style: {
              padding: '2px 8px',
              minWidth: 'auto',
              height: '24px',
              lineHeight: '20px',
              fontSize: '11px',
              textTransform: 'none'
            }
          }, [
            m('i.material-icons', {
              style: { fontSize: '14px', marginRight: '4px' }
            }, 'clear'),
            i18n.clearLabel
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

export interface ITimePickerI18n {
  /** Label for time field */
  timeLabel?: string;
  /** Helper text showing format */
  helperText?: string;
  /** Now button text */
  nowLabel?: string;
  /** Clear button text */
  clearLabel?: string;
  /** Close button text */
  closeLabel?: string;
  /** Icon for time input */
  iconName?: string;
  /** AM label for 12-hour format */
  amLabel?: string;
  /** PM label for 12-hour format */
  pmLabel?: string;
  /** Toggle 12h/24h button text */
  toggleFormatLabel?: string;
}

export interface ITimePickerFormat {
  /** Use 12-hour format */
  twelveHour?: boolean;
  /** Allow user to toggle between 12h/24h format */
  allowFormatToggle?: boolean;
}

export interface ITimePickerOptions extends ITimePickerI18n, ITimePickerFormat {
  /** Show clear button */
  showClearBtn?: boolean;
  /** Show now button */
  showNowBtn?: boolean;
  /** Use modal for time selection (default: true) */
  useModal?: boolean;
  /** Disabled state - prevents all interaction */
  disabled?: boolean;
  /** Readonly state - shows value but prevents editing */
  readonly?: boolean;
  /** Default time */
  defaultTime?: string;
  /** Auto close picker after selection */
  autoClose?: boolean;
  /** Callback when time is selected */
  onSelect?: (hours: number, minutes: number) => void;
  /** Callback when picker is opened */
  onOpen?: () => void;
  /** Callback when picker is closed */
  onClose?: () => void;
  /** Input handler - fires on every change */
  oninput?: (value: string) => void;
  /** Change handler for the time value (24h format) - fires on blur/focus loss */
  onchange?: (value: string) => void;
}

/** Enhanced TimePicker component with i18n support and improved functionality */
export const TimePicker: FactoryComponent<IInputOptions<string> & ITimePickerOptions> = () => {
  const state = { 
    id: uniqueId(),
    isOpen: false,
    selectedTime: '',
    hasFocus: false,
    currentTwelveHour: false,
    hours: 0,
    minutes: 0,
    isAmPm: 'AM',
    inputElement: null as HTMLInputElement | null,
    editingHours: false,
    editingMinutes: false,
  };

  // Default i18n values
  const getI18nDefaults = (): Required<ITimePickerI18n> => ({
    timeLabel: 'Time',
    helperText: 'HH:MM',
    nowLabel: 'Now',
    clearLabel: 'Clear',
    closeLabel: 'Close',
    iconName: 'access_time',
    amLabel: 'AM',
    pmLabel: 'PM',
    toggleFormatLabel: '12h/24h',
  });

  // Get current time in HH:MM format
  const nowTime = (): string => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  // Format time for display
  const formatTime = (time24: string, use12Hour: boolean): string => {
    if (!time24) return '';
    
    const [hours24, minutes] = time24.split(':').map(Number);
    
    if (use12Hour) {
      const period = hours24 >= 12 ? 'PM' : 'AM';
      const displayHours = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
      return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
    }
    
    return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Convert 12-hour time to 24-hour format
  const convertTo24Hour = (hours12: number, minutes: number, period: string): string => {
    let hours24 = hours12;
    if (period === 'AM' && hours12 === 12) hours24 = 0;
    if (period === 'PM' && hours12 !== 12) hours24 = hours12 + 12;
    return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Parse 24-hour time to components
  const parseTime = (time24: string) => {
    if (!time24) return { hours: 0, minutes: 0, period: 'AM' };
    const [hours24, minutes] = time24.split(':').map(Number);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    return { hours: hours24, hours12, minutes, period };
  };

  // Set time value with immediate input callback
  const setTime = (newTime: string, attrs: IInputOptions<string> & ITimePickerOptions, triggerInput = true) => {
    state.selectedTime = newTime;
    if (newTime) {
      const parsed = parseTime(newTime);
      state.hours = parsed.hours;
      state.minutes = parsed.minutes;
      state.isAmPm = parsed.period;
    }
    
    // Fire oninput immediately for real-time updates
    if (triggerInput && attrs.oninput) attrs.oninput(newTime);
    
    if (attrs.onSelect && newTime) {
      const [hours, minutes] = newTime.split(':').map(Number);
      attrs.onSelect(hours, minutes);
    }
  };

  // Fire onchange on blur/focus loss
  const fireOnChange = (attrs: IInputOptions<string> & ITimePickerOptions) => {
    if (attrs.onchange) attrs.onchange(state.selectedTime);
  };

  // Helper function to get properly formatted time value
  const getFormattedTimeValue = (state: any, use12Hour?: boolean): string => {
    return `${String(state.hours).padStart(2, '0')}:${String(state.minutes).padStart(2, '0')}`;
  };

  // Update time components
  const updateTime = (attrs: IInputOptions<string> & ITimePickerOptions, triggerInput = true) => {
    const newTime = `${String(state.hours).padStart(2, '0')}:${String(state.minutes).padStart(2, '0')}`;
    setTime(newTime, attrs, triggerInput);
  };

  // These functions are kept for potential future use with arrow controls
  // Currently using HTML5 time input for inline mode
  
  // // Adjust hours with proper wrapping
  // const adjustHours = (increment: number, attrs: IInputOptions<string> & ITimePickerOptions) => {
  //   if (state.currentTwelveHour) {
  //     // 12-hour format: display hours 1-12
  //     let displayHours = state.hours === 0 ? 12 : state.hours > 12 ? state.hours - 12 : state.hours;
  //     displayHours += increment;
  //     
  //     // Handle wrapping for 12-hour format
  //     if (displayHours > 12) {
  //       displayHours = 1;
  //     } else if (displayHours < 1) {
  //       displayHours = 12;
  //     }
  //     
  //     // Convert back to 24-hour internal format
  //     if (displayHours === 12) {
  //       state.hours = state.isAmPm === 'AM' ? 0 : 12;
  //     } else {
  //       state.hours = state.isAmPm === 'AM' ? displayHours : displayHours + 12;
  //     }
  //   } else {
  //     // 24-hour format: hours 0-23
  //     state.hours += increment;
  //     
  //     // Handle wrapping for 24-hour format
  //     if (state.hours > 23) {
  //       state.hours = 0;
  //     } else if (state.hours < 0) {
  //       state.hours = 23;
  //     }
  //   }
  //   
  //   updateTime(attrs);
  // };

  // // Adjust minutes with proper zero padding
  // const adjustMinutes = (increment: number, attrs: IInputOptions<string> & ITimePickerOptions) => {
  //   let newMinutes = state.minutes + increment;
  //   
  //   if (newMinutes >= 60) newMinutes = 0;
  //   if (newMinutes < 0) newMinutes = 59;
  //   
  //   state.minutes = newMinutes;
  //   updateTime(attrs);
  // };

  // // Toggle AM/PM
  // const toggleAmPm = (attrs: IInputOptions<string> & ITimePickerOptions) => {
  //   state.isAmPm = state.isAmPm === 'AM' ? 'PM' : 'AM';
  //   if (state.hours < 12) {
  //     state.hours += 12;
  //   } else {
  //     state.hours -= 12;
  //   }
  //   updateTime(attrs);
  // };

  // Open picker
  const openPicker = (attrs: IInputOptions<string> & ITimePickerOptions) => {
    if (attrs.disabled || attrs.readonly) return;
    state.isOpen = true;
    if (attrs.onOpen) attrs.onOpen();
  };

  // Close picker
  const closePicker = (attrs: IInputOptions<string> & ITimePickerOptions) => {
    state.isOpen = false;
    fireOnChange(attrs);
    if (attrs.onClose) attrs.onClose();
  };

  // Global click handler reference
  let globalClickHandler: ((e: MouseEvent) => void) | null = null;

  return {
    oninit: ({ attrs }) => {
      // Initialize time from value or defaultTime
      const initialTime = attrs.value || 
                          attrs.defaultTime ||
                          (attrs.initialValue ? String(attrs.initialValue) : '');
      if (initialTime) {
        const parsed = parseTime(initialTime);
        state.selectedTime = initialTime;
        state.hours = parsed.hours;
        state.minutes = parsed.minutes;
        state.isAmPm = parsed.period;
      }
      state.currentTwelveHour = attrs.twelveHour || false;
      
      // Create global click handler for inline mode
      globalClickHandler = (e: MouseEvent) => {
        if (!state.hasFocus || attrs.useModal !== false) return;
        
        const target = e.target as HTMLElement;
        const inputElement = document.getElementById(state.id);
        const controlsElement = inputElement?.parentElement?.querySelector('.inline-time-controls');
        
        // Don't close if clicking on the input or controls
        if (inputElement?.contains(target) || controlsElement?.contains(target)) {
          return;
        }
        
        // Close the inline controls
        state.hasFocus = false;
        fireOnChange(attrs);
        m.redraw();
      };
      
      // Add global click listener for inline mode
      document.addEventListener('click', globalClickHandler);
    },
    
    onremove: () => {
      // Clean up global click listener
      if (globalClickHandler) {
        document.removeEventListener('click', globalClickHandler);
        globalClickHandler = null;
      }
    },

    view: ({ attrs }) => {
      const i18n = { ...getI18nDefaults(), ...attrs };
      const {
        label = i18n.timeLabel,
        helperText = i18n.helperText,
        newRow,
        className = 'col s12',
        iconName = i18n.iconName,
        isMandatory,
        disabled = false,
        readonly = false,
        required = false,
        twelveHour = false,
        allowFormatToggle = false,
        showClearBtn = true,
        showNowBtn = true,
        useModal = true,
        maxWidth = '320px',
        style = {},
        ...props
      } = attrs;

      const id = state.id;
      const finalClassName = newRow ? `${className} clear` : className;
      const isInteractive = !disabled && !readonly;
      const showButtons = state.hasFocus && isInteractive && (showNowBtn || showClearBtn || allowFormatToggle);
      const displayFormat = state.currentTwelveHour;

      return m('.input-field.timepicker', {
        className: finalClassName,
        style: { maxWidth, ...style }
      }, [
        // Icon prefix
        iconName && m('i.material-icons.prefix', iconName),
        
        // Main time input
        m('input.validate', {
          ...props,
          id,
          type: 'text',
          value: formatTime(state.selectedTime, displayFormat),
          disabled,
          readonly: useModal,
          required,
          onclick: useModal ? () => openPicker(attrs) : (() => {
            if (attrs.onOpen) attrs.onOpen();
          }),
          onfocus: () => {
            state.hasFocus = true;
            if (useModal) openPicker(attrs);
            else if (attrs.onOpen) attrs.onOpen();
            m.redraw();
          },
          onblur: (e: FocusEvent) => {
            // For inline mode, only lose focus if not moving to a child control
            if (!useModal) {
              const relatedTarget = e.relatedTarget as HTMLElement;
              const currentTarget = e.currentTarget as HTMLElement;
              const timeControls = currentTarget.parentElement?.querySelector('.inline-time-controls');
              
              // If focus is moving to inline time controls, don't close
              if (timeControls?.contains(relatedTarget)) {
                return;
              }
            }
            
            // Fire onchange when losing focus
            fireOnChange(attrs);
            // Small delay to allow button clicks
            setTimeout(() => {
              if (!state.isOpen) {
                state.hasFocus = false;
                m.redraw();
              }
            }, 150);
          },
          style: {
            cursor: disabled ? 'not-allowed' : (useModal && isInteractive ? 'pointer' : 'default'),
          }
        }),
        
        // Label
        m('label.active', { for: id }, label),
        
        // Helper text (hidden when buttons are shown or when inline controls are visible)
        helperText && !showButtons && !(state.hasFocus && !useModal) && m('span.helper-text', helperText),

        // Small action buttons (only when focused and interactive)
        showButtons && m('div', {
          style: { 
            display: 'flex',
            gap: '8px',
            marginTop: '4px',
            fontSize: '12px'
          }
        }, [
          // Now button
          showNowBtn && m('button.btn-flat', {
            type: 'button',
            onclick: () => setTime(nowTime(), attrs),
            style: {
              padding: '2px 8px',
              minWidth: 'auto',
              height: '24px',
              lineHeight: '20px',
              fontSize: '11px',
              textTransform: 'none'
            }
          }, [
            m('i.material-icons', {
              style: { fontSize: '14px', marginRight: '4px' }
            }, 'schedule'),
            i18n.nowLabel
          ]),
          
          // Clear button
          showClearBtn && m('button.btn-flat', {
            type: 'button',
            onclick: () => setTime('', attrs),
            style: {
              padding: '2px 8px',
              minWidth: 'auto',
              height: '24px',
              lineHeight: '20px',
              fontSize: '11px',
              textTransform: 'none'
            }
          }, [
            m('i.material-icons', {
              style: { fontSize: '14px', marginRight: '4px' }
            }, 'clear'),
            i18n.clearLabel
          ]),

          // Format toggle button
          allowFormatToggle && m('button.btn-flat', {
            type: 'button',
            onclick: () => {
              state.currentTwelveHour = !state.currentTwelveHour;
              m.redraw();
            },
            style: {
              padding: '2px 8px',
              minWidth: 'auto',
              height: '24px',
              lineHeight: '20px',
              fontSize: '11px',
              textTransform: 'none'
            }
          }, [
            m('i.material-icons', {
              style: { fontSize: '14px', marginRight: '4px' }
            }, 'swap_horiz'),
            state.currentTwelveHour ? '24h' : '12h'
          ]),
        ]),

        // Inline time controls (when not using modal and focused)
        !useModal && state.hasFocus && isInteractive && m('.inline-time-controls', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '14px'
          },
          // Prevent closing when clicking inside the controls
          onclick: (e: MouseEvent) => e.stopPropagation()
        }, [
          // Time display with format-aware input
          state.currentTwelveHour ? 
            // 12-hour format with separate hour, minute, and AM/PM controls
            m('.time-controls-12h', {
              style: { display: 'flex', alignItems: 'center', gap: '4px' }
            }, [
              // Hours input (1-12)
              m('input', {
                type: 'number',
                min: 1,
                max: 12,
                value: state.hours === 0 ? 12 : state.hours > 12 ? state.hours - 12 : state.hours,
                oninput: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  let value = parseInt(target.value);
                  if (!isNaN(value) && value >= 1 && value <= 12) {
                    if (value === 12) {
                      state.hours = state.isAmPm === 'AM' ? 0 : 12;
                    } else {
                      state.hours = state.isAmPm === 'AM' ? value : value + 12;
                    }
                    updateTime(attrs, true);
                  }
                },
                style: {
                  width: '50px',
                  textAlign: 'center',
                  padding: '4px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }
              }),
              m('span', ':'),
              // Minutes input (0-59)
              m('input', {
                type: 'number',
                min: 0,
                max: 59,
                value: String(state.minutes).padStart(2, '0'),
                oninput: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  let value = parseInt(target.value);
                  if (!isNaN(value) && value >= 0 && value <= 59) {
                    state.minutes = value;
                    updateTime(attrs, true);
                  }
                },
                onfocus: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  target.value = String(state.minutes);
                },
                onblur: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  target.value = String(state.minutes).padStart(2, '0');
                },
                style: {
                  width: '50px',
                  textAlign: 'center',
                  padding: '4px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }
              }),
              // AM/PM selector
              m('select', {
                value: state.isAmPm,
                onchange: (e: Event) => {
                  const target = e.target as HTMLSelectElement;
                  const newPeriod = target.value;
                  if (newPeriod !== state.isAmPm) {
                    state.isAmPm = newPeriod as 'AM' | 'PM';
                    if (newPeriod === 'PM' && state.hours < 12) {
                      state.hours += 12;
                    } else if (newPeriod === 'AM' && state.hours >= 12) {
                      state.hours -= 12;
                    }
                    updateTime(attrs, true);
                  }
                },
                style: {
                  padding: '4px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginLeft: '4px'
                }
              }, [
                m('option', { value: 'AM' }, i18n.amLabel),
                m('option', { value: 'PM' }, i18n.pmLabel)
              ])
            ]) :
            // 24-hour format with HTML5 time input (always 24h)
            m('input', {
              type: 'time',
              value: state.selectedTime,
              oninput: (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  setTime(target.value, attrs, true);
                }
              },
              onchange: (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  setTime(target.value, attrs, false);
                }
              },
              style: {
                fontSize: '16px',
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minWidth: '120px'
              }
            }),
          
          // Format toggle in inline mode
          allowFormatToggle && m('button.btn-flat', {
            type: 'button',
            onclick: (e: MouseEvent) => {
              e.stopPropagation();
              state.currentTwelveHour = !state.currentTwelveHour;
              // Update the main input to reflect the new format
              const mainInput = document.getElementById(state.id) as HTMLInputElement;
              if (mainInput && state.selectedTime) {
                mainInput.value = formatTime(state.selectedTime, state.currentTwelveHour);
              }
              m.redraw();
            },
            style: {
              padding: '4px 8px',
              fontSize: '11px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              minWidth: 'auto'
            }
          }, state.currentTwelveHour ? '24h' : '12h'),
        ]),

        // Time picker modal (only when useModal is true)
        useModal && state.isOpen && m('.timepicker-modal', {
          style: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          },
          onclick: (e: MouseEvent) => {
            if (e.target === e.currentTarget) closePicker(attrs);
          }
        }, [
          m('.timepicker-content', {
            style: {
              background: 'white',
              borderRadius: '8px',
              padding: '24px',
              minWidth: '320px',
              maxWidth: '400px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            },
            onclick: (e: MouseEvent) => e.stopPropagation()
          }, [
            // Header with format toggle
            m('.modal-header', {
              style: { 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }
            }, [
              m('h5', {
                style: { margin: '0' }
              }, i18n.timeLabel),
              allowFormatToggle && m('button.btn-flat', {
                type: 'button',
                onclick: () => {
                  state.currentTwelveHour = !state.currentTwelveHour;
                  m.redraw();
                },
                style: {
                  padding: '4px 8px',
                  fontSize: '11px',
                  minWidth: 'auto'
                }
              }, [
                m('i.material-icons', {
                  style: { fontSize: '14px', marginRight: '4px' }
                }, 'swap_horiz'),
                state.currentTwelveHour ? '24h' : '12h'
              ])
            ]),

            // Time display with proper input handling
            m('.time-display', {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '24px',
                fontSize: '2.5rem',
                fontWeight: '300'
              }
            }, [
              // Hours
              m('input', {
                type: 'number',
                min: displayFormat ? 1 : 0,
                max: displayFormat ? 12 : 23,
                value: displayFormat 
                  ? (state.hours === 0 ? 12 : state.hours > 12 ? state.hours - 12 : state.hours)
                  : state.hours,
                onkeydown: (e: KeyboardEvent) => {
                  const target = e.target as HTMLInputElement;
                  const currentValue = parseInt(target.value) || (displayFormat ? 12 : 0);
                  
                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    let newValue;
                    if (displayFormat) {
                      newValue = currentValue >= 12 ? 1 : currentValue + 1;
                    } else {
                      newValue = currentValue >= 23 ? 0 : currentValue + 1;
                    }
                    target.value = String(newValue);
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    let newValue;
                    if (displayFormat) {
                      newValue = currentValue <= 1 ? 12 : currentValue - 1;
                    } else {
                      newValue = currentValue <= 0 ? 23 : currentValue - 1;
                    }
                    target.value = String(newValue);
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                },
                onwheel: (e: WheelEvent) => {
                  if (document.activeElement === e.target) {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    const currentValue = parseInt(target.value) || (displayFormat ? 12 : 0);
                    let newValue;
                    
                    if (e.deltaY < 0) { // scrolling up
                      if (displayFormat) {
                        newValue = currentValue >= 12 ? 1 : currentValue + 1;
                      } else {
                        newValue = currentValue >= 23 ? 0 : currentValue + 1;
                      }
                    } else { // scrolling down
                      if (displayFormat) {
                        newValue = currentValue <= 1 ? 12 : currentValue - 1;
                      } else {
                        newValue = currentValue <= 0 ? 23 : currentValue - 1;
                      }
                    }
                    target.value = String(newValue);
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                },
                oninput: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  let value = parseInt(target.value);
                  
                  if (isNaN(value)) {
                    return; // Don't update if not a valid number during typing
                  }
                  
                  if (displayFormat) {
                    // Convert 12-hour display to 24-hour internal format
                    if (value === 12) {
                      state.hours = state.isAmPm === 'AM' ? 0 : 12;
                    } else if (value >= 1 && value <= 11) {
                      state.hours = state.isAmPm === 'AM' ? value : value + 12;
                    } else {
                      return; // Invalid value for 12-hour format during typing
                    }
                  } else {
                    // 24-hour format: only update if in valid range
                    if (value >= 0 && value <= 23) {
                      state.hours = value;
                    } else {
                      return; // Invalid value during typing
                    }
                  }
                  updateTime(attrs, true);
                },
                onchange: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  let value = parseInt(target.value);
                  
                  if (isNaN(value)) {
                    value = displayFormat ? 12 : 0;
                  }
                  
                  let wrappedValue = value;
                  let displayValue = value;
                  
                  if (displayFormat) {
                    // 12-hour format: wrap around 1-12
                    if (value < 1) {
                      wrappedValue = 12;
                      displayValue = 12;
                    } else if (value > 12) {
                      wrappedValue = 1;
                      displayValue = 1;
                    } else {
                      wrappedValue = value;
                      displayValue = value;
                    }
                    
                    // Convert 12-hour display to 24-hour internal format
                    if (wrappedValue === 12) {
                      state.hours = state.isAmPm === 'AM' ? 0 : 12;
                    } else {
                      state.hours = state.isAmPm === 'AM' ? wrappedValue : wrappedValue + 12;
                    }
                  } else {
                    // 24-hour format: wrap around 0-23
                    if (value < 0) {
                      wrappedValue = 23;
                      displayValue = 23;
                    } else if (value > 23) {
                      wrappedValue = 0;
                      displayValue = 0;
                    } else {
                      wrappedValue = value;
                      displayValue = value;
                    }
                    state.hours = wrappedValue;
                  }
                  
                  // Update the display to show wrapped value
                  target.value = String(displayValue);
                  updateTime(attrs, true);
                },
                style: {
                  width: '80px',
                  textAlign: 'center',
                  fontSize: '2.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '8px'
                }
              }),
              m('span', ':'),
              // Minutes with proper padding and wrapping
              m('input', {
                type: 'number',
                min: 0,
                max: 59,
                value: state.minutes,
                onkeydown: (e: KeyboardEvent) => {
                  const target = e.target as HTMLInputElement;
                  const currentValue = parseInt(target.value) || 0;
                  
                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const newValue = currentValue >= 59 ? 0 : currentValue + 1;
                    target.value = String(newValue).padStart(2, '0');
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const newValue = currentValue <= 0 ? 59 : currentValue - 1;
                    target.value = String(newValue).padStart(2, '0');
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                },
                onwheel: (e: WheelEvent) => {
                  if (document.activeElement === e.target) {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    const currentValue = parseInt(target.value) || 0;
                    let newValue;
                    
                    if (e.deltaY < 0) { // scrolling up
                      newValue = currentValue >= 59 ? 0 : currentValue + 1;
                    } else { // scrolling down
                      newValue = currentValue <= 0 ? 59 : currentValue - 1;
                    }
                    target.value = String(newValue).padStart(2, '0');
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                },
                oninput: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  let value = parseInt(target.value);
                  
                  if (isNaN(value)) {
                    return; // Don't update if not a valid number during typing
                  }
                  
                  // Only update if in valid range during typing
                  if (value >= 0 && value <= 59) {
                    state.minutes = value;
                    updateTime(attrs, true);
                  }
                },
                onchange: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  let value = parseInt(target.value);
                  
                  if (isNaN(value)) {
                    value = 0;
                  }
                  
                  let wrappedValue = value;
                  let displayValue = value;
                  
                  // Handle wrapping for minutes 0-59
                  if (value < 0) {
                    wrappedValue = 59;
                    displayValue = 59;
                  } else if (value > 59) {
                    wrappedValue = 0;
                    displayValue = 0;
                  } else {
                    wrappedValue = value;
                    displayValue = value;
                  }
                  
                  // Update the display to show wrapped value with proper padding
                  target.value = String(displayValue).padStart(2, '0');
                  state.minutes = wrappedValue;
                  updateTime(attrs, true);
                },
                // Format display to show padded value
                onfocus: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  target.value = String(state.minutes);
                },
                onblur: (e: Event) => {
                  const target = e.target as HTMLInputElement;
                  target.value = String(state.minutes).padStart(2, '0');
                },
                style: {
                  width: '80px',
                  textAlign: 'center',
                  fontSize: '2.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '8px'
                }
              }),
              // AM/PM selector for 12-hour format
              displayFormat && m('.ampm-selector', {
                style: { display: 'flex', flexDirection: 'column', gap: '4px' }
              }, [
                m('button', {
                  type: 'button',
                  class: state.isAmPm === 'AM' ? 'btn' : 'btn-flat',
                  onclick: () => {
                    if (state.isAmPm !== 'AM') {
                      state.isAmPm = 'AM';
                      if (state.hours >= 12) state.hours -= 12;
                      updateTime(attrs, true);
                    }
                  },
                  style: { minWidth: '60px', padding: '4px 8px' }
                }, i18n.amLabel),
                m('button', {
                  type: 'button',
                  class: state.isAmPm === 'PM' ? 'btn' : 'btn-flat',
                  onclick: () => {
                    if (state.isAmPm !== 'PM') {
                      state.isAmPm = 'PM';
                      if (state.hours < 12) state.hours += 12;
                      updateTime(attrs, true);
                    }
                  },
                  style: { minWidth: '60px', padding: '4px 8px' }
                }, i18n.pmLabel)
              ])
            ]),

            // Actions
            m('.timepicker-actions', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                gap: '8px',
                marginTop: '24px'
              }
            }, [
              m('div', { style: { display: 'flex', gap: '8px' } }, [
                showClearBtn && m('button.btn-flat', {
                  type: 'button',
                  onclick: () => {
                    setTime('', attrs, true);
                    closePicker(attrs);
                  }
                }, i18n.clearLabel),
                showNowBtn && m('button.btn-flat', {
                  type: 'button',
                  onclick: () => {
                    const now = nowTime();
                    setTime(now, attrs, true);
                    const parsed = parseTime(now);
                    state.hours = parsed.hours;
                    state.minutes = parsed.minutes;
                    state.isAmPm = parsed.period;
                  }
                }, i18n.nowLabel)
              ]),
              m('button.btn', {
                type: 'button',
                onclick: () => closePicker(attrs)
              }, i18n.closeLabel)
            ])
          ])
        ]),

        // Hidden input with current value for form submission
        m('input', { 
          type: 'hidden', 
          name: id, 
          value: state.selectedTime 
        }),
      ]);
    },
  };
};
