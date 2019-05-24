/// <reference types="materialize-css" />
import m, { Attributes } from 'mithril';
export interface ISelectOption<T> {
    id?: T;
    label: string;
    disabled?: boolean;
}
export interface ISelectOptions<T> extends Attributes, Partial<M.FormSelectOptions> {
    /** Options to select from */
    options: Array<ISelectOption<T>>;
    /** Called when the value is changed, either contains a single or all selected (checked) ids */
    onchange: (value?: T | T[]) => void;
    /** Selected id or ids (in case of multiple options) */
    checkedId?: T | T[];
    /** Select a single option or multiple options */
    multiple?: boolean;
    /** Optional label. */
    label?: string;
    /** Optional ID. */
    id?: string;
    /** Unique key for use of the element in an array. */
    key?: string | number;
    /** Add a a placeholder to the input field. */
    placeholder?: string;
    /** Add a description underneath the input field. */
    helperText?: string;
    /** Uses Materialize icons as a prefix or postfix. */
    iconName?: string;
    /** Sets the input field to disabled. */
    disabled?: boolean;
    /** Optional style information. */
    style?: string;
    /** If true, break to a new row */
    newRow?: boolean;
    /**
     * If true, add a mandatory * after the label (if any),
     * and add the required and aria-required attributes to the input element.
     */
    isMandatory?: boolean;
    /** Add the required and aria-required attributes to the input element */
    required?: boolean;
}
/** Component to select from a list of values in a dropdowns */
export declare const Select: <T extends string | number>() => m.Component<ISelectOptions<T>, {}>;
