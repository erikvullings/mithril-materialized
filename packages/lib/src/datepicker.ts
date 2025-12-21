import m, { FactoryComponent } from 'mithril';
import { InputAttrs } from './input-options';
import { range, uniqueId, renderToPortal, clearPortal } from './utils';

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
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Week numbering system: 'iso' (ISO 8601) or 'local' (local convention) */
  weekNumbering?: 'iso' | 'local';
  /** Internationalization */
  i18n?: DatePickerI18n;
  /** Enable date range selection mode for selecting start and end dates */
  dateRange?: boolean;
  /** Initial start date for range selection */
  initialStartDate?: Date;
  /** Initial end date for range selection */
  initialEndDate?: Date;
  /** Minimum number of days between start and end dates */
  minDateRange?: number;
  /** Maximum number of days between start and end dates */
  maxDateRange?: number;
  /** Callback when date is selected (single date or range start/end) */
  onSelect?: (date: Date, endDate?: Date) => void;
  /** Callback when picker is opened */
  onOpen?: () => void;
  /** Callback when picker is closed */
  onClose?: () => void;
}

export interface DatePickerAttrs extends InputAttrs<string>, DatePickerOptions {
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

// Week number calculation utilities
const getWeekNumber = (date: Date, weekNumbering: 'iso' | 'local', firstDay: number): number => {
  if (weekNumbering === 'iso') {
    return getISOWeekNumber(date);
  } else {
    return getLocalWeekNumber(date, firstDay);
  }
};

const getISOWeekNumber = (date: Date): number => {
  // ISO 8601 week numbering
  const tempDate = new Date(date.getTime());
  const dayNum = (date.getDay() + 6) % 7; // Make Monday = 0
  tempDate.setDate(tempDate.getDate() - dayNum + 3); // Thursday in target week
  const firstThursday = new Date(tempDate.getFullYear(), 0, 4); // First Thursday of year
  const firstThursdayDayNum = (firstThursday.getDay() + 6) % 7; // Make Monday = 0
  firstThursday.setDate(firstThursday.getDate() - firstThursdayDayNum + 3);
  return Math.ceil((tempDate.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
};

const getLocalWeekNumber = (date: Date, firstDay: number): number => {
  // Local week numbering based on firstDay setting
  const tempDate = new Date(date.getFullYear(), 0, 1);
  const firstDayOfYear = tempDate.getDay();

  // Calculate days from first day of year to the start of first week
  let daysToFirstWeek = (firstDay - firstDayOfYear + 7) % 7;
  if (daysToFirstWeek === 0 && firstDayOfYear !== firstDay) {
    daysToFirstWeek = 7;
  }

  const firstWeekStart = new Date(tempDate.getTime());
  firstWeekStart.setDate(1 + daysToFirstWeek);

  if (date < firstWeekStart) {
    // Date is in the last week of previous year
    return getLocalWeekNumber(new Date(date.getFullYear() - 1, 11, 31), firstDay);
  }

  const daysDiff = Math.floor((date.getTime() - firstWeekStart.getTime()) / (24 * 60 * 60 * 1000));
  return Math.floor(daysDiff / 7) + 1;
};

interface Calendar {
  month: number;
  year: number;
}

interface DatePickerState {
  id: string;
  isOpen: boolean;
  date: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  selectionMode: 'start' | 'end' | null;
  isSelectingRange: boolean;
  calendars: Calendar[];
  formats: { [key: string]: () => string | number };
  monthDropdownOpen: boolean;
  yearDropdownOpen: boolean;
  portalContainerId: string;
}

/**
 * Enhanced DatePicker component based on Materialize CSS datepicker
 */
export const DatePicker: FactoryComponent<DatePickerAttrs> = () => {
  let state: DatePickerState;

  const mergeOptions = (attrs: DatePickerAttrs): Required<DatePickerOptions> => {
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
      showWeekNumbers: false,
      weekNumbering: 'iso' as const,
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

  // New function to format any specific date (not just state.date)
  const formatDate = (date: Date | null, format: string, options: Required<DatePickerOptions>): string => {
    if (!date || !isDate(date)) {
      return '';
    }

    // Split format into tokens - match longer patterns first
    const formatTokens = /(dddd|ddd|dd|d|mmmm|mmm|mm|m|yyyy|yy)/g;
    let result = format;

    // Create temporary formats for the specific date
    const dateFormats = {
      d: () => date.getDate(),
      dd: () => {
        const d = date.getDate();
        return (d < 10 ? '0' : '') + d;
      },
      ddd: () => options.i18n.weekdaysShort![date.getDay()],
      dddd: () => options.i18n.weekdays![date.getDay()],
      m: () => date.getMonth() + 1,
      mm: () => {
        const m = date.getMonth() + 1;
        return (m < 10 ? '0' : '') + m;
      },
      mmm: () => options.i18n.monthsShort![date.getMonth()],
      mmmm: () => options.i18n.months![date.getMonth()],
      yy: () => ('' + date.getFullYear()).slice(2),
      yyyy: () => date.getFullYear(),
    };

    // Replace all format tokens with actual values
    result = result.replace(formatTokens, (match) => {
      if (dateFormats[match as keyof typeof dateFormats]) {
        return String(dateFormats[match as keyof typeof dateFormats]());
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

  const handleRangeSelection = (date: Date, options: Required<DatePickerOptions>) => {
    setToStartOfDay(date);

    // First click or reset - set start date
    if (!state.startDate || (state.startDate && state.endDate)) {
      state.startDate = new Date(date.getTime());
      state.endDate = null;
      state.selectionMode = 'end';
      state.isSelectingRange = true;
    }
    // Second click - set end date
    else if (state.startDate && !state.endDate) {
      // Ensure proper order (start <= end)
      if (date < state.startDate) {
        state.endDate = new Date(state.startDate.getTime());
        state.startDate = new Date(date.getTime());
      } else {
        state.endDate = new Date(date.getTime());
      }

      // Validate range constraints
      if (options.minDateRange || options.maxDateRange) {
        const daysDiff = Math.ceil((state.endDate.getTime() - state.startDate.getTime()) / (1000 * 60 * 60 * 24));

        if (options.minDateRange && daysDiff < options.minDateRange) {
          // Range too short, reset
          state.startDate = new Date(date.getTime());
          state.endDate = null;
          state.selectionMode = 'end';
          return;
        }

        if (options.maxDateRange && daysDiff > options.maxDateRange) {
          // Range too long, reset
          state.startDate = new Date(date.getTime());
          state.endDate = null;
          state.selectionMode = 'end';
          return;
        }
      }

      state.selectionMode = null;
      state.isSelectingRange = false;

      // Call onSelect with both dates
      if (options.onSelect) {
        options.onSelect(state.startDate, state.endDate);
      }

      // Auto-close if enabled
      if (options.autoClose) {
        state.isOpen = false;
      }
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

  interface DayAttrs {
    opts: any;
    options: Required<DatePickerOptions>;
  }

  const Day: FactoryComponent<DayAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const { opts, options } = attrs;
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

        // Range selection states
        if (opts.isRangeStart) {
          arr.push('is-range-start');
          ariaSelected = 'true';
        }

        if (opts.isRangeEnd) {
          arr.push('is-range-end');
          ariaSelected = 'true';
        }

        if (opts.isInRange) {
          arr.push('is-in-range');
        }

        if (opts.isRangePreview) {
          arr.push('is-range-preview');
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

                    if (options.dateRange) {
                      handleRangeSelection(selectedDate, options);
                    } else {
                      setDate(selectedDate, false, options);
                      if (options.autoClose) {
                        state.isOpen = false;
                      }
                    }
                  }
                },
              },
              opts.day
            ),
          ]
        );
      },
    };
  };

  interface CalendarAttrs {
    year: number;
    month: number;
    options: Required<DatePickerOptions>;
    randId?: string;
  }

  const Calendar: FactoryComponent<CalendarAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const { year, month, options, randId } = attrs;
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

          // Range selection states
          let isRangeStart = false;
          let isRangeEnd = false;
          let isInRange = false;
          let isRangePreview = false;

          if (options.dateRange) {
            if (state.startDate && compareDates(day, state.startDate)) {
              isRangeStart = true;
            }
            if (state.endDate && compareDates(day, state.endDate)) {
              isRangeEnd = true;
            }
            if (state.startDate && state.endDate && day > state.startDate && day < state.endDate) {
              isInRange = true;
            }
            // TODO: Add hover preview logic for range selection
          }

          const dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent: false,
            isSelected: !options.dateRange && isSelected, // Only use isSelected in single date mode
            isToday: isToday,
            isDisabled: isDisabled,
            isEmpty: isEmpty,
            showDaysInNextAndPreviousMonths: false,
            isRangeStart: isRangeStart,
            isRangeEnd: isRangeEnd,
            isInRange: isInRange,
            isRangePreview: isRangePreview,
          };

          // Add week number cell at the beginning of each row
          if (r === 0 && options.showWeekNumbers) {
            const weekDate = new Date(yearNumber, monthNumber, dayNumber);
            const weekNum = getWeekNumber(weekDate, options.weekNumbering, options.firstDay);
            row.push(
              m(
                'td.datepicker-week-number',
                {
                  title: `Week ${weekNum}`,
                },
                weekNum
              )
            );
          }

          row.push(m(Day, { opts: dayConfig, options }));

          if (++r === 7) {
            data.push(m('tr.datepicker-row', row));
            row = [];
            r = 0;
          }
        }

