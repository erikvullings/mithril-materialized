import m, { FactoryComponent } from 'mithril';
import { InputAttributes } from './input-options';
import { range, uniqueId } from './utils';

export interface DatePickerI18n {
  cancel?: string;
  clear?: string;
  done?: string;
  previousMonth?: string;
  nextMonth?: string;
  months?: string[];
  monthsShort?: string[];
  weekdays?: string[];
  weekdaysShort?: string[];
  weekdaysAbbrev?: string[];
}

const defaultI18n: Required<DatePickerI18n> = {
  cancel: 'Cancel',
  clear: 'Clear',
  done: 'Ok',
  previousMonth: '\u2039',
  nextMonth: '\u203a',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

export interface DatePickerOptions {
  /** Close when date is selected */
  autoClose?: boolean;
  /** The default output format for the input field value */
  format?: string;
  /** Custom parse function */
  parse?: (dateString: string, format: string) => Date | null;
  /** The initial date to view when first opened */
  defaultDate?: Date;
  /** Make the defaultDate the initial selected value */
  setDefaultDate?: boolean;
  /** Disable weekends */
  disableWeekends?: boolean;
  /** Custom function to disable specific days */
  disableDayFn?: (date: Date) => boolean;
  /** First day of week (0: Sunday, 1: Monday etc) */
  firstDay?: number;
  /** The earliest date that can be selected */
  minDate?: Date;
  /** The latest date that can be selected */
  maxDate?: Date;
  /** Number of years either side, or array of upper/lower range */
  yearRange?: number | number[];
  /** Show clear button */
  showClearBtn?: boolean;
  /** Internationalization */
  i18n?: DatePickerI18n;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when picker is opened */
  onOpen?: () => void;
  /** Callback when picker is closed */
  onClose?: () => void;
}

export interface DatePickerAttributes extends InputAttributes<string>, DatePickerOptions {
  /** Date format attribute (alternative to format property) */
  format?: string;
  /** Year range attribute (alternative to yearRange property) */
  yearrange?: string;
  /** Legacy: Date label (use label instead) */
  dateLabel?: string;
  /** Legacy: Display format (use format instead) */
  displayFormat?: string;
}

// Utility functions based on Materialize CSS implementation
const isDate = (obj: any): obj is Date => {
  return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
};

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const setToStartOfDay = (date: Date): void => {
  if (isDate(date)) date.setHours(0, 0, 0, 0);
};

const getDaysInMonth = (year: number, month: number): number => {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const compareDates = (a: Date, b: Date): boolean => {
  return a.getTime() === b.getTime();
};

interface Calendar {
  month: number;
  year: number;
}

interface DatePickerState {
  id: string;
  isOpen: boolean;
  date: Date | null;
  calendars: Calendar[];
  formats: { [key: string]: () => string | number };
  monthDropdownOpen: boolean;
  yearDropdownOpen: boolean;
}

/**
 * Enhanced DatePicker component based on Materialize CSS datepicker
 */
export const DatePicker: FactoryComponent<DatePickerAttributes> = () => {
  let state: DatePickerState;

  const mergeOptions = (attrs: DatePickerAttributes): Required<DatePickerOptions> => {
    // Handle HTML attributes
    let yearRange: number | number[] = 10;
    if (attrs.yearrange) {
      const parts = attrs.yearrange.split(',');
      if (parts.length === 2) {
        yearRange = [parseInt(parts[0], 10), parseInt(parts[1], 10)];
      }
    } else if (attrs.yearRange) {
      yearRange = attrs.yearRange;
    }

    // Handle format - priority: format attribute > displayFormat > default
    let finalFormat = 'mmm dd, yyyy';
    if (attrs.format) {
      finalFormat = attrs.format;
    } else if (attrs.displayFormat) {
      finalFormat = attrs.displayFormat;
    }

    const merged = {
      autoClose: false,
      format: finalFormat,
      parse: null,
      defaultDate: null,
      setDefaultDate: false,
      disableWeekends: false,
      disableDayFn: null,
      firstDay: 0,
      minDate: null,
      maxDate: null,
      yearRange,
      showClearBtn: false,
      i18n: defaultI18n,
      onSelect: null,
      onOpen: null,
      onClose: null,
      ...attrs,
    };

    // Merge i18n properly
    merged.i18n = { ...defaultI18n, ...attrs.i18n };

    return merged as Required<DatePickerOptions>;
  };

  const toString = (date: Date | null, format: string): string => {
    if (!date || !isDate(date)) {
      return '';
    }

    // Split format into tokens - match longer patterns first
    const formatTokens = /(dddd|ddd|dd|d|mmmm|mmm|mm|m|yyyy|yy)/g;
    let result = format;

    // Replace all format tokens with actual values
    result = result.replace(formatTokens, (match) => {
      if (state.formats[match]) {
        return String(state.formats[match]());
      }
      return match;
    });

    return result;
  };

  const setDate = (date: Date | null, preventOnSelect: boolean = false, options: Required<DatePickerOptions>) => {
    if (!date) {
      state.date = null;
      return;
    }

    if (typeof date === 'string') {
      date = new Date(Date.parse(date));
    }

    if (!isDate(date)) {
      return;
    }

    const min = options.minDate;
    const max = options.maxDate;

    if (isDate(min) && date < min) {
      date = min;
    } else if (isDate(max) && date > max) {
      date = max;
    }

    state.date = new Date(date.getTime());
    setToStartOfDay(state.date);
    gotoDate(state.date);

    if (!preventOnSelect && options.onSelect) {
      options.onSelect(state.date);
    }
  };

  const gotoDate = (date: Date) => {
    if (!isDate(date)) {
      return;
    }

    state.calendars = [
      {
        month: date.getMonth(),
        year: date.getFullYear(),
      },
    ];
  };

  const nextMonth = () => {
    state.calendars[0].month++;
    adjustCalendars();
  };

  const prevMonth = () => {
    state.calendars[0].month--;
    adjustCalendars();
  };

  const adjustCalendars = () => {
    state.calendars[0] = adjustCalendar(state.calendars[0]);
  };

  const adjustCalendar = (calendar: Calendar): Calendar => {
    if (calendar.month < 0) {
      calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
      calendar.month += 12;
    }
    if (calendar.month > 11) {
      calendar.year += Math.floor(Math.abs(calendar.month) / 12);
      calendar.month -= 12;
    }
    return calendar;
  };

  const renderDay = (opts: any, options: Required<DatePickerOptions>) => {
    const arr = [];
    let ariaSelected = 'false';

    if (opts.isEmpty) {
      if (opts.showDaysInNextAndPreviousMonths) {
        arr.push('is-outside-current-month');
        arr.push('is-selection-disabled');
      } else {
        return m('td.is-empty');
      }
    }

    if (opts.isDisabled) {
      arr.push('is-disabled');
    }

    if (opts.isToday) {
      arr.push('is-today');
    }

    if (opts.isSelected) {
      arr.push('is-selected');
      ariaSelected = 'true';
    }

    if (opts.hasEvent) {
      arr.push('has-event');
    }

    return m(
      'td',
      {
        'data-day': opts.day,
        class: arr.join(' '),
        'aria-selected': ariaSelected,
      },
      [
        m(
          'button.datepicker-day-button',
          {
            type: 'button',
            'data-year': opts.year,
            'data-month': opts.month,
            'data-day': opts.day,
            onclick: (e: Event) => {
              const target = e.target as HTMLElement;
              if (!opts.isDisabled) {
                const year = parseInt(target.getAttribute('data-year') || '0', 10);
                const month = parseInt(target.getAttribute('data-month') || '0', 10);
                const day = parseInt(target.getAttribute('data-day') || '0', 10);
                const selectedDate = new Date(year, month, day);
                setDate(selectedDate, false, options);
                if (options.autoClose) {
                  state.isOpen = false;
                }
              }
            },
          },
          opts.day
        ),
      ]
    );
  };

  const renderCalendar = (year: number, month: number, options: Required<DatePickerOptions>, randId?: string) => {
    const now = new Date();
    const days = getDaysInMonth(year, month);
    let before = new Date(year, month, 1).getDay();
    const data: any[] = [];
    let row: any[] = [];

    setToStartOfDay(now);

    if (options.firstDay > 0) {
      before -= options.firstDay;
      if (before < 0) {
        before += 7;
      }
    }

    const previousMonth = month === 0 ? 11 : month - 1;
    const nextMonth = month === 11 ? 0 : month + 1;
    const yearOfPreviousMonth = month === 0 ? year - 1 : year;
    const yearOfNextMonth = month === 11 ? year + 1 : year;
    const daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);

    let cells = days + before;
    let after = cells;
    while (after > 7) {
      after -= 7;
    }
    cells += 7 - after;

    for (let i = 0, r = 0; i < cells; i++) {
      const day = new Date(year, month, 1 + (i - before));
      const isSelected = isDate(state.date) ? compareDates(day, state.date) : false;
      const isToday = compareDates(day, now);
      const isEmpty = i < before || i >= days + before;
      let dayNumber = 1 + (i - before);
      let monthNumber = month;
      let yearNumber = year;

      if (isEmpty) {
        if (i < before) {
          dayNumber = daysInPreviousMonth + dayNumber;
          monthNumber = previousMonth;
          yearNumber = yearOfPreviousMonth;
        } else {
          dayNumber = dayNumber - days;
          monthNumber = nextMonth;
          yearNumber = yearOfNextMonth;
        }
      }

      const isDisabled =
        (options.minDate && day < options.minDate) ||
        (options.maxDate && day > options.maxDate) ||
        (options.disableWeekends && isWeekend(day)) ||
        (options.disableDayFn && options.disableDayFn(day));

      const dayConfig = {
        day: dayNumber,
        month: monthNumber,
        year: yearNumber,
        hasEvent: false,
        isSelected: isSelected,
        isToday: isToday,
        isDisabled: isDisabled,
        isEmpty: isEmpty,
        showDaysInNextAndPreviousMonths: false,
      };

      row.push(renderDay(dayConfig, options));

      if (++r === 7) {
        data.push(m('tr.datepicker-row', row));
        row = [];
        r = 0;
      }
    }

    const weekdayHeaders = [];
    for (let i = 0; i < 7; i++) {
      let day = i + options.firstDay;
      while (day >= 7) {
        day -= 7;
      }
      weekdayHeaders.push(
        m('th', { scope: 'col' }, [
          m('abbr', { title: options.i18n.weekdays![day] }, options.i18n.weekdaysAbbrev![day]),
        ])
      );
    }

    return m('.datepicker-table-wrapper', [
      m(
        'table.datepicker-table',
        {
          cellpadding: '0',
          cellspacing: '0',
          role: 'grid',
          'aria-labelledby': randId || 'datepicker-controls',
        },
        [m('thead', [m('tr', weekdayHeaders)]), m('tbody', data)]
      ),
    ]);
  };

  const renderDateDisplay = (options: Required<DatePickerOptions>) => {
    const displayDate = isDate(state.date) ? state.date : new Date();
    const day = options.i18n.weekdaysShort![displayDate.getDay()];
    const month = options.i18n.monthsShort![displayDate.getMonth()];
    const date = displayDate.getDate();

    return m('.datepicker-date-display', [
      m('span.year-text', displayDate.getFullYear()),
      m('span.date-text', `${day}, ${month} ${date}`),
    ]);
  };

  const renderControls = (options: Required<DatePickerOptions>, randId: string) => {
    const calendar = state.calendars[0];
    const year = calendar.year;
    const month = calendar.month;

    // Month options
    const monthOptions = [];
    for (let i = 0; i < 12; i++) {
      monthOptions.push(
        m(
          'option',
          {
            value: i,
            selected: i === month ? 'selected' : undefined,
          },
          options.i18n.months![i]
        )
      );
    }

    // Year options
    const yearOptions = [];
    let yearStart: number, yearEnd: number;
    if (Array.isArray(options.yearRange)) {
      yearStart = options.yearRange[0];
      yearEnd = options.yearRange[1];
    } else {
      yearStart = year - options.yearRange;
      yearEnd = year + options.yearRange;
    }

    for (let i = yearStart; i <= yearEnd; i++) {
      yearOptions.push(
        m(
          'option',
          {
            value: i,
            selected: i === year ? 'selected' : undefined,
          },
          i
        )
      );
    }

    return m(
      '.datepicker-controls',
      {
        id: randId,
        role: 'heading',
        'aria-live': 'assertive',
      },
      [
        m(
          'button.month-prev',
          {
            type: 'button',
            onclick: (e: Event) => {
              e.preventDefault();
              prevMonth();
            },
          },
          m(
            'svg',
            { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            [
              m('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' }),
              m('path', { d: 'M0-.5h24v24H0z', fill: 'none' }),
            ]
          )
        ),

        m('.selects-container', [
          // Month select wrapper
          m('.select-wrapper.select-month', [
            m('input.select-dropdown.dropdown-trigger', {
              type: 'text',
              readonly: true,
              value: options.i18n.months![month],
              onclick: (e: Event) => {
                e.preventDefault();
                state.monthDropdownOpen = !state.monthDropdownOpen;
                state.yearDropdownOpen = false; // Close year dropdown
              },
            }),
            // Custom dropdown menu
            state.monthDropdownOpen &&
              m(
                '.dropdown-content',
                options.i18n.months!.map((monthName, index) =>
                  m(
                    '.dropdown-item',
                    {
                      key: index,
                      class: index === month ? 'selected' : '',
                      onclick: (e: Event) => {
                        e.stopPropagation();
                        gotoMonth(index);
                        state.monthDropdownOpen = false;
                      },
                    },
                    monthName
                  )
                )
              ),
          ]),

          // Year select wrapper
          m('.select-wrapper.select-year', [
            m('input.select-dropdown.dropdown-trigger', {
              type: 'text',
              readonly: true,
              value: year.toString(),
              onclick: (e: Event) => {
                e.preventDefault();
                state.yearDropdownOpen = !state.yearDropdownOpen;
                state.monthDropdownOpen = false; // Close month dropdown
              },
            }),
            // Custom dropdown menu
            state.yearDropdownOpen &&
              m(
                '.dropdown-content',
                range(yearStart, yearEnd).map((i) =>
                  m(
                    '.dropdown-item',
                    {
                      key: i,
                      class: i === year ? 'selected' : '',
                      onclick: (e: Event) => {
                        e.stopPropagation();
                        gotoYear(i);
                        state.yearDropdownOpen = false;
                      },
                    },
                    i
                  )
                )
              ),
          ]),
        ]),

        m(
          'button.month-next',
          {
            type: 'button',
            onclick: (e: Event) => {
              e.preventDefault();
              nextMonth();
            },
          },
          m(
            'svg',
            { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            [
              m('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
              m('path', { d: 'M0-.25h24v24H0z', fill: 'none' }),
            ]
          )
        ),
      ]
    );
  };

  const gotoMonth = (month: number) => {
    if (!isNaN(month)) {
      state.calendars[0].month = month;
      adjustCalendars();
    }
  };

  const gotoYear = (year: number) => {
    if (!isNaN(year)) {
      state.calendars[0].year = year;
      adjustCalendars();
    }
  };

  const handleDocumentClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.select-wrapper') && !target.closest('.dropdown-content')) {
      state.monthDropdownOpen = false;
      state.yearDropdownOpen = false;
    }
  };

  return {
    oninit: (vnode) => {
      const attrs = vnode.attrs;
      const options = mergeOptions(attrs);

      state = {
        id: uniqueId(),
        isOpen: false,
        date: null,
        calendars: [{ month: 0, year: 0 }],
        monthDropdownOpen: false,
        yearDropdownOpen: false,
        formats: {
          d: () => state.date?.getDate() || 0,
          dd: () => {
            const d = state.date?.getDate() || 0;
            return (d < 10 ? '0' : '') + d;
          },
          ddd: () => options.i18n.weekdaysShort![state.date?.getDay() || 0],
          dddd: () => options.i18n.weekdays![state.date?.getDay() || 0],
          m: () => (state.date?.getMonth() || 0) + 1,
          mm: () => {
            const m = (state.date?.getMonth() || 0) + 1;
            return (m < 10 ? '0' : '') + m;
          },
          mmm: () => options.i18n.monthsShort![state.date?.getMonth() || 0],
          mmmm: () => options.i18n.months![state.date?.getMonth() || 0],
          yy: () => ('' + (state.date?.getFullYear() || 0)).slice(2),
          yyyy: () => state.date?.getFullYear() || 0,
        },
      };

      // Initialize date
      let defaultDate = attrs.defaultDate;
      if (!defaultDate && attrs.initialValue) {
        defaultDate = new Date(attrs.initialValue);
      }

      if (isDate(defaultDate)) {
        // Always set the date if we have initialValue or defaultDate
        setDate(defaultDate, true, options);
      } else {
        gotoDate(new Date());
      }

      // Add document click listener to close dropdowns
      document.addEventListener('click', handleDocumentClick);
    },

    onremove: () => {
      // Clean up event listener
      document.removeEventListener('click', handleDocumentClick);
    },

    view: (vnode) => {
      const attrs = vnode.attrs;
      const options = mergeOptions(attrs);
      const {
        id = state.id,
        label,
        dateLabel,
        placeholder,
        disabled,
        required,
        className,
        style,
        helperText,
        iconName,
        newRow,
      } = attrs;

      // Use dateLabel if label is not provided (backward compatibility)
      const finalLabel = label || dateLabel;
      const finalClassName = newRow ? `${className || ''} clear` : className;

      return m(
        '.input-field',
        {
          className: finalClassName,
          style,
        },
        [
          // Icon prefix
          iconName && m('i.material-icons.prefix', iconName),

          // Main date input
          m('input.datepicker', {
            id,
            type: 'text',
            value: toString(state.date, options.format),
            placeholder,
            disabled,
            required,
            readonly: true,
            format: attrs.format,
            yearrange: attrs.yearrange,
            tabindex: '0',
            onclick: () => {
              if (!disabled) {
                state.isOpen = true;
                if (options.onOpen) options.onOpen();
              }
            },
          }),

          // Label
          finalLabel &&
            m(
              'label',
              {
                for: id,
                class: state.date || placeholder ? 'active' : '',
              },
              finalLabel
            ),

          // Helper text
          helperText && m('span.helper-text', helperText),

          // Modal datepicker
          state.isOpen && [
            m(
              '.modal.datepicker-modal.open',
              {
                id: `modal-${state.id}`,
                tabindex: 0,
                style: {
                  zIndex: 1003,
                  display: 'block',
                  opacity: 1,
                  top: '10%',
                  transform: 'scaleX(1) scaleY(1)',
                },
              },
              [
                m(
                  '.modal-content.datepicker-container',
                  {
                    onclick: (e: Event) => {
                      // Close dropdowns when clicking anywhere in the modal content
                      const target = e.target as HTMLElement;
                      if (!target.closest('.select-wrapper') && !target.closest('.dropdown-content')) {
                        state.monthDropdownOpen = false;
                        state.yearDropdownOpen = false;
                      }
                    },
                  },
                  [
                    renderDateDisplay(options),
                    m('.datepicker-calendar-container', [
                      m('.datepicker-calendar', [
                        renderControls(options, `datepicker-title-${Math.random().toString(36).slice(2)}`),
                        renderCalendar(state.calendars[0].year, state.calendars[0].month, options),
                      ]),
                      m('.datepicker-footer', [
                        options.showClearBtn &&
                          m(
                            'button.btn-flat.datepicker-clear.waves-effect',
                            {
                              type: 'button',
                              style: '',
                              onclick: () => {
                                setDate(null, false, options);
                                state.isOpen = false;
                              },
                            },
                            options.i18n.clear
                          ),

                        m('.confirmation-btns', [
                          m(
                            'button.btn-flat.datepicker-cancel.waves-effect',
                            {
                              type: 'button',
                              onclick: () => {
                                state.isOpen = false;
                                if (options.onClose) options.onClose();
                              },
                            },
                            options.i18n.cancel
                          ),

                          m(
                            'button.btn-flat.datepicker-done.waves-effect',
                            {
                              type: 'button',
                              onclick: () => {
                                if (attrs.onchange && state.date) {
                                  attrs.onchange(state.date.toISOString().split('T')[0]);
                                }
                                state.isOpen = false;
                                if (options.onClose) options.onClose();
                              },
                            },
                            options.i18n.done
                          ),
                        ]),
                      ]),
                    ]),
                  ]
                ),
              ]
            ),

            // Modal overlay
            m('.modal-overlay', {
              style: {
                zIndex: 1002,
                display: 'block',
                opacity: 0.5,
              },
              onclick: () => {
                state.isOpen = false;
                if (options.onClose) options.onClose();
              },
            }),
          ],
        ]
      );
    },
  };
};

// TimePicker interfaces and implementation remain the same...
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
  /**
   * Default time to revert to when field is cleared (optional).
   * Note: Use initialValue (from InputOptions) to set the current/initial value of the field.
   * defaultTime is only used as a fallback when the user clears the field and you want to provide a default.
   */
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

export interface TimePickerAttributes extends InputAttributes<string>, TimePickerOptions {}

/**
 * Enhanced TimePicker component with i18n support and improved functionality.
 *
 * Usage:
 * - Use `initialValue` to set the current/initial time value (24h format: "HH:MM")
 * - Use `defaultTime` only if you need a fallback when the field is cleared
 * - The component accepts and outputs 24-hour format strings ("HH:MM")
 * - Display format (12h/24h) is controlled by the `twelveHour` property
 */
export const TimePicker: FactoryComponent<TimePickerAttributes> = () => {
  const state = {
    id: uniqueId(),
    isOpen: false,
    hours: 12,
    minutes: 0,
    ampm: 'AM',
    use12Hour: false,
    time: '',
    hasFocus: false,
  };

  const parseTime = (timeString: string) => {
    if (!timeString) return { hours: 12, minutes: 0, ampm: 'AM' };

    const [time, ampm] = timeString.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10) || 0;
    const minutes = parseInt(minutesStr, 10) || 0;

    if (ampm) {
      // 12-hour format
      if (ampm.toUpperCase() === 'PM' && hours !== 12) hours += 12;
      if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
      return { hours, minutes, ampm: ampm.toUpperCase() };
    } else {
      // 24-hour format
      const displayAmpm = hours >= 12 ? 'PM' : 'AM';
      return { hours, minutes, ampm: displayAmpm };
    }
  };

  const formatTime = (hours: number, minutes: number, use12Hour: boolean): string => {
    if (use12Hour) {
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  };

  const setTime = (timeString: string, attrs: TimePickerAttributes) => {
    const parsed = parseTime(timeString);
    state.hours = parsed.hours;
    state.minutes = parsed.minutes;
    state.ampm = parsed.ampm;
    state.time = timeString;

    if (attrs.onchange) {
      // Always output 24-hour format for consistency
      const output24h = `${state.hours.toString().padStart(2, '0')}:${state.minutes.toString().padStart(2, '0')}`;
      attrs.onchange(output24h);
    }

    if (attrs.oninput) {
      attrs.oninput(timeString);
    }

    if (attrs.onSelect) {
      attrs.onSelect(state.hours, state.minutes);
    }
  };

  return {
    oninit: (vnode) => {
      const { initialValue, defaultTime, twelveHour = false } = vnode.attrs;
      state.use12Hour = twelveHour;

      const timeValue = initialValue || defaultTime || '';
      if (timeValue) {
        const parsed = parseTime(timeValue);
        state.hours = parsed.hours;
        state.minutes = parsed.minutes;
        state.ampm = parsed.ampm;
        state.time = formatTime(state.hours, state.minutes, state.use12Hour);
      }
    },

    view: (vnode) => {
      const attrs = vnode.attrs;
      const {
        id = state.id,
        label = 'Time',
        placeholder = 'Select time',
        disabled,
        readonly,
        required,
        className,
        style,
        helperText,
        iconName = 'access_time',
        newRow,
        twelveHour = false,
        timeLabel = 'Time',
        nowLabel = 'Now',
        clearLabel = 'Clear',
        closeLabel = 'Close',
        amLabel = 'AM',
        pmLabel = 'PM',
        showClearBtn = false,
        showNowBtn = false,
        useModal = true,
      } = attrs;

      state.use12Hour = twelveHour;
      const finalClassName = newRow ? `${className || ''} clear` : className;
      const displayValue = state.time ? formatTime(state.hours, state.minutes, state.use12Hour) : '';

      return m(
        '.input-field',
        {
          className: finalClassName,
          style,
        },
        [
          // Icon prefix
          iconName && m('i.material-icons.prefix', iconName),

          // Time input field
          m('input.timepicker', {
            id,
            type: 'text',
            value: displayValue,
            placeholder,
            disabled,
            readonly,
            required,
            onclick: () => {
              if (!disabled && !readonly && useModal) {
                state.isOpen = true;
                if (attrs.onOpen) attrs.onOpen();
              }
            },
          }),

          // Label
          label &&
            m(
              'label',
              {
                for: id,
                class: displayValue || placeholder ? 'active' : '',
              },
              label
            ),

          // Helper text
          helperText && m('span.helper-text', helperText),

          // Time picker modal (simplified version)
          useModal &&
            state.isOpen &&
            m(
              '.timepicker-modal',
              {
                style: {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  zIndex: 1000,
                },
              },
              [
                m('h4', timeLabel),
                m(
                  '.time-inputs',
                  {
                    style: { display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' },
                  },
                  [
                    // Hours input
                    m('input', {
                      type: 'number',
                      min: state.use12Hour ? 1 : 0,
                      max: state.use12Hour ? 12 : 23,
                      value: state.use12Hour
                        ? state.hours === 0
                          ? 12
                          : state.hours > 12
                          ? state.hours - 12
                          : state.hours
                        : state.hours,
                      style: { width: '60px', textAlign: 'center', padding: '8px' },
                      onchange: (e: Event) => {
                        const target = e.target as HTMLInputElement;
                        let hours = parseInt(target.value) || 0;
                        if (state.use12Hour) {
                          if (state.ampm === 'PM' && hours !== 12) hours += 12;
                          if (state.ampm === 'AM' && hours === 12) hours = 0;
                        }
                        state.hours = hours;
                        state.time = formatTime(state.hours, state.minutes, state.use12Hour);
                      },
                    }),
                    m('span', ':'),
                    // Minutes input
                    m('input', {
                      type: 'number',
                      min: 0,
                      max: 59,
                      value: state.minutes,
                      style: { width: '60px', textAlign: 'center', padding: '8px' },
                      onchange: (e: Event) => {
                        const target = e.target as HTMLInputElement;
                        state.minutes = parseInt(target.value) || 0;
                        state.time = formatTime(state.hours, state.minutes, state.use12Hour);
                      },
                    }),
                    // AM/PM toggle for 12-hour format
                    state.use12Hour &&
                      m(
                        'select',
                        {
                          value: state.ampm,
                          style: { padding: '8px' },
                          onchange: (e: Event) => {
                            const target = e.target as HTMLSelectElement;
                            const oldAmpm = state.ampm;
                            state.ampm = target.value;

                            // Adjust hours when switching AM/PM
                            if (oldAmpm !== state.ampm) {
                              if (state.ampm === 'PM' && state.hours < 12) {
                                state.hours += 12;
                              } else if (state.ampm === 'AM' && state.hours >= 12) {
                                state.hours -= 12;
                              }
                            }
                            state.time = formatTime(state.hours, state.minutes, state.use12Hour);
                          },
                        },
                        [m('option', { value: 'AM' }, amLabel), m('option', { value: 'PM' }, pmLabel)]
                      ),
                  ]
                ),

                // Action buttons
                m(
                  '.timepicker-actions',
                  {
                    style: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
                  },
                  [
                    showClearBtn &&
                      m(
                        'button.btn-flat',
                        {
                          onclick: () => {
                            setTime('', attrs);
                            state.isOpen = false;
                          },
                        },
                        clearLabel
                      ),

                    showNowBtn &&
                      m(
                        'button.btn-flat',
                        {
                          onclick: () => {
                            const now = new Date();
                            state.hours = now.getHours();
                            state.minutes = now.getMinutes();
                            state.ampm = state.hours >= 12 ? 'PM' : 'AM';
                            state.time = formatTime(state.hours, state.minutes, state.use12Hour);
                          },
                        },
                        nowLabel
                      ),

                    m(
                      'button.btn-flat',
                      {
                        onclick: () => {
                          state.isOpen = false;
                          if (attrs.onClose) attrs.onClose();
                        },
                      },
                      closeLabel
                    ),

                    m(
                      'button.btn-flat',
                      {
                        onclick: () => {
                          setTime(state.time, attrs);
                          state.isOpen = false;
                          if (attrs.onClose) attrs.onClose();
                        },
                      },
                      'OK'
                    ),
                  ]
                ),
              ]
            ),

          // Modal backdrop
          useModal &&
            state.isOpen &&
            m('.modal-backdrop', {
              style: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
              },
              onclick: () => {
                state.isOpen = false;
                if (attrs.onClose) attrs.onClose();
              },
            }),
        ]
      );
    },
  };
};
