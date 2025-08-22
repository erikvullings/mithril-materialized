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
  chevron: [
    'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z', // chevron down
    'M0 0h24v24H0z', // background
  ],
  expand: [
    'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z', // plus
    'M0 0h24v24H0z', // background
  ],
  collapse: [
    'M19 13H5v-2h14v2z', // minus
    'M0 0h24v24H0z', // background
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
        left: 90,
        right: -90,
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