        const weekdayHeaders = [];

        // Add week number header if enabled
        if (options.showWeekNumbers) {
          weekdayHeaders.push(m('th.datepicker-week-header', { scope: 'col', title: 'Week' }, 'Wk'));
        }

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
              class: options.showWeekNumbers ? 'with-week-numbers' : '',
            },
            [m('thead', [m('tr', weekdayHeaders)]), m('tbody', data)]
          ),
        ]);
      },
    };
  };

  interface DateDisplayAttrs {
    options: Required<DatePickerOptions>;
  }

  const DateDisplay: FactoryComponent<DateDisplayAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const { options } = attrs;

        if (options.dateRange) {
          // Range display
          const startDate = state.startDate;
          const endDate = state.endDate;

          if (startDate && endDate) {
            // Both dates selected
            const startDay = options.i18n.weekdaysShort![startDate.getDay()];
            const startMonth = options.i18n.monthsShort![startDate.getMonth()];
            const endDay = options.i18n.weekdaysShort![endDate.getDay()];
            const endMonth = options.i18n.monthsShort![endDate.getMonth()];

            return m('.datepicker-date-display.range-display', [
              m('span.year-text', startDate.getFullYear()),
              m('span.date-text', [
                m('span.start-date', `${startDay}, ${startMonth} ${startDate.getDate()}`),
                m('span.range-separator', ' - '),
                m('span.end-date', `${endDay}, ${endMonth} ${endDate.getDate()}`),
              ]),
            ]);
          } else if (startDate) {
            // Only start date selected
            const startDay = options.i18n.weekdaysShort![startDate.getDay()];
            const startMonth = options.i18n.monthsShort![startDate.getMonth()];

            return m('.datepicker-date-display.range-display', [
              m('span.year-text', startDate.getFullYear()),
              m('span.date-text', [
                m('span.start-date', `${startDay}, ${startMonth} ${startDate.getDate()}`),
                m('span.range-separator', ' - '),
                m('span.end-date.placeholder', 'Select end date'),
              ]),
            ]);
          } else {
            // No dates selected
            const currentDate = new Date();
            return m('.datepicker-date-display.range-display', [
              m('span.year-text', currentDate.getFullYear()),
              m('span.date-text.placeholder', 'Select date range'),
            ]);
          }
        } else {
          // Single date display (original behavior)
          const displayDate = isDate(state.date) ? state.date : new Date();
          const day = options.i18n.weekdaysShort![displayDate.getDay()];
          const month = options.i18n.monthsShort![displayDate.getMonth()];
          const date = displayDate.getDate();

          return m('.datepicker-date-display', [
            m('span.year-text', displayDate.getFullYear()),
            m('span.date-text', `${day}, ${month} ${date}`),
          ]);
        }
      },
    };
  };

  interface DateControlsAttrs {
    options: Required<DatePickerOptions>;
    randId: string;
  }

  const DateControls: FactoryComponent<DateControlsAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const { options, randId } = attrs;
        const calendar = state.calendars[0];
        const year = calendar.year;
        const month = calendar.month;

        // Year range calculation
        let yearStart: number, yearEnd: number;
        if (Array.isArray(options.yearRange)) {
          yearStart = options.yearRange[0];
          yearEnd = options.yearRange[1];
        } else {
          yearStart = year - options.yearRange;
          yearEnd = year + options.yearRange;
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
                {
                  fill: '#000000',
                  height: '24',
                  viewBox: '0 0 24 24',
                  width: '24',
                  xmlns: 'http://www.w3.org/2000/svg',
                },
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
                {
                  fill: '#000000',
                  height: '24',
                  viewBox: '0 0 24 24',
                  width: '24',
                  xmlns: 'http://www.w3.org/2000/svg',
                },
                [
                  m('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
                  m('path', { d: 'M0-.25h24v24H0z', fill: 'none' }),
                ]
              )
            ),
          ]
        );
      },
    };
  };

  const gotoMonth = (month: number) => {
    if (!isNaN(month)) {
      state.calendars[0].month = month;
      adjustCalendars();

      // Update selected date if one exists
      if (state.date && isDate(state.date)) {
        const currentDay = state.date.getDate();
        const newYear = state.calendars[0].year;
        const daysInNewMonth = getDaysInMonth(newYear, month);

        // Adjust day if it doesn't exist in the new month (e.g., Jan 31 -> Feb 28)
        const adjustedDay = Math.min(currentDay, daysInNewMonth);
        const newDate = new Date(newYear, month, adjustedDay);

        state.date = newDate;
        setToStartOfDay(state.date);
      }
    }
  };

  const gotoYear = (year: number) => {
    if (!isNaN(year)) {
      state.calendars[0].year = year;
      adjustCalendars();

      // Update selected date if one exists
      if (state.date && isDate(state.date)) {
        const currentMonth = state.date.getMonth();
        const currentDay = state.date.getDate();
        const daysInNewMonth = getDaysInMonth(year, currentMonth);

        // Adjust day if it doesn't exist in the new year/month (e.g., leap year changes)
        const adjustedDay = Math.min(currentDay, daysInNewMonth);
        const newDate = new Date(year, currentMonth, adjustedDay);

        state.date = newDate;
        setToStartOfDay(state.date);
      }
    }
  };

  const handleDocumentClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.select-wrapper') && !target.closest('.dropdown-content')) {
      state.monthDropdownOpen = false;
      state.yearDropdownOpen = false;
    }
    m.redraw();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && state.isOpen) {
      state.isOpen = false;
      const options = mergeOptions({} as DatePickerAttrs);
      if (options.onClose) options.onClose();
      clearPortal(state.portalContainerId);
      m.redraw();
    }
  };

  const renderPickerToPortal = (attrs: DatePickerAttrs) => {
    const options = mergeOptions(attrs);

    const pickerModal = m(
      '.datepicker-modal-wrapper',
      {
        style: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      [
        // Modal overlay
        m('.modal-overlay', {
          style: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1002',
          },
          onclick: () => {
            state.isOpen = false;
            if (options.onClose) options.onClose();
            m.redraw();
          },
        }),

        // Modal content
        m(
          '.modal.datepicker-modal.open',
          {
            id: `modal-${state.id}`,
            tabindex: 0,
            style: {
              position: 'relative',
              zIndex: '1003',
              display: 'block',
              opacity: 1,
              top: 'auto',
              transform: 'scaleX(1) scaleY(1)',
              margin: '0 auto',
            },
          },
          [
            m(
              '.modal-content.datepicker-container',
              {
                onclick: (e: Event) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest('.select-wrapper') && !target.closest('.dropdown-content')) {
                    state.monthDropdownOpen = false;
                    state.yearDropdownOpen = false;
                  }
                },
              },
              [
                m(DateDisplay, { options }),
                m('.datepicker-calendar-container', [
                  m('.datepicker-calendar', [
                    m(DateControls, {
                      options,
                      randId: `datepicker-title-${Math.random().toString(36).slice(2)}`,
                    }),
                    m(Calendar, {
                      year: state.calendars[0].year,
                      month: state.calendars[0].month,
                      options,
                    }),
                  ]),
                  m('.datepicker-footer', [
                    options.showClearBtn &&
                      m(
                        'button.btn-flat.datepicker-clear.waves-effect',
                        {
                          type: 'button',
                          onclick: () => {
                            setDate(null, false, options);
                            state.isOpen = false;
                          },
                        },
                        options.i18n.clear
                      ),
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
                          state.isOpen = false;

                          if (options.dateRange) {
                            if (state.startDate && state.endDate && attrs.onchange) {
                              const startStr = formatDate(state.startDate, 'yyyy-mm-dd', options);
                              const endStr = formatDate(state.endDate, 'yyyy-mm-dd', options);
                              attrs.onchange(`${startStr} - ${endStr}`);
                            }
                          } else {
                            if (state.date && attrs.onchange) {
                              attrs.onchange(toString(state.date, 'yyyy-mm-dd'));
                            }
                          }

                          if (options.onClose) options.onClose();
                        },
                      },
                      options.i18n.done
                    ),
                  ]),
                ]),
              ]
            ),
          ]
        ),
      ]
    );

    renderToPortal(state.portalContainerId, pickerModal, 1004);
  };

  return {
    oninit: (vnode) => {
      const attrs = vnode.attrs;
      const options = mergeOptions(attrs);

      state = {
        id: uniqueId(),
        isOpen: false,
        date: null,
        startDate: null,
        endDate: null,
        selectionMode: null,
        isSelectingRange: false,
        calendars: [{ month: 0, year: 0 }],
        monthDropdownOpen: false,
        yearDropdownOpen: false,
        portalContainerId: `datepicker-portal-${uniqueId()}`,
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

      // Initialize date or date range
      if (options.dateRange) {
        // Initialize range dates
        if (attrs.initialStartDate && isDate(attrs.initialStartDate)) {
          state.startDate = new Date(attrs.initialStartDate.getTime());
          setToStartOfDay(state.startDate);
          gotoDate(state.startDate);
        }

        if (attrs.initialEndDate && isDate(attrs.initialEndDate)) {
          state.endDate = new Date(attrs.initialEndDate.getTime());
          setToStartOfDay(state.endDate);
        }

        if (!state.startDate && !state.endDate) {
          gotoDate(new Date());
        }
      } else {
        // Single date initialization (original behavior)
        let defaultDate = attrs.defaultDate;
        if (!defaultDate && attrs.defaultValue) {
          defaultDate = new Date(attrs.defaultValue);
        }

        if (isDate(defaultDate)) {
          // Always set the date if we have value or defaultDate
          setDate(defaultDate, true, options);
        } else {
          gotoDate(new Date());
        }
      }

      // Add document click listener to close dropdowns
      document.addEventListener('click', handleDocumentClick);
      // Add ESC key listener
      document.addEventListener('keydown', handleKeyDown);
    },

    onremove: () => {
      // Clean up event listeners
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);

      // Clean up portal if picker was open
      if (state.isOpen) {
        clearPortal(state.portalContainerId);
      }
    },

    onupdate: (vnode) => {
      // Render to portal when picker is open, clear when closed
      if (state.isOpen) {
        renderPickerToPortal(vnode.attrs);
      } else {
        clearPortal(state.portalContainerId);
      }
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
        readonly,
        required,
        iconName,
        helperText,
        onchange,
        oninput,
        className: cn1,
        class: cn2,
      } = attrs;
      const className = cn1 || cn2 || 'col s12';

      // Calculate display value for the input
      let displayValue = '';

      if (options.dateRange) {
        // Handle date range display
        const formatToUse = attrs.displayFormat || options.format;

        if (state.startDate && state.endDate) {
          let startStr: string, endStr: string;

          if (attrs.displayFormat) {
            // Custom display format for date range
            startStr = attrs.displayFormat
              .replace(/yyyy/gi, state.startDate.getFullYear().toString())
              .replace(/mm/gi, (state.startDate.getMonth() + 1).toString().padStart(2, '0'))
              .replace(/dd/gi, state.startDate.getDate().toString().padStart(2, '0'));
            endStr = attrs.displayFormat
              .replace(/yyyy/gi, state.endDate.getFullYear().toString())
              .replace(/mm/gi, (state.endDate.getMonth() + 1).toString().padStart(2, '0'))
              .replace(/dd/gi, state.endDate.getDate().toString().padStart(2, '0'));
          } else {
            // Standard format
            startStr = formatDate(state.startDate, formatToUse, options);
            endStr = formatDate(state.endDate, formatToUse, options);
          }

          displayValue = `${startStr} - ${endStr}`;
        } else if (state.startDate) {
          let startStr: string;

          if (attrs.displayFormat) {
            // Custom display format for single date
            startStr = attrs.displayFormat
              .replace(/yyyy/gi, state.startDate.getFullYear().toString())
              .replace(/mm/gi, (state.startDate.getMonth() + 1).toString().padStart(2, '0'))
              .replace(/dd/gi, state.startDate.getDate().toString().padStart(2, '0'));
          } else {
            // Standard format
            startStr = formatDate(state.startDate, formatToUse, options);
          }

          displayValue = `${startStr} - `;
        }
      } else {
        // Single date display (original behavior)
        if (state.date) {
          displayValue = toString(state.date, options.format);
        }

        // Custom date format handling
        if (attrs.displayFormat) {
          // const formatRegex = /(yyyy|mm|dd)/gi;
          let customDisplayValue = attrs.displayFormat;
          if (state.date) {
            customDisplayValue = customDisplayValue
              .replace(/yyyy/gi, state.date.getFullYear().toString())
              .replace(/mm/gi, (state.date.getMonth() + 1).toString().padStart(2, '0'))
              .replace(/dd/gi, state.date.getDate().toString().padStart(2, '0'));
            displayValue = customDisplayValue;
          }
        }
      }

      return m(
        '.input-field',
        {
          className,
        },
        [
          // Icon prefix
          iconName && m('i.material-icons.prefix', iconName),

          // Date input field
          m('input.datepicker', {
            id,
            type: 'text',
            value: displayValue,
            placeholder,
            disabled,
            readonly,
            required,
            onclick: () => {
              if (!disabled && !readonly) {
                state.isOpen = true;
                if (options.onOpen) options.onOpen();
              }
            },
            oninput: (e: Event) => {
              if (oninput) {
                const target = e.target as HTMLInputElement;
                oninput(target.value);
              }
            },
            onchange: (e: Event) => {
              if (onchange) {
                const target = e.target as HTMLInputElement;
                // Try to parse the input value
                const date = new Date(target.value);
                if (isDate(date)) {
                  setDate(date, false, options);
                  onchange(toString(date, 'yyyy-mm-dd')); // Always return ISO format
                } else {
                  onchange(target.value);
                }
              }
            },
          }),

          // Label
          (label || dateLabel) &&
            m(
              'label',
              {
                for: id,
                class: displayValue || placeholder ? 'active' : '',
              },
              label || dateLabel
            ),
          // Helper text
          helperText && m('span.helper-text', helperText),
          // Modal is now rendered via portal in onupdate hook
        ]
      );
    },
  };
};
