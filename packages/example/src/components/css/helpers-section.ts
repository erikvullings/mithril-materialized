import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

const box = (style = '') =>
  `border:1px solid var(--mm-border-color);padding:10px;margin-bottom:8px;color:var(--mm-text-primary);background:var(--mm-surface-color);${style}`;

export const HelpersSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Helpers'),
      m('p', 'Materialize provides utility helper classes for common layout and visibility tasks.'),

      m('h4', 'Alignment'),
      m('.row', [
        m('.col.s12', [
          m('div', { style: box() }, [
            m('span.left', { style: 'background:var(--mm-primary-color);color:#fff;padding:4px 8px' }, '.left'),
            m('span.right', { style: 'background:var(--mm-secondary-color);color:#fff;padding:4px 8px' }, '.right'),
            m('.clearfix'),
          ]),
          m('div.center-align', { style: box() }, '.center-align'),
          m('div.left-align', { style: box() }, '.left-align'),
          m('div.right-align', { style: box() }, '.right-align'),
        ]),
      ]),

      m(CodeBlock, {
        code: `<span class="left">Floated left</span>
<span class="right">Floated right</span>
<div class="clearfix"></div>

<div class="center-align">Centered text</div>
<div class="left-align">Left text</div>
<div class="right-align">Right text</div>`,
      }),

      m('h4', 'Truncation'),
      m('p', 'Use ', m('code', '.truncate'), ' to truncate text with an ellipsis.'),
      m('.row', [
        m('.col.s8', [
          m('p.truncate', { style: box() },
            'This is a very long text that will be truncated when it exceeds the width of its container element.'),
        ]),
      ]),

      m(CodeBlock, {
        code: `<p class="truncate">Very long text...</p>`,
      }),

      m('h4', 'Hiding Elements'),
      m('table.striped.responsive-table', [
        m('thead', m('tr', [m('th', 'Class'), m('th', 'Description')])),
        m('tbody', [
          m('tr', [m('td', m('code', '.hide')), m('td', 'Hidden always')]),
          m('tr', [m('td', m('code', '.hide-on-small-only')), m('td', 'Hidden on small screens only')]),
          m('tr', [m('td', m('code', '.hide-on-med-only')), m('td', 'Hidden on medium screens only')]),
          m('tr', [m('td', m('code', '.hide-on-large-only')), m('td', 'Hidden on large screens only')]),
          m('tr', [m('td', m('code', '.hide-on-med-and-down')), m('td', 'Hidden on medium and smaller')]),
          m('tr', [m('td', m('code', '.hide-on-med-and-up')), m('td', 'Hidden on medium and larger')]),
          m('tr', [m('td', m('code', '.show-on-small')), m('td', 'Visible only on small')]),
          m('tr', [m('td', m('code', '.show-on-medium')), m('td', 'Visible only on medium')]),
          m('tr', [m('td', m('code', '.show-on-large')), m('td', 'Visible only on large')]),
        ]),
      ]),

      m('h4', 'Circle'),
      m('.row', [
        m('.col.s12', [
          m('img.circle', {
            src: 'https://picsum.photos/80/80',
            alt: 'circle image',
            width: 80,
            height: 80,
          }),
        ]),
      ]),

      m(CodeBlock, {
        code: `<img class="circle" src="profile.jpg" alt="Avatar" width="80">`,
      }),

      m('h4', 'Other Utilities'),
      m('table.striped.responsive-table', [
        m('thead', m('tr', [m('th', 'Class'), m('th', 'Description')])),
        m('tbody', [
          m('tr', [m('td', m('code', '.no-padding')), m('td', 'Removes padding')]),
          m('tr', [m('td', m('code', '.valign-wrapper')), m('td', 'Vertically aligns children with flexbox')]),
          m('tr', [m('td', m('code', '.clearfix')), m('td', 'Clears floats')]),
        ]),
      ]),
    ]),
});
