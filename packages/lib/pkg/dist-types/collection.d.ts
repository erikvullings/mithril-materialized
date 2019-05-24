import { FactoryComponent, Attributes, Vnode } from 'mithril';
export declare enum CollectionMode {
    BASIC = 0,
    LINKS = 1,
    AVATAR = 2
}
export interface ICollectionItem extends Attributes {
    /** Title of the collection item */
    title: string | Vnode;
    /** For links, may contain a URL reference */
    href?: string;
    /** For Avatar mode, may contain a URL reference to an image or a material icons class name */
    avatar?: string;
    /** Add a class to the avatar image or icon, e.g. a color 'red'. */
    className?: string;
    /** For Avatar mode, may contain a two-line trusted HTML content */
    content?: string;
    /** If active, preselect the collection item. */
    active?: boolean;
    /** Add a material icon as secondary content. */
    iconName?: string;
    /** Onclick event handler */
    onclick?: (item: ICollectionItem) => void;
}
export interface ICollection extends Attributes {
    /** Optional header */
    header?: string;
    /** The list of items */
    items: ICollectionItem[];
    /** Mode of operation */
    mode?: CollectionMode;
}
export declare const SecondaryContent: FactoryComponent<ICollectionItem>;
export declare const ListItem: FactoryComponent<{
    item: ICollectionItem;
    mode: CollectionMode;
}>;
export declare const AnchorItem: FactoryComponent<ICollectionItem>;
/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/collapsible.html
 */
export declare const Collection: FactoryComponent<ICollection>;
