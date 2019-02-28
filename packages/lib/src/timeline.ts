import m, { Vnode, FactoryComponent, Attributes } from 'mithril';
import './styles/timeline.css';
import { padLeft } from './utils';

export interface ITimelineItem {
  title: string;
  datetime: Date;
  iconName?: string;
  active?: boolean;
  content?: Vnode | string;
}

export interface ITimeline extends Attributes {
  items: ITimelineItem[];
  onSelect?: (ti: ITimelineItem) => void;
}

export const TimelineItem: FactoryComponent<ITimelineItem> = () => {
  const date = (d: Date) => `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
  const time = (d: Date) => `${padLeft(d.getUTCHours())}:${padLeft(d.getUTCMinutes())}:${padLeft(d.getUTCSeconds())}`;
  return {
    view: ({ attrs: { title, datetime, active, content, iconName } }) => {
      return m(`li${active ? '.active' : ''}`, [
        m('time.mm_time', { datetime }, [
          m('span', date(datetime)),
          m('span', time(datetime)),
        ]),
        iconName ? m('.mm_icon', m('i.material-icons', iconName)) : undefined,
        m('.mm_label', [
          m('h5', title),
          content ? (typeof content === 'string' ? m('p', content) : content) : undefined,
        ]),
      ]);
    },
  };
};

export const Timeline: FactoryComponent<ITimeline> = () => {
  return {
    view: ({ attrs: { items }}) => {
      return m('ul.mm_timeline', items.map(item => m(TimelineItem, item)));
    },
  };
};
