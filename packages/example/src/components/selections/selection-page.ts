import m from 'mithril';
import {
  Select,
  CodeBlock,
  Options,
  Switch,
  RadioButtons,
  Dropdown,
  IDropdownOptions,
  ISelectOptions,
} from 'mithril-materialized';

export const SelectionPage = () => {
  const state = {
    checkedId: undefined as string | undefined,
  };

  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);

  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Selections'),

        m('h3.header', 'Select'),
        m(
          'row',
          m(Select, {
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            checkedId: state.checkedId,
            options: [
              { label: 'Pick one', disabled: true },
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
            ],
            onchange,
          } as ISelectOptions<string>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Select, {
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            options: [
              { label: 'Pick one', disabled: true }, // IDs are optional: ID = label when missing
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
            ],
            onchange,
          })`,
        }),

        m('h3.header', 'Select multiple'),
        m(
          'row',
          m(Select, {
            multiple: true,
            placeholder: 'Make a choice...',
            label: 'What are your favorite hobbies?',
            checkedId: [0, 2],
            onchange: v => console.log(v),
            options: [
              { id: 0, label: 'Watching movies' },
              { id: 1, label: 'Going out' },
              { id: 2, label: 'Reading' },
              { id: 3, label: 'Karate' },
              { id: 4, label: 'Horse riding' },
            ],
          } as ISelectOptions<number>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            'row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              checkedId: [0, 2],
              onchange: v => console.log(v),
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Karate' },
                { id: 4, label: 'Horse riding' },
              ],
            } as ISelectOptions<number>)
          )`,
        }),

        m('h3.header', 'Options'),
        m(
          'row',
          m(Options, {
            label: 'What is your favorite hobby?',
            isMandatory: true,
            options: [{ id: 'movies', label: 'Watching movies' }, { id: 'out', label: 'Going out' }],
            onchange: (v: boolean, id: string) => onchange(`Option ${id} is changed to ${v}.`),
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Options, {
            label: 'What is your favorite hobby?',
            isMandatory: true,
            options: [{ id: 'movies', label: 'Watching movies' }, { id: 'out', label: 'Going out' }],
            onchange: (v: boolean, id: string) => onchange(\`Option \${id} is changed to \${v}.\`),
          })`,
        }),

        m('h3.header', 'RadioButtons'),
        m(
          'row',
          m(RadioButtons, {
            label: 'What is your favorite hobby?',
            options: [{ id: 'movies', label: 'Watching movies' }, { id: 'out', label: 'Going out' }],
            onchange,
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(RadioButtons, {
            label: 'What is your favorite hobby?',
            options: [{ id: 'movies', label: 'Watching movies' }, { id: 'out', label: 'Going out' }],
            onchange,
          })`,
        }),

        m('h3.header', 'Switch'),
        m(
          '.row',
          m(Switch, {
            label: 'What is your gender?',
            left: 'Man',
            right: 'Woman',
            onchange,
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Switch, {
            label: 'What is your gender?',
            left: 'Man',
            right: 'Woman',
            onchange,
          })`,
        }),

        m('h3.header', 'Dropdown'),
        m(
          '.row',
          m(Dropdown, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            contentClass: 'col s6',
            // checkedId: 'movies',
            items: [
              { label: 'Movies', id: 'movies', iconName: 'local_movies' },
              { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
              { label: 'Eating', id: 'eating', iconName: 'restaurant' },
              { label: '', divider: true },
              { label: 'Sex', id: 'sex', iconName: 'group' },
            ],
            onchange,
          } as IDropdownOptions<string>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Dropdown, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            contentClass: 'col s6',
            // checkedId: 'movies',
            items: [
              { label: 'Movies', id: 'movies', iconName: 'local_movies' },
              { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
              { label: 'Eating', id: 'eating', iconName: 'restaurant' },
              { label: '', divider: true },
              { label: 'Sex', id: 'sex', iconName: 'group' },
            ],
            onchange,
          })`,
        }),
      ]),
  };
};
