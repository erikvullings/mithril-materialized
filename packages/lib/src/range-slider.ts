import m from 'mithril';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';

// Utility functions
const getPercentage = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
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

// Single Range Slider with Tooltip
export const renderSingleRangeWithTooltip = <T>(
  attrs: InputAttrs<T>,
  state: any,
  cn: string | undefined,
  style: any,
  iconName: string | undefined,
  id: string,
  label: string | undefined,
  isMandatory: boolean | undefined,
  helperText: string | undefined
) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    initialValue,
    vertical = false,
    showValue = false,
    height = '200px',
    disabled = false,
    tooltipPos = 'top',
    oninput,
    onchange,
  } = attrs;

  // Initialize single range value
  const currentValue = initialValue !== undefined ? initialValue : state.singleValue || min;
  if (state.singleValue === undefined) {
    state.singleValue = currentValue as number;
  }
  // Only update from initialValue if we haven't interacted yet and initialValue is different
  if (initialValue !== undefined && state.lastInitialValue !== initialValue && !state.hasUserInteracted) {
    state.singleValue = initialValue as number;
    state.lastInitialValue = initialValue;
  }

  const percentage = getPercentage(state.singleValue as number, min, max);

  // Only keep dynamic styles as inline, use CSS classes for static styles
  const containerStyle = vertical ? { height } : {};

  const progressStyle = vertical
    ? {
        height: `${percentage}%`,
      }
    : {
        width: `${percentage}%`,
      };

  const thumbStyle = vertical
    ? {
        bottom: `${percentage}%`,
      }
    : {
        left: `${percentage}%`,
        marginLeft: '-10px', // Half of thumb size (20px)
      };

  const updateSingleValue = (newValue: number, immediate = false) => {
    state.singleValue = newValue;
    state.hasUserInteracted = true;
    if (immediate && oninput) {
      oninput(newValue as T);
    } else if (!immediate && onchange) {
      onchange(newValue as T);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    state.isDragging = true;

    // Get container reference from the current target's parent
    const thumbElement = e.currentTarget as HTMLElement;
    const container = thumbElement.parentElement;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!state.isDragging || !container) return;

      const rect = container.getBoundingClientRect();
      let percentage;

      if (vertical) {
        percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
      } else {
        percentage = ((e.clientX - rect.left) / rect.width) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      const value = min + (percentage / 100) * (max - min);
      const steppedValue = Math.round(value / step) * step;

      updateSingleValue(steppedValue, true);

      // Redraw to update the UI during drag
      m.redraw();
    };

    const handleMouseUp = () => {
      state.isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Fire onchange when dragging ends
      updateSingleValue(state.singleValue as number, false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const fieldClass = vertical ? 'range-field vertical' : 'range-field';
  const orientation = vertical ? 'vertical' : 'horizontal';

  // Determine tooltip position for vertical sliders
  const tooltipPosition = vertical
    ? tooltipPos === 'top' || tooltipPos === 'bottom'
      ? 'right'
      : tooltipPos
    : tooltipPos;

  return m('.input-field', { className: cn, style }, [
    iconName ? m('i.material-icons.prefix', iconName) : undefined,
    // Hidden input for label association and accessibility
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
            let percentage;

            if (vertical) {
              percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
            } else {
              percentage = ((e.clientX - rect.left) / rect.width) * 100;
            }

            percentage = Math.max(0, Math.min(100, percentage));
            const value = min + (percentage / 100) * (max - min);
            const steppedValue = Math.round(value / step) * step;

            updateSingleValue(steppedValue, false);
            (e.currentTarget as HTMLElement).focus();
          },
          onkeydown: (e: KeyboardEvent) => {
            if (disabled) return;
            let newValue = state.singleValue as number;
            switch (e.key) {
              case 'ArrowLeft':
              case 'ArrowDown':
                e.preventDefault();
                newValue = Math.max(min, newValue - step);
                updateSingleValue(newValue, false);
                // m.redraw();
                break;
              case 'ArrowRight':
              case 'ArrowUp':
                e.preventDefault();
                newValue = Math.min(max, newValue + step);
                updateSingleValue(newValue, false);
                // m.redraw();
                break;
              case 'Home':
                e.preventDefault();
                updateSingleValue(min, false);
                // m.redraw();
                break;
              case 'End':
                e.preventDefault();
                updateSingleValue(max, false);
                // m.redraw();
                break;
            }
          },
        },
        [
          // Track
          m(`.track.${orientation}`),
          // Progress
          m(`.range-progress.${orientation}`, { style: progressStyle }),
          // Thumb
          m(
            `.thumb.${orientation}`,
            {
              style: thumbStyle,
              onmousedown: handleMouseDown,
            },
            showValue ? m(`.value-tooltip.${tooltipPosition}`, (state.singleValue as number).toFixed(0)) : null
          ),
        ]
      ),
    ]),
    label
      ? m(Label, {
          label,
          id,
          isMandatory,
          isActive: true, // Range sliders always have active labels
        })
      : null,
    helperText ? m(HelperText, { helperText }) : null,
  ]);
};

