import m from 'mithril';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';
import { ComponentStyle } from './types';
import { ControllableFieldState, createControllableFieldState } from './controllable-field';

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

type RangeValues = [number, number];

const getSingleValueState = (
  state: any
): ControllableFieldState<InputAttrs<number>, number> => {
  if (!state.singleValueState) {
    state.singleValueState = createControllableFieldState<InputAttrs<number>, number>({
      controlled: (attrs) => attrs.value !== undefined && typeof attrs.oninput === 'function',
      value: (attrs) => attrs.value,
      defaultValue: (attrs) => attrs.defaultValue ?? attrs.value,
      fallback: (attrs) => attrs.min ?? 0,
      adoptValueUntilInteraction: (attrs) => attrs.value,
    });
  }
  return state.singleValueState;
};

const getRangeValueState = (
  state: any
): ControllableFieldState<InputAttrs<number>, RangeValues> => {
  if (!state.rangeValueState) {
    const values = (attrs: InputAttrs<number>): RangeValues => [
      attrs.minValue ?? attrs.min ?? 0,
      attrs.maxValue ?? attrs.max ?? 100,
    ];
    state.rangeValueState = createControllableFieldState<InputAttrs<number>, RangeValues>({
      controlled: (attrs) =>
        (attrs.minValue !== undefined || attrs.maxValue !== undefined) && typeof attrs.oninput === 'function',
      value: values,
      defaultValue: values,
      fallback: values,
      adoptValueUntilInteraction: (attrs) =>
        attrs.minValue !== undefined || attrs.maxValue !== undefined ? values(attrs) : undefined,
    });
  }
  return state.rangeValueState;
};

