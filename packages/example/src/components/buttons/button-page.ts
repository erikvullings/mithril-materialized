import {
  RoundIconButton,
  IconButton,
  SubmitButton,
  Button,
  FlatButton,
  FloatingActionButton,
  CodeBlock,
  ToggleGroup,
  ConfirmButton,
} from 'mithril-materialized';
import m, { Component } from 'mithril';

export const ButtonPage = () => {
  const onclick = () => console.log('Button clicked');
  let singleValue: string | number = 'one';
  let multipleValues: Array<string | number> = ['one', 'three'];

  const starIcon = m(
    'svg[width=24][height=24][viewBox=0 0 24 24]',
    m('path', {
      d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    })
  );

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Buttons'),

        m('h3.header[id=fab]', 'Floating Action Button (FAB)'),
        m(FloatingActionButton, {
          className: 'red',
          iconName: 'mode_edit',
          direction: 'left',
          position: 'inline-right',
          buttons: [
            { iconName: 'insert_chart', className: 'red', onclick: () => console.log('Insert chart') },
            { iconName: 'format_quote', className: 'yellow darken-1', onclick: () => console.log('Format quote') },
            { iconName: 'publish', className: 'green', onclick: () => console.log('Publish') },
            { iconName: 'attach_file', className: 'blue', onclick: () => console.log('Attach file') },
          ],
        }),
        m(FloatingActionButton, {
          className: 'red',
          iconName: 'mode_edit',
          direction: 'left',
          buttons: [
            { iconName: 'insert_chart', className: 'red', onclick: () => console.log('Insert chart') },
            { iconName: 'format_quote', className: 'yellow darken-1', onclick: () => console.log('Format quote') },
            { iconName: 'publish', className: 'green', onclick: () => console.log('Publish') },
            { iconName: 'attach_file', className: 'blue', onclick: () => console.log('Attach file') },
          ],
        }),
        m(CodeBlock, {
          code: [
            `m(FloatingActionButton, {
  className: 'red',
  iconName: 'mode_edit',
  direction: 'left',
  position: 'inline-right', // Comment this out to get a FAB in the bottom-left of the page.
  buttons: [
    { iconName: 'insert_chart', className: 'red', onclick: () => console.log('Insert chart') },
    { iconName: 'format_quote', className: 'yellow darken-1', onclick: () => console.log('Format quote') },
    { iconName: 'publish', className: 'green', onclick: () => console.log('Publish') },
    { iconName: 'attach_file', className: 'blue', onclick: () => console.log('Attach file') },
  ],
}),`,
          ],
        }),

        m('h3.header[id=raised]', 'Raised'),
        m('div', [
          m(Button, { label: 'First Button', onclick }),
          m(Button, { label: 'Second Button', iconName: 'cloud', onclick }),
          m(Button, { label: 'Third Button', iconName: 'cloud', iconClass: 'right', onclick }),
          m(Button, {
            label: 'Fourth Button',
            iconName: 'cloud',
            attr: { disabled: true },
            onclick,
          }),
        ]),
        m(CodeBlock, {
          code: [
            `const onclick = () => alert('Button clicked');
m('div', [
  m(Button, { label: 'First Button', onclick }),
  m(Button, { label: 'Second Button', iconName: 'cloud', onclick }),
  m(Button, { label: 'Third Button', iconName: 'cloud', iconClass: 'right', onclick }),
  m(Button, {
    label: 'Fourth Button',
    iconName: 'cloud',
    attr: { disabled: true },
    onclick,
  }),
])`,
          ],
        }),
        m('h3.header[id=flatbutton]', 'FlatButton'),
        m('div', m(FlatButton, { label: 'My Flat button', onclick })),
        m(CodeBlock, { code: 'm(FlatButton, { label: "My Flat button", onclick })' }),
        m('h3.header[id=iconbutton]', 'IconButton'),
        m('div', m(IconButton, { iconName: 'favorite', onclick })),
        m(CodeBlock, { code: 'm(IconButton, { iconName: "favorite", onclick })' }),
        m('h3.header[id=roundiconbutton]', 'RoundIconButton'),
        m('div', m(RoundIconButton, { iconName: 'create', onclick })),
        m(CodeBlock, { code: 'm(RoundIconButton, { iconName: "create", onclick })' }),
        m('h3.header[id=togglegroup]', 'ToggleGroup'),
        m('h5', 'Controlled mode'),
        m('.row', [
          m(ToggleGroup, {
            value: singleValue,
            onchange: (v) => {
              singleValue = v as string | number;
              console.log('Single value changed:', v);
            },
            items: [
              { value: 'one', icon: starIcon, tooltip: 'Star (custom SVG icon)' },
              { value: 'two', iconName: 'format_align_center', tooltip: 'Align Center' },
              { value: 'three', iconName: 'format_align_right', tooltip: 'Align Right' },
              { value: 'four', iconName: 'format_align_justify', tooltip: 'Align Justify', disabled: true },
            ],
          }),
        ]),
        m('.row', [
          m(ToggleGroup, {
            multiple: true,
            value: multipleValues,
            onchange: (v) => {
              multipleValues = v as Array<string | number>;
              console.log('Multiple values changed:', v);
            },
            items: [
              { value: 'one', iconName: 'format_bold', tooltip: 'Bold' },
              { value: 'two', iconName: 'format_italic', tooltip: 'Italic' },
              { value: 'three', iconName: 'format_underlined', tooltip: 'Underline' },
              { value: 'four', iconName: 'format_color_fill', tooltip: 'Fill Color', disabled: true },
            ],
          }),
        ]),
        m('h5', 'Uncontrolled mode'),
        m(
          '.row',
          m(ToggleGroup, {
            multiple: true,
            defaultValue: ['one'],
            onchange: (v) => console.log('Uncontrolled mode value changed:', v),
            items: [
              { value: 'one', iconName: 'format_align_left', tooltip: 'Align Left' },
              { value: 'two', iconName: 'format_align_center', tooltip: 'Align Center' },
              { value: 'three', iconName: 'format_align_right', tooltip: 'Align Right' },
              { value: 'four', iconName: 'format_align_justify', tooltip: 'Align Justify', disabled: true },
            ],
          })
        ),
        m(CodeBlock, {
          code: `
let singleValue: string | number = 'one';
let multipleValues: Array<string | number> = ['one', 'three'];

// Create a custom SVG icon
const starIcon = m(
  'svg[width=24][height=24][viewBox=0 0 24 24]',
  m('path', {
    d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  })
);

m(ToggleGroup, {
  value: singleValue,
  onchange: (v) => {
    singleValue = v as string | number;
    console.log('Single value changed:', v);
  },
  items: [
    { value: 'one', icon: starIcon, tooltip: 'Star (custom SVG icon)' },
    { value: 'two', iconName: 'format_align_center', tooltip: 'Align Center' },
    { value: 'three', iconName: 'format_align_right', tooltip: 'Align Right' },
    { value: 'four', iconName: 'format_align_justify', tooltip: 'Align Justify', disabled: true },
  ],
});

m(ToggleGroup, {
  multiple: true,
  value: multipleValues,
  onchange: (v) => {
    multipleValues = v as Array<string | number>;
    console.log('Multiple values changed:', v);
  },
  items: [
    { value: 'one', iconName: 'format_bold', tooltip: 'Bold' },
    { value: 'two', iconName: 'format_italic', tooltip: 'Italic' },
    { value: 'three', iconName: 'format_underlined', tooltip: 'Underline' },
    { value: 'four', iconName: 'format_color_fill', tooltip: 'Fill Color', disabled: true },
  ],
});
`,
        }),
        m('h3.header[id=submitbutton]', 'SubmitButton'),
        m(
          'div',
          m(SubmitButton, {
            label: 'Submit',
            iconName: 'send',
            onclick,
          })
        ),
        m(CodeBlock, {
          code: `m(SubmitButton, {
  label: 'Submit',
  iconName: 'send',
  iconClass: 'right',
  onclick,
})`,
        }),

        m('h3.header[id=confirmbutton]', 'ConfirmButton'),
        m(
          'div',
          m(ConfirmButton, {
            timeout: 5000, // optional, default is 3000ms
            onFirstClick: () => console.log('Delete clicked the first time'), // optional, can for example be used to display a toast
            onclick: () => console.log('Delete clicked'),
          })
        ),
        m('h3.header[id=confirmbutton-row]', 'ConfirmButton with other buttons in a row'),
        m('div', [
          m(ConfirmButton, {
            label: 'Delete',
            timeout: 5000,
            onFirstClick: () => console.log('Delete clicked the first time'),
            onclick: () => console.log('Delete clicked'),
          }),
          m(FlatButton, { label: 'Flat Button', iconName: 'edit', onclick: () => console.log('Flat button clicked') }),
          m(Button, { label: 'Normal Button', iconName: 'group', onclick: () => console.log('Normal button clicked') }),
        ]),
        m('h3.header[id=confirmbutton-test]', 'ConfirmButton with iconClass test'),
        m('div', [
          m(ConfirmButton, {
            iconClass: 'right',
            label: 'Delete Item',
            timeout: 5000,
            onFirstClick: () => console.log('Delete clicked the first time'),
            onclick: () => console.log('Delete clicked'),
          }),
          m(Button, {
            label: 'Normal Button',
            iconName: 'group',
            onclick: () => console.log('Normal button clicked'),
          }),
        ]),
        m(CodeBlock, {
          code: `m(ConfirmButton, {
  iconClass: 'right',
  timeout: 5000, // optional, default is 3000ms
  onFirstClick: () => console.log('Delete clicked the first time'), // optional, can for example be used to display a toast
  onclick: () => console.log('Delete clicked'),
}),
m(FlatButton, { label: 'Flat Button', onclick: () => console.log('Flat button clicked') }),
m(Button, { label: 'Normal Button', onclick: () => console.log('Normal button clicked') }),
`,
        }),
      ]),
  } as Component;
};
