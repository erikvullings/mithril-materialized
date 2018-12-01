import { ModalPanel, CodeBlock, Button } from 'mithril-materialized';
import m from 'mithril';

export const ModalPage = () => {
  const onchange = (v: unknown) => alert(v);
  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Modals'),
        m('p', [
          'The library supports all three modals types that are defined on the ',
          m('a[href=https://materializecss.com/modals.html#!][target=_blank]', 'materialize-css website'),
          '.',
        ]),

        m('h3.header', 'Normal Modal'),
        m(
          'row',
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

        m('h3.header', 'Fixed Footer Modal'),
        m(
          'row',
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
          'row',
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

      ]),
  };
};
