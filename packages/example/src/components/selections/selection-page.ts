import m from 'mithril';
import {
  Select,
  CodeBlock,
  Options,
  Switch,
  RadioButtons,
  Dropdown,
  DropdownAttrs,
  SearchSelect,
  TextInput,
} from 'mithril-materialized';

export const SelectionPage = () => {
  const state = {
    ids: undefined as number | number[] | undefined,
    radioId: undefined as string | undefined,
    checkedId: undefined as string | string[] | undefined,
    checkedIds: [0, 2],
    checked: true,
  };

  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Selections'),

        m('h3.header', 'Select'),
        m(
          '.row',
          m(Select<string>, {
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // disabled: true,
            placeholder: 'Pick one', // Alternative to first option, is also the default
            isMandatory: true,
            checkedId: state.checkedId,
            options: [
              // { label: 'Pick one', disabled: true },
              // { id: 0, label: 'Option 0' },
              {
                id: 'movies',
                // img: 'https://loremflickr.com/320/240?random=1',
                label: 'Watching movies',
                title: 'Sitting for the TV, doing nothing',
              },
              {
                id: 'out',
                // img: 'https://loremflickr.com/320/240?random=2',
                label: 'Going out',
                title: 'Scanning the environment, talking to strangers',
              },
            ],
            onchange: (ids) => (state.checkedId = ids),
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Select<string>, {
            // disabled: true, // Add disabled if you want to disable the select control
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            checkedId: state.checkedId,
            options: [ // img property is optional
              { label: 'Pick one', disabled: true }, // IDs are optional: ID = label when missing
              { id: 'movies', img: "https://loremflickr.com/320/240?random=1", label: 'Watching movies' },
              { id: 'out', img: "https://loremflickr.com/320/240?random=2", label: 'Going out' },
            ],
            onchange: (ids) => (state.checkedId = ids),
          })`,
        }),

        m('h3.header', 'Select multiple'),
        m(
          '.row',
          m(Select<number>, {
            multiple: true,
            // iconName: 'person',
            placeholder: 'Make a choice...',
            label: 'What are your favorite hobbies?',
            classes: 'my-select-wrapper-classes',
            checkedId: state.checkedIds,
            onchange: (v) => {
              state.checkedIds = v;
              console.log(v);
            },
            options: [
              { id: 0, label: 'Watching movies' },
              { id: 1, label: 'Going out' },
              { id: 2, label: 'Reading' },
              { id: 3, label: 'Sex', disabled: true },
              { id: 4, label: 'Horse riding' },
            ],
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            '.row',
            m(Select<number>, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              classes: 'my-select-wrapper-classes',
              checkedId: state.checkedIds, // [0, 2]
              onchange: v => {
                state.checkedIds = v as number[];
                console.log(v);
              },
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Sex', disabled: true },
                { id: 4, label: 'Horse riding' },
              ],
            })
          )`,
        }),

        m('h3.header', 'Select option group'),
        m(
          '.row',
          m(Select<number>, {
            placeholder: 'Make a choice...',
            label: 'What are your favorite hobbies?',
            checkedId: state.checkedIds,
            onchange: (v) => {
              state.checkedIds = v;
              console.log(v);
            },
            options: [
              { id: 1, group: 'Indoors', label: 'Watching movies' },
              { id: 2, group: 'Indoors', label: 'Reading' },
              { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
              { id: 4, group: 'Outdoors', label: 'Going out' },
              { id: 5, group: 'Outdoors', label: 'Horse riding' },
            ],
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            '.row',
            m(Select<number>, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              checkedId: state.checkedIds,
              onchange: v => {
                state.checkedIds = v;
                console.log(v);
              },
              options: [
                { id: 1, group: 'Indoors', label: 'Watching movies' },
                { id: 2, group: 'Indoors', label: 'Reading' },
                { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
                { id: 4, group: 'Outdoors', label: 'Going out' },
                { id: 5, group: 'Outdoors', label: 'Horse riding' },
              ],
            })
          )`,
        }),

        m('h3.header', 'Select multiple with search'),
        m(
          '.row',
          m(SearchSelect<number>, {
            label: 'What are your favorite hobbies?',
            placeholder: 'Make a choice...',
            className: 'col s12',
            checkedId: state.checkedIds,
            onchange: (v) => {
              state.checkedIds = v;
              console.log(v);
            },
            options: [
              { id: 0, label: 'Watching movies' },
              { id: 1, label: 'Going out' },
              { id: 2, label: 'Reading' },
              { id: 3, label: 'Sex', disabled: true },
              { id: 4, label: 'Horse riding' },
            ],
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(
            '.row',
            m(SearchSelect<number>, {
              label: 'What are your favorite hobbies?',
              placeholder: 'Make a choice...',
              className: 'col s12',
              checkedId: state.checkedIds,
              onchange: (v) => {
                state.checkedIds = v;
                console.log(v);
              },
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Sex', disabled: true },
                { id: 4, label: 'Horse riding' },
              ],
          })`,
        }),

        m('h3.header', 'Options'),
        m(
          '.row',
          m(Options<string>, {
            label: 'What are your favorite hobbies?',
            checkboxClass: 'col s4',
            isMandatory: true,
            checkedId: state.checkedId,
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: (ids) => {
              // onchange(`Options ${ids.join()} are checked.`);
              state.checkedId = ids;
            },
          })
        ),
        m(
          '.row',
          m(Options<string>, {
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            showSelectAll: true,
            checkedId: state.checkedId,
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: (ids) => {
              // onchange(`Options ${ids.join()} are checked.`);
              state.checkedId = ids;
            },
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(Options<string>, {
            inline: true, // next one is false
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            checkedId: 'out',
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
          m(RadioButtons<string>, {
            checkboxClass: 'col s3',
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'reading', label: 'Reading' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            checkedId: state.radioId,
            onchange: (ids) => (state.radioId = ids),
          })
        ),
        m(
          '.row',
          m(RadioButtons<string>, {
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'reading', label: 'Reading' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            checkedId: state.radioId,
            onchange: (ids) => (state.radioId = ids),
          })
        ),
        m(CodeBlock, {
          newRow: true,
          code: `          m(RadioButtons<string>, {
            checkboxClass: 'col s4', // to align items horizontally
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'reading', label: 'Reading', iconName: 'import_contacts' },
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
            className: 'col s6 m3',
            checked: state.checked,
            onchange: (checked) => {
              console.log(`Switch checke state is ${checked}`);
              state.checked = checked;
            },
          }),
          m(TextInput, {
            label: 'What is your name',
            className: 'col s6 m9',
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
          m(Dropdown<string>, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            className: 'col s6',
            // disabled: true,
            checkedId: state.radioId,
            items: [
              { id: 'movies', label: 'Movies', iconName: 'local_movies' },
              { id: 'out', label: 'Going out', iconName: 'restaurant' },
              { id: 'reading', label: 'Reading', iconName: 'import_contacts' },
              { label: '', divider: true },
              { id: 'sex', label: 'Sex', iconName: 'group', disabled: true },
            ],
            onchange: (v) => {
              state.radioId = v;
            },
          })
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
