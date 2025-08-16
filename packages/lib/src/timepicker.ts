import m, { FactoryComponent } from 'mithril';
import { InputAttrs } from './input-options';
import { uniqueId } from './utils';

export interface TimepickerI18n {
  cancel?: string;
  clear?: string;
  done?: string;
}

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
  /** Clear button label */
  clearLabel?: string;
  /** Close button label */
  closeLabel?: string;
}

interface TimepickerState {
  id: string;
  isOpen: boolean;
  hours: number;
  minutes: number;
  amOrPm: 'AM' | 'PM';
  currentView: 'hours' | 'minutes';
  moved: boolean;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  // SVG elements
  hand?: SVGLineElement;
  bg?: SVGCircleElement;
  bearing?: SVGCircleElement;
  g?: SVGGElement;
  // DOM elements
  canvas?: HTMLElement;
  plate?: HTMLElement;
  hoursView?: HTMLElement;
  minutesView?: HTMLElement;
  spanHours?: HTMLElement;
  spanMinutes?: HTMLElement;
  spanAmPm?: HTMLElement;
  footer?: HTMLElement;
  amBtn?: HTMLElement;
  pmBtn?: HTMLElement;
  vibrateTimer?: number;
  toggleViewTimer?: number;
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
  i18n: {
    cancel: 'Cancel',
    clear: 'Clear',
    done: 'Ok',
  },
  autoClose: false,
  twelveHour: true,
  vibrate: true,
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

  const addLeadingZero = (num: number): string => {
    return (num < 10 ? '0' : '') + num;
  };

  const createSVGEl = (name: string): SVGElement => {
    const svgNS = 'http://www.w3.org/2000/svg';
    return document.createElementNS(svgNS, name);
  };

  const getPos = (e: Event): { x: number; y: number } => {
    const touchEvent = e as TouchEvent;
    const mouseEvent = e as MouseEvent;

    if (touchEvent.targetTouches && touchEvent.targetTouches.length >= 1) {
      return { x: touchEvent.targetTouches[0].clientX, y: touchEvent.targetTouches[0].clientY };
    }
    return { x: mouseEvent.clientX, y: mouseEvent.clientY };
  };

  const vibrate = () => {
    if (state.vibrateTimer) {
      clearTimeout(state.vibrateTimer);
    }
    if (options.vibrate && navigator.vibrate) {
      navigator.vibrate(10);
      state.vibrateTimer = window.setTimeout(() => {
        state.vibrateTimer = undefined;
      }, 100);
    }
  };

  const handleClockClickStart = (e: Event) => {
    e.preventDefault();
    if (!state.plate) return;

    const clockPlateBR = state.plate.getBoundingClientRect();
    const offset = { x: clockPlateBR.left, y: clockPlateBR.top };

    state.x0 = offset.x + options.dialRadius;
    state.y0 = offset.y + options.dialRadius;
    state.moved = false;
    const clickPos = getPos(e);
    state.dx = clickPos.x - state.x0;
    state.dy = clickPos.y - state.y0;

    setHand(state.dx, state.dy, false);

    document.addEventListener('mousemove', handleDocumentClickMove);
    document.addEventListener('touchmove', handleDocumentClickMove);
    document.addEventListener('mouseup', handleDocumentClickEnd);
    document.addEventListener('touchend', handleDocumentClickEnd);
  };

  const handleDocumentClickMove = (e: Event) => {
    e.preventDefault();
    const clickPos = getPos(e);
    const x = clickPos.x - state.x0;
    const y = clickPos.y - state.y0;
    state.moved = true;
    setHand(x, y, false, true);
  };

  const handleDocumentClickEnd = (e: Event) => {
    e.preventDefault();
    document.removeEventListener('mouseup', handleDocumentClickEnd);
    document.removeEventListener('touchend', handleDocumentClickEnd);
    document.removeEventListener('mousemove', handleDocumentClickMove);
    document.removeEventListener('touchmove', handleDocumentClickMove);

    const clickPos = getPos(e);
    const x = clickPos.x - state.x0;
    const y = clickPos.y - state.y0;
    if (state.moved && x === state.dx && y === state.dy) {
      setHand(x, y);
    }

    if (state.currentView === 'hours') {
      showView('minutes', options.duration / 2);
    } else if (options.autoClose) {
      if (state.minutesView) {
        state.minutesView.classList.add('timepicker-dial-out');
      }
      setTimeout(() => {
        done();
      }, options.duration / 2);
    }

    if (options.onSelect) {
      options.onSelect(state.hours, state.minutes);
    }
  };

