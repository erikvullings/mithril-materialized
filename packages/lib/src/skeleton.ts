import m, { type Attributes, type Component } from 'mithril';
import type { ComponentStyle } from './types';

export type SkeletonShape = 'text' | 'rectangular' | 'circular';
export type SkeletonSize = number | string;

export interface SkeletonAttrs extends Attributes {
  /** Placeholder shape. @default 'text' */
  shape?: SkeletonShape;
  /** Number of placeholders. @default 1 */
  count?: number;
  width?: SkeletonSize;
  height?: SkeletonSize;
  /** CSS margin applied to the skeleton group. Numbers are interpreted as pixels. */
  margin?: SkeletonSize;
  /** Enable the loading animation. @default true */
  animated?: boolean;
  className?: string;
  style?: ComponentStyle;
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
      margin,
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
    const groupStyle =
      margin === undefined
        ? style
        : typeof style === 'string'
          ? `margin:${cssSize(margin)};${style}`
          : { margin: cssSize(margin), ...style };

    return m(
      '.mm-skeleton-group',
      { ...htmlAttrs, 'aria-hidden': 'true', className, style: groupStyle },
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
