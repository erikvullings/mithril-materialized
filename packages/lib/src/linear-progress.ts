import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { MaterialColor, ColorIntensity } from './types';
import { ProgressMode, ProgressSize } from './circular-progress';

/** LinearProgress component attributes */
export interface LinearProgressAttrs extends Attributes {
  /** Progress mode (default: 'indeterminate') */
  mode?: ProgressMode;
  /** Current progress value (0-100) for determinate mode */
  value?: number;
  /** Maximum progress value (default: 100) */
  max?: number;
  /** Size variant (default: 'medium') */
  size?: ProgressSize;
  /** Materialize color (default: 'teal') */
  color?: MaterialColor;
  /** Color intensity modifier */
  colorIntensity?: ColorIntensity;
  /** Label to display at the end (right side) */
  label?: string | number;
  /** Auto-show percentage at the end for determinate mode (default: false) */
  showPercentage?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: any;
  /** HTML ID for the component */
  id?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA valuemin (default: 0) */
  'aria-valuemin'?: number;
  /** ARIA valuemax (default: 100) */
  'aria-valuemax'?: number;
  /** ARIA valuenow (current value) */
  'aria-valuenow'?: number;
  /** ARIA valuetext (custom text description) */
  'aria-valuetext'?: string;
}

/** Create a LinearProgress component */
export const LinearProgress: FactoryComponent<LinearProgressAttrs> = () => {
  const state = {
    id: uniqueId(),
  };

  /**
   * Get size class name
   */
  const getSizeClass = (size: ProgressSize = 'medium'): string => {
    return `linear-progress__track--${size}`;
  };

  /**
   * Get color class name
   */
  const getColorClass = (color?: MaterialColor, intensity?: ColorIntensity): string => {
    if (!color) return '';
    return intensity ? `linear-progress--${color} linear-progress--${intensity}` : `linear-progress--${color}`;
  };

  return {
    view: ({ attrs }) => {
      const {
        mode = 'indeterminate',
        value = 0,
        max = 100,
        size = 'medium',
        color = 'teal',
        colorIntensity,
        label,
        showPercentage = false,
        className = '',
        style = {},
        id = state.id,
        'aria-label': ariaLabel,
        'aria-valuemin': ariaValueMin = 0,
        'aria-valuemax': ariaValueMax = max,
        'aria-valuenow': ariaValueNow,
        'aria-valuetext': ariaValueText,
        ...params
      } = attrs;

      const isDeterminate = mode === 'determinate';
      const percentage = Math.min(100, Math.max(0, (value / max) * 100));

      // Determine label content
      const labelContent = label !== undefined ? label : showPercentage && isDeterminate ? `${Math.round(percentage)}%` : '';

      // Build class names
      const classNames = [
        'linear-progress',
        getColorClass(color, colorIntensity),
        className,
      ]
        .filter(Boolean)
        .join(' ');

      // ARIA attributes
      const ariaAttrs = isDeterminate
        ? {
            'aria-valuenow': ariaValueNow !== undefined ? ariaValueNow : value,
            'aria-valuemin': ariaValueMin,
            'aria-valuemax': ariaValueMax,
            'aria-valuetext': ariaValueText || `${Math.round(percentage)}%`,
          }
        : {
            'aria-valuetext': ariaValueText || label || 'Loading',
          };

      return m(
        '.linear-progress',
        {
          ...params,
          className: classNames,
          style,
          id,
        },
        [
          // Progress track container
          m(
            '.linear-progress__track',
            {
              className: `linear-progress__track ${getSizeClass(size)}`,
              role: 'progressbar',
              'aria-label': ariaLabel || (isDeterminate ? `Progress: ${Math.round(percentage)}%` : 'Loading'),
              ...ariaAttrs,
            },
            [
              // Progress bar
              m('.linear-progress__bar', {
                className: `linear-progress__bar ${isDeterminate ? '' : 'linear-progress__bar--indeterminate'}`,
                style: isDeterminate ? { width: `${percentage}%` } : undefined,
              }),
            ]
          ),

          // Label at the end (right side)
          labelContent &&
            m(
              '.linear-progress__label',
              {
                'aria-hidden': 'true',
              },
              labelContent
            ),
        ]
      );
    },
  };
};
