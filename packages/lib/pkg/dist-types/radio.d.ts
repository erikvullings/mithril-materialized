import { FactoryComponent, Attributes } from 'mithril';
export interface IRadioButtons extends Attributes {
    label: string;
    options: Array<{
        id: string;
        label: string;
    }>;
    onchange: (id: string) => void;
    checkedId?: string;
    description?: string;
    newRow?: boolean;
}
/** Component to show a list of radio buttons, from which you can choose one. */
export declare const RadioButtons: FactoryComponent<IRadioButtons>;
export interface IRadioButton extends Attributes {
    id: string;
    checked?: boolean;
    onchange: (id: string) => void;
    label: string;
    groupId: string;
    disabled?: boolean;
}
export declare const RadioButton: FactoryComponent<IRadioButton>;
