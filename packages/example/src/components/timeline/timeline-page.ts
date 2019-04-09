import { CodeBlock, Timeline, padLeft, Collection, Icon } from 'mithril-materialized';
import m from 'mithril';

export const TimelinePage = () => {
  const timeFormatter = (d: Date) =>
    `${padLeft(d.getHours())}:${padLeft(d.getMinutes())}:${padLeft(d.getSeconds())}`;

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Timeline'),
        m('p', [
          'A simple timeline component based on ',
          m(
            'a[href=https://tympanus.net/codrops/2013/05/02/vertical-timeline/][target=_blank]',
            `Codrops\' Vertical Timeline`
          ),
          '.',
        ]),

        m('h3.header', 'Timeline'),
        m(Timeline, {
          onSelect: (item: unknown) => console.table(item),
          timeFormatter,
          items: [
            {
              id: '1',
              title: 'Test a string',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 9, 0, 0),
              content: 'Hello world',
            },
            {
              id: '2',
              title: 'Test a long text',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 9, 30, 0),
              content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus maximus erat,
              vitae placerat nisl blandit tincidunt. Vestibulum libero turpis, bibendum sit amet rutrum a,
              malesuada at diam. Praesent id dignissim ligula. Donec nec finibus lectus. Curabitur in
              sollicitudin sem. Nulla neque est, elementum et lectus ut, luctus elementum metus.`,
            },
            {
              id: '3',
              title: 'Test an active item',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 9, 45, 0),
              content: 'Hello world',
              active: true,
            },
            {
              id: '4',
              title: 'Test Vnode content',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 10, 5, 0),
              content: m(Collection, {
                style: 'color: black;',
                items: [
                  { title: 'John', iconName: 'send' },
                  { title: 'Mary', iconName: 'send' },
                  { title: 'Pete', iconName: 'send' },
                ],
              }),
            },
            {
              id: '5',
              title: 'Test other icon',
              iconName: 'visibility',
              datetime: new Date(2019, 2, 3, 10, 11, 0),
              content: 'Hello world',
            },
            {
              id: '6',
              iconName: 'visibility_off',
              datetime: new Date(2019, 2, 3, 10, 15, 0),
              content: 'No title, only content',
            },
            {
              id: '7',
              title: m('i', [
                'Test a Vnode',
                m(Icon, { className: 'small', style: 'float: right;', iconName: 'directions_run' }),
              ]),
              iconName: 'visibility',
              datetime: new Date(2019, 2, 3, 10, 21, 0),
            },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Timeline, {
            onSelect: (item: ITimelineItem) => console.table(item),
            timeFormatter, // Adds seconds to time format
            items: [
              {
                title: 'Test a string',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 0, 0),
                content: 'Hello world',
              },
              {
                title: 'Test a long text',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 30, 0),
                content: 'Lorem ipsum ...',
              },
              {
                title: 'Test an active item',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 45, 0),
                content: 'Hello world',
                active: true,
              },
              {
                title: 'Test Vnode content',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 10, 5, 0),
                content: m(Collection, {
                  style: 'color: black;', // otherwise the titles are in white
                  items: [
                    { title: 'John', iconName: 'send' },
                    { title: 'Mary', iconName: 'send' },
                    { title: 'Pete', iconName: 'send' },
                  ],
                }),
              },
              {
                title: 'Test other icon',
                iconName: 'visibility',
                datetime: new Date(2019, 2, 3, 10, 11, 0),
                content: 'Hello world',
              },
              {
                id: '6',
                iconName: 'visibility_off',
                datetime: new Date(2019, 2, 3, 10, 15, 0),
                content: 'No title, only content',
              },
              {
                id: '7',
                title: m('i', [
                  'Test a Vnode',
                  m(Icon, { className: 'small', style: 'float: right;', iconName: 'directions_run' }),
                ]),
                iconName: 'visibility',
                datetime: new Date(2019, 2, 3, 10, 21, 0),
              },
            ],
          })`,
        }),
      ]),
  };
};
