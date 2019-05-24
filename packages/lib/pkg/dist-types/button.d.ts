import m, { Attributes } from 'mithril';
export interface IHtmlAttributes {
    id?: string;
    for?: string;
    placeholder?: string;
    autofocus?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'text' | 'textarea' | 'number';
}
export interface IMaterialButton extends Attributes {
    /** Optional (e.g. in case you only want to use an icon) button label */
    label?: string;
    /** Optional icon material-icons name, @see https://materializecss.com/icons.html */
    iconName?: string;
    /** Optional icon class, e.g. tiny (1em), small (2em), medium (4em), large (6em), or 'tiny right' */
    iconClass?: string;
    /**
     * If the button is intended to open a modal, specify its modal id so we can trigger it,
     * @see https://materializecss.com/modals.html
     */
    modalId?: string;
    /** Some additional HTML attributes that can be attached to the button */
    attr?: IHtmlAttributes;
    /** Optional text-based tooltip, @see https://materializecss.com/tooltips.html */
    tooltip?: string;
    /** Optional location for the tooltip */
    tooltipPostion?: 'top' | 'bottom' | 'left' | 'right';
}
/**
 * A factory to create new buttons.
 *
 * @example FlatButton = ButtonFactory('a.waves-effect.waves-teal.btn-flat');
 */
export declare const ButtonFactory: (defaultClassNames: string, attributes?: string) => m.FactoryComponent<IMaterialButton>;
export declare const Button: m.FactoryComponent<IMaterialButton>;
export declare const LargeButton: m.FactoryComponent<IMaterialButton>;
export declare const SmallButton: m.FactoryComponent<IMaterialButton>;
export declare const FlatButton: m.FactoryComponent<IMaterialButton>;
export declare const RoundIconButton: m.FactoryComponent<IMaterialButton>;
export declare const SubmitButton: m.FactoryComponent<IMaterialButton>;
