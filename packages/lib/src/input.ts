import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';
import { MaterialIcon } from './material-icon';
import { InputType } from './types';

/** Character counter component that tracks text length against maxLength */
export const CharacterCounter: FactoryComponent<{ currentLength: number; maxLength: number; show: boolean }> = () => {
  return {
    view: ({ attrs }) => {
      const { currentLength, maxLength, show } = attrs;
      if (!show) return null;

      const isOverLimit = currentLength > maxLength;
      return m(
        'span.character-counter',
        {
          style: {
            color: isOverLimit ? '#F44336' : '#9e9e9e',
            fontSize: '12px',
            display: 'block',
            textAlign: 'right',
            marginTop: '8px',
          },
        },
        `${currentLength}/${maxLength}`
      );
    },
  };
};

/** Create a TextArea */
export const TextArea: FactoryComponent<InputAttrs<string>> = () => {
  const state = {
    id: uniqueId(),
    currentLength: 0,
    hasInteracted: false,
    isValid: true,
    height: undefined as undefined | string,
    active: false,
    textarea: undefined as undefined | HTMLTextAreaElement,
  };

  let labelManager: { updateLabelState: () => void; cleanup: () => void } | null = null;

  const updateHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    const newHeight = textarea.scrollHeight + 'px';
    state.height = textarea.value.length === 0 ? undefined : newHeight;
  };

  return {
    onremove: () => {
      if (labelManager) {
        labelManager.cleanup();
        labelManager = null;
      }
    },
    view: ({ attrs }) => {
      const {
        className = 'col s12',
        helperText,
        iconName,
        id = state.id,
        initialValue,
        placeholder,
        isMandatory,
        label,
        maxLength,
        oninput,
        onchange,
        onkeydown,
        onkeypress,
        onkeyup,
        onblur,
        style,
        ...params
      } = attrs;
      // const attributes = toAttrs(params);
      return m('.input-field', { className, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m('textarea.materialize-textarea', {
          ...params,
          id,
          tabindex: 0,
          style: {
            height: state.height,
          },
          oncreate: ({ dom }) => {
            const textarea = (state.textarea = dom as HTMLTextAreaElement);

            // Set initial value and height if provided
            if (initialValue) {
              textarea.value = String(initialValue);
              updateHeight(textarea);
              // } else {
              // updateHeight(textarea);
            }

            // Update character count state for counter component
            if (maxLength) {
              state.currentLength = textarea.value.length; // Initial count
              m.redraw();
            }
          },
          onupdate: ({ dom }) => {
            const textarea = dom as HTMLTextAreaElement;
            if (state.height) textarea.style.height = state.height;
          },
          onfocus: () => {
            state.active = true;
          },
          oninput: (e: Event) => {
            state.active = true;
            state.hasInteracted = false;
            const target = e.target as HTMLTextAreaElement;

            // Update height for auto-resize
            updateHeight(target);

            // Update character count
            if (maxLength) {
              state.currentLength = target.value.length;
              state.hasInteracted = target.value.length > 0;
            }

            // Call onchange handler
            if (oninput) {
              oninput(target.value);
            }
          },
          onblur: (e: FocusEvent) => {
            state.active = false;
            // const target = e.target as HTMLTextAreaElement;
            state.hasInteracted = true;

            // Call original onblur if provided
            if (onblur) {
              onblur(e);
            }

            if (onchange && state.textarea) {
              onchange(state.textarea.value);
            }
          },
          onkeyup: onkeyup
            ? (ev: KeyboardEvent) => {
                onkeyup(ev, (ev.target as HTMLTextAreaElement).value);
              }
            : undefined,
          onkeydown: onkeydown
            ? (ev: KeyboardEvent) => {
                onkeydown(ev, (ev.target as HTMLTextAreaElement).value);
              }
            : undefined,
          onkeypress: onkeypress
            ? (ev: KeyboardEvent) => {
                onkeypress(ev, (ev.target as HTMLTextAreaElement).value);
              }
            : undefined,
        }),
        m(Label, {
          label,
          id,
          isMandatory,
          isActive: state.textarea?.value || placeholder || state.active,
          initialValue: initialValue !== undefined,
        }),
        m(HelperText, {
          helperText,
          dataError: state.hasInteracted && attrs.dataError ? attrs.dataError : undefined,
          dataSuccess: state.hasInteracted && attrs.dataSuccess ? attrs.dataSuccess : undefined,
        }),
        maxLength
          ? m(CharacterCounter, {
              currentLength: state.currentLength,
              maxLength,
              show: state.currentLength > 0,
            })
          : undefined,
      ]);
    },
  };
};

