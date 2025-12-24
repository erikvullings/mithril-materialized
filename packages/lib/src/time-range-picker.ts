import m, { FactoryComponent } from 'mithril';
import { InputAttrs } from './input-options';
import { uniqueId, renderToPortal, clearPortal } from './utils';
import { TimeValue, addLeadingZero, parseTime, formatTime, timeToMinutes } from './time-utils';
import { DigitalClock } from './digital-clock';
import { AnalogClock } from './analog-clock';

interface TimeRangePickerState {
  id: string;
  currentSelection: 'start' | 'end';
  startTime: TimeValue;
  endTime: TimeValue;
  tempStartTime: TimeValue;
  tempEndTime: TimeValue;
  isPickerOpen: boolean;
  portalContainerId: string;
  currentView: 'hours' | 'minutes';

  // Display elements
  spanStartHours?: HTMLElement;
  spanStartMinutes?: HTMLElement;
  spanStartAmPm?: HTMLElement;
  spanEndHours?: HTMLElement;
  spanEndMinutes?: HTMLElement;
  spanEndAmPm?: HTMLElement;
}

export interface TimepickerI18n {
  cancel?: string;
  clear?: string;
  done?: string;
  next?: string;
}

const defaultI18n: Required<TimepickerI18n> = {
  cancel: 'Cancel',
  clear: 'Clear',
  done: 'Ok',
  next: 'Next',
};

export interface TimeRangePickerAttrs extends Omit<InputAttrs<string>, 'defaultValue' | 'onchange'> {
  /** Starting time value in HH:MM or HH:MM AM/PM format */
  startValue?: string;

  /** Ending time value in HH:MM or HH:MM AM/PM format */
  endValue?: string;

  /** Enable validation: end time must be after start time */
  validateRange?: boolean;

  /** Callback when time range changes */
  onchange?: (startTime: string, endTime: string) => void;

  /** i18n for time range picker */
  i18n?: TimepickerI18n;

  /** Use 12-hour format with AM/PM */
  twelveHour?: boolean;

  /** Display mode: 'analog' or 'digital' (default: 'digital') */
  displayMode?: 'analog' | 'digital';

  /** Step for minute increments (default 5) */
  minuteStep?: number;

  /** Step for hour increments (default 1) */
  hourStep?: number;

  /** Minimum selectable time in HH:MM or HH:MM AM/PM format */
  minTime?: string;

  /** Maximum selectable time in HH:MM or HH:MM AM/PM format */
  maxTime?: string;

  /** Show clear button */
  showClearBtn?: boolean;

  /** Dial radius for analog clock (default: 135) */
  dialRadius?: number;

  /** Outer radius for analog clock (default: 105) */
  outerRadius?: number;

  /** Inner radius for analog clock (default: 70) */
  innerRadius?: number;

  /** Tick radius for analog clock (default: 20) */
  tickRadius?: number;

  /** Round by 5 minutes for analog clock (default: false) */
  roundBy5?: boolean;

  /** Vibrate on value change for analog clock (default: true) */
  vibrate?: boolean;
}

/**
 * TimeRangePicker component for selecting time ranges
 * Custom implementation with embedded digital clock picker
 */