// Double Range Slider (Min/Max)
export const renderMinMaxRange = <T>(
  attrs: InputAttrs<T>,
  state: any,
  cn: string | undefined,
  style: any,
  iconName: string | undefined,
  id: string,
  label: string | undefined,
  isMandatory: boolean | undefined,
  helperText: string | undefined
) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    minValue,
    maxValue,
    vertical = false,
    showValue = false,
    height = '200px',
    disabled = false,
  } = attrs;

  // Initialize range values
  const currentMinValue = minValue !== undefined ? minValue : attrs.minValue || min;
  const currentMaxValue = maxValue !== undefined ? maxValue : attrs.maxValue || max;

  if (state.rangeMinValue === undefined || state.rangeMaxValue === undefined) {
    state.rangeMinValue = currentMinValue;
    state.rangeMaxValue = currentMaxValue;
  }
  // Only update from props if we haven't interacted yet and values are different
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

  const minPercentage = getPercentage(state.rangeMinValue, min, max);
  const maxPercentage = getPercentage(state.rangeMaxValue, min, max);

  // Only keep dynamic styles as inline, use CSS classes for static styles
  const containerStyle = vertical ? { height } : {};

  const rangeStyle = vertical
    ? {
        bottom: `${minPercentage}%`,
        height: `${maxPercentage - minPercentage}%`,
      }
    : {
        left: `${minPercentage}%`,
        width: `${maxPercentage - minPercentage}%`,
      };

  // Only keep dynamic positioning and z-index as inline styles
  const createThumbStyle = (percentage: number, isActive: boolean) =>
    vertical
      ? {
          bottom: `${percentage}%`,
          zIndex: isActive ? 10 : 5,
        }
      : {
          left: `${percentage}%`,
          marginLeft: '-10px', // Half of thumb size (20px)
          zIndex: isActive ? 10 : 5,
        };

  const handleMouseDown = (thumb: 'min' | 'max') => (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    state.isDragging = true;
    state.activeThumb = thumb;

    // Get container reference from the current target's parent
    const thumbElement = e.currentTarget as HTMLElement;
    const container = thumbElement.parentElement;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!state.isDragging || !container) return;

      const rect = container.getBoundingClientRect();
      let percentage;

      if (vertical) {
        percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
      } else {
        percentage = ((e.clientX - rect.left) / rect.width) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      const value = min + (percentage / 100) * (max - min);
      const steppedValue = Math.round(value / step) * step;

      if (thumb === 'min') {
        updateRangeValues(Math.min(steppedValue, state.rangeMaxValue), state.rangeMaxValue, attrs, state, true);
      } else {
        updateRangeValues(state.rangeMinValue, Math.max(steppedValue, state.rangeMinValue), attrs, state, true);
      }

      // Redraw to update the UI during drag
      m.redraw();
    };

    const handleMouseUp = () => {
      state.isDragging = false;
      state.activeThumb = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Fire onchange when dragging ends
      updateRangeValues(state.rangeMinValue, state.rangeMaxValue, attrs, state, false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const fieldClass = vertical ? 'range-field vertical' : 'range-field';
  const orientation = vertical ? 'vertical' : 'horizontal';

  return m('.input-field', { className: cn, style }, [
    iconName ? m('i.material-icons.prefix', iconName) : undefined,
    // Hidden inputs for label association and accessibility
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
          tabindex: disabled ? -1 : 0,
          role: 'slider',
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': state.rangeMinValue,
          'aria-valuetext': `${state.rangeMinValue} to ${state.rangeMaxValue}`,
          'aria-label': label || 'Range slider',
          onclick: (e: MouseEvent) => {
            if (disabled) return;
            const container = e.currentTarget as HTMLElement;
            const rect = container.getBoundingClientRect();
            let percentage;

            if (vertical) {
              percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
            } else {
              percentage = ((e.clientX - rect.left) / rect.width) * 100;
            }

            percentage = Math.max(0, Math.min(100, percentage));
            const value = min + (percentage / 100) * (max - min);
            const steppedValue = Math.round(value / step) * step;

            // Decide which thumb is closer
            const distToMin = Math.abs(steppedValue - state.rangeMinValue);
            const distToMax = Math.abs(steppedValue - state.rangeMaxValue);

            if (distToMin <= distToMax) {
              updateRangeValues(Math.min(steppedValue, state.rangeMaxValue), state.rangeMaxValue, attrs, state, false);
              state.activeThumb = 'min';
            } else {
              updateRangeValues(state.rangeMinValue, Math.max(steppedValue, state.rangeMinValue), attrs, state, false);
              state.activeThumb = 'max';
            }

            (e.currentTarget as HTMLElement).focus();
          },

          onkeydown: (e: KeyboardEvent) => {
            if (disabled) return;
            let newMinValue = state.rangeMinValue;
            let newMaxValue = state.rangeMaxValue;
            const activeThumb = state.activeThumb || 'min';

            switch (e.key) {
              case 'ArrowLeft':
              case 'ArrowDown':
                e.preventDefault();
                if (activeThumb === 'min') {
                  newMinValue = Math.max(min, newMinValue - step);
                  updateRangeValues(newMinValue, newMaxValue, attrs, state, false);
                } else {
                  newMaxValue = Math.max(newMinValue, newMaxValue - step);
                  updateRangeValues(newMinValue, newMaxValue, attrs, state, false);
                }
                // m.redraw();
                break;
              case 'ArrowRight':
              case 'ArrowUp':
                e.preventDefault();
                if (activeThumb === 'min') {
                  newMinValue = Math.min(newMaxValue, newMinValue + step);
                  updateRangeValues(newMinValue, newMaxValue, attrs, state, false);
                } else {
                  newMaxValue = Math.min(max, newMaxValue + step);
                  updateRangeValues(newMinValue, newMaxValue, attrs, state, false);
                }
                // m.redraw();
                break;
              case 'Tab':
                // Handle Tab navigation properly
                if (activeThumb === 'min') {
                  if (e.shiftKey) {
                    // Shift+Tab from min thumb: go to previous element (let browser handle)
                    return; // Don't prevent default
                  } else {
                    // Tab from min thumb: go to max thumb
                    e.preventDefault();
                    state.activeThumb = 'max';
                  }
                } else {
                  // activeThumb === 'max'
                  if (e.shiftKey) {
                    // Shift+Tab from max thumb: go to min thumb
                    e.preventDefault();
                    state.activeThumb = 'min';
                  } else {
                    // Tab from max thumb: go to next element (let browser handle)
                    return; // Don't prevent default
                  }
                }
                break;
              case 'Home':
                e.preventDefault();
                if (activeThumb === 'min') {
                  updateRangeValues(min, newMaxValue, attrs, state, false);
                } else {
                  updateRangeValues(newMinValue, newMinValue, attrs, state, false);
                }
                // m.redraw();
                break;
              case 'End':
                e.preventDefault();
                if (activeThumb === 'min') {
                  updateRangeValues(newMaxValue, newMaxValue, attrs, state, false);
                } else {
                  updateRangeValues(newMinValue, max, attrs, state, false);
                }
                // m.redraw();
                break;
            }
          },
        },
        [
          // Track
          m(`.track.${orientation}`),
          // Range
          m(`.range.${orientation}`, { style: rangeStyle }),
          // Min thumb
          m(
            `.thumb.${orientation}.min-thumb${state.activeThumb === 'min' ? '.active' : ''}`,
            {
              style: createThumbStyle(minPercentage, state.activeThumb === 'min'),
              onmousedown: handleMouseDown('min'),
              onclick: () => {
                state.activeThumb = 'min';
                // m.redraw();
              },
            },
            showValue ? m(`.value.${orientation}`, state.rangeMinValue.toFixed(0)) : null
          ),
          // Max thumb
          m(
            `.thumb.${orientation}.max-thumb${state.activeThumb === 'max' ? '.active' : ''}`,
            {
              style: createThumbStyle(maxPercentage, state.activeThumb === 'max'),
              onmousedown: handleMouseDown('max'),
              onclick: () => {
                state.activeThumb = 'max';
                // m.redraw();
              },
            },
            showValue ? m(`.value.${orientation}`, state.rangeMaxValue.toFixed(0)) : null
          ),
        ]
      ),
    ]),
    label
      ? m(Label, {
          label,
          id,
          isMandatory,
          isActive: true, // Range sliders always have active labels
        })
      : null,
    helperText ? m(HelperText, { helperText }) : null,
  ]);
};
