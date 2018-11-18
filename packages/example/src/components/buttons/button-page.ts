import { RoundIconButton, SubmitButton, Button, FlatButton, CodeBlock } from 'mithril-materialized';
import m, { Component } from 'mithril';

export const ButtonPage = () => {
  const onclick = () => alert('Button clicked');
  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Buttons'),
        m('h3.header', 'Raised'),
        m('div', [
          m(Button, { label: 'Button', ui: { onclick } }),
          m(Button, { label: 'Button', iconName: 'cloud', ui: { onclick } }),
          m(Button, { label: 'Button', iconName: 'cloud', iconClass: 'right', ui: { onclick } }),
        ]),
        m(CodeBlock, {
          code: [
            `const onclick = () => alert('Button clicked');`,
            'm(Button, { label: "Button", ui: { onclick } })',
            'm(Button, { label: "Button", iconName: "cloud", ui: { onclick } })',
            'm(Button, { label: "Button", iconName: "cloud", iconClass: "right", ui: { onclick } })',
          ],
        }),
        m('h3.header', 'FlatButton'),
        m('p', m(FlatButton, { label: 'My Flat button', ui: { onclick } })),
        m(CodeBlock, { code: 'm("p", m(FlatButton, { label: "My Flat button", ui: { onclick } }))' }),
        m('h3.header', 'RoundIconButton'),
        m('p', m(RoundIconButton, { iconName: 'create', ui: { onclick } })),
        m(CodeBlock, { code: 'm("p", m(RoundIconButton, { iconName: "create", ui: { onclick } }))' }),
        m('h3.header', 'SubmitButton'),
        m(
          'p',
          m(SubmitButton, {
            label: 'Submit',
            iconName: 'send',
            iconClass: 'right',
            ui: { onclick },
          })
        ),
        m(CodeBlock, {
          code: `m(SubmitButton, {
          label: 'Submit',
          iconName: 'send',
          iconClass: 'right',
          ui: { onclick },
        })`,
        }),
      ]),
  } as Component;
};
