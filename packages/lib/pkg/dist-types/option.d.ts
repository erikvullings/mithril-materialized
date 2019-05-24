import { Vnode, FactoryComponent, Attributes } from 'mithril';
export interface IInputCheckbox extends Attributes {
    /** Optional event handler when a checkbox is clicked */
    onchange?: (checked: boolean) => void;
    /** Label of the checkbox, can be a string or Vnode */
    label: string | Vnode;
    /** If true, the checkbox is checked */
    checked?: boolean;
    /** If true, the checkbox is disabled */
    disabled?: boolean;
}
/** Component to show a check box */
export declare const InputCheckbox: FactoryComponent<IInputCheckbox>;
export interface IInputOption extends Attributes {
    /** Option ID */
    id: string;
    /** Title or label */
    label: string;
    /** Is the option selected? */
    isChecked?: boolean;
}
export interface IOptions extends Attributes {
    /** Element ID */
    id?: string;
    /** Optional title or label */
    label?: string;
    /** The options that you have */
    options: IInputOption[];
    /** Event handler that is called when an option is changed */
    onchange?: (isChecked: boolean, id: string, option: IInputOption) => void;
    /** Optional description */
    description?: string;
    /** Optional CSS that is added to the input checkbox */
    checkboxClass?: string;
    /** If true, start on a new row */
    newRow?: boolean;
    /** If true, add a mandatory '*' after the label */
    isMandatory?: boolean;
}
/** A list of checkboxes */
export declare const Options: FactoryComponent<IOptions>;
