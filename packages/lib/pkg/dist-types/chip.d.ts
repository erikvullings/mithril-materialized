/// <reference types="materialize-css" />
import { FactoryComponent, Attributes } from 'mithril';
export interface IChipsOptions extends Partial<M.ChipsOptions>, Attributes {
    onchange?: (chips: M.ChipData[]) => void;
}
/** Chips and tags */
export declare const Chips: FactoryComponent<IChipsOptions>;