  const updateTimeFromInput = (inputValue: string) => {
    let value: string[] = ((inputValue || options.defaultTime || '') + '').split(':');

    if (options.twelveHour && value.length > 1) {
      if (value[1].toUpperCase().indexOf('AM') > -1) {
        state.amOrPm = 'AM';
      } else if (value[1].toUpperCase().indexOf('PM') > -1) {
        state.amOrPm = 'PM';
      }
      value[1] = value[1].replace('AM', '').replace('PM', '').trim();
    }

    if (value[0] === 'now') {
      const now = new Date(+new Date() + options.fromNow);
      value = [now.getHours().toString(), now.getMinutes().toString()];
      if (options.twelveHour) {
        state.amOrPm = parseInt(value[0]) >= 12 ? 'PM' : 'AM';
      }
    }

    let hours = +value[0] || 0;
    let minutes = +value[1] || 0;

    // Handle 24-hour to 12-hour conversion if needed
    if (options.twelveHour && hours >= 12) {
      state.amOrPm = 'PM';
      if (hours > 12) {
        hours = hours - 12;
      }
    } else if (options.twelveHour && hours < 12) {
      state.amOrPm = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    }

    state.hours = hours;
    state.minutes = minutes;

    if (state.spanHours) {
      state.spanHours.innerHTML = state.hours.toString();
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

  const showView = (view: 'hours' | 'minutes', delay?: number) => {
    const isHours = view === 'hours';
    const nextView = isHours ? state.hoursView : state.minutesView;
    const hideView = isHours ? state.minutesView : state.hoursView;

    state.currentView = view;

    if (state.spanHours) {
      state.spanHours.classList.toggle('text-primary', isHours);
    }
    if (state.spanMinutes) {
      state.spanMinutes.classList.toggle('text-primary', !isHours);
    }

    if (hideView) {
      hideView.classList.add('timepicker-dial-out');
    }
    if (nextView) {
      nextView.style.visibility = 'visible';
      nextView.classList.remove('timepicker-dial-out');
    }

    resetClock(delay);

    if (state.toggleViewTimer) {
      clearTimeout(state.toggleViewTimer);
    }
    state.toggleViewTimer = window.setTimeout(() => {
      if (hideView) {
        hideView.style.visibility = 'hidden';
      }
    }, options.duration);
  };

  const resetClock = (delay?: number) => {
    const view = state.currentView;
    const value = state[view];
    const isHours = view === 'hours';
    const unit = Math.PI / (isHours ? 6 : 30);
    const radian = value * unit;
    const radius = isHours && value > 0 && value < 13 ? options.innerRadius : options.outerRadius;
    const x = Math.sin(radian) * radius;
    const y = -Math.cos(radian) * radius;

    if (delay && state.canvas) {
      state.canvas.classList.add('timepicker-canvas-out');
      setTimeout(() => {
        if (state.canvas) {
          state.canvas.classList.remove('timepicker-canvas-out');
        }
        setHand(x, y);
      }, delay);
    } else {
      setHand(x, y);
    }
  };

  const setHand = (x: number, y: number, roundBy5?: boolean, _dragging?: boolean) => {
    let radian = Math.atan2(x, -y);
    const isHours = state.currentView === 'hours';
    const unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
    const z = Math.sqrt(x * x + y * y);
    const inner = isHours && z < (options.outerRadius + options.innerRadius) / 2;
    let radius = inner ? options.innerRadius : options.outerRadius;

    if (options.twelveHour) {
      radius = options.outerRadius;
    }

    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }

    let value = Math.round(radian / unit);
    radian = value * unit;

    if (options.twelveHour) {
      if (isHours) {
        if (value === 0) value = 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    } else {
      if (isHours) {
        if (value === 12) value = 0;
        value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    }

    if (state[state.currentView] !== value) {
      vibrate();
    }

    state[state.currentView] = value;

    if (isHours && state.spanHours) {
      state.spanHours.innerHTML = value.toString();
    } else if (!isHours && state.spanMinutes) {
      state.spanMinutes.innerHTML = addLeadingZero(value);
    }

    // Set clock hand position
    if (state.hand && state.bg) {
      const cx1 = Math.sin(radian) * (radius - options.tickRadius);
      const cy1 = -Math.cos(radian) * (radius - options.tickRadius);
      const cx2 = Math.sin(radian) * radius;
      const cy2 = -Math.cos(radian) * radius;

      state.hand.setAttribute('x2', cx1.toString());
      state.hand.setAttribute('y2', cy1.toString());
      state.bg.setAttribute('cx', cx2.toString());
      state.bg.setAttribute('cy', cy2.toString());
    }
  };

  const buildSVGClock = () => {
    if (!state.canvas) return;

    const dialRadius = options.dialRadius;
    const tickRadius = options.tickRadius;
    const diameter = dialRadius * 2;

    const svg = createSVGEl('svg') as SVGSVGElement;
    svg.setAttribute('class', 'timepicker-svg');
    svg.setAttribute('width', diameter.toString());
    svg.setAttribute('height', diameter.toString());

    const g = createSVGEl('g') as SVGGElement;
    g.setAttribute('transform', `translate(${dialRadius},${dialRadius})`);

    const bearing = createSVGEl('circle') as SVGCircleElement;
    bearing.setAttribute('class', 'timepicker-canvas-bearing');
    bearing.setAttribute('cx', '0');
    bearing.setAttribute('cy', '0');
    bearing.setAttribute('r', '4');

    const hand = createSVGEl('line') as SVGLineElement;
    hand.setAttribute('x1', '0');
    hand.setAttribute('y1', '0');

    const bg = createSVGEl('circle') as SVGCircleElement;
    bg.setAttribute('class', 'timepicker-canvas-bg');
    bg.setAttribute('r', tickRadius.toString());

    g.appendChild(hand);
    g.appendChild(bg);
    g.appendChild(bearing);
    svg.appendChild(g);
    state.canvas.appendChild(svg);

    state.hand = hand;
    state.bg = bg;
    state.bearing = bearing;
    state.g = g;
  };

  const buildHoursView = () => {
    if (!state.hoursView) return;

    if (options.twelveHour) {
      for (let i = 1; i < 13; i++) {
        const tick = document.createElement('div');
        tick.className = 'timepicker-tick';
        const radian = (i / 6) * Math.PI;
        const radius = options.outerRadius;
        tick.style.left = options.dialRadius + Math.sin(radian) * radius - options.tickRadius + 'px';
        tick.style.top = options.dialRadius - Math.cos(radian) * radius - options.tickRadius + 'px';
        tick.innerHTML = i === 0 ? '00' : i.toString();
        state.hoursView.appendChild(tick);
      }
    } else {
      for (let i = 0; i < 24; i++) {
        const tick = document.createElement('div');
        tick.className = 'timepicker-tick';
        const radian = (i / 6) * Math.PI;
        const inner = i > 0 && i < 13;
        const radius = inner ? options.innerRadius : options.outerRadius;
        tick.style.left = options.dialRadius + Math.sin(radian) * radius - options.tickRadius + 'px';
        tick.style.top = options.dialRadius - Math.cos(radian) * radius - options.tickRadius + 'px';
        tick.innerHTML = i === 0 ? '00' : i.toString();
        state.hoursView.appendChild(tick);
      }
    }
  };

  const buildMinutesView = () => {
    if (!state.minutesView) return;

    for (let i = 0; i < 60; i += 5) {
      const tick = document.createElement('div');
      tick.className = 'timepicker-tick';
      const radian = (i / 30) * Math.PI;
      tick.style.left = options.dialRadius + Math.sin(radian) * options.outerRadius - options.tickRadius + 'px';
      tick.style.top = options.dialRadius - Math.cos(radian) * options.outerRadius - options.tickRadius + 'px';
      tick.innerHTML = addLeadingZero(i);
      state.minutesView.appendChild(tick);
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
    showView('hours');

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
    return value;
  };

  const clear = () => {
    return done(true);
  };

  interface TimepickerModalAttrs {
    showClearBtn: boolean;
    clearLabel: string;
    closeLabel: string;
    doneLabel: string;
  }

  const TimepickerModal: FactoryComponent<TimepickerModalAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const { showClearBtn, clearLabel, closeLabel, doneLabel } = attrs;
        return [
          m('.modal-content.timepicker-container', [
            m('.timepicker-digital-display', [
              m('.timepicker-text-container', [
                m('.timepicker-display-column', [
                  m(
                    'span.timepicker-span-hours',
                    {
                      class: state.currentView === 'hours' ? 'text-primary' : '',
                      onclick: () => showView('hours'),
                      oncreate: (vnode) => {
                        state.spanHours = vnode.dom as HTMLElement;
                      },
                    },
                    state.hours.toString()
                  ),
                  ':',
                  m(
                    'span.timepicker-span-minutes',
                    {
                      class: state.currentView === 'minutes' ? 'text-primary' : '',
                      onclick: () => showView('minutes'),
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
            m('.timepicker-analog-display', [
              m(
                '.timepicker-plate',
                {
                  oncreate: (vnode) => {
                    state.plate = vnode.dom as HTMLElement;
                    state.plate.addEventListener('mousedown', handleClockClickStart);
                    state.plate.addEventListener('touchstart', handleClockClickStart);
                  },
                  onremove: () => {
                    if (state.plate) {
                      state.plate.removeEventListener('mousedown', handleClockClickStart);
                      state.plate.removeEventListener('touchstart', handleClockClickStart);
                    }
                  },
                },
                [
                  m('.timepicker-canvas', {
                    oncreate: (vnode) => {
                      state.canvas = vnode.dom as HTMLElement;
                      buildSVGClock();
                      // Position the hand after SVG is built
                      setTimeout(() => resetClock(), 10);
                    },
                  }),
                  m('.timepicker-dial.timepicker-hours', {
                    oncreate: (vnode) => {
                      state.hoursView = vnode.dom as HTMLElement;
                      buildHoursView();
                    },
                  }),
                  m('.timepicker-dial.timepicker-minutes.timepicker-dial-out', {
                    oncreate: (vnode) => {
                      state.minutesView = vnode.dom as HTMLElement;
                      buildMinutesView();
                    },
                  }),
                ]
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
                    clearLabel
                  ),
                  m('.confirmation-btns', [
                    m(
                      'button.btn-flat.timepicker-close.waves-effect',
                      {
                        type: 'button',
                        tabindex: options.twelveHour ? '3' : '1',
                        onclick: () => close(),
                      },
                      closeLabel
                    ),
                    m(
                      'button.btn-flat.timepicker-close.waves-effect',
                      {
                        type: 'button',
                        tabindex: options.twelveHour ? '3' : '1',
                        onclick: () => done(),
                      },
                      doneLabel
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
        moved: false,
        x0: 0,
        y0: 0,
        dx: 0,
        dy: 0,
      };

      // Handle initial value after options are set
      if (attrs.initialValue) {
        updateTimeFromInput(attrs.initialValue);
      }
    },

    onremove: () => {
      // Cleanup
      if (state.toggleViewTimer) {
        clearTimeout(state.toggleViewTimer);
      }
      if (state.vibrateTimer) {
        clearTimeout(state.vibrateTimer);
      }
      document.removeEventListener('mousemove', handleDocumentClickMove);
      document.removeEventListener('touchmove', handleDocumentClickMove);
      document.removeEventListener('mouseup', handleDocumentClickEnd);
      document.removeEventListener('touchend', handleDocumentClickEnd);
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
        showClearBtn = false,
        clearLabel = 'Clear',
        closeLabel = 'Cancel',
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

        // Modal timepicker
        useModal &&
          state.isOpen && [
            // Modal overlay
            m('.modal-overlay', {
              style: {
                zIndex: 1002,
                display: 'block',
                opacity: 0.5,
              },
              onclick: () => close(),
            }),
            // Modal content
            m(
              '.modal.timepicker-modal.open',
              {
                style: {
                  zIndex: 1003,
                  display: 'block',
                  opacity: 1,
                  top: '10%',
                  transform: 'scaleX(1) scaleY(1)',
                },
              },
              m(TimepickerModal, { showClearBtn, clearLabel, closeLabel, doneLabel: 'OK' })
            ),
          ],
      ]);
    },
  };
};
