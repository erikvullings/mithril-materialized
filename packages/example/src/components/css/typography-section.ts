import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const TypographySection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Typography'),
      m('p', [
        'Materialize uses ',
        m('a', { href: 'https://fonts.google.com/specimen/Roboto', target: '_blank' }, 'Roboto'),
        ' as its default font family. It provides heading scales, flow text, and weight utilities.',
      ]),

      m('h4', 'Heading Scale'),
      m('.row', [
        m('.col.s12', [
          m('h1', 'Heading h1'),
          m('h2', 'Heading h2'),
          m('h3', 'Heading h3'),
          m('h4', 'Heading h4'),
          m('h5', 'Heading h5'),
          m('h6', 'Heading h6'),
        ]),
      ]),

      m(CodeBlock, {
        code: `<h1>Heading h1</h1>
<h2>Heading h2</h2>
<h3>Heading h3</h3>
<h4>Heading h4</h4>
<h5>Heading h5</h5>
<h6>Heading h6</h6>`,
      }),

      m('h4', 'Flow Text'),
      m('p', [
        'Add ',
        m('code', '.flow-text'),
        ' to make text responsive — font size scales with the viewport width.',
      ]),
      m('p.flow-text', 'This paragraph uses .flow-text to scale with the screen size.'),

      m(CodeBlock, {
        code: `<p class="flow-text">Responsive text that scales with viewport width.</p>`,
      }),

      m('h4', 'Font Weights'),
      m('.row', [
        m('.col.s12', [
          m('p.thin', 'Thin weight text (.thin)'),
          m('p.light', 'Light weight text (.light)'),
          m('p', 'Normal weight text'),
        ]),
      ]),

      m(CodeBlock, {
        code: `<p class="thin">Thin weight</p>
<p class="light">Light weight</p>
<p>Normal weight</p>`,
      }),

      m('h4', 'Blockquotes'),
      m('blockquote', [
        '"Material Design is a visual language that synthesizes the classic principles of good design with the innovation and possibility of technology and science."',
      ]),

      m(CodeBlock, {
        code: `<blockquote>
  "Your inspiring quote goes here."
</blockquote>`,
      }),

      m('h4', 'Text Utilities'),
      m('table.striped.responsive-table', [
        m('thead', m('tr', [m('th', 'Class'), m('th', 'Effect')])),
        m('tbody', [
          m('tr', [m('td', m('code', '.flow-text')), m('td', 'Responsive font sizing')]),
          m('tr', [m('td', m('code', '.light')), m('td', 'Font weight 300')]),
          m('tr', [m('td', m('code', '.thin')), m('td', 'Font weight 100')]),
          m('tr', [m('td', m('code', '.left-align')), m('td', 'Left-aligned text')]),
          m('tr', [m('td', m('code', '.right-align')), m('td', 'Right-aligned text')]),
          m('tr', [m('td', m('code', '.center-align')), m('td', 'Centered text')]),
          m('tr', [m('td', m('code', '.justify')), m('td', 'Justified text')]),
          m('tr', [m('td', m('code', '.truncate')), m('td', 'Truncated text with ellipsis')]),
        ]),
      ]),
    ]),
});