/** Default component for all kinds of input fields. */
const InputField =
  <T>(type: InputType, defaultClass = ''): FactoryComponent<InputAttrs<T>> =>
  () => {
    const state = {
      id: uniqueId(),
      currentLength: 0,
      hasInteracted: false,
      isValid: true,
      active: false,
      inputElement: null as null | HTMLInputElement,
      // Range-specific state
      rangeMinValue: undefined as number | undefined,
      rangeMaxValue: undefined as number | undefined,
      singleValue: undefined as number | undefined,
      isDragging: false,
      activeThumb: null as 'min' | 'max' | null,
    };
    // let labelManager: { updateLabelState: () => void; cleanup: () => void } | null = null;
    // let lengthUpdateHandler: (() => void) | null = null;
    // let inputElement: HTMLInputElement | null = null;

    const getValue = (target: HTMLInputElement) => {
      const val = target.value as any as T;
      return (val ? (type === 'number' || type === 'range' ? +val : val) : val) as T;
    };

    const setValidity = (target: HTMLInputElement, validationResult: string | boolean) => {
      if (typeof validationResult === 'boolean') {
        target.setCustomValidity(validationResult ? '' : 'Custom validation failed');
      } else {
        target.setCustomValidity(validationResult);
      }
    };

    const focus = ({ autofocus }: InputAttrs<T>) =>
      autofocus ? (typeof autofocus === 'boolean' ? autofocus : autofocus()) : false;

    const lengthUpdateHandler = () => {
      const length = state.inputElement?.value.length;
      if (length) {
        state.currentLength = length;
        state.hasInteracted = length > 0;
      }
    };

    // Range slider helper functions
    const getPercentage = (value: number, min: number, max: number) => {
      return ((value - min) / (max - min)) * 100;
    };

    const updateRangeValues = (minValue: number, maxValue: number, attrs: InputAttrs<T>, immediate = false) => {
      // Ensure min doesn't exceed max and vice versa
      if (minValue > maxValue) minValue = maxValue;
      if (maxValue < minValue) maxValue = minValue;

      state.rangeMinValue = minValue;
      state.rangeMaxValue = maxValue;

      // Call oninput for immediate feedback or onchange for final changes
      if (immediate && attrs.oninput) {
        attrs.oninput(minValue as T, maxValue as T);
      } else if (!immediate && attrs.onchange) {
        attrs.onchange(minValue as T, maxValue as T);
      }
    };

    // Render function for single range slider with tooltip
    const renderSingleRangeWithTooltip = (
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
        oninput,
        onchange,
      } = attrs;

      // Initialize single range value
      const currentValue = initialValue !== undefined ? initialValue : state.singleValue || min;
      if (state.singleValue === undefined) {
        state.singleValue = currentValue as number;
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

          // Redraw to update the UI
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
          m(`.single-range-slider.${orientation}`, {
            tabindex: disabled ? -1 : 0,
            role: 'slider',
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': state.singleValue,
            'aria-label': label || 'Range slider',
            onclick: (e: MouseEvent) => {
              // Focus the slider when clicked
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
                  m.redraw();
                  break;
                case 'ArrowRight':
                case 'ArrowUp':
                  e.preventDefault();
                  newValue = Math.min(max, newValue + step);
                  updateSingleValue(newValue, false);
                  m.redraw();
                  break;
                case 'Home':
                  e.preventDefault();
                  updateSingleValue(min, false);
                  m.redraw();
                  break;
                case 'End':
                  e.preventDefault();
                  updateSingleValue(max, false);
                  m.redraw();
                  break;
              }
            },
          }, [
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
              showValue
                ? m(`.value-tooltip.${vertical ? 'right' : 'top'}`, (state.singleValue as number).toFixed(0))
                : null
            ),
          ]),
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

    // Render function for minmax range slider
    const renderMinMaxRange = (
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
            updateRangeValues(Math.min(steppedValue, state.rangeMaxValue), state.rangeMaxValue, attrs, true);
          } else {
            updateRangeValues(state.rangeMinValue, Math.max(steppedValue, state.rangeMinValue), attrs, true);
          }

          // Redraw to update the UI
          m.redraw();
        };

        const handleMouseUp = () => {
          state.isDragging = false;
          state.activeThumb = null;
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);

          // Fire onchange when dragging ends
          updateRangeValues(state.rangeMinValue, state.rangeMaxValue, attrs, false);
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
        m(`.${fieldClass}`, [
          m(`.double-range-slider.${orientation}`, { 
            style: containerStyle,
            tabindex: disabled ? -1 : 0,
            role: 'slider',
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': state.rangeMinValue,
            'aria-valuetext': `${state.rangeMinValue} to ${state.rangeMaxValue}`,
            'aria-label': label || 'Range slider',
            onclick: (e: MouseEvent) => {
              // Focus the slider when clicked
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
                    updateRangeValues(newMinValue, newMaxValue, attrs, false);
                  } else {
                    newMaxValue = Math.max(newMinValue, newMaxValue - step);
                    updateRangeValues(newMinValue, newMaxValue, attrs, false);
                  }
                  m.redraw();
                  break;
                case 'ArrowRight':
                case 'ArrowUp':
                  e.preventDefault();
                  if (activeThumb === 'min') {
                    newMinValue = Math.min(newMaxValue, newMinValue + step);
                    updateRangeValues(newMinValue, newMaxValue, attrs, false);
                  } else {
                    newMaxValue = Math.min(max, newMaxValue + step);
                    updateRangeValues(newMinValue, newMaxValue, attrs, false);
                  }
                  m.redraw();
                  break;
                // Remove Tab case - let normal tab navigation work
                // Users can click on specific thumbs to activate them
                case 'Home':
                  e.preventDefault();
                  if (activeThumb === 'min') {
                    updateRangeValues(min, newMaxValue, attrs, false);
                  } else {
                    updateRangeValues(newMinValue, newMinValue, attrs, false);
                  }
                  m.redraw();
                  break;
                case 'End':
                  e.preventDefault();
                  if (activeThumb === 'min') {
                    updateRangeValues(newMaxValue, newMaxValue, attrs, false);
                  } else {
                    updateRangeValues(newMinValue, max, attrs, false);
                  }
                  m.redraw();
                  break;
              }
            },
          }, [
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
                  m.redraw();
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
                  m.redraw();
                },
              },
              showValue ? m(`.value.${orientation}`, state.rangeMaxValue.toFixed(0)) : null
            ),
          ]),
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

    return {
      view: ({ attrs }) => {
        const {
          className = 'col s12',
          dataError,
          dataSuccess,
          helperText,
          iconName,
          id = state.id,
          initialValue,
          placeholder,
          isMandatory,
          label,
          maxLength,
          newRow,
          oninput,
          onchange,
          onkeydown,
          onkeypress,
          onkeyup,
          style,
          validate,
          ...params
        } = attrs;
        // const attributes = toAttrs(params);
        const cn = [newRow ? 'clear' : '', defaultClass, className].filter(Boolean).join(' ').trim() || undefined;
        const isActive =
          state.active || state.inputElement?.value || placeholder || type === 'color' || type === 'range'
            ? true
            : false;
        // Special rendering for minmax range sliders
        if (type === 'range' && attrs.minmax) {
          return renderMinMaxRange(attrs, state, cn, style, iconName, id, label, isMandatory, helperText);
        }

        // Special rendering for single range sliders with tooltips
        if (type === 'range' && attrs.showValue) {
          return renderSingleRangeWithTooltip(attrs, state, cn, style, iconName, id, label, isMandatory, helperText);
        }

        return m('.input-field', { className: cn, style }, [
          iconName ? m('i.material-icons.prefix', iconName) : undefined,
          m('input.validate', {
            ...params,
            type,
            tabindex: 0,
            id,
            placeholder,
            class: type === 'range' && attrs.vertical ? 'range-slider vertical' : undefined,
            style:
              type === 'range' && attrs.vertical
                ? {
                    height: attrs.height || '200px',
                    width: '6px',
                    writingMode: 'vertical-lr' as const,
                    direction: 'rtl' as const,
                  }
                : undefined,
            // attributes,
            oncreate: ({ dom }) => {
              const input = (state.inputElement = dom as HTMLInputElement);
              if (focus(attrs)) {
                input.focus();
              }

              // Set initial value if provided
              if (initialValue) {
                input.value = String(initialValue);
              }

              // Update character count state for counter component
              if (maxLength) {
                state.currentLength = input.value.length; // Initial count
              }

              // Range input functionality
              if (type === 'range' && !attrs.minmax) {
                const updateThumb = () => {
                  const value = input.value;
                  const min = input.min || '0';
                  const max = input.max || '100';
                  const percentage =
                    ((parseFloat(value) - parseFloat(min)) / (parseFloat(max) - parseFloat(min))) * 100;
                  input.style.setProperty('--range-progress', `${percentage}%`);
                };
                input.addEventListener('input', updateThumb);
                updateThumb(); // Initial position
              }
            },
            onkeyup: onkeyup
              ? (ev: KeyboardEvent) => {
                  onkeyup(ev, getValue(ev.target as HTMLInputElement));
                }
              : undefined,
            onkeydown: onkeydown
              ? (ev: KeyboardEvent) => {
                  onkeydown(ev, getValue(ev.target as HTMLInputElement));
                }
              : undefined,
            onkeypress: onkeypress
              ? (ev: KeyboardEvent) => {
                  onkeypress(ev, getValue(ev.target as HTMLInputElement));
                }
              : undefined,
            onupdate: validate
              ? ({ dom }) => {
                  const target = dom as HTMLInputElement;
                  setValidity(target, validate(getValue(target), target));
                }
              : undefined,
            oninput: (e: Event) => {
              state.active = true;
              const target = e.target as HTMLInputElement;

              // Handle original oninput logic
              const value = getValue(target);
              if (oninput) {
                oninput(value);
              }

              if (maxLength) {
                lengthUpdateHandler();
              }

              // Don't validate on input, only clear error states if user is typing
              if (validate && target.classList.contains('invalid') && target.value.length > 0) {
                const validationResult = validate(value, target);
                if (typeof validationResult === 'boolean' && validationResult) {
                  target.classList.remove('invalid');
                  target.classList.add('valid');
                  state.isValid = true;
                } else if (typeof validationResult === 'string' && validationResult === '') {
                  target.classList.remove('invalid');
                  target.classList.add('valid');
                  state.isValid = true;
                }
              }
            },
            onfocus: () => {
              state.active = true;
            },
            onblur: (e: FocusEvent) => {
              state.active = false;
              const target = e.target as HTMLInputElement;
              state.hasInteracted = true;

              if (target && validate) {
                const value = getValue(target);
                // Only validate if user has entered some text
                if (value && String(value).length > 0) {
                  const validationResult = validate(value, target);
                  state.isValid = typeof validationResult === 'boolean' ? validationResult : false;
                  setValidity(target, validationResult);

                  // Update visual validation state
                  if (typeof validationResult === 'boolean') {
                    if (validationResult) {
                      target.classList.remove('invalid');
                      target.classList.add('valid');
                    } else {
                      target.classList.remove('valid');
                      target.classList.add('invalid');
                    }
                  } else if (typeof validationResult === 'string') {
                    target.classList.remove('valid');
                    target.classList.add('invalid');
                    state.isValid = false;
                  }
                } else {
                  // Clear validation state if no text
                  target.classList.remove('valid', 'invalid');
                  state.isValid = true;
                }
              }

              // Also call the original onblur handler if provided
              if (attrs.onblur) {
                attrs.onblur(e);
              }
              if (onchange && state.inputElement) {
                onchange(getValue(state.inputElement));
              }
            },
          }),
          m(Label, {
            label,
            id,
            isMandatory,
            isActive,
            initialValue: initialValue !== undefined,
          }),
          m(HelperText, {
            helperText,
            dataError: state.hasInteracted && !state.isValid ? dataError : undefined,
            dataSuccess: state.hasInteracted && state.isValid ? dataSuccess : undefined,
          }),
          maxLength
            ? m(CharacterCounter, {
                currentLength: state.currentLength,
                maxLength,
                show: state.currentLength > 0,
              })
            : undefined,
        ]);
      },
    };
  };

