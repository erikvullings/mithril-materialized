import m, { FactoryComponent, Attributes } from 'mithril';
import { IInputOptions } from './input-options';
import './styles/input.css';
/** Create a TextArea */
export declare const TextArea: FactoryComponent<IInputOptions<string>>;
export declare type InputType = 'url' | 'color' | 'text' | 'number' | 'email' | 'range';
/** Component for entering some text */
export declare const TextInput: m.FactoryComponent<IInputOptions<string>>;
/** Component for entering a number */
export declare const NumberInput: m.FactoryComponent<IInputOptions<number>>;
/** Component for entering a URL */
export declare const UrlInput: m.FactoryComponent<IInputOptions<string>>;
/** Component for entering a color */
export declare const ColorInput: m.FactoryComponent<IInputOptions<string>>;
/** Component for entering a range */
export declare const RangeInput: m.FactoryComponent<IInputOptions<number>>;
/** Component for entering an email */
export declare const EmailInput: m.FactoryComponent<IInputOptions<string>>;
export interface IFileInputOptions extends Attributes {
    /** Adds a placeholder message */
    placeholder?: string;
    /** If true, upload multiple files */
    multiple?: boolean;
    /** Called when the file input is changed */
    onchange?: (files: FileList) => void;
    /** If true, disable the box */
    disabled?: boolean;
    /**
     * Accepted file types, e.g. image/png, image/jpeg,
     * any image/*, video/*. audio/*, .pdf, a valid MIME type string, with no extensions, etc.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
     */
    accept?: string | string[];
}
/** Component for uploading a file */
export declare const FileInput: FactoryComponent<IFileInputOptions>;
