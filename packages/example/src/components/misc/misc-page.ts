import { MaterialBox, CodeBlock, Carousel, Parallax, Pagination, Tabs, Button, toast, ToastComponent, initTooltips, initPushpins } from 'mithril-materialized';
import m from 'mithril';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const MiscPage = () => {
  const state = {
    activeTabId: '',
    disabled: true,
    activeTab: 3,
    tabWidthId: 2,
    tabWidths: ['auto', 'fixed', 'fill'] as Array<'auto' | 'fixed' | 'fill'>,
    showToast: false,
  };
  const curPage = () => (m.route.param('page') ? +m.route.param('page') : 1);

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Miscellaneous'),
        m('p', [
          'Some miscellaneous components, like ',
          m('a[href=https://materializecss.com/toasts.html][target=_blank]', 'Toast'),
          ', ',
          m('a[href=https://materializecss.com/tooltips.html][target=_blank]', 'Tooltip'),
          ', ',
          m('a[href=https://materializecss.com/pushpin.html][target=_blank]', 'Pushpin'),
          ', ',
          m('a[href=https://materializecss.com/tabs.html][target=_blank]', 'Tabs'),
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

        m('h3.header', 'Toast'),
        m('p', 'Toast provides brief feedback about an operation through a message at the bottom of the screen.'),
        m('.row', [
          m(Button, {
            label: 'Show Basic Toast',
            onclick: () => {
              toast({ html: 'Hello World! This is a basic toast message.' });
            },
          }),
          m(Button, {
            label: 'Show Styled Toast',
            onclick: () => {
              toast({
                html: '<span>Custom toast with HTML content!</span>',
                classes: 'rounded orange darken-1',
                displayLength: 6000,
              });
            },
          }),
          m(Button, {
            label: 'Show Long Toast',
            onclick: () => {
              toast({
                html: 'This toast will stay visible for 10 seconds and can be swiped to dismiss!',
                displayLength: 10000,
                completeCallback: () => console.log('Toast dismissed'),
              });
            },
          }),
        ]),
        m(CodeBlock, {
          code: `// Basic toast
toast({ html: 'Hello World! This is a basic toast message.' });

// Styled toast with custom classes and duration
toast({
  html: '<span>Custom toast with HTML content!</span>',
  classes: 'rounded orange darken-1',
  displayLength: 6000,
});

// Toast with callback
toast({
  html: 'This toast can be swiped to dismiss!',
  displayLength: 10000,
  completeCallback: () => console.log('Toast dismissed'),
});`,
        }),

        m('h3.header', 'Tooltip'),
        m('p', 'Tooltips are small, interactive, textual hints for mainly graphical elements.'),
        m('.row', [
          m('p', [
            m('a[href=#!].btn.tooltipped[data-position=top][data-tooltip=I am a tooltip]', {
              oncreate: () => {
                // Initialize tooltips after the element is created
                setTimeout(() => initTooltips(), 100);
              },
            }, 'Hover me! (top)'),
            ' ',
            m('a[href=#!].btn.tooltipped[data-position=right][data-tooltip=I am a tooltip]', 'Hover me! (right)'),
            ' ',
            m('a[href=#!].btn.tooltipped[data-position=bottom][data-tooltip=I am a tooltip]', 'Hover me! (bottom)'),
            ' ',
            m('a[href=#!].btn.tooltipped[data-position=left][data-tooltip=I am a tooltip]', 'Hover me! (left)'),
          ]),
        ]),
        m(CodeBlock, {
          code: `// HTML with data attributes
m('a[href=#!].btn.tooltipped[data-position=top][data-tooltip=I am a tooltip]', 'Hover me!')

// Initialize tooltips
oncreate: () => {
  initTooltips(); // Initialize all tooltips on elements with .tooltipped class
}

// Or initialize specific elements
initTooltips('.my-tooltips', { 
  position: 'top',
  enterDelay: 500 
});`,
        }),

        m('h3.header', 'Pushpin'),
        m('p', 'Pushpin is a fixed positioning plugin. Pin elements to the top of the page when they scroll past them.'),
        m('p.grey-text.text-darken-2', '⚠️ Note: The pushpin element below will pin to the navbar when you scroll past it. This is normal behavior for the demo.'),
        m('.row', [
          m('.col.s12', [
            m('div', { style: 'height: 100px; background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #ddd;' }, [
              m('p', { style: 'margin: 0; font-size: 0.9em; color: #666;' }, 'Content before the pinned element. The small blue element below will demonstrate pushpin behavior.'),
            ]),
            m('.chip.pushpin-element', {
              style: 'background-color: #e3f2fd; border: 1px solid #2196f3; display: inline-block; padding: 8px 12px; margin: 10px 0; font-size: 0.85em;',
              oncreate: (vnode) => {
                // Initialize pushpin on this element
                setTimeout(() => {
                  initPushpins('.pushpin-element', {
                    top: 64, // Account for navbar height
                    bottom: Infinity,
                    onPositionChange: (position) => {
                      console.log('Pushpin position:', position);
                      // Update the element text to show current state
                      const el = document.querySelector('.pushpin-element');
                      if (el) {
                        el.textContent = `Pushpin: ${position}`;
                      }
                    },
                  });
                }, 100);
              },
            }, 'Pushpin: pin-top'),
            m('div', { style: 'height: 400px; background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #ddd;' }, [
              m('p', { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' }, 'Content after the pinned element...'),
              m('p', { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' }, 'The small blue chip above should now be pinned to the top navigation.'),
              m('p', { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' }, 'Continue scrolling to see more components below.'),
              m('p', { style: 'margin: 0; font-size: 0.85em; color: #999;' }, 'This demonstrates how pushpin works without being visually disruptive.'),
            ]),
          ]),
        ]),
        m(CodeBlock, {
          code: `// HTML
m('.pushpin-element', 'This element will be pinned when you scroll!')

// Initialize pushpin
oncreate: (vnode) => {
  initPushpins('.pushpin-element', {
    top: 100,        // Distance from top when element becomes fixed
    bottom: 400,     // Distance from bottom where element stops being fixed
    onPositionChange: (position) => {
      console.log('Pushpin position:', position); // 'pin-top', 'pinned', or 'pin-bottom'
    },
  });
}`,
        }),

        m('h3.header', 'Tabs'),
        m(Tabs, {
          selectedTabId: state.activeTabId,
          tabWidth: state.tabWidths[state.tabWidthId % 3],
          onShow: console.log,
          onTabChange: (tabId: string) => {
            console.log('Tab changed to:', tabId);
            state.activeTabId = tabId;
          },
          tabs: [
            {
              title: 'Test 1',
              id: 'test1',
              active: state.activeTab === 1,
              vnode: m('div', [
                m('h4', 'Content for Test 1'),
                m('p', 'This is the content for the first tab. Click on other tabs to see them in action!'),
              ]),
            },
            {
              title: 'Test 2',
              id: 'test2',
              disabled: state.disabled,
              active: state.activeTab === 2,
              vnode: m('div', [
                m('h4', 'Content for Test 2'),
                m(
                  'p',
                  'This is the content for the second tab. You can disable/enable this tab with the button below.'
                ),
              ]),
            },
            {
              title: 'Test 3',
              id: 'test3',
              active: state.activeTab === 3,
              vnode: m('div', [
                m('h4', 'Content for Test 3'),
                m(
                  'p',
                  'This is the content for the third tab. Notice how the active indicator moves when you click tabs.'
                ),
              ]),
            },
            {
              title: 'Test 4',
              id: 'test4',
              active: state.activeTab === 4,
              vnode: m('div', [
                m('h4', 'Content for Test 4'),
                m(
                  'p',
                  'This is the content for the fourth tab. The tabs now properly handle clicking and content switching.'
                ),
              ]),
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
          onclick: () => {
            state.tabWidthId++;
          },
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
        m('.row', m(MaterialBox, { src: gogh, width: 600 })),
        m(CodeBlock, {
          code: `          m(MaterialBox, { src: gogh, width: 600 })`,
        }),

        m('h3.header', 'Carousel'),
        m(
          '.row',
          m(Carousel, {
            items: [
              { href: '#!/one!', src: 'https://picsum.photos/id/301/200/300' },
              { href: '#!/two!', src: 'https://picsum.photos/id/302/200/300' },
              { href: '#!/three!', src: 'https://picsum.photos/id/306/200/300' },
              { href: '#!/four!', src: 'https://picsum.photos/id/304/200/300' },
              { href: '#!/five!', src: 'https://picsum.photos/id/305/200/300' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Carousel, { items: [
                    { href: '#!/one!', src: 'https://picsum.photos/id/301/200/300' },
                    { href: '#!/two!', src: 'https://picsum.photos/id/302/200/300' },
                    { href: '#!/three!', src: 'https://picsum.photos/id/306/200/300' },
                    { href: '#!/four!', src: 'https://picsum.photos/id/304/200/300' },
                    { href: '#!/five!', src: 'https://picsum.photos/id/305/200/300' },
                  ] })`,
        }),

        m('h3.header', 'Pagination'),
        m(
          '.row',
          m(Pagination, {
            size: 5,
            curPage: curPage(),
            items: [
              { href: '/misc?page=1' },
              { href: '/misc?page=2' },
              { href: '/misc?page=3' },
              { href: '/misc?page=4' },
              { href: '/misc?page=5' },
              { href: '/misc?page=6' },
              { href: '/misc?page=7' },
              { href: '/misc?page=8' },
              { href: '/misc?page=9' },
              { href: '/misc?page=10' },
              { href: '/misc?page=11' },
              { href: '/misc?page=12' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `m(Pagination, {
          size: 5,
          items: [
            { href: '/misc?page=1' },
            { href: '/misc?page=2' },
            { href: '/misc?page=3' },
            { href: '/misc?page=4' },
            { href: '/misc?page=5' },
            { href: '/misc?page=6' },
            { href: '/misc?page=7' },
            { href: '/misc?page=8' },
            { href: '/misc?page=9' },
            { href: '/misc?page=10' },
            { href: '/misc?page=11' },
            { href: '/misc?page=12' },
          ],
        })`,
        }),
      ]),
  };
};
