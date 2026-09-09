import m, { FactoryComponent } from 'mithril';
import {
  addLeadingZero,
  generateHourOptions,
  generateMinuteOptions,
  isTimeDisabled,
  scrollToValue,
  snapToNearestItem,
} from './time-utils';
import { uniqueId } from './utils';

/**
 * Attributes for the DigitalClock component
 */
export interface DigitalClockAttrs {
  /** Current hours value (1-12 for 12-hour, 0-23 for 24-hour) */
  hours: number;

  /** Current minutes value (0-59) */
  minutes: number;

  /** Current AM/PM value (only relevant in 12-hour mode) */
  amOrPm: 'AM' | 'PM';

  /** Whether to use 12-hour format (true) or 24-hour format (false) */
  twelveHour: boolean;

  /** Step between minute options (default: 5) */
  minuteStep?: number;

  /** Step between hour options (default: 1) */
  hourStep?: number;

  /** Minimum allowed time in format "HH:MM" or "HH:MM AM/PM" */
  minTime?: string;

  /** Maximum allowed time in format "HH:MM" or "HH:MM AM/PM" */
  maxTime?: string;

  /** Callback when time changes */
  onTimeChange: (hours: number, minutes: number, amOrPm: 'AM' | 'PM') => void;

  /** Optional reference to external hours display element for updates */
  spanHours?: HTMLElement;

  /** Optional reference to external minutes display element for updates */
  spanMinutes?: HTMLElement;

  /** Optional reference to external AM/PM display element for updates */
  spanAmPm?: HTMLElement;
}

/**
 * Internal state for the DigitalClock component
 */
interface DigitalClockState {
  id: string;
  hourScrollContainer?: HTMLElement;
  minuteScrollContainer?: HTMLElement;
  amPmScrollContainer?: HTMLElement;
  hourScrollTimeout?: number;
  minuteScrollTimeout?: number;
  amPmScrollTimeout?: number;
}

/**
 * DigitalClock component - A scrollable digital time picker
 *
 * @example
 * ```typescript
 * m(DigitalClock, {
 *   hours: 10,
 *   minutes: 30,
 *   amOrPm: 'AM',
 *   twelveHour: true,
 *   minuteStep: 5,
 *   onTimeChange: (hours, minutes, amOrPm) => {
 *     console.log(`Time changed to ${hours}:${minutes} ${amOrPm}`);
 *   }
 * })
 * ```
 */
