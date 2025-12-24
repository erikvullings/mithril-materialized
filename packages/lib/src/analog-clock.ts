import m, { FactoryComponent } from 'mithril';
import { addLeadingZero } from './time-utils';

/**
 * Attributes for the AnalogClock component
 */
export interface AnalogClockAttrs {
  /** Current hours value (1-12 for 12-hour, 0-23 for 24-hour) */
  hours: number;

  /** Current minutes value (0-59) */
  minutes: number;

  /** Current AM/PM value (only relevant in 12-hour mode) */
  amOrPm: 'AM' | 'PM';

  /** Current view mode: 'hours' or 'minutes' */
  currentView: 'hours' | 'minutes';

  /** Whether to use 12-hour format (true) or 24-hour format (false) */
  twelveHour: boolean;

  /** Radius of the clock dial (default: 135) */
  dialRadius?: number;

  /** Radius of outer clock ticks (default: 105) */
  outerRadius?: number;

  /** Radius of inner clock ticks for 24-hour mode (default: 70) */
  innerRadius?: number;

  /** Radius of tick circles (default: 20) */
  tickRadius?: number;

  /** Round minutes to nearest 5 when dragging (default: false) */
  roundBy5?: boolean;

  /** Enable haptic feedback vibration (default: true) */
  vibrate?: boolean;

  /** Callback when time changes */
  onTimeChange: (hours: number, minutes: number) => void;

  /** Callback when view changes (optional) */
  onViewChange?: (view: 'hours' | 'minutes') => void;

  /** Optional reference to external hours display element for updates */
  spanHours?: HTMLElement;

  /** Optional reference to external minutes display element for updates */
  spanMinutes?: HTMLElement;
}

/**
 * Internal state for the AnalogClock component
 */
interface AnalogClockState {
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

  // Interaction state
  moved: boolean;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  vibrateTimer?: number;
}

/**
 * AnalogClock component - A draggable analog clock face for time selection
 *
 * @example
 * ```typescript
 * m(AnalogClock, {
 *   hours: 10,
 *   minutes: 30,
 *   amOrPm: 'AM',
 *   currentView: 'hours',
 *   twelveHour: true,
 *   onTimeChange: (hours, minutes) => {
 *     console.log(`Time changed to ${hours}:${minutes}`);
 *   },
 *   onViewChange: (view) => {
 *     console.log(`View changed to ${view}`);
 *   }
 * })
 * ```
 */
