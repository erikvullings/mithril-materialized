import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';

/** Likert scale component size options */
export type LikertScaleSize = 'small' | 'medium' | 'large';

/** Likert scale component density options */
export type LikertScaleDensity = 'compact' | 'standard' | 'comfortable';

/** Likert scale layout options */
export type LikertScaleLayout = 'horizontal' | 'vertical' | 'responsive';

/** Likert scale component attributes */
export interface LikertScaleAttrs<T extends number = number> extends Attributes {
  // Scale configuration
  /** Minimum scale value (default: 1) */
  min?: number;
  /** Maximum scale value (default: 5) */
  max?: number;
  /** Step size for scale increments (default: 1) */
  step?: number;

  // State management (consistent with Rating)
  /** Current value for controlled mode */
  value?: T;
  /** Initial value for uncontrolled mode */
  defaultValue?: T;
  /** Callback when value changes */
  onchange?: (value: T) => void;

  // Labels
  /** Question/prompt text */
  label?: string;
  /** Helper text description */
  description?: string;
  /** Anchor label for minimum value (e.g., "Very Unhappy") */
  startLabel?: string;
  /** Anchor label for middle value (optional, e.g., "Neutral") */
  middleLabel?: string;
  /** Anchor label for maximum value (e.g., "Very Happy") */
  endLabel?: string;

  // Display options
  /** Whether to display numeric values (default: false) */
  showNumbers?: boolean;
  /** Whether to show tooltips on hover (default: false) */
  showTooltips?: boolean;
  /** Custom tooltip labels for each value */
  tooltipLabels?: string[];

  // Size and density (consistent with Rating)
  /** Density variant (default: 'standard') */
  density?: LikertScaleDensity;
  /** Size variant (default: 'medium') */
  size?: LikertScaleSize;

  // Layout
  /** Layout mode (default: 'responsive' = horizontal on desktop, vertical on mobile) */
  layout?: LikertScaleLayout;

  // Form integration
  /** HTML ID for the component */
  id?: string;
  /** Name for form submission */
  name?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is read-only */
  readonly?: boolean;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;

  // Accessibility (consistent with Rating)
  /** ARIA label for the component */
  'aria-label'?: string;
  /** ARIA label for the component (camelCase alternative) */
  ariaLabel?: string;
  /** ARIA labelledby reference */
  'aria-labelledby'?: string;
  /** Function to get label text for accessibility */
  getLabelText?: (value: number, min: number, max: number) => string;

  // Styling
  /** Class name for the container */
  className?: string;
  /** Additional CSS styles */
  style?: any;

  // Multi-question alignment
  /** Use CSS grid for label/scale alignment in multi-question surveys (default: false) */
  alignLabels?: boolean;
}

