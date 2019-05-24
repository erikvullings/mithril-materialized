import { FactoryComponent, Attributes, Vnode } from 'mithril';
export interface IInternalPaginationOption extends IPaginationOption {
    active?: boolean;
    title: number | Vnode;
}
export interface IPaginationOption extends Attributes {
    href: string;
    disabled?: boolean;
}
export interface IPaginationOptions extends Attributes {
    /**
     * How many items do we show
     * @default 9 or items.length
     */
    size?: number;
    /** The active page index */
    curPage?: number;
    items: IPaginationOption[];
}
export declare const Pagination: FactoryComponent<IPaginationOptions>;
