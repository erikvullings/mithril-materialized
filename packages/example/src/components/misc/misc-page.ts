import {
  MaterialBox,
  CodeBlock,
  Carousel,
  Parallax,
  Pagination,
  PaginationControls,
  Tabs,
  Button,
  Badge,
  Icon,
  toast,
  initTooltips,
  initPushpins,
} from 'mithril-materialized';
import m from 'mithril';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const MiscPage = () => {
  const state = {
    selectedTabId: '',
    disabled: true,
    activeTab: 3,
    tabWidthId: 2,
    tabWidths: ['auto', 'fixed', 'fill'] as Array<'auto' | 'fixed' | 'fill'>,
    showToast: false,
    // DataTable Pagination state
    dataTablePagination: {
      page: 0,
      pageSize: 10,
      total: 247,
    },
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
          m('a[href=https://mui.com/material-ui/react-badge/][target=_blank]', 'Badge'),
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

        m('h3.header', 'Badge'),
        m('p', 'Badges display notification counts, status indicators, or labels anchored to elements.'),
        m('h4', 'Basic Badges'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { badgeContent: 4 }, m(Button, { label: 'Notifications' })),
          m(Badge, { badgeContent: 15, color: 'blue' }, m(Button, { label: 'Messages' })),
          m(Badge, { badgeContent: 3, color: 'green' }, m(Button, { label: 'Updates' })),
          m(Badge, { badgeContent: 0, showZero: true, color: 'grey' }, m(Button, { label: 'Inbox' })),
        ]),
        m(CodeBlock, {
          code: `// Basic notification badge
m(Badge, { badgeContent: 4 },
  m(Button, { label: 'Notifications' })
)

// Colored badge
m(Badge, { badgeContent: 15, color: 'blue' },
  m(Button, { label: 'Messages' })
)

// Show zero value
m(Badge, { badgeContent: 0, showZero: true, color: 'grey' },
  m(Button, { label: 'Inbox' })
)`,
        }),

        m('h4', 'Badges with Icons'),
        m('p', 'Badges work great with icons for a more compact UI.'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { badgeContent: 5 }, m(Icon, { iconName: 'notifications' })),
          m(Badge, { badgeContent: 99, max: 99, color: 'blue' }, m(Icon, { iconName: 'mail' })),
          m(Badge, { variant: 'dot', color: 'green' }, m(Icon, { iconName: 'person' })),
          m(Badge, { badgeContent: 3, color: 'orange' }, m(Icon, { iconName: 'shopping_cart' })),
          m(Badge, { badgeContent: 150, max: 99, color: 'red' }, m(Icon, { iconName: 'inbox' })),
        ]),
        m(CodeBlock, {
          code: `// Icon with badge
m(Badge, { badgeContent: 5 },
  m(Icon, { iconName: 'notifications' })
)

// Max capping with icon
m(Badge, { badgeContent: 99, max: 99, color: 'blue' },
  m(Icon, { iconName: 'mail' })
)

// Dot variant with icon
m(Badge, { variant: 'dot', color: 'green' },
  m(Icon, { iconName: 'person' })
)`,
        }),

        m('h4', 'Max Value Capping'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { badgeContent: 99 }, m(Button, { label: 'At Max' })),
          m(Badge, { badgeContent: 100, max: 99 }, m(Button, { label: 'Over Max' })),
          m(Badge, { badgeContent: 1500, max: 999, color: 'orange' }, m(Button, { label: 'Way Over' })),
        ]),
        m(CodeBlock, {
          code: `// Badge at max value
m(Badge, { badgeContent: 99 },
  m(Button, { label: 'At Max' })
)

// Badge exceeding max shows "99+"
m(Badge, { badgeContent: 100, max: 99 },
  m(Button, { label: 'Over Max' })
)

// Large numbers capped
m(Badge, { badgeContent: 1500, max: 999, color: 'orange' },
  m(Button, { label: 'Way Over' })
)`,
        }),

        m('h4', 'Badge Positioning'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(
            Badge,
            { badgeContent: 1, anchorOrigin: { vertical: 'top', horizontal: 'right' }, color: 'red' },
            m(Button, { label: 'Top-Right' })
          ),
          m(
            Badge,
            { badgeContent: 2, anchorOrigin: { vertical: 'top', horizontal: 'left' }, color: 'blue' },
            m(Button, { label: 'Top-Left' })
          ),
          m(
            Badge,
            { badgeContent: 3, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, color: 'green' },
            m(Button, { label: 'Bottom-Right' })
          ),
          m(
            Badge,
            { badgeContent: 4, anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, color: 'purple' },
            m(Button, { label: 'Bottom-Left' })
          ),
        ]),
        m(CodeBlock, {
          code: `// Position badge at different corners
m(Badge, {
  badgeContent: 1,
  anchorOrigin: { vertical: 'top', horizontal: 'right' }
}, m(Button, { label: 'Top-Right' }))

m(Badge, {
  badgeContent: 2,
  anchorOrigin: { vertical: 'top', horizontal: 'left' }
}, m(Button, { label: 'Top-Left' }))

m(Badge, {
  badgeContent: 3,
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
}, m(Button, { label: 'Bottom-Right' }))`,
        }),

        m('h4', 'Dot Variant'),
        m(
          'p',
          'Dot badges are minimal indicators without content, perfect for showing presence or status.'
        ),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { variant: 'dot', color: 'green' }, m(Button, { label: 'Online' })),
          m(Badge, { variant: 'dot', color: 'orange' }, m(Button, { label: 'Away' })),
          m(Badge, { variant: 'dot', color: 'red' }, m(Button, { label: 'Busy' })),
          m(
            Badge,
            {
              variant: 'dot',
              color: 'teal',
              anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
            },
            m(Button, { label: 'Active' })
          ),
        ]),
        m(CodeBlock, {
          code: `// Dot variant for status indicators
m(Badge, { variant: 'dot', color: 'green' },
  m(Button, { label: 'Online' })
)

m(Badge, { variant: 'dot', color: 'red' },
  m(Button, { label: 'Busy' })
)

// Dot at custom position
m(Badge, {
  variant: 'dot',
  color: 'teal',
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
}, m(Button, { label: 'Active' }))`,
        }),

        m('h4', 'Color Variants'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { badgeContent: 1, color: 'red' }, m(Button, { label: 'Red' })),
          m(Badge, { badgeContent: 2, color: 'pink' }, m(Button, { label: 'Pink' })),
          m(Badge, { badgeContent: 3, color: 'purple' }, m(Button, { label: 'Purple' })),
          m(Badge, { badgeContent: 4, color: 'blue' }, m(Button, { label: 'Blue' })),
          m(Badge, { badgeContent: 5, color: 'teal' }, m(Button, { label: 'Teal' })),
          m(Badge, { badgeContent: 6, color: 'green' }, m(Button, { label: 'Green' })),
          m(Badge, { badgeContent: 7, color: 'amber' }, m(Button, { label: 'Amber' })),
          m(Badge, { badgeContent: 8, color: 'orange' }, m(Button, { label: 'Orange' })),
        ]),
        m(CodeBlock, {
          code: `// All MaterialColor options available
m(Badge, { badgeContent: 1, color: 'red' }, m(Button, { label: 'Red' }))
m(Badge, { badgeContent: 2, color: 'blue' }, m(Button, { label: 'Blue' }))
m(Badge, { badgeContent: 3, color: 'green' }, m(Button, { label: 'Green' }))
// ... and 15 more colors (pink, purple, teal, amber, etc.)`,
        }),

        m('h4', 'Color Intensity'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { badgeContent: 1, color: 'blue', colorIntensity: 'lighten-2' }, m(Button, { label: 'Light' })),
          m(Badge, { badgeContent: 2, color: 'blue' }, m(Button, { label: 'Base' })),
          m(Badge, { badgeContent: 3, color: 'blue', colorIntensity: 'darken-2' }, m(Button, { label: 'Dark' })),
        ]),
        m(CodeBlock, {
          code: `// Adjust color intensity
m(Badge, {
  badgeContent: 1,
  color: 'blue',
  colorIntensity: 'lighten-2'
}, m(Button, { label: 'Light' }))

m(Badge, {
  badgeContent: 3,
  color: 'blue',
  colorIntensity: 'darken-2'
}, m(Button, { label: 'Dark' }))`,
        }),

        m('h4', 'Overlap Modes'),
        m('p', 'Use circular overlap for badges on circular elements like avatars.'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(
            Badge,
            { badgeContent: 3, overlap: 'rectangular' },
            m('span', {
              style:
                'width: 48px; height: 48px; background: #ddd; display: inline-block; border: 2px solid #999;',
            })
          ),
          m(
            Badge,
            { badgeContent: 5, overlap: 'circular', color: 'green' },
            m('span', {
              style:
                'width: 48px; height: 48px; background: #ddd; border-radius: 50%; display: inline-block; border: 2px solid #999;',
            })
          ),
        ]),
        m(CodeBlock, {
          code: `// Rectangular overlap (default) for square elements
m(Badge, { badgeContent: 3, overlap: 'rectangular' },
  m('div.square-element')
)

// Circular overlap for round elements
m(Badge, { badgeContent: 5, overlap: 'circular', color: 'green' },
  m('img.circle', { src: 'avatar.jpg' })
)`,
        }),

        m('h4', 'Visibility Control'),
        m('.row', { style: 'gap: 20px; display: flex; align-items: center; flex-wrap: wrap;' }, [
          m(Badge, { badgeContent: 5 }, m(Button, { label: 'Visible' })),
          m(Badge, { badgeContent: 5, invisible: true }, m(Button, { label: 'Hidden' })),
          m(Badge, { badgeContent: 0 }, m(Button, { label: 'Auto-hidden (0)' })),
          m(Badge, { badgeContent: 0, showZero: true }, m(Button, { label: 'Show Zero' })),
        ]),
        m(CodeBlock, {
          code: `// Normal badge
m(Badge, { badgeContent: 5 }, m(Button, { label: 'Visible' }))

// Force hide with invisible prop
m(Badge, { badgeContent: 5, invisible: true }, m(Button, { label: 'Hidden' }))

// Auto-hide when content is 0
m(Badge, { badgeContent: 0 }, m(Button, { label: 'Auto-hidden' }))

// Show zero explicitly
m(Badge, { badgeContent: 0, showZero: true }, m(Button, { label: 'Show Zero' }))`,
        }),

        m('h3.header', 'Tooltip'),
        m('p', 'Tooltips are small, interactive, textual hints for mainly graphical elements.'),
        m('.row', [
          m('p', [
            m(
              'a[href=#!].btn.tooltipped[data-position=top][data-tooltip=I am a tooltip]',
              {
                oncreate: () => {
                  // Initialize tooltips after the element is created
                  setTimeout(() => initTooltips(), 100);
                },
              },
              'Hover me! (top)'
            ),
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
        m(
          'p',
          'Pushpin is a fixed positioning plugin. Pin elements to the top of the page when they scroll past them.'
        ),
        m(
          'p.grey-text.text-darken-2',
          '⚠️ Note: The pushpin element below will pin to the navbar when you scroll past it. This is normal behavior for the demo.'
        ),
        m('.row', [
          m('.col.s12', [
            m(
              'div',
              {
                style:
                  'height: 100px; background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #ddd;',
              },
              [
                m(
                  'p',
                  { style: 'margin: 0; font-size: 0.9em; color: #666;' },
                  'Content before the pinned element. The small blue element below will demonstrate pushpin behavior.'
                ),
              ]
            ),
            m(
              '.chip.pushpin-element',
              {
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
              },
              'Pushpin: pin-top'
            ),
            m(
              'div',
              {
                style:
                  'height: 400px; background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #ddd;',
              },
              [
                m(
                  'p',
                  { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' },
                  'Content after the pinned element...'
                ),
                m(
                  'p',
                  { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' },
                  'The small blue chip above should now be pinned to the top navigation.'
                ),
                m(
                  'p',
                  { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' },
                  'Continue scrolling to see more components below.'
                ),
                m(
                  'p',
                  { style: 'margin: 0; font-size: 0.85em; color: #999;' },
                  'This demonstrates how pushpin works without being visually disruptive.'
                ),
              ]
            ),
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
          selectedTabId: state.selectedTabId,
          tabWidth: state.tabWidths[state.tabWidthId % 3],
          onShow: console.log,
          onTabChange: (tabId: string) => {
            console.log('Tab changed to:', tabId);
            state.selectedTabId = tabId;
          },
          tabs: [
            {
              title: 'Test 1',
              id: 'test1',
              vnode: m('div', [
                m('h4', 'Content for Test 1'),
                m('p', 'This is the content for the first tab. Click on other tabs to see them in action!'),
              ]),
            },
            {
              title: 'Test 2',
              id: 'test2',
              disabled: state.disabled,
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
            state.selectedTabId = 'test1';
          },
        }),
        m(Button, {
          label: 'Switch to tab 4',
          onclick: () => {
            state.selectedTabId = 'test4';
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

        m('h3.header', 'Pagination Controls'),
        m(
          'p',
          'Standalone pagination controls component with customizable text and navigation. Used by DataTable but also available for any paginated content.'
        ),
        m(
          '.row',
          m(
            '.card',
            m(
              '.card-content',
              m(PaginationControls, {
                pagination: state.dataTablePagination,
                onPaginationChange: (newPagination) => {
                  state.dataTablePagination = newPagination;
                  console.log('Pagination changed:', newPagination);
                },
                i18n: {
                  showing: 'Showing',
                  to: 'to',
                  of: 'of',
                  entries: 'items',
                  page: 'Page',
                },
              })
            )
          )
        ),
        m(CodeBlock, {
          code: `m(PaginationControls, {
  pagination: { page: 0, pageSize: 10, total: 247 },
  onPaginationChange: (newPagination) => {
    console.log('Page changed:', newPagination);
  },
  i18n: {
    showing: 'Showing',
    to: 'to',
    of: 'of', 
    entries: 'items',
    page: 'Page',
  },
})`,
        }),
      ]),
  };
};
