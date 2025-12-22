import { CodeBlock, Collapsible, Collection, CollectionItem, CollectionMode } from 'mithril-materialized';
import m from 'mithril';

const onclick = (item: CollectionItem) => alert(`You clicked ${item.title}.`);

export const CollectionsPage = () => {
  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Collections and collapsible'),
        m('p', [
          'For more information, see ',
          m('a[href=https://materializecss.com/collections.html][target=_blank]', 'Collections'),
          ' and ',
          m('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collapsible'),
          '.',
        ]),

        m('h3.header', 'Secondary Content Collection'),
        m(Collection, {
          items: [
            { id: '1', title: 'John', iconName: 'send', onclick },
            { id: '2', title: 'Mary', iconName: 'send', onclick },
            { id: '3', title: 'Pete', iconName: 'send', onclick },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            items: [
              // id is used as key, e.g. when sorting or editing the collection.
              { id: '1', title: 'John', iconName: 'send', onclick },
              { id: '2', title: 'Mary', iconName: 'send', onclick },
              { id: '3', title: 'Pete', iconName: 'send', onclick },
            ],
          })`,
        }),

        m('h3.header', 'Links collection'),
        m(Collection, {
          header: 'First names',
          mode: CollectionMode.LINKS,
          items: [
            { title: 'John', onclick: console.log },
            { title: 'Mary', onclick: console.log, href: '/home' },
            { title: 'Pete', onclick: console.log, href: 'https://www.google.com' },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.LINKS,
            items: [
              { title: 'John', onclick: console.log },
              { title: 'Mary', onclick: console.log, href: '/home' },
              { title: 'Pete', onclick: console.log, href: 'https://www.google.com' },
            ],
          })`,
        }),

        m('h3.header', 'Avatar collection'),
        m(Collection, {
          header: 'First names',
          mode: CollectionMode.AVATAR,
          items: [
            {
              title: 'John',
              content: 'First line<br>Second line',
              avatar: 'folder',
              className: 'green',
              iconName: 'grade',
              onclick,
            },
            {
              title: 'Mary',
              content: 'First line<br>Second line',
              avatar: 'https://pbs.twimg.com/profile_images/665673789112516608/v9itf6uk_400x400.jpg',
              iconName: 'grade',
              onclick,
            },
            {
              title: 'Pete',
              content: 'First line<br>Second line',
              avatar: 'play_arrow',
              className: 'red',
              iconName: 'file_download',
              href: 'http://www.google.com',
            },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.AVATAR,
            items: [
              {
                title: 'John',
                content: 'First line<br>Second line',
                avatar: 'folder',
                className: 'green',
                iconName: 'grade',
                onclick,
              },
              {
                title: 'Mary',
                content: 'First line<br>Second line',
                avatar: 'https://pbs.twimg.com/profile_images/665673789112516608/v9itf6uk_400x400.jpg',
                iconName: 'grade',
                onclick,
              },
              {
                title: 'Pete',
                content: 'First line<br>Second line',
                avatar: 'play_arrow',
                className: 'red',
                iconName: 'file_download',
                href: 'http://www.google.com',
              },
            ],
          })`,
        }),

        m('h3.header', 'Collapsible (accordion)'),
        m(
          '.row',
          m(Collapsible, {
            id: 'testme',
            className: 'first-second-third',
            items: [
              { id: 1, header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
              { id: 2, header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
              { id: 3, header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Collapsible, { items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`,
        }),

        m('h3.header', 'Collapsible with header'),
        m(
          '.row',
          m(Collapsible, {
            header: 'Tasks',
            items: [
              { id: 1, header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
              { id: 2, header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
              { id: 3, header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Collapsible, {
          header: 'Tasks',
          items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`,
        }),

        m('h3.header', 'Collapsible (no accordion)'),
        m(
          '.row',
          m(Collapsible, {
            accordion: false,
            items: [
              { id: 1, header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama', active: true },
              { id: 2, header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
              { id: 3, header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Collapsible, {
          accordion: false,
          items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama', active: true },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`,
        }),
      ]),
  };
};