export const TimeRangePicker: FactoryComponent<TimeRangePickerAttrs> = () => {
  let state: TimeRangePickerState;

  const calculateMinTime = (startTime: TimeValue, twelveHour: boolean): string | undefined => {
    if (!startTime) return undefined;

    let hours = startTime.hours;
    let minutes = startTime.minutes + 1;
    let amOrPm = startTime.amOrPm;

    if (minutes >= 60) {
      minutes = 0;
      hours++;

      if (twelveHour) {
        if (hours > 12) {
          hours = 1;
          amOrPm = amOrPm === 'AM' ? 'PM' : 'AM';
        } else if (hours === 12) {
          amOrPm = amOrPm === 'AM' ? 'PM' : 'AM';
        }
      } else {
        if (hours >= 24) hours = 0;
      }
    }

    return formatTime({ hours, minutes, amOrPm }, twelveHour);
  };

  const handleNextOrDone = (
    validateRange: boolean,
    twelveHour: boolean,
    onchange?: (startTime: string, endTime: string) => void
  ) => {
    if (state.currentSelection === 'start') {
      // Move to end time selection
      state.currentSelection = 'end';
      state.currentView = 'hours'; // Reset to hours view for end time

      // If validation is enabled and end time is before or equal to start time, reset end time
      if (validateRange) {
        const startMins = timeToMinutes(state.tempStartTime, twelveHour);
        const endMins = timeToMinutes(state.tempEndTime, twelveHour);
        if (endMins <= startMins) {
          // Reset end time to start time
          state.tempEndTime = { ...state.tempStartTime };
        }
      }
    } else {
      // Finalize selection
      state.startTime = { ...state.tempStartTime };
      state.endTime = { ...state.tempEndTime };
      state.isPickerOpen = false;
      state.currentSelection = 'start';

      // Call onchange callback
      if (onchange && state.startTime && state.endTime) {
        const startTimeStr = formatTime(state.startTime, twelveHour);
        const endTimeStr = formatTime(state.endTime, twelveHour);
        onchange(startTimeStr, endTimeStr);
      }
    }
  };

  const TimeRangePickerModal: FactoryComponent<{
    i18n: Required<TimepickerI18n>;
    showClearBtn: boolean;
    twelveHour: boolean;
    minuteStep: number;
    hourStep: number;
    minTime?: string;
    maxTime?: string;
    validateRange: boolean;
    onchange?: (startTime: string, endTime: string) => void;
    displayMode?: 'analog' | 'digital';
    dialRadius?: number;
    outerRadius?: number;
    innerRadius?: number;
    tickRadius?: number;
    roundBy5?: boolean;
    vibrate?: boolean;
  }> = () => {
    return {
      view: ({ attrs }) => {
        const {
          i18n,
          showClearBtn,
          twelveHour,
          minuteStep,
          hourStep,
          minTime,
          maxTime,
          validateRange,
          displayMode = 'digital',
          dialRadius = 135,
          outerRadius = 105,
          innerRadius = 70,
          tickRadius = 20,
          roundBy5 = false,
          vibrate = true,
        } = attrs;

        const isAnalogMode = displayMode === 'analog';

        // Calculate effective minTime for end time selection
        const effectiveMinTime =
          state.currentSelection === 'end' && validateRange
            ? calculateMinTime(state.tempStartTime, twelveHour)
            : minTime;

        return m('.modal-content.timepicker-container', [
          // Vertical time range display on the left
          m('.timerange-display-vertical', [
            m('.timerange-time-section', { class: state.currentSelection === 'start' ? 'active' : '' }, [
              m('.timerange-label', 'Start'),
              m('.timerange-time', [
                m(
                  'span.timerange-hours',
                  {
                    oncreate: (vnode) => {
                      state.spanStartHours = vnode.dom as HTMLElement;
                      state.spanStartHours.innerHTML = addLeadingZero(state.tempStartTime.hours);
                    },
                  },
                  addLeadingZero(state.tempStartTime.hours)
                ),
                ':',
                m(
                  'span.timerange-minutes',
                  {
                    oncreate: (vnode) => {
                      state.spanStartMinutes = vnode.dom as HTMLElement;
                      state.spanStartMinutes.innerHTML = addLeadingZero(state.tempStartTime.minutes);
                    },
                  },
                  addLeadingZero(state.tempStartTime.minutes)
                ),
                twelveHour &&
                  m(
                    'span.timerange-ampm',
                    {
                      oncreate: (vnode) => {
                        state.spanStartAmPm = vnode.dom as HTMLElement;
                        state.spanStartAmPm.innerHTML = ` ${state.tempStartTime.amOrPm}`;
                      },
                    },
                    ` ${state.tempStartTime.amOrPm}`
                  ),
              ]),
            ]),
            m('.timerange-time-section', { class: state.currentSelection === 'end' ? 'active' : '' }, [
              m('.timerange-label', 'End'),
              m('.timerange-time', [
                m(
                  'span.timerange-hours',
                  {
                    oncreate: (vnode) => {
                      state.spanEndHours = vnode.dom as HTMLElement;
                      state.spanEndHours.innerHTML = addLeadingZero(state.tempEndTime.hours);
                    },
                  },
                  addLeadingZero(state.tempEndTime.hours)
                ),
                ':',
                m(
                  'span.timerange-minutes',
                  {
                    oncreate: (vnode) => {
                      state.spanEndMinutes = vnode.dom as HTMLElement;
                      state.spanEndMinutes.innerHTML = addLeadingZero(state.tempEndTime.minutes);
                    },
                  },
                  addLeadingZero(state.tempEndTime.minutes)
                ),
                twelveHour &&
                  m(
                    'span.timerange-ampm',
                    {
                      oncreate: (vnode) => {
                        state.spanEndAmPm = vnode.dom as HTMLElement;
                        state.spanEndAmPm.innerHTML = ` ${state.tempEndTime.amOrPm}`;
                      },
                    },
                    ` ${state.tempEndTime.amOrPm}`
                  ),
              ]),
            ]),
          ]),

          // Clock picker (analog or digital mode)
          isAnalogMode
            ? m('.timepicker-analog-display', [
                m(
                  '.timepicker-plate',
                  m(AnalogClock, {
                    key: state.currentSelection, // Force component recreation when switching between start/end
                    hours: state.currentSelection === 'start' ? state.tempStartTime.hours : state.tempEndTime.hours,
                    minutes:
                      state.currentSelection === 'start' ? state.tempStartTime.minutes : state.tempEndTime.minutes,
                    amOrPm: state.currentSelection === 'start' ? state.tempStartTime.amOrPm : state.tempEndTime.amOrPm,
                    currentView: state.currentView,
                    twelveHour,
                    dialRadius,
                    outerRadius,
                    innerRadius,
                    tickRadius,
                    roundBy5,
                    vibrate,
                    onTimeChange: (hours, minutes) => {
                      if (state.currentSelection === 'start') {
                        state.tempStartTime = { ...state.tempStartTime, hours, minutes };
                        if (state.spanStartHours) state.spanStartHours.innerHTML = addLeadingZero(hours);
                        if (state.spanStartMinutes) state.spanStartMinutes.innerHTML = addLeadingZero(minutes);
                      } else {
                        state.tempEndTime = { ...state.tempEndTime, hours, minutes };
                        if (state.spanEndHours) state.spanEndHours.innerHTML = addLeadingZero(hours);
                        if (state.spanEndMinutes) state.spanEndMinutes.innerHTML = addLeadingZero(minutes);
                      }
                    },
                    onViewChange: (view) => {
                      state.currentView = view;
                    },
                    spanHours: state.currentSelection === 'start' ? state.spanStartHours : state.spanEndHours,
                    spanMinutes: state.currentSelection === 'start' ? state.spanStartMinutes : state.spanEndMinutes,
                  })
                ),
                // Footer (inside analog display)
                m('.timepicker-footer', [
                  m(
                    'button.btn-flat.timepicker-clear.waves-effect',
                    {
                      type: 'button',
                      style: showClearBtn ? '' : 'visibility: hidden;',
                      onclick: () => {
                        state.isPickerOpen = false;
                      },
                    },
                    i18n.clear
                  ),
                  m('.confirmation-btns', [
                    m(
                      'button.btn-flat.timepicker-close.waves-effect',
                      {
                        type: 'button',
                        onclick: () => {
                          state.isPickerOpen = false;
                          state.currentSelection = 'start';
                          state.currentView = 'hours'; // Reset to hours view
                        },
                      },
                      i18n.cancel
                    ),
                    m(
                      'button.btn-flat.timepicker-close.waves-effect',
                      {
                        type: 'button',
                        onclick: () => {
                          handleNextOrDone(validateRange, twelveHour, attrs.onchange);
                        },
                      },
                      state.currentSelection === 'start' ? i18n.next : i18n.done
                    ),
                  ]),
                ]),
              ])
            : m('.timepicker-digital-mode', [
                m(DigitalClock, {
                  key: state.currentSelection, // Force component recreation when switching between start/end
                  hours: state.currentSelection === 'start' ? state.tempStartTime.hours : state.tempEndTime.hours,
                  minutes: state.currentSelection === 'start' ? state.tempStartTime.minutes : state.tempEndTime.minutes,
                  amOrPm: state.currentSelection === 'start' ? state.tempStartTime.amOrPm : state.tempEndTime.amOrPm,
                  twelveHour,
                  minuteStep,
                  hourStep,
                  minTime: effectiveMinTime,
                  maxTime,
                  onTimeChange: (hours, minutes, amOrPm) => {
                    if (state.currentSelection === 'start') {
                      state.tempStartTime = { hours, minutes, amOrPm };
                      if (state.spanStartHours) state.spanStartHours.innerHTML = addLeadingZero(hours);
                      if (state.spanStartMinutes) state.spanStartMinutes.innerHTML = addLeadingZero(minutes);
                      if (state.spanStartAmPm) state.spanStartAmPm.innerHTML = ` ${amOrPm}`;
                    } else {
                      state.tempEndTime = { hours, minutes, amOrPm };
                      if (state.spanEndHours) state.spanEndHours.innerHTML = addLeadingZero(hours);
                      if (state.spanEndMinutes) state.spanEndMinutes.innerHTML = addLeadingZero(minutes);
                      if (state.spanEndAmPm) state.spanEndAmPm.innerHTML = ` ${amOrPm}`;
                    }
                  },
                  spanHours: state.currentSelection === 'start' ? state.spanStartHours : state.spanEndHours,
                  spanMinutes: state.currentSelection === 'start' ? state.spanStartMinutes : state.spanEndMinutes,
                  spanAmPm: state.currentSelection === 'start' ? state.spanStartAmPm : state.spanEndAmPm,
                }),
                // Footer (inside digital mode)
                m('.timepicker-footer', { key: 'timepicker-footer' }, [
                  m(
                    'button.btn-flat.timepicker-clear.waves-effect',
                    {
                      type: 'button',
                      style: showClearBtn ? '' : 'visibility: hidden;',
                      onclick: () => {
                        state.isPickerOpen = false;
                      },
                    },
                    i18n.clear
                  ),
                  m('.confirmation-btns', [
                    m(
                      'button.btn-flat.timepicker-close.waves-effect',
                      {
                        type: 'button',
                        onclick: () => {
                          state.isPickerOpen = false;
                          state.currentSelection = 'start';
                          state.currentView = 'hours'; // Reset to hours view
                        },
                      },
                      i18n.cancel
                    ),
                    m(
                      'button.btn-flat.timepicker-close.waves-effect',
                      {
                        type: 'button',
                        onclick: () => {
                          handleNextOrDone(validateRange, twelveHour, attrs.onchange);
                        },
                      },
                      state.currentSelection === 'start' ? i18n.next : i18n.done
                    ),
                  ]),
                ]),
              ]),
        ]);
      },
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && state.isPickerOpen) {
      state.isPickerOpen = false;
      clearPortal(state.portalContainerId);
    }
  };

  const renderPickerToPortal = (attrs: TimeRangePickerAttrs) => {
    const mergedI18n: Required<TimepickerI18n> = {
      ...defaultI18n,
      ...attrs.i18n,
    };

    const pickerModal = m(
      '.timepicker-modal-wrapper',
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
            state.isPickerOpen = false;
            state.currentSelection = 'start';
            state.currentView = 'hours'; // Reset to hours view
          },
        }),

        // Modal content
        m(
          '.modal.timepicker-modal.open.timerange-modal',
          {
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
            m(TimeRangePickerModal, {
              i18n: mergedI18n,
              showClearBtn: attrs.showClearBtn || false,
              twelveHour: attrs.twelveHour !== undefined ? attrs.twelveHour : true,
              minuteStep: attrs.minuteStep || 5,
              hourStep: attrs.hourStep || 1,
              minTime: attrs.minTime,
              maxTime: attrs.maxTime,
              validateRange: attrs.validateRange || false,
              onchange: attrs.onchange,
              displayMode: attrs.displayMode,
              dialRadius: attrs.dialRadius,
              outerRadius: attrs.outerRadius,
              innerRadius: attrs.innerRadius,
              tickRadius: attrs.tickRadius,
              roundBy5: attrs.roundBy5,
              vibrate: attrs.vibrate,
            }),
          ]
        ),
      ]
    );

    renderToPortal(state.portalContainerId, pickerModal, 1004);
  };

  return {
    oninit: (vnode) => {
      const attrs = vnode.attrs;
      const twelveHour = attrs.twelveHour !== undefined ? attrs.twelveHour : true;

      const startTime = parseTime(attrs.startValue || '', twelveHour);
      const endTime = parseTime(attrs.endValue || '', twelveHour);

      state = {
        id: uniqueId(),
        currentSelection: 'start',
        startTime,
        endTime,
        tempStartTime: { ...startTime },
        tempEndTime: { ...endTime },
        isPickerOpen: false,
        portalContainerId: `timerange-portal-${uniqueId()}`,
        currentView: 'hours',
      };

      document.addEventListener('keydown', handleKeyDown);
    },

    onremove: () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (state.isPickerOpen) {
        clearPortal(state.portalContainerId);
      }
    },

    onupdate: ({ attrs }) => {
      if (state.isPickerOpen) {
        renderPickerToPortal(attrs);
      } else {
        clearPortal(state.portalContainerId);
      }
    },

    view: ({ attrs }) => {
      const {
        id = state.id,
        label,
        placeholder = 'Select time range',
        disabled,
        readonly,
        required,
        iconName,
        helperText,
        className: cn1,
        class: cn2,
        twelveHour = true,
      } = attrs;

      const className = cn1 || cn2 || 'col s12';

      const displayValue =
        state.startTime && state.endTime
          ? `${formatTime(state.startTime, twelveHour)} - ${formatTime(state.endTime, twelveHour)}`
          : state.startTime
          ? `${formatTime(state.startTime, twelveHour)} - ...`
          : '';

      return m('.input-field', { className }, [
        iconName && m('i.material-icons.prefix', iconName),

        // Display input
        m('input.timerangepicker', {
          id,
          type: 'text',
          value: displayValue,
          placeholder,
          readonly: true,
          disabled,
          required,
          onclick: () => {
            if (!disabled && !readonly) {
              state.isPickerOpen = true;
              state.currentSelection = 'start';
              state.currentView = 'hours'; // Reset to hours view when opening
              state.tempStartTime = { ...state.startTime };
              state.tempEndTime = { ...state.endTime };
            }
          },
        }),

        label &&
          m(
            'label',
            {
              for: id,
              class: displayValue || placeholder ? 'active' : '',
            },
            label
          ),

        helperText && m('span.helper-text', helperText),
      ]);
    },
  };
};
