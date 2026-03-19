import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

const cssCustomProps = [
  { name: '--mm-primary-color', default: '#ee6e73', description: 'Primary brand color' },
  { name: '--mm-primary-color-light', default: 'lighten(primary, 15%)', description: 'Light primary variant' },
  { name: '--mm-primary-color-dark', default: 'darken(primary, 15%)', description: 'Dark primary variant' },
  { name: '--mm-secondary-color', default: '#26a69a', description: 'Secondary / accent color' },
  { name: '--mm-background-color', default: '#ffffff', description: 'Page/component background' },
  { name: '--mm-text-primary', default: 'rgba(0,0,0,0.87)', description: 'Main text color' },
  { name: '--mm-text-secondary', default: 'rgba(0,0,0,0.54)', description: 'Secondary / hint text' },
  { name: '--mm-border-color', default: 'rgba(0,0,0,0.12)', description: 'Dividers and borders' },
  { name: '--mm-card-bg', default: '#ffffff', description: 'Card background color' },
  { name: '--mm-input-bg', default: '#ffffff', description: 'Input background color' },
  { name: '--mm-nav-bg', default: '$primary-color', description: 'Navbar background' },
  { name: '--mm-nav-text', default: '#ffffff', description: 'Navbar text / icon color' },
];

export const ThemingSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Theming'),
      m('p', [
        'mithril-materialized exposes CSS custom properties (',
        m('code', '--mm-*'),
        ') and Sass variables for comprehensive theming. ',
        'You can override them at the ',
        m('code', ':root'),
        ' level for a global theme or within a selector for scoped theming.',
      ]),

      m('h4', 'CSS Custom Properties'),
      m('table.striped.responsive-table', [
        m('thead', m('tr', [m('th', 'Property'), m('th', 'Default'), m('th', 'Description')])),
        m('tbody', cssCustomProps.map(p =>
          m('tr', [m('td', m('code', p.name)), m('td', m('code', p.default)), m('td', p.description)])
        )),
      ]),

      m('h4', 'Override Example (CSS)'),
      m(CodeBlock, {
        code: `/* Global theme override in your CSS */
:root {
  --mm-primary-color: #1976d2;
  --mm-secondary-color: #ff5722;
  --mm-background-color: #f5f5f5;
  --mm-text-primary: rgba(0, 0, 0, 0.87);
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --mm-background-color: #121212;
    --mm-card-bg: #1e1e1e;
    --mm-text-primary: rgba(255, 255, 255, 0.87);
    --mm-border-color: rgba(255, 255, 255, 0.12);
  }
}`,
      }),

      m('h4', 'Override Example (SCSS)'),
      m(CodeBlock, {
        code: `// Override Sass variables before importing
$primary-color: #1976d2 !default;
$secondary-color: #ff5722 !default;
$success-color: #4caf50 !default;
$error-color: #f44336 !default;

@use 'materialize-css/sass/materialize' with (
  $primary-color: #1976d2,
  $secondary-color: #ff5722
);`,
      }),

      m('h4', 'Dark Mode with ThemeSwitcher'),
      m('p', [
        'mithril-materialized ships with a ',
        m('code', 'ThemeSwitcher'),
        ' component and a ',
        m('code', 'ThemeToggle'),
        ' button. See the ',
        m('strong', 'THEME'),
        ' section in the navbar for a live demo.',
      ]),

      m(CodeBlock, {
        code: `import { ThemeSwitcher, ThemeToggle } from 'mithril-materialized';

// Full switcher (light / dark / auto)
m(ThemeSwitcher, {
  theme: 'auto',
  showLabels: true,
  onThemeChange: (theme) => { /* persist choice */ },
})

// Simple toggle
m(ThemeToggle, { className: 'white-text' })`,
      }),

      m('h4', 'Manual Dark Mode Class'),
      m('p', [
        'Add the ',
        m('code', '.dark-mode'),
        ' class to ',
        m('code', '<body>'),
        ' or any container to activate dark styles without JavaScript:',
      ]),

      m(CodeBlock, {
        code: `<!-- Activate dark mode for the entire page -->
<body class="dark-mode">

<!-- Scoped dark mode -->
<section class="dark-mode">
  <p>Dark themed section</p>
</section>`,
      }),
    ]),
});
