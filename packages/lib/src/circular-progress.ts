import m, { FactoryComponent, Attributes } from 'mithril';
import { uniqueId } from './utils';
import { MaterialColor, ColorIntensity } from './types';

/** Progress mode - determinate shows specific progress, indeterminate shows loading animation */
export type ProgressMode = 'determinate' | 'indeterminate';

/** Progress size options */
export type ProgressSize = 'small' | 'medium' | 'large';

/** CircularProgress component attributes */
export interface CircularProgressAttrs extends Attributes {
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
  /** Label to display inside the circle */
  label?: string | number;
  /** Auto-show percentage inside circle for determinate mode (default: false) */
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

/** Size dimensions in pixels */
const SIZE_MAP: Record<ProgressSize, number> = {
  small: 36,
  medium: 50,
  large: 64,
};

/** Stroke width in pixels */
const STROKE_WIDTH = 3;

/** Create a CircularProgress component */
export const CircularProgress: FactoryComponent<CircularProgressAttrs> = () => {
  const state = {
    id: uniqueId(),
  };

  /**
   * Calculate SVG stroke properties for determinate progress
   */
  const calculateStrokeProperties = (size: number, value: number, max: number) => {
    const radius = (size - STROKE_WIDTH) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return {
      radius,
      circumference,
      strokeDashoffset,
      percentage,
    };
  };

  /**
   * Get size class name
   */
  const getSizeClass = (size: ProgressSize = 'medium'): string => {
    return `circular-progress--${size}`;
  };

  /**
   * Get color class name
   */
  const getColorClass = (color?: MaterialColor, intensity?: ColorIntensity): string => {
    if (!color) return '';
    return intensity ? `circular-progress--${color} circular-progress--${intensity}` : `circular-progress--${color}`;
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
      const sizePixels = SIZE_MAP[size];
      const { radius, circumference, strokeDashoffset, percentage } = isDeterminate
        ? calculateStrokeProperties(sizePixels, value, max)
        : { radius: 0, circumference: 0, strokeDashoffset: 0, percentage: 0 };

      // Determine label content
      const labelContent = label !== undefined ? label : showPercentage && isDeterminate ? `${Math.round(percentage)}%` : '';

      // Build class names
      const classNames = [
        'circular-progress',
        getSizeClass(size),
        getColorClass(color, colorIntensity),
        `circular-progress--${mode}`,
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
        '.circular-progress',
        {
          ...params,
          className: classNames,
          style: {
            width: `${sizePixels}px`,
            height: `${sizePixels}px`,
            ...style,
          },
          id,
          role: 'progressbar',
          'aria-label': ariaLabel || (isDeterminate ? `Progress: ${Math.round(percentage)}%` : 'Loading'),
          ...ariaAttrs,
        },
        [
          // SVG circle
          m(
            'svg.circular-progress__svg',
            {
              viewBox: `0 0 ${sizePixels} ${sizePixels}`,
              xmlns: 'http://www.w3.org/2000/svg',
            },
            [
              // Background track circle
              m('circle.circular-progress__circle.circular-progress__circle--track', {
                cx: sizePixels / 2,
                cy: sizePixels / 2,
                r: radius || (sizePixels - STROKE_WIDTH) / 2,
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': STROKE_WIDTH,
              }),

              // Progress indicator circle
              m('circle.circular-progress__circle.circular-progress__circle--indicator', {
                cx: sizePixels / 2,
                cy: sizePixels / 2,
                r: radius || (sizePixels - STROKE_WIDTH) / 2,
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': STROKE_WIDTH,
                'stroke-dasharray': isDeterminate ? circumference : undefined,
                'stroke-dashoffset': isDeterminate ? strokeDashoffset : undefined,
                'stroke-linecap': 'round',
              }),
            ]
          ),

          // Label inside circle
          labelContent &&
            m(
              '.circular-progress__label',
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
