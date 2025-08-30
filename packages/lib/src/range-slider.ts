import m from 'mithril';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';

// Tooltip component for range sliders
const RangeTooltip = {
  view: ({ attrs: { show, position, value } }: { attrs: { value: number; position: string; show: boolean } }) => {
    return show ? m(`.value-tooltip.${position}`, value.toFixed(0)) : null;
  },
};

const DoubleRangeTooltip = {
  view: ({ attrs: { show, orientation, value } }: { attrs: { value: number; orientation: string; show: boolean } }) => {
    return show ? m(`.value.${orientation}`, value.toFixed(0)) : null;
  },
};

// Utility functions
const getPercentage = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

const positionToValue = (
  e: MouseEvent,
  rect: DOMRect,
  min: number,
  max: number,
  step: number,
  vertical: boolean
): number => {
  let percentage;

  if (vertical) {
    percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
  } else {
    percentage = ((e.clientX - rect.left) / rect.width) * 100;
  }

  percentage = Math.max(0, Math.min(100, percentage));
  const value = min + (percentage / 100) * (max - min);
  return Math.round(value / step) * step;
};

const handleKeyboardNavigation = (
  key: string,
  currentValue: number,
  min: number,
  max: number,
  step: number
): number | null => {
  const largeStep = step * 10;

  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      return Math.max(min, currentValue - step);
    case 'ArrowRight':
    case 'ArrowUp':
      return Math.min(max, currentValue + step);
    case 'PageDown':
      return Math.max(min, currentValue - largeStep);
    case 'PageUp':
      return Math.min(max, currentValue + largeStep);
    case 'Home':
      return min;
    case 'End':
      return max;
    default:
      return null;
  }
};

const initRangeState = (state: any, attrs: any) => {
  const { min = 0, max = 100, value, minValue, maxValue } = attrs;

  // Initialize single range value
  if (value !== undefined) {
    const currentValue = value;
    if (state.singleValue === undefined) {
      state.singleValue = currentValue;
    }
    if (state.lastValue !== value && !state.hasUserInteracted) {
      state.singleValue = value;
      state.lastValue = value;
    }
  } else if (state.singleValue === undefined) {
    state.singleValue = min;
  }

  // Initialize range values
  const currentMinValue = minValue !== undefined ? minValue : min;
  const currentMaxValue = maxValue !== undefined ? maxValue : max;

  if (state.rangeMinValue === undefined || state.rangeMaxValue === undefined) {
    state.rangeMinValue = currentMinValue;
    state.rangeMaxValue = currentMaxValue;
  }

  if (
    !state.hasUserInteracted &&
    ((minValue !== undefined && state.lastMinValue !== minValue) ||
      (maxValue !== undefined && state.lastMaxValue !== maxValue))
  ) {
    state.rangeMinValue = currentMinValue;
    state.rangeMaxValue = currentMaxValue;
    state.lastMinValue = minValue;
    state.lastMaxValue = maxValue;
  }

  // Initialize active thumb if not set
  if (state.activeThumb === null) {
    state.activeThumb = 'min';
  }

  // Initialize dragging state
  if (state.isDragging === undefined) {
    state.isDragging = false;
  }
};

const updateRangeValues = <T>(
  minValue: number,
  maxValue: number,
  attrs: InputAttrs<T>,
  state: any,
  immediate: boolean
) => {
  // Ensure min doesn't exceed max and vice versa
  if (minValue > maxValue) minValue = maxValue;
  if (maxValue < minValue) maxValue = minValue;

  state.rangeMinValue = minValue;
  state.rangeMaxValue = maxValue;
  state.hasUserInteracted = true;

  // Call oninput for immediate feedback or onchange for final changes
  if (immediate && attrs.oninput) {
    attrs.oninput(minValue as T, maxValue as T);
  } else if (!immediate && attrs.onchange) {
    attrs.onchange(minValue as T, maxValue as T);
  }
};

