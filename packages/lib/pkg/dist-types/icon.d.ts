import { FactoryComponent, Attributes } from 'mithril';
export interface IMaterialIcon extends Attributes {
    iconName: string;
}
/**
 * A simple material icon, defined by its icon name.
 *
 * @example m(Icon, { class: 'small' }, 'create') renders a small 'create' icon
 * @example m(Icon, { class: 'prefix' }, iconName) renders the icon as a prefix
 */
export declare const Icon: FactoryComponent<IMaterialIcon>;
