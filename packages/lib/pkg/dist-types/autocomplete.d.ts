/// <reference types="materialize-css" />
import { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
export interface IAutoCompleteOptions extends Partial<M.AutocompleteOptions>, IInputOptions<string> {
}
/** Component to auto complete your text input */
export declare const Autocomplete: FactoryComponent<IAutoCompleteOptions>;
