/// <reference types="materialize-css" />
import { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
/** Component to pick a date */
export declare const DatePicker: FactoryComponent<IInputOptions<Date> & Partial<M.DatepickerOptions>>;
/** Component to pick a time */
export declare const TimePicker: FactoryComponent<IInputOptions & Partial<M.TimepickerOptions>>;
