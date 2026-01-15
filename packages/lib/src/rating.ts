import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';

/** Rating component size options */
export type RatingSize = 'small' | 'medium' | 'large';

/** Rating component density options */
export type RatingDensity = 'compact' | 'standard' | 'comfortable';

/** Custom icon configuration */
export interface RatingIconConfig {
  /** Custom filled icon component or string */
  filled?: string | m.Component;
  /** Custom empty icon component or string */
  empty?: string | m.Component;
  /** Custom half-filled icon component or string (for fractional ratings) */
  half?: string | m.Component;
}

/** Rating component attributes */
export interface RatingAttrs extends Attributes {
  /** Current rating value */
  value?: number;
  /** Maximum rating value (default: 5) */
  max?: number;
  /** Step size for rating increments (default: 1, can be 0.5 for half-steps) */
  step?: number;
  /** Initial value for uncontrolled mode */
  defaultValue?: number;
  /** Whether the rating is read-only */
  readonly?: boolean;
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Whether the rating can be cleared/reset to 0 */
  clearable?: boolean;
  /** Size variant */
  size?: RatingSize;
  /** Density variant */
  density?: RatingDensity;
  /** Custom icon configuration */
  icon?: RatingIconConfig;
  /** Class name for the container */
  className?: string;
  /** Additional CSS styles */
  style?: any;
  /** Callback when rating changes */
  onchange?: (value: number) => void;
  /** Callback when rating is hovered (preview mode) */
  onmouseover?: (value: number) => void;
  /** Function to get label text for accessibility */
  getLabelText?: (value: number, max: number) => string;
  /** Whether to show tooltips on hover */
  showTooltips?: boolean;
  /** Custom tooltip labels for each rating value */
  tooltipLabels?: string[];
  /** Whether to allow fractional display (e.g., 3.5 stars) */
  allowHalfSteps?: boolean;
  /** Name for form submission */
  name?: string;
  /** HTML ID for the component */
  id?: string;
  /** ARIA label for the component */
  'aria-label'?: string;
  /** ARIA label for the component (camelCase alternative) */
  ariaLabel?: string;
  /** ARIA labelledby reference */
  'aria-labelledby'?: string;
}

/** Default star icons */
const DEFAULT_ICONS = {
  filled: '★',
  empty: '☆',
  half: '☆', // We'll handle half-fill with CSS
};

