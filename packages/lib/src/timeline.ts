import m, { Vnode, FactoryComponent, Attributes } from 'mithril';
import './styles/timeline.css';
import { padLeft } from './utils';

export interface ITimelineItem {
  id?: string;
  title?: string;
  datetime: Date;
  iconName?: string;
  active?: boolean;
  content?: Vnode<any> | string;
}

interface IInternalTimelineItem extends ITimelineItem {
  /** Formatter for the dates, normally specified by Timeline component */
  dateFormatter: (d: Date) => string;
  /** Formatter for the time, normally specified by Timeline component */
  timeFormatter: (d: Date) => string;
  /** When an item is selected, call this function */
  onSelect?: (ti: ITimelineItem) => void;
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

const TimelineItem: FactoryComponent<IInternalTimelineItem> = () => {
  return {
    view: ({ attrs: { id, title, datetime, active, content, iconName, dateFormatter, timeFormatter, onSelect } }) => {
      const onclick = onSelect ? () => onSelect({ id, title, datetime, active, content }) : undefined;
      const style = onSelect ? 'cursor: pointer;' : undefined;
      return m(`li${active ? '.active' : ''}${id ? `[id=${id}]` : ''}`, { onclick, style }, [
        m('.mm_time', { datetime }, [m('span', dateFormatter(datetime)), m('span', timeFormatter(datetime))]),
        iconName ? m('.mm_icon', m('i.material-icons', iconName)) : undefined,
        m('.mm_label', [
          title ? m('h5', title) : undefined,
          content ? (typeof content === 'string' ? m('p', content) : content) : undefined,
        ]),
      ]);
    },
  };
};

/**
 * A timeline component to generate a simple vertical timeline based on Codrops' Vertical Timeline.
 * @see https://tympanus.net/codrops/2013/05/02/vertical-timeline/
 */
export const Timeline: FactoryComponent<ITimeline> = () => {
  const df = (d: Date) => `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
  const tf = (d: Date) => `${padLeft(d.getUTCHours())}:${padLeft(d.getUTCMinutes())}`;
  return {
    view: ({ attrs: { items, onSelect, timeFormatter = tf, dateFormatter = df } }) => {
      return m(
        'ul.mm_timeline',
        items.map(item => m(TimelineItem, { onSelect, dateFormatter, timeFormatter, ...item }))
      );
    },
  };
};
