import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

const colors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange', 'brown', 'blue-grey', 'grey',
];

const shades = ['lighten-5', 'lighten-4', 'lighten-3', 'lighten-2', 'lighten-1', '', 'darken-1', 'darken-2', 'darken-3', 'darken-4'];

export const ColorSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Color'),
      m('p', [
        'Materialize CSS uses Material Design colors. You can apply color classes to backgrounds and text. ',
        'Background classes use the color name directly (e.g. ',
        m('code', '.red'),
        ') and text classes append ',
        m('code', '-text'),
        ' (e.g. ',
        m('code', '.red-text'),
        ').',
      ]),

      m('h4', 'Color Palette'),
      m('.row', colors.map(color =>
        m('.col.s12', { style: 'margin-bottom: 8px;' }, [
          m('.row.no-margin', shades.map(shade => {
            const cls = shade ? `${color} ${shade}` : color;
            const textCls = shade.includes('lighten') ? 'black-text' : 'white-text';
            return m(`.col.${cls}`, {
              style: 'height: 40px; display: flex; align-items: center; justify-content: center; padding: 0;',
            }, m(`span.${textCls}`, { style: 'font-size: 10px;' }, shade || 'base'));
          })),
        ])
      )),

      m('h4', 'Usage'),
      m(CodeBlock, {
        code: `<!-- Background color -->
<div class="red">Red background</div>
<div class="blue lighten-2">Light blue background</div>
<div class="green darken-3">Dark green background</div>

<!-- Text color -->
<p class="red-text">Red text</p>
<p class="blue-text text-lighten-2">Light blue text</p>
<p class="green-text text-darken-3">Dark green text</p>`,
      }),

      m('h4', 'Color Shades'),
      m('p', [
        'Each color has multiple shades: ',
        m('code', 'lighten-5'),
        ' through ',
        m('code', 'lighten-1'),
        ' (lighter), base, and ',
        m('code', 'darken-1'),
        ' through ',
        m('code', 'darken-4'),
        ' (darker). For text, prefix shade with ',
        m('code', 'text-'),
        ' e.g. ',
        m('code', '.red-text.text-lighten-2'),
        '.',
      ]),

      m('h4', 'Accent Colors'),
      m('p', 'Some colors also have accent variants: ', m('code', 'accent-1'), ' through ', m('code', 'accent-4'), '.'),
      m('.row', [
        m('.col.s3.red.accent-1', { style: 'height: 50px; line-height: 50px; text-align: center;' }, m('span.black-text', 'accent-1')),
        m('.col.s3.red.accent-2', { style: 'height: 50px; line-height: 50px; text-align: center;' }, m('span.black-text', 'accent-2')),
        m('.col.s3.red.accent-3', { style: 'height: 50px; line-height: 50px; text-align: center;' }, m('span.black-text', 'accent-3')),
        m('.col.s3.red.accent-4', { style: 'height: 50px; line-height: 50px; text-align: center;' }, m('span.white-text', 'accent-4')),
      ]),
    ]),
});
