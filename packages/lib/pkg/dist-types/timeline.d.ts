import { Vnode, FactoryComponent, Attributes } from 'mithril';
import './styles/timeline.css';
export interface ITimelineItem {
    id?: string;
    title?: Vnode<any> | string;
    datetime: Date;
    iconName?: string;
    active?: boolean;
    content?: Vnode<any> | string;
}
export interface ITimeline extends Attributes {
    items: ITimelineItem[];
    /** When an item is selected, call this function */
    onSelect?: (ti: ITimelineItem) => void;
    /** Formatter for the dates, @default date/month/year in UTC */
    dateFormatter?: (d: Date) => string;
    /** Formatter for the time @default HH:mm in UTC */
    timeFormatter?: (d: Date) => string;
}
/**
 * A timeline component to generate a simple vertical timeline based on Codrops' Vertical Timeline.
 * @see https://tympanus.net/codrops/2013/05/02/vertical-timeline/
 */
export declare const Timeline: FactoryComponent<ITimeline>;
