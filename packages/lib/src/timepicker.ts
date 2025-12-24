import m, { FactoryComponent } from 'mithril';
import { InputAttrs } from './input-options';
import { uniqueId, renderToPortal, clearPortal } from './utils';
import { addLeadingZero } from './time-utils';
import { DigitalClock } from './digital-clock';
import { AnalogClock } from './analog-clock';

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

export interface TimepickerOptions {
  dialRadius?: number;
  outerRadius?: number;
  innerRadius?: number;
  tickRadius?: number;
  duration?: number;
  container?: string | null;
  defaultTime?: string; // 'now' or '13:14' e.g.
  fromNow?: number; // Millisecond offset from the defaultTime
  showClearBtn?: boolean;
  i18n?: TimepickerI18n;
  autoClose?: boolean; // auto close when minute is selected
  twelveHour?: boolean; // change to 12 hour AM/PM clock from 24 hour
  vibrate?: boolean; // vibrate the device when dragging clock hand
  roundBy5?: boolean;

  /** Display mode: 'analog' (default) or 'digital' */
  displayMode?: 'analog' | 'digital';

  /** Step for minute increments in digital mode (default 5) */
  minuteStep?: number;

  /** Step for hour increments (default 1) */
  hourStep?: number;

  /** Minimum selectable time in HH:MM or HH:MM AM/PM format */
  minTime?: string;

  /** Maximum selectable time in HH:MM or HH:MM AM/PM format */
  maxTime?: string;

  // Callbacks
  onOpen?: () => void;
  onOpenStart?: () => void;
  onOpenEnd?: () => void;
  onCloseStart?: () => void;
  onCloseEnd?: () => void;
  onSelect?: (hour: number, minute: number) => void;
}

export interface TimePickerAttrs extends InputAttrs<string>, TimepickerOptions {
  /** Use inline mode (HTML5 time input) instead of modal, default true */
  useModal?: boolean;
  /** Allow format toggle between 12h/24h (for inline mode) */
  allowFormatToggle?: boolean;
}

interface TimepickerState {
  id: string;
  isOpen: boolean;
  hours: number;
  minutes: number;
  amOrPm: 'AM' | 'PM';
  currentView: 'hours' | 'minutes';
  portalContainerId: string;
  // DOM elements for display
  spanHours?: HTMLElement;
  spanMinutes?: HTMLElement;
  spanAmPm?: HTMLElement;
  footer?: HTMLElement;
  amBtn?: HTMLElement;
  pmBtn?: HTMLElement;
}

const defaultOptions: Required<TimepickerOptions> = {
  dialRadius: 135,
  outerRadius: 105,
  innerRadius: 70,
  tickRadius: 20,
  duration: 350,
  container: null,
  defaultTime: 'now',
  fromNow: 0,
  showClearBtn: false,
  i18n: defaultI18n,
  autoClose: false,
  twelveHour: true,
  vibrate: true,
  roundBy5: false,
  displayMode: 'analog',
  minuteStep: 5,
  hourStep: 1,
  minTime: undefined as any,
  maxTime: undefined as any,
  onOpen: () => {},
  onOpenStart: () => {},
  onOpenEnd: () => {},
  onCloseStart: () => {},
  onCloseEnd: () => {},
  onSelect: () => {},
};

/**
 * TimePicker component based on original Materialize CSS timepicker
 */
