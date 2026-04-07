import { dashboardSvc } from '../../services/dashboard-service';
import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const HomePage = () => ({
  view: () =>
    m('.home-page', [
      m(
        '.col.s12.m7.l8',
        m('.introduction', [
          m('h2', 'Mithril-Materialized v3.15'),
          m('.card.green.lighten-4', [
            m('.card-content', [
              m('span.card-title', '🚀 Latest Stable Release'),
              m('p', [
                'The complete Mithril.js Material Design component library with ',
                m('strong', 'no external JavaScript dependencies'),
                ', dark theme support, and comprehensive component coverage.',
              ]),
            ]),
          ]),
          m(
            'p',
            `Mithril-Materialized gives you self-contained Mithril components implementing Material Design
          principles — no jQuery, no Materialize-CSS runtime, no bloat. Everything you need, nothing you don't.`
          ),
          m('h3', "✨ What's New in v3.15"),
          m('ul.collection', [
            m('li.collection-item', [
              m('strong', 'CSS Documentation: '),
              'Comprehensive CSS section covering Color, Grid, Typography, Helpers, Theming, and more.',
            ]),
            m('li.collection-item', [
              m('strong', 'DataTable — Horizontal Scrolling: '),
              'Responsive tables now scroll horizontally on small screens.',
            ]),
            m('li.collection-item', [
              m('strong', 'TypeScript 6 support: '),
              'Updated tsconfig and ambient declarations for full TS 6 compatibility.',
            ]),
            m('li.collection-item', [
              m('strong', 'DatePicker fix: '),
              'Month/year dropdown selection now correctly applies and closes.',
            ]),
          ]),
          m('h3', "✨ What's New in v3.14"),
          m('ul.collection', [
            m('li.collection-item', [
              m('strong', 'ConfirmButton: '),
              'Purpose-built component for destructive actions. Click once to prime, again to confirm.',
            ]),
            m('li.collection-item', [
              m('strong', 'LikertScale: '),
              'Survey-ready component for rating scales with rich layout and accessibility support.',
            ]),
            m('li.collection-item', [
              m('strong', 'Enhanced Rating: '),
              'Tooltips display correctly on hover; half-step and fractional ratings supported.',
            ]),
            m('li.collection-item', [
              m('strong', 'Rich Collection Items: '),
              'Collection items now accept rich content via the content property.',
            ]),
          ]),
          m('h3', '✨ Key Features'),
          m('ul.collection', [
            m('li.collection-item', 'Zero external JavaScript dependencies — ESM bundle < 45 KB gzipped'),
            m('li.collection-item', 'Custom SVG icons — no icon font dependency required'),
            m('li.collection-item', 'Built-in light / dark / auto theme system with CSS custom properties'),
            m('li.collection-item', 'Modular CSS — import only what you need'),
            m('li.collection-item', 'Enhanced DatePicker and TimePicker with i18n and range selection'),
            m('li.collection-item', 'Extensive library: Timeline, Masonry, Wizard, Rating, ImageList, DataTable, and more'),
          ]),
          m('h3', '🌓 Theme System'),
          m('p', 'Built-in light and dark theme support with automatic system-preference detection:'),
          m('ul.collection', [
            m('li.collection-item', [
              m('span.blue-text', 'ThemeSwitcher: '),
              'Full light / dark / auto switcher with persistence.',
            ]),
            m('li.collection-item', [
              m('span.blue-text', 'ThemeToggle: '),
              'Compact toggle button for nav bars.',
            ]),
            m('li.collection-item', [
              m('span.blue-text', 'CSS Variables: '),
              'All colours use CSS custom properties for seamless theme transitions.',
            ]),
          ]),
          m('h3', '🎨 CSS Options'),
          m('ul.collection', [
            m('li.collection-item', [m('span.green-text', 'index.css: '), 'Complete bundle (~23 KB gzipped).']),
            m('li.collection-item', [
              m('span.green-text', 'Modular CSS: '),
              'core.css · forms.css · components.css · pickers.css · advanced.css · utilities.css',
            ]),
            m('li.collection-item', [m('span.green-text', 'SASS: '), 'Full source files for complete customisation.']),
          ]),
          m('p', [
            'Full API documentation is available ',
            m('a[href=https://erikvullings.github.io/mithril-materialized/typedoc/index.html]', 'here'),
            '.',
          ]),
          m('h3', '📦 Installation'),
          m(CodeBlock, {
            language: 'console',
            code: `npm install mithril mithril-materialized
# TypeScript types are bundled`,
          }),
          m(CodeBlock, {
            code: `import m from 'mithril';
import { TextInput, Button, DatePicker, ThemeToggle } from 'mithril-materialized';
// Complete CSS bundle
import 'mithril-materialized/index.css';
// — or modular CSS —
// import 'mithril-materialized/core.css';
// import 'mithril-materialized/forms.css';

const MyApp = () => ({
  view: () => m('.container', [
    m('nav.light-blue', m('.nav-wrapper', [
      m('span.brand-logo', 'My App'),
      m('ul.right', [m('li', m(ThemeToggle))]),
    ])),
    m(TextInput, { label: 'Your name', canClear: true, onchange: (v) => console.log(v) }),
    m(Button, { label: 'Submit', onclick: () => alert('Hello!') }),
    m(DatePicker, { label: 'Select date', onchange: (d) => console.log(d) }),
  ]),
});`,
          }),
          m('h3', '🎨 Theme Usage'),
          m(CodeBlock, {
            code: `import { ThemeManager, ThemeSwitcher, ThemeToggle } from 'mithril-materialized';

ThemeManager.setTheme('dark');  // 'light' | 'dark' | 'auto'
ThemeManager.toggle();
ThemeManager.getTheme();

m(ThemeSwitcher, { onThemeChange: (theme) => console.log(theme) });
m(ThemeToggle);`,
          }),
        ])
      ),
      m('.col.s12.m5.l4', [
        m('h3', 'Contents'),
        m('ul.collection', [
          dashboardSvc
            .getList()
            .filter((d) => d.visible && !d.default)
            .map((d) => m('li.collection-item', m('a', { href: `#!${d.route}` }, d.title))),
        ]),
      ]),
    ]),
});
