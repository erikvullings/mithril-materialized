import { FactoryComponent, Attributes } from 'mithril';
import './styles/map-editor.css';
import { ICollectionItem } from './collection';
export interface IMapEditor extends Attributes {
    /** Optional ID of the element */
    id?: string;
    /** If true, displays a header over the map */
    header?: string;
    /** Instead of a header, use a label */
    label?: string;
    /** Places a required * after the label */
    isMandatory?: boolean;
    /**
     * Optional value for the key label
     * @default: "Key"
     */
    labelKey?: string;
    /**
     * Optional value for the value label
     * @default: "Value"
     */
    labelValue?: string;
    /** If true, the item cannot be edited */
    disabled?: boolean;
    /** Icon for the properties' collection */
    iconName?: string;
    /** Icon for the key editor: if none provided, and the iconName is set, uses 'label' */
    iconNameKey?: string;
    /** If true, do not parse arrays like [1, 2, 3] into number[] or [a, b, c] into a string[] */
    disallowArrays?: boolean;
    /** The actual map of key-value pairs supports numbers, strings, booleans and arrays of strings and numbers. */
    properties: {
        [key: string]: number | string | boolean | Array<string | number>;
    };
    /**
     * Called when the properties collection has changed. Not needed if you are performing a direct edit on the
     * properties object, but in case you have created a mapping, this allows you to convert the object back again.
     */
    onchange?: (properties: {
        [key: string]: number | string | boolean | Array<string | number>;
    }) => void;
    /**
     * In order to create a boolean, you first have to enter a truthy or falsy value.
     * Default 'true' and 'false', but you can add more options.
     */
    truthy?: string[];
    /**
     * In order to create a boolean, you first have to enter a truthy or falsy value.
     * Default 'true' and 'false', but you can add more options.
     */
    falsy?: string[];
    /**
     * Optional function to replace the render function of a key-value pair.
     * The ICollectionItems's title may be a Vnode.
     */
    keyValueConverter?: (key: string, value: number | string | boolean | Array<string | number>) => ICollectionItem;
    /** Optional class to apply to the key column, @default .col.s4 */
    keyClass?: string;
    /** Optional class to apply to the value column, @default .col.s8 */
    valueClass?: string;
}
/** A simple viewer and/or editor for a map of key - value pairs */
export declare const MapEditor: FactoryComponent<IMapEditor>;