export const DigitalClock: FactoryComponent<DigitalClockAttrs> = () => {
  const ITEM_HEIGHT = 48;
  const state: DigitalClockState = {
    id: uniqueId(),
  };

  return {
    view: ({ attrs }) => {
      const {
        hours,
        minutes,
        amOrPm,
        twelveHour,
        minuteStep = 5,
        hourStep = 1,
        minTime,
        maxTime,
        onTimeChange,
        spanHours,
        spanMinutes,
        spanAmPm,
      } = attrs;

      const hourOptions = generateHourOptions(twelveHour, hourStep);
      const minuteOptions = generateMinuteOptions(minuteStep);
      const moveToEnabledOption = (
        values: number[],
        currentValue: number,
        direction: -1 | 1,
        select: (value: number) => void
      ) => {
        const orderedValues = [...values].sort((left, right) => left - right);
        const currentIndex = orderedValues.indexOf(currentValue);
        let firstIndex = currentIndex + direction;

        if (currentIndex < 0) {
          if (direction > 0) {
            firstIndex = orderedValues.findIndex((value) => value > currentValue);
          } else {
            firstIndex = -1;
            for (let index = orderedValues.length - 1; index >= 0; index--) {
              if (orderedValues[index] < currentValue) {
                firstIndex = index;
                break;
              }
            }
          }
        }

        if (firstIndex < 0) firstIndex = direction > 0 ? 0 : orderedValues.length - 1;

        for (let offset = 0; offset < orderedValues.length; offset++) {
          const index =
            (firstIndex + direction * offset + orderedValues.length) % orderedValues.length;
          const value = orderedValues[index];
          const candidateHours = values === hourOptions ? value : hours;
          const candidateMinutes = values === minuteOptions ? value : minutes;
          if (!isTimeDisabled(candidateHours, candidateMinutes, amOrPm, minTime, maxTime, twelveHour)) {
            select(value);
            return;
          }
        }
      };

      return m('.timepicker-digital-clock', [
        // Hours column
        m(
          '.digital-clock-column',
          {
            tabindex: 0,
            role: 'listbox',
            'aria-label': 'Hours',
            'aria-activedescendant': hourOptions.includes(hours) ? `${state.id}-hour-${hours}` : undefined,
            'data-time-segment': 'hours',
            oncreate: (vnode) => {
              state.hourScrollContainer = vnode.dom as HTMLElement;
              const currentIndex = hourOptions.indexOf(hours);
              if (currentIndex >= 0) {
                scrollToValue(state.hourScrollContainer, currentIndex + 2, ITEM_HEIGHT, false);
              }
            },
            onwheel: (e: WheelEvent) => {
              e.preventDefault();
              if (!state.hourScrollContainer) return;

              const delta = Math.sign(e.deltaY);
              if (delta === 0) return;
              moveToEnabledOption(hourOptions, hours, delta < 0 ? -1 : 1, (hour) => {
                onTimeChange(hour, minutes, amOrPm);
                if (spanHours) {
                  spanHours.innerHTML = addLeadingZero(hour);
                }
                scrollToValue(
                  state.hourScrollContainer!,
                  hourOptions.indexOf(hour) + 2,
                  ITEM_HEIGHT,
                  true
                );
                m.redraw();
              });
            },
            onkeydown: (e: KeyboardEvent) => {
              if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
              e.preventDefault();
              moveToEnabledOption(hourOptions, hours, e.key === 'ArrowUp' ? -1 : 1, (hour) => {
                onTimeChange(hour, minutes, amOrPm);
                if (spanHours) {
                  spanHours.innerHTML = addLeadingZero(hour);
                }
                if (state.hourScrollContainer) {
                  scrollToValue(state.hourScrollContainer, hourOptions.indexOf(hour) + 2, ITEM_HEIGHT, true);
                }
                m.redraw();
              });
            },
            onscroll: () => {
              if (state.hourScrollTimeout) {
                clearTimeout(state.hourScrollTimeout);
              }
              state.hourScrollTimeout = window.setTimeout(() => {
                if (!state.hourScrollContainer) return;
                snapToNearestItem(state.hourScrollContainer, ITEM_HEIGHT, (index) => {
                  const actualIndex = index - 2; // Account for padding
                  if (actualIndex >= 0 && actualIndex < hourOptions.length) {
                    const newHour = hourOptions[actualIndex];
                    if (!isTimeDisabled(newHour, minutes, amOrPm, minTime, maxTime, twelveHour)) {
                      onTimeChange(newHour, minutes, amOrPm);
                      if (spanHours) {
                        spanHours.innerHTML = addLeadingZero(newHour);
                      }
                      m.redraw();
                    }
                  }
                });
              }, 150);
            },
          },
          [
            // Padding items for centering
            m('.digital-clock-item.padding'),
            m('.digital-clock-item.padding'),

            // Hour items
            ...hourOptions.map((hour) => {
              const disabled = isTimeDisabled(hour, minutes, amOrPm, minTime, maxTime, twelveHour);
              return m(
                '.digital-clock-item',
                {
                  id: `${state.id}-hour-${hour}`,
                  class: `${hour === hours ? 'selected' : ''} ${disabled ? 'disabled' : ''}`,
                  role: 'option',
                  'aria-selected': hour === hours ? 'true' : 'false',
                  'aria-disabled': disabled ? 'true' : 'false',
                  onclick: () => {
                    if (disabled) return;
                    onTimeChange(hour, minutes, amOrPm);
                    if (spanHours) {
                      spanHours.innerHTML = addLeadingZero(hour);
                    }
                    if (state.hourScrollContainer) {
                      const index = hourOptions.indexOf(hour);
                      scrollToValue(state.hourScrollContainer, index + 2, ITEM_HEIGHT, true);
                    }
                    m.redraw();
                  },
                },
                addLeadingZero(hour)
              );
            }),

            // Padding items for centering
            m('.digital-clock-item.padding'),
            m('.digital-clock-item.padding'),
          ]
        ),

        // Separator
        m('.digital-clock-separator', ':'),

        // Minutes column
        m(
          '.digital-clock-column',
          {
            tabindex: 0,
            role: 'listbox',
            'aria-label': 'Minutes',
            'aria-activedescendant': minuteOptions.includes(minutes)
              ? `${state.id}-minute-${minutes}`
              : undefined,
            'data-time-segment': 'minutes',
            oncreate: (vnode) => {
              state.minuteScrollContainer = vnode.dom as HTMLElement;
              const currentIndex = minuteOptions.indexOf(minutes);
              if (currentIndex >= 0) {
                scrollToValue(state.minuteScrollContainer, currentIndex + 2, ITEM_HEIGHT, false);
              }
            },
            onwheel: (e: WheelEvent) => {
              e.preventDefault();
              if (!state.minuteScrollContainer) return;

              const delta = Math.sign(e.deltaY);
              if (delta === 0) return;
              moveToEnabledOption(minuteOptions, minutes, delta < 0 ? -1 : 1, (minute) => {
                onTimeChange(hours, minute, amOrPm);
                if (spanMinutes) {
                  spanMinutes.innerHTML = addLeadingZero(minute);
                }
                scrollToValue(
                  state.minuteScrollContainer!,
                  minuteOptions.indexOf(minute) + 2,
                  ITEM_HEIGHT,
                  true
                );
                m.redraw();
              });
            },
            onkeydown: (e: KeyboardEvent) => {
              if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
              e.preventDefault();
              moveToEnabledOption(minuteOptions, minutes, e.key === 'ArrowUp' ? -1 : 1, (minute) => {
                onTimeChange(hours, minute, amOrPm);
                if (spanMinutes) {
                  spanMinutes.innerHTML = addLeadingZero(minute);
                }
                if (state.minuteScrollContainer) {
                  scrollToValue(state.minuteScrollContainer, minuteOptions.indexOf(minute) + 2, ITEM_HEIGHT, true);
                }
                m.redraw();
              });
            },
            onscroll: () => {
              if (state.minuteScrollTimeout) {
                clearTimeout(state.minuteScrollTimeout);
              }
              state.minuteScrollTimeout = window.setTimeout(() => {
                if (!state.minuteScrollContainer) return;
                snapToNearestItem(state.minuteScrollContainer, ITEM_HEIGHT, (index) => {
                  const actualIndex = index - 2; // Account for padding
                  if (actualIndex >= 0 && actualIndex < minuteOptions.length) {
                    const newMinute = minuteOptions[actualIndex];
                    if (!isTimeDisabled(hours, newMinute, amOrPm, minTime, maxTime, twelveHour)) {
                      onTimeChange(hours, newMinute, amOrPm);
                      if (spanMinutes) {
                        spanMinutes.innerHTML = addLeadingZero(newMinute);
                      }
                      m.redraw();
                    }
                  }
                });
              }, 150);
            },
          },
          [
            // Padding items for centering
            m('.digital-clock-item.padding'),
            m('.digital-clock-item.padding'),

            // Minute items
            ...minuteOptions.map((minute) => {
              const disabled = isTimeDisabled(hours, minute, amOrPm, minTime, maxTime, twelveHour);
              return m(
                '.digital-clock-item',
                {
                  id: `${state.id}-minute-${minute}`,
                  class: `${minute === minutes ? 'selected' : ''} ${disabled ? 'disabled' : ''}`,
                  role: 'option',
                  'aria-selected': minute === minutes ? 'true' : 'false',
                  'aria-disabled': disabled ? 'true' : 'false',
                  onclick: () => {
                    if (disabled) return;
                    onTimeChange(hours, minute, amOrPm);
                    if (spanMinutes) {
                      spanMinutes.innerHTML = addLeadingZero(minute);
                    }
                    if (state.minuteScrollContainer) {
                      const index = minuteOptions.indexOf(minute);
                      scrollToValue(state.minuteScrollContainer, index + 2, ITEM_HEIGHT, true);
                    }
                    m.redraw();
                  },
                },
                addLeadingZero(minute)
              );
            }),

            // Padding items for centering
            m('.digital-clock-item.padding'),
            m('.digital-clock-item.padding'),
          ]
        ),

        // AM/PM column (if twelveHour)
        twelveHour &&
          m(
            '.digital-clock-column.ampm-column',
            {
              tabindex: 0,
              role: 'listbox',
              'aria-label': 'AM or PM',
              'aria-activedescendant': `${state.id}-ampm-${amOrPm.toLowerCase()}`,
              'data-time-segment': 'ampm',
              oncreate: (vnode) => {
                state.amPmScrollContainer = vnode.dom as HTMLElement;
                const amPmOptions = ['AM', 'PM'];
                const currentIndex = amPmOptions.indexOf(amOrPm);
                if (currentIndex >= 0) {
                  scrollToValue(state.amPmScrollContainer, currentIndex + 2, ITEM_HEIGHT, false);
                }
              },
              onwheel: (e: WheelEvent) => {
                e.preventDefault();
                const delta = Math.sign(e.deltaY);
                if (delta === 0) return;
                const newAmPm = delta > 0 ? 'PM' : 'AM';
                if (newAmPm !== amOrPm && !isTimeDisabled(hours, minutes, newAmPm, minTime, maxTime, twelveHour)) {
                  onTimeChange(hours, minutes, newAmPm);
                  if (spanAmPm) {
                    spanAmPm.innerHTML = newAmPm;
                  }
                  const amPmOptions = ['AM', 'PM'];
                  const newIndex = amPmOptions.indexOf(newAmPm);
                  if (state.amPmScrollContainer) {
                    scrollToValue(state.amPmScrollContainer, newIndex + 2, ITEM_HEIGHT, true);
                  }
                  m.redraw();
                }
              },
              onkeydown: (e: KeyboardEvent) => {
                if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
                e.preventDefault();
                const newAmPm = e.key === 'ArrowUp' ? 'AM' : 'PM';
                if (!isTimeDisabled(hours, minutes, newAmPm, minTime, maxTime, twelveHour)) {
                  onTimeChange(hours, minutes, newAmPm);
                  if (spanAmPm) {
                    spanAmPm.innerHTML = newAmPm;
                  }
                  if (state.amPmScrollContainer) {
                    scrollToValue(state.amPmScrollContainer, newAmPm === 'AM' ? 2 : 3, ITEM_HEIGHT, true);
                  }
                  m.redraw();
                }
              },
              onscroll: () => {
                if (state.amPmScrollTimeout) {
                  clearTimeout(state.amPmScrollTimeout);
                }
                state.amPmScrollTimeout = window.setTimeout(() => {
                  if (!state.amPmScrollContainer) return;
                  snapToNearestItem(state.amPmScrollContainer, ITEM_HEIGHT, (index) => {
                    const actualIndex = index - 2;
                    const amPmOptions = ['AM', 'PM'];
                    if (actualIndex >= 0 && actualIndex < amPmOptions.length) {
                      const newAmPm = amPmOptions[actualIndex] as 'AM' | 'PM';
                      if (!isTimeDisabled(hours, minutes, newAmPm, minTime, maxTime, twelveHour)) {
                        onTimeChange(hours, minutes, newAmPm);
                        if (spanAmPm) {
                          spanAmPm.innerHTML = newAmPm;
                        }
                        m.redraw();
                      }
                    }
                  });
                }, 150);
              },
            },
            [
              // Padding items
              m('.digital-clock-item.padding'),
              m('.digital-clock-item.padding'),

              // AM/PM items
              ['AM', 'PM'].map((ampm) => {
                const disabled = isTimeDisabled(hours, minutes, ampm as 'AM' | 'PM', minTime, maxTime, twelveHour);
                return m(
                  '.digital-clock-item',
                  {
                    id: `${state.id}-ampm-${ampm.toLowerCase()}`,
                    class: `${ampm === amOrPm ? 'selected' : ''} ${disabled ? 'disabled' : ''}`,
                    role: 'option',
                    'aria-selected': ampm === amOrPm ? 'true' : 'false',
                    'aria-disabled': disabled ? 'true' : 'false',
                    onclick: () => {
                      if (disabled) return;
                      onTimeChange(hours, minutes, ampm as 'AM' | 'PM');
                      if (spanAmPm) {
                        spanAmPm.innerHTML = ampm;
                      }
                      if (state.amPmScrollContainer) {
                        const amPmOptions = ['AM', 'PM'];
                        const index = amPmOptions.indexOf(ampm);
                        scrollToValue(state.amPmScrollContainer, index + 2, ITEM_HEIGHT, true);
                      }
                      m.redraw();
                    },
                  },
                  ampm
                );
              }),

              // Padding items
              m('.digital-clock-item.padding'),
              m('.digital-clock-item.padding'),
            ]
          ),
      ]);
    },
  };
};
