import m, { FactoryComponent, Attributes } from 'mithril';
import { MaterialColor, ColorIntensity } from './types';

/** Badge positioning anchor origin */
export interface BadgeAnchorOrigin {
  /** Vertical positioning: 'top' | 'bottom' */
  vertical: 'top' | 'bottom';
  /** Horizontal positioning: 'left' | 'right' */
  horizontal: 'left' | 'right';
}

/** Badge display variant */
export type BadgeVariant = 'standard' | 'dot';

/** Badge overlap mode affecting positioning offset */
export type BadgeOverlap = 'rectangular' | 'circular';

/**
 * Badge component attributes
 *
 * Displays a badge anchored to a child element, commonly used for notifications,
 * counts, or status indicators.
 *
 * @example
 * ```typescript
 * // Standard notification badge
 * m(Badge, { badgeContent: 4 },
 *   m('button.btn', 'Notifications')
 * )
 *
 * // Dot variant with custom color
 * m(Badge, {
 *   variant: 'dot',
 *   color: 'green',
 *   anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
 * },
 *   m(Icon, { iconName: 'notifications' })
 * )
 *
 * // Badge with max value capping
 * m(Badge, { badgeContent: 150, max: 99 },
 *   m('span', 'Inbox')
 * )
 * ```
 */
export interface BadgeAttrs extends Attributes {
  /**
   * Content to display in badge (number or string)
   * For 'dot' variant, this is ignored
   */
  badgeContent?: string | number;

  /**
   * Maximum value to display - if badgeContent exceeds this, shows "max+"
   * @default undefined (no capping)
   */
  max?: number;

  /**
   * Badge positioning relative to child element
   * @default { vertical: 'top', horizontal: 'right' }
   */
  anchorOrigin?: BadgeAnchorOrigin;

  /**
   * Overlap mode affecting positioning offset
   * - 'rectangular': Badge positioned at corner edge
   * - 'circular': Badge overlaps slightly for circular child elements
   * @default 'rectangular'
   */
  overlap?: BadgeOverlap;

  /**
   * Badge display variant
   * - 'standard': Shows badgeContent
   * - 'dot': Displays minimal dot indicator
   * @default 'standard'
   */
  variant?: BadgeVariant;

  /**
   * Badge background color from MaterialColor palette
   * @default 'red'
   */
  color?: MaterialColor;

  /**
   * Color intensity modifier
   * @example 'lighten-2', 'darken-3'
   */
  colorIntensity?: ColorIntensity;

  /**
   * Force hide badge regardless of badgeContent
   * @default false
   */
  invisible?: boolean;

  /**
   * Show badge even when badgeContent is 0
   * @default false
   */
  showZero?: boolean;

  /**
   * ARIA label for accessibility
   * Automatically generated from badgeContent if not provided
   */
  'aria-label'?: string;

  /**
   * Additional CSS class for badge element (not wrapper)
   */
  badgeClassName?: string;

  /**
   * Additional CSS class for wrapper element
   */
  className?: string;
}

/**
 * Badge component
 *
 * Displays a badge anchored to a child element. Commonly used for notifications,
 * counts, or status indicators. Supports flexible positioning, colors, and variants.
 *
 * @example
 * ```typescript
 * // Basic notification badge
 * m(Badge, { badgeContent: 5 },
 *   m('button.btn', 'Messages')
 * )
 *
 * // Dot badge on avatar
 * m(Badge, {
 *   variant: 'dot',
 *   color: 'green',
 *   overlap: 'circular'
 * },
 *   m('img.circle', { src: 'avatar.jpg' })
 * )
 * ```
 */
export const Badge: FactoryComponent<BadgeAttrs> = () => {
  return {
    view: ({ attrs, children }) => {
      const {
        badgeContent,
        max,
        anchorOrigin = { vertical: 'top', horizontal: 'right' },
        overlap = 'rectangular',
        variant = 'standard',
        color = 'red',
        colorIntensity,
        invisible = false,
        showZero = false,
        'aria-label': ariaLabel,
        badgeClassName = '',
        className = '',
        ...params
      } = attrs;

      // === VALIDATION: Single child element ===
      const childArray = Array.isArray(children) ? children : children ? [children] : [];

      if (childArray.length === 0) {
        console.warn('Badge component requires a child element');
        return null;
      }

      if (childArray.length > 1) {
        console.warn('Badge component should only wrap a single child element. Using first child only.');
      }

      const child = childArray[0];

      // === VISIBILITY LOGIC ===
      // Hide badge if:
      // 1. invisible prop is true, OR
      // 2. For standard variant: badgeContent is undefined/null OR (badgeContent is 0 AND !showZero)
      const shouldHideBadge =
        invisible ||
        (variant === 'standard' &&
          (badgeContent === undefined ||
            badgeContent === null ||
            (badgeContent === 0 && !showZero)));

      // === BADGE CONTENT FORMATTING ===
      // Apply max capping: if badgeContent > max, show "max+"
      const getDisplayContent = (): string => {
        if (variant === 'dot') return '';

        if (typeof badgeContent === 'number' && max !== undefined && badgeContent > max) {
          return `${max}+`;
        }

        return String(badgeContent ?? '');
      };

      const displayContent = getDisplayContent();

      // === CSS CLASS ASSEMBLY ===
      // Wrapper classes
      const wrapperClasses = ['badge-wrapper', className].filter(Boolean).join(' ').trim() || undefined;

      // Badge element classes - using m-badge prefix to avoid Materialize conflicts
      const positionClass = `m-badge--${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;
      const badgeClasses = [
        'm-badge',
        `m-badge--${variant}`,
        positionClass,
        `m-badge--${overlap}`,
        `m-badge--${color}`,
        colorIntensity ? `m-badge--${colorIntensity}` : '',
        shouldHideBadge ? 'm-badge--invisible' : '',
        badgeClassName,
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

      // === ARIA ATTRIBUTES ===
      const badgeAriaLabel =
        ariaLabel ||
        (variant === 'dot'
          ? 'notification indicator'
          : displayContent
            ? `${displayContent} notifications`
            : 'notification badge');

      // === RENDER ===
      return m(
        '.badge-wrapper',
        {
          ...params,
          className: wrapperClasses,
        },
        [
          // Child element
          child,

          // Badge element - only render if not hidden
          !shouldHideBadge
            ? m(
                'span',
                {
                  className: badgeClasses,
                  'aria-label': badgeAriaLabel,
                  role: 'status',
                  'aria-live': 'polite',
                },
                variant === 'standard' ? displayContent : null
              )
            : null,
        ]
      );
    },
  };
};
