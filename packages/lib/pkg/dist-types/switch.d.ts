import { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import './styles/switch.css';
export interface ISwitchOptions extends Partial<IInputOptions<boolean>> {
    /** Left text label */
    left?: string;
    /** Right text label */
    right?: string;
    /** If checked is true, the switch is set in the right position. */
    checked?: boolean;
}
/** Component to display a switch with two values. */
export declare const Switch: FactoryComponent<ISwitchOptions>;
