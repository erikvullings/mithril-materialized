import m from 'mithril';
import {
  ModalPanel,
  CodeBlock,
  Button,
  MaterialBox,
  Select,
  ISelectOptions,
  Dropdown,
  IDropdownOptions,
} from 'mithril-materialized';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const ModalPage = () => {
  const onchange = (v: unknown) => alert(v);
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
          m(Button, { label: 'Open modal', modalId: 'modal1' }),
          m(ModalPanel, {
            id: 'modal1',
            title: 'Do you like this library?',
            description: 'This is some content.',
            options: { opacity: 0.7 },
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
          code: `          m(Button, { label: 'Open modal', modalId: 'modal1' }),
          m(ModalPanel, {
            id: 'modal1',
            title: 'Do you like this library?',
            description: 'This is some content.',
            options: { opacity: 0.7 },
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

        m('h3.header', 'Normal Modal with Select and Dropdown'),
        m(
          '.row',
          m(Button, { label: 'Open modal', modalId: 'modal1b' }),
          m(ModalPanel, {
            id: 'modal1b',
            title: 'Tell me about yourself',
            description: m(
              '.row', // So the content has enough vertical space
              [
                m(Select, {
                  dropdownOptions: { container: document.body }, // So the select is not hidden
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
                } as ISelectOptions<string>),
                m(Dropdown, {
                  container: document.body, // So the dropdown is not hidden
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
                } as IDropdownOptions<string>),
              ]
            ),

            options: { opacity: 0.7 },
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
          code: `          m(Button, { label: 'Open modal', modalId: 'modal1b' }),
          m(ModalPanel, {
            id: 'modal1b',
            title: 'Tell me about yourself',
            description: m(
              '.row', // So the content has enough vertical space
              [
                m(Select, {
                  dropdownOptions: { container: document.body }, // So the select is not hidden
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
                  onchange: v => console.log(v),
                } as ISelectOptions),
                m(Dropdown, {
                  container: document.body, // So the dropdown is not hidden
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
                  onchange: v => console.log(v),
                } as IDropdownOptions),
              ]
            ),
            options: { opacity: 0.7 },
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
          m(Button, { label: 'Fixed footer modal', modalId: 'modal2' }),
          m(ModalPanel, {
            id: 'modal2',
            title: 'Do you like this library?',
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
          code: `          m(Button, { label: 'Bottom modal', modalId: 'modal3' }),
          m(ModalPanel, {
            id: 'modal3',
            title: 'Do you like this library?',
            description: 'This is some content. ... and much more',
            fixedFooter: true,
            richContent: true, // If richContent is true, it means that the description may contain HTML.
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
          m(Button, { label: 'Open bottom modal', modalId: 'modal3' }),
          m(ModalPanel, {
            id: 'modal3',
            title: 'Do you like this library?',
            description: 'This is some content.',
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
          code: `          m(Button, { label: 'Open modal', modalId: 'modal1' }),
          m(ModalPanel, {
            id: 'modal1',
            title: 'Do you like this library?',
            description: 'This is some content.',
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
          m(Button, { label: 'Open bottom content modal', modalId: 'modal4' }),
          m(ModalPanel, {
            id: 'modal4',
            title: 'Content modal',
            description: m(MaterialBox, { src: gogh, width: 400 }),
            bottomSheet: true,
          })
        ),
        m(CodeBlock, {
          code: `          m(Button, { label: 'Open bottom content modal', modalId: 'modal4' }),
          m(ModalPanel, {
            id: 'modal4',
            title: 'Content modal',
            description: m(MaterialBox, { src: gogh, width: 400 }),
            bottomSheet: true,
          })`,
        }),
      ]),
  };
};
