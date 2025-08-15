import m, { FactoryComponent, Attributes } from 'mithril';

const iconPaths = {
  caret: [
    'M7 10l5 5 5-5z', // arrow
    'M0 0h24v24H0z', // background
  ],
  close: [
    'M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z',
    'M0 0h24v24H0z',
  ],
} as const;

type IconName = keyof typeof iconPaths;

export interface MaterialIconAttrs extends Attributes {
  name: IconName;
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: Record<string, string>;
  onclick?: (e: MouseEvent) => void;
}

export const MaterialIcon: FactoryComponent<MaterialIconAttrs> = () => {
  return {
    view: ({ attrs }) => {
      const { name, direction = 'down', style, ...props } = attrs;

      const rotationMap: Record<string, number> = {
        down: 0,
        up: 180,
        left: -90,
        right: 90,
      };

      const rotation = rotationMap[direction] ?? 0;
      const transform = rotation ? `rotate(${rotation}deg)` : undefined;

      return m(
        'svg',
        {
          ...props,
          style: { transform, ...style },
          height: '1lh',
          width: '24',
          viewBox: '0 0 24 24',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        iconPaths[name].map((d) =>
          m('path', {
            d,
            fill: d.includes('M0 0h24v24H0z') ? 'none' : 'currentColor',
          })
        )
      );
    },
  };
};
