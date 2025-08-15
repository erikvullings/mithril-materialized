import { dashboardSvc } from '../../services/dashboard-service';
import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const HomePage = () => ({
  view: () =>
    m('.home-page', [
      m(
        '.col.s12.m7.l8',
        m('.introduction', [
          m('h2', 'Mithril-Materialized v2.0.0 Beta'),
          m('.card.blue.lighten-4', [
            m('.card-content', [
              m('span.card-title', '🚀 Major Release - Breaking Changes'),
              m('p', [
                'This is a ',
                m('strong', 'major breaking release'),
                ' that removes all external JavaScript dependencies, making the library completely self-contained and significantly reducing bundle sizes.',
              ]),
            ]),
          ]),
          m(
            'p',
            `I like Mithril, and I also like Material Design. However, depending on large external libraries
          like materialize-css can be problematic with bundle sizes and conflicting dependencies. For that reason,
          mithril-materialized v2.0 provides you with self-contained Mithril components that implement Material Design
          principles without external JavaScript dependencies.`
          ),
          m('h3', '✨ What\'s New in v2.0.0'),
          m('ul.collection', [
            m('li.collection-item', [m('i.material-icons.tiny', '🔥'), ' Zero external JavaScript dependencies']),
            m('li.collection-item', [m('i.material-icons.tiny', '📦'), ' Significantly smaller bundle size']),
            m('li.collection-item', [m('i.material-icons.tiny', '🎨'), ' Custom SVG icons (no font dependencies)']),
            m('li.collection-item', [m('i.material-icons.tiny', '⚡'), ' Better performance without jQuery']),
            m('li.collection-item', [m('i.material-icons.tiny', '🛠️'), ' Enhanced DatePicker and TimePicker components']),
          ]),
          m('h3', '💥 Breaking Changes from v1.x'),
          m('ul.collection', [
            m('li.collection-item', [
              m('span.red-text', 'Removed dependencies: '),
              'No longer requires materialize-css or material-icons packages',
            ]),
            m('li.collection-item', [
              m('span.red-text', 'Simplified installation: '),
              'Only need to install mithril and mithril-materialized',
            ]),
            m('li.collection-item', [
              m('span.red-text', 'Custom icons: '),
              'Uses built-in SVG icons instead of Material Icons font',
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
import { TextInput, Button, DatePicker } from 'mithril-materialized';
// Optional: import CSS for Material Design styling
import 'mithril-materialized/dist/index.css';

const MyApp = () => ({
  view: () => m('.container', [
    m(TextInput, {
      label: 'Your name',
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
          m('h3', '🎨 Styling Options'),
          m('p', 'The library includes independent CSS styling (no conflicts with other CSS frameworks):'),
          m(CodeBlock, {
            code: `// Import ready-to-use CSS
import 'mithril-materialized/dist/index.css';

// OR use SASS for customization
@import 'mithril-materialized/sass/materialize.scss';`,
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
