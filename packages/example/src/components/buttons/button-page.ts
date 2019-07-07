import { RoundIconButton, SubmitButton, Button, FlatButton, CodeBlock } from 'mithril-materialized';
import m, { Component } from 'mithril';

export const ButtonPage = () => {
  const onclick = () => alert('Button clicked');
  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Buttons'),
        m('h3.header[id=raised]', 'Raised'),
        m('div', [
          m(Button, { label: 'First Button', onclick }),
          m(Button, { label: 'Second Button', iconName: 'cloud', onclick }),
          m(Button, { label: 'Third Button', iconName: 'cloud', iconClass: 'right', onclick }),
        ]),
        m(CodeBlock, {
          code: [
            `            const onclick = () => alert('Button clicked');
            m('div', [
              m(Button, { label: 'Button', onclick }),
              m(Button, { label: 'Button', iconName: 'cloud', onclick }),
              m(Button, { label: 'Button', iconName: 'cloud', iconClass: 'right', onclick }),
            ]),`,
          ],
        }),
        m('h3.header[id=flatbutton]', 'FlatButton'),
        m('div', m(FlatButton, { label: 'My Flat button', onclick })),
        m(CodeBlock, { code: '            m(FlatButton, { label: "My Flat button", onclick })' }),
        m('h3.header[id=roundiconbutton]', 'RoundIconButton'),
        m('div', m(RoundIconButton, { iconName: 'create', onclick })),
        m(CodeBlock, { code: '            m(RoundIconButton, { iconName: "create", onclick })' }),
        m('h3.header[id=submitbutton]', 'SubmitButton'),
        m(
          'div',
          m(SubmitButton, {
            label: 'Submit',
            iconName: 'send',
            iconClass: 'right',
            onclick,
          })
        ),
        m(CodeBlock, {
          code: `            m(SubmitButton, {
              label: 'Submit',
              iconName: 'send',
              iconClass: 'right',
              onclick,
            })`,
        }),
      ]),
  } as Component;
};
