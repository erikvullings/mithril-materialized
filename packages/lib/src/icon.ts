import m, { FactoryComponent, Attributes } from 'mithril';

export interface IconAttrs extends Attributes {
  iconName: string;
}

/**
 * A simple material icon, defined by its icon name.
 *
 * @example m(Icon, { className: 'small' }, 'create') renders a small 'create' icon
 * @example m(Icon, { className: 'prefix' }, iconName) renders the icon as a prefix
 */
export const Icon: FactoryComponent<IconAttrs> = () => ({
  view: ({ attrs: { iconName, ...passThrough } }) => m('i.material-icons', passThrough, iconName),
});
