import { CodeBlock, Timeline } from 'mithril-materialized';
import m from 'mithril';

export const TimelinePage = () => {
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
          items: [
            {
              title: 'Test 1',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 9, 0, 0),
              content: 'Hello world',
            },
            {
              title: 'Test 2',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 9, 30, 0),
              content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus maximus erat, 
              vitae placerat nisl blandit tincidunt. Vestibulum libero turpis, bibendum sit amet rutrum a,
              malesuada at diam. Praesent id dignissim ligula. Donec nec finibus lectus. Curabitur in
              sollicitudin sem. Nulla neque est, elementum et lectus ut, luctus elementum metus.`,
            },
            {
              title: 'Test 3',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 9, 45, 0),
              content: 'Hello world',
              active: true,
            },
            {
              title: 'Test 4',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 10, 5, 0),
              content: 'Hello world',
            },
            {
              title: 'Test 5',
              iconName: 'play_arrow',
              datetime: new Date(2019, 2, 3, 10, 11, 0),
              content: 'Hello world',
            },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Timeline, {
            items: [
              {
                title: 'Test 1',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 0, 0),
                content: 'Hello world',
              },
              {
                title: 'Test 2',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 30, 0),
                content: 'Lorem ipsum ...',
              },
              {
                title: 'Test 3',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 45, 0),
                content: 'Hello world',
                active: true,
              },
              {
                title: 'Test 4',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 10, 5, 0),
                content: 'Hello world',
              },
              {
                title: 'Test 5',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 10, 11, 0),
                content: 'Hello world',
              },
            ],
          })`,
        }),
      ]),
  };
};
