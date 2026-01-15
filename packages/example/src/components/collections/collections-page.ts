import { CodeBlock, Collapsible, Collection, CollectionItem, CollectionMode, FlatButton } from 'mithril-materialized';
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

        m('h3.header', 'Rich Content Collection - Action Buttons'),
        m('p', 'You can now use Vnodes for content to add buttons, custom layouts, and complex UI elements.'),
        m(Collection, {
          mode: CollectionMode.AVATAR,
          items: [
            {
              id: 'doc1',
              title: 'Document.pdf',
              avatar: 'insert_drive_file',
              className: 'blue',
              content: m('.rich-content', [
                m('p', 'Uploaded 2 hours ago • 2.4 MB'),
                m('.actions', { style: 'margin-top: 8px;' }, [
                  m(FlatButton, {
                    label: 'Download',
                    iconName: 'download',
                    className: 'btn-small blue',
                    onclick: () => alert('Downloading...'),
                  }),
                  m(FlatButton, {
                    label: 'Delete',
                    iconName: 'delete',
                    className: 'btn-small red',
                    style: 'margin-left: 8px;',
                    onclick: () => alert('Deleting...'),
                  }),
                ]),
              ]),
            },
            {
              id: 'img1',
              title: 'Vacation.jpg',
              avatar: 'image',
              className: 'green',
              content: m('.rich-content', [
                m('p', 'Uploaded yesterday • 1.8 MB'),
                m('.actions', { style: 'margin-top: 8px;' }, [
                  m(FlatButton, {
                    label: 'View',
                    iconName: 'visibility',
                    className: 'btn-small green',
                    onclick: () => alert('Viewing...'),
                  }),
                  m(FlatButton, {
                    label: 'Share',
                    iconName: 'share',
                    className: 'btn-small teal',
                    style: 'margin-left: 8px;',
                    onclick: () => alert('Sharing...'),
                  }),
                ]),
              ]),
            },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            mode: CollectionMode.AVATAR,
            items: [{
              title: 'Document.pdf',
              avatar: 'insert_drive_file',
              className: 'blue',
              content: m('.rich-content', [
                m('p', 'Uploaded 2 hours ago • 2.4 MB'),
                m('.actions', { style: 'margin-top: 8px;' }, [
                  m(FlatButton, {
                    label: 'Download',
                    iconName: 'download',
                    className: 'btn-small blue',
                    onclick: () => alert('Downloading...')
                  }),
                  m(FlatButton, {
                    label: 'Delete',
                    iconName: 'delete',
                    className: 'btn-small red',
                    onclick: () => alert('Deleting...')
                  })
                ])
              ])
            }]
          })`,
        }),

        m('h3.header', 'Rich Content - BASIC Mode'),
        m('p', 'BASIC mode now supports content (string or Vnode) for more flexible layouts.'),
        m(Collection, {
          mode: CollectionMode.BASIC,
          items: [
            {
              id: 'task1',
              title: 'Update documentation',
              content: m('div', [
                m('span', { style: 'color: #666; font-size: 0.9em;' }, 'Due: Jan 15, 2026'),
                m('span.red-text', { style: 'margin-left: 16px; font-weight: 500;' }, 'Priority: High'),
              ]),
            },
            {
              id: 'task2',
              title: 'Review pull requests',
              content: m('div', [
                m('span', { style: 'color: #666; font-size: 0.9em;' }, 'Due: Jan 20, 2026'),
                m('span.orange-text', { style: 'margin-left: 16px; font-weight: 500;' }, 'Priority: Medium'),
              ]),
            },
            {
              id: 'task3',
              title: 'Fix bug #123',
              content: m('div', { style: 'display: flex; align-items: center; margin-top: 4px;' }, [
                m('span', { style: 'color: #666; font-size: 0.9em;' }, 'Due: Jan 18, 2026'),
                m(FlatButton, {
                  label: 'Mark Complete',
                  className: 'btn-small green',
                  style: 'margin-left: 16px;',
                  onclick: () => alert('Task completed!'),
                }),
              ]),
            },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            mode: CollectionMode.BASIC,
            items: [{
              title: 'Update documentation',
              content: m('div', [
                m('span', 'Due: Jan 15, 2026'),
                m('span.red-text', 'Priority: High')
              ])
            }, {
              title: 'Fix bug #123',
              content: m('div', [
                m('span', 'Due: Jan 18, 2026'),
                m(FlatButton, {
                  label: 'Mark Complete',
                  className: 'btn-small green',
                  onclick: () => alert('Task completed!')
                })
              ])
            }]
          })`,
        }),

        m('h3.header', 'Rich Content - Custom Layouts'),
        m('p', 'Create complex layouts with badges, multiple text elements, and custom styling.'),
        m(Collection, {
          mode: CollectionMode.AVATAR,
          items: [
            {
              id: 'user1',
              title: 'John Doe',
              avatar: 'person',
              className: 'purple',
              content: m('div', [
                m('p', { style: 'margin: 0 0 8px 0;' }, 'Senior Developer • React Team'),
                m('div', { style: 'display: flex; gap: 8px;' }, [
                  m('span.badge.blue', { 'data-badge-caption': '' }, 'React'),
                  m('span.badge.green', { 'data-badge-caption': '' }, 'TypeScript'),
                  m('span.badge.orange', { 'data-badge-caption': '' }, 'Node.js'),
                ]),
              ]),
            },
            {
              id: 'user2',
              title: 'Jane Smith',
              avatar: 'person',
              className: 'teal',
              content: m('div', [
                m('p', { style: 'margin: 0 0 8px 0;' }, 'Lead Designer • UX Team'),
                m('div', { style: 'display: flex; gap: 8px;' }, [
                  m('span.badge.pink', { 'data-badge-caption': '' }, 'Figma'),
                  m('span.badge.purple', { 'data-badge-caption': '' }, 'UI/UX'),
                  m('span.badge.cyan', { 'data-badge-caption': '' }, 'Design Systems'),
                ]),
              ]),
            },
          ],
        }),
        m(CodeBlock, {
          code: `          m(Collection, {
            mode: CollectionMode.AVATAR,
            items: [{
              title: 'John Doe',
              avatar: 'person',
              className: 'purple',
              content: m('div', [
                m('p', 'Senior Developer • React Team'),
                m('div', [
                  m('span.badge.blue', { 'data-badge-caption': '' }, 'React'),
                  m('span.badge.green', { 'data-badge-caption': '' }, 'TypeScript'),
                  m('span.badge.orange', { 'data-badge-caption': '' }, 'Node.js')
                ])
              ])
            }]
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
