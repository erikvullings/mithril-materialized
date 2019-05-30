import { MaterialBox, CodeBlock, Carousel, Parallax, Pagination, Tabs, Button, Kanban } from 'mithril-materialized';
import m from 'mithril';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const MiscPage = () => {
  const state = {
    activeTabId: '',
    disabled: true,
    activeTab: 3,
    tabWidthId: 2,
    tabWidths: ['auto', 'fixed', 'fill'] as Array<'auto' | 'fixed' | 'fill'>,
  };
  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Miscellaneous'),
        m('p', [
          'Some miscellaneous components, like the ',
          m('a[href=https://materializecss.com/tabs.html][target=_blank]', 'Tabs component'),
          ', ',
          m('a[href=https://materializecss.com/media.html][target=_blank]', 'Material box'),
          ', ',
          m('a[href=https://materializecss.com/collection.html][target=_blank]', 'Collection'),
          ', ',
          m('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collapsible'),
          ', ',
          m('a[href=https://materializecss.com/carousel.html][target=_blank]', 'Carousel'),
          ', ',
          m('a[href=https://materializecss.com/parallax.html][target=_blank]', 'Pagination'),
          ' and the ',
          m('a[href=https://materializecss.com/pagination.html][target=_blank]', 'Parallax'),
          '.',
        ]),

        m('h3.header', 'Kanban'),
        m(Kanban, {
          label: 'task',
          fixedFooter: false,
          canEdit: true,
          model: [
            {
              id: 'todo',
              label: 'Todo',
              component: 'Text',
              className: 'col s8',
              required: true,
            },
            {
              id: 'due',
              label: 'Due date',
              className: 'col s4',
              component: 'Date',
            },
            {
              id: 'desc',
              label: 'Description',
              className: 'col s12',
              component: 'Text',
              multiline: true,
            },
          ],
        }),

        m('h3.header', 'Tabs'),
        m(Tabs, {
          selectedTabId: state.activeTabId,
          tabWidth: state.tabWidths[state.tabWidthId % 3],
          onShow: console.log,
          tabs: [
            {
              title: 'Test 1',
              active: state.activeTab === 1,
              vnode: m('', 'Show content of tab 1'),
            },
            {
              title: 'Test 2',
              disabled: state.disabled,
              active: state.activeTab === 2,
              vnode: m('', 'Show content of tab 2'),
            },
            {
              title: 'Test 3',
              active: state.activeTab === 3,
              vnode: m('', 'Show content of tab 3'),
            },
            {
              title: 'Test 4',
              active: state.activeTab === 4,
              vnode: m('', 'Show content of tab 4'),
            },
            {
              title: 'Visit Google',
              target: '_blank',
              href: 'http://www.google.com',
              // vnode: m('', 'Nothing to show'),
            },
          ],
        }),
        m(Button, {
          label: 'Switch to tab 1',
          onclick: () => {
            state.activeTab = 1;
            state.activeTabId = '';
          },
        }),
        m(Button, {
          label: 'Switch to tab 4',
          onclick: () => {
            state.activeTab = 0;
            state.activeTabId = 'test4';
          },
        }),
        m(Button, {
          label: `${state.disabled ? 'Enable' : 'Disable'} tab 2`,
          onclick: () => {
            state.disabled = !state.disabled;
          },
        }),
        m(Button, {
          label: `Switch tab width from ${state.tabWidths[state.tabWidthId % 3]} to ${
            state.tabWidths[(state.tabWidthId + 1) % 3]
          }`,
          onclick: () => state.tabWidthId++,
        }),
        m(CodeBlock, {
          code: `          m(Tabs, {
            onShow: console.log,
            tabs: [
              {
                title: 'Test 1',
                vnode: m('', 'Show content of tab 1'),
              },
              {
                title: 'Test 2',
                disabled: true,
                vnode: m('', 'Show content of tab 2'),
              },
              {
                title: 'Test 3',
                active: true,
                vnode: m('', 'Show content of tab 3'),
              },
              {
                title: 'Test 4',
                vnode: m('', 'Show content of tab 4'),
              },
              {
                title: 'Visit Google',
                target: '_blank',
                href: 'http://www.google.com',
              },
            ],
          })`,
        }),

        m('h3.header', 'Parallax'),
        m(Parallax, { src: gogh }),
        m(CodeBlock, {
          code: `          m(Parallax, { src: gogh }) // should be embedded in layout so the width is not limited`,
        }),

        m('h3.header', 'Material box (click on image)'),
        m('row', m(MaterialBox, { src: gogh, width: 600 })),
        m(CodeBlock, {
          code: `          m(MaterialBox, { src: gogh, width: 600 })`,
        }),

        m('h3.header', 'Carousel'),
        m(
          'row',
          m(Carousel, {
            items: [
              { href: '#one!', src: 'https://lorempixel.com/250/250/nature/1' },
              { href: '#two!', src: 'https://lorempixel.com/250/250/nature/2' },
              { href: '#three!', src: 'https://lorempixel.com/250/250/nature/3' },
              { href: '#four!', src: 'https://lorempixel.com/250/250/nature/4' },
              { href: '#five!', src: 'https://lorempixel.com/250/250/nature/5' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Carousel, { items: [
            { href: '#one!', src: 'https://lorempixel.com/250/250/nature/1' },
            { href: '#two!', src: 'https://lorempixel.com/250/250/nature/2' },
            { href: '#three!', src: 'https://lorempixel.com/250/250/nature/3' },
            { href: '#four!', src: 'https://lorempixel.com/250/250/nature/4' },
            { href: '#five!', src: 'https://lorempixel.com/250/250/nature/5' },
          ] })`,
        }),

        m('h3.header', 'Pagination'),
        m(
          'row',
          m(Pagination, {
            size: 5,
            items: [
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Pagination, {
            size: 5,
            items: [
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
            ],
          })`,
        }),
      ]),
  };
};