// Single Range Slider Component
export const SingleRangeSlider = {
  oninit({ state }: { state: any }) {
    if (!state.componentInitialized) {
      state.componentInitialized = true;
    }
  },

  onremove({ state }: { state: any }) {
    if (state.cleanupMouseEvents) {
      state.cleanupMouseEvents();
      state.cleanupMouseEvents = null;
    }
  },

  view({
    attrs,
    state,
  }: {
    attrs: InputAttrs<any> & {
      cn?: string;
      style?: any;
      iconName?: string;
      id: string;
      label?: string;
      isMandatory?: boolean;
      helperText?: string;
    };
    state: any;
  }) {
    const {
      cn,
      style,
      iconName,
      id,
      label,
      isMandatory,
      helperText,
      min = 0,
      max = 100,
      step = 1,
      vertical = false,
      showValue = false,
      valueDisplay,
      height = '200px',
      disabled = false,
      tooltipPos = 'top',
      oninput,
      onchange,
    } = attrs;

    // Apply fallback logic for valueDisplay if not explicitly set
    const finalValueDisplay = valueDisplay || (showValue ? 'always' : 'none');

    // Initialize state
    initRangeState(state, attrs);

    const percentage = getPercentage(state.singleValue as number, min, max);
    const containerStyle = vertical ? { height } : {};
    const orientation = vertical ? 'vertical' : 'horizontal';

    const progressStyle = vertical ? { height: `${percentage}%` } : { width: `${percentage}%` };

    const thumbStyle = vertical ? { bottom: `${percentage}%` } : { left: `${percentage}%` };

    // Determine tooltip position for vertical sliders
    const tooltipPosition = vertical
      ? tooltipPos === 'top' || tooltipPos === 'bottom'
        ? 'right'
        : tooltipPos
      : tooltipPos;

    const updateSingleValue = (newValue: number, immediate = false) => {
      state.singleValue = newValue;
      state.hasUserInteracted = true;
      if (immediate && oninput) {
        oninput(newValue);
      } else if (!immediate && onchange) {
        onchange(newValue);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      state.isDragging = true;

      if (finalValueDisplay === 'auto') {
        m.redraw();
      }

      const thumbElement = e.currentTarget as HTMLElement;
      const container = thumbElement.parentElement;
      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!state.isDragging || !container) return;
        const rect = container.getBoundingClientRect();
        const value = positionToValue(e, rect, min, max, step, vertical);
        updateSingleValue(value, true);
        m.redraw();
      };

      const handleMouseUp = () => {
        state.isDragging = false;
        if (state.cleanupMouseEvents) {
          state.cleanupMouseEvents();
          state.cleanupMouseEvents = null;
        }
        updateSingleValue(state.singleValue as number, false);
        if (finalValueDisplay === 'auto') {
          m.redraw();
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      state.cleanupMouseEvents = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    };

    const fieldClass = vertical ? 'range-field vertical' : 'range-field';

    return m('.input-field', { className: cn, style }, [
      iconName ? m('i.material-icons.prefix', iconName) : undefined,
      m('input[type=range]', {
        id,
        value: state.singleValue,
        min,
        max,
        step,
        style: { display: 'none' },
        disabled,
        tabindex: -1,
      }),
      m('div', { class: fieldClass, style: containerStyle }, [
        m(
          `.single-range-slider.${orientation}`,
          {
            tabindex: disabled ? -1 : 0,
            role: 'slider',
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': state.singleValue,
            'aria-label': label || 'Range slider',
            onclick: (e: MouseEvent) => {
              if (disabled) return;
              const container = e.currentTarget as HTMLElement;
              const rect = container.getBoundingClientRect();
              const value = positionToValue(e, rect, min, max, step, vertical);
              updateSingleValue(value, false);
              (e.currentTarget as HTMLElement).focus();
            },
            onkeydown: (e: KeyboardEvent) => {
              if (disabled) return;
              const currentValue = state.singleValue as number;
              const newValue = handleKeyboardNavigation(e.key, currentValue, min, max, step);
              if (newValue !== null) {
                e.preventDefault();
                updateSingleValue(newValue, false);
              }
            },
          },
          [
            m(`.track.${orientation}`),
            m(`.range-progress.${orientation}`, { style: progressStyle }),
            m(
              `.thumb.${orientation}`,
              { style: thumbStyle, onmousedown: handleMouseDown },
              m(RangeTooltip, {
                value: state.singleValue as number,
                position: tooltipPosition,
                show: finalValueDisplay === 'always' || (finalValueDisplay === 'auto' && state.isDragging),
              })
            ),
          ]
        ),
      ]),
      label ? m(Label, { label, id, isMandatory, isActive: true }) : null,
      helperText ? m(HelperText, { helperText }) : null,
    ]);
  },
};

// Double Range Slider Component
export const DoubleRangeSlider = {
  oninit({ state }: { state: any }) {
    if (!state.componentInitialized) {
      state.componentInitialized = true;
    }
  },

  onremove({ state }: { state: any }) {
    if (state.cleanupMouseEvents) {
      state.cleanupMouseEvents();
      state.cleanupMouseEvents = null;
    }
  },

  view({
    attrs,
    state,
  }: {
    attrs: InputAttrs<any> & {
      cn?: string;
      style?: any;
      iconName?: string;
      id: string;
      label?: string;
      isMandatory?: boolean;
      helperText?: string;
    };
    state: any;
  }) {
    const {
      cn,
      style,
      iconName,
      id,
      label,
      isMandatory,
      helperText,
      min = 0,
      max = 100,
      step = 1,
      vertical = false,
      showValue = false,
      valueDisplay,
      height = '200px',
      disabled = false,
    } = attrs;

    const finalValueDisplay = valueDisplay || (showValue ? 'always' : 'none');

    initRangeState(state, attrs);

    const minPercentage = getPercentage(state.rangeMinValue, min, max);
    const maxPercentage = getPercentage(state.rangeMaxValue, min, max);
    const containerStyle = vertical ? { height } : {};
    const orientation = vertical ? 'vertical' : 'horizontal';

    const rangeStyle = vertical
      ? {
          bottom: `${minPercentage}%`,
          height: `${maxPercentage - minPercentage}%`,
        }
      : {
          left: `${minPercentage}%`,
          width: `${maxPercentage - minPercentage}%`,
        };

    const createThumbStyle = (percentage: number, isActive: boolean) =>
      vertical
        ? {
            bottom: `${percentage}%`,
            zIndex: isActive ? 10 : 5,
          }
        : {
            left: `${percentage}%`,
            zIndex: isActive ? 10 : 5,
          };

    const handleMouseDown = (thumb: 'min' | 'max') => (e: MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      state.isDragging = true;
      state.activeThumb = thumb;

      if (finalValueDisplay === 'auto') {
        m.redraw();
      }

      const thumbElement = e.currentTarget as HTMLElement;
      const container = thumbElement.parentElement;
      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!state.isDragging || !container) return;
        const rect = container.getBoundingClientRect();
        const steppedValue = positionToValue(e, rect, min, max, step, vertical);

        if (thumb === 'min') {
          updateRangeValues(Math.min(steppedValue, state.rangeMaxValue), state.rangeMaxValue, attrs, state, true);
        } else {
          updateRangeValues(state.rangeMinValue, Math.max(steppedValue, state.rangeMinValue), attrs, state, true);
        }
        m.redraw();
      };

      const handleMouseUp = () => {
        state.isDragging = false;
        state.activeThumb = null;
        if (state.cleanupMouseEvents) {
          state.cleanupMouseEvents();
          state.cleanupMouseEvents = null;
        }
        updateRangeValues(state.rangeMinValue, state.rangeMaxValue, attrs, state, false);
        if (finalValueDisplay === 'auto') {
          m.redraw();
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      state.cleanupMouseEvents = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    };

    const fieldClass = vertical ? 'range-field vertical' : 'range-field';

    return m('.input-field', { className: cn, style }, [
      iconName ? m('i.material-icons.prefix', iconName) : undefined,
      m('input[type=range]', {
        id,
        value: state.rangeMinValue,
        min,
        max,
        step,
        style: { display: 'none' },
        disabled,
        tabindex: -1,
      }),
      m('input[type=range]', {
        id: `${id}_max`,
        value: state.rangeMaxValue,
        min,
        max,
        step,
        style: { display: 'none' },
        disabled,
        tabindex: -1,
      }),
      m(`div`, { className: fieldClass }, [
        m(
          `.double-range-slider.${orientation}`,
          {
            style: containerStyle,
            onclick: (e: MouseEvent) => {
              if (disabled) return;
              const container = e.currentTarget as HTMLElement;
              const rect = container.getBoundingClientRect();
              const steppedValue = positionToValue(e, rect, min, max, step, vertical);

              const distToMin = Math.abs(steppedValue - state.rangeMinValue);
              const distToMax = Math.abs(steppedValue - state.rangeMaxValue);

              if (distToMin <= distToMax) {
                updateRangeValues(
                  Math.min(steppedValue, state.rangeMaxValue),
                  state.rangeMaxValue,
                  attrs,
                  state,
                  false
                );
                state.activeThumb = 'min';
                const minThumb = container.querySelector('.thumb.min-thumb') as HTMLElement;
                if (minThumb) minThumb.focus();
              } else {
                updateRangeValues(
                  state.rangeMinValue,
                  Math.max(steppedValue, state.rangeMinValue),
                  attrs,
                  state,
                  false
                );
                state.activeThumb = 'max';
                const maxThumb = container.querySelector('.thumb.max-thumb') as HTMLElement;
                if (maxThumb) maxThumb.focus();
              }
            },
          },
          [
            m(`.track.${orientation}`),
            m(`.range.${orientation}`, { style: rangeStyle }),
            // Min thumb
            m(
              `.thumb.${orientation}.min-thumb${state.activeThumb === 'min' ? '.active' : ''}`,
              {
                style: createThumbStyle(minPercentage, state.activeThumb === 'min'),
                tabindex: disabled ? -1 : 0,
                role: 'slider',
                'aria-valuemin': min,
                'aria-valuemax': state.rangeMaxValue,
                'aria-valuenow': state.rangeMinValue,
                'aria-label': `Minimum value: ${state.rangeMinValue}`,
                'aria-orientation': vertical ? 'vertical' : 'horizontal',
                onmousedown: handleMouseDown('min'),
                onclick: (e: MouseEvent) => {
                  e.stopPropagation();
                  state.activeThumb = 'min';
                  (e.currentTarget as HTMLElement).focus();
                },
                onfocus: () => {
                  state.activeThumb = 'min';
                },
                onkeydown: (e: KeyboardEvent) => {
                  if (disabled) return;
                  const currentValue = state.rangeMinValue;
                  const newValue = handleKeyboardNavigation(e.key, currentValue, min, max, step);
                  if (newValue !== null) {
                    e.preventDefault();
                    const constrainedValue = Math.min(newValue, state.rangeMaxValue);
                    updateRangeValues(constrainedValue, state.rangeMaxValue, attrs, state, false);
                  }
                },
              },
              m(DoubleRangeTooltip, {
                value: state.rangeMinValue,
                orientation,
                show:
                  finalValueDisplay === 'always' ||
                  (finalValueDisplay === 'auto' && state.isDragging && state.activeThumb === 'min'),
              })
            ),
            // Max thumb
            m(
              `.thumb.${orientation}.max-thumb${state.activeThumb === 'max' ? '.active' : ''}`,
              {
                style: createThumbStyle(maxPercentage, state.activeThumb === 'max'),
                tabindex: disabled ? -1 : 0,
                role: 'slider',
                'aria-valuemin': state.rangeMinValue,
                'aria-valuemax': max,
                'aria-valuenow': state.rangeMaxValue,
                'aria-label': `Maximum value: ${state.rangeMaxValue}`,
                'aria-orientation': vertical ? 'vertical' : 'horizontal',
                onmousedown: handleMouseDown('max'),
                onclick: (e: MouseEvent) => {
                  e.stopPropagation();
                  state.activeThumb = 'max';
                  (e.currentTarget as HTMLElement).focus();
                },
                onfocus: () => {
                  state.activeThumb = 'max';
                },
                onkeydown: (e: KeyboardEvent) => {
                  if (disabled) return;
                  const currentValue = state.rangeMaxValue;
                  const newValue = handleKeyboardNavigation(e.key, currentValue, min, max, step);
                  if (newValue !== null) {
                    e.preventDefault();
                    const constrainedValue = Math.max(newValue, state.rangeMinValue);
                    updateRangeValues(state.rangeMinValue, constrainedValue, attrs, state, false);
                  }
                },
              },
              m(DoubleRangeTooltip, {
                value: state.rangeMaxValue,
                orientation,
                show:
                  finalValueDisplay === 'always' ||
                  (finalValueDisplay === 'auto' && state.isDragging && state.activeThumb === 'max'),
              })
            ),
          ]
        ),
      ]),
      label ? m(Label, { label, id, isMandatory, isActive: true }) : null,
      helperText ? m(HelperText, { helperText }) : null,
    ]);
  },
};
