import m from 'mithril';
import {
  Select,
  CodeBlock,
  Options,
  Switch,
  RadioButtons,
  Dropdown,
  SearchSelect,
  TextInput,
  LikertScale,
} from 'mithril-materialized';

export const SelectionPage = () => {
  const state = {
    ids: undefined as number | number[] | undefined,
    radioId: undefined as string | undefined,
    checkedId: undefined as string | string[] | undefined,
    checkedIds: [0, 2],
    checked: true,
    // Likert Scale state
    happiness: 3,
    satisfaction: undefined as number | undefined,
    engagement: undefined as number | undefined,
    quality: undefined as number | undefined,
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
                img: 'https://picsum.photos/320/240?random=1',
                label: 'Watching movies',
                title: 'Sitting for the TV, doing nothing',
              },
              {
                id: 'out',
                img: 'https://picsum.photos/320/240?random=2',
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
              { id: 'movies', img: "https://picsum.photos/320/240?random=1", label: 'Watching movies' },
              { id: 'out', img: "https://picsum.photos/320/240?random=2", label: 'Going out' },
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
            multiple: true,
            checkedId: state.checkedIds,
            onchange: (v) => {
              state.checkedIds = v;
              console.log(v);
            },
            options: [
              { id: 0, group: 'Indoors', label: 'Watching movies', img: 'https://picsum.photos/320/240?random=1' },
              { id: 2, group: 'Indoors', label: 'Reading', img: 'https://picsum.photos/320/240?random=2' },
              { id: 3, group: 'Indoors', label: 'Sex', disabled: true, img: 'https://picsum.photos/320/240?random=3' },
              { id: 1, group: 'Outdoors', label: 'Going out', img: 'https://picsum.photos/320/240?random=4' },
              { id: 4, group: 'Outdoors', label: 'Horse riding', img: 'https://picsum.photos/320/240?random=5' },
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
                { id: 0, group: 'Indoors', label: 'Watching movies' },
                { id: 2, group: 'Indoors', label: 'Reading' },
                { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
                { id: 1, group: 'Outdoors', label: 'Going out' },
                { id: 4, group: 'Outdoors', label: 'Horse riding' },
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
        // Likert Scale Examples
        m('h3.header', 'Likert Scale'),
        m(
          'p.caption',
          'Rating scales for survey questions with semantic anchors. Perfect for questionnaires and feedback forms.'
        ),

        // Basic usage
        m('h4', 'Basic Usage'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Simple Scale'),
            m(LikertScale, {
              label: 'How happy are you?',
              min: 1,
              max: 5,
              value: state.happiness,
              onchange: (value: number) => {
                state.happiness = value;
              },
              startLabel: 'Very Unhappy',
              endLabel: 'Very Happy',
            }),
            m('p.grey-text', `Current selection: ${state.happiness || 'None'}`),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Scale with Middle Label'),
            m(LikertScale, {
              label: 'How satisfied are you?',
              min: 1,
              max: 5,
              value: state.satisfaction,
              onchange: (value: number) => {
                state.satisfaction = value;
              },
              startLabel: 'Very Dissatisfied',
              middleLabel: 'Neutral',
              endLabel: 'Very Satisfied',
            }),
            m('p.grey-text', `Current selection: ${state.satisfaction || 'None'}`),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Basic Likert Scale
m(LikertScale, {
  label: 'How happy are you?',
  min: 1,
  max: 5,
  value: happiness,
  onchange: (value) => { happiness = value; },
  startLabel: 'Very Unhappy',
  endLabel: 'Very Happy',
})`,
        }),

        // Size and density variants
        m('h4', 'Size & Density Variants'),
        m('.row', [
          m('.col.s12.m4', [
            m('h6', 'Small & Compact'),
            m(LikertScale, {
              min: 1,
              max: 5,
              defaultValue: 3,
              size: 'small',
              density: 'compact',
              startLabel: 'Low',
              endLabel: 'High',
            }),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Medium & Standard (Default)'),
            m(LikertScale, {
              min: 1,
              max: 5,
              defaultValue: 3,
              size: 'medium',
              density: 'standard',
              startLabel: 'Low',
              endLabel: 'High',
            }),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Large & Comfortable'),
            m(LikertScale, {
              min: 1,
              max: 5,
              defaultValue: 3,
              size: 'large',
              density: 'comfortable',
              startLabel: 'Low',
              endLabel: 'High',
            }),
          ]),
        ]),

        // Tooltips
        m('h4', 'With Tooltips'),
        m('.row', [
          m('.col.s12', [
            m(LikertScale, {
              label: 'Rate the quality',
              min: 1,
              max: 5,
              value: state.quality,
              onchange: (value: number) => {
                state.quality = value;
              },
              showTooltips: true,
              tooltipLabels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
              startLabel: 'Poor',
              endLabel: 'Excellent',
            }),
            m('p.grey-text', 'Hover over the radio buttons to see descriptive labels'),
          ]),
        ]),

        m(CodeBlock, {
          code: `m(LikertScale, {
  label: 'Rate the quality',
  showTooltips: true,
  tooltipLabels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  startLabel: 'Poor',
  endLabel: 'Excellent',
})`,
        }),

        // Multi-question survey with alignment
        m('h4', 'Multi-Question Survey (Aligned)'),
        m(
          'p.caption',
          'When multiple questions use the same scale, alignLabels ensures consistent alignment for easy scanning.'
        ),
        m('.row', [
          m('.col.s12', [
            m('h5', 'Employee Satisfaction Survey'),
            m(LikertScale, {
              label: 'How happy are you at work?',
              alignLabels: true,
              min: 1,
              max: 5,
              value: state.happiness,
              onchange: (value: number) => {
                state.happiness = value;
              },
              startLabel: 'Unhappy',
              endLabel: 'Happy',
            }),
            m(LikertScale, {
              label: 'How satisfied are you with your role?',
              alignLabels: true,
              min: 1,
              max: 5,
              value: state.satisfaction,
              onchange: (value: number) => {
                state.satisfaction = value;
              },
              startLabel: 'Dissatisfied',
              endLabel: 'Satisfied',
            }),
            m(LikertScale, {
              label: 'How engaged do you feel?',
              alignLabels: true,
              min: 1,
              max: 5,
              value: state.engagement,
              onchange: (value: number) => {
                state.engagement = value;
              },
              startLabel: 'Disengaged',
              endLabel: 'Engaged',
            }),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Multi-question survey with aligned labels
m(LikertScale, {
  label: 'How happy are you at work?',
  alignLabels: true,  // Enables grid alignment
  min: 1,
  max: 5,
  value: happiness,
  onchange: (v) => { happiness = v; },
  startLabel: 'Unhappy',
  endLabel: 'Happy',
}),
m(LikertScale, {
  label: 'How satisfied are you with your role?',
  alignLabels: true,  // Aligns with other questions
  min: 1,
  max: 5,
  value: satisfaction,
  onchange: (v) => { satisfaction = v; },
  startLabel: 'Dissatisfied',
  endLabel: 'Satisfied',
})`,
        }),

        // Layout modes
        m('h4', 'Layout Modes'),
        m('.row', [
          m('.col.s12.m6', [
            m('h6', 'Horizontal (Desktop)'),
            m(LikertScale, {
              label: 'Rate this feature',
              layout: 'horizontal',
              min: 1,
              max: 5,
              defaultValue: 3,
              startLabel: 'Poor',
              endLabel: 'Great',
            }),
          ]),
          m('.col.s12.m6', [
            m('h6', 'Vertical (Mobile-friendly)'),
            m(LikertScale, {
              label: 'Rate this feature',
              layout: 'vertical',
              min: 1,
              max: 5,
              defaultValue: 3,
              startLabel: 'Poor',
              endLabel: 'Great',
            }),
          ]),
        ]),
        m('.row', [
          m('.col.s12', [
            m('h6', 'Responsive (Horizontal on desktop, vertical on mobile)'),
            m(LikertScale, {
              label: 'Rate this feature',
              layout: 'responsive',
              min: 1,
              max: 5,
              defaultValue: 3,
              startLabel: 'Poor',
              endLabel: 'Great',
            }),
            m('p.grey-text.text-darken-1', 'Resize your browser to see the layout change at 768px breakpoint'),
          ]),
        ]),

        // Different scales
        m('h4', 'Different Scale Ranges'),
        m('.row', [
          m('.col.s12.m6', [
            m('h6', '1-7 Scale'),
            m(LikertScale, {
              label: 'How likely are you to recommend us?',
              min: 1,
              max: 7,
              defaultValue: 4,
              startLabel: 'Not at all likely',
              middleLabel: 'Neutral',
              endLabel: 'Extremely likely',
            }),
          ]),
          m('.col.s12.m6', [
            m('h6', '0-10 Scale'),
            m(LikertScale, {
              label: 'Net Promoter Score',
              min: 0,
              max: 10,
              defaultValue: 5,
              startLabel: 'Detractor',
              middleLabel: 'Passive',
              endLabel: 'Promoter',
            }),
          ]),
        ]),

        // States
        m('h4', 'Component States'),
        m('.row', [
          m('.col.s12.m4', [
            m('h6', 'Default'),
            m(LikertScale, {
              min: 1,
              max: 5,
              defaultValue: 3,
              startLabel: 'Low',
              endLabel: 'High',
            }),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Read-only'),
            m(LikertScale, {
              min: 1,
              max: 5,
              value: 4,
              readonly: true,
              startLabel: 'Low',
              endLabel: 'High',
            }),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Disabled'),
            m(LikertScale, {
              min: 1,
              max: 5,
              value: 2,
              disabled: true,
              startLabel: 'Low',
              endLabel: 'High',
            }),
          ]),
        ]),

        // Without numbers
        m('h4', 'Without Numbers'),
        m('.row', [
          m('.col.s12', [
            m(LikertScale, {
              label: 'Rate your agreement',
              min: 1,
              max: 5,
              defaultValue: 3,
              showNumbers: false,
              startLabel: 'Strongly Disagree',
              middleLabel: 'Neutral',
              endLabel: 'Strongly Agree',
            }),
            m('p.grey-text', 'The numeric values are hidden, only anchor labels are shown'),
          ]),
        ]),

        m(CodeBlock, {
          code: `m(LikertScale, {
  label: 'Rate your agreement',
  showNumbers: false,  // Hide numeric values
  startLabel: 'Strongly Disagree',
  middleLabel: 'Neutral',
  endLabel: 'Strongly Agree',
})`,
        }),

        m('h4', 'Accessibility Features'),
        m('ul', [
          m('li', 'Full keyboard navigation: Tab to focus, Arrow keys to change selection, Space/Enter to confirm'),
          m('li', 'Screen reader support: Announces question, current selection, and range'),
          m('li', 'ARIA labels: Provides descriptive labels for assistive technologies'),
          m('li', 'Focus indicators: Clear visual feedback when navigating with keyboard'),
          m('li', 'Touch-friendly: Minimum 48x48dp touch targets for mobile devices'),
        ]),

        m('h4', 'Comparison: LikertScale vs RadioButtons vs Rating'),
        m('table.striped', [
          m('thead', [
            m('tr', [m('th', 'Feature'), m('th', 'LikertScale'), m('th', 'RadioButtons'), m('th', 'Rating')]),
          ]),
          m('tbody', [
            m('tr', [
              m('td', 'Purpose'),
              m('td', 'Survey questions'),
              m('td', 'Multiple choice'),
              m('td', 'Visual ratings'),
            ]),
            m('tr', [
              m('td', 'Input Type'),
              m('td', 'Radio buttons'),
              m('td', 'Radio buttons'),
              m('td', 'Clickable icons'),
            ]),
            m('tr', [
              m('td', 'Labels'),
              m('td', 'Scale anchors'),
              m('td', 'Option labels'),
              m('td', 'Optional tooltips'),
            ]),
            m('tr', [
              m('td', 'Layout'),
              m('td', 'Horizontal/Vertical'),
              m('td', 'Flexible grid'),
              m('td', 'Horizontal only'),
            ]),
            m('tr', [
              m('td', 'Form Submission'),
              m('td', 'Numeric value'),
              m('td', 'Selected ID'),
              m('td', 'Numeric value'),
            ]),
          ]),
        ]),
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
            value: 'movies',
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
