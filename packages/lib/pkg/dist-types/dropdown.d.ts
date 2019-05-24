/// <reference types="materialize-css" />
import m, { Attributes } from 'mithril';
export interface IDropdownOption<T> {
    /** ID property of the selected item */
    id?: T;
    /** Label to show in the dropdown */
    label: string;
    /** Can we select the item */
    disabled?: boolean;
    /** Display a Materials Icon in front of the label */
    iconName?: string;
    /** Add a divider */
    divider?: boolean;
}
export interface IDropdownOptions<T> extends Partial<M.DropdownOptions>, Attributes {
    /**
     * Optional id of the dropdown element
     * @default 'dropdown'
     */
    id?: string;
    /**
     * Optional label when no item is selected
     * @default 'Select'
     */
    label?: string;
    key?: string;
    /** Item array to show in the dropdown. If the value is not supplied, uses he name. */
    items: Array<IDropdownOption<T>>;
    /** Selected value or name */
    checkedId?: T;
    /** When a value or name is selected */
    onchange?: (value: T) => void;
    /** Uses Materialize icons as a prefix or postfix. */
    iconName?: string;
    /** Add a description underneath the input field. */
    helperText?: string;
}
/** Dropdown component */
export declare const Dropdown: <T extends string | number>() => m.Component<IDropdownOptions<T>, {}>;