/** Component for entering some text */
export const TextInput = InputField<string>('text');
/** Component for entering a password */
export const PasswordInput = InputField<string>('password');
/** Component for entering a number */
export const NumberInput = InputField<number>('number');
/** Component for entering a URL */
export const UrlInput = InputField<string>('url');
/** Component for entering a color */
export const ColorInput = InputField<string>('color');
/** Component for entering a range */
export const RangeInput = InputField<number>('range', '.range-field');
/** Component for entering an email */
export const EmailInput = InputField<string>('email');

export interface FileInputAttrs extends Attributes {
  /** Displayed on the button, @default File */
  label?: string;
  /** Current value of the file input, write only */
  initialValue?: string;
  /** Adds a placeholder message */
  placeholder?: string;
  /** If true, upload multiple files */
  multiple?: boolean;
  /** Called when the file input is changed */
  onchange?: (files: FileList) => void;
  /** If true, disable the box */
  disabled?: boolean;
  /**
   * Accepted file types, e.g. image/png, image/jpeg,
   * any image/*, video/*. audio/*, .pdf, a valid MIME type string, with no extensions, etc.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
   */
  accept?: string | string[];
}

/** Component for uploading a file */
export const FileInput: FactoryComponent<FileInputAttrs> = () => {
  let canClear = false;
  let i: HTMLInputElement;
  return {
    view: ({ attrs }) => {
      const {
        multiple,
        disabled,
        initialValue,
        placeholder,
        onchange,
        className = 'col s12',
        accept: acceptedFiles,
        label = 'File',
      } = attrs;
      const accept = acceptedFiles
        ? acceptedFiles instanceof Array
          ? acceptedFiles.join(', ')
          : acceptedFiles
        : undefined;
      return m(
        '.file-field.input-field',
        {
          className: attrs.class || className,
        },
        [
          m('.btn', [
            m('span', label),
            m('input[type=file]', {
              title: label,
              accept,
              multiple,
              disabled,
              onchange: onchange
                ? (e: UIEvent) => {
                    const i = e.target as HTMLInputElement;
                    if (i && i.files && onchange) {
                      canClear = true;
                      onchange(i.files);
                    }
                  }
                : undefined,
            }),
          ]),
          m(
            '.file-path-wrapper',
            m('input.file-path.validate[type=text]', {
              placeholder,
              oncreate: ({ dom }) => {
                i = dom as HTMLInputElement;
                if (initialValue) i.value = initialValue;
              },
            })
          ),
          (canClear || i?.value) &&
            m(
              'a.waves-effect.waves-teal.btn-flat',
              {
                style: {
                  float: 'right',
                  position: 'relative',
                  top: '-3rem',
                  padding: 0,
                },
                onclick: () => {
                  canClear = false;
                  i.value = '';
                  onchange && onchange({} as FileList);
                },
              },
              m(MaterialIcon, {
                name: 'close',
                className: 'close',
              })
            ),
        ]
      );
    },
  };
};
