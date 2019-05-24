import { FactoryComponent, Component, Attributes } from 'mithril';
import './styles/input.css';
export declare const Mandatory: Component;
export interface IMaterialLabel extends Attributes {
    /** Optional title/label */
    label?: string;
    /** Optional ID */
    id?: string;
    /** If true, add a mandatory '*' after the label */
    isMandatory?: boolean;
    /** Add the active class to the label */
    isActive?: boolean | string;
}
/** Simple label element, used for most components. */
export declare const Label: FactoryComponent<IMaterialLabel>;
export interface IHelperTextOptions extends Attributes {
    helperText?: string;
    dataError?: string;
    dataSuccess?: string;
}
/** Create a helper text, often used for displaying a small help text. May be replaced by the validation message. */
export declare const HelperText: FactoryComponent<IHelperTextOptions>;
