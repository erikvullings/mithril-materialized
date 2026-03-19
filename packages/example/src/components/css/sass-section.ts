import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

const sassVariables: Array<{ category: string; vars: Array<{ name: string; default: string; description: string }> }> = [
  {
    category: 'Colors',
    vars: [
      { name: '$primary-color', default: 'color("materialize-red", "lighten-2")', description: 'Primary brand color' },
      { name: '$primary-color-light', default: 'lighten($primary-color, 15%)', description: 'Lighter primary variant' },
      { name: '$primary-color-dark', default: 'darken($primary-color, 15%)', description: 'Darker primary variant' },
      { name: '$secondary-color', default: 'color("teal", "lighten-1")', description: 'Secondary brand color' },
      { name: '$success-color', default: 'color("green", "base")', description: 'Success state color' },
      { name: '$error-color', default: 'color("red", "base")', description: 'Error state color' },
      { name: '$link-color', default: 'color("light-blue", "darken-1")', description: 'Hyperlink color' },
    ],
  },
  {
    category: 'Typography',
    vars: [
      { name: '$font-stack', default: '"Roboto", sans-serif', description: 'Default font family' },
      { name: '$off-black', default: 'rgba(0, 0, 0, 0.87)', description: 'Default text color' },
      { name: '$medium-screen', default: '992px !default', description: 'Medium breakpoint' },
      { name: '$large-screen', default: '1200px !default', description: 'Large breakpoint' },
    ],
  },
  {
    category: 'Buttons',
    vars: [
      { name: '$button-border', default: 'none', description: 'Button border' },
      { name: '$button-background-focus', default: 'lighten($secondary-color, 4%)', description: 'Button focus background' },
      { name: '$button-font-size', default: '14px', description: 'Button font size' },
      { name: '$button-height', default: '36px', description: 'Button height' },
      { name: '$button-padding', default: '0 16px', description: 'Button padding' },
      { name: '$button-radius', default: '2px', description: 'Button border radius' },
    ],
  },
  {
    category: 'Cards',
    vars: [
      { name: '$card-padding', default: '24px', description: 'Card content padding' },
      { name: '$card-bg-color', default: '#fff', description: 'Card background color' },
      { name: '$card-link-color', default: 'color("orange", "accent-2")', description: 'Card link color' },
      { name: '$card-link-color-light', default: 'lighten($card-link-color, 20%)', description: 'Light variant card link' },
    ],
  },
  {
    category: 'Inputs',
    vars: [
      { name: '$input-bg-color', default: '#fff', description: 'Input background' },
      { name: '$input-border-color', default: 'color("grey", "base")', description: 'Input border color' },
      { name: '$input-border', default: '1px solid $input-border-color', description: 'Input border' },
      { name: '$input-error-color', default: '$error-color', description: 'Input error state color' },
      { name: '$input-success-color', default: '$success-color', description: 'Input success state color' },
      { name: '$input-focus-color', default: '$secondary-color', description: 'Input focus color' },
      { name: '$input-font-size', default: '16px', description: 'Input font size' },
      { name: '$input-margin', default: '0 0 8px 0', description: 'Input margin' },
      { name: '$input-padding', default: '0', description: 'Input padding' },
      { name: '$input-transition', default: 'all .3s', description: 'Input transition' },
      { name: '$label-font-size', default: '.8rem', description: 'Input label font size' },
    ],
  },
  {
    category: 'Navigation',
    vars: [
      { name: '$navbar-height', default: '64px', description: 'Navbar height' },
      { name: '$navbar-line-height', default: '$navbar-height', description: 'Navbar line height' },
      { name: '$navbar-height-mobile', default: '56px', description: 'Mobile navbar height' },
      { name: '$navbar-line-height-mobile', default: '$navbar-height-mobile', description: 'Mobile navbar line height' },
      { name: '$navbar-font-size', default: '15px', description: 'Navbar font size' },
      { name: '$navbar-brand-font-size', default: '2.1rem', description: 'Brand logo font size' },
    ],
  },
];

export const SassSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Sass Variables'),
      m('p', [
        'You can customize Materialize by overriding Sass variables before importing the library. ',
        'Below is a reference of the most commonly used variables.',
      ]),

      m('h4', 'Override Example'),
      m(CodeBlock, {
        code: `// In your SCSS file, override variables before importing:
$primary-color: #1976d2;
$secondary-color: #ff5722;
$button-radius: 4px;

@import 'materialize-css/sass/materialize';`,
      }),

      ...sassVariables.map(({ category, vars }) => [
        m('h4', category),
        m('table.striped.responsive-table', [
          m('thead', m('tr', [
            m('th', 'Variable'),
            m('th', 'Default'),
            m('th', 'Description'),
          ])),
          m('tbody', vars.map(v =>
            m('tr', [
              m('td', m('code', v.name)),
              m('td', m('code', v.default)),
              m('td', v.description),
            ])
          )),
        ]),
      ]),
    ]),
});
