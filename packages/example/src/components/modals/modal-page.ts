import m from 'mithril';
import {
  ModalPanel,
  CodeBlock,
  Button,
  MaterialBox,
  Select,
  SelectAttrs,
  Dropdown,
  DropdownAttrs,
} from 'mithril-materialized';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const ModalPage = () => {
  const onchange = (v: unknown) => alert(v);

  // State to control modal visibility
  const state = {
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

        m('h3.header', 'Normal Modal'),
        m(
          '.row',
          m(Button, {
            label: 'Open modal',
            onclick: () => {
              state.modal1Open = true;
            },
          }),
          m(ModalPanel, {
            id: 'modal1',
            title: 'Do you like this library?',
            description: 'This is some content.',
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
        m(CodeBlock, {
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
                    id: 'modal1',
                    title: 'Do you like this library?',
                    description: 'This is some content.',
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
            id: 'modal1b',
            title: 'Select Component Test',
            isOpen: state.modal1bOpen,
            fixedFooter: true,
            bottomSheet: true,
            onToggle: (open: boolean) => {
              state.modal1bOpen = open;
            },
            description: m(
              '.row', // So the content has enough vertical space
              [
                m(
                  'p',
                  'The Select and Dropdown components now automatically render their dropdowns outside the modal using a portal system. This ensures the dropdown appears above the modal with its own scrolling when needed. No additional configuration required!'
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
        m(CodeBlock, {
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
                    onToggle: (open: boolean) => {
                      state.modal1bOpen = open;
                    },
                    description: m(
                      '.row', // So the content has enough vertical space
                      [
                        m('p', 'The Select and Dropdown components now automatically render their dropdowns outside the modal using a portal system. This ensures the dropdown appears above the modal with its own scrolling when needed. No additional configuration required!'),
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
            id: 'modal2',
            title: 'Do you like this library?',
            isOpen: state.modal2Open,
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
        m(CodeBlock, {
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
                    id: 'modal2',
                    title: 'Do you like this library?',
                    isOpen: state.modal2Open,
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
        m(CodeBlock, {
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
        m(CodeBlock, {
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
