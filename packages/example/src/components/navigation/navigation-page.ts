import m from 'mithril';
import {
  Sidenav,
  SidenavItem,
  Breadcrumb,
  createBreadcrumb,
  Wizard,
  CodeBlock,
  Button,
  TextInput,
  TextArea,
} from 'mithril-materialized';

export const NavigationPage = () => {
  const state = {
    sidenavOpen: false,
    enhancedSidenavOpen: true, // Start open
    enhancedSidenavExpanded: true, // Start expanded
    activeMenuItem: 1, // Start with Filters active to show checkbox submenu
    selectedFilters: new Set<string>(['filter1']),
    selectedView: 'grid',
    currentWizardStep: 0,
    wizardData: {
      name: '',
      email: '',
      message: '',
    },
  };

  const breadcrumbItems = [
    { text: 'Home', href: '/home', icon: 'home' },
    { text: 'Navigation', href: '/navigation' },
    { text: 'Components', active: true },
  ];

  const wizardSteps = [
    {
      title: 'Personal Information',
      subtitle: 'Enter your basic details',
      icon: 'person',
      vnode: () =>
        m('.row', [
          m('h4', 'Step 1: Personal Information'),
          m('p', 'Please provide your name and email address.'),
          m(TextInput, {
            label: 'Full Name',
            value: state.wizardData.name,
            oninput: (value: string) => {
              state.wizardData.name = value;
            },
          }),
          m(TextInput, {
            label: 'Email Address',
            type: 'email',
            value: state.wizardData.email,
            oninput: (value: string) => {
              state.wizardData.email = value;
            },
          }),
        ]),
      validate: () => {
        return state.wizardData.name.length > 0 && state.wizardData.email.includes('@');
      },
    },
    {
      title: 'Message',
      subtitle: 'Tell us about yourself',
      icon: 'message',
      optional: true,
      vnode: () =>
        m('.row', [
          m('h4', 'Step 2: Message (Optional)'),
          m('p', 'You can optionally provide additional information.'),
          m(TextArea, {
            label: 'Your Message',
            value: state.wizardData.message,
            oninput: (value: string) => {
              state.wizardData.message = value;
            },
          }),
        ]),
    },
    {
      title: 'Review',
      subtitle: 'Confirm your information',
      icon: 'preview',
      vnode: () =>
        m('.row', [
          m('h4', 'Step 3: Review'),
          m('p', 'Please review your information before submitting.'),
          m('.collection', [
            m('.collection-item', [m('strong', 'Name: '), state.wizardData.name || 'Not provided']),
            m('.collection-item', [m('strong', 'Email: '), state.wizardData.email || 'Not provided']),
            state.wizardData.message && m('.collection-item', [m('strong', 'Message: '), state.wizardData.message]),
          ]),
        ]),
    },
  ];

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Navigation Components'),
        m('p', [
          'New navigation components including Sidenav, Breadcrumb, and Wizard/Stepper. ',
          'These components help users navigate through your application and complete multi-step processes.',
        ]),

        // Breadcrumb Example
        m('h3.header', 'Breadcrumb Navigation'),
        m('p', "Shows the user's current location within the site hierarchy:"),
        m('.row', [
          m('.col.s12', [
            m(Breadcrumb, {
              items: breadcrumbItems,
              showHome: true,
              showIcons: true,
            }),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { Breadcrumb, createBreadcrumb } from 'mithril-materialized';

// Automatic breadcrumb generation from path
const items = createBreadcrumb('/navigation/components/example');

m(Breadcrumb, {
  items: items,
  showHome: true,      // Show home icon for first item
  showIcons: true,     // Show icons for items that have them
  maxItems: 5,         // Collapse long paths with ellipsis
  separator: 'chevron_right' // Custom separator icon
})`,
        }),

        // Sidenav Example
        m('h3.header', 'Sidenav'),
        m('p', 'Responsive navigation drawer that slides in from the side:'),
        m('.row', [
          m('.col.s12', [
            m(Button, {
              label: 'Toggle Sidenav',
              onclick: () => {
                state.sidenavOpen = !state.sidenavOpen;
              },
            }),

            m(
              Sidenav,
              {
                isOpen: state.sidenavOpen,
                onToggle: (isOpen) => {
                  state.sidenavOpen = isOpen;
                },
                position: 'left',
                mode: 'overlay',
                width: 300,
                showBackdrop: true,
                closeOnBackdropClick: true,
                closeOnEscape: true,
              },
              [
                m(SidenavItem, { text: 'Dashboard', icon: 'dashboard', active: true }),
                m(SidenavItem, { text: 'Profile', icon: 'person' }),
                m(SidenavItem, { text: 'Settings', icon: 'settings' }),
                m(SidenavItem, { divider: true }),
                m(SidenavItem, { subheader: true, text: 'Actions' }),
                m(SidenavItem, { text: 'Help', icon: 'help' }),
                m(SidenavItem, { text: 'Logout', icon: 'exit_to_app' }),
              ]
            ),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { Sidenav, SidenavItem } from 'mithril-materialized';

m(Sidenav, {
  isOpen: state.sidenavOpen,
  onToggle: (isOpen) => { state.sidenavOpen = isOpen; },
  position: 'left',     // 'left' | 'right'
  mode: 'overlay',      // 'overlay' | 'push'
  width: 300,
  showBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true
}, [
  m(SidenavItem, { text: 'Dashboard', icon: 'dashboard', active: true }),
  m(SidenavItem, { text: 'Profile', icon: 'person' }),
  m(SidenavItem, { divider: true }),
  m(SidenavItem, { subheader: true, text: 'Actions' }),
  m(SidenavItem, { text: 'Help', icon: 'help' })
])`,
        }),

        // Enhanced Sidenav with Hamburger and Collapse/Expand
        m('h3.header', 'Enhanced Sidenav with Hamburger & Collapse/Expand'),
        m(
          'p',
          'Feature-rich persistent navigation with hamburger toggle inside, collapse/expand functionality, and submenu support. Use the buttons below to control the sidenav. Click on "Filters" to see checkbox submenu items (multiple selections), or "View Mode" to see radio submenu items (single selection).'
        ),
        m('.row', [
          m('.col.s12', [
            // External control buttons
            m('.control-buttons', { style: { 'margin-bottom': '1rem', display: 'flex', gap: '8px' } }, [
              m(Button, {
                label: state.enhancedSidenavOpen ? 'Hide Sidenav' : 'Show Sidenav',
                onclick: () => {
                  state.enhancedSidenavOpen = !state.enhancedSidenavOpen;
                },
              }),
              m(Button, {
                label: state.enhancedSidenavExpanded ? 'Collapse' : 'Expand',
                onclick: () => {
                  state.enhancedSidenavExpanded = !state.enhancedSidenavExpanded;
                },
                disabled: !state.enhancedSidenavOpen,
              }),
            ]),
            m(
              Sidenav,
              {
                id: 'enhanced-sidenav',
                isOpen: state.enhancedSidenavOpen,
                onToggle: (isOpen) => {
                  state.enhancedSidenavOpen = isOpen;
                },
                isExpanded: state.enhancedSidenavExpanded,
                onExpandChange: (expanded) => {
                  state.enhancedSidenavExpanded = expanded;
                },
                position: 'right',
                mode: 'push',
                width: 280,
                showBackdrop: false, // No backdrop for persistent mode
                closeOnBackdropClick: false,
                closeOnEscape: false,
                showHamburger: true, // Hamburger is inside the sidenav
                expandable: true,
                // Header with app logo/title
                header: {
                  text: 'My App',
                  icon: 'apps',
                  onclick: () => {
                    console.log('Header clicked - navigate to home');
                  },
                },
                // Footer with settings
                footer: {
                  text: 'Settings',
                  icon: 'settings',
                  onclick: () => {
                    console.log('Footer clicked - open settings');
                  },
                },
              },
              [
                m(SidenavItem, {
                  text: 'Dashboard',
                  icon: 'dashboard',
                  active: state.activeMenuItem === 0,
                  onclick: () => {
                    state.activeMenuItem = 0;
                  },
                }),
                m(SidenavItem, {
                  text: 'Filters',
                  icon: 'filter_list',
                  active: state.activeMenuItem === 1,
                  onclick: () => {
                    state.activeMenuItem = 1;
                  },
                  submenu: [
                    {
                      text: 'Show Active',
                      selected: state.selectedFilters.has('filter1'),
                      value: 'filter1',
                      onSelect: (value, selected) => {
                        if (selected) {
                          state.selectedFilters.add(value);
                        } else {
                          state.selectedFilters.delete(value);
                        }
                      },
                    },
                    {
                      text: 'Show Archived',
                      selected: state.selectedFilters.has('filter2'),
                      value: 'filter2',
                      onSelect: (value, selected) => {
                        if (selected) {
                          state.selectedFilters.add(value);
                        } else {
                          state.selectedFilters.delete(value);
                        }
                      },
                    },
                    {
                      text: 'Show Favorites',
                      selected: state.selectedFilters.has('filter3'),
                      value: 'filter3',
                      onSelect: (value, selected) => {
                        if (selected) {
                          state.selectedFilters.add(value);
                        } else {
                          state.selectedFilters.delete(value);
                        }
                      },
                    },
                  ],
                  submenuMode: 'checkbox',
                }),
                m(SidenavItem, {
                  text: 'View Mode',
                  icon: 'view_module',
                  active: state.activeMenuItem === 2,
                  onclick: () => {
                    state.activeMenuItem = 2;
                  },
                  submenu: [
                    {
                      text: 'Grid View',
                      selected: state.selectedView === 'grid',
                      value: 'grid',
                      onSelect: (value) => {
                        state.selectedView = value;
                      },
                    },
                    {
                      text: 'List View',
                      selected: state.selectedView === 'list',
                      value: 'list',
                      onSelect: (value) => {
                        state.selectedView = value;
                      },
                    },
                    {
                      text: 'Compact View',
                      selected: state.selectedView === 'compact',
                      value: 'compact',
                      onSelect: (value) => {
                        state.selectedView = value;
                      },
                    },
                  ],
                  submenuMode: 'radio',
                }),
                m(SidenavItem, { divider: true }),
                m(SidenavItem, { subheader: true, text: 'Navigation' }),

                m(SidenavItem, {
                  text: 'Help',
                  icon: 'help',
                  active: state.activeMenuItem === 4,
                  onclick: () => {
                    state.activeMenuItem = 4;
                  },
                }),
              ]
            ),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { Sidenav, SidenavItem } from 'mithril-materialized';

m(Sidenav, {
  id: 'enhanced-sidenav',
  isOpen: state.sidenavOpen,
  onToggle: (isOpen) => { state.sidenavOpen = isOpen; },
  position: 'left',
  mode: 'overlay',
  width: 280,
  showHamburger: true,         // Show hamburger toggle button
  expandable: true,            // Enable collapse/expand
  isExpanded: true,            // Control expanded state
  onExpandChange: (expanded) => {
    console.log('Sidenav expanded:', expanded);
  },
  // Header item (displays before expand/collapse toggle)
  header: {
    text: 'My App',
    icon: 'apps',              // Material Icons font name
    // Or use custom SVG: icon: { type: 'svg', content: '<svg>...</svg>' }
    // Or use image: icon: { type: 'image', content: '/logo.png' }
    onclick: () => { console.log('Header clicked'); }
  },
  // Footer item (displays at bottom)
  footer: {
    text: 'Settings',
    icon: 'settings',
    onclick: () => { console.log('Footer clicked'); }
  }
}, [
  m(SidenavItem, {
    text: 'Projects',
    icon: 'folder',
    active: state.activeMenuItem === 1,
    onclick: () => { state.activeMenuItem = 1; },
    // Checkbox submenu - multiple selections
    submenu: [
      {
        text: 'Show Active',
        selected: state.filters.has('active'),
        value: 'active',
        onSelect: (value, selected) => {
          if (selected) state.filters.add(value);
          else state.filters.delete(value);
        }
      },
      // ... more checkbox items
    ],
    submenuMode: 'checkbox'
  }),
  m(SidenavItem, {
    text: 'View Mode',
    icon: 'view_module',
    active: state.activeMenuItem === 2,
    onclick: () => { state.activeMenuItem = 2; },
    // Radio submenu - single selection
    submenu: [
      {
        text: 'Grid View',
        icon: 'grid_view',
        selected: state.viewMode === 'grid',
        value: 'grid',
        onSelect: (value) => { state.viewMode = value; }
      },
      // ... more radio options
    ],
    submenuMode: 'radio'
  }),
  m(SidenavItem, {
    text: 'Quick Actions',
    icon: 'bolt',
    active: state.activeMenuItem === 3,
    onclick: () => { state.activeMenuItem = 3; },
    // No indicators - just clickable items
    submenu: [
      {
        text: 'Export Data',
        icon: 'download',
        onSelect: () => { console.log('Export'); }
      },
      {
        text: 'Import Data',
        icon: 'upload',
        onSelect: () => { console.log('Import'); }
      }
    ],
    submenuMode: 'none'  // No checkbox/radio indicators
  })
])`,
        }),

        // Wizard Example
        m('h3.header', 'Wizard/Stepper'),
        m('p', 'Multi-step interface for guiding users through complex processes:'),
        m('.row', [
          m('.col.s12', [
            m(Wizard, {
              steps: wizardSteps,
              currentStep: state.currentWizardStep,
              onStepChange: (stepIndex) => {
                state.currentWizardStep = stepIndex;
              },
              onComplete: () => {
                alert('Wizard completed!');
                console.log('Final data:', state.wizardData);
              },
              showStepNumbers: true,
              linear: true,
              showNavigation: true,
              orientation: 'horizontal',
              allowHeaderNavigation: false,
              labels: {
                next: 'Continue',
                previous: 'Back',
                complete: 'Submit',
                skip: 'Skip this step',
              },
            }),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { Wizard } from 'mithril-materialized';

const steps = [
  {
    title: 'Personal Information',
    subtitle: 'Enter your basic details',
    icon: 'person',
    vnode: () => m('div', [/* your form content */]),
    validate: () => {
      return state.name.length > 0 && state.email.includes('@');
    }
  },
  {
    title: 'Message',
    subtitle: 'Tell us about yourself', 
    icon: 'message',
    optional: true,
    vnode: () => m('div', [/* optional step content */])
  },
  {
    title: 'Review',
    subtitle: 'Confirm your information',
    icon: 'preview', 
    vnode: () => m('div', [/* review step content */])
  }
];

m(Wizard, {
  steps: steps,
  currentStep: state.currentStep,
  onStepChange: (stepIndex) => { state.currentStep = stepIndex; },
  onComplete: () => { console.log('Completed!'); },
  showStepNumbers: true,
  linear: true,                    // Must complete steps in order
  orientation: 'horizontal',       // 'horizontal' | 'vertical'
  allowHeaderNavigation: false,    // Click step headers to navigate
  labels: {
    next: 'Continue',
    previous: 'Back', 
    complete: 'Submit',
    skip: 'Skip this step'
  }
})`,
        }),

        m('h3.header', 'Features'),
        m('ul.collection', [
          m('li.collection-item', [
            m('strong', 'Sidenav'),
            m('ul', [
              m('li', 'Responsive behavior with overlay and push modes'),
              m('li', 'Left or right positioning'),
              m('li', 'Backdrop overlay with customizable behavior'),
              m('li', 'Keyboard navigation (ESC to close)'),
              m('li', 'Flexible content with dividers and subheaders'),
              m('li', 'Header and footer items for branding/navigation'),
              m('li', 'Hamburger toggle button with customizable position'),
              m('li', 'Collapse/expand functionality (icons only vs icons + text)'),
              m('li', 'Submenu support with checkbox, radio, and none modes'),
              m('li', 'Custom icons support: Material Icons font, inline SVG, or images'),
              m('li', 'Dark and light theme support with proper contrast'),
              m('li', 'Smooth animations for all state transitions'),
            ]),
          ]),
          m('li.collection-item', [
            m('strong', 'Breadcrumb'),
            m('ul', [
              m('li', 'Automatic path generation from URLs'),
              m('li', 'Customizable separators and icons'),
              m('li', 'Responsive design with text truncation'),
              m('li', 'Support for long paths with ellipsis'),
              m('li', 'Home icon and custom route mapping'),
            ]),
          ]),
          m('li.collection-item', [
            m('strong', 'Wizard/Stepper'),
            m('ul', [
              m('li', 'Linear and non-linear navigation modes'),
              m('li', 'Step validation with async support'),
              m('li', 'Optional steps that can be skipped'),
              m('li', 'Horizontal and vertical orientations'),
              m('li', 'Customizable navigation buttons and labels'),
              m('li', 'Progress indication with completed/error states'),
            ]),
          ]),
        ]),
      ]),
  };
};