export const TimePicker: FactoryComponent<TimePickerAttrs> = () => {
  let state: TimepickerState;
  let options: Required<TimepickerOptions>;

  // Use shared utilities from time-utils
  // const addLeadingZero = sharedAddLeadingZero;
  // const generateHourOptions = sharedGenerateHourOptions;
  // const generateMinuteOptions = sharedGenerateMinuteOptions;
  // const scrollToValue = sharedScrollToValue;
  // const snapToNearestItem = sharedSnapToNearestItem;

  const updateTimeFromInput = (inputValue: string) => {
    let value: string[] = ((inputValue || options.defaultTime || '') + '').split(':');
    let amPmWasProvided = false;

    if (options.twelveHour && value.length > 1) {
      if (value[1].toUpperCase().indexOf('AM') > -1) {
        state.amOrPm = 'AM';
        amPmWasProvided = true;
      } else if (value[1].toUpperCase().indexOf('PM') > -1) {
        state.amOrPm = 'PM';
        amPmWasProvided = true;
      }
      value[1] = value[1].replace('AM', '').replace('PM', '').trim();
    }

    if (value[0] === 'now') {
      const now = new Date(+new Date() + options.fromNow);
      value = [now.getHours().toString(), now.getMinutes().toString()];
      if (options.twelveHour) {
        state.amOrPm = parseInt(value[0]) >= 12 ? 'PM' : 'AM';
        amPmWasProvided = false; // For 'now', we need to do conversion
      }
    }

    let hours = +value[0] || 0;
    let minutes = +value[1] || 0;

    if (options.twelveHour) {
      if (!amPmWasProvided) {
        // No AM/PM was provided, assume this is 24-hour format input - convert it
        if (hours >= 12) {
          state.amOrPm = 'PM';
          if (hours > 12) {
            hours = hours - 12;
          }
        } else {
          state.amOrPm = 'AM';
          if (hours === 0) {
            hours = 12;
          }
        }
      } else {
        // AM/PM was provided, hours are already in 12-hour format
        // Just handle midnight/noon edge cases
        if (hours === 0 && state.amOrPm === 'AM') {
          hours = 12;
        }
      }
    }

    state.hours = hours;
    state.minutes = minutes;

    if (state.spanHours) {
      state.spanHours.innerHTML = addLeadingZero(state.hours);
    }
    if (state.spanMinutes) {
      state.spanMinutes.innerHTML = addLeadingZero(state.minutes);
    }

    updateAmPmView();
  };

  const updateAmPmView = () => {
    if (options.twelveHour && state.amBtn && state.pmBtn) {
      state.amBtn.classList.toggle('text-primary', state.amOrPm === 'AM');
      state.pmBtn.classList.toggle('text-primary', state.amOrPm === 'PM');
    }
  };

  const handleAmPmClick = (ampm: 'AM' | 'PM') => {
    state.amOrPm = ampm;
    updateAmPmView();
  };

  const open = (inputValue: string) => {
    if (state.isOpen) return;

    state.isOpen = true;
    updateTimeFromInput(inputValue);
    state.currentView = 'hours';

    if (options.onOpen) options.onOpen();
    if (options.onOpenStart) options.onOpenStart();
    if (options.onOpenEnd) options.onOpenEnd();
  };

  const close = () => {
    if (!state.isOpen) return;

    state.isOpen = false;
    if (options.onCloseStart) options.onCloseStart();
    if (options.onCloseEnd) options.onCloseEnd();
  };

  const done = (clearValue?: boolean) => {
    // const last = ''; // We'll get this from the actual input
    let value = clearValue ? '' : addLeadingZero(state.hours) + ':' + addLeadingZero(state.minutes);

    if (!clearValue && options.twelveHour) {
      value = `${value} ${state.amOrPm}`;
    }

    close();
    m.redraw();
    return value;
  };

  const clear = () => {
    return done(true);
  };

  interface TimepickerModalAttrs {
    i18n: TimepickerI18n;
    showClearBtn: boolean;
  }

  const TimepickerModal: FactoryComponent<TimepickerModalAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const { i18n, showClearBtn } = attrs;
        const isDigitalMode = options.displayMode === 'digital';

        return [
          m('.modal-content.timepicker-container', [
            m('.timepicker-digital-display', [
              m('.timepicker-text-container', [
                m('.timepicker-display-column', [
                  m(
                    'span.timepicker-span-hours',
                    {
                      class: state.currentView === 'hours' ? 'text-primary' : '',
                      onclick: () => {
                        if (!isDigitalMode) {
                          state.currentView = 'hours';
                          m.redraw();
                        }
                      },
                      oncreate: (vnode) => {
                        state.spanHours = vnode.dom as HTMLElement;
                      },
                    },
                    addLeadingZero(state.hours)
                  ),
                  ':',
                  m(
                    'span.timepicker-span-minutes',
                    {
                      class: state.currentView === 'minutes' ? 'text-primary' : '',
                      onclick: () => {
                        if (!isDigitalMode) {
                          state.currentView = 'minutes';
                          m.redraw();
                        }
                      },
                      oncreate: (vnode) => {
                        state.spanMinutes = vnode.dom as HTMLElement;
                      },
                    },
                    addLeadingZero(state.minutes)
                  ),
                ]),
                options.twelveHour &&
                  m('.timepicker-display-column.timepicker-display-am-pm', [
                    m(
                      '.timepicker-span-am-pm',
                      {
                        oncreate: (vnode) => {
                          state.spanAmPm = vnode.dom as HTMLElement;
                        },
                      },
                      [
                        m(
                          '.am-btn',
                          {
                            class: state.amOrPm === 'AM' ? 'text-primary' : '',
                            onclick: () => handleAmPmClick('AM'),
                            oncreate: (vnode) => {
                              state.amBtn = vnode.dom as HTMLElement;
                            },
                          },
                          'AM'
                        ),
                        m(
                          '.pm-btn',
                          {
                            class: state.amOrPm === 'PM' ? 'text-primary' : '',
                            onclick: () => handleAmPmClick('PM'),
                            oncreate: (vnode) => {
                              state.pmBtn = vnode.dom as HTMLElement;
                            },
                          },
                          'PM'
                        ),
                      ]
                    ),
                  ]),
              ]),
            ]),

            // Conditional rendering: digital or analog mode
            isDigitalMode
              ? m('.timepicker-digital-mode', [
                  m(DigitalClock, {
                    hours: state.hours,
                    minutes: state.minutes,
                    amOrPm: state.amOrPm,
                    twelveHour: options.twelveHour,
                    minuteStep: options.minuteStep,
                    hourStep: options.hourStep,
                    minTime: options.minTime,
                    maxTime: options.maxTime,
                    onTimeChange: (hours, minutes, amOrPm) => {
                      state.hours = hours;
                      state.minutes = minutes;
                      state.amOrPm = amOrPm;
                      updateAmPmView();
                      if (options.onSelect) options.onSelect(hours, minutes);
                    },
                    spanHours: state.spanHours,
                    spanMinutes: state.spanMinutes,
                    spanAmPm: state.spanAmPm,
                  }),
                  m(
                    '.timepicker-footer',
                    {
                      oncreate: (vnode) => {
                        state.footer = vnode.dom as HTMLElement;
                      },
                    },
                    [
                      m(
                        'button.btn-flat.timepicker-clear.waves-effect',
                        {
                          type: 'button',
                          tabindex: options.twelveHour ? '3' : '1',
                          style: showClearBtn ? '' : 'visibility: hidden;',
                          onclick: () => clear(),
                        },
                        i18n.clear
                      ),
                      m('.confirmation-btns', [
                        m(
                          'button.btn-flat.timepicker-close.waves-effect',
                          {
                            type: 'button',
                            tabindex: options.twelveHour ? '3' : '1',
                            onclick: () => close(),
                          },
                          i18n.cancel
                        ),
                        m(
                          'button.btn-flat.timepicker-close.waves-effect',
                          {
                            type: 'button',
                            tabindex: options.twelveHour ? '3' : '1',
                            onclick: () => done(),
                          },
                          i18n.done
                        ),
                      ]),
                    ]
                  ),
                ])
              : m('.timepicker-analog-display', [
                  m(
                    '.timepicker-plate',
                    m(AnalogClock, {
                      hours: state.hours,
                      minutes: state.minutes,
                      amOrPm: state.amOrPm,
                      currentView: state.currentView,
                      twelveHour: options.twelveHour,
                      dialRadius: options.dialRadius,
                      outerRadius: options.outerRadius,
                      innerRadius: options.innerRadius,
                      tickRadius: options.tickRadius,
                      roundBy5: options.roundBy5,
                      vibrate: options.vibrate,
                      onTimeChange: (hours, minutes) => {
                        state.hours = hours;
                        state.minutes = minutes;
                        if (options.onSelect) options.onSelect(hours, minutes);
                      },
                      onViewChange: (view) => {
                        state.currentView = view;
                        if (view === 'minutes' && options.autoClose) {
                          setTimeout(() => done(), options.duration / 2);
                        }
                      },
                      spanHours: state.spanHours,
                      spanMinutes: state.spanMinutes,
                    })
                  ),
                  m(
                    '.timepicker-footer',
                    {
                      oncreate: (vnode) => {
                        state.footer = vnode.dom as HTMLElement;
                      },
                    },
                    [
                      m(
                        'button.btn-flat.timepicker-clear.waves-effect',
                        {
                          type: 'button',
                          tabindex: options.twelveHour ? '3' : '1',
                          style: showClearBtn ? '' : 'visibility: hidden;',
                          onclick: () => clear(),
                        },
                        i18n.clear
                      ),
                      m('.confirmation-btns', [
                        m(
                          'button.btn-flat.timepicker-close.waves-effect',
                          {
                            type: 'button',
                            tabindex: options.twelveHour ? '3' : '1',
                            onclick: () => close(),
                          },
                          i18n.cancel
                        ),
                        m(
                          'button.btn-flat.timepicker-close.waves-effect',
                          {
                            type: 'button',
                            tabindex: options.twelveHour ? '3' : '1',
                            onclick: () => done(),
                          },
                          i18n.done
                        ),
                      ]),
                    ]
                  ),
                ]),
          ]),
        ];
      },
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && state.isOpen) {
      close();
      clearPortal(state.portalContainerId);
      m.redraw();
    }
  };

  const renderPickerToPortal = () => {
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
            close();
            m.redraw();
          },
        }),

        // Modal content
        m(
          '.modal.timepicker-modal.open',
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
            m(TimepickerModal, {
              i18n: options.i18n,
              showClearBtn: options.showClearBtn,
            } as TimepickerModalAttrs),
          ]
        ),
      ]
    );

    renderToPortal(state.portalContainerId, pickerModal, 1004);
  };

  return {
    oninit: (vnode) => {
      const attrs = vnode.attrs;
      options = { ...defaultOptions, ...attrs };

      state = {
        id: uniqueId(),
        isOpen: false,
        hours: 12,
        minutes: 0,
        amOrPm: 'AM',
        currentView: 'hours',
        portalContainerId: `timepicker-portal-${uniqueId()}`,
      };

      // Handle value after options are set
      if (attrs.defaultValue) {
        updateTimeFromInput(attrs.defaultValue);
      }

      // Add ESC key listener
      document.addEventListener('keydown', handleKeyDown);
    },

    onremove: () => {
      // Cleanup
      document.removeEventListener('keydown', handleKeyDown);

      // Clean up portal if picker was open
      if (state.isOpen) {
        clearPortal(state.portalContainerId);
      }
    },

    onupdate: ({ attrs }) => {
      const { useModal = true } = attrs;

      // Only render to portal when using modal mode
      if (useModal && state.isOpen) {
        renderPickerToPortal();
      } else {
        clearPortal(state.portalContainerId);
      }
    },

    view: ({ attrs }) => {
      const {
        id = state.id,
        label,
        placeholder,
        disabled,
        readonly,
        required,
        iconName,
        helperText,
        onchange,
        oninput,
        useModal = true,
        twelveHour,
        className: cn1,
        class: cn2,
      } = attrs;
      const className = cn1 || cn2 || 'col s12';
      // Format time value for display
      const formatTime = (hours: number, minutes: number, use12Hour: boolean): string => {
        if (use12Hour) {
          const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
          const ampm = hours >= 12 ? 'PM' : 'AM';
          return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        } else {
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
      };

      const setTime = (timeValue: string) => {
        if (onchange) {
          onchange(timeValue);
        }
      };

      // Calculate display hours based on format
      let hoursForDisplay = state.hours;

      if (twelveHour) {
        // For 12-hour display format, use the original 24-hour value so formatTime can properly determine AM/PM
        if (options.twelveHour) {
          // Convert from internal 12-hour back to 24-hour for proper AM/PM calculation
          if (state.amOrPm === 'PM' && state.hours !== 12) {
            hoursForDisplay = state.hours + 12;
          } else if (state.amOrPm === 'AM' && state.hours === 12) {
            hoursForDisplay = 0;
          }
        }
      } else {
        // For 24-hour display format
        if (options.twelveHour) {
          // Convert from internal 12-hour to 24-hour for display
          if (state.amOrPm === 'PM' && state.hours !== 12) {
            hoursForDisplay = state.hours + 12;
          } else if (state.amOrPm === 'AM' && state.hours === 12) {
            hoursForDisplay = 0;
          }
        }
      }

      const displayValue =
        state.hours !== undefined && state.minutes !== undefined
          ? formatTime(hoursForDisplay, state.minutes, twelveHour || false)
          : '';

      return m('.input-field', { className }, [
        // Icon prefix
        iconName && m('i.material-icons.prefix', iconName),

        // Time input field - use HTML5 time input for inline mode
        m('input.timepicker', {
          id,
          type: useModal ? 'text' : 'time',
          value: useModal
            ? displayValue
            : state.hours !== undefined && state.minutes !== undefined
              ? `${state.hours.toString().padStart(2, '0')}:${state.minutes.toString().padStart(2, '0')}`
              : '',
          placeholder: useModal ? placeholder : undefined,
          disabled,
          readonly,
          required,
          onclick: () => {
            if (!disabled && !readonly && useModal) {
              open(displayValue);
            }
          },
          onchange: (e: Event) => {
            if (!useModal) {
              // For inline mode, handle HTML5 time input changes directly
              const target = e.target as HTMLInputElement;
              const timeValue = target.value; // Already in HH:MM format
              const [hours, minutes] = timeValue.split(':').map(Number);
              state.hours = hours;
              state.minutes = minutes;
              setTime(timeValue);
            }
          },
          oninput: (e: Event) => {
            if (!useModal && oninput) {
              const target = e.target as HTMLInputElement;
              oninput(target.value);
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

        // Modal is now rendered via portal in onupdate hook
      ]);
    },
  };
};
