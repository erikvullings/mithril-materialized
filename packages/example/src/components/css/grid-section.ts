import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

const demoCell = (color: string) =>
  ({ style: `background:${color};padding:8px;text-align:center;border:1px solid var(--mm-border-color);color:var(--mm-text-primary)` });

export const GridSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Grid'),
      m('p', [
        'Materialize uses a 12-column fluid responsive grid system. Columns are specified by a class prefix (',
        m('code', 's'), ', ', m('code', 'm'), ', ', m('code', 'l'),
        ') and a column span (1–12).',
      ]),

      m('h4', 'Breakpoints'),
      m('table.striped.responsive-table', [
        m('thead', m('tr', [m('th', 'Breakpoint'), m('th', 'Class Prefix'), m('th', 'Width')])),
        m('tbody', [
          m('tr', [m('td', 'Small'), m('td', m('code', '.s1–.s12')), m('td', '0 – 600px')]),
          m('tr', [m('td', 'Medium'), m('td', m('code', '.m1–.m12')), m('td', '601px – 992px')]),
          m('tr', [m('td', 'Large'), m('td', m('code', '.l1–.l12')), m('td', '993px+')]),
        ]),
      ]),

      m('h4', 'Basic Grid'),
      m('.row', [
        ...[1,2,3,4,5,6,7,8,9,10,11,12].map(n =>
          m('.col.s1', demoCell('var(--mm-surface-color)'), `${n}`)
        ),
      ]),
      m('.row', [
        m('.col.s4', demoCell('var(--mm-primary-color)'), m('span.white-text', 's4')),
        m('.col.s4', demoCell('var(--mm-primary-color)'), m('span.white-text', 's4')),
        m('.col.s4', demoCell('var(--mm-primary-color)'), m('span.white-text', 's4')),
      ]),
      m('.row', [
        m('.col.s12.m6', demoCell('var(--mm-secondary-color)'), m('span.white-text', 's12 m6')),
        m('.col.s12.m6', demoCell('var(--mm-secondary-color)'), m('span.white-text', 's12 m6')),
      ]),

      m(CodeBlock, {
        code: `<div class="row">
  <div class="col s12">Full width</div>
</div>
<div class="row">
  <div class="col s6">Half width</div>
  <div class="col s6">Half width</div>
</div>
<div class="row">
  <div class="col s12 m6 l4">Responsive</div>
</div>`,
      }),

      m('h4', 'Offsets'),
      m('p', 'Use ', m('code', '.offset-s*'), ', ', m('code', '.offset-m*'), ', ', m('code', '.offset-l*'), ' to shift columns.'),
      m('.row', [
        m('.col.s6.offset-s3', demoCell('var(--mm-surface-color)'), 's6 offset-s3'),
      ]),

      m(CodeBlock, {
        code: `<div class="row">
  <div class="col s6 offset-s3">Centered with offsets</div>
</div>`,
      }),

      m('h4', 'Push & Pull'),
      m('p', 'Use ', m('code', '.push-*'), ' and ', m('code', '.pull-*'), ' to reorder columns visually without changing the DOM order.'),
      m(CodeBlock, {
        code: `<div class="row">
  <div class="col s5 push-s7">This goes right visually</div>
  <div class="col s7 pull-s5">This goes left visually</div>
</div>`,
      }),
    ]),
});
