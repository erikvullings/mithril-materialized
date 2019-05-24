/// <reference types="materialize-css" />
import { FactoryComponent, Attributes, Vnode } from 'mithril';
export interface ICollapsibleItem extends Attributes {
    /** Header of the collabsible item, may contain HTML or may be a Vnode */
    header?: string | Vnode;
    /** Body of the collabsible item, may contain HTML or may be a Vnode */
    body?: string | Vnode;
    /** If active, preselect the collabsible item. */
    active?: boolean;
    /** Add an material icon in front of the header. */
    iconName?: string;
}
export interface ICollapsible extends Partial<M.CollapsibleOptions>, Attributes {
    /** The list of accordeon/collabsible items */
    items: ICollapsibleItem[];
}
export declare const CollapsibleItem: FactoryComponent<ICollapsibleItem>;
/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/collapsible.html
 */
export declare const Collapsible: FactoryComponent<ICollapsible>;
