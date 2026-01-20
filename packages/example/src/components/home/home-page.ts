import { dashboardSvc } from '../../services/dashboard-service';
import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const HomePage = () => ({
  view: () =>
    m('.home-page', [
      m(
        '.col.s12.m7.l8',
        m('.introduction', [
          m('h2', 'Mithril-Materialized v3.14'),
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
            `I like Mithril, and I also like Material Design. However, depending on large external libraries
          like materialize-css can be problematic with bundle sizes and conflicting dependencies. For that reason,
          mithril-materialized provides you with self-contained Mithril components that implement Material Design
          principles without external JavaScript dependencies.`
          ),
          m('h3', '✨ What\'s New in v3.14'),
          m('ul.collection', [
            m('li.collection-item', [
              m('strong', 'ConfirmButton Component: '),
              'Purpose-built component for delete and submit actions. Click once to initialize, again to confirm.',
            ]),
            m('li.collection-item', [
              m('i.material-icons.tiny', 'check'),
              ' Support for different icons and configurable delays',
            ]),
          ]),
          m('h3', '✨ What\'s New in v3.13'),
          m('ul.collection', [
            m('li.collection-item', [
              m('strong', '📊 LikertScale Component: '),
              'Purpose-built component for survey questions and rating scales',
            ]),
            m('li.collection-item', [
              m('i.material-icons.tiny', 'star'),
              ' Enhanced Rating Component: Tooltips now display correctly on hover',
            ]),
            m('li.collection-item', [
              m('i.material-icons.tiny', 'format_quote'),
              ' Rich Collection Content: Collection items now support rich content via content property',
            ]),
          ]),
          m('h3', '✨ Key Features'),
          m('ul.collection', [
            m('li.collection-item', [
              m('i.material-icons.tiny', '🔥'),
              ' Zero external JavaScript dependencies, complete ESM module size < 45kb gzipped',
            ]),
            m('li.collection-item', [m('i.material-icons.tiny', '📦'), ' Significantly smaller bundle size']),
            m('li.collection-item', [m('i.material-icons.tiny', '🎨'), ' Custom SVG icons (no font dependencies)']),
            m('li.collection-item', [m('i.material-icons.tiny', '⚡'), ' Better performance without jQuery']),
            m('li.collection-item', [
              m('i.material-icons.tiny', '🛠️'),
              ' Enhanced DatePicker and TimePicker components',
            ]),
            m('li.collection-item', [m('i.material-icons.tiny', '🌗'), ' Built-in dark/light theme system']),
            m('li.collection-item', [
              m('i.material-icons.tiny', '🎯'),
              ' Extensive component library with timeline, masonry, wizard, rating, image lists, and data tables',
            ]),
          ]),
          m('h3', '🌓 Theme System'),
          m('p', 'Built-in light and dark theme support with automatic system theme detection:'),
          m('ul.collection', [
            m('li.collection-item', [
              m('span.blue-text', 'ThemeSwitcher: '),
              'Complete theme switcher with light/dark/auto options',
            ]),
            m('li.collection-item', [
              m('span.blue-text', 'ThemeToggle: '),
              'Simple light/dark toggle button for headers',
            ]),
            m('li.collection-item', [
              m('span.blue-text', 'CSS Variables: '),
              'All colors use CSS custom properties for smooth theme transitions',
            ]),
            m('li.collection-item', [
              m('span.blue-text', 'Auto Detection: '),
              "Automatically respects user's system theme preference",
            ]),
          ]),
          m('h3', '🎨 CSS Options'),
          m('p', 'Multiple ways to include styling based on your needs:'),
          m('ul.collection', [
            m('li.collection-item', [
              m('span.green-text', 'index.css: '),
              'Complete CSS bundle (23KB gzipped) with all components',
            ]),
            m('li.collection-item', [
              m('span.green-text', 'Modular CSS: '),
              'Import only needed modules (core.css, forms.css, components.css, etc.)',
            ]),
            m('li.collection-item', [
              m('span.green-text', 'SASS: '),
              'Full SASS source files for complete customization',
            ]),
          ]),
          m('p', [
            'Check out the complete API documentation ',
            m('a[href="https://erikvullings.github.io/mithril-materialized/typedoc/index.html"]', 'here'),
            '.',
          ]),
          m('h3', '📦 Installation'),
          m('p', 'Install the package (much simpler now!):'),
          m(CodeBlock, {
            language: 'console',
            code: `npm install mithril mithril-materialized
# TypeScript types are included`,
          }),
          m('p', 'Use the components in your application:'),
          m(CodeBlock, {
            code: `import m from 'mithril';
import { TextInput, Button, DatePicker, ThemeToggle } from 'mithril-materialized';
// Option 1: Complete CSS bundle
import 'mithril-materialized/index.css';
// Option 2: Modular CSS (smaller bundles)
// import 'mithril-materialized/core.css';
// import 'mithril-materialized/forms.css';

const MyApp = () => ({
  view: () => m('.container', [
    // Theme toggle in nav
    m('nav.light-blue', [
      m('.nav-wrapper', [
        m('span.brand-logo', 'My App'),
        m('ul.right', [
          m('li', m(ThemeToggle))
        ])
      ])
    ]),
    // Form inputs with clear functionality
    m(TextInput, {
      label: 'Your name',
      canClear: true, // New: add clear button
      onchange: (value) => console.log(value)
    }),
    m(Button, {
      label: 'Submit',
      onclick: () => alert('Hello!')
    }),
    m(DatePicker, {
      label: 'Select date',
      onchange: (date) => console.log(date)
    })
  ])
});`,
          }),
          m('h3', '🎨 CSS & Theme Usage'),
          m('p', 'Multiple styling options and theme system:'),
          m(CodeBlock, {
            code: `// CSS Options
import 'mithril-materialized/index.css'; // Complete bundle
// OR modular imports
import 'mithril-materialized/core.css';      // Essential styles
import 'mithril-materialized/forms.css';     // Form components
import 'mithril-materialized/components.css'; // Interactive components

// Theme System
import { ThemeManager, ThemeSwitcher, ThemeToggle } from 'mithril-materialized';

// Programmatic theme control
ThemeManager.setTheme('dark');  // 'light' | 'dark' | 'auto'
ThemeManager.toggle();          // Toggle between themes
ThemeManager.getTheme();        // Get current theme

// UI Components
m(ThemeSwitcher, { onThemeChange: (theme) => console.log(theme) });
m(ThemeToggle); // Simple toggle button`,
          }),
        ])
      ),
      m('.col.s12.m5.l4', [
        m('h1', 'Contents'),
        m('ul.collection', [
          dashboardSvc
            .getList()
            .filter((d) => d.visible && !d.default)
            .map((d) => m('li.collection-item', m('a', { href: `#!${d.route}` }, d.title))),
        ]),
      ]),
    ]),
});
