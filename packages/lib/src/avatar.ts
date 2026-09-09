import m, { Attributes, FactoryComponent, Vnode } from 'mithril';
import { MaterialIcon, type IconName } from './material-icon';
import type { ComponentSize, ComponentStyle } from './types';

export type AvatarShape = 'circle' | 'rounded' | 'square';

export interface AvatarAttrs extends Attributes {
  /** Image URL. Failed URLs fall back to text, initials, or the configured icon. */
  src?: string;
  /** Accessible name. Use an empty string for a decorative avatar. */
  alt?: string;
  /** Display name used to derive at most two initials when no image is available. */
  name?: string;
  /** Explicit short fallback text, rendered instead of derived initials. */
  text?: string;
  /** Material icon used when neither image nor text content is available. */
  iconName?: IconName;
  /** @default 'medium' */
  size?: ComponentSize;
  /** @default 'circle' */
  shape?: AvatarShape;
  disabled?: boolean;
  className?: string;
  style?: ComponentStyle;
}

export interface AvatarGroupAttrs extends Attributes {
  /** Maximum number of supplied avatars shown before the overflow indicator. */
  max?: number;
  /** Total identities represented when not every avatar is supplied as a child. */
  totalCount?: number;
  /** Overlap between adjacent avatars in pixels. @default 8 */
  overlap?: number;
  /** Accessible label for the group. @default 'Avatar group' */
  ariaLabel?: string;
  /** Formats the accessible overflow label. */
  overflowLabel?: (count: number) => string;
  className?: string;
  style?: ComponentStyle;
  dir?: 'ltr' | 'rtl';
}

const takeCharacters = (value: string, count: number) =>
  Array.from(value).slice(0, count).join('');

/**
 * Derives up to two uppercase initials. Single words use their first two
 * characters; multi-word names use the first character of the first and last words.
 */
export const getAvatarInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const initials =
    words.length === 1
      ? takeCharacters(words[0], 2)
      : `${takeCharacters(words[0], 1)}${takeCharacters(words[words.length - 1], 1)}`;
  return initials.toLocaleUpperCase();
};

export const Avatar: FactoryComponent<AvatarAttrs> = () => {
  const failedSources = new Set<string>();

  return {
    view: ({ attrs }) => {
      const {
        src,
        alt,
        name,
        text,
        iconName = 'person',
        size = 'medium',
        shape = 'circle',
        disabled = false,
        className,
        style,
        ...htmlAttrs
      } = attrs;
      const accessibleName = alt === '' ? undefined : alt ?? name ?? text;
      const decorative = !accessibleName;
      const showImage = Boolean(src && !failedSources.has(src));
      const fallbackText = text ?? (name ? getAvatarInitials(name) : '');

      return m(
        'span',
        {
          ...htmlAttrs,
          class: [
            'mm-avatar',
            `mm-avatar--${size}`,
            `mm-avatar--${shape}`,
            disabled ? 'mm-avatar--disabled' : '',
            className,
          ]
            .filter(Boolean)
            .join(' '),
          style,
          role: decorative ? undefined : 'img',
          'aria-label': accessibleName,
          'aria-hidden': decorative ? 'true' : undefined,
        },
        showImage
          ? m('img.mm-avatar-image', {
              src,
              alt: '',
              'aria-hidden': 'true',
              draggable: false,
              onerror: () => {
                if (src) failedSources.add(src);
              },
            })
          : fallbackText
            ? m('span.mm-avatar-text[aria-hidden=true]', fallbackText)
            : m(MaterialIcon, {
                name: iconName,
                'aria-hidden': 'true',
                focusable: 'false',
              })
      );
    },
  };
};

export const AvatarGroup: FactoryComponent<AvatarGroupAttrs> = () => ({
  view: ({ attrs, children }: Vnode<AvatarGroupAttrs>) => {
    const {
      max,
      totalCount,
      overlap = 8,
      ariaLabel = 'Avatar group',
      overflowLabel = (count) => `${count} more`,
      className,
      style,
      ...htmlAttrs
    } = attrs;
    const avatars = Array.isArray(children)
      ? children
      : children === null || children === undefined || typeof children === 'boolean'
        ? []
        : [children];
    const visibleCount =
      max === undefined
        ? avatars.length
        : Math.min(avatars.length, Math.max(0, Math.floor(max)));
    const overflowCount = Math.max(totalCount ?? avatars.length, avatars.length) - visibleCount;
    const safeOverlap = Math.max(0, overlap);
    const groupStyle =
      typeof style === 'string'
        ? `--mm-avatar-group-overlap:${safeOverlap}px;${style}`
        : { '--mm-avatar-group-overlap': `${safeOverlap}px`, ...style };

    return m(
      'div',
      {
        ...htmlAttrs,
        class: ['mm-avatar-group', className].filter(Boolean).join(' '),
        style: groupStyle,
        role: 'group',
        'aria-label': ariaLabel,
      },
      [
        ...avatars
          .slice(0, visibleCount)
          .map((avatar) => m('span.mm-avatar-group-item', avatar)),
        overflowCount > 0 &&
          m(
            'span.mm-avatar-group-item.mm-avatar-group-overflow',
            {
              role: 'img',
              'aria-label': overflowLabel(overflowCount),
            },
            m('span[aria-hidden=true]', `+${overflowCount}`)
          ),
      ]
    );
  },
});
