import m from 'mithril';
import './styles/timeline.css';
import { padLeft } from './utils';
const TimelineItem = () => {
    return {
        view: ({ attrs: { id, title, datetime, active, content, iconName, dateFormatter, timeFormatter, onSelect } }) => {
            const onclick = onSelect ? () => onSelect({ id, title, datetime, active, content }) : undefined;
            const style = onSelect ? 'cursor: pointer;' : undefined;
            return m(`li${active ? '.active' : ''}${id ? `[id=${id}]` : ''}`, { onclick, style }, [
                m('.mm_time', { datetime }, [m('span', dateFormatter(datetime)), m('span', timeFormatter(datetime))]),
                iconName ? m('.mm_icon', m('i.material-icons', iconName)) : undefined,
                m('.mm_label', [
                    title ? typeof title === 'string' ? m('h5', title) : title : undefined,
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
export const Timeline = () => {
    const df = (d) => `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
    const tf = (d) => `${padLeft(d.getUTCHours())}:${padLeft(d.getUTCMinutes())}`;
    return {
        view: ({ attrs: { items, onSelect, timeFormatter = tf, dateFormatter = df } }) => {
            return m('ul.mm_timeline', items.map(item => m(TimelineItem, { onSelect, dateFormatter, timeFormatter, ...item })));
        },
    };
};
//# sourceMappingURL=timeline.js.map