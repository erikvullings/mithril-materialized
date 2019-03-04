import { CodeBlock, Collapsible, Collection, ICollectionItem, CollectionMode } from 'mithril-materialized';
import m from 'mithril';

const onclick = (item: ICollectionItem) => alert(`You clicked ${item.title}.`);

export const CollectionsPage = () => {
  const state = {
    properties: {
      stringArray: ['a', 'b', 'c'],
      numberArray: [1, 2, 3],
      aNumber: 42,
      aString: 'Hello world',
      truthy: true,
      falsy: false,
    },
  };

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
            { title: 'John', iconName: 'send', onclick },
            { title: 'Mary', iconName: 'send', onclick },
            { title: 'Pete', iconName: 'send', onclick },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            items: [
              { title: 'John', iconName: 'send', onclick },
              { title: 'Mary', iconName: 'send', onclick },
              { title: 'Pete', iconName: 'send', onclick },
            ],
          })`,
        }),

        m('h3.header', 'Links collection'),
        m(Collection, {
          header: 'First names',
          mode: CollectionMode.LINKS,
          items: [
            { title: 'John', onclick: console.log },
            { title: 'Mary', onclick: console.log },
            { title: 'Pete', onclick: console.log },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.LINKS,
            items: [
              { title: 'John', onclick: console.log },
              { title: 'Mary', onclick: console.log },
              { title: 'Pete', onclick: console.log },
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

        m('h3.header', 'Collapsible'),
        m(
          '.row',
          m(Collapsible, {
            items: [
              { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
              { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
              { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
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
      ]),
  };
};
