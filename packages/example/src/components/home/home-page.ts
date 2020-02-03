import { dashboardSvc } from '../../services/dashboard-service';
import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const HomePage = () => ({
  view: () =>
    m('.row', [
      m(
        '.col.s12.m7.l8',
        m('.introduction', [
          m('h2', 'About Mithril-Materialized'),
          m(
            'p',
            `I like Mithril, and I also like materialize-css. However, to create some materialized components
          is a bit cumbersome as it requires a lot of HTML elements and a specific nesting which can easily go
          wrong. For that reason, the mithril-materialized library provides you with several ready-made
          Mithril components, so you can easily use them in your own application.`
          ),
          m('p', [
            'You can check out the API documentation ',
            m('a[href="https://erikvullings.github.io/mithril-materialized/typedoc/index.html"]', 'here'),
            '.',
          ]),
          m('h3', 'Installation'),
          m('p', 'First, you need to install the required packages:'),
          m(CodeBlock, {
            language: 'console',
            code: `npm i materialize-css material-icons mithril mithril-materialized
# Also install the typings if you use TypeScript
npm i --save-dev @types/materialize-css @types/mithril`,
          }),
          m('p', 'Next, you can use them inside your application:'),
          m(CodeBlock, {
            code: `import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import { TextArea } from 'mithril-materialized';
`,
          }),
        ])
      ),
      m('.col.s12.m5.l4', [
        m('h1', 'Contents'),
        m('ul.collection', [
          dashboardSvc
            .getList()
            .filter(d => d.visible && !d.default)
            .map(d => m('li.collection-item', m('a', { href: `#!${d.route}` }, d.title))),
        ]),
      ]),
    ]),
});
