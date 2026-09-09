import { HighlightedCodeBlock } from "../highlighted-code-block";
import m from 'mithril';
import {
  AlertDialog,
  Button,
  CommandPalette,
  ContextMenu,
  Dialog,
  MaterialBox,
  Menu,
  ModalPanel,
  Select,
  SelectAttrs,
  Dropdown,
  DropdownAttrs,
} from 'mithril-materialized';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const ModalPage = () => {
  const ActionMenu = Menu<'edit' | 'duplicate' | 'archive'>();
  const ProjectContextMenu = ContextMenu<'rename' | 'download' | 'delete'>();
  const AppCommands = CommandPalette<'home' | 'theme' | 'clear-cache'>();
  const onchange = (v: unknown) => alert(v);

  // State to control modal visibility
  const state = {
    dialogOpen: false,
    alertDialogOpen: false,
    commandPaletteOpen: false,
    modal1Open: false,
    modal1bOpen: false,
    modal2Open: false,
    modal3Open: false,
    modal4Open: false,
  };

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Modals'),
        m('p', [
          'The library supports all three modals types that are defined on the ',
          m('a[href=https://materializecss.com/modals.html#!][target=_blank]', 'materialize-css website'),
          '.',
        ]),
        m(
          'p',
          'The dialog examples use theme tokens, so the theme switcher demonstrates the same interactions in light and dark themes.'
        ),

        m('h3.header[id=command-palette]', 'Command Palette'),
        m(
          'p',
          'Press Ctrl+K or Command+K anywhere on this page, then search navigation and application commands.'
        ),
        m(
          '.row',
          m(Button, {
            label: 'Open command palette',
            onclick: () => {
              state.commandPaletteOpen = true;
            },
          }),
          m(AppCommands, {
            isOpen: state.commandPaletteOpen,
            onToggle: (open) => {
              state.commandPaletteOpen = open;
            },
            enableGlobalShortcut: true,
            commands: [
              {
                id: 'home',
                label: 'Go to home',
                description: 'Open the component overview',
                iconName: 'home',
                shortcut: 'G H',
                group: 'Navigation',
                execute: () => m.route.set('/home'),
              },
              {
                id: 'theme',
                label: 'Open theme settings',
                description: 'Review light and dark theme options',
                iconName: 'palette',
                shortcut: 'G T',
                group: 'Navigation',
                execute: () => m.route.set('/theme'),
              },
              {
                id: 'clear-cache',
                label: 'Clear local cache',
                description: 'Demonstrates an application action',
                iconName: 'cleaning_services',
                shortcut: 'Ctrl+Shift+C',
                group: 'Actions',
                execute: () => alert('Local cache cleared'),
              },
            ],
          })
        ),
        m(HighlightedCodeBlock, {
          code: `const AppCommands = CommandPalette<'home' | 'theme' | 'clear-cache'>();

m(AppCommands, {
  isOpen: state.commandPaletteOpen,
  onToggle: (open) => {
    state.commandPaletteOpen = open;
  },
  enableGlobalShortcut: true,
  commands: [
    {
      id: 'home',
      label: 'Go to home',
      group: 'Navigation',
      shortcut: 'G H',
      execute: () => m.route.set('/home'),
    },
    {
      id: 'clear-cache',
      label: 'Clear local cache',
      group: 'Actions',
      execute: clearCache,
    },
  ],
})`,
        }),

        m('h3.header[id=dialog]', 'Dialog'),
        m(
          '.row',
          m(Button, {
            label: 'Edit profile',
            onclick: () => {
              state.dialogOpen = true;
            },
          }),
          m(Dialog, {
            title: 'Edit profile',
            description: 'Review the account details before saving.',
            content: m('p', 'Your profile remains visible to everyone in your organization.'),
            isOpen: state.dialogOpen,
            onToggle: (open: boolean) => {
              state.dialogOpen = open;
            },
            actions: [{ label: 'Help', onclick: () => alert('Open profile help') }],
            secondaryAction: { label: 'Cancel' },
            primaryAction: { label: 'Save', onclick: () => alert('Profile saved') },
          })
        ),
        m(HighlightedCodeBlock, {
          code: `m(Dialog, {
  title: 'Edit profile',
  description: 'Review the account details before saving.',
  content: m('p', 'Your profile remains visible to everyone in your organization.'),
  isOpen: state.dialogOpen,
  onToggle: (open) => {
    state.dialogOpen = open;
  },
  actions: [{ label: 'Help' }],
  secondaryAction: { label: 'Cancel' },
  primaryAction: { label: 'Save', onclick: saveProfile },
})`,
        }),

        m('h3.header[id=alert-dialog]', 'Destructive Alert Dialog'),
        m(
          '.row',
          m(Button, {
            label: 'Delete project',
            onclick: () => {
              state.alertDialogOpen = true;
            },
          }),
          m(AlertDialog, {
            title: 'Delete project?',
            description: 'This permanently removes the project and all of its data.',
            isOpen: state.alertDialogOpen,
            onToggle: (open: boolean) => {
              state.alertDialogOpen = open;
            },
            secondaryAction: { label: 'Cancel' },
            primaryAction: {
              label: 'Delete project',
              destructive: true,
              onclick: () => alert('Project deleted'),
            },
          })
        ),
        m(HighlightedCodeBlock, {
          code: `m(AlertDialog, {
  title: 'Delete project?',
  description: 'This permanently removes the project and all of its data.',
  isOpen: state.alertDialogOpen,
  onToggle: (open) => {
    state.alertDialogOpen = open;
  },
  secondaryAction: { label: 'Cancel' },
  primaryAction: {
    label: 'Delete project',
    destructive: true,
    onclick: deleteProject,
  },
})`,
        }),

        m('h3.header[id=menu]', 'Action Menu'),
        m(
          '.row',
          m(ActionMenu, {
            ariaLabel: 'Project actions',
            trigger: (attrs) => m(Button, { ...attrs, label: 'Project actions', iconName: 'more_vert' }),
            items: [
              { id: 'edit', label: 'Edit project', iconName: 'edit' },
              { id: 'duplicate', label: 'Duplicate', iconName: 'content_copy' },
              { separator: true },
              { id: 'archive', label: 'Archive', iconName: 'archive', disabled: true },
            ],
            onSelect: (id) => alert(`Selected ${id}`),
          })
        ),
        m(HighlightedCodeBlock, {
          code: `const ActionMenu = Menu<'edit' | 'duplicate' | 'archive'>();

m(ActionMenu, {
  ariaLabel: 'Project actions',
  trigger: (attrs) =>
    m(Button, { ...attrs, label: 'Project actions', iconName: 'more_vert' }),
  items: [
    { id: 'edit', label: 'Edit project', iconName: 'edit' },
    { id: 'duplicate', label: 'Duplicate', iconName: 'content_copy' },
    { separator: true },
    { id: 'archive', label: 'Archive', iconName: 'archive', disabled: true },
  ],
  onSelect: (id) => runProjectAction(id),
})`,
        }),

        m('h3.header[id=context-menu]', 'Context Menu'),
        m('p', 'Right-click the surface, or focus it and press Shift+F10 or the Context Menu key.'),
        m(
          ProjectContextMenu,
          {
            ariaLabel: 'File actions',
            trigger: (attrs) =>
              m(
                '.card-panel',
                {
                  ...attrs,
                  tabindex: 0,
                  style: {
                    maxWidth: '520px',
                    cursor: 'context-menu',
                  },
                },
                [m('strong', 'quarterly-report.pdf'), m('br'), 'Context-click for file actions']
              ),
            items: [
              { id: 'rename', label: 'Rename', iconName: 'drive_file_rename_outline' },
              { id: 'download', label: 'Download', iconName: 'download' },
              { separator: true },
              { id: 'delete', label: 'Delete', iconName: 'delete' },
            ],
            onSelect: (id) => alert(`Selected ${id}`),
          }
        ),
        m(HighlightedCodeBlock, {
          code: `const FileMenu = ContextMenu<'rename' | 'download' | 'delete'>();

m(FileMenu, {
  ariaLabel: 'File actions',
  trigger: (attrs) =>
    m('.card-panel', { ...attrs, tabindex: 0 }, 'quarterly-report.pdf'),
  items: [
    { id: 'rename', label: 'Rename', iconName: 'drive_file_rename_outline' },
    { id: 'download', label: 'Download', iconName: 'download' },
    { separator: true },
    { id: 'delete', label: 'Delete', iconName: 'delete' },
  ],
  onSelect: (id) => runFileAction(id),
})`,
        }),

        m('h3.header[id=modal]', 'Normal Modal'),
        m(
          '.row',
          m(Button, {
            label: 'Open modal',
            onclick: () => {
              state.modal1Open = true;
            },
          }),
          m(ModalPanel, {
            title: 'Do you like this library?',
            description: 'This is some content.',
            closeOnButtonClick: true,
            isOpen: state.modal1Open,
            onToggle: (open: boolean) => {
              state.modal1Open = open;
            },
            buttons: [
              {
                label: 'Disagree',
                onclick: () => onchange('You make me sad...'),
              },
              {
                label: 'Agree',
                onclick: () => onchange('Thank you for the compliment!'),
              },
            ],
          })
        ),
        m(HighlightedCodeBlock, {
          code: `          // State to control modal visibility
                  const state = {
                    modal1Open: false,
                  };

                  // Button with onclick handler to control modal
                  m(Button, {
                    label: 'Open modal',
                    onclick: () => {
                      state.modal1Open = true;
                    },
                  }),
                  
                  // Modal with isOpen and onToggle for state management
                  m(ModalPanel, {
                    title: 'Do you like this library?',
                    description: 'This is some content.',
                    isOpen: state.modal1Open,
                    closeOnButtonClick: true,
                    onToggle: (open: boolean) => {
                      state.modal1Open = open;
                    },
                    buttons: [
                      {
                        label: 'Disagree',
                        onclick: () => onchange('You make me sad...'),
                      },
                      {
                        label: 'Agree',
                        onclick: () => onchange('Thank you for the compliment!'),
                      },
                    ],
                  })`,
        }),

        m('h3.header', 'Modal with Select Component'),
        m(
          '.row',
          m(Button, {
            label: 'Open modal',
            onclick: () => {
              state.modal1bOpen = true;
            },
          }),
          m(ModalPanel, {
            title: 'Select Component Test',
            isOpen: state.modal1bOpen,
            fixedFooter: true,
            bottomSheet: true,
            closeOnButtonClick: true,
            onToggle: (open: boolean) => {
              state.modal1bOpen = open;
            },
            description: m(
              '.row', // So the content has enough vertical space
              [
                m(
                  'p',
                  'The Select and Dropdown components automatically render their dropdowns outside the modal using a portal system. This keeps the list above the modal, scrollable when needed, and fully mouse-interactive. No additional configuration required!'
                ),
                m(Select, {
                  iconName: 'person',
                  label: 'What is your favorite hobby?',
                  placeholder: 'Pick one',
                  isMandatory: true,
                  options: [
                    { id: 'movies', label: 'Watching movies' },
                    { id: 'out', label: 'Going out' },
                    { id: 'sex', label: 'Having sex' },
                    { id: 'fitness', label: 'Fitness' },
                    { id: 'sleep', label: 'Sleeping' },
                  ],
                  onchange: (v) => console.log(v),
                } as SelectAttrs<string>),
                m(Select, {
                  iconName: 'work',
                  label: 'Pick multiple skills (multi-select)',
                  placeholder: 'Select skills',
                  multiple: true,
                  className: 'col s12',
                  options: [
                    { id: 'js', label: 'JavaScript' },
                    { id: 'ts', label: 'TypeScript' },
                    { id: 'react', label: 'React' },
                    { id: 'mithril', label: 'Mithril.js' },
                    { id: 'vue', label: 'Vue.js' },
                    { id: 'node', label: 'Node.js' },
                  ],
                  onchange: (v) => console.log('Selected skills:', v),
                } as SelectAttrs<string>),
                m(Dropdown, {
                  id: 'hobby',
                  iconName: 'my_location',
                  label: 'Pick a hobby',
                  helperText: 'Help me',
                  className: 'col s6',
                  items: [
                    { label: 'Movies', id: 'movies', iconName: 'local_movies' },
                    { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
                    { label: 'Eating', id: 'eating', iconName: 'restaurant' },
                    { label: '', divider: true },
                    { label: 'Sex', id: 'sex', iconName: 'group' },
                  ],
                  onchange: (v) => console.log(v),
                } as DropdownAttrs<string>),
              ]
            ),
            buttons: [
              {
                label: 'Disagree',
              },
              {
                label: 'Agree',
              },
            ],
          })
        ),
        m(HighlightedCodeBlock, {
          code: `          // State to control modal visibility
                  const state = {
                    modal1bOpen: false,
                  };

                  // Button to open modal
                  m(Button, {
                    label: 'Open modal',
                    onclick: () => {
                      state.modal1bOpen = true;
                    },
                  }),

                  // Modal with form components
                  m(ModalPanel, {
                    id: 'modal1b',
                    title: 'Tell me about yourself',
                    isOpen: state.modal1bOpen,
                    closeOnButtonClick: true,
                    onToggle: (open: boolean) => {
                      state.modal1bOpen = open;
                    },
                    description: m(
                      '.row', // So the content has enough vertical space
                      [
                        m('p', 'The Select and Dropdown components automatically render their dropdowns outside the modal using a portal system. This keeps the list above the modal, scrollable when needed, and fully mouse-interactive. No additional configuration required!'),
                        m(Select, {
                          iconName: 'person',
                          label: 'What is your favorite hobby?',
                          placeholder: 'Pick one',
                          isMandatory: true,
                          options: [
                            { label: 'Pick one', disabled: true },
                            { id: 'movies', label: 'Watching movies' },
                            { id: 'out', label: 'Going out' },
                            { id: 'sex', label: 'Having sex' },
                            { id: 'fitness', label: 'Fitness' },
                            { id: 'sleep', label: 'Sleeping' },
                          ],
                          onchange: (v) => console.log(v),
                        } as SelectAttrs<string>),
                        m(Select, {
                          iconName: 'work',
                          label: 'Pick multiple skills (multi-select)',
                          placeholder: 'Select skills',
                          multiple: true,
                          className: 'col s12',
                          options: [
                            { id: 'js', label: 'JavaScript' },
                            { id: 'ts', label: 'TypeScript' },
                            { id: 'react', label: 'React' },
                            { id: 'mithril', label: 'Mithril.js' },
                            { id: 'vue', label: 'Vue.js' },
                            { id: 'node', label: 'Node.js' },
                          ],
                          onchange: (v) => console.log('Selected skills:', v),
                        } as SelectAttrs<string>),
                        m(Dropdown, {
                          id: 'hobby',
                          iconName: 'my_location',
                          label: 'Pick a hobby',
                          helperText: 'Help me',
                          className: 'col s6',
                          items: [
                            { label: 'Movies', id: 'movies', iconName: 'local_movies' },
                            { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
                            { label: 'Eating', id: 'eating', iconName: 'restaurant' },
                            { label: '', divider: true },
                            { label: 'Sex', id: 'sex', iconName: 'group' },
                          ],
                          onchange: (v) => console.log(v),
                        } as DropdownAttrs<string>),
                      ]
                    ),
                    buttons: [
                      {
                        label: 'Disagree',
                      },
                      {
                        label: 'Agree',
                      },
                    ],
                  })`,
        }),

        m('h3.header', 'Fixed Footer Modal'),
        m(
          '.row',
          m(Button, {
            label: 'Fixed footer modal',
            onclick: () => {
              state.modal2Open = true;
            },
          }),
          m(ModalPanel, {
            title: 'Do you like this library?',
            isOpen: state.modal2Open,
            closeOnButtonClick: true,
            onToggle: (open: boolean) => {
              state.modal2Open = open;
            },
            fixedFooter: true,
            richContent: true,
            description: `This is some content.<br><br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
        This is some content.<br>
                    `,
            buttons: [
              {
                label: 'Disagree',
                onclick: () => onchange('You make me sad...'),
              },
              {
                label: 'Agree',
                onclick: () => onchange('Thank you for the compliment!'),
              },
            ],
          })
        ),
        m(HighlightedCodeBlock, {
          code: `          // State to control modal visibility
                  const state = {
                    modal2Open: false,
                  };

                  // Button to open fixed footer modal
                  m(Button, {
                    label: 'Fixed footer modal',
                    onclick: () => {
                      state.modal2Open = true;
                    },
                  }),

                  // Fixed footer modal with scrollable content
                  m(ModalPanel, {
                    title: 'Do you like this library?',
                    isOpen: state.modal2Open,
                    closeOnButtonClick: true,
                    onToggle: (open: boolean) => {
                      state.modal2Open = open;
                    },
                    fixedFooter: true,
                    richContent: true, // If richContent is true, it means that the description may contain HTML.
                    description: 'This is some long content that will scroll...',
                    buttons: [
                      {
                        label: 'Disagree',
                        onclick: () => onchange('You make me sad...'),
                      },
                      {
                        label: 'Agree',
                        onclick: () => onchange('Thank you for the compliment!'),
                      },
                    ],
                  })`,
        }),

        m('h3.header', 'Bottom Modal'),
        m(
          '.row',
          m(Button, {
            label: 'Open bottom modal',
            onclick: () => {
              state.modal3Open = true;
            },
          }),
          m(ModalPanel, {
            id: 'modal3',
            title: 'Do you like this library?',
            description: 'This is some content.',
            isOpen: state.modal3Open,
            onToggle: (open: boolean) => {
              state.modal3Open = open;
            },
            bottomSheet: true,
            buttons: [
              {
                label: 'Disagree',
                onclick: () => onchange('You make me sad...'),
              },
              {
                label: 'Agree',
                onclick: () => onchange('Thank you for the compliment!'),
              },
            ],
          })
        ),
        m(HighlightedCodeBlock, {
          code: `          // State to control modal visibility
                  const state = {
                    modal3Open: false,
                  };

                  // Button to open bottom modal
                  m(Button, {
                    label: 'Open bottom modal',
                    onclick: () => {
                      state.modal3Open = true;
                    },
                  }),

                  // Bottom sheet modal
                  m(ModalPanel, {
                    id: 'modal3',
                    title: 'Do you like this library?',
                    description: 'This is some content.',
                    isOpen: state.modal3Open,
                    onToggle: (open: boolean) => {
                      state.modal3Open = open;
                    },
                    bottomSheet: true,
                    buttons: [
                      {
                        label: 'Disagree',
                        onclick: () => onchange('You make me sad...'),
                      },
                      {
                        label: 'Agree',
                        onclick: () => onchange('Thank you for the compliment!'),
                      },
                    ],
                  })`,
        }),

        m('h3.header', 'Vnode as content'),
        m(
          '.row',
          m(Button, {
            label: 'Open bottom content modal',
            onclick: () => {
              state.modal4Open = true;
            },
          }),
          m(ModalPanel, {
            id: 'modal4',
            title: 'Content modal',
            description: m(MaterialBox, { src: gogh, width: 400 }),
            isOpen: state.modal4Open,
            onToggle: (open: boolean) => {
              state.modal4Open = open;
            },
            bottomSheet: true,
          })
        ),
        m(HighlightedCodeBlock, {
          code: `          // State to control modal visibility
                  const state = {
                    modal4Open: false,
                  };

                  // Button to open content modal
                  m(Button, {
                    label: 'Open bottom content modal',
                    onclick: () => {
                      state.modal4Open = true;
                    },
                  }),

                  // Modal with vnode content (image)
                  m(ModalPanel, {
                    id: 'modal4',
                    title: 'Content modal',
                    description: m(MaterialBox, { src: gogh, width: 400 }),
                    isOpen: state.modal4Open,
                    onToggle: (open: boolean) => {
                      state.modal4Open = open;
                    },
                    bottomSheet: true,
                  })`,
        }),
      ]),
  };
};
