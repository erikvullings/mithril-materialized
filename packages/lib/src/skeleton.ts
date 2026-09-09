import m, { type Attributes, type Component } from 'mithril';

export type SkeletonShape = 'text' | 'rectangular' | 'circular';
export type SkeletonSize = number | string;

export interface SkeletonAttrs extends Attributes {
  /** Placeholder shape. @default 'text' */
  shape?: SkeletonShape;
  /** Number of placeholders. @default 1 */
  count?: number;
  width?: SkeletonSize;
  height?: SkeletonSize;
  /** Enable the loading animation. @default true */
  animated?: boolean;
}

const cssSize = (value: SkeletonSize | undefined): string | undefined =>
  typeof value === 'number' ? `${value}px` : value;

/** Presentational loading placeholder hidden from assistive technology. */
export const Skeleton: Component<SkeletonAttrs> = {
  view: ({ attrs }) => {
    const {
      shape = 'text',
      count = 1,
      width,
      height,
      animated = true,
      className,
      style,
      ...htmlAttrs
    } = attrs;
    const itemCount = Math.max(1, Math.floor(count));
    const classes = [
      'mm-skeleton',
      `mm-skeleton--${shape}`,
      animated ? 'mm-skeleton--animated' : '',
    ]
      .filter(Boolean)
      .join(' ');
    const circularSize = shape === 'circular' ? width ?? height ?? 40 : undefined;

    return m(
      '.mm-skeleton-group',
      { ...htmlAttrs, 'aria-hidden': 'true', className, style },
      Array.from({ length: itemCount }, () =>
        m('span', {
          className: classes,
          style: {
            width: cssSize(circularSize ?? width),
            height: cssSize(circularSize ?? height),
          },
        })
      )
    );
  },
};
