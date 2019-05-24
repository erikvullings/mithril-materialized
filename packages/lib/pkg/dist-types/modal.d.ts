/// <reference types="materialize-css" />
import { FactoryComponent, Vnode, Attributes } from 'mithril';
export interface IMaterialModal extends Attributes {
    id: string;
    title: string;
    description?: string | Vnode<any>;
    /** Set to true when the description contains HTML */
    richContent?: boolean;
    /** Fixate the footer, so you can show more content. */
    fixedFooter?: boolean;
    /** Display on the bottom */
    bottomSheet?: boolean;
    /** Materialize css' modal options */
    options?: Partial<M.ModalOptions>;
    /** Menu buttons, from left to right */
    buttons?: Array<{
        label: string;
        onclick?: () => void;
    }>;
}
/** Builds a modal panel, which can be triggered using its id */
export declare const ModalPanel: FactoryComponent<IMaterialModal>;
