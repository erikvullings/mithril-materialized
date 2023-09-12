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
    ids: undefined as number | number[] | undefined,
    radioIds: undefined as string | number | undefined,
    checkedId: undefined as string | string[] | undefined,
    initialValue: [0, 2],
  };

  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Selections'),

        m('h3.header', 'Select'),
        m(
          '.row',
          m(Select, {
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // disabled: true,
            placeholder: 'Pick one', // Alternative to first option, is also the default
            isMandatory: true,
            // checkedId: state.checkedId,
            // initialValue: state.checkedId,
            options: [
              // { label: 'Pick one', disabled: true },
              // { id: 0, label: 'Option 0' },
              {
                id: 'movies',
                img: 'https://loremflickr.com/320/240?random=1',
                label: 'Watching movies',
                title: 'Sitting for the TV, doing nothing',
              },
              {
                id: 'out',
                img: 'https://loremflickr.com/320/240?random=2',
                label: 'Going out',
                title: 'Scanning the environment, talking to strangers',
              },
            ],
            onchange: (ids) => (state.checkedId = ids),
          } as ISelectOptions<string>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Select, {
            // disabled: true, // Add disabled if you want to disable the select control
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            options: [ // img property is optional
              { label: 'Pick one', disabled: true }, // IDs are optional: ID = label when missing
              { id: 'movies', img: "https://loremflickr.com/320/240?random=1", label: 'Watching movies' },
              { id: 'out', img: "https://loremflickr.com/320/240?random=2", label: 'Going out' },
            ],
            onchange,
          })`,
        }),

        m('h3.header', 'Select multiple'),
        m(
          '.row',
          m(Select, {
            multiple: true,
            placeholder: 'Make a choice...',
            label: 'What are your favorite hobbies?',
            classes: 'my-select-wrapper-classes',
            initialValue: state.initialValue,
            onchange: (v) => {
              // state.initialValue = v as number[];
              console.log(v);
            },
            options: [
              { id: 0, label: 'Watching movies' },
              { id: 1, label: 'Going out' },
              { id: 2, label: 'Reading' },
              { id: 3, label: 'Sex', disabled: true },
              { id: 4, label: 'Horse riding' },
            ],
          } as ISelectOptions<number>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            '.row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              classes: 'my-select-wrapper-classes',
              initialValue: state.initialValue, // [0, 2]
              onchange: v => {
                state.initialValue = v as number[];
                console.log(v);
              },
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Sex', disabled: true },
                { id: 4, label: 'Horse riding' },
              ],
            } as ISelectOptions<number>)
          )`,
        }),

        m('h3.header', 'Select option group'),
        m(
          '.row',
          m(Select, {
            placeholder: 'Make a choice...',
            label: 'What are your favorite hobbies?',
            // initialValue: state.initialValue,
            onchange: (v) => {
              // state.initialValue = v as number[];
              console.log(v);
            },
            options: [
              { id: 1, group: 'Indoors', label: 'Watching movies' },
              { id: 2, group: 'Indoors', label: 'Reading' },
              { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
              { id: 4, group: 'Outdoors', label: 'Going out' },
              { id: 5, group: 'Outdoors', label: 'Horse riding' },
            ],
          } as ISelectOptions<number>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            '.row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              // initialValue: state.initialValue, // [0, 2]
              onchange: v => {
                state.initialValue = v as number[];
                console.log(v);
              },
              options: [
                { id: 1, group: 'Indoors', label: 'Watching movies' },
                { id: 2, group: 'Indoors', label: 'Reading' },
                { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
                { id: 4, group: 'Outdoors', label: 'Going out' },
                { id: 5, group: 'Outdoors', label: 'Horse riding' },
              ],
            } as ISelectOptions<number>)
          )`,
        }),

        m('h3.header', 'Options'),
        m(
          '.row',
          m(Options, {
            label: 'What are your favorite hobbies?',
            checkboxClass: 'col s4',
            isMandatory: true,
            initialValue: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: (ids) => onchange(`Options ${ids.join()} are checked.`),
          })
        ),
        m(
          '.row',
          m(Options, {
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            initialValue: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: (ids) => onchange(`Options ${ids.join()} are checked.`),
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Options, {
            inline: true, // next one is false
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            initialValue: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: ids => onchange(\`Options \${ids.join()} are checked.\`),
          })`,
        }),

        m('h3.header', 'RadioButtons'),
        m('p', 'Linked radio buttons: when you change one of them, the other changes too.'),
        m(
          '.row',
          m(RadioButtons, {
            checkboxClass: 'col s4',
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            initialValue: 'out',
            checkedId: state.radioIds,
            onchange: (ids) => (state.radioIds = ids),
          })
        ),
        m(
          '.row',
          m(RadioButtons, {
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            initialValue: 'out',
            checkedId: state.radioIds,
            onchange: (ids) => (state.radioIds = ids),
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(RadioButtons, {
            checkboxClass: 'col s4', // to align items horizontally
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            checkedId: state.radioIds,
            onchange: ids => state.radioIds = ids,
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
            className: 'col s6',
            // disabled: true,
            initialValue: 'movies',
            items: [
              { label: 'Movies', id: 'movies', iconName: 'local_movies' },
              { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
              { label: 'Eating', id: 'eating', iconName: 'restaurant' },
              { label: '', divider: true },
              { label: 'Sex', id: 'sex', iconName: 'group' },
            ],
            onchange: (v) => console.log(v),
          } as IDropdownOptions<string>)
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Dropdown, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            className: 'col s6',
            // disabled: true,
            initialValue: 'movies',
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
