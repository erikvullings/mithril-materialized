import {
  RoundIconButton,
  SubmitButton,
  Button,
  FlatButton,
  FloatingActionButton,
  CodeBlock,
} from 'mithril-materialized';
import m, { Component } from 'mithril';

export const ButtonPage = () => {
  const onclick = () => alert('Button clicked');
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
            { iconName: 'insert_chart', className: 'red', onClick: () => console.log('Insert chart') },
            { iconName: 'format_quote', className: 'yellow darken-1', onClick: () => console.log('Format quote') },
            { iconName: 'publish', className: 'green', onClick: () => console.log('Publish') },
            { iconName: 'attach_file', className: 'blue', onClick: () => console.log('Attach file') },
          ],
        }),
        m(FloatingActionButton, {
          className: 'red',
          iconName: 'mode_edit',
          direction: 'left',
          buttons: [
            { iconName: 'insert_chart', className: 'red', onClick: () => console.log('Insert chart') },
            { iconName: 'format_quote', className: 'yellow darken-1', onClick: () => console.log('Format quote') },
            { iconName: 'publish', className: 'green', onClick: () => console.log('Publish') },
            { iconName: 'attach_file', className: 'blue', onClick: () => console.log('Attach file') },
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
    { iconName: 'insert_chart', className: 'red', onClick: () => console.log('Insert chart') },
    { iconName: 'format_quote', className: 'yellow darken-1', onClick: () => console.log('Format quote') },
    { iconName: 'publish', className: 'green', onClick: () => console.log('Publish') },
    { iconName: 'attach_file', className: 'blue', onClick: () => console.log('Attach file') },
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
        m('h3.header[id=roundiconbutton]', 'RoundIconButton'),
        m('div', m(RoundIconButton, { iconName: 'create', onclick })),
        m(CodeBlock, { code: 'm(RoundIconButton, { iconName: "create", onclick })' }),
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
      ]),
  } as Component;
};
