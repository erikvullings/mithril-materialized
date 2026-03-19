import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

const sampleRows = [
  { name: 'Alice', position: 'Developer', age: 32 },
  { name: 'Bob', position: 'Designer', age: 28 },
  { name: 'Carol', position: 'Manager', age: 41 },
  { name: 'Dave', position: 'Analyst', age: 35 },
];

const tableHead = m('thead', m('tr', [m('th', 'Name'), m('th', 'Position'), m('th', 'Age')]));
const tableBody = (rows = sampleRows) =>
  m('tbody', rows.map(r => m('tr', [m('td', r.name), m('td', r.position), m('td', r.age)])));

const tableModifiers = [
  { cls: 'striped', label: 'Striped', description: 'Alternating row background colors.' },
  { cls: 'highlight', label: 'Highlight', description: 'Highlighted row on hover.' },
  { cls: 'centered', label: 'Centered', description: 'Centered table cell content.' },
  { cls: 'hoverable', label: 'Hoverable', description: 'Row background changes on hover.' },
];

export const TableSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Table'),
      m('p', 'Materialize provides modifier classes to style standard HTML tables.'),

      ...tableModifiers.map(({ cls, label, description }) => [
        m('h4', label),
        m('p', [
          m('code', `.${cls}`),
          ' — ',
          description,
        ]),
        m('table', { class: cls }, [tableHead, tableBody()]),
        m(CodeBlock, { code: `<table class="${cls}">...</table>` }),
      ]),

      m('h4', 'Responsive Table'),
      m('p', [
        'Wrap a table with ',
        m('code', '.responsive-table'),
        ' to enable horizontal scrolling on small screens.',
      ]),
      m('table.responsive-table.striped.hoverable', [tableHead, tableBody()]),

      m(CodeBlock, {
        code: `<table class="responsive-table striped hoverable">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Developer</td>
      <td>32</td>
    </tr>
  </tbody>
</table>`,
      }),
    ]),
});