/** Create a LikertScale component */
export const LikertScale: FactoryComponent<LikertScaleAttrs> = () => {
  const state = {
    id: uniqueId(),
    groupId: uniqueId(),
    internalValue: undefined as number | undefined,
    isFocused: false,
  };

  const isControlled = (attrs: LikertScaleAttrs) =>
    typeof attrs.value !== 'undefined' && typeof attrs.onchange === 'function';

  const getCurrentValue = (attrs: LikertScaleAttrs) => {
    const controlled = isControlled(attrs);
    const isNonInteractive = attrs.readonly || attrs.disabled;

    if (controlled) {
      return attrs.value;
    }

    // Non-interactive components: prefer defaultValue, fallback to value
    if (isNonInteractive) {
      return attrs.defaultValue ?? attrs.value;
    }

    // Interactive uncontrolled: use internal state (user can change it)
    return state.internalValue ?? attrs.defaultValue;
  };

  const getLabelText = (
    value: number | undefined,
    min: number,
    max: number,
    getLabelFn?: LikertScaleAttrs['getLabelText']
  ): string => {
    if (getLabelFn && value !== undefined) {
      return getLabelFn(value, min, max);
    }
    if (value === undefined) {
      return `No selection, please choose a value between ${min} and ${max}`;
    }
    return `Selected ${value} out of ${min} to ${max}`;
  };

  const getSizeClass = (size: LikertScaleSize = 'medium'): string => {
    switch (size) {
      case 'small':
        return 'likert-scale--small';
      case 'large':
        return 'likert-scale--large';
      default:
        return 'likert-scale--medium';
    }
  };

  const getDensityClass = (density: LikertScaleDensity = 'standard'): string => {
    switch (density) {
      case 'compact':
        return 'likert-scale--compact';
      case 'comfortable':
        return 'likert-scale--comfortable';
      default:
        return 'likert-scale--standard';
    }
  };

  const getLayoutClass = (layout: LikertScaleLayout = 'responsive'): string => {
    switch (layout) {
      case 'horizontal':
        return 'likert-scale--horizontal';
      case 'vertical':
        return 'likert-scale--vertical';
      default:
        return 'likert-scale--responsive';
    }
  };

  const handleChange = (attrs: LikertScaleAttrs, newValue: number) => {
    if (attrs.readonly || attrs.disabled) return;

    if (!isControlled(attrs)) {
      state.internalValue = newValue;
    }

    attrs.onchange?.(newValue);
  };

  const handleKeyDown = (attrs: LikertScaleAttrs, e: KeyboardEvent) => {
    if (attrs.readonly || attrs.disabled) return;

    const min = attrs.min || 1;
    const max = attrs.max || 5;
    const step = attrs.step || 1;
    const currentValue = getCurrentValue(attrs);
    let newValue = currentValue;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = currentValue !== undefined ? Math.min(max, currentValue + step) : min;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = currentValue !== undefined ? Math.max(min, currentValue - step) : min;
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }

    if (newValue !== currentValue) {
      handleChange(attrs, newValue);
    }
  };

  interface LikertScaleItemAttrs {
    value: number;
    currentValue: number | undefined;
    showNumber?: boolean;
    showTooltip?: boolean;
    tooltipLabel?: string;
    groupId: string;
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    onchange: (value: number) => void;
  }

  const LikertScaleItem: FactoryComponent<LikertScaleItemAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const {
          value,
          currentValue,
          showNumber,
          showTooltip,
          tooltipLabel,
          groupId,
          name,
          disabled,
          readonly,
          onchange,
        } = attrs;
        const radioId = `${groupId}-${value}`;
        const isChecked = currentValue === value;

        return m(
          '.likert-scale__item.no-select',
          {
            className: [
              isChecked ? 'likert-scale__item--checked' : '',
              disabled ? 'likert-scale__item--disabled' : '',
              readonly ? 'likert-scale__item--readonly' : '',
            ]
              .filter(Boolean)
              .join(' '),
          },
          [
            // Number label (optional)
            showNumber && m('.likert-scale__number', value),

            // Radio button input
            m('input[type=radio].likert-scale__input', {
              id: radioId,
              name: name || groupId,
              value: value,
              checked: isChecked,
              disabled: disabled || readonly,
              onchange: () => onchange(value),
            }),

            // Label for radio button
            m('label.likert-scale__label', {
              for: radioId,
            }),

            // Tooltip (optional)
            showTooltip && tooltipLabel && m('.likert-scale__tooltip', tooltipLabel),
          ]
        );
      },
    };
  };

  return {
    oninit: ({ attrs }) => {
      const controlled = isControlled(attrs);
      const isNonInteractive = attrs.readonly || attrs.disabled;

      // Warn developer for improper controlled usage
      if (attrs.value !== undefined && !controlled && !isNonInteractive) {
        console.warn(
          `LikertScale component received 'value' prop without 'onchange' handler. ` +
            `Use 'defaultValue' for uncontrolled components or add 'onchange' for controlled components.`
        );
      }

      if (!controlled) {
        state.internalValue = attrs.defaultValue;
      }
    },

    view: ({ attrs }) => {
      const {
        min = 1,
        max = 5,
        step = 1,
        size = 'medium',
        density = 'standard',
        layout = 'responsive',
        className = '',
        style = {},
        readonly = false,
        disabled = false,
        id = state.id,
        name,
        label,
        description,
        isMandatory,
        startLabel,
        middleLabel,
        endLabel,
        showNumbers = false,
        showTooltips = false,
        tooltipLabels,
        alignLabels = false,
        ...ariaAttrs
      } = attrs;

      const currentValue = getCurrentValue(attrs);
      const itemCount = Math.floor((max - min) / step) + 1;

      // Generate scale values
      const scaleValues = Array.from({ length: itemCount }, (_, i) => min + i * step);

      return m(
        '.likert-scale',
        {
          className: [
            'likert-scale',
            getSizeClass(size),
            getDensityClass(density),
            getLayoutClass(layout),
            readonly ? 'likert-scale--readonly' : '',
            disabled ? 'likert-scale--disabled' : '',
            state.isFocused ? 'likert-scale--focused' : '',
            alignLabels ? 'likert-scale--aligned' : '',
            className,
          ]
            .filter(Boolean)
            .join(' '),
          style,
          id,
          role: 'radiogroup',
          'aria-label': ariaAttrs['aria-label'] || attrs.ariaLabel || label || `Rating scale from ${min} to ${max}`,
          'aria-labelledby': ariaAttrs['aria-labelledby'],
          'aria-readonly': readonly,
          'aria-disabled': disabled,
          onkeydown: (e: KeyboardEvent) => handleKeyDown(attrs, e),
          onfocus: () => {
            state.isFocused = true;
          },
          onblur: () => {
            state.isFocused = false;
          },
          tabindex: readonly || disabled ? -1 : 0,
        },
        [
          // Label section (only text label, not the description)
          label &&
            m('.likert-scale__question-label', [
              m('span', label + (isMandatory ? ' *' : '')),
              description && m('.likert-scale__description', m.trust(description)),
            ]),

          // Scale section container
          m('.likert-scale__scale-container', [
            // Scale items with numbers
            m(
              '.likert-scale__scale',
              scaleValues.map((value) =>
                m(LikertScaleItem, {
                  key: `likert-item-${value}`,
                  value,
                  currentValue,
                  showNumber: showNumbers,
                  showTooltip: showTooltips,
                  tooltipLabel: tooltipLabels?.[value - min],
                  groupId: state.groupId,
                  name,
                  disabled,
                  readonly,
                  onchange: (v) => handleChange(attrs, v),
                })
              )
            ),

            // Scale anchors
            (startLabel || middleLabel || endLabel) &&
              m('.likert-scale__anchors', [
                startLabel && m('.likert-scale__anchor.likert-scale__anchor--start', startLabel),
                middleLabel && m('.likert-scale__anchor.likert-scale__anchor--middle', middleLabel),
                endLabel && m('.likert-scale__anchor.likert-scale__anchor--end', endLabel),
              ]),
          ]),

          // Screen reader text
          m(
            '.likert-scale__sr-only',
            {
              className: 'likert-scale__sr-only',
              'aria-live': 'polite',
              'aria-atomic': 'true',
            },
            getLabelText(currentValue, min, max, attrs.getLabelText)
          ),
        ]
      );
    },
  };
};
