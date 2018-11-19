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
          m(Button, { label: 'Button', ui: { onclick } }),
          m(Button, { label: 'Button', iconName: 'cloud', ui: { onclick } }),
          m(Button, { label: 'Button', iconName: 'cloud', iconClass: 'right', ui: { onclick } }),
        ]),
        m(CodeBlock, {
          code: [
            `            const onclick = () => alert('Button clicked');
            m('div', [
              m(Button, { label: 'Button', ui: { onclick } }),
              m(Button, { label: 'Button', iconName: 'cloud', ui: { onclick } }),
              m(Button, { label: 'Button', iconName: 'cloud', iconClass: 'right', ui: { onclick } }),
            ]),`,
          ],
        }),
        m('h3.header[id=flatbutton]', 'FlatButton'),
        m('div', m(FlatButton, { label: 'My Flat button', ui: { onclick } })),
        m(CodeBlock, { code: '            m(FlatButton, { label: "My Flat button", ui: { onclick } })' }),
        m('h3.header[id=roundiconbutton]', 'RoundIconButton'),
        m('div', m(RoundIconButton, { iconName: 'create', ui: { onclick } })),
        m(CodeBlock, { code: '            m(RoundIconButton, { iconName: "create", ui: { onclick } })' }),
        m('h3.header[id=submitbutton]', 'SubmitButton'),
        m(
          'div',
          m(SubmitButton, {
            label: 'Submit',
            iconName: 'send',
            iconClass: 'right',
            ui: { onclick },
          })
        ),
        m(CodeBlock, {
          code: `            m(SubmitButton, {
              label: 'Submit',
              iconName: 'send',
              iconClass: 'right',
              ui: { onclick },
            })`,
        }),
      ]),
  } as Component;
};