/** Create a Rating component */
export const Rating: FactoryComponent<RatingAttrs> = () => {
  const state = {
    id: uniqueId(),
    internalValue: 0,
    hoverValue: null as number | null,
    isHovering: false,
    isFocused: false,
  };

  const isControlled = (attrs: RatingAttrs) =>
    typeof attrs.value !== 'undefined' && typeof attrs.onchange === 'function';

  const getCurrentValue = (attrs: RatingAttrs) => {
    const controlled = isControlled(attrs);
    const isNonInteractive = attrs.readonly || attrs.disabled;

    if (controlled) {
      return attrs.value || 0;
    }

    // Non-interactive components: prefer defaultValue, fallback to value
    if (isNonInteractive) {
      return attrs.defaultValue ?? attrs.value ?? 0;
    }

    // Interactive uncontrolled: use internal state (user can change it)
    return state.internalValue ?? attrs.defaultValue ?? 0;
  };

  const getDisplayValue = (attrs: RatingAttrs) =>
    state.isHovering && state.hoverValue !== null ? state.hoverValue : getCurrentValue(attrs);

  const getLabelText = (value: number, max: number, getLabelFn?: RatingAttrs['getLabelText']): string => {
    if (getLabelFn) {
      return getLabelFn(value, max);
    }
    if (value === 0) {
      return `No rating`;
    }
    if (value === 1) {
      return `1 star out of ${max}`;
    }
    return `${value} stars out of ${max}`;
  };

  const getSizeClass = (size: RatingSize = 'medium'): string => {
    switch (size) {
      case 'small':
        return 'rating--small';
      case 'large':
        return 'rating--large';
      default:
        return 'rating--medium';
    }
  };

  const getDensityClass = (density: RatingDensity = 'standard'): string => {
    switch (density) {
      case 'compact':
        return 'rating--compact';
      case 'comfortable':
        return 'rating--comfortable';
      default:
        return 'rating--standard';
    }
  };

  const handleItemClick = (attrs: RatingAttrs, clickValue: number) => {
    if (attrs.readonly || attrs.disabled) return;

    const currentValue = getCurrentValue(attrs);
    const newValue = attrs.clearable && currentValue === clickValue ? 0 : clickValue;

    if (!isControlled(attrs)) {
      state.internalValue = newValue;
    }

    attrs.onchange?.(newValue);
  };

  const handleItemHover = (attrs: RatingAttrs, hoverValue: number) => {
    if (attrs.readonly || attrs.disabled) return;

    state.hoverValue = hoverValue;
    state.isHovering = true;
    attrs.onmouseover?.(hoverValue);
  };

  const handleMouseLeave = (attrs: RatingAttrs) => {
    if (attrs.readonly || attrs.disabled) return;

    state.isHovering = false;
    state.hoverValue = null;
  };

  const handleKeyDown = (attrs: RatingAttrs, e: KeyboardEvent) => {
    if (attrs.readonly || attrs.disabled) return;

    const max = attrs.max || 5;
    const step = attrs.step || 1;
    const currentValue = getCurrentValue(attrs);
    let newValue = currentValue;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(max, currentValue + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(0, currentValue - step);
        break;
      case 'Home':
        e.preventDefault();
        newValue = attrs.clearable ? 0 : step;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        // If focused and not hovering, increment by step
        if (!state.isHovering) {
          newValue = currentValue + step > max ? (attrs.clearable ? 0 : step) : currentValue + step;
        }
        break;
      case 'Escape':
        if (attrs.clearable) {
          e.preventDefault();
          newValue = 0;
        }
        break;
      default:
        return;
    }

    if (newValue !== currentValue) {
      if (!isControlled(attrs)) {
        state.internalValue = newValue;
      }
      attrs.onchange?.(newValue);
    }
  };

  interface RatingItemAttrs {
    index: number;
    displayValue: number;
    step: number;
    icons: { filled: string | m.Component; empty: string | m.Component; half: string | m.Component };
    allowHalfSteps?: boolean;
    disabled?: boolean;
    showTooltip?: boolean;
    tooltipLabel?: string;
    onclick: () => void;
    onmouseover: () => void;
  }

  const RatingItem: FactoryComponent<RatingItemAttrs> = () => {
    return {
      view: ({ attrs }) => {
        const {
          index,
          displayValue,
          step,
          icons,
          allowHalfSteps,
          disabled,
          showTooltip,
          tooltipLabel,
          onclick,
          onmouseover,
        } = attrs;
        const itemValue = (index + 1) * step;

        // Calculate fill state based on displayValue vs itemValue
        const diff = displayValue - itemValue;

        const fillState: 'empty' | 'half' | 'full' =
          diff >= 0 ? 'full' : allowHalfSteps && diff >= -step / 2 ? 'half' : 'empty';

        return m(
          '.rating__item.no-select',
          {
            className: [
              fillState === 'full' ? 'rating__item--filled' : '',
              fillState === 'half' ? 'rating__item--half' : '',
              fillState !== 'empty' ? 'rating__item--active' : '',
              disabled ? 'rating__item--disabled' : '',
            ]
              .filter(Boolean)
              .join(' '),
            onclick,
            onmouseover,
          },
          [
            // Empty icon (background)
            m(
              '.rating__icon.rating__icon--empty',
              { 'aria-hidden': 'true' },
              typeof icons.empty === 'string' ? icons.empty : m(icons.empty as m.ComponentTypes)
            ),

            // Filled icon (foreground)
            m(
              '.rating__icon.rating__icon--filled',
              {
                'aria-hidden': 'true',
                style: {
                  clipPath: fillState === 'half' ? 'inset(0 50% 0 0)' : undefined,
                },
              },
              typeof icons.filled === 'string' ? icons.filled : m(icons.filled as m.ComponentTypes)
            ),

            // Tooltip
            showTooltip && tooltipLabel && m('.rating__tooltip', tooltipLabel),
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
          `Rating component received 'value' prop without 'onchange' handler. ` +
            `Use 'defaultValue' for uncontrolled components or add 'onchange' for controlled components.`
        );
      }

      if (!controlled) {
        state.internalValue = attrs.defaultValue || 0;
      }
    },

    view: ({ attrs }) => {
      const {
        max = 5,
        step = 1,
        size = 'medium',
        density = 'standard',
        className = '',
        style = {},
        readonly: readonly = false,
        disabled = false,
        id = state.id,
        name,
        ...ariaAttrs
      } = attrs;

      const currentValue = getCurrentValue(attrs);
      const displayValue = getDisplayValue(attrs);
      const itemCount = Math.ceil(max / step);

      return m(
        '.rating',
        {
          className: [
            'rating',
            getSizeClass(size),
            getDensityClass(density),
            readonly ? 'rating--read-only' : '',
            disabled ? 'rating--disabled' : '',
            state.isFocused ? 'rating--focused' : '',
            className,
          ]
            .filter(Boolean)
            .join(' '),
          style,
          id,
          role: readonly ? 'img' : 'slider',
          tabindex: readonly || disabled ? -1 : 0,
          'aria-valuemin': 0,
          'aria-valuemax': max,
          'aria-valuenow': currentValue,
          'aria-valuetext': getLabelText(currentValue, max, attrs.getLabelText),
          'aria-label':
            ariaAttrs['aria-label'] ||
            attrs.ariaLabel ||
            `Rating: ${getLabelText(currentValue, max, attrs.getLabelText)}`,
          'aria-labelledby': ariaAttrs['aria-labelledby'],
          'aria-readonly': readonly,
          'aria-disabled': disabled,
          onkeydown: (e: KeyboardEvent) => handleKeyDown(attrs, e),
          onfocus: () => {
            state.isFocused = true;
          },
          onblur: () => {
            state.isFocused = false;
            handleMouseLeave(attrs);
          },
          onmouseleave: () => handleMouseLeave(attrs),
        },
        [
          // Hidden input for form submission
          name &&
            m('input', {
              type: 'hidden',
              name,
              value: currentValue,
            }),

          // Rating items
          m(
            '.rating__items',
            {
              className: 'rating__items',
            },
            // Array.from({ length: itemCount }, (_, i) => renderRatingItem(attrs, i))
            [...Array(itemCount)].map((_, i) => {
              const itemValue = (i + 1) * step;
              return m(RatingItem, {
                key: `rating-item-${i}`,
                index: i,
                displayValue: displayValue,
                step,
                icons: { ...DEFAULT_ICONS, ...attrs.icon },
                allowHalfSteps: attrs.allowHalfSteps,
                disabled: attrs.disabled,
                showTooltip: attrs.showTooltips,
                tooltipLabel: attrs.tooltipLabels?.[i],
                onclick: () => handleItemClick(attrs, itemValue),
                onmouseover: () => handleItemHover(attrs, itemValue),
              });
            })
          ),

          // Screen reader text
          m(
            '.rating__sr-only',
            {
              className: 'rating__sr-only',
              'aria-live': 'polite',
              'aria-atomic': 'true',
            },
            getLabelText(displayValue, max, attrs.getLabelText)
          ),
        ]
      );
    },
  };
};