const updateRangeValues = (
  minValue: number,
  maxValue: number,
  attrs: InputAttrs<number>,
  valueState: ControllableFieldState<InputAttrs<number>, RangeValues>,
  immediate: boolean
): RangeValues => {
  // Ensure min doesn't exceed max and vice versa
  if (minValue > maxValue) minValue = maxValue;
  if (maxValue < minValue) maxValue = minValue;

  valueState.update(attrs, [minValue, maxValue]);

  // Call appropriate handler based on interaction type, not control mode
  if (immediate && attrs.oninput) {
    attrs.oninput(minValue, maxValue); // Immediate feedback during drag
  }

  if (!immediate && attrs.onchange) {
    attrs.onchange(minValue, maxValue); // Final value on interaction end (blur/mouseup)
  }

  return [minValue, maxValue];
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
      style?: ComponentStyle;
      iconName?: string;
      id: string;
      label?: string;
      isMandatory?: boolean;
      helperText?: string;
    };
    state: any;
  }) {
    const {
      cn = attrs.className ?? 'col s12',
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

    if (state.isDragging === undefined) {
      state.isDragging = false;
    }
    const valueState = getSingleValueState(state);
    valueState.sync(attrs);
    let singleValue = valueState.current(attrs);
    const percentage = getPercentage(singleValue, min, max);
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
      valueState.update(attrs, newValue);
      singleValue = newValue;

      // Call appropriate handler based on interaction type, not control mode
      if (immediate && oninput) {
        oninput(newValue); // Immediate feedback during drag
      }

      if (!immediate && onchange) {
        onchange(newValue); // Final value on interaction end (blur/mouseup)
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      state.isDragging = true;
      state.dragValue = singleValue;

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
        state.dragValue = value;
        updateSingleValue(state.dragValue, true);
        m.redraw();
      };

      const handleMouseUp = () => {
        state.isDragging = false;
        if (state.cleanupMouseEvents) {
          state.cleanupMouseEvents();
          state.cleanupMouseEvents = null;
        }
        updateSingleValue(state.dragValue ?? singleValue, false);
        state.dragValue = undefined;
        m.redraw();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      state.cleanupMouseEvents = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    };

    const fieldClass = [
      'range-field',
      vertical ? 'vertical' : '',
      finalValueDisplay === 'always' ? 'has-visible-value' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return m('.input-field', { className: cn, style }, [
      iconName ? m('i.material-icons.prefix', iconName) : undefined,
      m('input[type=range]', {
        id,
        value: singleValue,
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
            'aria-valuenow': singleValue,
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
              const currentValue = singleValue;
              const newValue = handleKeyboardNavigation(e.key, currentValue, min, max, step);
              if (newValue !== null) {
                e.preventDefault();
                updateSingleValue(newValue, false);
              }
            },
            onblur: () => {
              if (disabled || !onchange) return;
              onchange(singleValue);
            },
          },
          [
            m(`.track.${orientation}`),
            m(`.range-progress.${orientation}`, { style: progressStyle }),
            m(
              `.thumb.${orientation}`,
              { style: thumbStyle, onmousedown: handleMouseDown },
              m(RangeTooltip, {
                value: singleValue,
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
      style?: ComponentStyle;
      iconName?: string;
      id: string;
      label?: string;
      isMandatory?: boolean;
      helperText?: string;
    };
    state: any;
  }) {
    const {
      cn = attrs.className ?? 'col s12',
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

    if (state.activeThumb === null) {
      state.activeThumb = 'min';
    }
    if (state.isDragging === undefined) {
      state.isDragging = false;
    }
    const valueState = getRangeValueState(state);
    valueState.sync(attrs);
    let [rangeMinValue, rangeMaxValue] = valueState.current(attrs);
    const updateDoubleValues = (nextMinValue: number, nextMaxValue: number, immediate: boolean) => {
      [rangeMinValue, rangeMaxValue] = updateRangeValues(
        nextMinValue,
        nextMaxValue,
        attrs,
        valueState,
        immediate
      );
    };

    const minPercentage = getPercentage(rangeMinValue, min, max);
    const maxPercentage = getPercentage(rangeMaxValue, min, max);
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
      e.stopPropagation();
      state.isDragging = true;
      state.activeThumb = thumb;
      state.dragRangeValues = [rangeMinValue, rangeMaxValue];

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
        const [dragMinValue, dragMaxValue] = state.dragRangeValues as RangeValues;

        if (thumb === 'min') {
          updateDoubleValues(Math.min(steppedValue, dragMaxValue), dragMaxValue, true);
        } else {
          updateDoubleValues(dragMinValue, Math.max(steppedValue, dragMinValue), true);
        }
        state.dragRangeValues = [rangeMinValue, rangeMaxValue];
        m.redraw();
      };

      const handleMouseUp = () => {
        state.isDragging = false;
        state.activeThumb = null;
        if (state.cleanupMouseEvents) {
          state.cleanupMouseEvents();
          state.cleanupMouseEvents = null;
        }
        const [dragMinValue, dragMaxValue] = (state.dragRangeValues as RangeValues | undefined) ?? [
          rangeMinValue,
          rangeMaxValue,
        ];
        updateDoubleValues(dragMinValue, dragMaxValue, false);
        state.dragRangeValues = undefined;
        m.redraw();
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
        value: rangeMinValue,
        min,
        max,
        step,
        style: { display: 'none' },
        disabled,
        tabindex: -1,
      }),
      m('input[type=range]', {
        id: `${id}_max`,
        value: rangeMaxValue,
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

              const distToMin = Math.abs(steppedValue - rangeMinValue);
              const distToMax = Math.abs(steppedValue - rangeMaxValue);

              if (distToMin <= distToMax) {
                updateDoubleValues(Math.min(steppedValue, rangeMaxValue), rangeMaxValue, false);
                state.activeThumb = 'min';
                const minThumb = container.querySelector('.thumb.min-thumb') as HTMLElement;
                if (minThumb) minThumb.focus();
              } else {
                updateDoubleValues(rangeMinValue, Math.max(steppedValue, rangeMinValue), false);
                state.activeThumb = 'max';
                const maxThumb = container.querySelector('.thumb.max-thumb') as HTMLElement;
                if (maxThumb) maxThumb.focus();
              }
            },
            onblur: () => {
              if (disabled || !attrs.onchange) return;
              attrs.onchange(rangeMinValue, rangeMaxValue);
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
                'aria-valuemax': rangeMaxValue,
                'aria-valuenow': rangeMinValue,
                'aria-label': `Minimum value: ${rangeMinValue}`,
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
                  const currentValue = rangeMinValue;
                  const newValue = handleKeyboardNavigation(e.key, currentValue, min, max, step);
                  if (newValue !== null) {
                    e.preventDefault();
                    const constrainedValue = Math.min(newValue, rangeMaxValue);
                    updateDoubleValues(constrainedValue, rangeMaxValue, false);
                  }
                },
              },
              m(DoubleRangeTooltip, {
                value: rangeMinValue,
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
                'aria-valuemin': rangeMinValue,
                'aria-valuemax': max,
                'aria-valuenow': rangeMaxValue,
                'aria-label': `Maximum value: ${rangeMaxValue}`,
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
                  const currentValue = rangeMaxValue;
                  const newValue = handleKeyboardNavigation(e.key, currentValue, min, max, step);
                  if (newValue !== null) {
                    e.preventDefault();
                    const constrainedValue = Math.max(newValue, rangeMinValue);
                    updateDoubleValues(rangeMinValue, constrainedValue, false);
                  }
                },
              },
              m(DoubleRangeTooltip, {
                value: rangeMaxValue,
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