export const AnalogClock: FactoryComponent<AnalogClockAttrs> = () => {
  const state: AnalogClockState = {
    moved: false,
    x0: 0,
    y0: 0,
    dx: 0,
    dy: 0,
  };

  const getPos = (e: Event): { x: number; y: number } => {
    const touchEvent = e as TouchEvent;
    const mouseEvent = e as MouseEvent;

    if (touchEvent.targetTouches && touchEvent.targetTouches.length >= 1) {
      return { x: touchEvent.targetTouches[0].clientX, y: touchEvent.targetTouches[0].clientY };
    }
    return { x: mouseEvent.clientX, y: mouseEvent.clientY };
  };

  const vibrate = (attrs: AnalogClockAttrs) => {
    if (state.vibrateTimer) {
      clearTimeout(state.vibrateTimer);
    }
    if (attrs.vibrate && navigator.vibrate) {
      navigator.vibrate(10);
      state.vibrateTimer = window.setTimeout(() => {
        state.vibrateTimer = undefined;
      }, 100);
    }
  };

  const setHand = (x: number, y: number, attrs: AnalogClockAttrs, roundBy5?: boolean, _dragging?: boolean) => {
    const outerRadius = attrs.outerRadius || 105;
    const innerRadius = attrs.innerRadius || 70;
    const tickRadius = attrs.tickRadius || 20;

    let radian = Math.atan2(x, -y);
    const isHours = attrs.currentView === 'hours';
    const unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
    const z = Math.sqrt(x * x + y * y);
    const inner = isHours && z < (outerRadius + innerRadius) / 2;
    let radius = inner ? innerRadius : outerRadius;

    if (attrs.twelveHour) {
      radius = outerRadius;
    }

    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }

    let value = Math.round(radian / unit);
    radian = value * unit;

    if (attrs.twelveHour) {
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

    const currentValue = isHours ? attrs.hours : attrs.minutes;
    if (currentValue !== value) {
      vibrate(attrs);
    }

    // Update the value
    if (isHours) {
      attrs.onTimeChange(value, attrs.minutes);
      if (attrs.spanHours) {
        attrs.spanHours.innerHTML = addLeadingZero(value);
      }
    } else {
      attrs.onTimeChange(attrs.hours, value);
      if (attrs.spanMinutes) {
        attrs.spanMinutes.innerHTML = addLeadingZero(value);
      }
    }

    // Set clock hand position
    if (state.hand && state.bg) {
      const cx1 = Math.sin(radian) * (radius - tickRadius);
      const cy1 = -Math.cos(radian) * (radius - tickRadius);
      const cx2 = Math.sin(radian) * radius;
      const cy2 = -Math.cos(radian) * radius;

      state.hand.setAttribute('x2', cx1.toString());
      state.hand.setAttribute('y2', cy1.toString());
      state.bg.setAttribute('cx', cx2.toString());
      state.bg.setAttribute('cy', cy2.toString());
    }
  };

  const resetClock = (attrs: AnalogClockAttrs) => {
    const view = attrs.currentView;
    const value = view === 'hours' ? attrs.hours : attrs.minutes;
    const isHours = view === 'hours';
    const unit = Math.PI / (isHours ? 6 : 30);
    const radian = value * unit;
    const outerRadius = attrs.outerRadius || 105;
    const innerRadius = attrs.innerRadius || 70;

    // In 12-hour mode, always use outer radius
    // In 24-hour mode, use inner radius for hours 1-12, outer for 0 and 13-23
    let radius = outerRadius;
    if (!attrs.twelveHour && isHours && value > 0 && value < 13) {
      radius = innerRadius;
    }

    const x = Math.sin(radian) * radius;
    const y = -Math.cos(radian) * radius;

    setHand(x, y, attrs);
  };

  const handleClockClickStart = (e: Event, attrs: AnalogClockAttrs) => {
    e.preventDefault();
    if (!state.plate) return;

    const _dialRadius = attrs.dialRadius || 135;
    const clockPlateBR = state.plate.getBoundingClientRect();
    const offset = { x: clockPlateBR.left, y: clockPlateBR.top };

    state.x0 = offset.x + _dialRadius;
    state.y0 = offset.y + _dialRadius;
    state.moved = false;
    const clickPos = getPos(e);
    state.dx = clickPos.x - state.x0;
    state.dy = clickPos.y - state.y0;

    const startX = clickPos.x;
    const startY = clickPos.y;

    setHand(state.dx, state.dy, attrs, attrs.roundBy5);
    m.redraw();

    // Add document-level listeners to track dragging
    const moveHandler = (e: Event) => {
      e.preventDefault();
      const clickPos = getPos(e);
      const x = clickPos.x - state.x0;
      const y = clickPos.y - state.y0;

      // Only consider it "moved" if dragged more than 5 pixels
      const distance = Math.sqrt(Math.pow(clickPos.x - startX, 2) + Math.pow(clickPos.y - startY, 2));
      if (distance > 5) {
        state.moved = true;
      }

      setHand(x, y, attrs, attrs.roundBy5, true);
    };

    const endHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('touchmove', moveHandler);

      // After setting hour (either by click or drag), switch to minutes view
      if (attrs.currentView === 'hours' && attrs.onViewChange) {
        attrs.onViewChange('minutes');
      }

      state.moved = false;
      m.redraw();
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('mouseup', endHandler, { once: true });
    document.addEventListener('touchend', endHandler, { once: true });
  };

  const HourTicks: FactoryComponent<AnalogClockAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const dialRadius = attrs.dialRadius || 135;
        const outerRadius = attrs.outerRadius || 105;
        const innerRadius = attrs.innerRadius || 70;
        const tickRadius = attrs.tickRadius || 20;

        const ticks = [];

        if (attrs.twelveHour) {
          for (let i = 1; i < 13; i++) {
            const radian = (i / 6) * Math.PI;
            const radius = outerRadius;
            const left = dialRadius + Math.sin(radian) * radius - tickRadius;
            const top = dialRadius - Math.cos(radian) * radius - tickRadius;
            ticks.push(
              m(
                '.timepicker-tick',
                {
                  style: {
                    left: `${left}px`,
                    top: `${top}px`,
                  },
                },
                i === 0 ? '00' : i.toString()
              )
            );
          }
        } else {
          for (let i = 0; i < 24; i++) {
            const radian = (i / 6) * Math.PI;
            const inner = i > 0 && i < 13;
            const radius = inner ? innerRadius : outerRadius;
            const left = dialRadius + Math.sin(radian) * radius - tickRadius;
            const top = dialRadius - Math.cos(radian) * radius - tickRadius;
            ticks.push(
              m(
                '.timepicker-tick',
                {
                  style: {
                    left: `${left}px`,
                    top: `${top}px`,
                  },
                },
                i === 0 ? '00' : i.toString()
              )
            );
          }
        }

        return ticks;
      },
    };
  };

  const MinuteTicks: FactoryComponent<AnalogClockAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const dialRadius = attrs.dialRadius || 135;
        const outerRadius = attrs.outerRadius || 105;
        const tickRadius = attrs.tickRadius || 20;

        const ticks = [];

        for (let i = 0; i < 60; i += 5) {
          const radian = (i / 30) * Math.PI;
          const left = dialRadius + Math.sin(radian) * outerRadius - tickRadius;
          const top = dialRadius - Math.cos(radian) * outerRadius - tickRadius;
          ticks.push(
            m(
              '.timepicker-tick',
              {
                style: {
                  left: `${left}px`,
                  top: `${top}px`,
                },
              },
              addLeadingZero(i)
            )
          );
        }

        return ticks;
      },
    };
  };

  return {
    oncreate: ({ attrs }) => {
      resetClock(attrs);
    },

    view: ({ attrs }) => {
      // Handle view transitions
      const isHours = attrs.currentView === 'hours';
      const dialRadius = attrs.dialRadius || 135;
      const tickRadius = attrs.tickRadius || 20;
      const diameter = dialRadius * 2;

      // Calculate hand and background positions
      const view = attrs.currentView;
      const value = view === 'hours' ? attrs.hours : attrs.minutes;
      const unit = Math.PI / (view === 'hours' ? 6 : 30);
      const radian = value * unit;
      const outerRadius = attrs.outerRadius || 105;
      const innerRadius = attrs.innerRadius || 70;

      // In 12-hour mode, always use outer radius
      // In 24-hour mode, use inner radius for hours 1-12, outer for 0 and 13-23
      let radius = outerRadius;
      if (!attrs.twelveHour && view === 'hours' && value > 0 && value < 13) {
        radius = innerRadius;
      }

      const cx1 = Math.sin(radian) * (radius - tickRadius);
      const cy1 = -Math.cos(radian) * (radius - tickRadius);
      const cx2 = Math.sin(radian) * radius;
      const cy2 = -Math.cos(radian) * radius;

      return [
        m(
          '.timepicker-canvas',
          {
            oncreate: (vnode) => {
              state.canvas = vnode.dom as HTMLElement;
              state.plate = vnode.dom.parentElement as HTMLElement;
            },
            onmousedown: (e: MouseEvent) => handleClockClickStart(e, attrs),
            ontouchstart: (e: TouchEvent) => handleClockClickStart(e, attrs),
          },
          [
            m(
              'svg.timepicker-svg',
              {
                width: diameter,
                height: diameter,
                xmlns: 'http://www.w3.org/2000/svg',
              },
              [
                m(
                  'g',
                  {
                    transform: `translate(${dialRadius},${dialRadius})`,
                    oncreate: (vnode) => {
                      state.g = vnode.dom as SVGGElement;
                    },
                  },
                  [
                    m('line', {
                      x1: '0',
                      y1: '0',
                      x2: cx1,
                      y2: cy1,
                      oncreate: (vnode) => {
                        state.hand = vnode.dom as SVGLineElement;
                      },
                    }),
                    m('circle.timepicker-canvas-bg', {
                      cx: cx2,
                      cy: cy2,
                      r: tickRadius,
                      oncreate: (vnode) => {
                        state.bg = vnode.dom as SVGCircleElement;
                      },
                    }),
                    m('circle.timepicker-canvas-bearing', {
                      cx: '0',
                      cy: '0',
                      r: '4',
                      oncreate: (vnode) => {
                        state.bearing = vnode.dom as SVGCircleElement;
                      },
                    }),
                  ]
                ),
              ]
            ),
          ]
        ),
        m(
          `.timepicker-dial.timepicker-hours${isHours ? '' : '.timepicker-dial-out'}`,
          {
            oncreate: (vnode) => {
              state.hoursView = vnode.dom as HTMLElement;
            },
            style: {
              visibility: isHours ? 'visible' : 'hidden',
            },
          },
          m(HourTicks, attrs)
        ),
        m(
          `.timepicker-dial.timepicker-minutes${!isHours ? '' : '.timepicker-dial-out'}`,
          {
            oncreate: (vnode) => {
              state.minutesView = vnode.dom as HTMLElement;
            },
            style: {
              visibility: !isHours ? 'visible' : 'hidden',
            },
          },
          m(MinuteTicks, attrs)
        ),
      ];
    },

    onupdate: ({ attrs }) => {
      // Update clock hand when time or view changes
      resetClock(attrs);
    },
  };
};
