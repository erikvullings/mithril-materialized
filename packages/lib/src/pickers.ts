import m, { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId } from './utils';
// import { Label, HelperText } from './label';

export interface DatePickerI18n {
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

export interface DatePickerFormat {
  /** Date format for display (e.g., 'yyyy-mm-dd', 'dd/mm/yyyy', 'mm/dd/yyyy') */
  displayFormat?: string;
  /** Date format for value (always ISO format for consistency) */
  valueFormat?: string;
}

export interface DatePickerOptions extends DatePickerI18n, DatePickerFormat {
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
  /** Input handler - fires on every change of a valid entry */
  oninput?: (value: string) => void;
  /** Change handler for the date value (ISO string) - fires on blur/focus loss */
  onchange?: (value: string) => void;
}

export interface DatePickerAttributes extends Omit<IInputOptions<string | Date>, 'onchange'>, DatePickerOptions {}

/** Enhanced DatePicker component with i18n support and improved functionality */
export const DatePicker: FactoryComponent<DatePickerAttributes> = () => {
  const state = {
    id: uniqueId(),
    date: '',
    hasFocus: false,
  };

  // Default i18n values
  const getI18nDefaults = (): Required<DatePickerI18n> => ({
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

  // Set date value with immediate input callback
  const setDate = (newDate: string, attrs: DatePickerAttributes, triggerInput = true) => {
    state.date = newDate;

    // Fire oninput immediately for real-time updates
    if (triggerInput && attrs.oninput) attrs.oninput(newDate);

    if (attrs.onSelect && newDate) {
      attrs.onSelect(new Date(newDate));
    }
  };

  // Fire onchange on blur/focus loss
  const fireOnChange = (attrs: DatePickerAttributes) => {
    if (attrs.onchange) attrs.onchange(state.date);
  };

  return {
    oninit: ({ attrs: { initialValue, defaultDate, id } }) => {
      if (id) state.id = id;
      // Initialize date from defaultDate or initialValue
      let initialDate = defaultDate ? defaultDate.toISOString().slice(0, 10) : '';

      // Handle initialValue which might be a Date object or string
      if (initialValue) {
        if (initialValue instanceof Date) {
          // Convert Date to ISO format for HTML5 date input
          initialDate = initialValue.toISOString().slice(0, 10);
        } else {
          initialDate = String(initialValue);
        }
      }

      state.date = initialDate;
    },

    view: ({ attrs }) => {
      const i18n = { ...getI18nDefaults(), ...attrs };
      const {
        id = state.id,
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

      // const id = state.id;
      const finalClassName = newRow ? `${className} clear` : className;
      const isInteractive = !disabled && !readonly;
      const showButtons = state.hasFocus && isInteractive && (showTodayBtn || showClearBtn);

      return m(
        '.input-field',
        {
          className: finalClassName,
          style: { maxWidth, ...style },
        },
        [
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
            },
          }),

          // Label
          m('label.active', { for: id }, label),

          // Helper text (hidden when buttons are shown)
          helperText && !showButtons && m('span.helper-text', helperText),

          // Small action buttons (only when focused and interactive)
          showButtons &&
            m('.datepicker-actions', {}, [
              // Today button
              showTodayBtn &&
                m(
                  'button.btn-flat',
                  {
                    type: 'button',
                    onclick: () => setDate(todayISO(), attrs),
                  },
                  [m('i.material-icons', 'today'), i18n.todayLabel]
                ),

              // Clear button
              showClearBtn &&
                m(
                  'button.btn-flat',
                  {
                    type: 'button',
                    onclick: () => setDate('', attrs),
                  },
                  [m('i.material-icons', 'clear'), i18n.clearLabel]
                ),
            ]),

          // Hidden input with current value for form submission
          m('input', {
            type: 'hidden',
            name: id,
            value: state.date,
          }),
        ]
      );
    },
  };
};

export interface TimePickerI18n {
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

export interface TimePickerFormat {
  /** Use 12-hour format */
  twelveHour?: boolean;
  /** Allow user to toggle between 12h/24h format */
  allowFormatToggle?: boolean;
}

export interface TimePickerOptions extends TimePickerI18n, TimePickerFormat {
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

export interface TimePickerAttributes extends IInputOptions<string>, TimePickerOptions {}

/** Enhanced TimePicker component with i18n support and improved functionality */
export const TimePicker: FactoryComponent<TimePickerAttributes> = () => {
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
  const getI18nDefaults = (): Required<TimePickerI18n> => ({
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

  // Parse 24-hour time to components
  const parseTime = (time24: string) => {
    if (!time24) return { hours: 0, minutes: 0, period: 'AM' };
    const [hours24, minutes] = time24.split(':').map(Number);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    return { hours: hours24, hours12, minutes, period };
  };

  // Set time value with immediate input callback
  const setTime = (newTime: string, attrs: TimePickerAttributes, triggerInput = true) => {
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
  const fireOnChange = (attrs: TimePickerAttributes) => {
    if (attrs.onchange) attrs.onchange(state.selectedTime);
  };

  // Update time components
  const updateTime = (attrs: TimePickerAttributes, triggerInput = true) => {
    const newTime = `${String(state.hours).padStart(2, '0')}:${String(state.minutes).padStart(2, '0')}`;
    setTime(newTime, attrs, triggerInput);
  };

  // Open picker
  const openPicker = (attrs: TimePickerAttributes) => {
    if (attrs.disabled || attrs.readonly) return;
    state.isOpen = true;
    if (attrs.onOpen) attrs.onOpen();
  };

  // Close picker
  const closePicker = (attrs: TimePickerAttributes) => {
    state.isOpen = false;
    fireOnChange(attrs);
    if (attrs.onClose) attrs.onClose();
  };

  // Global click handler reference
  let globalClickHandler: ((e: MouseEvent) => void) | null = null;

  return {
    oninit: ({ attrs }) => {
      // Initialize time from defaultTime or initialValue
      const initialTime = attrs.defaultTime || (attrs.initialValue ? String(attrs.initialValue) : '');
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

      return m(
        '.input-field.timepicker',
        {
          className: finalClassName,
          style: { maxWidth, ...style },
        },
        [
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
            onclick: useModal
              ? () => openPicker(attrs)
              : () => {
                  if (attrs.onOpen) attrs.onOpen();
                },
            onfocus: () => {
              state.hasFocus = true;
              if (useModal) openPicker(attrs);
              else if (attrs.onOpen) attrs.onOpen();
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
              cursor: useModal && isInteractive ? 'pointer' : 'default',
            },
          }),

          // Label
          m('label.active', { for: id }, label),

          // Helper text (hidden when buttons are shown or when inline controls are visible)
          helperText && !showButtons && !(state.hasFocus && !useModal) && m('span.helper-text', helperText),

          // Small action buttons (only when focused and interactive)
          showButtons &&
            m('.timepicker-actions', {}, [
              // Now button
              showNowBtn &&
                m(
                  'button.btn-flat',
                  {
                    type: 'button',
                    onclick: () => setTime(nowTime(), attrs),
                  },
                  [m('i.material-icons', 'schedule'), i18n.nowLabel]
                ),

              // Clear button
              showClearBtn &&
                m(
                  'button.btn-flat',
                  {
                    type: 'button',
                    onclick: () => setTime('', attrs),
                  },
                  [m('i.material-icons', 'clear'), i18n.clearLabel]
                ),

              // Format toggle button
              allowFormatToggle &&
                m(
                  'button.btn-flat',
                  {
                    type: 'button',
                    onclick: () => {
                      state.currentTwelveHour = !state.currentTwelveHour;
                    },
                  },
                  [m('i.material-icons', 'swap_horiz'), state.currentTwelveHour ? '24h' : '12h']
                ),
            ]),

          // Inline time controls (when not using modal and focused)
          !useModal &&
            state.hasFocus &&
            isInteractive &&
            m(
              '.inline-time-controls',
              {
                // Prevent closing when clicking inside the controls
                onclick: (e: MouseEvent) => e.stopPropagation(),
              },
              [
                // Time display with format-aware input
                state.currentTwelveHour
                  ? // 12-hour format with separate hour, minute, and AM/PM controls
                    m('.time-controls-12h', {}, [
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
                      }),
                      // AM/PM selector
                      m(
                        'select',
                        {
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
                        },
                        [m('option', { value: 'AM' }, i18n.amLabel), m('option', { value: 'PM' }, i18n.pmLabel)]
                      ),
                    ])
                  : // 24-hour format with HTML5 time input (always 24h)
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
                    }),

                // Format toggle in inline mode
                allowFormatToggle &&
                  m(
                    'button.btn-flat',
                    {
                      type: 'button',
                      onclick: (e: MouseEvent) => {
                        e.stopPropagation();
                        state.currentTwelveHour = !state.currentTwelveHour;
                      },
                    },
                    state.currentTwelveHour ? '24h' : '12h'
                  ),
              ]
            ),

          // Time picker modal (only when useModal is true)
          useModal &&
            state.isOpen &&
            m(
              '.timepicker-modal',
              {
                onclick: (e: MouseEvent) => {
                  if (e.target === e.currentTarget) closePicker(attrs);
                },
              },
              [
                m(
                  '.timepicker-content',
                  {
                    onclick: (e: MouseEvent) => e.stopPropagation(),
                  },
                  [
                    // Header with format toggle
                    m('.modal-header', {}, [
                      m('h5', i18n.timeLabel),
                      allowFormatToggle &&
                        m(
                          'button.btn-flat',
                          {
                            type: 'button',
                            onclick: () => {
                              state.currentTwelveHour = !state.currentTwelveHour;
                            },
                          },
                          [m('i.material-icons', 'swap_horiz'), state.currentTwelveHour ? '24h' : '12h']
                        ),
                    ]),

                    // Time display with proper input handling
                    m('.time-display', {}, [
                      // Hours
                      m('input', {
                        type: 'number',
                        min: displayFormat ? 1 : 0,
                        max: displayFormat ? 12 : 23,
                        value: displayFormat
                          ? state.hours === 0
                            ? 12
                            : state.hours > 12
                            ? state.hours - 12
                            : state.hours
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

                            if (e.deltaY < 0) {
                              // scrolling up
                              if (displayFormat) {
                                newValue = currentValue >= 12 ? 1 : currentValue + 1;
                              } else {
                                newValue = currentValue >= 23 ? 0 : currentValue + 1;
                              }
                            } else {
                              // scrolling down
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
                          padding: '8px',
                        },
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

                            if (e.deltaY < 0) {
                              // scrolling up
                              newValue = currentValue >= 59 ? 0 : currentValue + 1;
                            } else {
                              // scrolling down
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
                          padding: '8px',
                        },
                      }),
                      // AM/PM selector for 12-hour format
                      displayFormat &&
                        m('.ampm-selector', {}, [
                          m(
                            'button',
                            {
                              type: 'button',
                              class: state.isAmPm === 'AM' ? 'btn' : 'btn-flat',
                              onclick: () => {
                                if (state.isAmPm !== 'AM') {
                                  state.isAmPm = 'AM';
                                  if (state.hours >= 12) state.hours -= 12;
                                  updateTime(attrs, true);
                                }
                              },
                            },
                            i18n.amLabel
                          ),
                          m(
                            'button',
                            {
                              type: 'button',
                              class: state.isAmPm === 'PM' ? 'btn' : 'btn-flat',
                              onclick: () => {
                                if (state.isAmPm !== 'PM') {
                                  state.isAmPm = 'PM';
                                  if (state.hours < 12) state.hours += 12;
                                  updateTime(attrs, true);
                                }
                              },
                            },
                            i18n.pmLabel
                          ),
                        ]),
                    ]),

                    // Actions
                    m('.timepicker-actions', {}, [
                      m('div', {}, [
                        showClearBtn &&
                          m(
                            'button.btn-flat',
                            {
                              type: 'button',
                              onclick: () => {
                                setTime('', attrs, true);
                                closePicker(attrs);
                              },
                            },
                            i18n.clearLabel
                          ),
                        showNowBtn &&
                          m(
                            'button.btn-flat',
                            {
                              type: 'button',
                              onclick: () => {
                                const now = nowTime();
                                setTime(now, attrs, true);
                                const parsed = parseTime(now);
                                state.hours = parsed.hours;
                                state.minutes = parsed.minutes;
                                state.isAmPm = parsed.period;
                              },
                            },
                            i18n.nowLabel
                          ),
                      ]),
                      m(
                        'button.btn',
                        {
                          type: 'button',
                          onclick: () => closePicker(attrs),
                        },
                        i18n.closeLabel
                      ),
                    ]),
                  ]
                ),
              ]
            ),

          // Hidden input with current value for form submission
          m('input', {
            type: 'hidden',
            name: id,
            value: state.selectedTime,
          }),
        ]
      );
    },
  };
};
