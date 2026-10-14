import m, { FactoryComponent, Attributes } from 'mithril';
import { isMaterialIconName, MaterialIcon } from './material-icon';

export interface IconAttrs extends Attributes {
  iconName: string;
}

/**
 * Built-in icon names render as SVG; custom names retain the Material Icons font fallback.
 *
 * @example m(Icon, { iconName: 'create', className: 'small' }) renders a small icon
 * @example m(Icon, { iconName: 'person', className: 'prefix' }) renders a prefix SVG
 */
export const Icon: FactoryComponent<IconAttrs> = () => ({
  view: ({ attrs: { iconName, className, ...passThrough } }) =>
    isMaterialIconName(iconName)
      ? m(MaterialIcon, {
          ...passThrough,
          name: iconName,
          className: ['mm-icon', className].filter(Boolean).join(' '),
          'aria-hidden': 'true',
        })
      : m('i.material-icons', { ...passThrough, className, 'aria-hidden': 'true' }, iconName),
});
